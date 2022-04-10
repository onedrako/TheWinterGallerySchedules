const Joi = require('joi')

const id = Joi.number().integer()
const title = Joi.string()
const initialTime = Joi.date().format('HH:mm')
const finalTime = Joi.date().format('HH:mm')
const updatedBy = Joi.string()

const createScheduleSchema = Joi.object({
  title: title.required(),
  initialTime: initialTime.required(),
  finalTime: finalTime.required(),
  updatedBy: updatedBy.required()
})

const updateScheduleSchema = Joi.object({
  title: title,
  initialTime: initialTime,
  finalTime: finalTime,
  updatedBy: updatedBy.required()
})

const getScheduleSchema = Joi.object({
  id: id.required()
})

module.exports = { createScheduleSchema, updateScheduleSchema, getScheduleSchema }
