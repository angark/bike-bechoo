import React, { useEffect,useRef } from "react";
import { useLocation } from "react-router-dom";
import "./WhyChooseBikeBechoo.css"; // Link to external stylesheet
import whychoose from "../../assets/istockphoto-1404254643-1024x1024.jpg";


const WhyChooseBikeBechoo = () => {
    const sectionRef = useRef(null);
  const location = useLocation();


      useEffect(() => {
      if (location.hash === "#whySection" && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [location]);
  return (
    <section className="why-container" id="whySection" ref={sectionRef}>
      <div className="why-content">
        {/* Left: Text Section */}
        <div className="why-text">
          <h2>
            Why Choose <span className="highlight">BikeBechoo</span>?
          </h2>

          <div className="features">
            <div className="feature-item">
              <div className="icon-circle">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div>
                <h3>Verified Listings</h3>
                <p>
                  All bikes go through our verification process to ensure quality and authenticity.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="icon-circle">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <div>
                <h3>Best Prices</h3>
                <p>
                  We provide price comparison tools to ensure you get the best deal in the market.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="icon-circle">
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <h3>24/7 Support</h3>
                <p>
                  Our customer support team is always available to assist you with any queries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="why-image">
          <img
            src={whychoose}
            alt="Customer with bike"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBikeBechoo;
