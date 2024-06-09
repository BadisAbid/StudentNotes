import "./App.css";
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Adminlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:3000/adminlogin', { email, password })
      .then(res => {
        setMessage(res.data.message);
        if (res.data.message === "Login Successfully") {
          navigate('/Adminpage'); // Use navigate to redirect to home if login is successful
        }
      })
      .catch(err => {
        console.log(err);
        setMessage("An error occurred. Please try again.");
      });
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Admin</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <br /><br />
            <input
              type="email"
              placeholder="Enter email"
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <br /><br />
            <input
              type="password"
              placeholder="Enter Password"
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
        </label>
         <div><p>{message}</p></div> 
        <button type="submit" id="login-btn">Login</button>
          
        </form>
      </div>
    </div>
  );
}

export default Adminlogin;
