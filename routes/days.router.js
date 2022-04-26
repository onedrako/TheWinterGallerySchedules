const express = require('express')
const passport = require('passport')

const validatorHandler = require('./../middlewares/validator.handler')
const { checkAdminRole } = require('./../middlewares/authHandler')

const DaysService = require('./../services/days.service')

const router = express.Router()
const service = new DaysService()
const { createDaySchema, updateDaySchema, updateAllDaysSchema, getDaySchema } = require('./../schemas/days.schema')

router.get('/',
  async (req, res, next) => {
    try {
      const days = await service.getAll()
      res.send(days)
    } catch (err) {
      next(err)
    }
  })

router.get('/:id',
  validatorHandler(getDaySchema),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const day = await service.getById(id)
      res.send(day)
    } catch (err) {
      next(err)
    }
  })

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createDaySchema, 'body'),
  async (req, res, next) => {
    try {
      console.log(req.body)
      const day = await service.create(req.body)
      res.status(201).send(day)
    } catch (err) {
      next(err)
    }
  })

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getDaySchema, 'params'),
  validatorHandler(updateDaySchema, 'body'),
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
  validatorHandler(updateAllDaysSchema, 'body'),
  async (req, res, next) => {
    try {
      const { listOfDays } = req.body
      res.status(200).json(await service.updateAll(listOfDays))
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
