
import catchAsync from '../utils/catchAsync.js'
import connectMysql from '../config/connMySql.js'

const loadMasterData = catchAsync(async (req, res, next) => {
  let languages = [], levels = [], categories = []

  const connection = connectMysql.promise()
  let queryLanguage = `SELECT name FROM languages ORDER BY id`
  let queryLevel = `SELECT name FROM levels ORDER BY id`
  let queryCategories = `SELECT name FROM categories ORDER BY id`

  try {
    const [rowsLanguages] = await connection.query(queryLanguage)
    const [rowsLevel] = await connection.query(queryLevel)
    const [rowsCategories] = await connection.query(queryCategories)

    languages = (rowsLanguages) ? rowsLanguages.map(row => row.name) : []
    levels = (rowsLevel) ? rowsLevel.map(row => row.name) : []
    categories = (rowsCategories) ? rowsCategories.map(row => row.name) : []

    res.status(200).send({
      languages: languages,
      levels: levels,
      categories: categories
    })
  }
  catch (error) {
    next(error)
  }
})

const addMasterData = catchAsync(async (req, res, next) => {
  const { object, name } = req.body.data
  const connection = connectMysql.promise()
  let query = `INSERT INTO ?? (name) VALUES (?)`

  try {
    const [rows] = await connection.query(query, [object, name])
    if (rows.affectedRows != 0) {
      res.status(201).send()
    }
    else {
      next({ status: 400, message: `Error when insert ${name} into table ${object}` })
    }
  }
  catch (error) {
    next(error)
  }
})

const deleteMasterData = catchAsync(async (req, res, next) => {
  const { object, name } = req.body

  const connection = connectMysql.promise()
  let query = `DELETE FROM ?? WHERE name = ?`

  try {
    const [rows] = await connection.query(query, [object, name])
    if (rows.affectedRows != 0) {
      res.status(204).send()
    }
    else {
      next({ status: 400, message: `Error when delete ${name} from table ${object}` })
    }
  }
  catch (error) {
    next(error)
  }
})
export default { loadMasterData, addMasterData, deleteMasterData }
