import xlsx from 'xlsx'
import fs from 'fs'
import axios from 'axios'
import { convertToDownLoadLink, convertToEmbedLink } from '../utils/format'

let max_lecture = 0

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
    if (key === 'video_introduce')
      value = convertToEmbedLink(value) // Just support youtube link
    course_structure[key] = value
  }
  return course_structure
}

const convertChapter = async (sheet) => {
  const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 })
  let chapterObj = { chapter_name: rawData[0][1], lectures: [] }

  const lectures = await Promise.all(
    Array.from({ length: Math.floor((rawData.length - 2) / 4) }, (_, i) =>
      processLecture(rawData, 2 + i * 4)
    )
  )

  chapterObj.lectures = lectures
  return chapterObj
}

const processLecture = async (rawData, index) => {
  let lectureObj = {
    id: rawData[index][0],
    name: rawData[index][2],
    description: rawData[index + 1][2],
    type: rawData[index + 2][2],
    source: rawData[index + 3][2],
    QnA: []
  }

  if (lectureObj.id >= max_lecture)
    max_lecture = lectureObj.id

  let downloadUrl, embedUrl

  if (lectureObj.type === "quizz") {
    // When user upload share link => convert it to download link
    // Supported link: Google Sheets
    downloadUrl = convertToDownLoadLink(lectureObj.source)
    if (downloadUrl)
      lectureObj.source = downloadUrl
    const quizzObject = await processQuizzOrAssignment(lectureObj.source, convertToQuizObject)
    Object.assign(lectureObj, quizzObject)
  } else if (lectureObj.type === "assignment") {
    // When user upload share link => convert it to download link
    // Supported link: Google Sheets
    downloadUrl = convertToDownLoadLink(lectureObj.source)
    if (downloadUrl)
      lectureObj.source = downloadUrl
    const assignmentObject = await processQuizzOrAssignment(lectureObj.source, convertToAssignmentObject)
    Object.assign(lectureObj, assignmentObject)
  } else if (lectureObj.type === "video") {
    // When user upload share link => convert it to embed link
    // Supported link: Youtube
    embedUrl = convertToEmbedLink(lectureObj.source)
    if (embedUrl)
      lectureObj.source = embedUrl
  }

  return lectureObj
}

const processQuizzOrAssignment = async (fileUrl, convertFunction) => {
  const uniqueID = Date.now()
  const outputPath = `../server/uploads/${uniqueID}.xlsx`

  try {
    await downloadFile(fileUrl, outputPath)
    console.log("Download completed")

    const workbook = xlsx.readFile(outputPath)
    const result = convertFunction(workbook)

    fs.unlinkSync(outputPath)
    return result
  } catch (error) {
    return {}
  }
}

const convertToCourseObject = async(workbook) => {
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
      try {
        chapterObj = await convertChapter(sheet)
        chapters.push(chapterObj)
      }
      catch (error) {
        //console.log('error when convert Chapter', error)
      }
    }
  }
  course_structure.chapters = chapters
  course_structure.num_lecture = max_lecture
  return course_structure
}

export { convertToQuizObject, convertToAssignmentObject, convertToCourseObject }