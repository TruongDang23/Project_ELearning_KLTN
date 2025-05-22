import fs from 'fs'
import axios from 'axios'

function formatTextfromPDF(lines) {
  return lines
    .map(line => line.trim().replace(/\r\n/g, '\n'))
    .join('\n\n')
}

// Support Google Sheets
function convertToDownLoadLink(url) {
  // Format share link: https://docs.google.com/spreadsheets/d/1xrvxSI7PYGq0O6WT3FzG20E0G9QgKULP/edit?usp=drive_link
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/)
  const id = match ? match[1] : null // 1xrvxSI7PYGq0O6WT3FzG20E0G9QgKULP

  // Format download link: https://docs.google.com/uc?export=view&id=1xrvxSI7PYGq0O6WT3FzG20E0G9QgKULP
  const downloadLink = `https://docs.google.com/uc?export=view&id=${id}`
  return downloadLink
}

// Support Youtube
function convertToEmbedLink(url) {
  // Fomat link youtube on url bar: https://www.youtube.com/watch?v=EqKUpelTb6A&list=RD3mY-cD25lPs&index=11
  const match = url.match(/\/?v=([a-zA-Z0-9-_]{11})/)
  const id = match ? match[1] : null //EqKUpelTb6A

  // Format embed link: https://www.youtube.com/embed/EqKUpelTb6A
  const embedLink = `https://www.youtube.com/embed/${id}`
  return embedLink
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

export {
  formatTextfromPDF,
  downloadPDF,
  formatContentForRecommendModel,
  formatVND,
  convertToDownLoadLink,
  convertToEmbedLink
}