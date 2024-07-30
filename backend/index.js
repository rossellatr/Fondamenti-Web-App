const express = require('express');
const mongoose = require('mongoose');
const http = require("http")
const path = require('path');
const session = require('express-session');
const port = 3000
const cors = require('cors');
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app)
const io = socketIo(server, {cors: {origin: "*", method: "*"}})


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
    req.io = io;
    return next()
})


//Configuriamo il middleware
app.use(session({
    secret: 'il-tuo-segreto', resave: false, saveUninitialized: false
}));

//Colleghiamoci al router
const router = require('./routes/api');

app.use('/api', router);

//Connettiamoci al db
mongoose.connect("mongodb+srv://BlackRaffo70:Alessandro2001@cluster0.zt6ollt.mongodb.net/?retryWrites=true&w=majority");

const db = mongoose.connection;

db.once("open", () => {
    console.log("Connesso al DB");
    server.listen(port, () => {
        console.log("App in ascolto");
    });
});


io.on("connection", (socket) => {
    console.log("utente connesso")

    socket.on("newMessage", ({text,receiver,sender} )=> {
        socket.emit("message",{text,receiver,sender} )
        socket.broadcast.emit("message",{text,receiver,sender} )

    })


    socket.on("disconnect", () => {
        console.log("disconnected")
    })
})
