import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [storedData, setStoredData] = useState([]);
  const navigate = useNavigate(); // Added for navigation

  // Fetch existing data from JSONBin
  const fetchStoredData = () => {
    const config = {
      method: 'GET',
      url: 'https://api.jsonbin.io/v3/b/66edd0afad19ca34f8a9be58/latest',
      headers: {
        'X-Master-Key': '$2a$10$kxYVVA84ybCOb3kfMC3DRe3yLzbpkz3NRQgiys.4SsezG056wBJKO',
      },
    };

    axios(config)
      .then((response) => {
        setStoredData(Array.isArray(response.data.record) ? response.data.record : []);
      })
      .catch((error) => {
        console.error('Error fetching stored data:', error);
      });
  };

  // Handle signup form submission
  const handleSignup = (e) => {
    e.preventDefault();

    const newUserData = {
      username,
      email,
      password,
    };

    // Append new user to the stored data
    const updatedData = [...storedData, newUserData];
    const dataToStore = JSON.stringify(updatedData);

    const config = {
      method: 'PUT',
      url: 'https://api.jsonbin.io/v3/b/66edd0afad19ca34f8a9be58',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$kxYVVA84ybCOb3kfMC3DRe3yLzbpkz3NRQgiys.4SsezG056wBJKO',
      },
      data: dataToStore,
    };

    axios(config)
      .then(() => {
        setMessage('Signup successful! Redirecting to login...');
        fetchStoredData();  // Refresh stored data
        clearForm();  // Clear form after successful submission

        // Redirect to login page after successful signup
        setTimeout(() => {
          navigate('/'); // Redirect to homepage or login
        }, 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Signup failed.');
      });
  };

  // Clear form fields
  const clearForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    fetchStoredData();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Create a National Bank Account</h1>
      <p>Sign up today to get started with our world-class banking services.</p>
      <form onSubmit={handleSignup} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
};

export default Signup;
