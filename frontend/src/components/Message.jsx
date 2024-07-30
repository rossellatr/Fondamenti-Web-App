import { useEffect, useState } from "react";
import '../style/style_message.css';

export default function Message({ message, loggedUser }) {
    const [color, setColor] = useState("");
    const [messageClass, setMessageClass] = useState("");

    useEffect(() => {
        loggedUser._id === message.sender[0] ? setColor("white") : setColor("f2f2f2");

        // Imposta la classe del messaggio in base al colore
        setColorClass(color === "white" ? "right" : "left");
    }, [color]);

    const setColorClass = (color) => {
        setMessageClass(color);
    };

    return (
        //definiamo la struttura del messaggio
        <p className={`${messageClass}`} style={{ color: color }}>
            {message.text}
        </p>
    );
}

