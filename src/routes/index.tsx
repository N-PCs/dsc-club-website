import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Cpu, Network, Rocket, Sparkles, Database, Code } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { InteractiveGlobe } from "@/components/site/InteractiveGlobe";
import hackathonImg from "@/assets/event-hackathon.jpg";
import workshopImg from "@/assets/event-workshop.jpg";
import talkImg from "@/assets/event-talk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DSC Club VITB — Data Science Club of VIT Bhopal" },
      {
        name: "description",
        content:
          "DSC Club VITB is the official Data Science Club of VIT Bhopal — workshops, hackathons, AI/ML projects and a 1500+ strong builder community.",
      },
      { property: "og:title", content: "DSC Club VITB — Data Science Club of VIT Bhopal" },
      {
        property: "og:description",
        content: "Unlocking insights, driving innovation. Join 1500+ data builders at VIT Bhopal.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "1500+", label: "Active Members", desc: "A fast-growing community of active student builders." },
  { value: "40+", label: "Events Hosted", desc: "Hands-on coding labs, datathons, and campus hackathons." },
  { value: "15+", label: "Projects Built", desc: "Open source ML models, tools, and research applications." },
  { value: "5+", label: "Major Hackathons", desc: "Mentored prototype sprints with industry sponsors." },
];

const domains = [
  {
    icon: Cpu,
    title: "Machine Learning",
    text: "Building neural networks, training vision models, and exploring deep learning architectures.",
    accent: "border-primary/40",
  },
  {
    icon: Database,
    title: "Data Engineering",
    text: "Developing retrieval systems, handling big data pipelines, and structuring relational pipelines.",
    accent: "border-accent/40",
  },
  {
    icon: Code,
    title: "Interactive Dev",
    text: "Creating stunning visual web architectures, reactive layouts, and interactive user platforms.",
    accent: "border-blue-400/40",
  },
  {
    icon: Network,
    title: "Analytics Depth",
    text: "Statistical inferences, exploratory data modeling, and meaningful dashboard insights.",
    accent: "border-white/20",
  },
];

