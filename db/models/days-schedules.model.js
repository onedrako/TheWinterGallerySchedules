const { Model, DataTypes } = require('sequelize')
const { SCHEDULE_TABLE } = require('./schedules.model')
const { DAY_TABLE } = require('./days.model')

const DAY_SCHEDULE_TABLE = 'days_schedule'

const DayScheduleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true
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
  titleColor: {
    allowNull: true,
    type: DataTypes.STRING
  },
  timeColor: {
    allowNull: true,
    type: DataTypes.STRING
  }
}

class DaySchedule extends Model {
  static associate (models) {
    this.hasMany(models.Day, {
      as: 'day',
      foreignKey: 'id',
      sourceKey: 'dayId'
    })
    this.hasMany(models.Schedule, {
      as: 'schedule',
      foreignKey: 'id',
      sourceKey: 'scheduleId'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: DAY_SCHEDULE_TABLE,
      modelName: 'DaySchedule',
      timestamps: false
    }
  }
}

module.exports = { DaySchedule, DayScheduleSchema, DAY_SCHEDULE_TABLE }
