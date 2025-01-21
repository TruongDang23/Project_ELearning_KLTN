// Put file PDf to google cloud Storage
import storage from '../config/connGCS.js'
import fs from 'fs'

const putFileToStorage = async (bucketName, ID, file, destName) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {

    // The path to your file to upload
    const filePath = file

    // The new ID for your GCS file
    const destFileName = `${ID}/${destName}` // Assuming `file` has an `originalname` property

    try {
      const options = {
        destination: destFileName,
        preconditionOpts: { ifGenerationMatch: 0 }
      }

      await storage.bucket(bucketName).upload(filePath, options)
      const url = `https://storage.googleapis.com/${bucketName}/${destFileName}`

      // Delete the file using fs.unlink()
      try {
        fs.unlinkSync(filePath)
      } catch (err) {
        reject(err)
      }

      resolve(url)
    } catch (error) {
      reject(error)
    }
  })
}


const attachFile = async (bucketName, ID, file, destName) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // Tạo tên file đích trên GCS
    const destFileName = `${ID}/${destName}` // Sử dụng `ID` và `destName` để tổ chức file

    try {
      // Truy cập bucket và tạo đối tượng file
      const bucket = storage.bucket(bucketName)
      const blob = bucket.file(destFileName)

      // Ghi dữ liệu buffer vào file trên GCS
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype // Loại MIME của file (image/jpeg, image/png, v.v.)
      })

      // Lắng nghe các sự kiện
      blobStream.on('error', (err) => {
        reject(err)
      })

      blobStream.on('finish', () => {
        // URL công khai của file (nếu cần)
        const url = `https://storage.googleapis.com/${bucketName}/${destFileName}`
        resolve(url)
      })

      // Ghi dữ liệu buffer từ file
      blobStream.end(file.buffer)
    } catch (error) {
      reject(error)
    }
  })
}

export { putFileToStorage, attachFile }
