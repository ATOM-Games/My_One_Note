const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pageSchema = new Schema({
    title : { 
        type : String,
        required : true
    },
    chapters : {
        ref : 'chapters',
        type : Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('pages', pageSchema)