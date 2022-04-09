const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class NotesServices {
  async getAll () {
    try {
      const notes = await models.Notes.findAll()
      return notes
    } catch (error) {
      throw boom.notFound('No hay notas registrados')
    }
  }

  async getById (id) {
    try {
      const note = await models.Notes.findOne({
        where: {
          id
        }
      })
      return note
    } catch (error) {
      throw boom.notFound('No se encontró la nota')
    }
  }

  async create (note) {
    try {
      const newNote = await models.Notes.create(note)
      return newNote
    } catch (error) {
      throw boom.badRequest('No se pudo crear la nota')
    }
  }

  async updateOne (id, note) {
    try {
      const updatedNote = await models.Notes.update(note, {
        where: {
          id
        }
      })
      return updatedNote
    } catch (error) {
      throw boom.badRequest('No se pudo actualizar la nota')
    }
  }

  async deleteOne (id) {
    try {
      const deletedNote = await models.Notes.destroy({
        where: {
          id
        }
      })
      return deletedNote
    } catch (error) {
      throw boom.badRequest('No se pudo eliminar la nota')
    }
  }
}

module.exports = NotesServices
