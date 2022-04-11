const { Model, DataTypes } = require('sequelize')

const CONFIG_TABLE = 'configs'

const ConfigSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  backgroundImageUrl: {
    allowNull: true,
    type: DataTypes.STRING
  },
  backgroundColor: {
    allowNull: false,
    type: DataTypes.STRING
  },
  mainTitlesColor: {
    allowNull: false,
    type: DataTypes.STRING
  },
  mainTextsColor: {
    allowNull: false,
    type: DataTypes.STRING
  },
  fontFamily: {
    allowNull: true,
    type: DataTypes.STRING
  }
}

class Config extends Model {
  static config (sequelize) {
    return {
      sequelize,
      tableName: CONFIG_TABLE,
      modelName: 'Config',
      timestamps: false
    }
  }
}

module.exports = { Config, ConfigSchema, CONFIG_TABLE }
