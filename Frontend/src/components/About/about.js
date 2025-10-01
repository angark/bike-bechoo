import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="container">
      {/* Left side (content) */}
      <div className="left-side">
        <h1>Welcome to Our Store</h1>
        <h2>Discover the Best Bikes</h2>
        <p>
          Explore the wide range of bikes and accessories. Find your perfect ride today!
        </p>
        
        <div className="contact">Contact Now: Bikebechooindia@gmail.com</div>
      </div>

      {/* Right side (bike image) */}
      <div className="right-side"></div>
    </div>
  );
};

export default About;
