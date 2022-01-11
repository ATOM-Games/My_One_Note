const Chapter = require('../models/Chapter')
const errorHandler = require('../utils/errorHandel')

module.exports.getAllChaptersByID = async function(req, res) {
    try {
        const chpt = await Chapter.find({
            notebooks : req.query.notebook
        })
        res.status(200).json(chpt)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.createChapter = async function(req, res) {
    try {
        const chpt = await new Chapter({
            title : req.body.title,
            notebooks : req.body.notebook
        }).save()
        res.status(201).json(chpt)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.updateChapter = async function(req, res) {
    try {
        const chpt = await Chapter.findOneAndUpdate(
            { _id : req.body.id },
            { $set : req.body },
            { new : true }
        )
        res.status(200).json(chpt)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.deleteChapter = async function(req, res) {
    try {
        await Chapter.remove({
            _id : req.body.id
        })
        res.status(200).json({
            message : "Глава была удалена"
        })
    } catch (e) {
        errorHandler(res, e)
    }
}