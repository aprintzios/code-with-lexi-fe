import React from 'react'
import './About.css'
import {Link} from 'react-router-dom'

export default function About(props) {
    return (
        <div className="about">
            <div id="leftAbout">
                <img src={props.pic}></img>
            </div>
            <div id="rightAbout" style={{ backgroundColor: props.bgColor }}>
                <img src={props.content}></img>
                <Link to='/book'><button className="button-13" role="button"> Book Now </button></Link>
            </div>
        </div>
    )
}
