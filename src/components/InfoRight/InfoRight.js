import React from 'react'
import './InfoRight.css'
import {Link} from 'react-router-dom'
export default function InfoRight(props) {
    return (
        <div id={props.id} className="info">
            <div id="leftInfoR">
                <img src={props.pic}></img>
            </div>
            <div id="rightInfoR" style={{ backgroundColor: props.bgColor }}>
                <img src={props.content}></img>
                <Link to='/book'><button className="button-13" role="button"> Book Now </button></Link>
            </div>
        </div>
    )
}
