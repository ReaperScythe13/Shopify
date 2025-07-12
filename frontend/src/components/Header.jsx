import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header(){
    return (
        <header>
            <nav>
                <h2>BALL.CO</h2>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/new">New Arrivals</NavLink>
                <NavLink to="/brand">Brand</NavLink>
            </nav>
        </header>
    )
}
