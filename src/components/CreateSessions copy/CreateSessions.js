import React, { useEffect, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import axios from "axios"
import "./CreateSessions.css"

export default function CreateSessions(props) {

    const [data, setData] = useState(null);
    const [bookedSessions, setBookedSessions] = useState([]);
    const [availableSessions, setAvailableSessions] = useState([]);
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        let temp = { ...data };
        temp[e.target.name] = e.target.value;
        setData(temp);
    };

    const createSessionsHandler = async () => {
        await axios.post("/api/sessions/create", data)
        setSubmit(!submit)
        navigate("/manage")
    }

    const handleDeleteSession = async (e) => {
        let jwt = localStorage.getItem('token')
        await axios.delete(`/api/sessions/delete?sessionId=${e.target.value}&token=${jwt}`)
        setSubmit(!submit)
    }

    useEffect(() => {
        async function fetchSessions() {
            let resBooked = await axios.get("/api/sessions/booked");
            let resAvailable = await axios.get("/api/sessions/available");
            setBookedSessions(await resBooked.data);
            setAvailableSessions(await resAvailable.data);
        }
        fetchSessions();
    }, [submit])

    return (
        <div className="signup">
            <div className="signupImg">
                <img src="compLeft.png" alt="" />
            </div>
                <div id='formWrapper'>
                    <Form.Group>
                        <Form.Label>Start Date: </Form.Label>
                        <Form.Control
                            name="startDate"
                            type="date"
                            onChange={changeHandler}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Date: </Form.Label>
                        <Form.Control
                            name="endDate"
                            type="date"
                            onChange={changeHandler}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Time: </Form.Label>
                        <Form.Control
                            name="startTime"
                            type="time"
                            onChange={changeHandler}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Time: </Form.Label>
                        <Form.Control
                            name="endTime"
                            type="time"
                            onChange={changeHandler}
                        ></Form.Control>
                    </Form.Group>
                    <button className="button-13" onClick={createSessionsHandler} role="button"> Create Sessions </button>
                </div>

                <div>
                    <h1>Available Sessions</h1>
                        {availableSessions.map(session => <li key={session._id}>{session.date.substring(0,10)} {session.time} <button value={session._id} onClick={handleDeleteSession}>Delete Session</button></li>)}
                    <h1>Booked Sessions</h1>
                        {bookedSessions.map(session => <li key={session._id}>{session.date.substring(0,10)} {session.time}</li>)}
                </div>
        </div>
    );
}