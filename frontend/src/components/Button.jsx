import React from "react";
import { Link } from "react-router-dom"
import '../style/style_button.css'

export default function Button({ description, url }) {
    return (
        //creiamo un componente "button" che in realtà è un elemento di lista
        <li>
            <Link to={url} style={{ color: '#6643b5' }}>
                {description}
            </Link>
        </li>
    );
}
