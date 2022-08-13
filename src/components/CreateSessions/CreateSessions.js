import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import axios from "axios"
import "./CreateSessions.css"

export default function CreateSessions(props) {

    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        let temp = { ...data };
        temp[e.target.name] = e.target.value;
        setData(temp);
    };

    const createSessionsHandler = async () => {
        await axios.post("/api/sessions/create", data)
        navigate("/createSessions")
    }

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
                    <button className="button-13" onClick={createSessionsHandler} role="button"> Create Session </button>
                </div>
        </div>
    );
}