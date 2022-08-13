import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar(props) {
    return (
        <div className="navbar">
            <div className="container nav-container">
                <input className="checkbox" type="checkbox" name="" id="" />
                <div className="hamburger-lines">
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>
                <div className="logo">
                    <Link to='/'> <img id="main-logo" src='logo.png'></img> </Link>
                </div>
                <div className="menu-items">
                    <li><Link to='/tutoring'>Tutoring</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                    <li><Link to='/book'>Book Now</Link></li>
                    {props.user && props.user.isAdmin ?
                        <li><Link to='/createSessions'>Create Sessions</Link></li>
                        :
                        <></>
                    }
                    {props.user ?
                        <li><button onClick={props.handleLogOut}>Logout</button></li>
                        :
                        <li><Link to='/login'>Login/Signup</Link></li>
                    }

                </div>
            </div>

        </div>
    )
}