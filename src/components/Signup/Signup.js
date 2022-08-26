import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import axios from "axios"
import "./Signup.css"
import {Link} from "react-router-dom"

export default function Signup(props) {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        let temp = { ...user };
        temp[e.target.name] = e.target.value;
        setUser(temp);
    };

    const signupHandler = async (e) => {
        e.preventDefault()
        props.setUserInState(user)
        const res = await axios.post("/api/users/signup", user)
        if (res) {
            props.setUserInState(user)
            let token = res.data;
            localStorage.setItem('token', token);  
            navigate("/")
          } else {
            props.setMessage("Bad Credentials - Try Again")
          }
    }

    return (
        <div className="signup">
            <div className="signupImg">
                <img src="compLeft.png" alt="" />
            </div>
                <div id='formWrapper'>
                    <img src="signup.png"></img>
                    <form id="signupForm" onSubmit={signupHandler}>
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
                        <button className="button-13" role="button"> Register </button>
                    </form>
                    {/* <button className="button-13" onClick={signupHandler} role="button"> Register </button> */}
                    <div>Already have an account? <Link to="/login">Login</Link></div>
                </div>
        </div>
    );
}