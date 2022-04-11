const { Model, DataTypes } = require('sequelize')
const { DAY_TABLE } = require('./days.model')
const { NOTE_TABLE } = require('./notes.model')

const DAY_NOTE_TABLE = 'days_schedule'

const DayNoteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  order: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  dayId: {
    allowNull: false,
    field: 'day_id',
    type: DataTypes.INTEGER,
    references: {
      model: DAY_TABLE,
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
  },
  titleColor: {
    allowNull: true,
    type: DataTypes.STRING
  },
  commentColor: {
    allowNull: true,
    type: DataTypes.STRING
  }
}

class DayNote extends Model {
  static associate (models) {
    //
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: DAY_NOTE_TABLE,
      modelName: 'DayNote',
      timestamps: false
    }
  }
}

module.exports = { DayNote, DayNoteSchema, DAY_NOTE_TABLE }
