'use strict'

const { DAY_TABLE } = require('../models/days.model')
const { SCHEDULE_TABLE } = require('../models/schedules.model')
const { NOTE_TABLE } = require('../models/notes.model')
const { CONFIG_TABLE } = require('../models/configs.model')
const { USER_TABLE } = require('../models/users.model')
const { DAY_NOTE_TABLE } = require('../models/days-notes.model')
const { DAY_SCHEDULE_TABLE } = require('../models/days-schedules.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(CONFIG_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      backgroundImageUrl: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      backgroundColor: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      mainTitlesColor: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      mainTextsColor: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      fontFamily: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      }
    })

    await queryInterface.createTable(SCHEDULE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      initialTime: {
        allowNull: false,
        field: 'initial_time',
        type: Sequelize.DataTypes.TIME
      },
      finalTime: {
        allowNull: true,
        field: 'final_time',
        type: Sequelize.DataTypes.TIME
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedBy: {
        field: 'updated_by',
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      }
    })

    await queryInterface.createTable(NOTE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      title: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      comment: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedBy: {
        field: 'updated_by',
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      }
    })

    await queryInterface.createTable(DAY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: true
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
        type: Sequelize.DataTypes.DATE
      },
      updatedBy: {
        field: 'updated_by',
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      }
    })

    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      nickName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        min: 8
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'user'
      },
      recoveryToken: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      updateAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(DAY_NOTE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      order: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER
      },
      dayId: {
        allowNull: false,
        field: 'day_id',
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: DAY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      noteId: {
        allowNull: false,
        field: 'note_id',
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: NOTE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      titleColor: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      commentColor: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      }
    })

    await queryInterface.createTable(DAY_SCHEDULE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      order: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER
      },
      dayId: {
        allowNull: false,
        field: 'day_id',
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: SCHEDULE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      titleColor: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      timeColor: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      }
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(DAY_SCHEDULE_TABLE)
    await queryInterface.dropTable(DAY_NOTE_TABLE)
    await queryInterface.dropTable(CONFIG_TABLE)
    await queryInterface.dropTable(NOTE_TABLE)
    await queryInterface.dropTable(SCHEDULE_TABLE)
    await queryInterface.dropTable(USER_TABLE)
    await queryInterface.dropTable(DAY_TABLE)
  }
}
