const User = require("../../models/users");

deleteFriend = async (req, res) => {
  try {
    const { user, friend } = req.body

    const foundUser = await User.findById(user); //ricerco l'utente attualmente loggato tramite il suo id

    const friendToDelete = await User.findOne({ username: friend }) //ricerco nel database l'amico da eliminare tramite il suo username
   
    if (!friendToDelete) {
      return res.status(401).json({ error: 'Utente non trovato' })} //restituisco un errore 401 se l'utente non è stato trovato
     
      if (!foundUser.friends) {
        foundUser.friends = [] } //inizializzo l'array friends dell'utente

      
    const friendIndex = foundUser.friends.findIndex(friendId => friendId.toString() === friendToDelete._id.toString())
    //ottengo l'indice relativo all'amico da eliminare confrontandolo con quello presente nella lista di amici 

    
    if (friendIndex === -1) {
        return res.status(400).json({ error: 'Amico non presente nella lista di amici' }) } //restuisco errore 400 se l'amico non è stato trovato nella lista
  
      foundUser.friends.splice(friendIndex, 1) 
      await foundUser.save(); /*altrimento elimino l'amico tramite la funzione splice che richiede in input 
                              l'indice dell'elemento da eliminaare e il numero di elementi da eliminare */
    res.json({ message: 'Amico eliminato correttamente' }); //operazione andata a buon fine 
  } catch (error) {
    console.log('Errore:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
}



module.exports=deleteFriend


