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
          let startTime: number | null = null;

          const step = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentVal = Math.floor(easedProgress * stat.target);

            setCounts((prev) => {
              const next = [...prev];
              next[index] = currentVal;
              return next;
            });

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCounts((prev) => {
                const next = [...prev];
                next[index] = stat.target;
                return next;
              });
            }
          };

          requestAnimationFrame(step);
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
      <div className="hero-content page">

        {/* Headline */}
        <h1 className="headline">
          <span className="headline-line line1">UNLEASHING THE</span>
          <span className="headline-line line2">DATA UNIVERSE</span>
        </h1>

        {/* Subhead */}
        <p className="subhead">
          We turn insights into shipped models, interactive tools, and open-source
          intelligence. Join a 100+ strong developer cohort pushing boundaries at
          VIT Bhopal.
        </p>

        {/* CTAs */}
        <div className="cta-group">
          <a href="#join" className="cta-btn primary-btn">
            Join the Core
          </a>
          <a href="#events" className="cta-btn secondary-btn">
            Explore Calendar
          </a>
        </div>

        {/* Stats Bar */}
        <div className="stats-telemetry-bar">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-item">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value">
                {counts[i]}
                {stat.suffix}
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
