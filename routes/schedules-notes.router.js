const express = require('express')
const validatorHandler = require('./../middlewares/validator.handler')

const { createScheduleNoteSchema, updateScheduleNoteSchema, getScheduleNoteSchema } = require('./../schemas/schedules-notes.schema')

const SchedulesNotesService = require('./../services/schuedule-notes.service')

const router = express.Router()
const service = new SchedulesNotesService()

router.get('/',
  async (req, res, next) => {
    try {
      const data = await service.getAll()
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  })

router.post('/',
  validatorHandler(createScheduleNoteSchema),
  async (req, res, next) => {
    try {
      const data = await service.create(req.body)
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  })

router.patch('/:id',
  validatorHandler(getScheduleNoteSchema, 'params'),
  validatorHandler(updateScheduleNoteSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      res.status(201).json(await service.update(id, body))
    } catch (err) {
      next(err)
    }
  })

router.delete('/:id',
  validatorHandler(getScheduleNoteSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      await service.deleteOne(id)
      res.status(204).json({ id })
    } catch (err) {
      next(err)
    }
  })

module.exports = router
