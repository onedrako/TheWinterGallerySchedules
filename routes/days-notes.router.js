const express = require('express')
const passport = require('passport')

const validatorHandler = require('./../middlewares/validator.handler')
const { checkAdminRole } = require('./../middlewares/authHandler')

const DaysNotesService = require('./../services/days-notes.service')

const router = express.Router()
const service = new DaysNotesService()
const {
  createDayNoteSchema,
  updateDayNoteSchema,
  updateAllDaysNotesSchema,
  getDayNoteSchema,
  deleteDaysNotesByDayId
} = require('./../schemas/days-notes.schemas')

router.get('/',
  async (req, res, next) => {
    try {
      const daysNotes = await service.getAll()
      res.send(daysNotes)
    } catch (err) {
      next(err)
    }
  })

router.get('/:id',
  validatorHandler(getDayNoteSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const dayNote = await service.getByDayId(id)
      res.send(dayNote)
    } catch (err) {
      next(err)
    }
  })

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createDayNoteSchema, 'body'),
  async (req, res, next) => {
    try {
      const newDayNote = await service.create(req.body)
      res.status(201).send(newDayNote)
    } catch (err) {
      next(err)
    }
  })

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getDayNoteSchema, 'params'),
  validatorHandler(updateDayNoteSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      res.status(200).json(await service.updateOne(id, body))
    } catch (err) {
      next(err)
    }
  }
)

router.patch('/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(updateAllDaysNotesSchema, 'body'),
  async (req, res, next) => {
    try {
      const { listOfDaysNotes } = req.body
      res.status(200).json(await service.updateAll(listOfDaysNotes))
    } catch (err) {
      next(err)
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getDayNoteSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      res.status(200).json(await service.deleteOne(id))
    } catch (err) {
      next(err)
    }
  })

router.delete('/day/:dayId',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(deleteDaysNotesByDayId, 'params'),
  async (req, res, next) => {
    try {
      const { dayId } = req.params
      res.status(200).json(await service.deleteAllRelationsForDay(dayId))
    } catch (err) {
      next(err)
    }
  })

module.exports = router
