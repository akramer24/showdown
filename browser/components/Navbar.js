import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="navbar">
            <NavLink to='/' id='nav-home' className='NavLink'>Home</NavLink>
            <div className="dropdown">
                <button className="dropbtn" onClick={() => document.getElementById("myDropdown").classList.toggle("show")}>Players
            <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content" id="myDropdown">
                    <NavLink to='/players/batters' className='NavLink' onClick={() => document.getElementById("myDropdown").classList.toggle("show")}>Batters</NavLink>
                    <NavLink to='/players/pitchers' className='NavLink' onClick={() => document.getElementById("myDropdown").classList.toggle("show")}>Pitchers</NavLink>
                </div>
            </div>
        </div>
    )
}