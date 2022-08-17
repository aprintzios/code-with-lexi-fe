import React from 'react'
import './InfoLeft.css'
import {Link} from 'react-router-dom'

export default function InfoLeft(props) {
    return (
        <div id={props.id} className="info">
            <div id="leftInfo">
                <img src={props.content}></img>
                <Link to='/book'><button className="button-13" role="button"> Book Now </button></Link>
            </div>
            <div id="rightInfo">
                <img src={props.pic}></img>
            </div>
        </div>
    )
}
