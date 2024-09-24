// LoginModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection after successful login

const LoginModal = ({ show, onClose, setIsLoggedIn }) => {
  const [storedUsers, setStoredUsers] = useState([]);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  useEffect(() => {
    // Fetch stored users from JSONBin when component mounts
    const fetchStoredUsers = () => {
      const config = {
        method: 'GET',
        url: 'https://api.jsonbin.io/v3/b/66edd0afad19ca34f8a9be58/latest',
        headers: {
          'X-Master-Key': '$2a$10$kxYVVA84ybCOb3kfMC3DRe3yLzbpkz3NRQgiys.4SsezG056wBJKO',
        },
      };

      axios(config)
        .then((response) => {
          setStoredUsers(Array.isArray(response.data.record) ? response.data.record : []);
        })
        .catch((error) => {
          console.error('Error fetching stored users:', error);
        });
    };

    fetchStoredUsers();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the user exists in the stored data based on email and password
    const user = storedUsers.find(
      (user) => user.email === enteredEmail && user.password === enteredPassword
    );

    if (user) {
      setError('');
      setIsLoggedIn(true); // Set the user as logged in
      onClose(); // Close the modal after successful login
      navigate('/dashboard'); // Navigate to the dashboard
    } else {
      setError('Invalid email or password');
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Login</button>
          <button type="button" className="btn btn-secondary mt-3" onClick={onClose}>Cancel</button>
        </form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default LoginModal;