function Home() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Hero Stagger Entrance Animations
    const heroCtx = gsap.context(() => {
      gsap.from(".hero-stagger", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from(globeContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.4,
      });
    });

    // 2. Horizontal Scroll Section Trigger (GSAP ScrollTrigger)
    let horizontalScroll: gsap.plugins.ScrollTriggerInstance | null = null;
    
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const track = horizontalTrackRef.current;
      const section = horizontalSectionRef.current;

      if (track && section) {
        // Calculate amount to translate
        const scrollWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const xTranslation = -(scrollWidth - viewportWidth);

        horizontalScroll = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth - viewportWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          animation: gsap.to(track, {
            x: xTranslation,
            ease: "none",
          }),
        });
      }
    }

    return () => {
      heroCtx.revert();
      if (horizontalScroll) {
        horizontalScroll.kill();
      }
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero Section (Asymmetrical layout with Outline Typography & Globe) */}
      <section className="relative flex min-h-screen flex-col justify-center px-6 pt-24 pb-12 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Hero Typography */}
          <div ref={heroTextRef} className="z-10 lg:col-span-7">
            <span className="hero-stagger border border-primary/30 bg-primary/5 inline-flex items-center gap-2 rounded-full px-4.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              <span className="dot-pulse size-1.5 rounded-full bg-accent" />
              VIT Bhopal · Est. 2021
            </span>
            
            <h1 className="mt-8 font-display text-6xl font-extrabold leading-[0.95] text-white sm:text-8xl lg:text-[6.5rem]">
              <span className="hero-stagger block text-outline">UNLEASHING</span>
              <span className="hero-stagger block text-white">THE DATA</span>
              <span className="hero-stagger block text-outline">UNIVERSE</span>
            </h1>

            <p className="hero-stagger mt-6 max-w-xl text-lg text-slate-300 leading-relaxed">
              We turn insights into shipped models, interactive tools, and open-source intelligence. Join a 1500+ strong developer cohort pushing boundaries at VIT Bhopal.
            </p>

            <div className="hero-stagger mt-10 flex flex-wrap gap-4">
              <Link to="/join" className="btn-neon rounded-2xl px-8 py-4 font-semibold text-sm">
                Join the Core
              </Link>
              <Link to="/events" className="btn-glass rounded-2xl px-8 py-4 font-semibold text-sm">
                Explore Calendar
              </Link>
            </div>
          </div>

          {/* 3D Canvas Globe Container */}
          <div ref={globeContainerRef} className="flex justify-center lg:col-span-5">
            <InteractiveGlobe size={480} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-slate-400">
          <span>SCROLL DOWN</span>
          <span className="block size-1.5 animate-bounce rounded-full bg-accent" />
        </div>
      </section>

      {/* 2. Horizontal Scroll Section (Stats & Highlights track) */}
      <section ref={horizontalSectionRef} className="relative h-screen bg-slate-950/20">
        <div className="absolute top-8 left-6 z-20 md:left-16">
          <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
            HIGHLIGHTS <span className="text-outline">& STATS</span>
          </h2>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
            Swipe-scroll through what we built
          </p>
        </div>

        <div 
          ref={horizontalTrackRef} 
          className="flex h-full w-max items-center gap-8 px-6 py-20 md:px-16"
        >
          {/* Card 1: Stats Column (Asymmetrical Layout Grid) */}
          <div className="glass flex h-[62vh] w-[90vw] flex-col justify-between rounded-3xl p-10 md:w-[48vw]">
            <div className="max-w-md">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">01 / OVERVIEW</span>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight">Scale of the Lab</h3>
              <p className="mt-3 text-sm text-slate-300">
                Data Science is the ultimate catalyst for change. The club supports student-led developments from the ground up, fostering research, engineering depth, and hackathon triumphs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl font-bold text-white">{s.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Stats Part 2 */}
          <div className="glass flex h-[62vh] w-[90vw] flex-col justify-between rounded-3xl p-10 md:w-[48vw]">
            <div className="max-w-md">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">02 / VELOCITY</span>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight">Fast Shipped Code</h3>
              <p className="mt-3 text-sm text-slate-300">
                We bridge the gap between academic theory and technical craft. Our members work in agile domains shipping tools to GitHub and presenting research publications.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8">
              {stats.slice(2, 4).map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl font-bold text-white">{s.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Highlight - Deep Learning Workshop */}
          <div className="glass group relative overflow-hidden h-[62vh] w-[90vw] rounded-3xl md:w-[50vw]">
            <img 
              src={workshopImg} 
              alt="PyTorch Bootcamp" 
              className="absolute inset-0 size-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col justify-end">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">03 / SKILLS WORKSHOP</span>
              <h3 className="mt-3 font-display text-3xl font-bold text-white">Deep Learning Bootcamp</h3>
              <p className="mt-3 max-w-md text-sm text-slate-300">
                A hands-on intensive covering PyTorch tensors, autograd engines, and computer vision models. Members build neural nets from scratch.
              </p>
              <div className="mt-6">
                <Link to="/events" className="btn-neon rounded-xl px-5 py-3 text-xs inline-flex items-center gap-1">
                  View Workshop Details <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 4: Highlight - Flagship Hackathon */}
          <div className="glass group relative overflow-hidden h-[62vh] w-[90vw] rounded-3xl md:w-[50vw]">
            <img 
              src={hackathonImg} 
              alt="DataHacks recap" 
              className="absolute inset-0 size-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col justify-end">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">04 / FLAGSHIP EVENT</span>
              <h3 className="mt-3 font-display text-3xl font-bold text-white">DataHacks '25 Recap</h3>
              <p className="mt-3 max-w-md text-sm text-slate-300">
                36 hours of continuous hacking, 240+ participants, and 62 shipped prototypes leveraging smart-campus and civic data pipelines.
              </p>
              <div className="mt-6">
                <Link to="/events" className="btn-neon rounded-xl px-5 py-3 text-xs inline-flex items-center gap-1">
                  Read Hackathon Summary <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 5: Research Track */}
          <div className="glass group relative overflow-hidden h-[62vh] w-[90vw] rounded-3xl md:w-[50vw]">
            <img 
              src={talkImg} 
              alt="AI Research lab" 
              className="absolute inset-0 size-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col justify-end">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">05 / RESEARCH SPRINT</span>
              <h3 className="mt-3 font-display text-3xl font-bold text-white">AI Research Lab</h3>
              <p className="mt-3 max-w-md text-sm text-slate-300">
                Undergraduate teams conducting focused research on multimodal retrieval, time-series forecasting frameworks, and agent evaluations.
              </p>
              <div className="mt-6">
                <Link to="/about" className="btn-glass rounded-xl px-5 py-3 text-xs inline-flex items-center gap-1">
                  Learn About Research <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 6: Join CTA */}
          <div className="glass flex h-[62vh] w-[90vw] flex-col justify-between rounded-3xl p-10 md:w-[42vw] bg-gradient-to-br from-primary/10 to-slate-950 border-primary/20">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">06 / APPLICATION</span>
              <h3 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] text-white">SHAPE THE FUTURE</h3>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                Be a part of our next cohort of data scientists, platform builders, core coordinators, and technical writers. 
              </p>
            </div>
            <div>
              <Link to="/join" className="btn-neon w-full rounded-2xl py-4 font-bold text-sm inline-flex items-center justify-center gap-2">
                Apply for Membership <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Domain Splitting Grid (Challenging orthodox layouts) */}
      <section className="relative px-6 py-32 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">OUR SUB-DOMAINS</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl leading-[1.05]">
                DIVERSE <br/>
                ROLES. <br/>
                <span className="text-outline">ONE TEAM.</span>
              </h2>
              <p className="mt-6 text-sm text-slate-400 max-w-sm leading-relaxed">
                We are structured into specific domains to ensure deep domain mastery. Choose a domain that fits your vision and register today.
              </p>
              <div className="mt-10">
                <Link to="/join" className="btn-glass rounded-xl px-6 py-3.5 text-xs font-semibold">
                  Get Interviewed
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              {domains.map((d, index) => (
                <div 
                  key={d.title} 
                  className={`glass glass-hover rounded-3xl p-8 border ${d.accent} flex flex-col justify-between`}
                >
                  <div>
                    <span className="inline-flex rounded-2xl bg-primary/10 p-3.5 text-accent border border-primary/20">
                      <d.icon className="size-5.5" />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-bold">{d.title}</h3>
                    <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">{d.text}</p>
                  </div>
                  <div className="mt-8 font-mono text-[9px] text-slate-500 tracking-widest uppercase">
                    DOMAIN [0{index + 1}]
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
