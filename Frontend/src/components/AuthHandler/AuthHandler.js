// AuthHandler.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the logged-in user from the backend session
    fetch("https://www.bikebechoo.com/api/me", {
      method: "GET",
      credentials: "include" // important to send cookies for session
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((user) => {
        // Save user info in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/buy"); // redirect to your homepage or dashboard
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        navigate("/buy"); // fallback if not logged in
      });
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default AuthHandler;
