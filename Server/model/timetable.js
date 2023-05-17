const { Sequelize, Model, sequelize } = require('./contextDB')
const moment = require('moment');

class Faculty extends Model { }
class Auditorium extends Model { }
class Pulpit extends Model { }
class Subject extends Model { }
class Group extends Model { }
class User extends Model { }
class Note extends Model { }
class Timetable extends Model { }
class Chat extends Model { }

Faculty.init(
    {
        faculty: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        faculty_name: { type: Sequelize.STRING, allowNull: false }
    },
    { sequelize, modelName: 'Faculty', tableName: 'Faculty', timestamps: false }
);
Auditorium.init(
    {
        auditorium: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        auditorium_type: { type: Sequelize.STRING, allowNull: false },
        capacity: { type: Sequelize.INTEGER, allowNull: false }
    },
    { sequelize, modelName: 'Auditorium', tableName: 'Auditorium', timestamps: false }
);
Pulpit.init(
    {
        pulpit: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        pulpit_name: { type: Sequelize.STRING, allowNull: true },
        faculty: { type: Sequelize.STRING, allowNull: true, references: { model: Faculty, key: 'faculty' } }
    },
    { sequelize, modelName: 'Pulpit', tableName: 'Pulpit', timestamps: false }
);
Subject.init(
    {
        subject: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        subject_name: { type: Sequelize.STRING, allowNull: false },
        pulpit: { type: Sequelize.STRING, allowNull: false, references: { model: Pulpit, key: 'pulpit' } },
    },
    { sequelize, modelName: 'Subject', tableName: 'Subject', timestamps: false }
);
Group.init(
    {
        id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        pulpit: { type: Sequelize.STRING, allowNull: false, references: { model: Pulpit, key: 'pulpit' } },
    },
    { sequelize, modelName: 'Group', tableName: 'Group', timestamps: false }
);
User.init(
    {
        id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        login: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING, allowNull: false },
        role: { type: Sequelize.STRING, allowNull: false },
        groupID: { type: Sequelize.INTEGER, allowNull: false, references: { model: Group, key: 'id' } }
    },
    { sequelize, modelName: 'User', tableName: 'User', timestamps: false }
);
Note.init(
    {
        id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        note: { type: Sequelize.STRING, allowNull: false },
        date_time: { type: Sequelize.DATEONLY, allowNull: false },
        userID: { type: Sequelize.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
    },
    { sequelize, modelName: 'Note', tableName: 'Note', timestamps: false }
);
Timetable.init(
    {
        id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        teacher: { type: Sequelize.STRING, allowNull: false },
        date_time: {
            type: Sequelize.DATE,
            get() {
                const rawValue = this.getDataValue('date_time');
                if (rawValue) {
                    const formattedValue = moment(rawValue).format('HH:mm DD.MM.YYYY ');
                    return formattedValue;
                }
                return null;
            },
            set(value) {
                const parsedValue = moment(value, 'HH:mm DD.MM.YYYY').toDate();
                this.setDataValue('date_time', parsedValue);
            },
            allowNull: false
        },
        subject: { type: Sequelize.STRING, allowNull: false },
        auditorium: { type: Sequelize.STRING, allowNull: false },
        groupID: { type: Sequelize.INTEGER, allowNull: false, references: { model: Group, key: 'id' } },
    },
    { sequelize, modelName: 'Timetable', tableName: 'Timetable', timestamps: false }
);

Chat.init(
    {
        channel: { type: Sequelize.STRING, allowNull: false, primaryKey: true},
        messages: { type: Sequelize.STRING, allowNull: false },
    },
    { sequelize, modelName: 'Chat', tableName: 'Chat', timestamps: false }
);

Faculty.hasMany(Pulpit, {
    as: 'faculty_pulpits',
    foreignKey: 'faculty',
    sourceKey: 'faculty',
    onDelete: 'CASCADE'
});
Pulpit.hasMany(Subject, {
    as: 'pulpit_subjects',
    foreignKey: 'pulpit',
    sourceKey: 'pulpit',
    onDelete: 'CASCADE'
});
Pulpit.hasMany(Group, {
    as: 'pulpit_groups',
    foreignKey: 'pulpit',
    sourceKey: 'pulpit',
    onDelete: 'CASCADE'
});
Group.hasMany(User, {
    as: 'group_users',
    foreignKey: 'groupID',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});
Group.hasMany(Timetable, {
    as: 'group_timetables',
    foreignKey: 'groupID',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});
User.hasMany(Note, {
    as: 'user_notes',
    foreignKey: 'userID',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});

module.exports = { Faculty, Auditorium, Pulpit, Subject, Group, User, Note, Timetable, Chat };