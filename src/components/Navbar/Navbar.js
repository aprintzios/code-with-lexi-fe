import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return (
        <div class="navbar">
            <div class="container nav-container">
                <input class="checkbox" type="checkbox" name="" id="" />
                <div class="hamburger-lines">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </div>
                <div class="logo">
                    <Link to='/'> <img id="main-logo" src='logo.png'></img> </Link>
                </div>
                <div class="menu-items">
                    <li><Link to='/tutoring'>Tutoring</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                    <li><Link to='/login'>Login/Signup</Link></li>
                </div>
            </div>

        </div>
    )
}