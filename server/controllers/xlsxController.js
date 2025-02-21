import xlsx from 'xlsx'

const convertToQuizObject = (workbook) => {
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 })

  let jsonData = {
    name: rawData[0][1],
    title: rawData[1][1],
    during_time: rawData[2][1],
    passpoint: rawData[3][1],
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
    if (rawData[i][0] === title && rawData[i][1] === question)
    {
      //
    }
    else if (i == 1) {
      title = rawData[i][0]
      question = rawData[i][1]
    }
    else {
      const topic = {
        title: title,
        question: question,
        sample: sample,
        testcases: testcases
      }
      topics.push(topic)

      title = rawData[i][0]
      question = rawData[i][1]
      sample = []
      testcases = []
    }

    const sampleObj = {
      case: rawData[i][2],
      key: rawData[i][3]
    }
    const testcaseObj = {
      case: rawData[i][4],
      key: rawData[i][5]
    }
    sample.push(sampleObj)
    testcases.push(testcaseObj)
  }

  let jsonData = {
    topics: topics
  }

  return jsonData
}


export { convertToQuizObject, convertToAssignmentObject }