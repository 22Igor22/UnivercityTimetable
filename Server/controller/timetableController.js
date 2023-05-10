const jwt = require("jsonwebtoken");
const path = __dirname.split('\\');
const User = require("../model/timetable").User;
const {accessKey, refreshKey} = require("../security/jwtKeys");
const {Sequelize} = require("../model/contextDB");
const fs = require('fs')
const crypto = require('crypto')

module.exports =
{
    checkInfo : async (req, res, next) => {
        try{
            if (req.ability.can(rule.admin)) {
                res.redirect('/belstu_fit/admin')
            }
            if (req.ability.can(rule.enrol)){
                let userData = await User.findOne({
                    where:{
                        id: req.payload.id
                    }
                })
                if(userData === null){
                    res.redirect('/belstu_fit/userinfo/add')
                }
            }
            res.render(
                'fitUserAccount',
                {
                    title: "UserAccount",
                    css: ['search', 'userinfo'],
                    data: userData,
                    marks: userData.Users_marks,
                    rating: userData.Overall_ratings,
                    auth: true
            }); 
            if (req.ability.can(rule.guests)) {
                res.redirect('/auth/login')
            }
            else {
                Error.Error401(res);
            }
        } catch (err) {
            Error.Error500(res, err);
        }      
    },
    
    updInfo : (req, res, next) => {
        switch (req.method) {
            case "GET":
                res.render(
                    'fitRegistration',
                    {
                        title: "Registration",
                        css: ['materialize.min','registration'],
                        auth: false
                    });
                //res.sendFile(path.join("\\") + "\\views\\register.html");
                break;
            case "POST":
                let login = req.body.login
                let password = req.body.password
                let hashPassword = crypto.createHash('md5').update(password).digest('hex')
                //bcrypt.hash(password, 5).then(r => {
                //     hashPassword = r
                // });
                Authorization_data.create({login: login,  password: hashPassword, role: 'ENROLLEE'})
                    .then(() =>  res.status(200).json({status: "ok"})/*res.redirect('/auth/login')*/)
                    .catch(err => {
                        res.status(200).json({status: "not ok"})
                    })
    
            // } =>  res.send(err.message));
                break;
            default:
                res.statusCode = 405;
                res.messageerror = "Method not allowed";
                res.end();
        }
    },
    
    updTimeTable : (req, res) =>
    {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.redirect('/belstu_fit');
    },
    
    timeTable : (req, res) => {
        res.status(200).send(req.rules);
    },

    searchInTT : (req, res) => {
        res.status(200).send(req.rules);
    }
}