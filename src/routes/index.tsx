import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Brain,
  Database,
  Code2,
  Cpu,
  Globe,
  Activity,
  Layers,
  BookOpen,
} from "lucide-react";

import { Sidebar, type ChapterNav } from "@/components/site/Sidebar";
import { ProgressBar } from "@/components/site/ProgressBar";
import { CircleImage } from "@/components/site/CircleImage";
import { ChapterSection } from "@/components/site/ChapterSection";
import { TransitionSlide } from "@/components/site/TransitionSlide";
import { EventCard, type EventData } from "@/components/site/EventCard";
import { ProjectCard, type ProjectData } from "@/components/site/ProjectCard";
import { TeamCard, type TeamMemberData } from "@/components/site/TeamCard";
import { JoinCTA } from "@/components/site/JoinCTA";
import { DynamicBackground } from "@/components/site/DynamicBackground";
import { LoadingScreen } from "@/components/site/LoadingScreen";

// Interactive Data Science Components
import { InteractiveGlobe } from "@/components/site/InteractiveGlobe";
import { InteractiveMLSandbox } from "@/components/site/InteractiveMLSandbox";
import { DataPipelineVisualizer } from "@/components/site/DataPipelineVisualizer";
import { LossLandscape3D } from "@/components/site/LossLandscape3D";
import { AttentionVisualizer } from "@/components/site/AttentionVisualizer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Data Science Club — VIT Bhopal" },
      {
        name: "description",
        content:
          "Official website for the Data Science Club at VIT Bhopal. An immersive horizontal scrollytelling documentary through AI, ML, Data Systems, and Open Source.",
      },
      { property: "og:title", content: "Data Science Club — VIT Bhopal" },
      {
        property: "og:description",
        content: "Data Science Club of VIT Bhopal — Unlocking insights, driving innovation.",
      },
    ],
  }),
  component: ScrollytellingHome,
});

const CHAPTERS: ChapterNav[] = [
  { id: "home", number: "01", title: "Home", accentColor: "#0B3D91" },
  { id: "about", number: "02", title: "About", accentColor: "#1E56C4" },
  { id: "events", number: "03", title: "Events", accentColor: "#2C7BE5" },
  { id: "projects", number: "04", title: "Projects", accentColor: "#3F8EFF" },
  { id: "team", number: "05", title: "Team", accentColor: "#1B2A6B" },
  { id: "join", number: "06", title: "Join", accentColor: "#FFFFFF" },
];

