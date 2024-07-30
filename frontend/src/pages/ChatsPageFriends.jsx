import React, { useState, useEffect } from "react"
import axios from "axios"
import ChatButton from "../components/ChatButton";
import Chat from "../components/Chat"
import '../style/style_viewfriends.css'

export default function ChatsPageFriends() {
  const [friendList, setFriendList] = useState([])
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [chats, setChats] = useState([]);
  const [showChatRoom, setShowChatRoom] = useState(false)
  const [rightChat, setRightChat] = useState({})
  const [otherUser, setOtherUser] = useState("")
  const loggedUser = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
      //con questa prima axios otteniamo la lista degli amici 
      axios.get("http://localhost:3000/api/users/viewFriends/" + `${loggedUser._id}`)
      .then(res => {
        if (res.data && res.data.friends) {
          setFriendList(res.data.friends)
        } })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Utente non trovato")
        } else {
          console.error(error)
        } })
  }, []);

  //con questa otteniamo le chat dell'utente attualmente loggato 

  useEffect(() => {
    axios.get(`http://localhost:3000/api/users/showChat/` + `${loggedUser._id}`)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          throw new Error("Errore di comunicazione col server nell'ottenimento delle chat");
        }
      })
      .then((dati) => {
        setLoading(false);
        setChats(dati)
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
        console.log(e)
      });
  }, []);

  //quando selezioniamo un amico otteniamo la sua chat corrispondente tramite il setRightChat e la visualizzo

  const handleFriendSelection = (friend) => {
    setSelectedFriend(friend)
    setRightChat(chats.find(chat => chat.utente1 === friend._id || chat.utente2 === friend._id))
    setOtherUser(friend.username)
    setShowChatRoom(true)
  };


  return (
    <div>
      <h2>In questa pagina puoi visualizzare le chat con i tuoi amici</h2>
      {friendList?.length === 0 ? (
        <>
          <p>Non sono presenti amici nella lista</p>
          <p>Se vuoi aggiungerli</p>
          <a href="http://localhost:3001/addFriend"> <button>Aggiungi amico</button> </a>
        </>
      ) : (
        <>
          <ul className="friend-list">
            {friendList.map((friend) => (
              <li className="friend-list-item" key={friend._id} onClick={() => handleFriendSelection(friend)} > {friend.username}
              </li>
            ))}
          </ul>
          {selectedFriend && showChatRoom && (
    <Chat rightChat={rightChat}  otherUser={otherUser} loggedUser={loggedUser}/> )}</>
      )}
      <p> Per ritornare alla <a href="http://localhost:3001/homepage" style={{ color: "#6643b5" }}> Homepage </a> </p>

    </div>
  );
}
