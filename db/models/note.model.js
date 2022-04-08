const { Model, DataTypes, Sequelize } = require('sequelize')

const NOTE_TABLE = 'notes_model'

const NoteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: true,
    type: DataTypes.STRING
  },
  comment: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
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

class Note extends Model {
  static associate (models) {
    this.hasMany(models.Day, { as: 'days', foreignKey: 'noteId' })

    // this.belongsToMany(
    //   models.Schedule,
    //   {
    //     as: 'schedules',
    //     through: models.ScheduleNote,
    //     foreignKey: 'noteId',
    //     otherKey: 'scheduleId'
    //   })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: NOTES_TABLE,
      modelName: 'Note',
      timeStamps: false
    }
  }
}

module.exports = { Note, NoteSchema, NOTE_TABLE }
