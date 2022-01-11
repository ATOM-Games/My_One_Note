const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notebookSchema = new Schema({
    title : { 
        type : String,
        required : true
    },
    user : {
        ref : 'users',
        type : Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('notebooks', notebookSchema)