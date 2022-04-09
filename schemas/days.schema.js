const Joi = require('joi')

const id = Joi.number().integer()
const date = Joi.date().format('DD-MM-YYYY')
const title = Joi.alternatives().try(Joi.string(), Joi.allow(null))
const updatedBy = Joi.string()
const noteId = Joi.Joi.alternatives().try(Joi.number().integer(), Joi.allow(null))
const scheduleId = Joi.alternatives().try(Joi.number().integer(), Joi.allow(null))

// const listOfAllDays = Joi.object().items({ id, date, title, updatedBy, noteId, scheduleId })

const listOfDays = Joi.array().items(
  Joi.object().items(
    {
      date: date,
      title: title,
      updatedBy: updatedBy.required(),
      noteId: noteId,
      scheduleId: scheduleId
    }))

const createDaySchema = Joi.object({
  date: date.required(),
  title: title.default(null),
  noteId: noteId.default(null),
  scheduleId: scheduleId.default(null),
  updatedBy: updatedBy.required()
})

const updateDaySchema = Joi.object({
  date: date,
  title: title,
  noteId: noteId,
  scheduleId: scheduleId,
  updatedBy: updatedBy.required()
})

const updateAllDaysSchema = Joi.object({
  listOfDays: listOfDays.required()
})

const getDaySchema = Joi.object({
  id: id.required()
})

module.exports = {
  createDaySchema,
  updateDaySchema,
  updateAllDaysSchema,
  getDaySchema
}
