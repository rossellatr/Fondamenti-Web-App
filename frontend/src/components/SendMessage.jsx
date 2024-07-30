import React, {useState} from "react";
import axios from 'axios';
import {socket} from "../socket";
import '../style/style_sendmessage.css'


export default function SendMessage({receiver, sender, rightChat}) {

    const [text, setText] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/api/users/sendMessage`, {text, receiver, sender}, setText(``))
            .then((res) => {
                console.log(text)
                rightChat.messages.push(res.data)
                //setText(``)
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    const {error: errorMessage} = error.response.data;
                    alert(errorMessage);
                } else {
                    console.error(error);
                    alert('Errore del server');
                }
            });
        socket.emit("newMessage", {text, receiver, sender})


    }

    return (<>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" id="messaggio" name="messaggio" placeholder="Inserisci qui il tuo messaggio..."
                       value={text}
                       onChange={(e) => {
                           setText(e.target.value);
                       }}
                />
                <button type="submit" id="sendMessage">{"📨"}</button>
            </div>


        </form>
    </>)

}

/*

* */