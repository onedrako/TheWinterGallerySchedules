const { Day, DaySchema } = require('./day.model')
const { Schedule, ScheduleSchema } = require('./schedule.model')
const { Note, NoteSchema } = require('./note.model')
const { ScheduleNote, ScheduleNoteSchema } = require('./schedule-note.model')
const { Background, BackgroundSchema } = require('./background.model')

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
