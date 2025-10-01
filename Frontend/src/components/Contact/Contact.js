import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .send(
        "service_yr7zgio",     // Replace with your EmailJS service ID
        "template_1zj15li",    // Replace with your EmailJS template ID
        formData,
        "89ajXuXJa0ftF9m8N"      // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("FAILED...", error);
          alert("Failed to send. Please try again.");
        }
      )
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <div className="contact-container">
      <h1>
        Love to hear from you,
        <br />
        <span>Get in touch ✉️</span>
      </h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-row">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="message"
          rows="6"
          placeholder="Write your enquiry "
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="send-btn" disabled={sending}>
          {sending ? "Sending..." : "Just Send →"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
