const Joi = require('joi')

const id = Joi.number().integer()
const backgroundImageUrl = Joi.alternatives().try(Joi.string(), Joi.allow(null))
const backgroundColor = Joi.alternatives().try(Joi.string(), Joi.allow(null))
const mainTitlesColor = Joi.alternatives().try(Joi.string(), Joi.allow(null))
const mainTextsColor = Joi.alternatives().try(Joi.string(), Joi.allow(null))
const fontFamily = Joi.alternatives().try(Joi.string(), Joi.allow(null))

const createConfigSchema = Joi.object({
  backgroundImageUrl: backgroundImageUrl,
  backgroundColor: backgroundColor,
  mainTitlesColor: mainTitlesColor,
  mainTextsColor: mainTextsColor,
  fontFamily: fontFamily
})

const updateConfigSchema = Joi.object({
  backgroundImageUrl: backgroundImageUrl,
  backgroundColor: backgroundColor,
  mainTitlesColor: mainTitlesColor,
  mainTextsColor: mainTextsColor,
  fontFamily: fontFamily
})

const getConfigSchema = Joi.object({
  id: id.required()
})

module.exports = { createConfigSchema, updateConfigSchema, getConfigSchema }
