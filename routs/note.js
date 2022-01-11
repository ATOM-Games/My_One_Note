const express = require('express')
const controller = require('../controllers/note')
const passport = require('passport')
const router = express.Router()

router.get('/all', passport.authenticate('jwt', { session : false }), controller.getAllNotesByID)
router.post('/add', passport.authenticate('jwt', { session : false }), controller.createNote)
router.post('/upd', passport.authenticate('jwt', { session : false }), controller.updateNote)
router.post('/del', passport.authenticate('jwt', { session : false }), controller.deleteNote)


module.exports = router