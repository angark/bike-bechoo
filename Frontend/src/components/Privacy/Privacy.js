
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
      <h1 className="terms-title">Privacy Policy</h1>

      <div className="terms-section">
        <h2>1. What Do We Do With Your Information?</h2>
        <p>
          When you purchase something from our store, as part of the buying and
          selling process, we collect the personal information you give us such
          as your name, address and email address.
        </p>
        <p>
          When you browse our store, we also automatically receive your
          computer’s internet protocol (IP) address in order to provide us with
          information that helps us learn about your browser and operating
          system.
        </p>
        <p>
          Email marketing (if applicable): With your permission, we may send you
          emails about our store, new products and other updates.
        </p>
      </div>

      <div className="terms-section">
        <h2>2. Consent</h2>
        <p>
          When you provide us with personal information to complete a
          transaction, verify your credit card, place an order, arrange for a
          delivery or return a purchase, we imply that you consent to our
          collecting it and using it for that specific reason only.
        </p>
        <p>
          If we ask for your personal information for a secondary reason, like
          marketing, we will either ask you directly for your expressed consent,
          or provide you with an opportunity to say no.
        </p>
        <p>
          <strong>How do I withdraw my consent?</strong> If after you opt-in,
          you change your mind, you may withdraw your consent for us to contact
          you, for the continued collection, use or disclosure of your
          information, at anytime, by contacting us at{" "}
          📩 Email us at{" "}
        <a href="mailto:Bikebechooindia@gmail.com@gmail.com" style={{ color: "#0595fcff", textDecoration: "underline" }}>
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
          We use Razorpay for processing payments. We/Razorpay do not store your
          card data on their servers. The data is encrypted through the Payment
          Card Industry Data Security Standard (PCI-DSS) when processing
          payment. Your purchase transaction data is only used as long as is
          necessary to complete your purchase transaction. After that is
          complete, your purchase transaction information is not saved.
        </p>
        <p>
          Our payment gateway adheres to the standards set by PCI-DSS as managed
          by the PCI Security Standards Council, which is a joint effort of
          brands like Visa, MasterCard, American Express and Discover.
        </p>
        <p>
          PCI-DSS requirements help ensure the secure handling of credit card
          information by our store and its service providers.
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
          In general, the third-party providers used by us will only collect,
          use and disclose your information to the extent necessary to allow
          them to perform the services they provide to us.
        </p>
        <p>
          However, certain third-party service providers, such as payment
          gateways and other payment transaction processors, have their own
          privacy policies in respect to the information we are required to
          provide to them for your purchase-related transactions.
        </p>
        <p>
          For these providers, we recommend that you read their privacy policies
          so you can understand the manner in which your personal information
          will be handled by these providers.
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
          To protect your personal information, we take reasonable precautions
          and follow industry best practices to make sure it is not
          inappropriately lost, misused, accessed, disclosed, altered or
          destroyed.
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
          By using this site, you represent that you are at least the age of
          majority in your state or province of residence, or that you are the
          age of majority in your state or province of residence and you have
          given us your consent to allow any of your minor dependents to use
          this site.
        </p>
      </div>

      <div className="terms-section">
        <h2>9. Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to modify this privacy policy at any time, so
          please review it frequently. Changes and clarifications will take
          effect immediately upon their posting on the website. If we make
          material changes to this policy, we will notify you here that it has
          been updated.
        </p>
        <p>
          If our store is acquired or merged with another company, your
          information may be transferred to the new owners so that we may
          continue to sell products to you.
        </p>
      </div>

      <div className="terms-section">
        <h2>10. Questions and Contact Information</h2>
        <p>
          If you would like to access, correct, amend or delete any personal
          information we have about you, register a complaint, or simply want
          more information contact our Privacy Compliance Officer at{" "}
          📩 Email us at{" "}
        <a href="mailto:Bikebechooindia@gmail.com@gmail.com" style={{ color: "#0595fcff", textDecoration: "underline" }}>
          Bikebechooindia@gmail.com
        </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


