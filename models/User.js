const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    login : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    f_name : { 
        type : String,
        required : true
    },
    s_name : { 
        type : String,
        required : true
    },
    imageSrc : {
        type : String,
        default : ''
    }
})

module.exports = mongoose.model('users', userSchema)