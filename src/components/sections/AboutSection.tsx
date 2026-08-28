import React from "react";

const activities = [
  {
    icon: "fa-book-open",
    title: "Skills Workshops",
    desc: "Weekly hands-on labs from basic exploratory analysis in pandas to deploying custom transformer pipelines.",
    tag: "[ACTIVITY 01]",
  },
  {
    icon: "fa-microphone",
    title: "Industry Sprints",
    desc: "ML platform engineers and researchers sharing production telemetry workflows.",
    tag: "[ACTIVITY 02]",
  },
  {
    icon: "fa-trophy",
    title: "Competitive Hackathons",
    desc: "36-hour sprint sessions, campus-wide datathons, and Kaggle leaderboard runs.",
    tag: "[ACTIVITY 03]",
  },
  {
    icon: "fa-code",
    title: "Open Source Lab",
    desc: "Building libraries, maintaining campus utility platforms, and mentoring local code contributions.",
    tag: "[ACTIVITY 04]",
  },
];

const techStack = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "SQL",
  "Docker",
  "Spark",
  "Pandas",
  "FastAPI",
  "Next.js",
  "HuggingFace",
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="content-section">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-eyebrow">ABOUT THE LAB</span>
          <h2 className="section-title">
            Campus Engine For <span className="gradient-text">Data Builders</span>
          </h2>
          <p className="section-subtitle">
            We turn computational curiosity into production-ready pipelines,
            insights, and algorithms.
          </p>
        </div>

        {/* Mission & Vision Dual Grid */}
        <div className="grid-2-col gap-8 margin-top-lg">
          <div className="glass-card blue-border-card">
            <span className="card-num">01 / OUR MISSION</span>
            <h3 className="card-title">Cultivating ML Competency</h3>
            <p className="card-desc">
              Make computational engineering accessible to every developer at VIT
              Bhopal. We pair structured algorithmic fundamentals with
              project-driven telemetry, creating a platform where builders gather to
              design the future of technology.
            </p>
          </div>

          <div className="glass-card">
            <span className="card-num">02 / OUR VISION</span>
            <h3 className="card-title">Core Technology Hub</h3>
            <p className="card-desc">
              To serve as central India's premier student hub for ML research,
              software architecture, and data engineering pipelines. We aim to
              establish a self-sustaining system of developer contributions that
              scale far beyond campus boundaries.
            </p>
          </div>
        </div>

        {/* What We Craft Grid */}
        <div className="activities-wrapper margin-top-xl">
          <div className="activities-header">
            <div>
              <span className="section-eyebrow">ACTIVITIES</span>
              <h3 className="section-title-sm">
                WHAT WE <span className="gradient-text">CRAFT</span>
              </h3>
            </div>
            <p className="activities-sub">
              We structure our sprints across several active tracks to match
              individual engineering goals.
            </p>
          </div>

          <div className="activities-grid margin-top-md">
            {activities.map((act) => (
              <div key={act.title} className="activity-card glass-card">
                <div className="activity-icon-wrap">
                  <i className={`fa-solid ${act.icon}`}></i>
                </div>
                <h4 className="activity-title">{act.title}</h4>
                <p className="activity-desc">{act.desc}</p>
                <span className="activity-tag">{act.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Marquee */}
        <div className="marquee-section margin-top-xl">
          <h4 className="marquee-title">
            DEVELOPMENT <span className="gradient-text">TECHNOLOGY</span>
          </h4>
          <div className="marquee-wrapper glass-card">
            <div className="marquee-content">
              {[...techStack, ...techStack].map((tech, index) => (
                <span key={`${tech}-${index}`} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
