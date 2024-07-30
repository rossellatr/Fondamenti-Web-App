const {mongoose, Schema} = require('mongoose')
const Chat = require('./chat')

//Creo lo schema di mongoose relativo all'utente
const userSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true
    }, lastName: {
        type: String, required: true
    }, username: {
        type: String, required: true, unique: true
    }, password: {
        type: String, required: true,
    }, gender: {
        type: String,
    }, birthday: {
        type: Date, unique: false
    }, logged: {
        type: Boolean, default: false
    }, chats: [{type: Schema.Types.ObjectId, ref: "Chat"}], 
    friends: [{type: Schema.Types.ObjectId, ref: "User"}]

});


module.exports = mongoose.model("User", userSchema)
