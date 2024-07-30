const loginFunction = require("../components/login/loginFunction")
const signupFunction = require("../components/signup/signupFunction")
const sendMessage = require("../components/sendMessage/sendMessageFunction")
const showChat = require("../components/showChat/showChatFunction")
const addFriend = require("../components/friend/addFriend")
const deleteFriend = require("../components/friend/deleteFriend")
const findUser = require("../components/findUser/findUser")
const viewFriends = require("../components/friend/viewFriends")

//Esporto tutte le funzioni 
module.exports = {
    loginUser: loginFunction,
    addUser: signupFunction,
    sendMessage: sendMessage,
    showChat: showChat,
    addFriend: addFriend,
    deleteFriend: deleteFriend,
    findUser: findUser,
    viewFriends: viewFriends
}

