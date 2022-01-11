const express = require('express')
const passport = require('passport')
const controller = require('../controllers/notebook')
const router = express.Router()

router.get('/all', passport.authenticate('jwt', { session : false }), controller.getAllNotebooks)
router.post('/add', passport.authenticate('jwt', { session : false }), controller.createNotebook)
router.post('/upd', passport.authenticate('jwt', { session : false }), controller.updateNotebook)
router.post('/del', passport.authenticate('jwt', { session : false }), controller.deleteNotebook)

module.exports = router