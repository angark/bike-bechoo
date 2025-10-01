import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./RentPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RentPage = ({ filters }) => {
  const [rentPosts, setRentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBike, setPendingBike] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("user")); // ✅ match AuthHandler
  const isLoggedIn = !!userInfo;

  // Tracks unlocked contacts per bike
  const [unlockedContacts, setUnlockedContacts] = useState({});

  // Tracks contacts unlocked in the current payment batch
  const [currentBatch, setCurrentBatch] = useState([]);
  const BATCH_LIMIT = 3; // max contacts per payment
  const cardsPerPage = 9;

  // Fetch posts
  useEffect(() => {
    const fetchRentPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/post/rent`
        );
        const data = await res.json();
        const filteredPosts = data
          .filter((post) => post.postType === "Rent")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRentPosts(filteredPosts);
      } catch (err) {
        console.error("Error fetching rent posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRentPosts();
  }, []);

  // Filter posts
  const filteredRentPosts = rentPosts.filter((post) => {
    const pricePerDay =
      parseInt((post.pricePerDay || "0").toString().replace(/,/g, ""), 10) || 0;
    const pricePerWeek =
      parseInt((post.pricePerWeek || "0").toString().replace(/,/g, ""), 10) ||
      0;
    return (
      (!filters.location ||
        post.state?.toLowerCase().includes(filters.location.toLowerCase()) ||
        post.area?.toLowerCase().includes(filters.location.toLowerCase()) ||
        post.city?.toLowerCase().includes(filters.location.toLowerCase()) ||
        String(post.pincode || "").includes(filters.location)) &&
      (!filters.brand ||
        post.brand?.toLowerCase().includes(filters.brand.toLowerCase())) &&
      (!filters.pricePerDay ||
        (pricePerDay >= parseInt(filters.pricePerDay) - 500 &&
          pricePerDay <= parseInt(filters.pricePerDay) + 500)) &&
      (!filters.pricePerWeek ||
        (pricePerWeek >= parseInt(filters.pricePerWeek) - 1500 &&
          pricePerWeek <= parseInt(filters.pricePerWeek) + 1500)) &&
      (!filters.fueltype ||
        post.fueltype?.toLowerCase() === filters.fueltype.toLowerCase())
    );
  });

  // Pagination
  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const currentPosts = filteredRentPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const totalPages = Math.ceil(filteredRentPosts.length / cardsPerPage);

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const maxPageNumbers = 3;
  const getPageNumbers = () => {
    let startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
    let endPage = startPage + maxPageNumbers - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPageNumbers + 1, 1);
    }
    const pages = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  const getImageUrl = (img) => {
    if (img && img.startsWith("http")) return img;
    return `${process.env.REACT_APP_API_URL}/${img}`;
  };

  const toggleExpand = (id) =>
    setExpandedPostId(expandedPostId === id ? null : id);

  // Slider arrows
  const NextArrow = (props) => (
    <div
      {...props}
      style={{ ...props.style, display: "block", right: 10, zIndex: 1 }}
    />
  );
  const PrevArrow = (props) => (
    <div
      {...props}
      style={{ ...props.style, display: "block", left: 10, zIndex: 1 }}
    />
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Razorpay helper
  const openRazorpay = async () => {
    try {
      const orderRes = await fetch(
        `${process.env.REACT_APP_API_URL}/api/payment/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 59 }),
        }
      );
      const orderData = await orderRes.json();

      return new Promise((resolve) => {
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: "INR",
          name: "BikeBechoo",
          description: "Contact Unlock Payment",
          order_id: orderData.id,
          handler: async (response) => {
            const verifyRes = await fetch(
              `${process.env.REACT_APP_API_URL}/api/payment/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              }
            );
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              resolve(true);
            } else {
              alert("Payment verification failed!");
              resolve(false);
            }
          },
          theme: { color: "#3399cc" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      });
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Handle contact click
  const handleContactClick = async (bike) => {
    const bikeId = bike._id;
    const contactNumber = bike.contactMobile;

    // Already unlocked
    if (unlockedContacts[bikeId]?.includes(contactNumber)) return;

    // If current batch is full → show modal
    if (currentBatch.length >= BATCH_LIMIT) {
      setPendingBike(bike);
      setShowPaymentModal(true);
      return;
    }

    // ✅ For first unlock, show modal instead of calling Razorpay directly
    if (currentBatch.length === 0) {
      setPendingBike(bike);
      setShowPaymentModal(true);
      return;
    }

    // Otherwise, user has already paid → unlock without Razorpay
    setCurrentBatch((prev) => [...prev, contactNumber]);
    setUnlockedContacts((prev) => ({
      ...prev,
      [bikeId]: [...(prev[bikeId] || []), contactNumber],
    }));
  };

  const handlePaymentContinue = async () => {
    setShowPaymentModal(false);
    if (!pendingBike) return;

    const paid = await openRazorpay(); // ✅ Razorpay only opens after Continue
    if (!paid) return;

    // Start new batch
    setCurrentBatch([pendingBike.contactMobile]);
    setUnlockedContacts((prev) => ({
      ...prev,
      [pendingBike._id]: [
        ...(prev[pendingBike._id] || []),
        pendingBike.contactMobile,
      ],
    }));

    setPendingBike(null);
  };
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="rent-page">
      <h2 className="rent-heading">Your Ride Starts Here</h2>
      <div className="scroll-container">
        <span className="rent-subheading">
          Rent bikes easily, safely, and at the best value — all in one place.
        </span>
      </div>

      {loading ? (
        <p>Loading bikes...</p>
      ) : currentPosts.length === 0 ? (
        <p>No bikes found matching your filters.</p>
      ) : (
        <>
          {currentPosts.map((bike) => {
            const isExpanded = expandedPostId === bike._id;
            const isUnlocked = unlockedContacts[bike._id]?.length > 0;

            return (
              <div
                key={bike._id}
                className={`rent-card ${isExpanded ? "expanded" : ""}`}
              >
                <div
                  onClick={() => toggleExpand(bike._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="rent-image-section">
                    <div className="post-id-badge">{bike.postId}</div>
                    <Slider {...sliderSettings}>
                      {bike.bikeImages?.map((img, idx) => (
                        <div key={idx}>
                          <img
                            src={getImageUrl(img)}
                            alt={`Bike ${idx + 1}`}
                            className="bike-image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/300x200";
                            }}
                          />
                        </div>
                      ))}
                    </Slider>
                    <span className="badgerent">RENT</span>
                  </div>

                  <div className="bike-info">
                    <h3 className="bike-title">
                      {bike.brand} {bike.model}
                    </h3>
                    <p className="bike-location">
                      {bike.area}, {bike.state}
                    </p>
                    <div className="bike-meta">
                      <p>
                        <strong>Year:</strong> {bike.year}
                      </p>
                      <p>
                        <strong>Price/Day:</strong> ₹
                        {parseInt(bike.pricePerDay).toLocaleString("en-IN")}
                      </p>
                      <p>
                        <strong>Price/Week:</strong> ₹
                        {parseInt(bike.pricePerWeek).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <p className="bike-description">
                      <strong>Ownership:</strong> {bike.ownership}
                    </p>
                    <p>
                      <strong>Posted on:</strong>{" "}
                      {new Date(bike.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="expanded-section">
                    <p>
                      <strong>Fuel Type:</strong> {bike.fueltype}
                    </p>
                    <p>
                      <strong>Kilometers Driven:</strong> {bike.kilometerdriven}
                    </p>
                    <p>
                      <strong>Engine Capacity:</strong> {bike.enginecpacity}
                    </p>
                    <p>
                      <strong>Description:</strong> {bike.anymodification}
                    </p>
                     <p>
                        <strong>RC Number:</strong> {bike.rcNumber}
                      </p>
                    <p>
                      <strong>Insurance:</strong> {bike.insurancestatus}
                    </p>
                    <p>
                      <strong>Contact Name:</strong> {bike.contactName}
                    </p>

                    {isUnlocked ? (
                      <p>
                        <strong>
                          Contact number
                          {unlockedContacts[bike._id].length > 1 ? "s" : ""}:
                        </strong>{" "}
                        {unlockedContacts[bike._id].join(", ")}
                      </p>
                    ) : isLoggedIn ? (
                      <button
                        className="contact-btn"
                        onClick={() => handleContactClick(bike)}
                      >
                        View Contact
                      </button>
                    ) : (
                      <a href="https://bike-bechoo-6.onrender.com/auth/google">
                        <button className="contact-btn login-button">
                          Login to view contact
                        </button>
                      </a>
                    )}
                  </div>
                )}
                {/* Payment Modal */}
                {/* Payment Modal */}
                {showPaymentModal && (
                  <div className="modal-overlay">
                    <div className="modal-box">
                      <h3>
                        {currentBatch.length === 0
                          ? "Unlock Contacts"
                          : "Unlock More Contacts"}
                      </h3>
                      <p>
                        {currentBatch.length === 0
                          ? "Pay ₹59 to unlock 3 contacts."
                          : "You have already seen 3 contacts. Pay ₹59 to unlock 3 more."}
                      </p>
                      <div className="modal-actions">
                        <button
                          className="cancel-btn"
                          onClick={() => setShowPaymentModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="pay-btn"
                          onClick={handlePaymentContinue}
                        >
                          Continue & Pay
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={page === currentPage ? "active" : ""}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RentPage;
