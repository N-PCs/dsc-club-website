import React, { useState, useEffect } from "react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "domains", "events", "team", "join"];
      const scrollY = window.pageYOffset + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <a href="#hero" className="brand-group" aria-label="DSC Club VITB Home">
            <img src="/assets/DSClogo.png" alt="DSC Logo" className="brand-logo" style={{ width: "40px", height: "40px" }} />
            <div className="brand-text">
              <span className="brand-title">DSC CLUB</span>
              <span className="brand-subtitle">VIT BHOPAL</span>
            </div>
          </a>

          {/* Desktop Nav Pill */}
          <nav className="nav-pill" aria-label="Main Navigation">
            <a
              href="#hero"
              className={`nav-link ${activeNav === "hero" ? "active" : ""}`}
            >
              Home
            </a>
            <a
              href="#about"
              className={`nav-link ${activeNav === "about" ? "active" : ""}`}
            >
              About
            </a>
            <a
              href="#domains"
              className={`nav-link ${activeNav === "domains" ? "active" : ""}`}
            >
              Domains
            </a>
            <a
              href="#events"
              className={`nav-link ${activeNav === "events" ? "active" : ""}`}
            >
              Events
            </a>
            <a
              href="#team"
              className={`nav-link ${activeNav === "team" ? "active" : ""}`}
            >
              Team
            </a>
            <a
              href="#join"
              className={`nav-link ${activeNav === "join" ? "active" : ""}`}
            >
              Join Us
            </a>
          </nav>

          {/* Sign In / Join CTA */}
          <a href="#join" className="sign-in-btn">
            Join Core
          </a>

          {/* Mobile Burger Button */}
          <button
            className="burger-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Sheet Overlay */}
      <div
        id="mobile-overlay"
        className={`mobile-overlay ${isOpen ? "active" : ""}`}
        hidden={!isOpen}
        onClick={closeMenu}
      >
        <div className="mobile-menu-sheet" onClick={(e) => e.stopPropagation()}>
          <nav className="mobile-nav">
            <a
              href="#hero"
              className={`mobile-link ${activeNav === "hero" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </a>
            <a
              href="#about"
              className={`mobile-link ${activeNav === "about" ? "active" : ""}`}
              onClick={closeMenu}
            >
              About
            </a>
            <a
              href="#domains"
              className={`mobile-link ${activeNav === "domains" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Domains
            </a>
            <a
              href="#events"
              className={`mobile-link ${activeNav === "events" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Events
            </a>
            <a
              href="#team"
              className={`mobile-link ${activeNav === "team" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Team
            </a>
            <a
              href="#join"
              className={`mobile-link ${activeNav === "join" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Join Us
            </a>
          </nav>
          <a href="#join" className="mobile-sign-in" onClick={closeMenu}>
            Join Core Team
          </a>
        </div>
      </div>
    </>
  );
};
