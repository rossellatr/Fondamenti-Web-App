const {mongoose, Schema} = require("mongoose")
const Message = require("./message")


const chatSchema = new mongoose.Schema({
    utente1: {
        type: String, unique: false
    }, utente2: {
        type: String, unique: false
    }, messages: {type: [Message.Schema]}
});

module.exports = mongoose.model("Chat", chatSchema)
