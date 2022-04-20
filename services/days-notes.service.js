const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class DaysNotes {
  async getAll () {
    try {
      const daysSchedules = await models.DayNote.findAll()
      return daysSchedules
    } catch (error) {
      throw boom.notFound('No hay datos')
    }
  }

  async getByDayId (id) {
    try {
      const daySchedule = await models.DayNote.findAll({
        where: {
          dayId: id
        },
        include: 'note'
      })
      return daySchedule
    } catch (error) {
      throw boom.notFound('No se encontró el horario')
    }
  }

  async create (daySchedule) {
    try {
      const newDaySchedule = await models.DayNote.create(daySchedule)
      return newDaySchedule
    } catch (error) {
      throw boom.badRequest('No se pudo crear el horario')
    }
  }

  async updateOne (id, daySchedule) {
    try {
      const updatedDaySchedule = await models.DayNote.update(daySchedule, {
        where: {
          id
        }
      })
      return updatedDaySchedule
    } catch (error) {
      throw boom.badRequest('No se pudo actualizar el horario')
    }
  }

  async updateAll (listOfDaysSchedules) {
    try {
      const updatedDaysSchedules = await models.DayNote.bulkCreate(listOfDaysSchedules, {
        updateOnDuplicate: ['order']
      })
      return updatedDaysSchedules
    } catch (error) {
      throw boom.badRequest('No se pudo actualizar los horarios', error)
    }
  }

  async deleteOne (id) {
    try {
      const deletedDaySchedule = await models.DayNote.destroy({
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

module.exports = DaysNotes
