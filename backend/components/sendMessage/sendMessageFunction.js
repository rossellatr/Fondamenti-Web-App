const Message = require("../../models/message")
const Chat = require("../../models/chat")
const User = require("../../models/users")

const sendMessageFunction = async (req, res) => {
    try {
        const {text, receiver, sender} = req.body
        const user = await User.findOne({username: receiver})

        if (!user) {
            return res.status(401).json({error: 'Utente non trovato'});
        }

        const newMessage = await new Message({text: text, sender: sender, receiver: user._id})
        const tryChat1 = await Chat.exists({utente1: sender, utente2: user._id})
        const tryChat2 = await Chat.exists({utente1: user._id, utente2: sender})


        if (tryChat1) {
            const ChatRoom = await Chat.findOne({utente1: sender, utente2: user._id})
            ChatRoom.messages.push(newMessage)
            ChatRoom.save()
        } else if (tryChat2) {
            const ChatRoom = await Chat.findOne({utente1: user._id, utente2: sender})
            ChatRoom.messages.push(newMessage)
            ChatRoom.save()
        } else {
            const ChatRoom = await Chat.create({utente1: sender, utente2: user._id})
            ChatRoom.messages.push(newMessage)
            ChatRoom.save()
            user.chats.push(ChatRoom._id)
            user.save()
            const Sender = await User.findOne({_id: sender})
            Sender.chats.push(ChatRoom._id)
            Sender.save()
        }


        res.status(200).send(newMessage)

    } catch (e) {
        console.log(`Error: ${e}`)
        res.end()
    }


}

module.exports = sendMessageFunction