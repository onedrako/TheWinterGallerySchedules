const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')

const validatorHandler = require('./../middlewares/validator.handler')
const { checkAdminRole } = require('./../middlewares/authHandler')

const ConfigService = require('../services/configs.service')

const { createConfigSchema, updateConfigSchema, getConfigSchema } = require('../schemas/configs.schema')

const router = express.Router()
const service = new ConfigService()

router.get('/',
  async (req, res, next) => {
    try {
      const backgrounds = await service.getAll()
      if (!backgrounds[0]) {
        throw boom.notFound('No se encontraron configuraciones')
      }
      res.send(backgrounds[0])
    } catch (err) {
      next(err)
    }
  })

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createConfigSchema),
  async (req, res, next) => {
    try {
      const background = await service.create(req.body)
      res.status(201).send(background)
    } catch (err) {
      next(err)
    }
  })

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getConfigSchema, 'params'),
  validatorHandler(updateConfigSchema, 'body'), async (req, res, next) => {
    try {
      const { id } = req.params
      const background = await service.updateOne(id, req.body)
      res.status(201).send(background)
    } catch (err) {
      next(err)
    }
  })

module.exports = router
