const express = require('express')
const passport = require('passport')

const validatorHandler = require('./../middlewares/validator.handler')
const { checkAdminRole } = require('./../middlewares/authHandler')

const DaysSchedulesService = require('./../services/days-schedules.service')

const router = express.Router()
const service = new DaysSchedulesService()
const {
  createDayScheduleSchema,
  getDayScheduleSchema,
  updateDayScheduleSchema,
  updateAllDaysSchedulesSchema,
  deleteDaysSchedulesByDayId
} = require('./../schemas/days-schedules.schemas')

router.get('/',
  async (req, res, next) => {
    try {
      const daysSchedules = await service.getAll()
      res.send(daysSchedules)
    } catch (err) {
      next(err)
    }
  })

router.get('/:id',
  validatorHandler(getDayScheduleSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const daySchedule = await service.getByDayId(id)
      res.send(daySchedule)
    } catch (err) {
      next(err)
    }
  })

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createDayScheduleSchema, 'body'),
  async (req, res, next) => {
    try {
      const newDaySchedule = await service.create(req.body)
      res.status(201).send(newDaySchedule)
    } catch (err) {
      next(err)
    }
  })

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getDayScheduleSchema, 'params'),
  validatorHandler(updateDayScheduleSchema, 'body'),
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
  validatorHandler(updateAllDaysSchedulesSchema, 'body'),
  async (req, res, next) => {
    try {
      const { listOfDaysSchedules } = req.body
      res.status(200).json(await service.updateAll(listOfDaysSchedules))
    } catch (err) {
      next(err)
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getDayScheduleSchema, 'params'),
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
  validatorHandler(deleteDaysSchedulesByDayId, 'params'),
  async (req, res, next) => {
    try {
      const { dayId } = req.params
      res.status(200).json(await service.deleteAllRelationsForDay(dayId))
    } catch (err) {
      next(err)
    }
  })

module.exports = router
