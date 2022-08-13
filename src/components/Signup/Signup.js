import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import axios from "axios"
import "./Signup.css"

export default function Signup(props) {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        let temp = { ...user };
        temp[e.target.name] = e.target.value;
        setUser(temp);
    };

    const signupHandler = async () => {
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
                    <img src="signup.png"></img>
                    <Form.Group>
                        <Form.Label>Name: </Form.Label>
                        <Form.Control
                            name="name"
                            onChange={changeHandler}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email Address: </Form.Label>
                        <Form.Control
                            name="email"
                            onChange={changeHandler}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            onChange={changeHandler}
                        ></Form.Control>
                    </Form.Group>
                    <button className="button-13" onClick={signupHandler} role="button"> Register </button>

                </div>
        </div>
    );
}