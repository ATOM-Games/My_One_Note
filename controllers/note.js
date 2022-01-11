const Note = require('../models/Note')
const errorHandler = require('../utils/errorHandel')

module.exports.getAllNotesByID = async function(req, res) {
    try {
        const nt = await Note.find({
            pages : req.query.page
        })
        res.status(200).json(nt)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.createNote = async function(req, res) {
    try {
        const nt = await new Note({
            text : req.body.text,
            pages : req.body.page
        }).save()
        res.status(201).json(nt)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.updateNote = async function(req, res) {
    try {
        const nt = await Note.findOneAndUpdate(
            { _id : req.body.id },
            { $set : req.body },
            { new : true }
        )
        res.status(200).json(nt)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.deleteNote = async function(req, res) {
    try {
        await Note.remove({
            _id : req.body.id
        })
        res.status(200).json({
            message : "Запись была удалена"
        })
    } catch (e) {
        errorHandler(res, e)
    }
}