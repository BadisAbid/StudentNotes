import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Adminpage = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [data, setData] = useState([]);

    const handleLogout = () => {
        navigate('/adminlogin');
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', file);
        axios.post('http://localhost:3000/upload', formData)
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log("File uploaded successfully:", res.data.image);
                    // Fetch the updated list of images from the server
                    axios.get('http://localhost:3000/')
                        .then(res => {
                            setData(res.data);
                        })
                        .catch(err => console.log(err));
                } else {
                    console.log("Upload failed");
                }
            })
            .catch(err => {
                console.error('Error uploading file:', err);
            });
    };

    const handleDelete = (imageName) => {
        axios.delete(`http://localhost:3000/delete/${imageName}`)
            .then(res => {
                console.log('Image deleted:', res.data);
                // Update the state to remove the deleted image
                setData(data.filter(item => item.image !== imageName));
            })
            .catch(err => console.error('Failed to delete image:', err));
    };
    useEffect(() => {
        axios.get('http://localhost:3000/')
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <Header />
            <div className="admin-form-container">
                <h1>Welcome Admin</h1>
                <div className="form-box">
                    <input type="file" onChange={handleFile} />
                    <button type="submit" onClick={handleUpload}>Upload</button>
                </div>
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
                <br />
                {data && data.length > 0 && data.map((item, index) => (
                    <div key={index}>
                        <img src={`http://localhost:3000/images/${item.image}`} alt="" />
                        <button className="delete-btn" onClick={() => handleDelete(item.image)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Adminpage;