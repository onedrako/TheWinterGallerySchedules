const { Model, DataTypes } = require('sequelize')
const { SCHEDULE_TABLE } = require('./schedule.model')
const { NOTE_TABLE } = require('./note.model')

const SCHEDULE_NOTE_TABLE = 'schedule_notes_model'

const ScheduleNoteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  scheduleId: {
    allowNull: false,
    field: 'schedule_id',
    type: DataTypes.INTEGER,
    references: {
      model: SCHEDULE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  noteId: {
    allowNull: false,
    field: 'note_id',
    type: DataTypes.INTEGER,
    references: {
      model: NOTE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

class ScheduleNote extends Model {
  static associate (models) {
    //
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: SCHEDULE_NOTE_TABLE,
      modelName: 'ScheduleNote',
      timeStamps: false
    }
  }
}

module.exports = { ScheduleNote, ScheduleNoteSchema, SCHEDULE_NOTE_TABLE }
