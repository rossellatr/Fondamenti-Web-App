const {mongoose, Schema} = require("mongoose")
const Users = require("./users")

const messageSchema = new mongoose.Schema({
    text: {type: String, required: true, unique: false},
    sender: [{type: Schema.Types.ObjectId, ref: "Users"}],
    receiver: [{type: Schema.Types.ObjectId, ref: "Users"}]
}, {timestamp: true});

module.exports = mongoose.model("Message", messageSchema)
