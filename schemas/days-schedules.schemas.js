const Joi = require('joi')

const id = Joi.number().integer()
const order = Joi.alternatives().try(Joi.number().integer(), Joi.allow(null))
const dayId = Joi.number().integer()
const scheduleId = Joi.number().integer()
const titleColor = Joi.alternatives().try(Joi.string(), Joi.allow(null))
const timeColor = Joi.alternatives().try(Joi.string(), Joi.allow(null))

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
