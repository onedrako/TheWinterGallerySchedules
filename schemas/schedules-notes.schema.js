const Joi = require('joi')

const id = Joi.number().integer()
const scheduleId = Joi.number().integer()
const noteId = Joi.number().integer()

const createScheduleNoteSchema = Joi.object({
  scheduleId: scheduleId.required(),
  noteId: noteId.required()
})

const updateScheduleNoteSchema = Joi.object({
  scheduleId: scheduleId,
  noteId: noteId
})

const getScheduleNoteSchema = Joi.object({
  id: id.required()
})

module.exports = { createScheduleNoteSchema, updateScheduleNoteSchema, getScheduleNoteSchema }
