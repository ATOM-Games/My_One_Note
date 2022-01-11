const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    text : { 
        type : String,
        required : true
    },
    pages : {
        ref : 'pages',
        type : Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('notes', noteSchema)