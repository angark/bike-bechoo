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
  // set cookie expired
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // If cookie already present, set initial lang
    const cookie = getCookie("googtrans");
    if (cookie) {
      // cookie format: /source/target
      const parts = cookie.split("/");
      if (parts.length >= 3) setLang(parts[2] || "en");
    }

    // MutationObserver to detect when Google injects the select
    const observer = new MutationObserver(() => {
      const select = document.querySelector(".goog-te-combo");
      if (select && select.value && select.value !== lang) {
        setLang(select.value || "en");
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    observerRef.current = observer;

    // also do a delayed check
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
    // 1) Try to change the injected select (fast, no reload)
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      try {
        select.value = targetLang;
        // dispatch events (some browsers need different events)
        const event = new Event("change", { bubbles: true });
        select.dispatchEvent(event);
        // older event fallback
        try {
          const ev = document.createEvent("HTMLEvents");
          ev.initEvent("change", true, false);
          select.dispatchEvent(ev);
        } catch (_) {}
        setLang(targetLang);
        return;
      } catch (err) {
        console.warn("Could not programmatically change goog-te-combo:", err);
      }
    }

    // 2) Fallback: set googtrans cookie and reload the page.
    // cookie value format: /SOURCE/TARGET (SOURCE usually en)
    try {
      const cookieValue = `/en/${targetLang}`;

      // set cookie for current hostname (path=/)
      setCookie("googtrans", cookieValue, 365);

      // also try to set a domain-level cookie (helps some deployments)
      try {
        const host = window.location.hostname;
        if (host && host !== "localhost" && host.indexOf(".") !== -1) {
          const parts = host.split(".");
          const domain = "." + parts.slice(-2).join(".");
          setCookie("googtrans", cookieValue, 365, domain);
        }
      } catch (e) {
        // ignore domain cookie errors
      }

      // small delay to ensure cookie is written
      setTimeout(() => {
        // reload so Google Translate picks up the cookie
        window.location.reload();
      }, 200);
    } catch (err) {
      console.error("Translation fallback failed:", err);
    }
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
        {/* logo */}
        <div className="logo-section">
          <img src={logo} alt="logo" className="logo" />
        </div>

        {/* center links */}
        {/* All Links (desktop visible, mobile dropdown via .show) */}
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


        {/* right section */}
        <button
  className={`mobile-menu-btn ${showMobileMenu ? "rotate" : ""}`}
  onClick={toggleMobileMenu}
  aria-label="Toggle menu"
>
  {showMobileMenu ? <X className="icon-fade" /> : <Menu className="icon-fade" />}
</button>


          <button onClick={togglePopup} className="login-btn" aria-label="User menu">
            {user && user.imageUrl ? (
              <img src={user.imageUrl} alt="avatar" className="avatar-img" />
            ) : <div className="avatar">U</div>}
          </button>

          {showPopup && (
            <div className="login-popup">
              <div className="popup-header">
                {user?.image ? <img src={user.image} alt="user" className="popup-avatar-img" /> : <div className="popup-avatar">U</div>}
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
                <NavLink to="http://localhost:8000/auth/google">
                  <button className="popup-login-btn">Login</button>
                </NavLink>
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
