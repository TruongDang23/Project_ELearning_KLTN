import catchAsync from '../utils/catchAsync.js'
import client from '../config/connAzureOpenAI.js'
import path from 'path'
import extract from 'pdf-text-extract'
import { formatTextfromPDF, downloadPDF, formatContentForRecommendModel } from '../utils/format.js'
import { uuid } from 'uuidv4'
import fs from 'fs'
import connectMysql from '../config/connMySql.js'
import mongoose from 'mongoose'
import { getFullInfoMongo, getFullInfoMySQL, getListCourseBaseUserID, getListInforPublishForModel } from './courseController.js'
import axios from 'axios'

//library for recommend system
import natural from 'natural'
import { cosineSimilarity } from '../utils/content_based_algo.js'
import TfIdfList from '../models/tfidf.js'

const TfIdf = natural.TfIdf

const chatAI = catchAsync(async (req, res, next) => {
  const { context } = req.body
  try {
    const result = await client.chat.completions.create({
      messages: context,
      model: ""
    })
    res.status(200).send(result.choices[0].message.content)
  }
  catch (error) {
    res.status(500).send(error)
  }
})

const extractPDFText = catchAsync(async (req, res, next) => {
  const { url } = req.body
  const id = uuid()
  const extension = url.slice(-3)
  const localPath = `../server/uploads/${id}.${extension}`
  //Download file from GCS to local disk
  downloadPDF(url, localPath).then(() => {
    const location = path.join(localPath)
    //Extract text from file PDF
    extract(location, { splitPages: false }, function(err, text) {
      if (err) {
        next(err)
      }
      try {
        //Delete file which is downloaded from GCS
        fs.unlinkSync(localPath)
        //Send text extracted
        res.status(200).send(formatTextfromPDF(text))
      } catch (err) {
        next(err)
        return
      }
    })
  })
    .catch((error) => {
      next({ status: 500, message: `Error when downloading file: ${error}` })
    })
})

const recommendCourse = catchAsync(async (req, res, next) => {
  const userID = req.userID
  const role = req.role
  let listRecommendCourse = []
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()

  const listEnrolledCourse = await getListCourseBaseUserID(userID, role)
  const vectorizedCourses = await TfIdfList.find({}, { courseID: 1, vector: 1, _id: 0 })
  const listEnrolledCourseID = listEnrolledCourse.map(course => course.courseID)

  // Lấy vector của các khóa học đã mua
  const purchasedCourses = vectorizedCourses.filter(c => listEnrolledCourseID.includes(c.courseID));

  //Case người dùng chưa mua khóa học nào
  if (purchasedCourses.length === 0) {
    res.status(204).send([])
    return
  }

  // Nếu người dùng đã mua khóa học thì tiếp tục
  // Lọc ra những khóa học chưa mua
  const candidateCourses = vectorizedCourses.filter(c => !listEnrolledCourseID.includes(c.courseID));

  // Tính similarity giữa mỗi candidate và danh sách đã mua
  const similarities = candidateCourses.map(candidate => {
    // Tính trung bình cosine similarity với các khóa học đã mua
    const totalScore = purchasedCourses.reduce((sum, purchased) => {
      return sum + cosineSimilarity(candidate.vector, purchased.vector)
    }, 0)

    const avgScore = totalScore / purchasedCourses.length

    return {
      courseID: candidate.courseID,
      score: avgScore
    }
  })

  // Sắp xếp theo độ tương đồng giảm dần
  const sorted = similarities.sort((a, b) => b.score - a.score)

  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  mongoTransaction.startTransaction()
  let info_mongo, info_mysql

  for (const course of sorted.slice(0, 9)) {
    try {
      // Run both functions asynchronously
      [info_mysql, info_mongo] = await Promise.all([
        getFullInfoMySQL(mysqlTransaction, course.courseID), // Fetch MySQL data
        getFullInfoMongo(course.courseID) // Fetch MongoDB data
      ])
      // Commit Transactions
      await mysqlTransaction.query("COMMIT")
      await mongoTransaction.commitTransaction()
    } catch (error) {
      // Rollback Transactions in case of an error
      await mysqlTransaction.query("ROLLBACK")
      await mongoTransaction.abortTransaction()
      next(error) // Pass the error to the next middleware
    } finally {
      // End the MongoDB session
      await mongoTransaction.endSession()
    }

    // Merge data
    const mergeData = info_mysql.map(course => {
      return {
        ...course,
        image_introduce: info_mongo[0].image_introduce,
        keywords: info_mongo[0].keywords,
        targets: info_mongo[0].targets
      }
    })
    listRecommendCourse.push(mergeData[0])
  }

  res.status(200).send(listRecommendCourse)
})

const calculateVectors = catchAsync(async (req, res, next) => {
  const mysqlTransaction = connectMysql.promise()
  const mongoTransaction = await mongoose.startSession()
  const tfidf = new TfIdf()

  let preprocesing_data, courses

  // Start Transaction
  await mysqlTransaction.query("START TRANSACTION")
  mongoTransaction.startTransaction()
  //Preprocesing data
  try {
    preprocesing_data = await getListInforPublishForModel(mysqlTransaction)
    // Commit Transactions
    await mysqlTransaction.query("COMMIT")
    await mongoTransaction.commitTransaction()
  } catch (error) {
    // Rollback Transactions in case of an error
    await mysqlTransaction.query("ROLLBACK")
    await mongoTransaction.abortTransaction()
    next(error)
    return
  } finally {
    // End the MongoDB session
    await mongoTransaction.endSession()
  }

  //Formating data
  courses = formatContentForRecommendModel(preprocesing_data)

  //Adding data into TF-IDF array
  courses.forEach(course => {
    tfidf.addDocument(course.content)
  })

  //Create Vocabulary
  const vocabularySet = new Set()
  for (let i = 0; i < courses.length; i++) {
    tfidf.listTerms(i).forEach(item => vocabularySet.add(item.term))
  }
  const vocabulary = Array.from(vocabularySet) //danh sách các từ theo thứ tự cố định

  //Create vector for each course
  const vectorizedCourses = courses.map((course, index) => {
    const vector = vocabulary.map(term => tfidf.tfidf(term, index)) //vector theo thứ tự từ vựng

    return {
      courseID: course.courseID,
      vector
    }
  })

  res.status(200).json({ 'vector': vectorizedCourses })
})

const summaryLecture = catchAsync(async (req, res, next) => {
  const { url } = req.body
  try {
    //"https://n8n.techskillup.online/webhook/summary-lecture"
    // eslint-disable-next-line no-undef
    const response = await axios.post(`${process.env.API_N8N}/webhook/summary-lecture`, { url: url }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res.status(200).send(response.data[0].format_html)
  } catch (error) {
    next(error)
  }
})
export default { chatAI, extractPDFText, recommendCourse, calculateVectors, summaryLecture }
