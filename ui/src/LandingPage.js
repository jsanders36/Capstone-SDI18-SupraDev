import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <div className="logo-container">
                <h1 className="supra-dev">Supra Dev</h1>
                <h2 className="subtitle">Transform Your Ideas into Digital Realities</h2>
            </div>
            <button className="enter-button" onClick={() => navigate('/home')}>
                Enter
            </button>
        </div>
    );
};

export default LandingPage;
