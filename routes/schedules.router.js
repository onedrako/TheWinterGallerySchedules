const express = require('express')
const validatorHandler = require('./../middlewares/validator.handler')

const SchedulesService = require('./../services/schedules.service')

const router = express.Router()
const service = new SchedulesService()
const { createScheduleSchema, updateScheduleSchema, getScheduleSchema } = require('./../schemas/schedules.schema')

router.get('/',
  async (req, res, next) => {
    try {
      const data = await service.getAll()
      res.json(data)
    } catch (err) {
      next(err)
    }
  }
)

router.get('/:id',
  validatorHandler(getScheduleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const data = await service.getById(id)
      if (!data) {
        return res.status(404).json({
          message: 'Horario no encontrado'
        })
      }
      res.json(data)
    } catch (err) {
      next(err)
    }
  })

router.post('/',
  validatorHandler(createScheduleSchema),
  async (req, res, next) => {
    try {
      const data = await service.create(req.body)
      res.json(data)
    } catch (err) {
      next(err)
    }
  })

router.patch('/:id',
  validatorHandler(getScheduleSchema, 'params'),
  validatorHandler(updateScheduleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      res.status(201).json(await service.updateOne(id, body))
    } catch (err) {
      next(err)
    }
  })

router.delete('/:id',
  validatorHandler(getScheduleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      await service.deleteOne(id)
      res.json({ id })
    } catch (err) {
      next(err)
    }
  })

module.exports = router
