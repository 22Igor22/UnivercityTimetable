const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize('UniversityTimetable', "sa", "1111",
    {host: 'localhost', dialect: 'mssql'}
);

let start = setInterval(() =>
{
    connect();
}, 5000);


const connect = () =>  sequelize.sync(/*{force : true}*/)
    .then(() => {
        clearInterval(start);
        console.log(`Connected to UniversityTimetable, host : localhost`) })
    .catch(error => console.log(error));

module.exports = {Sequelize, Model, sequelize}
