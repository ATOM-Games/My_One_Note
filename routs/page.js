const express = require('express')
const controller = require('../controllers/page')
const passport = require('passport')
const router = express.Router()

router.get('/all', passport.authenticate('jwt', { session : false }), controller.getAllPagesByID)
router.post('/add', passport.authenticate('jwt', { session : false }), controller.createPage)
router.post('/upd', passport.authenticate('jwt', { session : false }), controller.updatePage)
router.post('/del', passport.authenticate('jwt', { session : false }), controller.deletePage)


module.exports = router