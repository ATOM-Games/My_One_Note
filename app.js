const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const keys = require('./config/keys')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routs/auth.js')
const notebooks = require('./routs/notebook')
const chapters = require('./routs/chapter')
const pages = require('./routs/page')
const notes = require('./routs/note')
const app = express()

mongoose.connect(keys.MONGO_URI).then( ()=>{ console.log('md connected') } ).catch( (error) => { console.log(error) } )


app.use(passport.initialize())
app.use('/uploads', express.static('uploads'))
require('./middleware/passport')(passport)
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/notebook', notebooks)
app.use('/api/chapter', chapters)
app.use('/api/page', pages)
app.use('/api/note', notes)




module.exports = app