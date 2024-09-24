import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Ensure to create this CSS file for styling

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>National Bank of Canada</h5>
            <p>1234 Bank Street, Suite 100<br />Montreal, QC H3B 4W8</p>
            <p>Phone: (123) 456-7890<br />Email: info@nationalbank.ca</p>
          </div>

          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/personal" className="text-white">Personal Banking</Link></li>
              <li><Link to="/business" className="text-white">Business Banking</Link></li>
              <li><Link to="/wealth-management" className="text-white">Wealth Management</Link></li>
              <li><Link to="/about-us" className="text-white">About Us</Link></li>
              <li><Link to="/signup" className="text-white">Sign Up</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Follow Us</h5>
            <a href="https://www.facebook.com/NationalBank" className="text-white me-3" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i> Facebook
            </a>
            <a href="https://twitter.com/NationalBank" className="text-white me-3" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter"></i> Twitter
            </a>
            <a href="https://www.linkedin.com/company/nationalbank" className="text-white" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-linkedin"></i> LinkedIn
            </a>
            <div className="text-center p-3 bg-dark text-light">
        © 2024 National Bank: <a className="text-light" href="https://nationalbank.com/">nationalbank.com</a>
      </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center">
            <p>&copy; {new Date().getFullYear()} National Bank of Canada. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

