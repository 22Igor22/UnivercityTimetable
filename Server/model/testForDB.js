const  {Sequelize, Model, sequelize} = require('./contextDB')
const Console = require("console");
const UserData = require("../model/timetable").User;
const json = require("body-parser/lib/types/json");
const {where} = require("sequelize");

const print = (p) => {
    let k = 0;
    console.log('---------------------');
    p.forEach(el => {console.log(++k, el.dataValues);});
}

sequelize.authenticate()
    .then(() => {console.log('Hurray!!! You are connected)))');})
    .then(() => {
        UserData.create({login: 'Igor',  password: '221202', role: 'USER', groupID: 5})
         .then(task => console.log('Result: ', task))
         .catch(err => console.log('Error: ', err.message));
        //Faculty.findAll({raw:true}).then(faculties => console.log(faculties));
        //Faculty.findAll().then(faculties => print(faculties));
        //Pulpit.findAll().then(pulpits => print(pulpits));
        //Teacher.findAll().then(teachers => print(teachers));
        //Subject.findAll().then(subjects => print(subjects));
        //Auditorium_type.findAll().then(aud_types => print(aud_types));
        //Auditorium.findAll().then(aud => print(aud));

        // let a = Authorization_data.findOne(
        //     {
        //         where: {
        //             [Sequelize.Op.and]: [{login: "user", password: "12345678"}]
        //         }
        //     })/*.then(r => {
        //         if(r === null){
        //             console.log("NUUUUUUUULLLLLLL")
        //         }
        // })*/
        //     // .catch(r => Console.log(` жопа ${r}`));
        // console.log(a.then(r => {
        //     console.log(r.id)}))

        // University_data.findAll()
        //     .then(r => {
        //         console.log(r);
        //     })
        //
        //     .catch(r => Console.log(` жопа ${r}`));
        //
        // Users_data.findOne({
        //     where: {
        //         id_auth: 1
        //     }
        // }).then(r => {
        //     console.log(r.id)
        // })
        //
        // let sum = ""
        // Users_data.findOne({
        //     where: {
        //         id_auth: 1
        //     },
        //     attributes:[],
        //     include: [{
        //         model: Users_marks,
        //         attributes:[],
        //         required: true,
        //         attributes:["math","phys","lang","att"]
        //     }]}).then(r => {
        //     r.Users_marks.forEach(m => {
        //         sum += m.math + m.phys + m.lang +m.att
        //     })
        //     console.log(sum)
        // })
        //
        // Users_marks.update(
        //     {math: 88, phys: 77, lang: 11, att: 34},
        //     {where: {id_user: 1}}
        // )
        // .then(task => console.log('Result: ', task))
        // .catch(err => console.log('Error: ', err.message));
        //
        // Users_data.findAll({
        //     where: {
        //         id_auth: id
        //     },
        //     include: [{
        //         model: Users_marks,
        //         required: true,
        //         attributes: ["math", "phys", "lang", "att"]
        //     }, {
        //         model: Overall_rating,
        //         required: true
        //     }]
        // }).then(r => {
        //     console.log("r.Users_marks")
        //
        // })
        //     .catch(r => Console.log(`OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO ${r}`));
        //
        //     .catch(r => Console.log(`OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO ${r}`));
        //
        // Users_data.findAll({
        //     where: {
        //         id_auth: 2
        //     },
        //     include:[{
        //         model: Users_marks,
        //         required: true
        //     }]
        // })
        //     .then(r => {
        //         if(r.length === 0){
        //             console.log("NNNNUUUUUUULLLLLLLLLLLL")
        //         }
        //         console.log("KKKKKKKKKKKKKKKKKKKK");
        //     })
        //     .catch(r => Console.log(`OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO ${r}`));
        // //
        // Users_data.create({
        //     id_auth: 1,
        //     name: "name",
        //     surname:"surname",
        //     middle_name:"middle_name",
        //     address:"address",
        //     date_of_birth:"2002-01-20",
        //     mail: "mail",
        //     number: "phonenumber"
        // })
        //     .then((r) => {
        //         console.log(r.dataValues.id);
        //         Users_marks.create({id_user: r.dataValues.id, math:0, phys:0, lang:0, att:0})
        //             .then(() => {
        //                 console.log("All norm)))")
        //             })
        //             .catch(err =>  console.log(err.message + "user marks"))
        //         console.log("Add info is successful")
        //     })
        //     .catch(r => Console.log(` жопа ${r}`));

        ///univers/offer
        // University_data.findAll({
        //     include:[{
        //         model: Faculty_data,
        //         required: true,
        //         include: [{
        //             model: Speciality_data,
        //             required: true,
        //             include: [{
        //                 model: Entry_threshold,
        //                 required: true,
        //                 where: {
        //                     budgetary2021: {[Sequelize.Op.lte]:293}
        //                 }
        //             }]
        //         }]
        //     }]
        // }).then(faculties => print(faculties));

        // Faculty.findAll({attributes:['faculty', ['faculty_name', 'Наименование факультета']]})
        //     .then(faculties => print(faculties));

        // Teacher.findAll({
        //     attributes:[
        //         [sequelize.fn('COUNT', sequelize.col('pulpit')),'count_pulpit'],
        //     ]
        // }).then(p => print(p));

        // Teacher.findAll({
        //     where:{pulpit:'ИСиТ'},
        //     attributes:[
        //         ['teacher_name', 'Преподаватель'],
        //         ['pulpit', 'Кафедра']
        //     ]
        // }).then(p => print(p));

        // Teacher.findAll({
        //     where:{pulpit:'ИСиТ', teacher:'БРКВЧ'},
        //     attributes:[
        //         ['teacher_name', 'Преподаватель'],
        //         ['pulpit', 'Кафедра']
        //     ]
        // }).then(p => print(p));

        // Teacher.findAll({
        //     where: {
        //         [Sequelize.Op.or]: [{pulpit: 'ИСиТ', pulpit: 'ЛВ'}]
        //     },
        //     attributes:[
        //         ['teacher_name', 'Преподаватель'],
        //         ['pulpit', 'Кафедра']
        //     ]
        // }).then(p => print(p));

        ///insert
        // Faculty.create({faculty:'УМllhj[', faculty_name:'Убейте меня'})
        //     .then(task => console.log(task.dataValue))
        //     .catch(err => console.log(err.message))

        //Faculty.findAll({raw:true}).then(faculties => console.log(faculties));
        //update
        // Faculty.update(
        //     {faculty_name: 'Програмное обеспечение информационных технологий'},
        //     {where: {faculty: 'УМ'}}
        // )
        // .then(task => console.log('Result: ', task))
        // .catch(err => console.log('Error: ', err.message));

        //delete
        // Faculty.destroy({where:{faculty:'УМllhj['}})
        //     .then(task => console.log('Result: ', task))
        //     .catch(err=>console.log('Error: ',err.message));

        // sequelize.query('select pulpit, faculty from Pulpit')
        // .then((pulpits)=>{
        //     console.log(pulpits)})

        // sequelize.query('select Pulpit.pulpit, Pulpit.faculty, Subject.subject_name from Pulpit join Subject on Pulpit.pulpit = Subject.pulpit order by Pulpit.faculty')
        // .then((pulpits)=>{
        //     console.log(pulpits)})

        // sequelize.query('select Pulpit.pulpit, Pulpit.faculty, Subject.subject_name from Pulpit join Subject'
        //     + ' on Pulpit.pulpit = Subject.pulpit where Pulpit.faculty = :faculty',
        //     {replacements: { faculty: 'ИДиП'}}
        //     )
        // .then((pulpits)=>{
        //     console.log(pulpits)})

        // Faculty.findAll({where: {faculty: 'ИДиП'},
        //     include: [{model: Pulpit, as:'faculty_pulpits'}]
        // }).then(res => console.log(res));

        // Faculty.findAll({where: {faculty: "ИДиП"},
        //     include:[{model: Pulpit, as: 'faculty_pulpits',required: true,
        //          include:[{model: Teacher, as: 'pulpit_teachers',required: true}]
        //          }]
        // })
        // .then(res => console.log(res));

        // return sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED})
        //     .then (t => {
        //         return Faculty.create({faculty: 'СеШ', faculty_name: 'Средняя Школа'}, {transaction: t})
        //             .then((r) => {
        //                 return Pulpit.create({pulpit:'АСеВ', pulpit_name:'адам Серг Влад', faculty:'СШ'},
        //                     {transaction:t}
        //                 )
        //             })
        //             .then((r)=>{console.log('---commit'); return t.commit();})
        //             .catch((e)=>{console.error('---rollback', e.name); return t.rollback();});
        //     })
        //     return sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED})
        //         .then(t => {
        //             return Pulpit.create({pulpit: 'CC', pulpit_name: 'qe', faculty: 'ЛХФ       '}, {transaction: t})
        //                 .then((r) => {
        //                     setTimeout(() => {
        //                         console.log('rollback', r);
        //                         return t.rollback();
        //                     }, 10000);
        //                 })
        //         })

        // return sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED})
        //     .then(t => {
        //         return Auditorium.update({auditorium_capacity: 10},{where: {auditorium_capacity: {[Sequelize.Op.gte]: 0}}, transaction: t})
        //             .then((r) => {
        //                 setTimeout(() => {
        //                     console.log('rollback', r);
        //                     return t.rollback();
        //                 }, 20000);
        //             })
        //     })

        // Auditorium.update(
        //     {auditorium_capacity: 0},
        //     {where: {auditorium_name: '103-4'}}
        // )
        // .then(task => console.log('Result: ', task))
        // .catch(err => console.log('Error: ', err.message));

        // Overall_rating.findAll(
        //     {
        //         attributes:['sum','POIT','ISIT','POIBMS','DEIVI']
        //     },
        //     where([{contract:"budgetary", confirm:true}])
        // )
        //     .then(r => {
        //         console.log(r)
        //     })
        //     .catch(err => {
        //         console.log("ioioioi")
        //     })


        // Users_data.findAll({
        //     include: [{
        //         model: Overall_rating,
        //         required: true,
        //         attributes: ["file_number", "math","phys","lang","att","sum", "POIT", "ISIT", "POIBMS", "DEIVI"],
        //         where:[{contract:"budgetary", confirm:true}]
        //     }]
        // }).then(r => {
        //     res.status(200).json(r)
        // })
        //     .catch(err =>  {
        //         res.status(200).json({error:"No data"})
        //     });
        // Users_data.findOne({
        //     where: {
        //         id_auth: 1
        //     },
        //     include: [{
        //         model: Users_marks,
        //         required: true
        //     }]
        // })
        //     .then(r => {
        //         r.Users_marks.forEach(m => {
        //             if(m.math === 0 || m.phys === 0 || m.lang === 0 || m.att === 0){
        //                 console.log({"status":"Not all CT"})
        //             }
        //         })
        //     })
        //     .catch(() => {
        //         console.log({"status":"Not info about user"})
        //     })
    })
    .catch(err => {console.log('Error!!!!DB is not connect(((:',err.message);});