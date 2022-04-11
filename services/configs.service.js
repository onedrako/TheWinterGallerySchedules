const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class ConfigServices {
  async getAll () {
    try {
      const configs = await models.Config.findAll()
      return configs
    } catch (error) {
      throw boom.notFound('No hay configuraciones registradas')
    }
  }

  async getById (id) {
    try {
      const config = await models.Config.findOne({
        where: {
          id
        }
      })
      return config
    } catch (error) {
      throw boom.notFound('No se encontró la configuración')
    }
  }

  async create (config) {
    try {
      const newConfig = await models.Config.create(config)
      return newConfig
    } catch (error) {
      throw boom.badRequest('No se pudo crear la configuración')
    }
  }

  async updateOne (id, config) {
    try {
      const updatedBackground = await models.Config.update(config, {
        where: {
          id
        }
      })
      return updatedBackground
    } catch (error) {
      throw boom.badRequest('No se pudo actualizar la configuración')
    }
  }
}

module.exports = ConfigServices
