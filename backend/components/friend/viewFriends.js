const User = require("../../models/users");

viewFriends = async (req, res) => {

    try {
        const { loggedUserId } = req.params //ottengo dalla richiesta get i parametri, ovvero l'id dell'utente attualmente loggato
    
        const foundUser = await User.findById(loggedUserId).populate('friends'); //ricerco l'utente tramite l'id e lo popolo in base ai suoi amici
    
        if (!foundUser) {
          return res.status(404).json({ error: 'Utente non trovato' }); //restituisco errore 404 se non trovo l'utente
        }
    
        if (foundUser.friends.length === 0) {
          return res.json({ error: 'Non sono presenti amici nella lista' }) } //se l'utente non ha amici restituisco errore 
    
        res.json({ friends: foundUser.friends }) //altrimenti mando i risultati relativi all'array friends dell'utente
      } catch (error) {
        console.log('Errore:', error);
        res.status(500).json({ message: 'Errore del server' });
      }
    
}


module.exports=viewFriends