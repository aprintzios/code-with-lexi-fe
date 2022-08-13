import React from 'react'
import './About.css'

export default function About(props) {
    return (
        <div className="about">
            <div id="leftAbout">
                <img src={props.pic}></img>
            </div>
            <div id="rightAbout" style={{ backgroundColor: props.bgColor }}>
                <img src={props.content}></img>
                <button class="button-13" role="button"> Book Now </button>
            </div>
        </div>
    )
}
