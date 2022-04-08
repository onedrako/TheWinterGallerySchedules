const { Model, DataTypes, Sequelize } = require('sequelize')

const { SCHEDULE_TABLE } = require('./schedule.model')
const { NOTE_TABLE } = require('./note.model')

const DAY_TABLE = 'dates_model'

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
  createdAt: {
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
    type: DataTypes.DATE
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
  static associations (models) {
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
