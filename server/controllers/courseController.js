import Course from '../models/courseInfo.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getAllCourses = catchAsync(async (req, res, next) => {
  // Implement here
})

const getCourseById = catchAsync(async (req, res, next) => {
  // Implement here
})

// Tìm kiếm khóa học
const searchCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// Thông tin truy cập vào khóa học
const accessCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// Tạo mới khóa học
const createCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

// cập nhật thông tin khóa học
const updateCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

export default {
  getAllCourses,
  getCourseById,
  searchCourse,
  accessCourse,
  createCourse,
  updateCourse
}
