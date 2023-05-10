const jwt = require("jsonwebtoken");
const path = __dirname.split('\\');
const UserData = require("../model/timetable").User;
const {accessKey, refreshKey} = require("../security/jwtKeys");
const {Sequelize} = require("../model/contextDB");
const fs = require('fs')
const crypto = require('crypto')

path.pop();

module.exports =
{
    login : async (req, res, next) => {
        switch (req.method) {
            case "GET":
                res.render(
                    'auth',
                    {
                        title: "Authorization",
                        css: ['materialize.min', 'authorization'],
                        auth: false
    
                    });
                break;
            case "POST":
                if(req.body.login && req.body.password) {
                    try {
                        let login = req.body.login
                        let password = req.body.password
                        let hashPassword = crypto.createHash('md5').update(password).digest('hex')
                        const auth = await UserData.findOne({
                            where:{
                                [Sequelize.Op.and]:[{ login: login, password: hashPassword }]
                            }
                        })
                        const accessToken = jwt.sign({
                            id: auth.id,
                            login: auth.login,
                            role: auth.role
                        }, accessKey, {expiresIn: 3600});
    
                        const refreshToken = jwt.sign({
                            id: auth.id,
                            login: auth.login,
                            role: auth.role
                        }, refreshKey, {expiresIn: 24 * 3600});
    
                        res.cookie('accessToken', accessToken, {
                            httpOnly: true,
                            sameSite: 'strict'
                        });
                        res.cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            sameSite: 'strict'
                        });
                        //res.redirect('/belstu_fit');
                        res.status(200).json({status: "ok"})
                    }
                    catch (e) {
                        //res.redirect('/auth/login')
                        res.status(200).json({status: "not ok"})
                        //document.getElementById("errorInput").innerHTML = "дщдщд";
                    }
                }
                break;
            default:
                res.statusCode = 405;
                res.messageerror = "Method not allowed";
                res.end();
        }
    },
    
    register : (req, res, next) => {
        switch (req.method) {
            case "GET":
                res.render(
                    'reg',
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
                let groupID = req.body.groupID
                //bcrypt.hash(password, 5).then(r => {
                //     hashPassword = r
                // });
                UserData.create({login: login,  password: hashPassword, role: 'USER', groupID: groupID})
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
    
    logout : (req, res) =>
    {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.redirect('/belstu_fit');
    },
    
    ability : (req, res) => {
        res.status(200).send(req.rules);
    }
}