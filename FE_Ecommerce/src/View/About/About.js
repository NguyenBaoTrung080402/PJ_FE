import React from 'react';
import "./about.css";
const About = () => {
  return (
    <div className="about-page">
      <div className="about-header" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <h1 className="about-title">About Us</h1>
        <nav className="breadcrumbx">
          <a href="http://localhost:3000/" className="breadcrumbx-item">Home </a>
          <span className="breadcrumbx-item active">/ About Us</span>
        </nav>
      </div>

      <div className="about-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="about-subtitle">Who We Are</h2>
              <p className="about-text">We are ThewayShop, a team dedicated to providing the best shopping experience for our customers.</p>
              <p className="about-text">Our mission is to offer high-quality products, exceptional customer service, and a seamless online shopping experience.</p>
            </div>
            <div className="col-lg-6">
              <img className="about-image img-fluid" src="https://www.khwajallc.com/images/about-img.jpg" alt="About Us" />
            </div>
          </div>

        </div>
      </div>
      <div className="row my-5">
            <div className="col-sm-6 col-lg-4">
              <div className="service-block">
                <h3 className="service-title">Trusted</h3>
                <p className="service-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service-block">
                <h3 className="service-title">Professional</h3>
                <p className="service-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="service-block">
                <h3 className="service-title">Expert</h3>
                <p className="service-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
          </div>
    </div>
  );
};

export default About;
