const { Day, DaySchema } = require('./days.model')
const { Schedule, ScheduleSchema } = require('./schedules.model')
const { Note, NoteSchema } = require('./notes.model')
const { ScheduleNote, ScheduleNoteSchema } = require('./schedules-notes.model')
const { Background, BackgroundSchema } = require('./backgrounds.model')

const setUpModels = (sequelize) => {
  Day.init(DaySchema, Day.config(sequelize))
  Schedule.init(ScheduleSchema, Schedule.config(sequelize))
  Note.init(NoteSchema, Note.config(sequelize))
  Background.init(BackgroundSchema, Background.config(sequelize))
  ScheduleNote.init(ScheduleNoteSchema, ScheduleNote.config(sequelize))

  Day.associate(sequelize.models)
  Schedule.associate(sequelize.models)
  Note.associate(sequelize.models)
  Background.associate(sequelize.models)
  ScheduleNote.associate(sequelize.models)
}

module.exports = setUpModels
