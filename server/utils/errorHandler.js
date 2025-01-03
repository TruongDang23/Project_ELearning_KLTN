const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  
  console.error(`[ERROR] ${status} - ${message}`)
  
  res.status(status).send({
    success: false,
    error: message,
  })
}

export default errorHandler