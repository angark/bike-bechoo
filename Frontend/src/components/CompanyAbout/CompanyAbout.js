import React from 'react';
import './CompanyAbout.css';
import bikeImg from '../../assets/bike.png'; // Replace with your image

const CompanyAbout = () => {
  return (
    <section className="company-about-split">
      <div className="company-about-content">
        <p className="about-subtitle">ABOUT US</p>
        <h1 className="about-title">
          Helping India <span>succeed</span> through the power of bikes.
        </h1>
        <p className="about-description">
          Bike Bechoo is India’s all-in-one platform for buying, selling, and renting motorbikes.
          We connect daily commuters, dealers, and riders across the country with trust, speed, and smart features.
          Our mission is to simplify the two-wheeler market by offering a trusted, user-friendly, and transparent platform where anyone can list or find bikes with just a few clicks.
          From used bikes to rental options, we cover every need and every budget.
        </p>
        <button className="about-btn">Explore Bikes</button>
      </div>

      <div className="company-about-image">
        <div className="image-circle">
          <img src={bikeImg} alt="Bike Rider" />
        </div>
        <div className="dotted-bg"></div>
      </div>
    </section>
  );
};

export default CompanyAbout;
