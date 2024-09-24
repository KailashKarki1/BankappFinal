import React from 'react';

const Hero = ({ title, subtitle, backgroundImage, ctaText, ctaLink, style }) => {
  return (
    <div className="hero" style={style}>
      <div className="container-fluid h-70">
        <div className="row h-70">
          {/* Text Section with Dark Red Background */}
          <div className="col-md-4 d-flex align-items-center" style={{ backgroundColor: '#8B0000' }}>
            <div className="text-white p-4">
              <h1>{title}</h1>
              <p>{subtitle}</p>
              <a href={ctaLink} className="btn btn-outline-light">{ctaText}</a>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="col-md-8 p-0">
            <img 
              src={backgroundImage} 
              alt="Hero background" 
              className="img-fluid w-100 h-100 object-fit-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;