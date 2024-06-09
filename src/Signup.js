import { Link, useNavigate } from 'react-router-dom';
import "./App.css";
import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/Signup', values);
  
      if (response.data.Status === "Success" || response.statusText === "OK") {
        // Success!
        alert("Signup successful!");
        navigate('/login');
      } else if (response.data.error || response.data.message) {
        // Handle errors here
        alert(`Signup error: ${response.data.error || response.data.message}`);
      } else {
        // Handle unexpected responses
        alert("Signup failed. Please check your details or try again later.");
      }
    } catch (error) {
      alert(`Signup error: ${error.message}`);
    }
  };
  

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <br /><br />
            <input
              type="text"
              placeholder="Enter Name"
              name='name'
              value={values.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <br /><br />
            <input
              type="email"
              placeholder="Enter email"
              name='email'
              value={values.email}
              onChange={handleInputChange}
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
              value={values.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <Link to="/login" id="login-btn">Login </Link>
          <button type="submit" id="signup-btn">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
