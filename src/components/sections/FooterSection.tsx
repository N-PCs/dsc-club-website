import React from "react";
import { Link } from "@tanstack/react-router";
import "./FooterSection.css";

export const FooterSection: React.FC = () => {
  return (
    <footer className="medtech-footer">
      {/* DESKTOP FOOTER (Shown on desktop & tablet screens) */}
      <div className="footer-desktop-view">
        <div className="footer-main">
          {/* Left Column: Logos, Socials & Contact */}
          <div className="footer-left">
            <div className="center-logos-container">
              <img src="/DSClogo.png" alt="DSC Club Logo" className="footer-brand-logo" />
              <div className="footer-logo-divider" />
              <img src="/Collegelogo.png" alt="VIT Bhopal College Logo" className="footer-college-logo" />
            </div>

            <div className="footer-socials">
              <a href="https://github.com/cdsvitbhopal" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub">
                <i className="fa-brands fa-github" />
              </a>
              <a href="https://www.linkedin.com/company/dsc-vitb/?originalSubdomain=in" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in" />
              </a>
              <a href="https://x.com/DSC_VITB" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter">
                <i className="fa-brands fa-x-twitter" />
              </a>
              <a href="https://www.instagram.com/dsc_vitb/" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
                <i className="fa-brands fa-instagram" />
              </a>
            </div>

            <div className="contact-details">
              <a href="mailto:dsc@vitbhopal.ac.in" className="contact-email">
                dsc@vitbhopal.ac.in
              </a>
              <address className="contact-address">
                VIT Bhopal University, Bhopal-Indore Highway,
                <br />
                Kothri Kalan, Sehore, MP - 466114
              </address>
            </div>
          </div>

          {/* Right Column: Navigation Links */}
          <div className="footer-right">
            <h4 className="nav-col-title">Navigation</h4>
            <ul className="nav-col-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="/#about">About Us</a>
              </li>
              <li>
                <a href="/#domains">Domains</a>
              </li>
              <li>
                <a href="/#events">Events</a>
              </li>
              <li>
                <Link to="/members">Members</Link>
              </li>
              <li>
                <Link to="/join">Join Core Team</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Bottom Bar */}
        <div className="footer-bottom-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="bottom-copy">© 2026 Data Science Club VIT Bhopal. All Rights Reserved</span>
          <Link to="/admin" className="admin-access-link" style={{ fontSize: "11.5px", color: "rgba(255, 255, 255, 0.45)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", transition: "color 0.2s ease" }}>
            <span style={{ fontSize: "10px" }}>🛡️</span> Admin Access
          </Link>
        </div>

        {/* Desktop Giant White Watermark */}
        <div className="giant-watermark" aria-hidden="true">
          DSC VITB
        </div>
      </div>

      {/* MOBILE FOOTER (Dedicated UI for mobile screens) */}
      <div className="footer-mobile-view">
        <div className="mobile-footer-card">
          {/* Brand Header */}
          <div className="mobile-logos-capsule">
            <img src="/DSClogo.png" alt="DSC Club Logo" className="mobile-brand-logo" />
            <div className="mobile-logo-divider" />
            <img src="/Collegelogo.png" alt="VIT Bhopal College Logo" className="mobile-college-logo" />
          </div>

          {/* Contact Details */}
          <div className="mobile-contact-section">
            <a href="mailto:dsc@vitbhopal.ac.in" className="mobile-email">
              dsc@vitbhopal.ac.in
            </a>
            <p className="mobile-address">
              VIT Bhopal University, Kothri Kalan, Sehore, MP
            </p>
          </div>

          {/* Navigation Chips */}
          <div className="mobile-nav-grid">
            <Link to="/" className="mobile-nav-chip">Home</Link>
            <a href="/#about" className="mobile-nav-chip">About</a>
            <a href="/#domains" className="mobile-nav-chip">Domains</a>
            <a href="/#events" className="mobile-nav-chip">Events</a>
            <Link to="/members" className="mobile-nav-chip">Members</Link>
            <Link to="/join" className="mobile-nav-chip highlighted">Join Core Team</Link>
            <Link to="/admin" className="mobile-nav-chip" style={{ borderColor: "rgba(0, 210, 255, 0.3)", color: "#00d2ff" }}>🛡️ Admin Access</Link>
          </div>

          {/* Social Links Row */}
          <div className="mobile-socials-row">
            <a href="https://github.com/cdsvitbhopal" target="_blank" rel="noreferrer" className="mobile-social-btn" aria-label="GitHub">
              <i className="fa-brands fa-github" />
            </a>
            <a href="https://www.linkedin.com/company/dsc-vitb/?originalSubdomain=in" target="_blank" rel="noreferrer" className="mobile-social-btn" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a href="https://x.com/DSC_VITB" target="_blank" rel="noreferrer" className="mobile-social-btn" aria-label="Twitter">
              <i className="fa-brands fa-x-twitter" />
            </a>
            <a href="https://www.instagram.com/dsc_vitb/" target="_blank" rel="noreferrer" className="mobile-social-btn" aria-label="Instagram">
              <i className="fa-brands fa-instagram" />
            </a>
          </div>

          {/* Copyright & Mobile Background Watermark */}
          <div className="mobile-bottom-copy">
            © 2026 Data Science Club VIT Bhopal. All Rights Reserved
          </div>

          <div className="mobile-watermark" aria-hidden="true">
            DSC VITB
          </div>
        </div>
      </div>
    </footer>
  );
};
