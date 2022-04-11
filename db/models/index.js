const { Day, DaySchema } = require('./days.model')
const { Schedule, ScheduleSchema } = require('./schedules.model')
const { Note, NoteSchema } = require('./notes.model')
const { ScheduleNote, ScheduleNoteSchema } = require('./schedules-notes.model')
const { Config, ConfigSchema } = require('./configs.model')
const { DaySchedule, DayScheduleSchema } = require('./days-schedules.model.js')
const { DayNote, DayNoteSchema } = require('./days-notes.model.js')

const setUpModels = (sequelize) => {
  Day.init(DaySchema, Day.config(sequelize))
  Schedule.init(ScheduleSchema, Schedule.config(sequelize))
  Note.init(NoteSchema, Note.config(sequelize))
  Config.init(ConfigSchema, Config.config(sequelize))
  ScheduleNote.init(ScheduleNoteSchema, ScheduleNote.config(sequelize))
  DaySchedule.init(DayScheduleSchema, DaySchedule.config(sequelize))
  DayNote.init(DayNoteSchema, DayNote.config(sequelize))

  Day.associate(sequelize.models)
  Schedule.associate(sequelize.models)
  Note.associate(sequelize.models)
  ScheduleNote.associate(sequelize.models)
}

module.exports = setUpModels