function ScrollytellingHome() {
  const [activeChapterId, setActiveChapterId] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetScrollLeftRef = useRef<number>(0);
  const shouldReduceMotion = useReducedMotion();

  // Scroll position listener for updating active chapter and progress bar percentage
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 768;

      if (isDesktop) {
        // Desktop horizontal scroll calculations
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0) {
          const pct = (container.scrollLeft / maxScroll) * 100;
          setScrollProgress(pct);
        }

        // Active chapter detection based on section offset
        const chapterElements = container.querySelectorAll("[data-chapter-id]");
        let currentActive = "home";
        let minDiff = Infinity;

        chapterElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const diff = Math.abs(rect.left - (window.innerWidth >= 1024 ? 96 : 80));
          if (diff < minDiff) {
            minDiff = diff;
            const cid = el.getAttribute("data-chapter-id");
            if (cid) currentActive = cid;
          }
        });

        setActiveChapterId(currentActive);
      } else {
        // Mobile vertical scroll calculations
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          setScrollProgress((window.scrollY / totalHeight) * 100);
        }

        const chapterElements = document.querySelectorAll("[data-chapter-id]");
        let currentActive = "home";

        chapterElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            const cid = el.getAttribute("data-chapter-id");
            if (cid) currentActive = cid;
          }
        });

        setActiveChapterId(currentActive);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Smooth wheel & trackpad horizontal scroll loop (desktop only)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldReduceMotion) return;

    let animFrameId: number;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return; // Desktop only

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta !== 0) {
        e.preventDefault();
        const maxScroll = container.scrollWidth - container.clientWidth;
        targetScrollLeftRef.current = Math.max(
          0,
          Math.min(maxScroll, targetScrollLeftRef.current + delta * 1.35)
        );
      }
    };

    const smoothScrollLoop = () => {
      if (container && window.innerWidth >= 768) {
        const diff = targetScrollLeftRef.current - container.scrollLeft;
        if (Math.abs(diff) > 0.5) {
          container.scrollLeft += diff * 0.16;
        } else {
          container.scrollLeft = targetScrollLeftRef.current;
        }
      }
      animFrameId = requestAnimationFrame(smoothScrollLoop);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    smoothScrollLoop();

    return () => {
      window.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animFrameId);
    };
  }, [shouldReduceMotion]);

  // Keyboard navigation support (ArrowRight, ArrowLeft, ArrowDown, ArrowUp)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return; // Desktop horizontal navigation
      const container = containerRef.current;
      if (!container) return;

      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        targetScrollLeftRef.current = Math.min(maxScroll, targetScrollLeftRef.current + 500);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        targetScrollLeftRef.current = Math.max(0, targetScrollLeftRef.current - 500);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle direct sidebar navigation click
  const scrollToChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    const container = containerRef.current;
    const isDesktop = window.innerWidth >= 768;

    if (isDesktop && container) {
      const targetSection = container.querySelector(`[data-chapter-id="${chapterId}"]`) as HTMLElement;
      if (targetSection) {
        targetScrollLeftRef.current = targetSection.offsetLeft;
        container.scrollTo({
          left: targetSection.offsetLeft,
          behavior: shouldReduceMotion ? "auto" : "smooth",
        });
      }
    } else {
      const targetSection = document.getElementById(chapterId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: shouldReduceMotion ? "auto" : "smooth",
        });
      }
    }
  };

  // Authentic Events Data
  const eventItems: EventData[] = [
    {
      id: "ev-1",
      exhibitCode: "EXHIBIT 03.1",
      title: "NeuralHack 2026: National AI Hackathon",
      categoryLabel: "36H HACKATHON",
      date: "OCT 14-16, 2026",
      time: "36 Hours Continuous",
      venue: "Lab Complex 302 & Discord",
      desc: "Flagship 36-hour build sprint bringing together student teams to build Generative AI and data pipeline applications.",
      imgUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
      accentColor: "#2C7BE5",
    },
    {
      id: "ev-2",
      exhibitCode: "EXHIBIT 03.2",
      title: "LLM Fine-Tuning & Quantization Bootcamp",
      categoryLabel: "WORKSHOP",
      date: "SEP 10, 2026",
      time: "2:00 PM - 5:30 PM",
      venue: "Auditorium Hall B",
      desc: "Hands-on bootcamp introducing LoRA parameter-efficient fine-tuning, Hugging Face pipelines, and GGUF deployment.",
      imgUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
      accentColor: "#2C7BE5",
    },
    {
      id: "ev-3",
      exhibitCode: "EXHIBIT 03.3",
      title: "Data Streaming with Apache Kafka",
      categoryLabel: "MASTERCLASS",
      date: "SEP 24, 2026",
      time: "4:00 PM - 6:00 PM",
      venue: "Online Stream",
      desc: "Learn real-time stream processing and event-driven architecture using Python, Kafka, and Docker containers.",
      imgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      accentColor: "#2C7BE5",
    },
  ];

  // Authentic Projects Data
  const projectItems: ProjectData[] = [
    {
      id: "pr-1",
      exhibitCode: "EXHIBIT 04.1",
      title: "NeuralFlow — LLM Telemetry Dashboard",
      desc: "Open-source Python dashboard for monitoring model latency, token metrics, and output quality in production.",
      tags: ["PyTorch", "FastAPI", "React", "Kafka"],
      imgUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com",
      demoUrl: "#",
      accentColor: "#3F8EFF",
    },
    {
      id: "pr-2",
      exhibitCode: "EXHIBIT 04.2",
      title: "PulseData — Kaggle Feature Pipeline",
      desc: "Automated tabular feature engineering and model tuning tool created for Kaggle data science competitions.",
      tags: ["LightGBM", "Optuna", "Python", "NumPy"],
      imgUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com",
      demoUrl: "#",
      accentColor: "#3F8EFF",
    },
    {
      id: "pr-3",
      exhibitCode: "EXHIBIT 04.3",
      title: "VisionCraft — Computer Vision Suite",
      desc: "OpenCV and YOLOv8 deployment library tailored for real-time video analytics and edge object detection.",
      tags: ["OpenCV", "TensorRT", "C++", "Python"],
      imgUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com",
      demoUrl: "#",
      accentColor: "#3F8EFF",
    },
  ];

  // Authentic Team Roster
  const teamItems: TeamMemberData[] = [
    {
      id: "tm-1",
      exhibitCode: "EXHIBIT 05.1",
      name: "Aarav Sharma",
      role: "Club Lead & AI Researcher",
      bio: "Focuses on deep learning systems, transformer fine-tuning, and open-source ML research.",
      imgUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      accentColor: "#1B2A6B",
    },
    {
      id: "tm-2",
      exhibitCode: "EXHIBIT 05.2",
      name: "Ananya Verma",
      role: "Vice Lead & Data Engineer",
      bio: "Specializes in cloud data pipelines, streaming architectures, and containerized deployments.",
      imgUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      accentColor: "#1B2A6B",
    },
    {
      id: "tm-3",
      exhibitCode: "EXHIBIT 05.3",
      name: "Rohan Patel",
      role: "Technical Lead",
      bio: "Computer vision and NLP developer leading hands-on workshops and Kaggle build sprints.",
      imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      accentColor: "#1B2A6B",
    },
    {
      id: "tm-4",
      exhibitCode: "EXHIBIT 05.4",
      name: "Diya Gupta",
      role: "Events & Operations Lead",
      bio: "Coordinates university bootcamps, hackathons, and student mentorship initiatives.",
      imgUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      accentColor: "#1B2A6B",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#F5F9FF] text-[#0B1E36] overflow-x-hidden">
      {/* Brand Intro Loader */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* Ambient Data Canvas Background */}
      <DynamicBackground />

      {/* Fixed Left Sidebar (Desktop) & Top Header Bar (Mobile) */}
      <Sidebar
        chapters={CHAPTERS}
        activeChapterId={activeChapterId}
        onSelectChapter={scrollToChapter}
      />

      {/* Slim Scroll Progress Bar */}
      <ProgressBar
        progress={scrollProgress}
        accentColor={
          CHAPTERS.find((c) => c.id === activeChapterId)?.accentColor || "#0B3D91"
        }
      />

      {/* MAIN SCROLLETTING CONTAINER */}
      <main
        ref={containerRef}
        className="horizontal-scroll-container flex flex-col md:flex-row w-full min-h-screen md:h-screen pt-16 md:pt-0 md:pl-20 lg:pl-24 relative z-10 md:overflow-x-auto md:overflow-y-hidden"
      >
        {/* ─── CHAPTER 01: HOME & GLOBE ──────────────────────── */}
        <ChapterSection
          id="home"
          number="01"
          title="DATA SCIENCE CLUB"
          subtitle="VIT BHOPAL UNIVERSITY"
          bgTint="#F5F9FF"
          accentColor="#0B3D91"
          museumAnnotation="EXHIBIT 01.1 — HERO & GLOBAL COMMUNITY"
          widthClass="md:w-max"
          isActive={activeChapterId === "home"}
        >
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
            {/* Panel 1.1: Hero Intro */}
            <div className="w-full md:w-[70vw] lg:w-[60vw] flex-shrink-0 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D91]/10 text-[#0B3D91] text-xs font-mono font-bold border border-[#0B3D91]/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DATA SCIENCE & AI COMMUNITY</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] tracking-tight">
                  Data Science Club at <br />
                  <span className="text-[#0B3D91]">VIT Bhopal</span>
                </h1>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  A student-led technical community focused on machine learning, data engineering, open-source software development, and competitive data science.
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => scrollToChapter("join")}
                    className="callout-bubble bg-[#0B3D91] text-white shadow-xl hover:bg-[#0B3D91]/90 min-h-[44px] px-5"
                  >
                    <span>Join Community</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollToChapter("about")}
                    className="callout-bubble bg-[#0B3D91]/10 text-[#0B3D91] border border-[#0B3D91]/30 hover:bg-[#0B3D91]/20 min-h-[44px] px-5"
                  >
                    <span>About Us →</span>
                  </button>
                </div>

                {/* Fast Stats Row */}
                <div className="pt-5 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <div className="font-extrabold text-xl text-[#0B3D91]">1,500+</div>
                    <div className="text-slate-500">STUDENT MEMBERS</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-xl text-[#0B3D91]">45+</div>
                    <div className="text-slate-500">HACKATHONS WON</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-xl text-[#0B3D91]">120+</div>
                    <div className="text-slate-500">OPEN PROJECTS</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex justify-center items-center">
                <CircleImage
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Data Science Club Members"
                  size={260}
                  accentColor="#0B3D91"
                  badgeContent={
                    <div className="bg-[#0B3D91] text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-white">
                      VIT BHOPAL // EST 2022
                    </div>
                  }
                />
              </div>
            </div>

            {/* Panel 1.2: Interactive 3D Data Globe */}
            <div className="w-full md:w-[65vw] lg:w-[55vw] flex-shrink-0 bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0B3D91] uppercase">
                  <Globe className="w-4 h-4" />
                  <span>GLOBAL COMMUNITY METRICS & ALUMNI NETWORK</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">EXHIBIT 01.2</span>
              </div>

              <div className="h-[240px] sm:h-[290px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 relative">
                <InteractiveGlobe />
              </div>
            </div>
          </div>
        </ChapterSection>

        {/* ─── TRANSITION 1 -> 2 ──────────────────────────────── */}
        <TransitionSlide
          id="trans-1-2"
          nextChapterNumber="02"
          nextChapterTitle="ABOUT US & ML SANDBOX"
          bgColor="#1E56C4"
          tagline="CHAPTER 02 — MISSION, PRINCIPLES & INTERACTIVE ML TRAINING"
        />

        {/* ─── CHAPTER 02: ABOUT & INTERACTIVE ML ───────────── */}
        <ChapterSection
          id="about"
          number="02"
          title="ABOUT & INTERACTIVE ML"
          subtitle="COMMUNITY WINGS & LIVE DEMO"
          bgTint="#E9F1FF"
          accentColor="#1E56C4"
          museumAnnotation="EXHIBIT 02.1 — MISSION & INTERACTIVE MODEL SANDBOX"
          widthClass="md:w-max"
          isActive={activeChapterId === "about"}
        >
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
            {/* Panel 2.1: Story & Wings */}
            <div className="w-full md:w-[70vw] lg:w-[60vw] flex-shrink-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 space-y-4 text-left">
                <div className="num-circle bg-[#1E56C4] text-white border-[#1E56C4]">
                  ①
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900">
                  Empowering Students in Data & AI
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Founded in 2022, the Data Science Club at VIT Bhopal provides a collaborative space for students to learn practical data science skills, build portfolio projects, and prepare for industry roles.
                </p>

                <div className="p-4 rounded-2xl bg-white/80 border border-[#1E56C4]/20 text-xs space-y-2">
                  <div className="font-mono font-bold text-[#1E56C4] flex items-center gap-1.5">
                    <Brain className="w-4 h-4" />
                    <span>OUR CORE APPROACH</span>
                  </div>
                  <p className="text-slate-700 italic">
                    "Learn by building real software, sharing code open-source, and solving practical data problems."
                  </p>
                </div>
              </div>

              {/* 4 Focus Wings */}
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {[
                  {
                    num: "②",
                    title: "Machine Learning & AI",
                    desc: "Supervised learning, neural networks, computer vision, and transformer models.",
                    icon: Brain,
                    tags: ["PyTorch", "TensorFlow"],
                  },
                  {
                    num: "③",
                    title: "Data Engineering",
                    desc: "Data pipelines, stream processing with Kafka, and database management.",
                    icon: Database,
                    tags: ["Kafka", "SQL"],
                  },
                  {
                    num: "④",
                    title: "Open Source Guild",
                    desc: "Collaborative repository builds and shipping community software tools.",
                    icon: Code2,
                    tags: ["Python", "Git"],
                  },
                  {
                    num: "⑤",
                    title: "Competitive Coding",
                    desc: "Kaggle competition sprints, mathematical modeling, and algorithms.",
                    icon: Cpu,
                    tags: ["NumPy", "C++"],
                  },
                ].map((wing, i) => {
                  const Icon = wing.icon;
                  return (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-md hover:border-[#1E56C4] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-7 h-7 rounded-lg bg-[#1E56C4]/10 text-[#1E56C4] flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-[#1E56C4]">
                          {wing.num}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs font-display text-slate-900 mb-1">
                        {wing.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                        {wing.desc}
                      </p>
                      <div className="flex gap-1">
                        {wing.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[9px] font-bold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Panel 2.2: Interactive ML Sandbox */}
            <div className="w-full md:w-[75vw] lg:w-[65vw] flex-shrink-0 bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1E56C4] uppercase">
                  <Activity className="w-4 h-4" />
                  <span>INTERACTIVE ML MODEL TRAINING SANDBOX</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">EXHIBIT 02.2</span>
              </div>

              <InteractiveMLSandbox />
            </div>
          </div>
        </ChapterSection>

        {/* ─── TRANSITION 2 -> 3 ──────────────────────────────── */}
        <TransitionSlide
          id="trans-2-3"
          nextChapterNumber="03"
          nextChapterTitle="EVENTS & STREAMING PIPELINES"
          bgColor="#2C7BE5"
          tagline="CHAPTER 03 — UPCOMING HACKATHONS & LIVE DATA PIPELINE DEMO"
        />

        {/* ─── CHAPTER 03: EVENTS & DATA PIPELINES ────────────── */}
        <ChapterSection
          id="events"
          number="03"
          title="EVENTS & STREAM PROCESSING"
          subtitle="HACKATHONS & ARCHITECTURE DEMO"
          bgTint="#DCEAFF"
          accentColor="#2C7BE5"
          museumAnnotation="EXHIBIT 03.1 — SCHEDULE & STREAMING DEMO"
          widthClass="md:w-max"
          isActive={activeChapterId === "events"}
        >
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
            {/* Panel 3.1: Upcoming Events Grid */}
            <div className="w-full md:w-[70vw] lg:w-[60vw] flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {eventItems.map((ev) => (
                  <EventCard
                    key={ev.id}
                    {...ev}
                    onRSVP={() => scrollToChapter("join")}
                  />
                ))}
              </div>
            </div>

            {/* Panel 3.2: Data Pipeline Visualizer */}
            <div className="w-full md:w-[75vw] lg:w-[65vw] flex-shrink-0 bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#2C7BE5] uppercase">
                  <Layers className="w-4 h-4" />
                  <span>REAL-TIME STREAM PROCESSING PIPELINE SIMULATOR</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">EXHIBIT 03.2</span>
              </div>

              <DataPipelineVisualizer />
            </div>
          </div>
        </ChapterSection>

        {/* ─── TRANSITION 3 -> 4 ──────────────────────────────── */}
        <TransitionSlide
          id="trans-3-4"
          nextChapterNumber="04"
          nextChapterTitle="PROJECTS & 3D LOSS LANDSCAPES"
          bgColor="#3F8EFF"
          tagline="CHAPTER 04 — OPEN SOURCE REPOSITORIES & 3D GRADIENT OPTIMIZATION"
        />

        {/* ─── CHAPTER 04: PROJECTS & 3D OPTIMIZATION ────────── */}
        <ChapterSection
          id="projects"
          number="04"
          title="PROJECTS & 3D LOSS SURFACE"
          subtitle="OPEN REPOS & GRADIENT DESCENT"
          bgTint="#CFE2FF"
          accentColor="#3F8EFF"
          museumAnnotation="EXHIBIT 04.1 — OPEN REPOS & OPTIMIZATION DEMO"
          widthClass="md:w-max"
          isActive={activeChapterId === "projects"}
        >
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
            {/* Panel 4.1: Projects Grid */}
            <div className="w-full md:w-[70vw] lg:w-[60vw] flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projectItems.map((pr) => (
                  <ProjectCard key={pr.id} {...pr} />
                ))}
              </div>
            </div>

            {/* Panel 4.2: Loss Landscape 3D Visualizer */}
            <div className="w-full md:w-[75vw] lg:w-[65vw] flex-shrink-0 bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#3F8EFF] uppercase">
                  <Activity className="w-4 h-4" />
                  <span>3D NEURAL NETWORK LOSS LANDSCAPE OPTIMIZATION</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">EXHIBIT 04.2</span>
              </div>

              <LossLandscape3D />
            </div>

            {/* Panel 4.3: Transformer Self Attention Matrix */}
            <div className="w-full md:w-[65vw] lg:w-[55vw] flex-shrink-0 bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#3F8EFF] uppercase">
                  <BookOpen className="w-4 h-4" />
                  <span>TRANSFORMER SELF-ATTENTION MATRIX EXPLORER</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">EXHIBIT 04.3</span>
              </div>

              <AttentionVisualizer />
            </div>
          </div>
        </ChapterSection>

        {/* ─── TRANSITION 4 -> 5 ──────────────────────────────── */}
        <TransitionSlide
          id="trans-4-5"
          nextChapterNumber="05"
          nextChapterTitle="LEADERSHIP TEAM"
          bgColor="#1B2A6B"
          tagline="CHAPTER 05 — CORE LEADS & COORDINATORS"
        />

        {/* ─── CHAPTER 05: TEAM ───────────────────────────────── */}
        <ChapterSection
          id="team"
          number="05"
          title="LEADERSHIP TEAM"
          subtitle="STUDENT LEADS & COORDINATORS"
          bgTint="#C2D9FF"
          accentColor="#1B2A6B"
          museumAnnotation="EXHIBIT 05.1 — TEAM ROSTER"
          widthClass="md:w-max"
          isActive={activeChapterId === "team"}
        >
          <div className="w-full md:w-[65vw] lg:w-[55vw]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamItems.map((tm) => (
                <TeamCard key={tm.id} {...tm} />
              ))}
            </div>
          </div>
        </ChapterSection>

        {/* ─── TRANSITION 5 -> 6 ──────────────────────────────── */}
        <TransitionSlide
          id="trans-5-6"
          nextChapterNumber="06"
          nextChapterTitle="JOIN THE CLUB"
          bgColor="#0B3D91"
          tagline="CHAPTER 06 — MEMBER REGISTRATION"
        />

        {/* ─── CHAPTER 06: JOIN ───────────────────────────────── */}
        <ChapterSection
          id="join"
          number="06"
          title="JOIN THE CLUB"
          subtitle="BECOME A MEMBER"
          bgTint="#0B3D91"
          accentColor="#FFFFFF"
          textColor="#FFFFFF"
          museumAnnotation="EXHIBIT 06.1 — ONBOARDING FORM"
          widthClass="md:w-max"
          isActive={activeChapterId === "join"}
        >
          <div className="w-full md:w-[60vw] lg:w-[50vw]">
            <JoinCTA />
          </div>
        </ChapterSection>
      </main>
    </div>
  );
}
