import React from "react";
import { Link } from "react-router-dom"; // Optional: use this if you're using react-router for navigation

const GetStartedPage = () => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "1rem",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
  };

  const headingStyle = {
    color: "#33BEE7",
    marginBottom: "1rem",
  };

  const paragraphStyle = {
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "2rem",
  };

  const buttonStyle = {
    backgroundColor: "#33BEE7",
    border: "none",
    color: "#fff",
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Welcome to ChatNow!</h1>
        <p style={paragraphStyle}>
          Get started by adding your first contact to your list. Connect, chat,
          and share moments with your friends and family using ChatNow.
        </p>
        {/* If using react-router */}
        <Link to="/add-contact" style={buttonStyle}>
          Add First Contact
        </Link>
        {/* Or, if not using react-router, you can use a regular anchor tag: */}
        {/* <a href="/add-contact" style={buttonStyle}>Add First Contact</a> */}
      </div>
    </div>
  );
};

export default GetStartedPage;
