const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class DaysServices {
  async getAll () {
    try {
      const days = await models.Day.findAll({
        include: ['notes', 'schedules']
      })
      return days
    } catch (error) {
      throw boom.notFound('No hay días registrados')
    }
  }

  async getById (id) {
    try {
      const day = await models.Day.findOne({
        where: {
          id
        },
        include: ['notes', 'schedules']
      })
      if (day) {
        return day
      } else {
        throw boom.notFound('No se encontró el día')
      }
    } catch (error) {
      throw boom.notFound('No se encontró el día')
    }
  }

  async create (data) {
    const response = await models.Day.create(data)
    return response
  }

  async updateOne (id, changes) {
    try {
      const updatedDay = await models.Day.update(changes, {
        where: {
          id
        }
      })
      return updatedDay
    } catch (error) {
      throw boom.badRequest('No se pudo actualizar el día')
    }
  }

  async updateAll (listOfDays) {
    try {
      const updatedDays = await models.Day.bulkCreate(listOfDays, {
        updateOnDuplicate: ['date', 'title', 'updatedBy', 'noteId', 'scheduleId']
      })
      return updatedDays
    } catch (error) {
      throw boom.badRequest('No se pudo actualizar los días')
    }
  }
}

module.exports = DaysServices
