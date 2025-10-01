import React from "react";
import "./footer.css"; // Link to the CSS file
import footerlogo from "../../assets/Untitled design (3)_formphotoeditor.com.jpeg";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Info Section */}
        <div className="footer-section">
         <div className="logo-row">
  <img src={footerlogo} alt="footerlogo" className="footerlogo" />
  <h2 className="logo-text">BikeBechoo</h2>
</div>

          <p className="justify">
            India's fastest growing platform to buy, sell and rent bikes with
            complete peace of mind.
          </p>
          <div className="social-icons">
            <a href="https://www.facebook.com/share/1F7Asrv84B/">
              <Facebook size={25} />
            </a>
            <a href="https://x.com/bikebechoo?t=3agsZceLrTUoti7nABwglw&s=08">
              <Twitter size={25} />
            </a>
            <a href="https://www.instagram.com/bike_bechoo_official?utm_source=qr&igsh=MXMyc2E0ZmtsOHNqNg==">
              <Instagram size={25} />
            </a>
            <a href="https://www.linkedin.com/in/bikebechoo-social-541698387?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              <Linkedin size={25} />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div className="footer-section">
          <h3>Useful Links</h3>
          <ul>
            <li>
              <a href="/buy">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/Dealers">Dealers</a>
            </li>
            <li>
              <a href="/Accessories">Accessories</a>
            </li>
            <li>
              <a href="https://bike-bechoo-6.onrender.com/auth/google">Login</a>
            </li>
          </ul>
        </div>

        {/* Reach Us */}
        <div className="footer-section">
          <h3>Reach Us</h3>
          <p>Email: Bikebechooindia@gmail.com</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Other Information</h3>
          <ul>
            <li>
              <NavLink
                to="/Blog"
                className="text-sm text-gray-500 hover:text-red-500"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <HashLink smooth
                to="/whychoose#whySection"
                className="text-sm text-gray-500 hover:text-red-500"
              >
                why choose us
              </HashLink>
            </li>
             <li>
              <HashLink smooth
                to="/terms#termsSection"
                className="text-sm text-gray-500 hover:text-red-500"
              >
                Terms & Conditions
              </HashLink>
            </li>

            <li>
              <HashLink smooth 
                to="/howitworks#hiwSection"
                className="text-sm text-gray-500 hover:text-red-500"
              >
                How BikeBechoo Works
              </HashLink>
            </li>
             <li>
              <HashLink
  smooth
  to="/bikevaluation#valuationSection"
  className="text-sm text-gray-500 hover:text-red-500"
>
  Bike valuation
</HashLink>

            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        © 2025 Copyright: <strong>BikeBechoo</strong>
      </div>
    </footer>
  );
};

export default Footer;
