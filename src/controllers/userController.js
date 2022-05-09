//@ts-check
const express = require('express')
const { param } = require('express-validator')
const createError = require('http-errors')
const validate = require('../middleware/validate')
const catchAsync = require('../utils/catchAsync')

/**
 * @param {import("express").Application} app
 */
module.exports = function (app) {
  const router = express.Router()
  const users = [
    {
      name: 'John',
      age: 30,
      id: 1,
    },
    {
      name: 'Mary',
      age: 25,
      id: 2,
    },
  ]
  router.get(
    '/',
    catchAsync(async (req, res) => {
      res.json({ data: users })
    })
  )
  router.get(
    '/:id',
    param('id').isNumeric(),
    validate(),
    catchAsync(async (req, res) => {
      const id = Number(req.params.id)
      const user = users.find((user) => user.id === id)
      if (!user) {
        const err = createError(404, 'user not found')
        throw err
      }
      res.json({
        data: user,
      })
    })
  )
  app.use('/api/v1/users', router)
}
