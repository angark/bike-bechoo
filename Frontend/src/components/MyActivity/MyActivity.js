import React, { useEffect, useState } from "react";
import axios from "axios";

const MyActivity = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);
useEffect(() => {
  window.dispatchEvent(new Event("hideHeader")); // hide header on mount
  return () => {
    window.dispatchEvent(new Event("showHeader")); // show header on unmount
  };
}, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/post/my-posts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]); // fallback to empty array
    }
  };

 const deletePost = async (postId) => {
  if (!window.confirm("Are you sure you want to delete this post?")) return;
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8000/api/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Refresh posts in MyActivity
    setPosts((prev) => prev.filter((post) => post._id !== postId));

    // Notify BuyPage and RentPage
    window.dispatchEvent(new Event("postDeleted"));
  } catch (err) {
    console.error("Error deleting post:", err);
  }
};


  return (
    <div style={{
      background: "#f8f6ff",
      padding: "10px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}>
      <h3 style={{
        marginBottom: "10px",
        color: "#6b4cff",
        fontSize: "16px",
        textAlign: "center"
      }}>
        My Activity
      </h3>

      <div style={{
        maxHeight: "200px",
        overflowY: "auto",
        border: "1px solid #e0d9ff",
        borderRadius: "8px"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px"
        }}>
          <thead>
            <tr style={{ background: "#a66bff", color: "#fff" }}>
                <th style={{ padding: "6px" }}>POST ID</th>
              <th style={{ padding: "6px" }}>Brand</th>
              <th style={{ padding: "6px" }}>Model</th>
              <th style={{ padding: "6px" }}>Year</th>
              <th style={{ padding: "6px" }}>Price</th>
              <th style={{ padding: "6px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map(post => (
                <tr key={post._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "6px", textAlign: "center" }}>{post.postId}</td>
                  <td style={{ padding: "6px", textAlign: "center" }}>{post.brand}</td>
                  <td style={{ padding: "6px", textAlign: "center" }}>{post.model}</td>
                  <td style={{ padding: "6px", textAlign: "center" }}>{post.year}</td>
                  <td style={{ padding: "6px", textAlign: "center" }}>
  {post.price || post.pricePerDay || "N/A"}
</td>

                  <td style={{ padding: "6px", textAlign: "center" }}>
                    <button
                      onClick={() => deletePost(post._id)}
                      style={{
                        background: "#ff4d4d",
                        color: "#fff",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "10px", color: "#888" }}>
                  No posts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyActivity;
