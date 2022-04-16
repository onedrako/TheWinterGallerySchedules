const Joi = require('joi')

const id = Joi.number().integer()
const date = Joi.alternatives().try(Joi.date(), Joi.allow(null))
const title = Joi.alternatives().try(Joi.string(), Joi.allow(null))
const updatedBy = Joi.string()
const listOfDays = Joi.array().items(
  Joi.object({
    id: id,
    date: date,
    title: title,
    updatedBy: updatedBy.required()
  })
)

const createDaySchema = Joi.object({
  date: date,
  title: title.default(null),
  updatedBy: updatedBy.required()
})

const updateDaySchema = Joi.object({
  date: date,
  title: title,
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
