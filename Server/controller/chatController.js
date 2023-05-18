const jwt = require("jsonwebtoken");
const path = __dirname.split('\\');
const Chat = require("../model/timetable").Chat;
const { accessKey, refreshKey } = require("../security/jwtKeys");
const { Sequelize } = require("../model/contextDB");
const fs = require('fs')
const crypto = require('crypto')

path.pop();

module.exports =
{
    userName: async (req, res) => {
        res.send(JSON.stringify(req.payload.login));
    },

    messages: async (req, res) => {
        try {
            let messages = await Chat.findOne({
                where: {
                    channel: req.body.room
                }
            });
            res.send(JSON.stringify(messages.messages));
        } catch (err) {
            Error.Error500(res, err);
        }
    },

    addToHistory: async (req, res) => {
        Chat.findByPk(req.body.room)
            .then(chat => {
                if (chat) {
                    chat.messages += req.body.mess + ',';
                    return chat.save();
                } else {
                    throw new Error('String not found');
                }
            })
            .then(updatedChat => {
                console.log('Succes add data');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}