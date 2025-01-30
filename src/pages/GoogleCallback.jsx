import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      handleGoogleCallback(code);
    }
  }, []);

  const handleGoogleCallback = async (code) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/auth/callback?code=${code}`
      );
      if (response.data.status) {
        // Redirect to the dashboard after successful login
        navigate("/dashboard");
      } else {
        console.error("Login failed", response.data.message);
      }
    } catch (error) {
      console.error("Error during callback:", error);
    }
  };

  return <div>Loading...</div>;
};

export default GoogleCallback;
