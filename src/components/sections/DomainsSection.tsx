import React from "react";

const domains = [
  {
    icon: "fa-microchip",
    title: "Machine Learning",
    desc: "Building neural networks, training vision models, and exploring deep learning architectures.",
    num: "DOMAIN [01]",
  },
  {
    icon: "fa-database",
    title: "Data Engineering",
    desc: "Developing retrieval systems, handling big data pipelines, and structuring relational databases.",
    num: "DOMAIN [02]",
  },
  {
    icon: "fa-laptop-code",
    title: "Interactive Dev",
    desc: "Creating stunning visual web architectures, reactive layouts, and interactive user platforms.",
    num: "DOMAIN [03]",
  },
  {
    icon: "fa-chart-pie",
    title: "Analytics Depth",
    desc: "Statistical inferences, exploratory data modeling, and meaningful dashboard insights.",
    num: "DOMAIN [04]",
  },
];

export const DomainsSection: React.FC = () => {
  return (
    <section id="domains" className="content-section">
      <div className="section-container">
        <div className="grid-2-col items-center">
          <div>
            <span className="section-eyebrow">OUR SUB-DOMAINS</span>
            <h2 className="section-title">
              DIVERSE ROLES.
              <br />
              <span className="gradient-text">ONE TEAM.</span>
            </h2>
            <p className="section-subtitle">
              We are structured into specific domains to ensure deep domain mastery.
              Choose a domain that fits your vision and register today.
            </p>
            <div className="margin-top-md">
              <a href="#join" className="cta-btn primary-btn">
                Get Interviewed
              </a>
            </div>
          </div>

          <div className="domains-grid">
            {domains.map((d) => (
              <div key={d.title} className="domain-card glass-card">
                <div className="domain-icon">
                  <i className={`fa-solid ${d.icon}`}></i>
                </div>
                <h3 className="domain-name">{d.title}</h3>
                <p className="domain-desc">{d.desc}</p>
                <span className="domain-num">{d.num}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
