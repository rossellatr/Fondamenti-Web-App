import Card from '../components/Card';
import '../style/style_homepage.css'

export default function Homepage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.username;
    const gender = user.gender;


    return (
        <>
            <h2>
                Benvenut{gender === "male" ? "o" : (gender === "female" ? "a" : "*")} <div className={'username'}>{username}</div>
            </h2>
            <p>Scegli cosa vuoi fare 🧑‍💻</p>
            <div className="sidebar">
                <div className="box">
                <Card icon={"👓"} name="Visualizza le mie chat" link="/ChatsPage" />
                <Card icon={"📨"} name="Invia un messaggio" link="/SendFirstMessage" />
                <Card icon={"👭"} name="Visualizza i miei amici" link="/viewFriends" />
                <Card icon={"🙋"} name="Aggiungi un amico" link="/addFriend" />
                <Card icon={"🙅"} name="Elimina un amico" link="/deleteFriend" />
                    </div>
            </div>
        </>
    );
}
