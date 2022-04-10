const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class BackgroundServices {
  async getAll () {
    try {
      const backgrounds = await models.Background.findAll()
      return backgrounds
    } catch (error) {
      throw boom.notFound('No hay fondos registrados')
    }
  }

  async getById (id) {
    try {
      const background = await models.Background.findOne({
        where: {
          id
        }
      })
      return background
    } catch (error) {
      throw boom.notFound('No se encontró el fondo')
    }
  }

  async create (background) {
    try {
      const newBackground = await models.Background.create(background)
      return newBackground
    } catch (error) {
      throw boom.badRequest('No se pudo crear el fondo')
    }
  }

  async updateOne (id, background) {
    try {
      const updatedBackground = await models.Background.update(background, {
        where: {
          id
        }
      })
      return updatedBackground
    } catch (error) {
      throw boom.badRequest('No se pudo actualizar el fondo')
    }
  }
}

module.exports = BackgroundServices
