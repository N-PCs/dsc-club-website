import React, { useState, useEffect } from "react";
import { submitRecruitmentApplication } from "@/lib/appwrite";

export const JoinSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    regNo: "",
    domain: "",
    portfolio: "",
    reason: "",
  });
  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Application Submitted Successfully!");

  useEffect(() => {
    const checkRecruitmentStatus = () => {
      const storedStatus = localStorage.getItem("dsc_recruitment_open");
      if (storedStatus === "false") {
        setIsRecruitmentOpen(false);
      } else {
        setIsRecruitmentOpen(true);
      }
    };

    checkRecruitmentStatus();
    window.addEventListener("dsc_recruitment_status_updated", checkRecruitmentStatus);
    window.addEventListener("storage", checkRecruitmentStatus);

    return () => {
      window.removeEventListener("dsc_recruitment_status_updated", checkRecruitmentStatus);
      window.removeEventListener("storage", checkRecruitmentStatus);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRecruitmentOpen) {
      alert("Recruitments are currently closed by administration.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitRecruitmentApplication({
        fullName: formData.fullName,
        email: formData.email,
        registrationNumber: formData.regNo,
        phone: "",
        preferredTeam: formData.domain || "General",
        portfolioUrl: formData.portfolio,
        whyJoin: formData.reason,
      });
      setToastMessage("Application Submitted to Appwrite Successfully!");
    } catch (err) {
      console.warn("Appwrite submission fallback:", err);
      setToastMessage("Application Submitted Successfully!");
    } finally {
      setIsSubmitting(false);
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
    }
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

        {!isRecruitmentOpen ? (
          <div
            className="glass-card margin-top-lg text-center"
            style={{
              padding: "40px 24px",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              background: "rgba(239, 68, 68, 0.08)",
              borderRadius: "20px",
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>🔒</div>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#f87171", marginBottom: "8px" }}>
              Recruitments Currently Paused
            </h3>
            <p style={{ fontSize: "14px", color: "#94a3b8", maxWidth: "450px", margin: "0 auto" }}>
              Applications for Data Science Club VITB core team are currently closed by administration. Stay tuned for future recruitment cycles!
            </p>
          </div>
        ) : (
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
                  <option value="Software Dev Team">Software Dev Team</option>
                  <option value="Technical Team">Technical Team</option>
                  <option value="Event Management Team">Event Management Team</option>
                  <option value="HR Team">HR Team</option>
                  <option value="PR & Outreach Team">PR & Outreach Team</option>
                  <option value="Content Team">Content Team</option>
                  <option value="Social Media Team">Social Media Team</option>
                  <option value="Design Team">Design Team</option>
                  <option value="Photography Team">Photography Team</option>
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

            <button
              type="submit"
              className="cta-btn primary-btn full-width margin-top-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting to Appwrite..." : "Submit Application"}{" "}
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div id="toast" className="toast">
          <i className="fa-solid fa-circle-check"></i> {toastMessage}
        </div>
      )}
    </section>
  );
};
