import React, { useEffect, useState, useRef } from "react";

interface StatConfig {
  icon: string;
  target: number;
  suffix: string;
  label: string;
}

const stats: StatConfig[] = [
  { icon: "<", target: 100, suffix: "+", label: "Active Members" },
  { icon: "%", target: 10, suffix: "+", label: "Events Hosted" },
  { icon: "#", target: 5, suffix: "+", label: "Major Hackathons" },
];

export const HeroSection: React.FC = () => {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const hasAnimatedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const startCounter = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      stats.forEach((stat, index) => {
        const duration = 1600 + index * 100;
        const startDelay = 250 + index * 80;

        setTimeout(() => {
          const startTime = performance.now();
          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(easeOutCubic(progress) * stat.target);
            setCounts((prev) => {
              const next = [...prev];
              next[index] = current;
              return next;
            });

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          };
          requestAnimationFrame(update);
        }, startDelay);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startCounter();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero-section">
      <div className="bg">
        <video
          className="bg-video"
          autoPlay
          loop
          muted
          playsInline
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-lines-movement-31742-large.mp4"
        />
        <div className="bg-overlay" />
      </div>

      <div className="hero-content">
        <div className="badge-pill">
          <span className="badge-dot"></span>
          OFFICIAL DATA SCIENCE CLUB • VIT BHOPAL
        </div>

        <h1 className="headline">
          <span className="headline-line line1">Empowering Builders.</span>
          <span className="headline-line line2">Advancing Intelligence.</span>
        </h1>

        <p className="subhead">
          Join VIT Bhopal's premier community of data scientists, machine learning engineers, and open-source developers building next-generation intelligent systems.
        </p>

        <div className="cta-group">
          <a href="#join" className="cta-btn primary-btn">
            Join the Club
          </a>
          <a href="#about" className="cta-btn secondary-btn">
            Explore Initiatives
          </a>
        </div>

        <div className="stats-telemetry-bar">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-value">
                {counts[idx]}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
