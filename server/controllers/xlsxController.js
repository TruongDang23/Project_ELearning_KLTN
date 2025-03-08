import xlsx from 'xlsx'
import fs from 'fs'
import axios from 'axios'

async function downloadFile(url, outputPath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  const writer = fs.createWriteStream(outputPath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

const convertToQuizObject = (workbook) => {
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 })

  let jsonData = {
    title: rawData[0][1],
    during_time: rawData[1][1],
    passpoint: rawData[2][1],
    type: "quizz",
    questions: []
  }

  for (let i = 4; i < rawData.length; i++)
  {
    if (rawData.length > 3) {
      const answers = rawData[i][1].split("\r\n")
      const keys = rawData[i][2].split("\r\n")

      const question = {
        question: rawData[i][0],
        answers: answers,
        key: keys
      }
      jsonData.questions.push(question)
    }
  }

  return jsonData
}

const convertToAssignmentObject = (workbook) => {
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 })
  let topics = []
  let sample = []
  let testcases = []
  let title, question

  for (let i = 1; i < rawData.length; i++)
  {
    // Start file => set up title, question
    if (i == 1) {
      title = rawData[i][0]
      question = rawData[i][1]
    }
    // New topic => push old topic into array => refresh title, quest, null sample, null testcase
    else if (rawData[i][0] && rawData[i][1]) {
      // Push old topic into array
      const topic = {
        title: title,
        question: question,
        sample: sample,
        testcases: testcases
      }
      topics.push(topic)

      // Refrest data
      title = rawData[i][0]
      question = rawData[i][1]
      sample = []
      testcases = []
    }

    // After check => push sample and testcase into array
    const sampleObj = {
      case: rawData[i][2],
      key: rawData[i][3]
    }
    const testcaseObj = {
      case: rawData[i][4],
      key: rawData[i][5]
    }

    // Check if has data => push
    if (sampleObj.case != null && sampleObj.key != null)
      sample.push(sampleObj)
    if (testcaseObj.case != null && testcaseObj.key != null)
      testcases.push(testcaseObj)

    // End of file => push last topic into array
    if (i == rawData.length - 1) {
      const topic = {
        title: title,
        question: question,
        sample: sample,
        testcases: testcases
      }
      topics.push(topic)
    }
  }
  let jsonData = {
    topics: topics
  }

  return jsonData
}

const convertGeneralInformation = (sheet, course_structure) => {
  const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 })
  for (let i = 1; i < rawData.length; i++) {
    let [key, value] = rawData[i]

    if (typeof value === 'string' && value.includes('\r\n'))
      value = value.split('\r\n')
    course_structure[key] = value
  }
  return course_structure
}

const convertChapter = async (sheet) => {
  const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 })
  let chapterObj = {}
  let lectures = []
  let lectureObj = {}
  // Get chapter name
  chapterObj.chapter_name = rawData[0][1]

  // Get lecture information
  for (let i = 2; i < rawData.length; i = i + 4) {
    lectureObj.id = rawData[i][0]
    lectureObj.name = rawData[i][2]
    lectureObj.description = rawData[i+1][2]
    lectureObj.type = rawData[i+2][2]
    lectureObj.source = rawData[i+3][2]
    lectureObj.QnA = []

    if (lectureObj.type === 'quizz') {
      //Download file into local disk => read file => get quizz Object => delete file

      //Start downloading
      const uniqueID = Date.now()
      const fileUrl = lectureObj.source
      const outputPath = `../server/uploads/${uniqueID}.xlsx`
      await downloadFile(fileUrl, outputPath)
        .then(() => console.log('Download completed'))
        .catch((err) => {
          console.error('Download failed', err)
          return
        })

      //Start to get data from file
      try {
        const filePath = outputPath
        const workbook = xlsx.readFile(filePath)
        const quizzObject = convertToQuizObject(workbook)
        lectureObj.passpoint = quizzObject.passpoint
        lectureObj.during_time = quizzObject.during_time
        lectureObj.title = quizzObject.title
        lectureObj.questions = quizzObject.questions
        lectureObj.type = quizzObject.type

        // Delete the file using fs.unlink()
        try {
          fs.unlinkSync(filePath)
        } catch (err) {
          return
        }
      } catch (error) {
        return
      }
    }
    else if (lectureObj.type === 'assignment') {
      //Download file into local disk => read file => get assignment Object => delete file
      //Start downloading
      const uniqueID = Date.now()
      const fileUrl = lectureObj.source
      const outputPath = `../server/uploads/${uniqueID}`
      await downloadFile(fileUrl, outputPath)
        .then(() => console.log('Download completed'))
        .catch((err) => {
          console.error('Download failed', err)
          return
        })

      try {
        const filePath = outputPath
        const workbook = xlsx.readFile(filePath)
        const assignmentObject = convertToAssignmentObject(workbook)
        lectureObj.topics = assignmentObject.topics

        // Delete the file using fs.unlink()
        try {
          fs.unlinkSync(filePath)
        } catch (err) {
          return
        }
      } catch (error) {
        return
      }
    }
    lectures.push(lectureObj)
    lectureObj = {}
  }
  chapterObj.lectures = lectureObj
  return chapterObj
}

const convertToCourseObject = (workbook) => {
  const num_sheets = workbook.SheetNames.length
  let course_structure = {}
  let chapters = []
  let chapterObj = {}
  for (let i = 1; i < num_sheets; i++) {
    const sheetName = workbook.SheetNames[i]
    const sheet = workbook.Sheets[sheetName]
    if (i == 1)
      course_structure = convertGeneralInformation(sheet, course_structure)
    else {
      chapterObj = convertChapter(sheet)
      chapters.push(chapterObj)
    }
  }
  course_structure.chapters = chapters
}

export { convertToQuizObject, convertToAssignmentObject, convertToCourseObject }