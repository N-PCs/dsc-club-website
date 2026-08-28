import React from "react";
import TextLoop from "@/components/site/TextLoop";
import LogoLoop, { LogoItem } from "@/components/site/LogoLoop";

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

const techLogos: LogoItem[] = [
  {
    title: "Python",
    node: (
      <div className="tech-logo-icon" title="Python">
        <i className="fa-brands fa-python" style={{ color: "#3776ab" }}></i>
        <span className="tech-tooltip">Python</span>
      </div>
    ),
  },
  {
    title: "TensorFlow",
    node: (
      <div className="tech-logo-icon" title="TensorFlow">
        <i className="fa-solid fa-brain" style={{ color: "#ff6f00" }}></i>
        <span className="tech-tooltip">TensorFlow</span>
      </div>
    ),
  },
  {
    title: "PyTorch",
    node: (
      <div className="tech-logo-icon" title="PyTorch">
        <i className="fa-solid fa-fire-flame-curved" style={{ color: "#ee4c2c" }}></i>
        <span className="tech-tooltip">PyTorch</span>
      </div>
    ),
  },
  {
    title: "Scikit-learn",
    node: (
      <div className="tech-logo-icon" title="Scikit-learn">
        <i className="fa-solid fa-chart-line" style={{ color: "#f7931e" }}></i>
        <span className="tech-tooltip">Scikit-learn</span>
      </div>
    ),
  },
  {
    title: "SQL",
    node: (
      <div className="tech-logo-icon" title="SQL">
        <i className="fa-solid fa-database" style={{ color: "#00d2ff" }}></i>
        <span className="tech-tooltip">SQL</span>
      </div>
    ),
  },
  {
    title: "Docker",
    node: (
      <div className="tech-logo-icon" title="Docker">
        <i className="fa-brands fa-docker" style={{ color: "#2496ed" }}></i>
        <span className="tech-tooltip">Docker</span>
      </div>
    ),
  },
  {
    title: "Apache Spark",
    node: (
      <div className="tech-logo-icon" title="Apache Spark">
        <i className="fa-solid fa-bolt" style={{ color: "#e25a1c" }}></i>
        <span className="tech-tooltip">Apache Spark</span>
      </div>
    ),
  },
  {
    title: "Pandas",
    node: (
      <div className="tech-logo-icon" title="Pandas">
        <i className="fa-solid fa-table" style={{ color: "#3b82f6" }}></i>
        <span className="tech-tooltip">Pandas</span>
      </div>
    ),
  },
  {
    title: "FastAPI",
    node: (
      <div className="tech-logo-icon" title="FastAPI">
        <i className="fa-solid fa-bolt-lightning" style={{ color: "#059669" }}></i>
        <span className="tech-tooltip">FastAPI</span>
      </div>
    ),
  },
  {
    title: "Next.js",
    node: (
      <div className="tech-logo-icon" title="Next.js">
        <i className="fa-brands fa-react" style={{ color: "#61dafb" }}></i>
        <span className="tech-tooltip">Next.js</span>
      </div>
    ),
  },
  {
    title: "HuggingFace",
    node: (
      <div className="tech-logo-icon" title="HuggingFace">
        <i className="fa-solid fa-robot" style={{ color: "#ffd21e" }}></i>
        <span className="tech-tooltip">HuggingFace</span>
      </div>
    ),
  },
  {
    title: "GitHub",
    node: (
      <div className="tech-logo-icon" title="GitHub">
        <i className="fa-brands fa-github" style={{ color: "#ffffff" }}></i>
        <span className="tech-tooltip">GitHub</span>
      </div>
    ),
  },
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

        {/* Animated Text Loop Banner */}
        <TextLoop
          text="DSC CLUB VITB ✦ DATA SCIENCE CLUB"
          shape="wave"
          speed={85}
          direction="forward"
          separator="✦"
          curviness={35}
          fontSize={34}
          fontWeight={800}
          letterSpacing={6}
          uppercase
          color="#ffffff"
          pauseOnHover={true}
          style={{ width: "100%", margin: "16px 0" }}
        />

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

        {/* Tech Stack Logo Loop */}
        <div className="marquee-section margin-top-xl">
          <h4 className="marquee-title">
            DEVELOPMENT <span className="gradient-text">TECHNOLOGY</span>
          </h4>
          <div className="glass-card" style={{ padding: "16px 0", overflow: "hidden", position: "relative" }}>
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={48}
              gap={54}
              pauseOnHover={true}
              scaleOnHover={false}
              fadeOut={true}
              fadeOutColor="#0b1329"
              ariaLabel="Development Technology Stack"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
