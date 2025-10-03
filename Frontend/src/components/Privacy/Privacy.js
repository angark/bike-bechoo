import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Privacy.css"; // ✅ Reuse same CSS styles

const PrivacyPolicy = () => {
  const sectionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#privacySection" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="terms-container" id="privacySection" ref={sectionRef}>
      <h1 className="terms-title">PRIVACY POLICY – BIKE BECHOO™</h1>

      <div className="terms-section">
        <h2>1. What Do We Do With Your Information?</h2>
        <p>
          When you create an account, post a listing, or purchase/rent a
          motorbike through Bike Bechoo™, we collect personal information such
          as your name, phone number, address, email address, and payment
          details (where applicable).
        </p>
        <p>
          When you browse our website, we automatically receive your device’s
          Internet Protocol (IP) address and browser details to help us improve
          our services and user experience..
        </p>
        <p>
          With your permission, we may also send you promotional emails about
          new listings, offers, safety tips, or updates related to Bike Bechoo™.
        </p>
      </div>

      <div className="terms-section">
        <h2>2. Consent</h2>
        <p>
          How do you give consent? By providing your personal information to
          post a listing, make a purchase, rent a bike, or complete a
          transaction, you consent to our collecting and using it for that
          purpose only.
        </p>
        <p>
          If we require your information for additional purposes such as
          marketing, we will ask for your explicit consent or provide you with
          an option to decline.
        </p>
        <p>
          <strong>How do I withdraw my consent?</strong> f you change your mind,
          you may withdraw your consent at any time by contacting us at 📩 Email
          us at{" "}
          <a
            href="mailto:Bikebechooindia@gmail.com@gmail.com"
            style={{ color: "#0595fcff", textDecoration: "underline" }}
          >
            Bikebechooindia@gmail.com
          </a>
        </p>
      </div>

      <div className="terms-section">
        <h2>3. Disclosure</h2>
        <p>
          We may disclose your personal information if we are required by law to
          do so or if you violate our Terms of Service.
        </p>
      </div>

      <div className="terms-section">
        <h2>4. Payment</h2>
        <p>
          Payments on Bike Bechoo™ are processed securely via Razorpay. Neither
          we nor Razorpay store your card details on our servers.
        </p>
        <p>
          All payment data is encrypted through the Payment Card Industry Data
          Security Standard (PCI-DSS) during the transaction.
        </p>
        <p>
          Your purchase or rental details are retained only until the
          transaction is complete.
        </p>
        <p>
          For more insight, you may also want to read terms and conditions of
          Razorpay on{" "}
          <a
            href="https://razorpay.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://razorpay.com
          </a>
        </p>
      </div>

      <div className="terms-section">
        <h2>5. Third-Party Services</h2>
        <p>
          Our service may include integrations with third-party providers such
          as payment gateways, SMS/email service providers, or verification
          partners.
        </p>
        <p>
          These providers will collect and use information necessary for them to
          perform their services.
        </p>
        <p>
          Please note that third-party providers may have their own privacy
          policies, and your data may be subject to the laws of the
          jurisdictions in which they operate. When you leave Bike Bechoo™, or
          are redirected to a third-party application/website, you are no longer
          covered by our Privacy Policy or Terms of Service.
        </p>
        <p>
          Once you leave our website or are redirected to a third-party
          application, you are no longer governed by this Privacy Policy or our
          Terms of Service.
        </p>
      </div>

      <div className="terms-section">
        <h2>6. Security</h2>
        <p>
          We take reasonable precautions and follow industry standards to ensure
          your personal information is not misused, accessed, disclosed,
          altered, or destroyed.
        </p>
      </div>

      <div className="terms-section">
        <h2>7. Cookies</h2>
        <p>
          We use cookies to maintain session of your user. It is not used to
          personally identify you on other websites.
        </p>
      </div>

      <div className="terms-section">
        <h2>8. Age of Consent</h2>
        <p>
          By using Bike Bechoo™, you confirm that you are at least 18 years old,
          or that you have provided consent for any of your minor dependents to
          use this website under your responsibility.
        </p>
      </div>

      <div className="terms-section">
        <h2>9. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy at any time. Updates will be posted
          on this page, and significant changes will be notified to you.
        </p>
        <p>
          If Bike Bechoo™ is acquired, merged, or transferred, your information
          may be transferred to the new owners to continue providing our
          services.
        </p>
      </div>

      <div className="terms-section">
        <h2>10. Questions and Contact Information</h2>
        <p>
          For access, correction, or deletion of your personal data, or to
          register a complaint, please contact our Privacy Compliance Officer
          at: 📩 Email us at{" "}
          <a
            href="mailto:Bikebechooindia@gmail.com@gmail.com"
            style={{ color: "#0595fcff", textDecoration: "underline" }}
          >
            Bikebechooindia@gmail.com
          </a>
          <p>Bike Bechoo™ – Buy, Sell & Rent Motorbikes Across India
            </p>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
