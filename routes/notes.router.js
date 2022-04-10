const express = require('express')
const validatorHandler = require('./../middlewares/validator.handler')

const NotesService = require('./../services/notes.service')

const router = express.Router()
const service = new NotesService()
const { createNoteSchema, updateNoteSchema, getNoteSchema } = require('./../schemas/notes.schema')

router.get('/', async (req, res, next) => {
  try {
    const notes = await service.getAll()
    res.send(notes)
  } catch (err) {
    next(err)
  }
})

router.get('/:id',
  validatorHandler(getNoteSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const note = await service.getOne(id)
      res.send(note)
    } catch (err) {
      next(err)
    }
  })

router.post('/',
  validatorHandler(createNoteSchema, 'body'),
  async (req, res, next) => {
    try {
      const note = await service.create(req.body)
      res.status(201).send(note)
    } catch (err) {
      next(err)
    }
  })

router.patch('/:id',
  validatorHandler(updateNoteSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const note = await service.update(id, req.body)
      res.status(201).send(note)
    } catch (err) {
      next(err)
    }
  })

router.delete('/:id',
  validatorHandler(getNoteSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      await service.delete(id)
      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  })

module.exports = router
