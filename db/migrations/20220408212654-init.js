'use strict'

const { DAY_TABLE } = require('../models/day.model')
const { SCHEDULE_TABLE } = require('../models/schedule.model')
const { NOTE_TABLE } = require('../models/note.model')
const { SCHEDULE_NOTE_TABLE } = require('../models/schedule-note.model')
const { BACKGROUND_TABLE } = require('../models/background.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      createdAt: {
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
        type: Sequelize.DataTypes.DATE
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
      },
      scheduleId: {
        allowNull: true,
        field: 'schedule_id',
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'schedules',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      noteId: {
        allowNull: true,
        field: 'comment_id',
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'comments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
        allowNull: false,
        field: 'final_time',
        type: Sequelize.DataTypes.TIME
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
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
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
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

    await queryInterface.createTable(SCHEDULE_NOTE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
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
      }
    })

    await queryInterface.createTable(BACKGROUND_TABLE, {

    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(BACKGROUND_TABLE)
    await queryInterface.dropTable(SCHEDULE_NOTE_TABLE)
    await queryInterface.dropTable(NOTE_TABLE)
    await queryInterface.dropTable(SCHEDULE_TABLE)
    await queryInterface.dropTable(DAY_TABLE)
  }
}
