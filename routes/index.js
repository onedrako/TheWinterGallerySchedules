const express = require('express')

const usersRouter = require('./users.router')
const daysRouter = require('./days.router')
const notesRouter = require('./notes.router')
const schedulesRouter = require('./schedules.router')
const daysSchedulesRouter = require('./days-schedules.router')
const daysNotesRouter = require('./days-notes.router')
const configsRouter = require('./configs.router')
const authRouter = require('./auth.router')

function routerApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/users', usersRouter)
  router.use('/days', daysRouter)
  router.use('/notes', notesRouter)
  router.use('/schedules', schedulesRouter)
  router.use('/configs', configsRouter)
  router.use('/days-schedules', daysSchedulesRouter)
  router.use('/days-notes', daysNotesRouter)
  router.use('/auth', authRouter)
}

module.exports = routerApi
