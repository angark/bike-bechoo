// src/components/Review/ReviewForm.js
import React, { useState } from "react";

const ReviewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    content: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.title || !formData.content) return;

  try {
    const res = await fetch("https://bike-bechoo-6.onrender.com/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      onSubmit(data); // send new review back to parent
      setFormData({ name: "", title: "", content: "" });
    }
  } catch (err) {
    console.error("Error posting review:", err);
  }
};


  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        placeholder="Review Title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="Write your review..."
        value={formData.content}
        onChange={handleChange}
      />
      <button type="submit">Post Review</button>
    </form>
  );
};

export default ReviewForm;
