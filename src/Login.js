import "./App.css";
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', values);
      console.log('Login response:', response.data);
      if (response.data.Status === "Success") {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        setError(response.data.Error);
      }
    } catch (error) {
      console.error('Error during login request:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <br /><br />
            <input
              type="email"
              placeholder="Enter Email"
              name='email'
              onChange={e => setValues({ ...values, email: e.target.value })}
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
              onChange={e => setValues({ ...values, password: e.target.value })}
              required
            />
          </label>
          {error && <div className="error">{error}</div>}
          <button type="submit" id="login-btn">Login</button>
          <Link to="/signup" id="signup-btn">Sign up</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;