import React from 'react'
import './InfoLeft.css'

export default function InfoLeft(props) {
    return (
        <div id={props.id} className="info">
            <div id="leftInfo">
                <img src={props.content}></img>
                <button className="button-13" role="button"> Book Now </button>
            </div>
            <div id="rightInfo">
                <img src={props.pic}></img>
            </div>
        </div>
    )
}
