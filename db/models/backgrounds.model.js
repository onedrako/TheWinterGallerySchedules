const { Model, DataTypes } = require('sequelize')

const BACKGROUND_TABLE = 'backgrounds'

const BackgroundSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  url: {
    allowNull: true,
    type: DataTypes.STRING
  }
}

class Background extends Model {
  static config (sequelize) {
    return {
      sequelize,
      tableName: BACKGROUND_TABLE,
      modelName: 'Background',
      timeStamps: false
    }
  }
}

module.exports = { Background, BackgroundSchema, BACKGROUND_TABLE }
