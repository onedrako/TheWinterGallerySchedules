const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class DaysSchedule {
  async getAll () {
    try {
      const daysSchedules = await models.DaySchedule.findAll()
      return daysSchedules
    } catch (error) {
      throw boom.notFound('No hay horarios registrados')
    }
  }

  async getById (id) {
    try {
      const daySchedule = await models.DaySchedule.findOne({
        where: {
          id
        }
      })
      return daySchedule
    } catch (error) {
      throw boom.notFound('No se encontró el horario')
    }
  }

  async create (daySchedule) {
    try {
      const newDaySchedule = await models.DaySchedule.create(daySchedule)
      return newDaySchedule
    } catch (error) {
      throw boom.badRequest('No se pudo crear el horario')
    }
  }

  async updateOne (id, daySchedule) {
    try {
      const updatedDaySchedule = await models.DaySchedule.update(daySchedule, {
        where: {
          id
        }
      })
      return updatedDaySchedule
    } catch (error) {
      throw boom.badRequest('No se pudo actualizar el horario')
    }
  }

  async deleteOne (id) {
    try {
      const deletedDaySchedule = await models.DaySchedule.destroy({
        where: {
          id
        }
      })
      return deletedDaySchedule
    } catch (error) {
      throw boom.badRequest('No se pudo eliminar el horario')
    }
  }
}

module.exports = DaysSchedule
