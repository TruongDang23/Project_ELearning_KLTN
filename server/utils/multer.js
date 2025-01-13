import multer, { diskStorage } from 'multer'
import { extname } from 'path'
// SET STORAGE
var storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + extname(file.originalname))
  }
})
// Use for create course
const uploadDisk = multer({ storage: storage })

// Use for update/create avatar
const uploadTemp = multer({ storage: multer.memoryStorage() })

export { uploadDisk, uploadTemp }