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
              <h7 className="about-subtitle">Who We Are</h7>
              <p className="about-text">Welcome to MultiShop! We are more than just an online store; we are a community of passionate individuals dedicated to providing you with the best shopping experience possible.</p>
              <p className="about-text">Our journey began with a simple vision: to revolutionize the way people shop online. We believe that shopping should be convenient, enjoyable, and hassle-free. That's why we've built MultiShop to offer a wide range of products, from fashion and electronics to home goods and beyond, all in one place.</p>
              <p className="about-text">At MultiShop, we are committed to quality. We carefully select each product to ensure it meets our high standards of excellence. Whether you're looking for the latest fashion trends, cutting-edge electronics, or stylish home decor, you can trust that you'll find only the best at MultiShop.</p>
              <p className="about-text">But we're more than just a retailer; we're your partners in shopping. Our dedicated team is here to assist you every step of the way, from helping you find the perfect product to providing expert advice and support after your purchase. Thank you for choosing MultiShop. We're excited to embark on this journey with you and to redefine the way you shop online.</p>
            </div>
            <div className="col-lg-6">
              <img className="about-image img-fluid" src="https://www.khwajallc.com/images/about-img.jpg" alt="About Us" />
            </div>
          </div>

        </div>
      </div>
      <div className="services-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="service-block">
                <h3 className="service-title">Trusted</h3>
                <p className="service-description">We strive to build trust with our customers by delivering reliable products and services.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-block">
                <h3 className="service-title">Professional</h3>
                <p className="service-description">Our team consists of experienced professionals dedicated to providing you with expert guidance and support.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-block">
                <h3 className="service-title">Expert</h3>
                <p className="service-description">We offer expert advice and assistance to help you make informed decisions about your purchases.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
