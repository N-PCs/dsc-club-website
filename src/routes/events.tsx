import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import { SiloEventModal, SiloEventData } from "@/components/silo/SiloEventModal";
import { Calendar, Clock, MapPin, ArrowRight, Ticket, Filter } from "lucide-react";
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

const upcomingEvents: SiloEventData[] = [
  {
    id: "pytorch-bootcamp-2026",
    title: "PyTorch Deep Learning Sprint",
    speaker: "Dr. Alok Ranjan",
    role: "Deep Learning Specialist & Associate Professor",
    category: "BOOTCAMP",
    date: "Saturday, Oct 24, 2026",
    time: "10:00 AM - 4:00 PM IST",
    venue: "Lab Complex 3 // AB-1 High-Perf Lab",
    image: workshopImg,
    badge: "PASSES OPEN",
    description:
      "A hands-on, hardware-accelerated deep dive into neural tensor architectures, gradient descent graph compilation, and fine-tuning computer vision backbones.",
    longBio:
      "This 6-hour intensive bootcamp guides developers through tensor manipulation, building custom autoencoders, and deploying models to mobile & edge backends using TensorRT and ONNX runtime.",
    ticketPrice: "FREE // STUDENT PASS",
    socials: {
      github: "https://github.com/cdsvitbhopal",
      linkedin: "https://linkedin.com/company/dsc-vitb",
    },
  },
  {
    id: "datahacks-26",
    title: "DataHacks '26 (36-Hour Hackathon)",
    speaker: "DSC Executive Board & Industry Judges",
    role: "Central India Flagship Collegiate Hackathon",
    category: "HACKATHON",
    date: "Fri-Sun, Nov 14-16, 2026",
    time: "9:00 AM Fri - 9:00 PM Sun",
    venue: "Innovation Center & Central Auditorium",
    image: hackathonImg,
    badge: "REGISTRATIONS OPEN",
    description:
      "Over 400 collegiate engineers assemble on campus for 36 hours of relentless building across Generative AI, Distributed Data Pipelines, and Civic Intelligence.",
    longBio:
      "DataHacks '26 features direct mentorship from top engineering teams, 1Gbps fiber connectivity, midnight catering, compute credits, and a dedicated hardware lab.",
    ticketPrice: "₹2,50,000+ PRIZE POOL",
    socials: {
      x: "https://x.com/DSC_VITB",
      github: "https://github.com/cdsvitbhopal",
    },
  },
  {
    id: "llms-in-production-2026",
    title: "LLMs in Production: Architecture & Telemetry",
    speaker: "Rohan Varma",
    role: "Staff Platform Engineer & Open Source Contributor",
    category: "TECH TALK",
    date: "Wednesday, Dec 02, 2026",
    time: "5:30 PM - 7:30 PM IST",
    venue: "Seminar Hall 2 // Virtual Stream Available",
    image: talkImg,
    badge: "KEYNOTE",
    description:
      "A deep technical breakdown of high-throughput model serving, prompt caching strategies, semantic vector routing, and minimizing GPU memory latency.",
    longBio:
      "Explore real production architectural telemetry from systems serving millions of daily inferences. Understand latency bottlenecks, quantized inference, and evaluation guardrails.",
    ticketPrice: "OPEN REGISTRATION",
    socials: {
      x: "https://x.com/DSC_VITB",
      linkedin: "https://linkedin.com/company/dsc-vitb",
    },
  },
];

const pastEvents: SiloEventData[] = [
  {
    id: "datahacks-25",
    title: "DataHacks '25",
    speaker: "DSC Core Team & Faculty Mentors",
    role: "National Hackathon",
    category: "HACKATHON",
    date: "Sunday, Oct 20, 2025",
    time: "36 Continuous Hours",
    venue: "Innovation Center, VIT Bhopal",
    image: hackathonImg,
    badge: "COMPLETED",
    description:
      "240 collegiate builders, 62 functional machine learning prototypes, and ₹1,50,000 distributed in bounties across 4 competitive tracks.",
    longBio:
      "DataHacks '25 established our benchmark for collegiate AI hackathons, featuring live telemetry dashboards, automated test pipelines, and guest mentors from top tech companies.",
    ticketPrice: "ARCHIVED",
  },
  {
    id: "python-for-data-2025",
    title: "Python for Data & Analytics Sprint",
    speaker: "DSC Technical Leads",
    role: "Core Curriculum Workshop",
    category: "WORKSHOP",
    date: "Friday, Aug 08, 2025",
    time: "2:00 PM - 6:00 PM IST",
    venue: "Lab Complex 3",
    image: workshopImg,
    badge: "COMPLETED",
    description:
      "Comprehensive training covering multi-indexed Pandas dataframes, vectorized NumPy mathematics, and publication-ready statistical visualizations.",
    longBio:
      "Over 180 freshmen and sophomore students completed the hands-on sprint and earned verifiable certificate badges logged to their student dossiers.",
    ticketPrice: "ARCHIVED",
  },
  {
    id: "dsc-onboarding-2025",
    title: "DSC Onboarding & Keynote Reveal",
    speaker: "Club Presidents & Domain Leads",
    role: "Community Welcome Sprint",
    category: "COMMUNITY",
    date: "Saturday, Aug 02, 2025",
    time: "6:00 PM - 8:30 PM IST",
    venue: "Open Air Theatre (OAT)",
    image: teamImg,
    badge: "COMPLETED",
    description:
      "Welcoming our 2025 student cohort with lightning architecture demos, project showcase unveilings, and open networking sessions.",
    longBio:
      "An electric evening bringing together 600+ students across campus to discover open research domains, recruitment tracks, and technical bootcamps.",
    ticketPrice: "ARCHIVED",
  },
];

