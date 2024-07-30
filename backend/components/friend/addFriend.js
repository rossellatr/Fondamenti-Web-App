const User = require("../../models/users");



addFriend = async (req, res) => {
  try {
    const { user, friend } = req.body //ottengo l'utente attualmente loggato 

    const foundUser = await User.findById(user).populate('friends') //cerco nel database tramite id l'utente
  
    const friendToAdd = await User.findOne({ username: friend })  //cerco nel database lo username dell'amico da aggiungere

    if (!friendToAdd) {
      return res.status(401).json({ error: 'Utente non trovato' })}  //restituisco un errore 401 se l'utente non è stato trovato 

      if (!foundUser.friends) {
        foundUser.friends = [] } //inizializzo l'array degli amici 

      const isFriendAlreadyAdded = foundUser.friends.some((friendId) => friendId.equals(friendToAdd._id));
    if (isFriendAlreadyAdded) {
      return res.status(400).json({ error: 'Utente già presente nella lista di amici' });
    } //effettuo un controllo nel caso in cui l'utente sia già presente nella lista di amici

        foundUser.friends.push(friendToAdd._id); //altrimenti aggiungo all'array friends l'amico 
        await foundUser.save();
        res.json({ message: 'Amico aggiunto correttamente' }) 
      } catch (error) { 
        console.log('Errore: ', error)
        res.status(500).json({ message: 'Errore del server' })
      }
   };


module.exports=addFriend
