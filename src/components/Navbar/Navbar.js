import React from 'react'
import { useNavigate } from "react-router"
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import './Navbar.css'

export default function Navbar(props) {

    const navigate = useNavigate();

    const handleLogOutRedirect = () => {
        props.handleLogOut()
        navigate('/')
    }

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
                    {window.location.pathname == '/' ?
                    <>
                        <li><ScrollLink to='tutoring' smooth={true} duration={500}>Tutoring</ScrollLink></li>
                        <li><ScrollLink to='about' smooth={true} duration={500}>About</ScrollLink></li>
                        <li><ScrollLink to='contact' smooth={true} duration={500}>Contact</ScrollLink></li>
                    </>
                    : 
                        <Link to='/'>Home</Link>
                    }
                    <li><Link to='/book'>Book Now</Link></li>
                    {props.user && props.user.isAdmin ?
                        <li><Link to='/createSessions'>Create Sessions</Link></li>
                        :
                        <></>
                    }
                    {props.user ?
                        <li><button onClick={handleLogOutRedirect}>Logout</button></li>
                        :
                        <li><Link to='/login'>Login/Signup</Link></li>
                    }

                </div>
            </div>

        </div>
    )
}