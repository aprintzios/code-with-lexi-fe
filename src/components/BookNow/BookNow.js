import React, { useState, useEffect } from "react"
import axios from "axios"
import "./BookNow.css"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export default function BookNow(props) {
    const [sessions, setSessions] = useState([]);
    const [date, setDate] = useState(new Date());

    const bookNowHandler = async (e) => {
        const jwt = localStorage.getItem('token')
        await axios.put("/api/sessions/update", {
            token: jwt,
            session: e.target.value
        })
    }

    const AttachScript = (scriptName) => {
        const script = document.createElement("script")
        script.src = scriptName
        script.async = true
        script.defer = true
        document.body.appendChild(script)
    }

    const ClearScripts = () => {
        Array.from(document.getElementsByTagName('script')).forEach(elem => elem.remove())
    }

    useEffect(() => {
        async function fetchSessions() {
            let res = await axios.get("/api/sessions/available");
            setSessions(await res.data);
            ClearScripts()
            AttachScript("booking-calendar.js")
        }
        fetchSessions();
    }, [])

    return (
        <div className="bookNow">
            <div id="calWrapper">
                <div id="calDiv">
                    <div id="calendar"><Calendar onChange={setDate} value={date} /></div>
                    <input id="calendar-value" type="hidden" value={date} />
                </div>
                <div id="timeDiv">
                    Choose a date..
                </div>
            </div>
            <div id='bookBtnDiv'>
                <button id="bookNowBtn" className="button-13" onClick={bookNowHandler} role="button"> Book </button>
            </div>
            <div>
                <input type='hidden' id="sessions" value={JSON.stringify(sessions)} />
            </div>
        </div>
    );
}