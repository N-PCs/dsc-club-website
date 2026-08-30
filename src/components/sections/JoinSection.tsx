import React, { useState } from "react";

export const JoinSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    regNo: "",
    domain: "",
    portfolio: "",
    reason: "",
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setFormData({
      fullName: "",
      email: "",
      regNo: "",
      domain: "",
      portfolio: "",
      reason: "",
    });
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <section id="join" className="content-section">
      <div className="section-container max-width-md">
        <div className="section-header text-center">
          <span className="section-eyebrow">APPLICATION FORM</span>
          <h2 className="section-title">
            Join The <span className="gradient-text">Core Cohort</span>
          </h2>
          <p className="section-subtitle">
            Ready to build models, organize hackathons, and ship projects? Fill in
            your details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="join-form-card glass-card margin-top-lg">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="e.g. Aarav Sharma"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">VIT Bhopal Email ID</label>
              <input
                type="email"
                id="email"
                placeholder="e.g. aarav.2026@vitbhopal.ac.in"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="regNo">Registration / Roll No.</label>
              <input
                type="text"
                id="regNo"
                placeholder="e.g. 23BCE1024"
                value={formData.regNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="domain">Preferred Sub-Domain</label>
              <select
                id="domain"
                value={formData.domain}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a domain
                </option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Engineering">Data Engineering</option>
                <option value="Interactive Dev">Interactive Dev</option>
                <option value="Analytics Depth">Analytics Depth</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="portfolio">GitHub / Portfolio URL</label>
              <input
                type="url"
                id="portfolio"
                placeholder="https://github.com/yourusername"
                value={formData.portfolio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="reason">Why do you want to join DSC Club VITB?</label>
              <textarea
                id="reason"
                rows={4}
                placeholder="Tell us about your projects, experience, or interest in Data Science..."
                value={formData.reason}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <button type="submit" className="cta-btn primary-btn full-width margin-top-md">
            Submit Application <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div id="toast" className="toast">
          <i className="fa-solid fa-circle-check"></i> Application Submitted
          Successfully! We will contact you soon.
        </div>
      )}
    </section>
  );
};
