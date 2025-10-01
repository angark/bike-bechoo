import React, { useEffect,useRef } from "react";
import { useLocation } from "react-router-dom";
import "./TermsAndConditions.css"; // Make sure this file is in the same folder or update path

const TermsAndConditions = () => {
  const sectionRef = useRef(null);
    const location = useLocation();
  
  
        useEffect(() => {
        if (location.hash === "#termsSection" && sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [location]);
  return (
    <div className="terms-container" id="termsSection">
      <h1 className="terms-title">Terms and Conditions</h1>

      <p className="terms-intro">
        Welcome to <strong>Bike Bechoo</strong>. By accessing or using our website (
        <a href="https://www.bikebechoo.com" target="_blank" rel="noopener noreferrer">
          www.bikebechoo.com
        </a>
        ), you agree to comply with and be bound by the following terms and conditions:
      </p>

      <div className="terms-section">
        <h2>1. General Use</h2>
        <ul>
          <li>Bike Bechoo is an online platform for listing, buying, selling, and renting two-wheelers across India.</li>
          <li>Users must be 18 years or older to create an account or list a vehicle.</li>
          <li>All users are responsible for the accuracy of the information they post.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>2. Listings & Transactions</h2>
        <ul>
          <li>Bike Bechoo is not responsible for the actual transaction between buyers and sellers.</li>
          <li>We do not guarantee the quality, condition, or legality of the vehicles listed.</li>
          <li>It is the buyer's responsibility to verify the bike and documents before making any payment.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>3. Seller Responsibilities</h2>
        <ul>
          <li>Sellers must ensure all information provided is accurate and up-to-date.</li>
          <li>Fake, misleading, or duplicate listings may be removed without notice.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>4. Buyer Responsibilities</h2>
        <ul>
          <li>Buyers should thoroughly inspect the bike, verify the ownership documents, and ensure satisfaction before purchase.</li>
          <li>Bike Bechoo is not liable for any disputes arising after the sale.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>5. Rental Listings</h2>
        <ul>
          <li>All terms related to rented bikes (deposit, duration, damage policy) are between the owner and the renter.</li>
          <li>Bike Bechoo only acts as a listing platform and does not provide rental services directly.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>6. Payment & Fees</h2>
        <ul>
          <li>Certain premium services or listing promotions may be chargeable.</li>
          <li>All payments made for such services are non-refundable, regardless of listing performance or user satisfaction.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>7. Non-Refundable Policy</h2>
        <ul>
          <li>All payments made to Bike Bechoo, including listing fees, promotional boosts, or featured ads, are strictly non-refundable.</li>
          <li>Once a transaction is processed, it cannot be reversed or claimed for a refund.</li>
          <li>Users are advised to review their selected service carefully before confirming payment.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>8. Prohibited Use</h2>
        <ul>
          <li>Users may not use the platform for fraudulent, illegal, or abusive activity.</li>
          <li>Any violation may result in account suspension or legal action.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>9. Limitation of Liability</h2>
        <p>
          Bike Bechoo is not liable for any loss, damage, or legal claims arising from interactions between users or third-party listings.
        </p>
      </div>

      <div className="terms-section">
        <h2>10. Modifications</h2>
        <p>
          We reserve the right to update or modify these terms at any time. Continued use of the site constitutes your acceptance of the new terms.
        </p>
      </div>

      <p className="terms-note">
        If you do not agree with these terms, please do not use our platform.
      </p>

      <p className="terms-contact">
        For support, contact us at: <strong>enquirybikebechoo@gmail.com</strong>
      </p>
    </div>
  );
};

export default TermsAndConditions;
