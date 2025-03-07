import xlsx from 'xlsx'

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


export { convertToQuizObject, convertToAssignmentObject }