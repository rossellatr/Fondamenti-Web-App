const User = require("../../models/users");


  addUser = async (req, res) => {
    const { firstName, lastName, username, password, gender, birthday } = req.body;
    
    try {
      const existingUser = await User.findOne({ username }) //ricerco se lo username è già presente nel database
    
      if (existingUser) {
        return res.status(400).json({ message: 'Lo username è già stato utilizzato. Si prega di sceglierne un altro.' });
      }
      const chatListId=String(Math.floor(Math.random()*100+1))
      const newUser = new User({ firstName, lastName, username, password, gender, birthday,chatListId, friends: [] }) 
      await newUser.save(); //creo un nuovo utente nel database con i parametri inviati tramite il body della richiesta
    
      res.json({ message: 'Utente aggiunto!' })
    } catch (error) {
      console.log('Errore:', error);
      res.status(500).json({ message: 'Errore del server' });
    }
   };


module.exports=addUser



