import React from 'react'
import './InfoRight.css'

export default function InfoRight(props) {
    return (
        <div id={props.id} className="info">
            <div id="leftInfoR">
                <img src={props.pic}></img>
            </div>
            <div id="rightInfoR" style={{ backgroundColor: props.bgColor }}>
                <img src={props.content}></img>
                <button className="button-13" role="button"> {props.btn} </button>
            </div>
        </div>
    )
}
