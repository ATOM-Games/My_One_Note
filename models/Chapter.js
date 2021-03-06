const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chapterSchema = new Schema({
    title : { 
        type : String,
        required : true
    },
    notebooks : {
        ref : 'notebooks',
        type : Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('chapters', chapterSchema)