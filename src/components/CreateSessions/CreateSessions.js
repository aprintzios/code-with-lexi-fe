import React, { useState, useEffect } from "react"
import axios from "axios"
import "./CreateSessions.css"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export default function CreateSessions(props) {
    const [date, setDate] = useState(new Date());
    const createSessionsHandler = async (e) => {
        await axios.post("/api/sessions/create", {sessions: e.target.value})
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
        ClearScripts()
        AttachScript("create-sessions-calendar.js")
    }, [])

    return (
        <div className="create">
            <div id="calWrapper">
                <div id="calDiv">
                    <div id="calendar"><Calendar selectRange={true} onChange={setDate} value={date} /></div>
                    <input id="calendar-value" type="hidden" value={date} />
                </div>
                <div id="timeDiv">
                    Choose a date..
                </div>
            </div>
            <div id='createBtnDiv'>
                <button id="createNowBtn" className="button-13" onClick={createSessionsHandler} role="button"> Create </button>
            </div>
        </div>
    );
}