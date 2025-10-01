import React, { useState } from "react";
import "./VerticalStepper.css";

const Stepper = ({ step, setStep, validateStep}) => {
  const stepLabels = [
    "Basic Details",
    "RC Verification",
    "Location Info",
    "Bike Specs",
    "Contact Info",
    "Images & Submit",
  ];

  const userInfo = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!userInfo;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showStepWarning, setShowStepWarning] = useState(false); // 🔥 new modal state

  const handleStepClick = (index) => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // 🔒 not logged in → show login modal
      return;
    }

    if (index <= step) {
      // ✅ allow going back or reselecting current step
      setStep(index);
    } else {
      // 🔥 trying to jump forward
      if (validateStep(step)) {
        setStep(index);
      } else {
        setShowStepWarning(true); // 🚨 show modal instead of alert
      }
    }
  };

  const handleContinueLogin = () => {
    window.location.href = "https://bike-bechoo-6.onrender.com/auth/google"; // your login route
  };

  return (
    <>
      <div className="vertical-stepper-container">
        <div className="vertical-stepper">
          {stepLabels.map((label, index) => (
            <div
              key={index}
              className={`step-item ${step === index ? "active" : ""} ${
                index < step ? "completed" : ""
              }`}
              onClick={() => {
              if (index <= step) {
                setStep(index);
              }
            }}
            >
              <div className="step-circle">{index + 1}</div>
              <div className="step-text">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔐 Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Login Required</h3>
            <p>You must log in to continue posting your bike.</p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
              <button className="continue-btn" onClick={handleContinueLogin}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚨 Step Validation Modal */}
      {showStepWarning && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Incomplete Step</h3>
            <p>Please complete the current step before moving forward.</p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowStepWarning(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stepper;
