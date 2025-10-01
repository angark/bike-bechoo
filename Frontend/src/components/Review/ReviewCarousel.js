// src/components/Review/ReviewCarousel.js
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const ReviewCarousel = () => {
  const carouselRef = useRef(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = 320; // adjust to card width
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <div className="carousel-wrapper">
      <button className="scroll-btn left" onClick={() => scroll("left")}>◀</button>
      <div className="carousel" ref={carouselRef}>
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <h3>{review.title}</h3>
              <p>{review.content}</p>
              <span>— {review.name}</span>
            </div>
          ))
        )}
      </div>
      <button className="scroll-btn right" onClick={() => scroll("right")}>▶</button>
    </div>
  );
};

export default ReviewCarousel;
