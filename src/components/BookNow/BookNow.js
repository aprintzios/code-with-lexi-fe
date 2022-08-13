import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import axios from "axios"
import "./BookNow.css"

export default function BookNow(props) {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        let temp = { ...user };
        temp[e.target.name] = e.target.value;
        setUser(temp);
    };

    const bookNowHandler = async () => {
        props.setUserInState(user)
        await axios.post("/api/users/signup", user)
        navigate("/")
    }

    return (
        <div className="signup">
            <div className="signupImg">
                <img src="compLeft.png" alt="" />
            </div>
                <div id='formWrapper'>
                    <Form.Group>
                        <Form.Label>Date: </Form.Label>
                        <Form.Control
                            name="date"
                            type="date"
                            onChange={changeHandler}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Time: </Form.Label>
                        <Form.Control
                            name="time"
                            type="time"
                            onChange={changeHandler}
                        ></Form.Control>
                    </Form.Group>
                    <button className="button-13" onClick={bookNowHandler} role="button"> Book </button>

                </div>
        </div>
    );
}