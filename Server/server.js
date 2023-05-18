const Sequelize = require('sequelize')
const https = require('https')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { accessKey } = require("./security/jwtKeys");
const { Guest } = require("./security/roles");
const { GetAbilityFor } = require("./security/privilegies");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const Chat = require("./model/timetable").Chat;
const Handlebars = require('handlebars')
const socketio = require('socket.io');
const formatMessage = require('./helpers/formatDate')
const {
    getActiveUser,
    exitRoom,
    newUser,
    getIndividualRoomUsers
} = require('./helpers/userHelper');


const express = require("express");
const app = express()
const authRouter = require("./route/authRouter");
const timetableRouter = require("./route/timetableRouter");
const userRouter = require("./route/userRouter");
const chatRouter = require("./route/chatRouter");
const fs = require("fs");

const PORT = process.env.PORT || 5000;

let options = {
    key: fs.readFileSync('./security/certificate/UnivTT.key').toString(),
    cert: fs.readFileSync('./security/certificate/UnivTT.crt').toString()
};

const hbs = require('express-handlebars').create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set("views", __dirname + '/views');

app.use(express.static("public"));
app.use(cookieParser("cookie_key"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    if (req.cookies.accessToken) {
        jwt.verify(req.cookies.accessToken, accessKey, (err, payload) => {
            if (err) {
                res.clearCookie('accessToken');
                res.redirect('/user/refresh-token');
            }
            req.payload = payload;
        });
    } else {
        req.payload = { role: Guest };
    }
    req.ability = GetAbilityFor(req);
    next();
});

app.get('/resource', (req, res) => {
    if (req.payload)
        res.status(200).send(`Resource ${req.payload.id}-${req.payload.login}-${req.payload.role}`);
    else
        res.status(401).send('To access the resource, you need to log in');
});

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/timeT", timetableRouter);
app.use("/chat", chatRouter);

let server = https.createServer(options, app)
const io = socketio(server);

app.use(express.static(__dirname + 'public'));

io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = newUser(socket.id, username, room);

        socket.join(user.room);

        // Broadcast everytime users connects
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage("Info", `${user.username} has joined the room`)
            );

        // Current active users and room name
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getIndividualRoomUsers(user.room)
        });
    });

    // Listen for client message
    socket.on('chatMessage', msg => {
        const user = getActiveUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = exitRoom(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage("Info", `${user.username} has left the room`)
            );

            // Current active users and room name
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getIndividualRoomUsers(user.room)
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server listening https://UniversityTimetable:5000/auth/login`);
})
    .on('Error', (err) => {
        console.log(`Error: ${err.code}`);
    })


// app.listen(PORT, ()=>{
//     //console.log(`Server listening http://localhost:${PORT}/univers/startpage`);
//     console.log(`Server listening https://UniversityTimetable:5000/belstu_fit`);
// })
//     .on('Error', (err) => {
//         console.log(`Error: ${err.code}`);
//     })