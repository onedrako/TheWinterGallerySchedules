'use strict'

const { DAY_TABLE } = require('../models/days.model')
const { SCHEDULE_TABLE } = require('../models/schedules.model')
const { NOTE_TABLE } = require('../models/notes.model')
const { SCHEDULE_NOTE_TABLE } = require('../models/schedules-notes.model')
const { BACKGROUND_TABLE } = require('../models/backgrounds.model')
const { USER_TABLE } = require('../models/users.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(BACKGROUND_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.Sequelize.DataTypes.INTEGER
      },
      url: {
        allowNull: true,
        type: Sequelize.Sequelize.DataTypes.STRING
      }
    })

    await queryInterface.createTable(SCHEDULE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.Sequelize.DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.Sequelize.DataTypes.STRING
      },
      initialTime: {
        allowNull: false,
        field: 'initial_time',
        type: Sequelize.Sequelize.DataTypes.TIME
      },
      finalTime: {
        allowNull: false,
        field: 'final_time',
        type: Sequelize.Sequelize.DataTypes.TIME
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedBy: {
        field: 'updated_by',
        allowNull: false,
        type: Sequelize.Sequelize.DataTypes.STRING
      }
    })

    await queryInterface.createTable(NOTE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.Sequelize.DataTypes.INTEGER
      },
      title: {
        allowNull: true,
        type: Sequelize.Sequelize.DataTypes.STRING
      },
      comment: {
        allowNull: true,
        type: Sequelize.Sequelize.DataTypes.STRING
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedBy: {
        field: 'updated_by',
        allowNull: false,
        type: Sequelize.Sequelize.DataTypes.STRING
      }
    })

    await queryInterface.createTable(SCHEDULE_NOTE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.Sequelize.DataTypes.INTEGER
      },
      scheduleId: {
        allowNull: false,
        field: 'schedule_id',
        type: Sequelize.Sequelize.DataTypes.INTEGER,
        references: {
          model: SCHEDULE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      noteId: {
        allowNull: false,
        field: 'note_id',
        type: Sequelize.Sequelize.DataTypes.INTEGER,
        references: {
          model: NOTE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })

    await queryInterface.createTable(DAY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.Sequelize.DataTypes.INTEGER
      },
      date: {
        type: Sequelize.Sequelize.DataTypes.DATEONLY,
        allowNull: true
      },
      title: {
        type: Sequelize.Sequelize.DataTypes.STRING,
        allowNull: true
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
        type: Sequelize.Sequelize.DataTypes.DATE
      },
      updatedBy: {
        field: 'updated_by',
        allowNull: false,
        type: Sequelize.Sequelize.DataTypes.STRING
      },
      scheduleId: {
        allowNull: true,
        field: 'schedule_id',
        type: Sequelize.Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.Sequelize.DataTypes.INTEGER,
        references: {
          model: NOTE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(BACKGROUND_TABLE)
    await queryInterface.dropTable(DAY_TABLE)
    await queryInterface.dropTable(SCHEDULE_NOTE_TABLE)
    await queryInterface.dropTable(NOTE_TABLE)
    await queryInterface.dropTable(SCHEDULE_TABLE)
    await queryInterface.dropTable(USER_TABLE)
  }
}
