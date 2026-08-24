import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { BookOpen, Code2, Mic, Trophy } from "lucide-react";
import { gsap } from "gsap";
import { PageHeader } from "@/components/site/Ambient";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DSC Club VITB" },
      {
        name: "description",
        content:
          "Mission, vision and focus areas of DSC Club VITB: AI/ML, data engineering, analytics and competitive programming at VIT Bhopal.",
      },
      { property: "og:title", content: "About — DSC Club VITB" },
      {
        property: "og:description",
        content: "What the Data Science Club of VIT Bhopal builds, teaches and ships.",
      },
    ],
  }),
  component: About,
});

const doCards = [
  { 
    icon: BookOpen, 
    title: "Skills Workshops", 
    text: "Weekly hands-on labs from basic exploratory analysis in pandas to deploying custom transformer pipelines.",
    gridSpan: "md:col-span-2"
  },
  { 
    icon: Mic, 
    title: "Industry Sprints", 
    text: "ML platform engineers and researchers sharing production telemetry workflows.",
    gridSpan: "md:col-span-1"
  },
  { 
    icon: Trophy, 
    title: "Competitive Hackathons", 
    text: "36-hour sprint sessions, campus-wide datathons, and Kaggle leaderboard runs.",
    gridSpan: "md:col-span-1"
  },
  { 
    icon: Code2, 
    title: "Open Source Lab", 
    text: "Building libraries, maintaining campus utility platforms, and mentoring local code contributions.",
    gridSpan: "md:col-span-2"
  },
];

const stack = ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "SQL", "Docker", "Spark", "Pandas", "FastAPI", "Next.js", "HuggingFace"];

function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-header-fade", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from(".parallax-card-left", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.3,
      });
      gsap.from(".parallax-card-right", {
        y: 110,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.45,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="px-6 pt-36 pb-20 lg:px-16">
      {/* Page Header */}
      <div className="about-header-fade">
        <PageHeader
          eyebrow="ABOUT THE LAB"
          title="Campus engine for builders"
          subtitle="We turn computational curiosity into production-ready pipelines, insights, and algorithms."
        />
      </div>

      {/* Asymmetrical Mission & Vision Panels */}
      <div className="mx-auto mt-24 grid max-w-5xl gap-10 md:grid-cols-2 items-start">
        {/* Mission Card (Floated higher) */}
        <div className="parallax-card-left glass relative overflow-hidden rounded-3xl p-10 border border-primary/25 bg-gradient-to-b from-primary/5 to-transparent">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">01 / OUR MISSION</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white">Cultivating ML Competency</h2>
          <p className="mt-5 text-sm text-slate-300 leading-relaxed">
            Make computational engineering accessible to every developer at VIT Bhopal. We pair structured algorithmic fundamentals with project-driven telemetry, creating a platform where builders gather to design the future of technology.
          </p>
        </div>

        {/* Vision Card (Floated lower with margin top on desktop) */}
        <div className="parallax-card-right glass relative overflow-hidden rounded-3xl p-10 border border-white/10 md:mt-12 bg-gradient-to-b from-white/5 to-transparent">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-silver">02 / OUR VISION</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white">Core Technology Hub</h2>
          <p className="mt-5 text-sm text-slate-300 leading-relaxed">
            To serve as central India's premier student hub for ML research, software architecture, and data engineering pipelines. We aim to establish a self-sustaining system of developer contributions that scale far beyond campus boundaries.
          </p>
        </div>
      </div>

      {/* Asymmetric Core Values Grid (Breaking standard columns) */}
      <div className="mx-auto mt-36 max-w-5xl">
        <div className="about-header-fade flex flex-col justify-between items-start gap-4 border-b border-white/5 pb-8 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">ACTIVITIES</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-white leading-none">
              WHAT WE <span className="text-outline">CRAFT</span>
            </h2>
          </div>
          <p className="max-w-xs text-xs text-slate-400 leading-relaxed">
            We structure our sprints across several active tracks to match individual engineering goals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {doCards.map((c, i) => (
            <div 
              key={c.title} 
              className={`glass glass-hover p-8 rounded-3xl border border-white/5 bg-slate-900/10 flex flex-col justify-between ${c.gridSpan}`}
            >
              <div>
                <span className="inline-flex rounded-2xl bg-secondary p-3.5 text-accent border border-white/5">
                  <c.icon className="size-5.5" />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-white">{c.title}</h3>
                <p className="mt-3 text-xs text-slate-400 leading-relaxed">{c.text}</p>
              </div>
              <span className="mt-8 font-mono text-[9px] text-slate-600 tracking-widest">[ACTIVITY 0{i + 1}]</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Marquee Scroll */}
      <div className="mx-auto mt-36 max-w-5xl">
        <h2 className="text-center font-display text-2xl font-bold text-white tracking-wide">
          DEVELOPMENT <span className="text-outline">TECHNOLOGY</span>
        </h2>
        <div className="glass mt-8 overflow-hidden rounded-3xl py-7 border border-white/5">
          <div className="marquee-track flex w-max gap-5 px-5">
            {[...stack, ...stack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="whitespace-nowrap rounded-2xl border border-primary/20 bg-primary/5 hover:border-primary/50 transition-colors px-7 py-3.5 font-mono text-xs text-accent tracking-widest uppercase font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
