const express = require('express')

const usersRouter = require('./users.router')
const daysRouter = require('./days.router')
const notesRouter = require('./notes.router')
const schedulesRouter = require('./schedules.router')
const schedulesNotesRouter = require('./schedules-notes.router')
const backgroundsRouter = require('./backgrounds.router')

function routerApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/users', usersRouter)
  router.use('/days', daysRouter)
  router.use('/notes', notesRouter)
  router.use('/schedules', schedulesRouter)
  router.use('/schedules-notes', schedulesNotesRouter)
  router.use('/backgrounds', backgroundsRouter)
}

module.exports = routerApi
