const jwt = require("jsonwebtoken");
const path = __dirname.split('\\');
const User = require("../model/timetable").User;
const { accessKey, refreshKey } = require("../security/jwtKeys");
const { Sequelize } = require("../model/contextDB");
const { admin, guest, rule } = require("../security/defines");
const fs = require('fs')
const crypto = require('crypto');
const { where } = require("sequelize");
const redisClient = require("redis").createClient();

redisClient.on("ready", () => console.log("ready"));
redisClient.on("error", (err) => console.log(`error: ${err}`));
redisClient.connect().then(() => console.log("connect"));
redisClient.on("end", () => console.log("end"));

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
    },

    refreshToken: async (req, res, next) => {
        if (req.cookies.refreshToken) {
            let isToken = await redisClient.get(req.cookies.refreshToken);
            if (isToken === null) {
              jwt.verify(req.cookies.refreshToken, refreshKey, async (err, payload) => {
                if (err) res.send(err.message);
                else if (payload) {
                  await redisClient.set(req.cookies.refreshToken, "blocked");
        
                  const candidate = await User.findOne({ where: { id: payload.id } });
                  const newAccessToken = jwt.sign(
                    {
                      id: candidate.id,
                      login: candidate.login,
                      role: candidate.role
                    },
                    accessKey,
                    { expiresIn: 10 * 10 }
                  );
                  const newRefreshToken = jwt.sign(
                    {
                      id: candidate.id,
                      login: candidate.login,
                      role: candidate.role
                    },
                    refreshKey,
                    { expiresIn: 24 * 60 * 60 }
                  );
        
                  res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    sameSite: "strict",
                  });
        
                  res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    path: "/user/refresh-token",
                  });
                  res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    path: "/auth/logout",
                  });
                  if(candidate.role=="USER"){
                    res.redirect("/user/checkInfo");
                  }
                  else if(candidate.role=="ADMIN"){
                    res.redirect("/timeT/adminTT");
                  }
                }
              });
            } else res.send("Refresh token is blocked");
          } else res.status(401).send("To access the resource, you need to log in");
    }
}