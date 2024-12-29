import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getByID = catchAsync(async (req, res, next) => {
  // Implement here
})

const update = catchAsync(async (req, res, next) => {
  // Implement here
})

// Xét duyệt khóa học dựa vào courseID
const approveCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// Từ chối xét duyệt khóa học dựa vào courseID
const rejectCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// Khóa khóa học dựa vào courseID
const terminateCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// Q&A khóa học
const getQnA = catchAsync(async (req, res, next) => {
  // Implement here
})

// KHóa tài khoản
const blockUser = catchAsync(async (req, res, next) => {
  // Implement here
})

export default {
  getByID,
  update,
  approveCourse,
  rejectCourse,
  terminateCourse,
  getQnA,
  blockUser
}
