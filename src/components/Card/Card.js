import React from 'react'
import './Card.css'
import { Link } from "react-scroll";


export default function Card(props) {
    return (
        <div className="card" style={{ backgroundColor: props.bgColor }}>
            <div id="cardTitle"> <img src={props.title}></img>  </div>

            <div id="cardPoints">
                <ul>
                    {props.points.map(point => {
                        return <li key={point}>{point}</li>;
                    })}
                </ul>
            </div>
            <div id="cardButton"> 
            <Link to={props.btnLink} smooth={true} duration={500}> <button className="button-13" role="button"> Learn More </button> </Link>
            </div>
        </div>
    )
}
