const Joi = require('joi')

const id = Joi.number().integer()
const order = Joi.alternatives().try(Joi.number().integer(), Joi.allow(null))
const dayId = Joi.number().integer()
const scheduleId = Joi.number().integer()
const titleColor = Joi.alternatives().try(Joi.string(), Joi.allow(null))
const timeColor = Joi.alternatives().try(Joi.string(), Joi.allow(null))
const listOfDaysSchedules = Joi.array().items(
  Joi.object({
    id,
    order: order,
    dayId,
    scheduleId
  })
)

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

const updateAllDaysSchedulesSchema = Joi.object({
  listOfDaysSchedules: listOfDaysSchedules.required()
})

const getDayScheduleSchema = Joi.object({
  id: id.required()
})

const deleteDaysSchedulesByDayId = Joi.object({
  dayId: dayId.required()
})

module.exports = {
  createDayScheduleSchema,
  updateDayScheduleSchema,
  updateAllDaysSchedulesSchema,
  getDayScheduleSchema,
  deleteDaysSchedulesByDayId
}
