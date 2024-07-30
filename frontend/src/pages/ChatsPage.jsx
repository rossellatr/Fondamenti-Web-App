import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import ChatButton from "../components/ChatButton";
import Chat from "../components/Chat";
import '../style/style_chatspage.css'
export default function ChatsPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [chats, setChats] = useState([])
    const [showChatRoom, setShowChatRoom] = useState(false)
    const [rightChat, setRightChat] = useState(Object)
    const [otherUser, setOtherUser]=useState(``)
    const loggedUser = JSON.parse(localStorage.getItem("user"))




    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/showChat/` + `${loggedUser._id}`)
            .then((res) => {
                if (res.status === 200) {
                    return res.data
                } else {
                    throw new Error("Errore di comunicazione col server nell'ottenimento delle chat")
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
            })
    }, [])
    return (<>
        <div>
            {loading ? <p>Caricamento in corso...</p> : error ? <p>Errore!!!Impossibile visualizzare le chat</p> : (
                <div className="sidebarchat">
                    {chats.map((chat) => {
                        let user;
                        {
                            loggedUser._id === chat.utente1 ? user = chat.utente2 : user = chat.utente1
                        }
                        return <ChatButton key={chat._id} user={user} showChatRoom={showChatRoom}
                                           setShowChatRoom={setShowChatRoom} chat={chat}
                                           setRightChat={setRightChat}
                                           setOtherUser={setOtherUser}
                        ></ChatButton>
                    })}
                </div>)}
        </div>
        <div className="main-content" >
            {showChatRoom && (<Chat rightChat={rightChat} otherUser={otherUser} loggedUser={loggedUser} showChatRoom={showChatRoom}></Chat>)}
        </div>
        <p> Per visualizzare solo le chat con i tuoi amici <a href="http://localhost:3001/chatsFriends" style={{ color: "#f96d00" }}> Filtra per amici </a> </p>
        <p> Per ritornare alla <a href="http://localhost:3001/homepage" style={{ color: "#6643b5" }}> Homepage </a> </p>


    </>)

}