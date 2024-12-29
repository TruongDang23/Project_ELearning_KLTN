import User from '../models/user.js'
import catchAsync from '../utils/catchAsync.js'

const getUserById = catchAsync(async (req, res, next) => {
  // Implement here
})

const updateUser = catchAsync(async (req, res, next) => {
  // Implement here
})

export default { getUserById, updateUser }
