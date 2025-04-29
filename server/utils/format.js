import fs from 'fs'
import axios from 'axios'

function formatTextfromPDF(lines) {
  return lines
    .map(line => line.trim().replace(/\r\n/g, '\n'))
    .join('\n\n')
}


async function downloadPDF(url, outputPath) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(outputPath)

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  } catch (error) {
    throw ('Error downloading file:', error)
  }
}

function formatContentForRecommendModel(data) {
  return data.map(course => {
    const { courseID, ...rest } = course;
    // Nối tất cả các trường còn lại thành 1 chuỗi
    const content = Object.values(rest)
      .flat() // nếu là mảng thì flatten
      .join(". ") // nối bằng dấu chấm cách

    return {
      courseID,
      content
    }
  })
}

function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

export { formatTextfromPDF, downloadPDF, formatContentForRecommendModel, formatVND }