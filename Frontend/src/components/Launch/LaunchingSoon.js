import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./launchingSoon.css";

const LaunchingSoon = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotify = (e) => {
    e.preventDefault();

    if (!formData.email) {
      alert("Please enter your email address");
      return;
    }

    setIsSending(true);

    emailjs
      .send(
        "service_x3oa71d",     // Replace with your actual EmailJS service ID
        "template_8cgy32n",    // Replace with your template ID
        {
          user_email: formData.email,
          user_message: formData.message,
        },
        "89ajXuXJa0ftF9m8N"      // Replace with your public key
      )
      .then(() => {
        alert("Thank you! We'll notify you soon.");
        setFormData({ email: "", message: "" });
      })
      .catch((error) => {
        console.error("Email error:", error);
        alert("Something went wrong. Please try again.");
      })
      .finally(() => setIsSending(false));
  };

  return (
    <div className="launch-container">
      <h1>🚧 BikeBechoo.com is Launching Soon!</h1>
      <p>We’re working hard to launch our awesome platform. Stay tuned!</p>

      <form onSubmit={handleNotify}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

<textarea
  name="message"
  placeholder="Enter your message"
  rows="4"
  value={formData.message}
  onChange={handleChange}
/>

        <button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Notify Me"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        📩 Email us at{" "}
        <a href="mailto:enquirybikebechoo@gmail.com" style={{ color: "#fff", textDecoration: "underline" }}>
          enquirybikebechoo@gmail.com
        </a>
      </p>
    </div>
  );
};

export default LaunchingSoon;
