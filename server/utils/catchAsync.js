// Used to catch errors in async functions and pass them to the next middleware
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

export default catchAsync
