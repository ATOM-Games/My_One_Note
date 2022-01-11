const express = require('express')
const controller = require('../controllers/chapter')
const passport = require('passport')
const router = express.Router()

router.get('/all', passport.authenticate('jwt', { session : false }), controller.getAllChaptersByID)
router.post('/add', passport.authenticate('jwt', { session : false }), controller.createChapter)
router.post('/upd', passport.authenticate('jwt', { session : false }), controller.updateChapter)
router.post('/del', passport.authenticate('jwt', { session : false }), controller.deleteChapter)


module.exports = router