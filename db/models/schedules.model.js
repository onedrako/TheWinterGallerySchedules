const { Model, DataTypes, Sequelize } = require('sequelize')

const SCHEDULE_TABLE = 'schedules'

const ScheduleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  initialTime: {
    allowNull: false,
    field: 'initial_time',
    type: DataTypes.TIME
  },
  finalTime: {
    allowNull: true,
    field: 'final_time',
    type: DataTypes.TIME
  },
  updatedAt: {
    allowNull: false,
    field: 'updated_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedBy: {
    field: 'updated_by',
    allowNull: false,
    type: DataTypes.STRING
  }
}

class Schedule extends Model {
  static associate (models) {
    this.belongsToMany(
      models.Day,
      {
        as: 'days',
        through: models.DaySchedule,
        foreignKey: 'scheduleId',
        otherKey: 'dayId'
      })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: SCHEDULE_TABLE,
      modelName: 'Schedule',
      timestamps: false
    }
  }
}

module.exports = { Schedule, ScheduleSchema, SCHEDULE_TABLE }
