import axios from "axios"
import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import './Login.css'
import {Link} from "react-router-dom"

export default function Login(props) {
  
  const [user, setUser] = useState(null)

  const navigate = useNavigate();

  const changeHandler = (e) => {
    let temp = { ...user }
    temp[e.target.name] = e.target.value
    setUser(temp)
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/users/login', user)
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
    <div className="login">
      <div id='formWrapper'>
        <img src="login.png"></img>
        <form onSubmit={loginHandler}>
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
          <button className="button-13" role="button"> Login </button>
          </Form.Group>
        </form>

        {/* <h4>{props.message}</h4> */}
        <div>Need an account? <Link to="/signup">Sign up</Link></div>
        </div>
      <div className="loginImg">
        <img src="compRight.png" alt="" />
      </div>
    </div>
  );
}