function Events() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedEvent, setSelectedEvent] = useState<SiloEventData | null>(null);

  const displayList = tab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-sky-400 selection:text-black">
      <Navbar />

      <main className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl border border-sky-400/40 bg-sky-950/40 flex items-center justify-center font-mono text-xs font-bold text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                03
              </span>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/30 px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-sky-400">
                <span className="size-1.5 rounded-full bg-sky-400" />
                <span>CALENDAR & SPRINTS</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-3 leading-none">
              EVENTS & HACKATHONS
            </h1>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-xl">
              From 36-hour hackathons to deep learning bootcamps — reserve seats or explore past
              telemetry archives.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-full border border-sky-400/25 bg-black/60 backdrop-blur-md">
            <button
              onClick={() => setTab("upcoming")}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                tab === "upcoming"
                  ? "bg-sky-400 text-black font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              UPCOMING ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setTab("past")}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                tab === "past"
                  ? "bg-sky-400 text-black font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ARCHIVE ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayList.map((evt) => (
            <article
              key={evt.id}
              onClick={() => setSelectedEvent(evt)}
              className="group relative rounded-3xl border border-sky-400/20 bg-[#050814] p-5 sm:p-6 flex flex-col justify-between hover:border-sky-400/80 hover:shadow-[0_0_40px_rgba(56,189,248,0.22)] hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer"
            >
              {/* Poster Art with Cyber Overlay */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-sky-400/20 bg-slate-950">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[10px] font-mono tracking-wider">
                  <span className="text-sky-300 font-bold bg-black/80 px-2.5 py-1 rounded-md border border-sky-400/30 backdrop-blur-md">
                    DSC LABS
                  </span>
                  <span className="text-slate-300 uppercase bg-black/80 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                    {evt.category}
                  </span>
                </div>

                {/* Floating Status Badge */}
                {evt.badge && (
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-sky-400 text-black text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
                      {evt.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Information */}
              <div className="mt-5 space-y-3">
                <div className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">
                  {evt.date.split(",")[0]}
                </div>
                <h2 className="text-xl font-black uppercase text-white tracking-tight leading-snug group-hover:text-sky-300 transition-colors">
                  {evt.title}
                </h2>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                <div className="space-y-2 text-[11px] font-mono text-slate-400 border-t border-sky-400/15 pt-3.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-3.5 text-sky-400 shrink-0" />
                    <span className="text-slate-300 truncate">{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-3.5 text-sky-400 shrink-0" />
                    <span className="text-slate-300 truncate">{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5 text-sky-400 shrink-0" />
                    <span className="text-slate-300 truncate">{evt.venue}</span>
                  </div>
                </div>

                <div className="pt-3">
                  <span className="inline-flex w-full items-center justify-center rounded-xl border border-sky-400/30 bg-sky-950/20 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-sky-300 group-hover:bg-sky-400 group-hover:text-black group-hover:border-sky-400 transition-all duration-300">
                    VIEW SESSION DETAILS
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Quick Registration Callout */}
        <div className="rounded-3xl border border-sky-400/25 bg-[#030610] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              LOOKING TO SECURE YOUR ENTRY PASS?
            </h3>
            <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl">
              Access individual and team RSVPs with cryptographic QR check-in passes on the official
              registration desk.
            </p>
          </div>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-8 py-3.5 text-xs font-mono font-bold tracking-wider text-black uppercase hover:bg-sky-300 hover:scale-[1.03] transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] cursor-pointer shrink-0"
          >
            <Ticket className="size-4" />
            <span>OPEN REGISTRATION DESK</span>
          </Link>
        </div>
      </main>

      <FooterSection />

      {/* Interactive Detail Modal */}
      <SiloEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
