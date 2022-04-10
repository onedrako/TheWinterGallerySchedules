const { Model, DataTypes, Sequelize } = require('sequelize')

const { SCHEDULE_TABLE } = require('./schedules.model')
const { NOTE_TABLE } = require('./notes.model')

const DAY_TABLE = 'days'

const DaySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  updatedAt: {
    allowNull: false,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
    type: DataTypes.DATE
  },
  updatedBy: {
    field: 'updated_by',
    allowNull: false,
    type: DataTypes.STRING
  },
  scheduleId: {
    allowNull: true,
    field: 'schedule_id',
    type: DataTypes.INTEGER,
    references: {
      model: SCHEDULE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  noteId: {
    allowNull: true,
    field: 'note_id',
    type: DataTypes.INTEGER,
    references: {
      model: NOTE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Day extends Model {
  static associate (models) {
    this.belongsTo(models.Schedule, { as: 'schedule' })
    this.belongsTo(models.Note, { as: 'note' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: DAY_TABLE,
      modelName: 'Day',
      timeStamps: false
    }
  }
}

module.exports = { Day, DaySchema, DAY_TABLE }
