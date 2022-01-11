const Page = require('../models/Page')
const errorHandler = require('../utils/errorHandel')

module.exports.getAllPagesByID = async function(req, res) {
    try {
        const pg = await Page.find({
            chapters : req.query.chapter
        })
        res.status(200).json(pg)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.createPage = async function(req, res) {
    try {
        const pg = await new Page({
            title : req.body.title,
            chapters : req.body.chapter
        }).save()
        res.status(201).json(pg)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.updatePage = async function(req, res) {
    try {
        const pg = await Page.findOneAndUpdate(
            { _id : req.body.id },
            { $set : req.body },
            { new : true }
        )
        res.status(200).json(pg)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.deletePage = async function(req, res) {
    try {
        await Page.remove({
            _id : req.body.id
        })
        res.status(200).json({
            message : "Страница была удалена"
        })
    } catch (e) {
        errorHandler(res, e)
    }
}