const { Model, DataTypes, Sequelize } = require('sequelize')

const NOTE_TABLE = 'notes'

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
    this.belongsToMany(
      models.Day,
      {
        as: 'days',
        through: models.DayNote,
        foreignKey: 'noteId',
        otherKey: 'dayId'
      })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: NOTE_TABLE,
      modelName: 'Note',
      timestamps: false
    }
  }
}

module.exports = { Note, NoteSchema, NOTE_TABLE }
