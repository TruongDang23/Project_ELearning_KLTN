import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getAll = catchAsync(async (req, res, next) => {
  // Implement here
})

const getByID = catchAsync(async (req, res, next) => {
  // Implement here
})

const update = catchAsync(async (req, res, next) => {
  // Implement here
})

const updateProgressCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

const reviewCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

const buyCourse = catchAsync(async (req, res, next) => {
  // Implement here
})

export default {
  getAll,
  getByID,
  update,
  updateProgressCourse,
  reviewCourse,
  buyCourse
}
