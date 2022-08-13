import axios from "axios"
import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import './Login.css'

export default function Login(props) {
  
  const [user, setUser] = useState(null)

  const navigate = useNavigate();

  const changeHandler = (e) => {
    let temp = { ...user }
    temp[e.target.name] = e.target.value
    setUser(temp)
  }

  const loginHandler = async () => {
    const res = await axios.post('/users/login', user)
    if (res) {
      props.setUserInState(user)
      navigate("/")
    } else {
      props.setMessage("Bad Credentials - Try Again")
    }
  }

  return (
    <div className="login">
      <div id='formWrapper'>
        <img src="login.png"></img>
        <Form.Group>
          <Form.Label>Email Address: </Form.Label>
          <Form.Control
            name="emailAddress"
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
        <button class="button-13" onClick={loginHandler} role="button"> Login </button>

        <h4>{props.message}</h4>
        </div>
      <div className="loginImg">
        <img src="compRight.png" alt="" />
      </div>
    </div>
  );
}