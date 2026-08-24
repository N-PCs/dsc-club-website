import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { PageHeader } from "@/components/site/Ambient";
import hackathonImg from "@/assets/event-hackathon.jpg";
import workshopImg from "@/assets/event-workshop.jpg";
import talkImg from "@/assets/event-talk.jpg";
import teamImg from "@/assets/event-team.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — DSC Club VITB" },
      {
        name: "description",
        content:
          "Upcoming and past events at DSC Club VITB: hackathons, PyTorch bootcamps, industry talks and datathons at VIT Bhopal.",
      },
      { property: "og:title", content: "Events — DSC Club VITB" },
      { property: "og:description", content: "Workshops, hackathons and tech talks by DSC VITB." },
    ],
  }),
  component: Events,
});

const upcoming = [
  {
    img: workshopImg,
    title: "PyTorch Deep Dive Bootcamp",
    date: "12 Sep 2026 · 10:00 AM",
    place: "AB-1 Auditorium",
    text: "Three days of intensive tensors training, autograd computation graph breakdowns, and compiling vision classification models from scratch.",
    tag: "BOOTCAMP",
  },
  {
    img: talkImg,
    title: "Talks: LLMs in Production",
    date: "26 Sep 2026 · 5:30 PM",
    place: "Seminar Hall 2",
    text: "An ML platform team member shares deployment telemetries, LLM evaluations, inference costs, and model monitoring guardrails.",
    tag: "TECH TALK",
  },
  {
    img: hackathonImg,
    title: "DataHacks '26",
    date: "18 Oct 2026 · 9:00 AM",
    place: "Innovation Center",
    text: "Our flagship 36-hour hackathon focusing on open civic API integration and local-campus analytics platforms. 300+ builders expected.",
    tag: "HACKATHON",
  },
];

const past = [
  {
    img: hackathonImg,
    title: "DataHacks '25",
    date: "20 Oct 2025",
    place: "Innovation Center",
    text: "240 developers, 62 functional prototypes, and 36 hours of continuous pipeline building with real telemetry feedback.",
    tag: "HACKATHON",
  },
  {
    img: workshopImg,
    title: "Python for Data Bootcamp",
    date: "08 Aug 2025",
    place: "Lab Complex 3",
    text: "An intensive bootcamp covering Pandas indices, NumPy aggregations, and Seaborn visual layouts. 150+ students certified.",
    tag: "WORKSHOP",
  },
  {
    img: teamImg,
    title: "DSC Onboarding Night",
    date: "02 Aug 2025",
    place: "Open Air Theatre",
    text: "Welcoming our next cohort with lightning project demos, core coordinator reveals, and collaborative developer networking.",
    tag: "COMMUNITY",
  },
];

function Events() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = tab === "upcoming" ? upcoming : past;
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in the list items on tab change
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [tab]);

  return (
    <div className="px-6 pt-36 pb-20 lg:px-16">
      {/* Header */}
      <PageHeader
        eyebrow="CALENDAR"
        title="Events that ship skills"
        subtitle="From weekend hackathons to deep learning bootcamps — choose your next track."
      />

      <div className="mx-auto mt-20 max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Left Column: Sticky Tab Selector */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">FILTER TIMELINE</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white">Select Cohort</h2>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed max-w-xs">
              Check out what's coming up next or look back at our past initiatives, hackathons, and certifications.
            </p>

            <div className="glass mt-8 flex flex-col gap-2 rounded-2xl p-2 border border-white/5 bg-slate-900/10">
              {(["upcoming", "past"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`w-full rounded-xl py-3.5 px-5 font-mono text-xs uppercase tracking-[0.2em] transition-all text-left ${
                    tab === t 
                      ? "bg-primary text-white font-bold shadow-glow" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t === "upcoming" ? "Upcoming Sprints" : "Completed Sprints"}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Timeline Cards List */}
          <div ref={listRef} className="space-y-12 lg:col-span-8 relative border-l border-primary/20 pl-6 md:pl-10">
            {list.map((e, index) => (
              <article 
                key={e.title} 
                className="glass group relative rounded-3xl border border-white/5 p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-primary/45 transition-colors"
              >
                {/* Timeline Dot Connector */}
                <div className="absolute -left-[31px] md:-left-[47px] top-9 size-3.5 rounded-full bg-slate-950 border-[3.5px] border-primary group-hover:scale-125 transition-transform" />

                {/* Event Image */}
                <div className="w-full md:w-1/3 overflow-hidden rounded-2xl h-44 md:h-auto relative">
                  <img
                    src={e.img}
                    alt={e.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/20" />
                  <span className="absolute top-3 left-3 bg-slate-950/80 border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-accent rounded-full backdrop-blur-md">
                    {e.tag}
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {e.title}
                    </h3>
                    
                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/5 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-slate-300">
                        <CalendarDays className="size-3 text-accent" /> {e.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/5 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-slate-300">
                        <MapPin className="size-3 text-accent" /> {e.place}
                      </span>
                    </div>

                    <p className="mt-5 text-xs text-slate-400 leading-relaxed">
                      {e.text}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <button 
                      className={`inline-flex items-center gap-2 rounded-xl py-3 px-6 text-xs font-bold transition-all ${
                        tab === "upcoming" 
                          ? "btn-neon" 
                          : "btn-glass border-white/10"
                      }`}
                    >
                      {tab === "upcoming" ? "Register For Event" : "View Recap dossier"}
                      <ArrowRight className="size-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
