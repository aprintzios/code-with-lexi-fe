import React, { useEffect, useState } from "react"
import Calendar from "react-calendar"
import axios from "axios"
import "./ManageSessions.css"

export default function ManageSessions(props) {

    const [date, setDate] = useState(new Date());
    const [bookedSessions, setBookedSessions] = useState([]);
    const [availableSessions, setAvailableSessions] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [jwt, setJWT] = useState("")

    const grabJWT = async () => {
        setJWT(localStorage.getItem('token'))
    }

    useEffect(() => {
        async function fetchSessions() {
            let resBooked = await axios.get("/api/sessions/booked");
            let resAvailable = await axios.get("/api/sessions/available");
            setBookedSessions(await resBooked.data);
            setAvailableSessions(await resAvailable.data);
            grabJWT()
            Array.from(document.getElementsByTagName('script')).forEach(elem => elem.remove())
            const script = document.createElement("script")
            script.src = "manage-sessions-calendar.js"
            script.async = true
            script.defer = true
            document.body.appendChild(script)
        }
        fetchSessions();
    }, [submit])

    return (
        <div className="createSessions">
            <div id="calWrapper">
                <div id="calDiv">
                    <div id="calendar"><Calendar onChange={setDate} value={date} /></div>
                    <input id="calendar-value" type="hidden" value={date} />
                </div>
                <div className="availableTimesContainer">
                    <h3>Available Times</h3>
                    <div id="availableTimeDiv"></div>
                </div>
                <div className="bookedTimesContainer">
                    <h3>Booked Times</h3>
                    <div id="bookedTimeDiv"></div>
                </div>
            </div>
            <div>
                <input type='hidden' id="bookedSessions" value={JSON.stringify(bookedSessions)} />
                <input type='hidden' id="availableSessions" value={JSON.stringify(availableSessions)} />
                <input type='hidden' id="jwt" value={jwt}/>
            </div>
        </div>
    );
}