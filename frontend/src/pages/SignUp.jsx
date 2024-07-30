import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/style_signup.css'


export default function Signup() {

const [inputs, setInputs] = useState({firstName: '', lastName: '', username: '', password:'', gender:'', birthday:''})
const navigate= useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault() //per prevenire il comportamento di default del submit 

    axios.post('http://localhost:3000/api/users/signup', inputs) //eseguo la richiesta post al percorso relativo alla funzione signup 
      .then((response) => {
        console.log(response.data)
        navigate('/login') //dopo la registrazione rimando alla pagina di login
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const { message } = error.response.data;
          alert(message)
          navigate('/signup') 
        } else {
          console.error(error);
        }
      })

}

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value }) }  //aggiorna gli input quando sono modificati i dati nel form 

      
    return (
        <div>
          <h2>Benvenuto! </h2>
          <p>* Indica un campo obbligatorio </p>
          <form onSubmit={handleSubmit}>
            <label> * Nome: </label>
            <input type="text" id="firstName" name="firstName" value={inputs.firstName} onChange={handleChange} required /><br />
    
            <label> * Cognome: </label>
            <input type="text" id="lastName" name="lastName" value={inputs.lastName} onChange={handleChange} required /><br />
    
            <label> * Username: </label>
            <input type="text" id="username" name="username" value={inputs.username} onChange={handleChange} required /><br />
    
            <label> * Password: </label>
            <input type="text" id="password" name="password" value={inputs.password} onChange={handleChange} required /><br />
    
            <label> Genere: </label>
            <select name="gender" value={inputs.gender} onChange={handleChange}>
              <option value="">--Scegli un opzione--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="notsay">I prefer not to say</option>
            </select><br />
    <p></p>
            <label> Compleanno: </label>
            <input  className={'birthday'} type="date" id="birthday" name="birthday" value={inputs.birthday} onChange={handleChange}/><br />
<p></p>
              <button className={'buttonSignup'} type="submit" > Registrati </button>


          </form>
        </div>
      );
}