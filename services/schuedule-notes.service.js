const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class SchedulesNotesService {
  async getAll () {
    try {
      const schedulesNotes = await models.SchedulesNotes.findAll()
      return schedulesNotes
    } catch (error) {
      throw boom.notFound('No hay notas registradas')
    }
  }

  async getById (id) {
    try {
      const scheduleNote = await models.SchedulesNotes.findOne({
        where: {
          id
        }
      })
      return scheduleNote
    } catch (error) {
      throw boom.notFound('No se encontró la nota')
    }
  }

  async create (scheduleNote) {
    try {
      const newScheduleNote = await models.SchedulesNotes.create(scheduleNote)
      return newScheduleNote
    } catch (error) {
      throw boom.badRequest('No se pudo crear la nota')
    }
  }

  async updateOne (id, scheduleNote) {
    try {
      const updatedScheduleNote = await models.SchedulesNotes.update(scheduleNote, {
        where: {
          id
        }
      })
      return updatedScheduleNote
    } catch (error) {
      throw boom.badRequest('No se pudo actualizar la nota')
    }
  }

  async deleteOne (id) {
    try {
      const deletedScheduleNote = await models.SchedulesNotes.destroy({
        where: {
          id
        }
      })
      return deletedScheduleNote
    } catch (error) {
      throw boom.badRequest('No se pudo eliminar la nota')
    }
  }
}

module.exports = SchedulesNotesService
