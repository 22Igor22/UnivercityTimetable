const jwt = require("jsonwebtoken");
const path = __dirname.split('\\');
const Timetable = require("../model/timetable").Timetable;
const Note = require("../model/timetable").Note;
const User = require("../model/timetable").User;
const { accessKey, refreshKey } = require("../security/jwtKeys");
const { Sequelize } = require("../model/contextDB");
const { admin, guest, rule } = require("../security/defines");
const fs = require('fs')
const crypto = require('crypto')
const { Op } = require('sequelize');

module.exports =
{
    checkRole() {
        return function (req, res, next) {
            if (req.ability.can(rule.user)||req.ability.can(rule.admin)) {
                next()
            }
        }
    },

    checkUserRole() {
        return function (req, res, next) {
            if (req.ability.can(rule.user)) {
                next()
            }
        }
    },

    checkAdminRole() {
        return function (req, res, next) {
            if (req.ability.can(rule.admin)) {
                next()
            }
        }
    },

    addTimeTable: async (req, res) => {
        try {
            Timetable.create(
                {
                    groupID: req.body.groupID,
                    subject: req.body.subject,
                    date_time: req.body.date_time,
                    teacher: req.body.teacher,
                    auditorium: req.body.auditorium
                })
                .then(() => res.status(200).json({ status: "ok" }))
                .catch(err => {
                    res.status(200).json({ status: "not ok" })
                })
        } catch (err) {
            res.status(200).json({ status: "not ok" })
        }
    },

    updTimeTable: async (req, res) => {
        try {
            Timetable.update(
                {
                    groupID: req.body.groupID,
                    subject: req.body.subject,
                    date_time: req.body.date_time,
                    teacher: req.body.teacher,
                    auditorium: req.body.auditorium
                },
                { where: { id: req.body.id } })
                .then(() => res.status(200).json({ status: "ok" }))
                .catch(err => {
                    res.status(200).json({ status: "not ok" })
                })
        } catch (err) {
            res.status(200).json({ status: "not ok" })
        }
    },

    delTimeTable: async (req, res) => {
        try {
            Timetable.destroy(
                {
                    where: { id: req.body.id }
                })
                .then(() => res.status(200).json({ status: "ok" }))
                .catch(err => {
                    res.status(200).json({ status: "not ok" })
                })
        } catch (err) {
            res.status(200).json({ status: "not ok" })
        }
    },

    timeTable: async (req, res) => {
        try {
            if (req.ability.can(rule.admin)) {
                let timeTable = await Timetable.findAll()
                res.render(
                    'adminTimeT',
                    {
                        title: "timeTable",
                        timeT: timeTable,
                        auth: true
                    });
            }
            if (req.ability.can(rule.user)) {
                let user = await User.findOne({
                    where: {
                        id: req.payload.id
                    }
                })
                let timeTable = await Timetable.findAll({
                    where: {
                        groupID: user.groupID
                    }
                })
                res.render(
                    'timeT',
                    {
                        title: "timeTable",
                        timeT: timeTable,
                        auth: true
                    });
            }
        } catch (err) {
            Error.Error500(res, err);
        }
    },

    note: async (req, res) => {
        try {
            let noteData = await Note.findAll({
                where: {
                    userID: req.payload.id
                }
            })
            res.render(
                'note',
                {
                    title: 'Note',
                    notes: noteData,
                    auth: true
                }
            )
        } catch (err) {
            res.status(200).json({ status: "not ok" })
        }
    },

    searchInTT: async (req, res) => {
        if (req.ability.can(rule.user)) {
            let user = await User.findOne({
                where: {
                    id: req.payload.id
                }
            })
            let timeTable = await Timetable.findAll({
                where: {
                    [Op.and]: [
                        {
                            groupID: user.groupID
                        },
                        {
                            [Op.or]: [
                                {
                                    subject: {
                                        [Op.like]: '%' + req.body.text + '%'
                                    }
                                },
                                {
                                    teacher: {
                                        [Op.like]: '%' + req.body.text + '%'
                                    }
                                },
                                {
                                    date_time: {
                                        [Op.like]: '%' + req.body.text + '%'
                                    }
                                }
                            ]
                        }
                    ]
                }
            })
            res.json({ timeT: timeTable })
        }
        else if (req.ability.can(rule.admin)) {
            let timeTable = await Timetable.findAll({
                where: {
                    [Op.or]: [
                        {
                            groupID: {
                                [Op.like]: req.body.text
                            }
                        },
                        {
                            subject: {
                                [Op.like]: '%' + req.body.text + '%'
                            }
                        },
                        {
                            teacher: {
                                [Op.like]: '%' + req.body.text + '%'
                            }
                        },
                        {
                            date_time: {
                                [Op.like]: '%' + req.body.text + '%'
                            }
                        },
                        {
                            auditorium: {
                                [Op.like]: '%' + req.body.text + '%'
                            }
                        }
                    ]
                }
            })
            res.json({ timeT: timeTable })
        }
    },

    doNote: (req, res) => {
        let note = req.body.note
        let date = req.body.date_time
        let id = parseInt(req.body.id, 10);
        switch (req.method) {
            case "POST": {
                if (id) {
                    Note.upsert({ note: note, date_time: date, id: id, userID: req.payload.id })
                        .then(() => res.status(200).json({ status: "ok" }))
                        .catch(err => {
                            res.status(200).json({ status: "not ok" })
                        })
                } else {
                    Note.create({ note: note, date_time: date, userID: req.payload.id })
                        .then(() => res.status(200).json({ status: "ok" }))
                        .catch(err => {
                            res.status(200).json({ status: "not ok" })
                        })
                }
            }
            case "DELETE": {
                if (id) {
                    Note.destroy({
                        where: {
                            id: id
                        }
                    })
                }
            }
        }
    }
}