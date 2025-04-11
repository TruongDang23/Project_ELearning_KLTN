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

export { formatTextfromPDF, downloadPDF }