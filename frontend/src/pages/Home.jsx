import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate()

    return (
        <div className="homepage">
            <h1>Basketball Isn’t Just a Game — It’s a Lifestyle.</h1>
            <p>Browse through our range of basketball style shop. No matter where you go keep the ball in your hands.</p>
            <button onClick={() => navigate("/shop") }>Shop now</button>
        </div>
    )
}