// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import "./navbar.css";
import logo from "../../assets/Untitled design (3)_formphotoeditor.com.jpeg";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import MyActivity from "../MyActivity/MyActivity";

function setCookie(name, value, days, domain) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = ";expires=" + date.toUTCString();
  }
  const domainPart = domain ? `;domain=${domain}` : "";
  document.cookie = `${name}=${value || ""}${expires};path=/${domainPart}`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function removeCookie(name, domain) {
  const domainPart = domain ? `;domain=${domain}` : "";
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${domainPart}`;
}

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState("en");
  const observerRef = useRef(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Listen for login event from AuthHandler
    const handleLogin = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    window.addEventListener("userLoggedIn", handleLogin);

    return () => window.removeEventListener("userLoggedIn", handleLogin);
  }, []);

  // Language & Google Translate handling
  useEffect(() => {
    const cookie = getCookie("googtrans");
    if (cookie) {
      const parts = cookie.split("/");
      if (parts.length >= 3) setLang(parts[2] || "en");
    }

    const observer = new MutationObserver(() => {
      const select = document.querySelector(".goog-te-combo");
      if (select && select.value && select.value !== lang) {
        setLang(select.value || "en");
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    observerRef.current = observer;

    const t = setTimeout(() => {
      const select = document.querySelector(".goog-te-combo");
      if (select) setLang(select.value || (getCookie("googtrans")?.split("/")?.[2] ?? "en"));
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(t);
    };
  }, [lang]);

  const toggleLanguage = () => {
    const target = lang === "hi" ? "en" : "hi";
    changeLanguage(target);
  };

  const changeLanguage = (targetLang) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      try {
        select.value = targetLang;
        const event = new Event("change", { bubbles: true });
        select.dispatchEvent(event);
        setLang(targetLang);
        return;
      } catch (err) {
        console.warn("Could not programmatically change goog-te-combo:", err);
      }
    }

    const cookieValue = `/en/${targetLang}`;
    setCookie("googtrans", cookieValue, 365);
    try {
      const host = window.location.hostname;
      if (host && host !== "localhost" && host.indexOf(".") !== -1) {
        const parts = host.split(".");
        const domain = "." + parts.slice(-2).join(".");
        setCookie("googtrans", cookieValue, 365, domain);
      }
    } catch (e) {}
    setTimeout(() => window.location.reload(), 200);
  };

  const togglePopup = () => setShowPopup((p) => !p);
  const toggleMobileMenu = () => setShowMobileMenu((p) => !p);
  const toggleActivity = () => setShowActivity((p) => !p);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo-section">
          <img src={logo} alt="logo" className="logo" />
        </div>

        {/* Center Links */}
        <div className={`nav-linkss ${showMobileMenu ? "show" : ""}`}>
          <NavLink to="/buy" className="nav-links">Home</NavLink>
          <NavLink to="/about" className="nav-links">About</NavLink>
          <NavLink to="/contact" className="nav-links">Contact</NavLink>
          <NavLink to="/dealers" className="nav-links">Dealers</NavLink>
          <NavLink to="/accessories" className="nav-links">Accessories</NavLink>

          <div id="google_translate_element" style={{ display: "none" }} />
          <div className="language-switcher">
            <button onClick={toggleLanguage} className="lang-btn">
              🌐 {lang === "hi" ? "हिंदी" : "English"}
            </button>
          </div>
        </div>

        {/* Right Section */}
        <button
          className={`mobile-menu-btn ${showMobileMenu ? "rotate" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {showMobileMenu ? <X className="icon-fade" /> : <Menu className="icon-fade" />}
        </button>

        <button onClick={togglePopup} className="login-btn" aria-label="User menu">
          {user && user.image ? (
            <img src={user.image} alt="avatar" className="avatar-img" />
          ) : <div className="avatar">U</div>}
        </button>

        {showPopup && (
          <div className="login-popup">
            <div className="popup-header">
              {user?.image ? (
                <img src={user.image} alt="user" className="popup-avatar-img" />
              ) : <div className="popup-avatar">U</div>}
              <div className="popup-info">
                <div className="popup-name">{user?.name || "Guest"}</div>
                <div className="popup-email">{user?.email || "No Email"}</div>
              </div>
            </div>

            <div className="myactivity">
              <button className="nav-myactivity" onClick={toggleActivity}>MY ACTIVITY</button>
            </div>

            {user ? (
              <button className="popup-login-btn" onClick={handleLogout}>Logout</button>
            ) : (
              <button
                className="popup-login-btn"
                onClick={() => window.location.href = "https://bike-bechoo-6.onrender.com/auth/google"}
              >
                Login
              </button>
            )}

            {showActivity && (
              <div style={{ marginTop: 10, maxHeight: 300, overflowY: "auto" }}>
                <MyActivity />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
