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
    allowNull: false,
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
    this.hasMany(models.Day, { as: 'days', foreignKey: 'scheduleId' })

    this.belongsToMany(
      models.Note,
      {
        as: 'notes',
        through: models.ScheduleNote,
        foreignKey: 'scheduleId',
        otherKey: 'noteId'
      })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: SCHEDULE_TABLE,
      modelName: 'Schedule',
      timeStamps: false
    }
  }
}

module.exports = { Schedule, ScheduleSchema, SCHEDULE_TABLE }
