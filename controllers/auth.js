const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandel')
const jwt_decode = require('jwt-decode')

module.exports.login = async function(req, res) {
    const cond = await User.findOne({ login : req.body.login })
    if (cond) {
        const pass = crypt.compareSync(req.body.password, cond.password)
        if (pass) {
            const token = jwt.sign({
                login : cond.login,
                userId : cond._id
            }, key.jswebtok, {expiresIn : 3600 })
            res.status(200).json({
                token : `Bearer ${token}`,
                us : cond
            })
        } else {
            res.status(401).json({
                message : "неверный пароль"
            })
        }
    } else {
        res.status(404).json({
            message : "пользователь не найден"
        })
    }
}

module.exports.register = async function(req, res) {
    // отправка данных
    const cond = await User.findOne({ login : req.body.login })
    if (cond) { // с таким логином уже есть
        res.status(409).json({
            message : "логин уже занят"
        })
    } else {
        const salt = crypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            login : req.body.login,
            password : crypt.hashSync(password, salt),
            f_name : req.body.f_name,
            s_name : req.body.s_name,
            imageSrc : req.file ? req.file.path : ''
        })
        try {
            await user.save();
            const token = jwt.sign({
                login : user.login,
                userId : user._id
            }, key.jswebtok, {expiresIn : 3600 })
            res.status(201).json({
                token : `Bearer ${token}`,
                us : user
            })
            //res.status(201).json({ user });
        } catch(e) {
            errorHandler(res, e)
        }
    }
}

module.exports.getByToken = async function(req, res) {
    const decoded = jwt_decode(req.body.token);
    const cond = await User.findOne({ login : decoded.login });
    if(cond) { // с таким логином уже есть
        res.status(200).json({ us : cond });
    } else {
        res.status(404).json({ message : "пользователь не найден" });
    }

}