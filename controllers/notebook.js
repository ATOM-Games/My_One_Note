const Notebook = require('../models/Notebook')
const errorHandler = require('../utils/errorHandel')

module.exports.getAllNotebooks = async function(req, res) { 
    try {
        const ntbk = await Notebook.find({
            user : req.user.id
        })
        res.status(200).json(ntbk)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.createNotebook = async function(req, res) { 
    try {
        const ntbk = await new Notebook({
            title : req.body.title,
            user : req.user.id
        }).save()
        res.status(201).json(ntbk)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.updateNotebook = async function(req, res) {
    try {
        const ntbk = await Notebook.findOneAndUpdate(
            { _id : req.body._id },
            { $set : req.body },
            { new : true }
        )
        res.status(200).json(ntbk)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.deleteNotebook = async function(req, res) { 
    try {
        await Notebook.remove({
            _id : req.body.id
        })
        res.status(200).json({
            message : "Книга была удалена"
        })
    } catch (e) {
        errorHandler(res, e)
    }
}