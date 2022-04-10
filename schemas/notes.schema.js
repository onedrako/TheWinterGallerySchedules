const Joi = require('joi')

const id = Joi.number().integer()
const title = Joi.alternatives().try(Joi.string(), Joi.allow(null))
const comment = Joi.alternatives().try(Joi.string(), Joi.allow(null))
const updatedBy = Joi.string()

const createNoteSchema = Joi.object({
  title: title,
  comment: comment,
  updatedBy: updatedBy.required()
})

const updateNoteSchema = Joi.object({
  title: title,
  comment: comment,
  updatedBy: updatedBy.required()
})

const getNoteSchema = Joi.object({
  id: id.required()
})

module.exports = { createNoteSchema, updateNoteSchema, getNoteSchema }
