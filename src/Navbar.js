import React from 'react';
import { Link } from 'react-router-dom';
import banklogo from './img/banklogo.png';

const Navbar = ({ isLoggedIn, onLoginClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={banklogo} alt="Bank Logo" style={{ height: '40px' }} />
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/personal">Personal</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/business">Business</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/wealth-management">Wealth Management</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About Us</Link>
          </li>
        </ul>

        <div className="d-flex">
          {!isLoggedIn ? (
            <>
              <button onClick={onLoginClick} className="btn btn-primary me-2">Login</button>
              <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
            </>
          ) : (
            <Link to="/dashboard" className="btn btn-success">Dashboard</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
