import React, { useState, useEffect } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import axios from "axios"
import "./BookNow.css"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export default function BookNow(props) {

    const [chosenSessionId, setChosenSessionId] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    const changeHandler = (e) => {

        setChosenSessionId(e.target.value)
    };

    const bookNowHandler = async () => {
        let jwt = localStorage.getItem('token')
        await axios.put("/api/sessions/update", {
            token: jwt,
            sessionId: chosenSessionId
        })
        // await fetch("/api/sessions/update", {
        //   method: "PUT",
        //   headers: {"Content-Type": "application/json",'Authorization': 'Bearer ' + jwt}, 
        //   body: chosenSessionId
        // })
        // navigate("/")
    }

    useEffect(() => {
        async function fetchSessions() {
            let res = await axios.get("/api/sessions/available");
            setSessions(await res.data);
        }
        fetchSessions();
    }, [])

    return (
        <div className="bookNow">
            <div id="calWrapper">
                <div>
                    <Calendar onChange={setDate} value={date} />
                </div>
                <div>
                    time section
                </div>
            </div>
            <div>
                <input type='hidden' id="sessions" value={JSON.stringify(sessions)} />
                <select onChange={changeHandler} >{sessions.map(session => <option key={session._id} value={session._id}>{session.date.substring(0, 10)} {session.time}</option>)}</select>
            </div>
            <button className="button-13" onClick={bookNowHandler} role="button"> Book </button>
        </div>
    );
}