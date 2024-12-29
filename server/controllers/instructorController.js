import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getByID = catchAsync(async (req, res, next) => {
  // Implement here
})

const getAll = catchAsync(async (req, res, next) => {
  // Implement here
})

const update = catchAsync(async (req, res, next) => {
  // Implement here
})

// Q&A khóa học
const getQnA = catchAsync(async (req, res, next) => {
  // Implement here
})

// Gửi xét duyệt khóa học
const sendApproveCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

export default { getByID, getAll, update, getQnA, sendApproveCourse }
