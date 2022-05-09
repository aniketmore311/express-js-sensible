//@ts-check
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const createError = require('http-errors')
const morgan = require('morgan')
const configService = require('./config/configService')

const app = express()

const NODE_ENV = configService.getConfig('NODE_ENV')

//middleware
app.use(cors())
//@ts-ignore
app.use(helmet())
app.use(express.json())

if (NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else if (NODE_ENV === 'production') {
  app.use(morgan('common'))
}

//healthchecks
app.get('/', (req, res) => {
  const resp = {
    status: 'ok',
  }
  return res.json(resp)
})
app.get('/health', (req, res) => {
  const resp = {
    status: 'ok',
  }
  return res.json(resp)
})

// register controllers
require('./controllers/userController')(app)

//error handlers
app.use(notFoundHander())
app.use(errorLogger())
app.use(errorHandler())

//handlers

/**
 * @returns {import("express").RequestHandler}
 */
function notFoundHander() {
  return function (req, res, next) {
    const err = createError(404, 'resource not found')
    next(err)
  }
}

/**
 * @returns {import("express").ErrorRequestHandler}
 */
function errorLogger() {
  return function (err, req, res, next) {
    console.error(err.stack)
    next(err)
  }
}

/**
 * @returns {import("express").ErrorRequestHandler}
 */
function errorHandler() {
  return function (err, req, res, next) {
    let message = 'Something went wrong'
    let status_code = 500
    if (err.statusCode) {
      status_code = err.statusCode
      message = err.message
    }
    res.status(status_code).json({
      message,
      status_code,
    })
  }
}

module.exports = app
