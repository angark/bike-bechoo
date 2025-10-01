
import React, { useEffect,useRef } from "react";
import { useLocation } from "react-router-dom";
import "./HowItWorks.css";

const HowItWorks = () => {
    const sectionRef = useRef(null);
  const location = useLocation();


      useEffect(() => {
      if (location.hash === "#hiwSection" && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [location]);

  return (
    <section className="hiw-section" id="hiwSection">
      <div className="hiw-container" >
        <div className="hiw-title"> 
          <h2>How bikebechoo Works</h2>
          <p>Simple steps to buy, sell or rent bikes in your city</p>
        </div>

        <div className="hiw-grid">
          {/* Step 1 */}
          <div className="hiw-step-card">
            <div className="hiw-step-number">1</div>
            <h3 className="hiw-step-title">Browse or List</h3>
            <p className="hiw-step-desc">
              Find your perfect bike from thousands of listings or easily list your bike for sale or rent.
            </p>
          </div>

          {/* Step 2 */}
          <div className="hiw-step-card">
            <div className="hiw-step-number">2</div>
            <h3 className="hiw-step-title">Connect</h3>
            <p className="hiw-step-desc">
              Message the seller/renter directly to discuss details, ask questions, or schedule a test ride.
            </p>
          </div>

          {/* Step 3 */}
          <div className="hiw-step-card">
            <div className="hiw-step-number">3</div>
            <h3 className="hiw-step-title">Complete Transaction</h3>
            <p className="hiw-step-desc">
              Meet in person to complete the sale or rental agreement with our secure payment options.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
