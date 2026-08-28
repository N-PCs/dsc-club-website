import React from "react";

export const FooterSection: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src="/assets/DSClogo.png" alt="DSC Logo" className="brand-logo" style={{ width: "40px", height: "40px" }} />
          <span className="logo-divider"></span>
          <img src="/assets/Collegelogo.png" alt="VIT Bhopal Logo" className="college-logo" style={{ width: "px", height: "40px" }} />
          <p className="footer-desc">
            Data Science Club of VIT Bhopal — Unlocking insights, driving innovation.
          </p>
        </div>

        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#domains">Domains</a>
          <a href="#events">Events</a>
          <a href="#team">Team</a>
          <a href="#join">Join</a>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Data Science Club VIT Bhopal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
