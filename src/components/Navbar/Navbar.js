import React, {useState} from 'react'
import { useNavigate } from "react-router"
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import './Navbar.css'

export default function Navbar(props) {

    const navigate = useNavigate();
    const [transform, setTransform] = useState(false)
    const [hamburger, setHamburger] = useState({line1: "rotate(0deg)", line2: "scaleY(1)", line3: "rotate(0deg)"})

    const handleLogOutRedirect = () => {
        props.handleLogOut()
        navigate('/')
    }

    const toggleMenu = () => {
        setTransform(!transform)
        if (hamburger.line1 == "rotate(0deg)") {
            setHamburger({line1: "rotate(45deg)", line2: "scaleY(0)", line3: "rotate(-45deg)"})
        } else {
            setHamburger({line1: "rotate(0deg)", line2: "scaleY(1)", line3: "rotate(0deg)"})
        }
    }

    const closeMenu = () => {
        setTransform(false)
        setHamburger({line1: "rotate(0deg)", line2: "scaleY(1)", line3: "rotate(0deg)"})
    }

    return (
        <div className="navbar">
            <div className="container nav-container">
                <input className="checkbox" type="checkbox" onClick={toggleMenu} name="" id="" />
                <div className="hamburger-lines">
                    <span className="line line1" style={{transform: hamburger.line1}}></span>
                    <span className="line line2" style={{transform: hamburger.line2}}></span>
                    <span className="line line3" style={{transform: hamburger.line3}}></span>
                </div>
                <div className="logo">
                    <Link to='/'> <img id="main-logo" src='logo.png'></img> </Link>
                </div>
                <div className="menu-items" style={{transform: transform ? "translateY(0%)" : "translateY(-150%)" }}>
                    {window.location.pathname == '/' ?
                    <>
                        <li><ScrollLink onClick={closeMenu} to='tutoring' smooth={true} duration={500}>Tutoring</ScrollLink></li>
                        <li><ScrollLink onClick={closeMenu} to='about' smooth={true} duration={500}>About</ScrollLink></li>
                        <li><ScrollLink onClick={closeMenu} to='tutoring' smooth={true} duration={500}>Contact</ScrollLink></li>
                    </>
                    : 
                        <Link to='/'>Home</Link>
                    }
                    {props.user ?                     
                        <li><Link onClick={closeMenu} to='/book'>Book Now</Link></li>
                    :
                        <li><Link onClick={closeMenu} to='/login'>Book Now</Link></li>
                    }
                    {props.user && props.user.isAdmin ?
                        <>
                            <li><Link onClick={closeMenu} to='/manage'>Manage Sessions</Link></li>
                            <li><Link onClick={closeMenu} to='/create'>Create Sessions</Link></li>
                        </>
                        :
                        <></>
                    }
                    {props.user ?
                        // <li><button onClick={handleLogOutRedirect}>Logout</button></li>
                        <li><Link onClick={() => {closeMenu(); handleLogOutRedirect()}} to='/'>Logout</Link></li>
                        :
                        <li><Link onClick={closeMenu} to='/login'>Login/Signup</Link></li>
                    }

                </div>
            </div>

        </div>
    )
}