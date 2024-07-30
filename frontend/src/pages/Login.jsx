import React, {useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import '../style/style_login.css'

export default function LogIn() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function togglePasswordVisibility() {
        let passwordInput = document.getElementById("password");
        let toggleBtn = document.querySelector(".toggle-btn");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleBtn.innerHTML = "&#x1f576;"; // Change the button icon to hide
        } else {
            passwordInput.type = "password";
            toggleBtn.innerHTML = "&#x1f441;"; // Change the button icon to show
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Salva l'username nel localStorage
        //localStorage.setItem('username', username);

        axios.post('http://localhost:3000/api/users/login', {username, password})
            .then((response) => {
                const data = response.data;
                console.log(data)
                const user = data.user ?? null;
                if (user !== null) {
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate('/homepage');
                } else {
                    alert("Utente non valido o password errata");
                }
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
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username" id="usernameForm">Username:</label>
                <input type="text" id="username" name="username" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="password-toggle">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <span className="toggle-btn" onClick={togglePasswordVisibility}>&#x1f441;</span>
            </div>
            <button type="submit" id="btnSend">Accedi</button>
        </form>

        <p> Don't have an account yet? </p>
        <a href='http://localhost:3001/signup'>
            <button>Sign Up!</button>
        </a>
    </>)
}
