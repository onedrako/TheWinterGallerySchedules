const Joi = require('joi')

const id = Joi.number().integer()
const url = Joi.alternatives().try(Joi.string(), Joi.allow(null))

const createBackgroundSchema = Joi.object({
  url: url.required()
})

const updateBackgroundSchema = Joi.object({
  url: url.required()
})

const getBackgroundSchema = Joi.object({
  id: id.required()
})

module.exports = { createBackgroundSchema, updateBackgroundSchema, getBackgroundSchema }
