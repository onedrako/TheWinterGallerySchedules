const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class DaysServices {
  async getAll () {
    try {
      const days = await models.Days.findAll()
      return days
    } catch (error) {
      throw boom.notFound('No hay días registrados')
    }
  }

  async getById (id) {
    try {
      const day = await models.Days.findOne({
        where: {
          id
        }
      })
      return day
    } catch (error) {
      throw boom.notFound('No se encontró el día')
    }
  }

  async create (day) {
    try {
      const newDay = await models.Days.create(day)
      return newDay
    } catch (error) {
      throw boom.badRequest('No se pudo crear el día')
    }
  }

  async updateOne (id, day) {
    try {
      const updatedDay = await models.Days.update(day, {
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
      const updatedDays = await models.Days.bulkCreate(listOfDays)
      return updatedDays
    } catch (error) {
      throw boom.badRequest('No se pudo actualizar los días')
    }
  }
}

module.exports = DaysServices
