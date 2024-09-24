import React from 'react';
import heroImage from './img/lady.png'; // Replace with your actual image path

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${heroImage})`,
          minHeight: '100vh', // Smaller height for a more compact hero section
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat', // Prevents the image from repeating
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start', // Align the content to the left
          paddingLeft: '5%', // Add some padding to the left for spacing
          color: 'white',
        }}
      >
        {/* Text Content */}
        <div style={{ maxWidth: '500px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>About Us</h1>
          <p style={{ fontSize: '1.2rem' }}>
            We are committed to providing exceptional financial solutions, focusing on customer satisfaction, innovation, and community impact.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mt-5">
        <h2>Welcome to National Bank</h2>
        <p>
          National Bank has been serving individuals and businesses with a
          commitment to quality service and innovation. We offer a wide range of
          banking solutions designed to meet your financial needs.
        </p>
        <h3>Our Mission</h3>
        <p>
          To provide customers with exceptional financial solutions while
          focusing on technology, customer satisfaction, and community impact.
        </p>
        <h3>Our Values</h3>
        <ul>
          <li>Customer Satisfaction</li>
          <li>Integrity</li>
          <li>Innovation</li>
          <li>Community Engagement</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
