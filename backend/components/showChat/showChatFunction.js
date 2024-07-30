const User = require("../../models/users")
const Chat = require("../../models/chat")


const showChatFunction = async (req, res) => {
    try {
        const {loggedUserId} = req.params;
        const loggedUser = await User.findOne({_id: loggedUserId});
        Chat.find({_id:loggedUser.chats}).then((dati)=>{
            res.status(200).json(dati)})
    } catch (e) {
        console.log(`Error: ${e}`)
        res.status(500).end()
    }
}

module.exports = showChatFunction

