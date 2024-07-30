import React, {useEffect, useState} from "react";
import axios from "axios";
import '../style/style_chatbutton.css'
export default function ChatButton({user, showChatRoom, setShowChatRoom, chat, setRightChat, setOtherUser, scroll}) {
    const [name, setName]=useState(``)
    let clickHandler=()=>{
        setShowChatRoom(true)
        setRightChat(chat)
        setOtherUser(name)
    }

    let doubleClickHandler=()=>{
        setShowChatRoom(!showChatRoom)
    }

    useEffect(() => {
        axios.get("http://localhost:3000/api/users/findUser/" + user)
            .then((res) => {
                if (res.status === 200) {
                    return res.data
                } else {
                    throw new Error("Errore di comunicazione col server nell'ottenimento delle chat")
                }
            })
            .then((dati) => {
                setName(dati)
            })
            .catch((e) => {
                console.log(e)
            })


    }, [])
    return (
        <>
        <button className={"chatName"} onClick={clickHandler} onDoubleClick={doubleClickHandler}>{name}</button>
        </>
    );
}