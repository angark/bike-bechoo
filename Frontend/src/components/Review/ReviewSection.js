// src/components/Review/ReviewSection.js
import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewCarousel from "./ReviewCarousel";
import "./Review.css";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  const addReview = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="review-section">
      <h2>User Reviews</h2>
      <ReviewForm onSubmit={addReview} />
      <ReviewCarousel reviews={reviews} />
    </div>
  );
};

export default ReviewSection;
