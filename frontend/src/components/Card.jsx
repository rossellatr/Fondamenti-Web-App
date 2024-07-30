import React from "react"
import '../style/style_card.css'
import HomepageButton from "./HomepageButton";

export default function Card( {name, icon, link}) {
    return (
        //creiamo i componenti del homepage
        <div className="row row-cols-1 row-cols-md-1 g-5">
            <div className="col">
        
        <div className="card" style={{width: "18rem", textAlign: "center"}}>
  <div className="card-body">
      <div>{icon}</div>
    <HomepageButton description={name}  url={link}/>
 
  </div>
</div>
</div>
       
            </div>


    )
}
