const jwt = require("jsonwebtoken");
const path = __dirname.split('\\');
const User = require("../model/timetable").User;
const { accessKey, refreshKey } = require("../security/jwtKeys");
const { Sequelize } = require("../model/contextDB");
const { admin, guest, rule } = require("../security/defines");
const fs = require('fs')
const crypto = require('crypto');
const { where } = require("sequelize");

module.exports =
{
    checkUserRole() {
        return function (req, res, next) {
            if (req.ability.can(rule.user)) {
                next()
            }
        }
    },
    
    checkInfo: async (req, res, next) => {
        try {
            let userData = await User.findOne({
                where: {
                    id: req.payload.id
                }
            })
            res.render(
                'userInfo',
                {
                    title: "userInfo",
                    userData: userData.dataValues,
                    auth: true
                });
        } catch (err) {
            Error.Error500(res, err);
        }
    },

    updInfo: (req, res, next) => {
        let login = req.body.login
        let groupID = parseInt(req.body.groupID, 10)
        User.update(
            { login: login, groupID: groupID },
            {
                where: {
                    id: req.payload.id
                }
            })
            .then(() => res.status(200).json({ status: "ok" }))
            .catch(err => {
                res.status(200).json({ status: "not ok" })
            })
    }
}