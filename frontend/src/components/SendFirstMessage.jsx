import React, {useState} from "react";
import axios from 'axios';
import {socket} from "../socket";
import '../style/style_sendmessage.css'
import {useNavigate} from "react-router-dom";


export default function SendFirstMessage() {

    const navigate = useNavigate();
    const [text, setText] = useState('')
    const [receiver, setReceiver] = useState('')

    const user = JSON.parse(localStorage.getItem('user'));
    const sender = user._id;


    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("new-message", {text, receiver, sender})
        axios.post(`http://localhost:3000/api/users/sendMessage`, {text, receiver, sender})
            .then(() => {
                navigate('/homepage');

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

    }

    return (<>
        <h2>Invia il tuo messaggio 📄</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label id="usernamelabel">Inserisci qui l'username dell'utente a cui vuoi inviare il messaggio</label>
                <input type="text" id="username" name="username" placeholder="Username..." value={receiver}
                       onChange={(e) => {
                           setReceiver(e.target.value);
                           e.target.value = ' '
                       }}/></div>

            <div>
                <label id="messaggiolabel">Inserisci qui il messaggio che vuoi inviare</label>
                <input type="text" id="messaggio" name="messaggio" placeholder="Inserisci qui il tuo messaggio..."
                       value={text}
                       onChange={(e) => {
                           setText(e.target.value);
                           e.target.value = ' '
                       }}/>
            </div>


            <div>
                <button type="submit" id="sendMessage">Invia</button>
            </div>
            <p> Per ritornare alla <a href="http://localhost:3001/homepage" style={{ color: "#6643b5" }}> Homepage </a> </p>


        </form>
    </>)

}