const { Model, DataTypes, Sequelize } = require('sequelize')

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
  }
}

class Day extends Model {
  static associate (models) {
    this.belongsToMany(
      models.Note,
      {
        through: models.DaySchedule,
        foreignKey: 'dayId',
        otherKey: 'scheduleId'
      })
    this.belongsToMany(
      models.Schedule,
      {
        through: models.DayNote,
        foreignKey: 'dayId',
        otherKey: 'noteId'
      })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: DAY_TABLE,
      modelName: 'Day',
      timestamps: false
    }
  }
}

module.exports = { Day, DaySchema, DAY_TABLE }
