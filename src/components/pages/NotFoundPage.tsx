import React from "react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import "@/routes/NotFoundPage.css";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-wrapper">
      <Navbar />

      <main className="not-found-container">
        <div className="not-found-card">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-rose-400 font-bold">
              SYSTEM ERROR // 404
            </span>
          </div>

          {/* Glitch 404 Text */}
          <div className="glitch-code">404</div>

          <h1 className="not-found-title">
            ENDPOINT <span className="gradient-text">NOT FOUND</span>
          </h1>

          <p className="not-found-subtitle">
            The page or route telemetry vector you requested does not exist on the Data Science Club platform.
          </p>

          {/* Terminal Console */}
          <div className="terminal-box">
            <div className="terminal-header">
              <span>DSC_SYSTEM_LOG.ERR</span>
              <span>HTTP 404</span>
            </div>
            <div className="terminal-line">[ROUTE]: {typeof window !== "undefined" ? window.location.pathname : "/unknown"}</div>
            <div className="terminal-line terminal-error">[STATUS]: 0x404_NULL_REFERENCE</div>
            <div className="terminal-line">[ACTION]: Return to core platform index</div>
          </div>

          {/* Home Button with generous top margin spacing */}
          <div className="not-found-btn-wrap">
            <Link to="/" className="not-found-home-btn">
              <i className="fa-solid fa-house" /> Back To Home Platform
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default NotFoundPage;
