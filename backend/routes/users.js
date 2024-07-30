const express = require('express');
const usersController = require('../controllers/users');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    const io = req.io;
    io.on("connection", (socket) => {
        console.log("utente connesso")
    })
    res.json({message: 'root for posts api'});
});

//Associo ai diversi percorsi la funzione relativa del controller
router.post('/login', usersController.loginUser);

router.post('/signup', usersController.addUser);

router.post('/sendMessage', usersController.sendMessage);

router.get("/showChat/:loggedUserId", usersController.showChat)

router.get("/findUser/:userId", usersController.findUser)

router.post('/addFriend', usersController.addFriend)

router.post('/deleteFriend', usersController.deleteFriend)

router.get('/viewFriends/:loggedUserId', usersController.viewFriends)


module.exports = router;





