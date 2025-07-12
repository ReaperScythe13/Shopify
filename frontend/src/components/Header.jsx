import React from "react"
import { Link, NavLink } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export default function Header(){
    return (
        <header>
            <nav className="header">
                <h2>BALL.CO</h2>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/new">New Arrivals</NavLink>
                <NavLink to="/brand">Brand</NavLink>
                <form className="searchBar" action="/submit" method="get">
                    <button type="submit"> <FaSearch className="search" /> </button>
                    <input type="search" placeholder="Check up"></input>
                    
                </form>
                <FaShoppingCart className="shoppingCart" />
                <FaUserAlt className="user"/>
            </nav>
        </header>
    )
}
