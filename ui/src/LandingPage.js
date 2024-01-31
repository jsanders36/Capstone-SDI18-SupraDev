
import React from "react";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="logo-container">
        <h1 className="supra-dev">SupraDev</h1>
        <h2 className="subtitle">
          Transform Your Ideas into Digital Realities
        </h2>
      </div>
      <div className="button-container">
        <button className="enter-button" onClick={() => navigate("/about")}>
          <InfoIcon /> About
        </button>
        <button className="enter-button" onClick={() => navigate("/login")}>
          <LoginIcon /> Login
        </button>
        <button className="enter-button" onClick={() => navigate("/register")}>
          <AppRegistrationIcon /> Register
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
