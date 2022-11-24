import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

import logo from './img/logo.png';
import './Login.css';

async function loginUser(credentials) {
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const navigate = useNavigate()
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    navigate("/pessoa");
    
  }

  return(
    <div className="login">
      <form onSubmit={handleSubmit}>

        <h1>Log In</h1>
        <img src={logo} alt="Logo da Instituição" style={{width:'120px', height:'120px'}}/>
        <div>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} placeholder="Your user" />
          </label>
        </div>
        <div>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Your password"/>
          </label>
        </div>
        <div>
          <button class="btn-submit" type="submit">Log in</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};