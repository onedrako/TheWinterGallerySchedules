const Joi = require('joi')

const id = Joi.number().integer()
const order = Joi.number().integer()
const dayId = Joi.number().integer()
const scheduleId = Joi.number().integer()
const titleColor = Joi.string()
const timeColor = Joi.string()

const createDayScheduleSchema = Joi.object({
  order: order,
  dayId: dayId.required(),
  scheduleId: scheduleId.required(),
  titleColor: titleColor,
  timeColor: timeColor
})

const updateDayScheduleSchema = Joi.object({
  order: order,
  dayId: dayId,
  scheduleId: scheduleId,
  titleColor: titleColor,
  timeColor: timeColor
})

const getDayScheduleSchema = Joi.object({
  id: id.required()
})

module.exports = { createDayScheduleSchema, updateDayScheduleSchema, getDayScheduleSchema }
