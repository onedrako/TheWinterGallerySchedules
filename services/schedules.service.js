const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class SchedulesService {
  async getAll () {
    try {
      const schedules = await models.Schedules.findAll()
      return schedules
    } catch (error) {
      throw boom.notFound('No hay horarios registrados')
    }
  }

  async getById (id) {
    try {
      const schedule = await models.Schedules.findOne({
        where: {
          id
        }
      })
      return schedule
    } catch (error) {
      throw boom.notFound('No se encontró el horario')
    }
  }

  async create (schedule) {
    try {
      const newSchedule = await models.Schedules.create(schedule)
      return newSchedule
    } catch (error) {
      throw boom.badRequest('No se pudo crear el horario')
    }
  }

  async updateOne (id, schedule) {
    try {
      const updatedSchedule = await models.Schedules.update(schedule, {
        where: {
          id
        }
      })
      return updatedSchedule
    } catch (error) {
      throw boom.badRequest('No se pudo actualizar el horario')
    }
  }

  async deleteOne (id) {
    try {
      const deletedSchedule = await models.Schedules.destroy({
        where: {
          id
        }
      })
      return deletedSchedule
    } catch (error) {
      throw boom.badRequest('No se pudo eliminar el horario')
    }
  }
}

module.exports = SchedulesService
