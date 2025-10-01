import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./BuyPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BuyPage = ({ filters }) => {
  const [sellPosts, setSellPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBike, setPendingBike] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("user")); // ✅ match AuthHandler
  const isLoggedIn = !!userInfo;

  // Inside your post card rendering
  // Tracks unlocked contacts per bike
  const [unlockedContacts, setUnlockedContacts] = useState({});

  // Tracks contacts unlocked in the current payment batch
  const [currentBatch, setCurrentBatch] = useState([]);
  const BATCH_LIMIT = 3; // max contacts per payment

  const cardsPerPage = 9;

  useEffect(() => {
    const fetchSellPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/post/getallposts`
        );
        const data = await res.json();

        const filteredPosts = data
          .filter((post) => post.postType === "Sell")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setSellPosts(filteredPosts);
      } catch (err) {
        console.error("Error fetching sell posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellPosts();

    // Listen for deletion events from MyActivity
    const handlePostDeleted = () => {
      fetchSellPosts();
    };

    window.addEventListener("postDeleted", handlePostDeleted);
    return () => {
      window.removeEventListener("postDeleted", handlePostDeleted);
    };
  }, []);

  const filteredSellPosts = sellPosts.filter((post) => {
    const price = Number(
      typeof post.price === "number"
        ? post.price
        : post.price?.replace(/,/g, "")
    );

    return (
      (!filters.location ||
        post.state?.toLowerCase().includes(filters.location.toLowerCase()) ||
        post.area?.toLowerCase().includes(filters.location.toLowerCase()) ||
        post.city?.toLowerCase().includes(filters.location.toLowerCase()) ||
        String(post.pincode || "").includes(filters.location)) &&
      (!filters.brand ||
        post.brand?.toLowerCase().includes(filters.brand.toLowerCase())) &&
      (!filters.ownership ||
        post.ownership?.toLowerCase() === filters.ownership.toLowerCase()) &&
      (!filters.year || String(post.year) === String(filters.year)) &&
      (!filters.budget ||
        (price >= parseInt(filters.budget) - 20000 &&
          price <= parseInt(filters.budget) + 20000)) &&
      (!filters.bikeType ||
        post.bikeType?.toLowerCase() === filters.bikeType.toLowerCase())
    );
  });

  // Pagination calculations
  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const currentPosts = filteredSellPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const totalPages = Math.ceil(filteredSellPosts.length / cardsPerPage);

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 700, behavior: "smooth" });
  };
  // How many page numbers to show at once
  const maxPageNumbers = 3;

  // Calculate which pages to show
  const getPageNumbers = () => {
    let startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
    let endPage = startPage + maxPageNumbers - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPageNumbers + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: 10, zIndex: 1 }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: 10, zIndex: 1 }}
        onClick={onClick}
      />
    );
  };

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

  const getImageUrl = (img) => {
    if (img && img.startsWith("http")) return img;
    return `${process.env.REACT_APP_API_URL}/${img}`;
  };

  const toggleExpand = (id) => {
    setExpandedPostId(expandedPostId === id ? null : id);
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

  // Load Razorpay script in useEffect
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="buy-page">
      <h2 className="buy-heading">"Your Ride Starts Here"</h2>
      <div className="scroll-container">
        <span className="buy-subheading">
          Buy bikes easily, safely, and at the best value — all in one place.
        </span>
      </div>

      {loading ? (
        <p>Loading bikes...</p>
      ) : currentPosts.length === 0 ? (
        <p>No bikes found matching your filters.</p>
      ) : (
        <>
          {currentPosts.map((post) => {
            const isExpanded = expandedPostId === post._id;
            const isUnlocked = unlockedContacts[post._id]?.length > 0;
            return (
              <div
                key={post._id}
                className={`bike-card ${isExpanded ? "expanded" : ""}`}
              >
                <div
                  onClick={() => toggleExpand(post._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="bike-image-section">
                    <Slider {...sliderSettings}>
                      {post.bikeImages?.map((img, idx) => (
                        <div key={idx}>
                          <img
                            src={getImageUrl(img)}
                            alt={`Bike image ${idx + 1}`}
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
                    <span className="badge">SELL</span>
                    <div className="post-id-badge">{post.postId}</div>
                  </div>
                  <div className="bike-info">
                    <h3 className="bike-title">
                      {post.brand} {post.model}
                    </h3>
                    <p className="bike-location">
                      {post.area}, {post.state}
                    </p>
                    <div className="bike-meta">
                      <p>
                        <strong>Year:</strong> {post.year}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹
                        {parseInt(post.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <p className="bike-description">
                      <strong>Ownership:</strong> {post.ownership}
                    </p>
                    <p>
                      <strong>Posted on:</strong>{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="expanded-section">
                    <div className="bike-details">
                      <p>
                        <strong>Fuel Type:</strong> {post.fueltype}
                      </p>
                      <p>
                        <strong>Kilometers Driven:</strong>{" "}
                        {post.kilometerdriven}
                      </p>
                      <p>
                        <strong>Engine Capacity:</strong> {post.enginecpacity}
                      </p>
                      <p>
                        <strong>Description:</strong> {post.anymodification}
                      </p>
                       <p>
                        <strong>RC Number:</strong> {post.rcNumber}
                      </p>
                      <p>
                        <strong>Insurance:</strong> {post.insurancestatus}
                      </p>
                      <p>
                        <strong>Contact Name:</strong> {post.contactName}
                      </p>
                     
                    </div>
                    {isUnlocked ? (
                      <p>
                        <strong>
                          Contact number
                          {unlockedContacts[post._id].length > 1 ? "s" : ""}:
                        </strong>{" "}
                        {unlockedContacts[post._id].join(", ")}
                      </p>
                    ) : isLoggedIn ? (
                      <button
                        className="contact-btn"
                        onClick={() => handleContactClick(post)}
                      >
                        View Contact
                      </button>
                    ) : (
                      <a href="http://localhost:8000/auth/google">
                        <button className="contact-btn login-button">
                          Login to view contact
                        </button>
                      </a>
                    )}
                  </div>
                )}
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

export default BuyPage;
