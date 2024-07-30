import React from "react"
import { useState } from "react"
import axios from "axios"


export default function DeleteFriend() {
    const [friendToDelete, setFriendToDelete] = useState('')

    const user = JSON.parse(localStorage.getItem('user'))
    const me_user = user._id //ottengo l'id dell'utente attualmente loggato 
    
    const handleDeleteFriend = (event) => {
        event.preventDefault()

        if (friendToDelete === user.username) {
            alert("Non puoi rimuovere te stesso come amico.");
            return;
        }

        
        axios.post('http://localhost:3000/api/users/deleteFriend', {  user: me_user, friend: friendToDelete })
      .then((response) => {
        console.log(response.data)
        alert("L'amico è stato eliminato!")
        setFriendToDelete('') }) ////effettuo la richiesta post per l'eliminazione di un amico passando come corpo della richiesta l'amico da eliminare e l'id dell'utente attualmente loggato 
      .catch((error) => { //gestisco i diversi errori
        if (error.response && error.response.status === 401) {
          alert("Utente non trovato")
        } 
        else if (error.response && error.response.status === 400) {
          alert("L'utente non è presente nella lista degli amici")
        } 
        else {
          console.error(error)
        }
      })
  };
  return(
        <div> 
            <h2> In questa pagina puoi eliminare un amico 🙅</h2>
            
            <form onSubmit={handleDeleteFriend}>
        <label> Elimina un amico </label>
        <input type="text" name="frienddelete" placeholder="Digita lo username dell'amico" value={friendToDelete} 
        onChange={(event) => {setFriendToDelete(event.target.value);  event.target.value=''}}   />
        <button type="submit">Elimina</button>
      </form>
      <p> Per ritornare alla <a href="http://localhost:3001/homepage" style={{ color: "#6643b5" }}> Homepage </a> </p>
 </div>
 
  );
}

