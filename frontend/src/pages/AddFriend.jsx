import React from "react"
import { useState } from "react"
import axios from "axios"

export default function AddFriend() {
    const [friendToAdd, setFriendToAdd] = useState('')

    const user = JSON.parse(localStorage.getItem('user'))
    const me_user = user._id //ottengo l'id dell'utente attualmente loggato 
    
    const handleAddFriend = (event) => {
        event.preventDefault()

        if (friendToAdd === user.username) {
            alert("Non puoi aggiungere te stesso come amico.");
            return;
        }

        axios.post('http://localhost:3000/api/users/addFriend', {user: me_user, friend: friendToAdd})
      .then((response) => {
        console.log(response.data)
        alert("L'amico è stato aggiunto!")
        setFriendToAdd('') //effettuo la richiesta post per l'aggiunta di un amico passando come corpo della richiesta l'amico da aggiungere e l'id dell'utente attualmente loggato 
      })
      .catch((error) => { //gestisco i diversi errori
        if (error.response && error.response.status === 401) {
          alert("Utente non trovato")
        } 
        else if (error.response && error.response.status === 400) {
          alert("Utente già presente nella lista di amici")
        } 
        else {
          console.error(error)
        }
      })
  };
  return(
        <div> 
            <h2> In questa pagina puoi aggiungere un amico 🙋</h2>
            
            <form onSubmit={handleAddFriend}>
            <label> Aggiungi un amico  </label>
            <input type="text" name="friendadd" placeholder="Digita lo username dell'amico" value={friendToAdd} 
            onChange={(event) => 
              {setFriendToAdd(event.target.value); event.target.value=''} } />
            <button type="submit">Aggiungi</button>
            </form>
            <p> Per ritornare alla <a href="http://localhost:3001/homepage" style={{ color: "#6643b5" }}> Homepage </a> </p>



        </div>
  );
}
