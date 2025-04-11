import catchAsync from '../utils/catchAsync.js'
import client from '../config/connAzureOpenAI.js'
import path from 'path'
import extract from 'pdf-text-extract'
import { formatTextfromPDF, downloadPDF } from '../utils/format.js'
import { uuid } from 'uuidv4'
import fs from 'fs'

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

export default { chatAI, extractPDFText }
