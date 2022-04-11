const Joi = require('joi')

const id = Joi.number().integer()
const order = Joi.number().integer()
const dayId = Joi.number().integer()
const noteId = Joi.number().integer()
const titleColor = Joi.string()
const commentColor = Joi.string()

const createDayNoteSchema = Joi.object({
  order: order,
  dayId: dayId.required(),
  noteId: noteId.required(),
  titleColor: titleColor,
  commentColor: commentColor
})

const updateDayNoteSchema = Joi.object({
  order: order,
  dayId: dayId,
  noteId: noteId,
  titleColor: titleColor,
  commentColor: commentColor
})

const getDayNoteSchema = Joi.object({
  id: id.required()
})

module.exports = { createDayNoteSchema, updateDayNoteSchema, getDayNoteSchema }
