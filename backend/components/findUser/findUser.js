const User = require("../../models/users")

const findUser = async (req, res) => {
    try {
        const {userId} = req.params
        if (!User.exists({_id: userId})) {
            throw new Error("Utente non trovato")
        } else {
            User.findOne({_id: userId})
                .then((user) => {
                    res.status(200).json(user.username)
                })
        }

    } catch (e) {
        console.error(e);
        res.status(404).send({error: e})
    }

}

module.exports = findUser