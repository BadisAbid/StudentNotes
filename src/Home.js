import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./App.css";
import Header from './Header';

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);
        if (!token) {
            navigate('/login');
        } else {
            axios.get('http://localhost:3000/protected', {
                headers: { Authorization: token }
            })
                .then(res => {
                    console.log('Protected route response:', res.data);
                    if (res.data.Status !== "Success") {
                        navigate('/login');
                    }
                })
                .catch(err => {
                    console.error('Error accessing protected route:', err);
                    navigate('/login');
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <Header />
            <h1>Welcome Student</h1>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
            {data.map((item, index) => (
                <img key={index} src={`http://localhost:3000/images/${item.image}`} alt="" style={{ width: "500px", height: "500px", display: 'block', margin: "0 auto" }} />
            ))}
        </div>
    );
}

export default Home;