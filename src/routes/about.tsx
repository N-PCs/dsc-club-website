import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import {
  Cpu,
  Terminal,
  Database,
  Code2,
  Trophy,
  Mic,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Layers,
} from "lucide-react";

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

const activities = [
  {
    num: "01",
    title: "Skills Workshops",
    icon: BookOpen,
    desc: "Weekly hands-on laboratory sessions ranging from exploratory data analysis and statistical inference in Pandas to fine-tuning multimodal vision-language models.",
    tag: "CURRICULUM",
  },
  {
    num: "02",
    title: "Industry Sprints",
    icon: Mic,
    desc: "Direct masterclasses and telemetry breakdowns with production ML platform engineers, distributed cloud architects, and research scientists.",
    tag: "TELEMETRY",
  },
  {
    num: "03",
    title: "Competitive Datathons",
    icon: Trophy,
    desc: "36-hour hackathon sprints, Kaggle benchmark challenges, and university-wide algorithmic tournaments with cash bounties and compute grants.",
    tag: "HACKATHONS",
  },
  {
    num: "04",
    title: "Open Source Lab",
    icon: Code2,
    desc: "Building production developer tooling, open campus platforms, low-latency APIs, and mentoring students into Google Summer of Code and major open repositories.",
    tag: "SOFTWARE",
  },
];

const technologies = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "CUDA",
  "HuggingFace",
  "Docker",
  "Apache Spark",
  "Kafka",
  "PostgreSQL",
  "FastAPI",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Scikit-Learn",
];

function About() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-sky-400 selection:text-black">
      <Navbar />

      <main className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-4 mb-16 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-xl border border-sky-400/40 bg-sky-950/40 flex items-center justify-center font-mono text-xs font-bold text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              01
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/30 px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-sky-400">
              <span className="size-1.5 rounded-full bg-sky-400" />
              <span>PHILOSOPHY & CAPABILITY</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
            ABOUT DSC VIT BHOPAL
          </h1>

          <p className="text-xs sm:text-base font-mono text-slate-400 leading-relaxed max-w-2xl mt-2">
            The student engineering collective bridging textbook mathematics and production-grade
            computational software at VIT Bhopal University.
          </p>
        </div>

        {/* Signature Manifesto Box */}
        <div className="rounded-3xl border border-sky-400/25 bg-[#050814] p-8 sm:p-14 text-center mb-16 relative overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.1)]">
          <div className="text-2xl sm:text-4xl lg:text-5xl font-medium text-slate-200 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto leading-tight">
            <span>DSC VIT Bhopal combines</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/60 bg-sky-950/40 px-5 py-1.5 text-sky-300 font-mono text-lg sm:text-2xl font-bold shadow-[0_0_20px_rgba(56,189,248,0.25)]">
              <Cpu className="size-5 text-sky-400" />
              <span>intelligence</span>
            </span>
            <span>and</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/60 bg-sky-950/40 px-5 py-1.5 text-sky-300 font-mono text-lg sm:text-2xl font-bold shadow-[0_0_20px_rgba(56,189,248,0.25)]">
              <Terminal className="size-5 text-sky-400" />
              <span>engineering</span>
            </span>
            <span>in a true technological experiment.</span>
          </div>

          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-2xl mx-auto mt-6">
            We operate like a modern technology startup — pairing algorithmic research with
            low-latency infrastructure and high-throughput deployment.
          </p>
        </div>

        {/* Mission & Vision Dual Cyber Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <div className="group rounded-3xl border border-sky-400/20 bg-[#050814] p-8 sm:p-10 flex flex-col justify-between hover:border-sky-400/80 hover:shadow-[0_0_40px_rgba(56,189,248,0.22)] hover:-translate-y-1.5 transition-all duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-950/50 border border-sky-400/30 px-3 py-1 rounded-full">
                  01 // OUR MISSION
                </span>
                <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-sky-400/60 transition-colors">
                  01
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase group-hover:text-sky-300 transition-colors mt-2">
                Cultivating ML Competency
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-sans">
                Make computational engineering accessible to every developer at VIT Bhopal. We pair
                structured algorithmic fundamentals with project-driven telemetry, creating a
                platform where builders gather to design the future of technology.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-sky-400/15 flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck className="size-4 text-sky-400" />
              <span>Production-grade telemetry & code reviews</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group rounded-3xl border border-sky-400/20 bg-[#050814] p-8 sm:p-10 flex flex-col justify-between hover:border-sky-400/80 hover:shadow-[0_0_40px_rgba(56,189,248,0.22)] hover:-translate-y-1.5 transition-all duration-300 ease-out">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-950/50 border border-sky-400/30 px-3 py-1 rounded-full">
                  02 // OUR VISION
                </span>
                <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-sky-400/60 transition-colors">
                  02
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase group-hover:text-sky-300 transition-colors mt-2">
                Central India Technology Hub
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-sans">
                To serve as central India's premier student hub for ML research, software
                architecture, and distributed data pipelines. We aim to establish a self-sustaining
                system of developer contributions that scale far beyond campus boundaries.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-sky-400/15 flex items-center gap-2 text-xs font-mono text-slate-400">
              <Layers className="size-4 text-sky-400" />
              <span>1,500+ builders shaping campus tech culture</span>
            </div>
          </div>
        </div>

        {/* Core Activities Grid */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-sky-400 block mb-2 font-semibold">
                CURRICULAR TRACKS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                WHAT WE CRAFT
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-sm">
              We structure our initiatives across 4 active operational tracks to match individual
              engineering goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.title}
                  className="group rounded-3xl border border-sky-400/20 bg-[#050814] p-6 flex flex-col justify-between hover:border-sky-400/80 hover:shadow-[0_0_35px_rgba(56,189,248,0.2)] hover:-translate-y-1.5 transition-all duration-300 ease-out"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="size-11 rounded-xl bg-sky-950/60 border border-sky-400/30 flex items-center justify-center text-sky-300 group-hover:bg-sky-400 group-hover:text-black group-hover:border-sky-400 transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                        <Icon className="size-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-sky-400/80 uppercase">
                        {act.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white uppercase group-hover:text-sky-300 transition-colors mt-2">
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-3 leading-relaxed">{act.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-sky-400/15 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>TRACK [{act.num}]</span>
                    <span className="text-sky-400 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack Matrix */}
        <div className="rounded-3xl border border-sky-400/20 bg-[#030610] p-8 sm:p-12 mb-20 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-sky-400 block mb-2 font-semibold">
            DEVELOPMENT ENVIRONMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-8">
            TOOLS & COMPUTATIONAL STACK
          </h2>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl border border-sky-400/25 bg-black/60 text-xs font-mono text-slate-300 uppercase tracking-wider hover:border-sky-400 hover:text-white hover:bg-sky-950/40 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Join CTA Card */}
        <div className="rounded-3xl border border-sky-400/30 bg-gradient-to-r from-black via-sky-950/20 to-black p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(56,189,248,0.15)]">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              READY TO BUILD WITH US?
            </h3>
            <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl">
              Apply to join the DSC VIT Bhopal Core Team for our upcoming project sprint and
              hackathon execution rounds.
            </p>
          </div>

          <Link
            to="/join"
            className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-8 py-3.5 text-xs font-mono font-bold tracking-wider text-black uppercase hover:bg-sky-300 hover:scale-[1.03] transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] cursor-pointer shrink-0"
          >
            <span>JOIN CORE TEAM</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
