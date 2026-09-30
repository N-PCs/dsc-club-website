import React from "react";
import { Link } from "@tanstack/react-router";
import { Cpu, Database, Layout, BarChart3, ArrowRight, Terminal } from "lucide-react";

const domainList = [
  {
    num: "01",
    code: "DOMAIN // ML-01",
    title: "Machine Learning",
    icon: Cpu,
    tagline: "Neural Architectures & Generative AI",
    desc: "Building production deep learning models, fine-tuning transformers, computer vision pipelines, and deploying edge AI inference engines.",
    skills: ["PyTorch", "HuggingFace", "CUDA", "LLMs", "Vision Transformers"],
    accentColor: "sky",
  },
  {
    num: "02",
    code: "DOMAIN // DE-02",
    title: "Data Engineering",
    icon: Database,
    tagline: "Distributed Pipelines & Big Data",
    desc: "Developing high-throughput ETL pipelines, vector search clusters, real-time streaming architectures, and resilient cloud data lakes.",
    skills: ["Apache Spark", "Kafka", "PostgreSQL", "Vector DBs", "Docker"],
    accentColor: "blue",
  },
  {
    num: "03",
    code: "DOMAIN // DEV-03",
    title: "Interactive Dev",
    icon: Layout,
    tagline: "Next-Gen Web & Computational Interfaces",
    desc: "Crafting reactive frontend architectures, responsive 3D web platforms, performant APIs, and developer tools for the DSC community.",
    skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "GSAP / Three.js", "REST/GraphQL"],
    accentColor: "sky",
  },
  {
    num: "04",
    code: "DOMAIN // AD-04",
    title: "Analytics Depth",
    icon: BarChart3,
    tagline: "Statistical Inferences & Predictive Modeling",
    desc: "Unlocking empirical signals from high-dimensional datasets, hypothesis testing, quantitative research, and decision intelligence dashboards.",
    skills: ["Pandas / NumPy", "Scikit-Learn", "Tableau", "Bayesian Stats", "Forecasting"],
    accentColor: "blue",
  },
];

export const SiloDomains: React.FC = () => {
  return (
    <section
      id="domains"
      className="w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-xl border border-sky-400/40 bg-sky-950/40 flex items-center justify-center font-mono text-xs font-bold text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              02
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/30 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-sky-400">
              <span className="size-1.5 rounded-full bg-sky-400" />
              <span>SPECIALIZED DIVISIONS</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-3 leading-none">
            OUR SUB-DOMAINS
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-xl">
            Structured into four core technical divisions to ensure mastery, cross-functional
            collaboration, and real-world deployment.
          </p>
        </div>

        <div>
          <Link
            to="/join"
            className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 sm:px-7 py-3 text-xs font-mono font-bold tracking-wider text-black uppercase hover:bg-sky-300 hover:scale-[1.03] transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.35)] cursor-pointer"
          >
            <span>JOIN A DOMAIN</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid of 4 Domain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {domainList.map((domain) => {
          const Icon = domain.icon;
          return (
            <div
              key={domain.num}
              className="group relative rounded-3xl border border-sky-400/20 bg-[#050814] p-6 sm:p-8 flex flex-col justify-between hover:border-sky-400/80 hover:shadow-[0_0_40px_rgba(56,189,248,0.25)] hover:-translate-y-1.5 transition-all duration-300 ease-out"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-sky-400 tracking-widest uppercase bg-sky-950/50 border border-sky-400/30 px-3 py-1 rounded-full">
                    {domain.code}
                  </span>
                  <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-sky-400/60 transition-colors">
                    {domain.num}
                  </span>
                </div>

                <div className="flex items-start gap-4 mt-2">
                  <div className="size-12 rounded-2xl bg-sky-950/60 border border-sky-400/30 flex items-center justify-center text-sky-300 group-hover:bg-sky-400 group-hover:text-black group-hover:border-sky-400 transition-all shadow-[0_0_20px_rgba(56,189,248,0.15)] shrink-0">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase group-hover:text-sky-300 transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-xs font-mono text-sky-400/90 tracking-wide mt-0.5">
                      {domain.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-sans">
                  {domain.desc}
                </p>
              </div>

              {/* Skills Tags & Footer Action */}
              <div className="mt-6 pt-5 border-t border-sky-400/15">
                <div className="flex flex-wrap gap-2 mb-4">
                  {domain.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg border border-sky-400/20 bg-black/60 text-[10px] font-mono text-slate-300 uppercase tracking-wider"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="inline-flex items-center gap-1.5 text-sky-400">
                    <Terminal className="size-3" />
                    <span>ACTIVE TRACK</span>
                  </span>
                  <Link
                    to="/join"
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Apply Domain</span>
                    <ArrowRight className="size-3 text-sky-400" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Simulation / Tech Terminal Preview */}
      <div className="mt-8 rounded-3xl border border-sky-400/25 bg-[#030610] p-6 sm:p-10 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/40 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-sky-400">
              <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>LIVE COMPUTATIONAL LAB</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              DIVERSE ROLES. <span className="text-sky-400">ONE SYNERGY.</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              From training multi-billion parameter neural networks to deploying low-latency web
              interfaces, our domains operate like a modern technology company. Every sprint pairs
              researchers, engineers, and designers to build production-grade solutions.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-3 rounded-xl border border-sky-400/20 bg-black/50">
                <span className="block text-lg sm:text-xl font-mono font-bold text-sky-400">4</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Core Domains</span>
              </div>
              <div className="p-3 rounded-xl border border-sky-400/20 bg-black/50">
                <span className="block text-lg sm:text-xl font-mono font-bold text-sky-400">
                  100%
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Hands-on Code
                </span>
              </div>
              <div className="p-3 rounded-xl border border-sky-400/20 bg-black/50">
                <span className="block text-lg sm:text-xl font-mono font-bold text-sky-400">
                  24/7
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Collab Lab</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-sky-400/30 bg-black shadow-[0_0_30px_rgba(56,189,248,0.2)]">
              <video
                src="/datascience.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
              <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-[10px] font-mono text-slate-300">
                <span className="flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded-md border border-sky-400/30 backdrop-blur-md">
                  <span className="size-2 rounded-full bg-sky-400 animate-pulse" />
                  <span>DATA ARCHITECTURE VISUALIZATION</span>
                </span>
                <span className="text-sky-400 font-bold bg-black/70 px-2 py-1 rounded-md border border-white/10 backdrop-blur-md">
                  60 FPS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
