// AuthHandler.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      const user = jwtDecode(token); // Decode token to get user details

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/buy"); // Redirect to homepage
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default AuthHandler;
