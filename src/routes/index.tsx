import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { SiloHero } from "@/components/silo/SiloHero";
import { SiloOurStory } from "@/components/silo/SiloOurStory";
import { SiloDomains } from "@/components/silo/SiloDomains";
import { SiloThisWeek } from "@/components/silo/SiloThisWeek";
import { SiloUpcomingEvents } from "@/components/silo/SiloUpcomingEvents";
import { SiloPlanYourVisit } from "@/components/silo/SiloPlanYourVisit";
import { SiloContact } from "@/components/silo/SiloContact";
import { FooterSection } from "@/components/sections/FooterSection";
import { SiloEventModal, SiloEventData } from "@/components/silo/SiloEventModal";
import { ArrowRight, Users, UserPlus } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DSC Club VITB — Data Science Club of VIT Bhopal" },
      {
        name: "description",
        content:
          "Official Data Science Club of VIT Bhopal — workshops, hackathons, AI/ML projects, and a 1500+ strong builder community.",
      },
      { property: "og:title", content: "DSC Club VITB" },
      {
        property: "og:description",
        content: "Data Science Club of VIT Bhopal — Unlocking insights, driving innovation.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [selectedEvent, setSelectedEvent] = useState<SiloEventData | null>(null);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-sky-400 selection:text-black">
      {/* Retain the original Navbar (RadialMenu with top-left brand & top-right toggle) */}
      <Navbar />

      <main className="relative">
        {/* Hero Section with Dummy Looping Video Background & Dynamic Scroll Scaling */}
        <SiloHero />

        {/* 01 // About & Philosophy (Manifesto with intelligence & engineering pills) */}
        <SiloOurStory />

        {/* 02 // Sub-Domains Division (ML, Data Eng, Interactive Dev, Analytics + Live Video) */}
        <SiloDomains />

        {/* 03 // This Week Section (Featured Flagships & Detailed Cyber Posters) */}
        <SiloThisWeek onSelectEvent={(event) => setSelectedEvent(event)} />

        {/* Upcoming Events Grid (2-Row / 4-Col Grid of Cyber Cards) */}
        <SiloUpcomingEvents onSelectEvent={(event) => setSelectedEvent(event)} />

        {/* Plan Your Visit / Campus Logistics (7 Vertical Pill Cards & Inspection Panel) */}
        <SiloPlanYourVisit />

        {/* Multi-Page Navigation Teaser (Members Dossier & Join Core Team) */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Members Dossier Card */}
            <div className="rounded-3xl border border-sky-400/20 bg-[#050814] p-8 sm:p-12 flex flex-col justify-between hover:border-sky-400/70 hover:shadow-[0_0_40px_rgba(56,189,248,0.2)] transition-all group">
              <div>
                <div className="flex items-center gap-2 text-sky-400 font-mono text-[11px] uppercase tracking-widest font-semibold">
                  <Users className="size-4" />
                  <span>CORE DOSSIER</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3">
                  Meet the Team
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-3">
                  Discover the faculty mentors, presidents, domain leads, and machine learning
                  engineers orchestrating our campus hackathons and technical sprints.
                </p>
              </div>

              <div className="pt-8">
                <Link
                  to="/members"
                  className="inline-flex items-center gap-2 rounded-full border border-sky-400 bg-sky-400/10 px-7 py-3 text-xs font-mono font-bold uppercase tracking-wider text-sky-300 hover:bg-sky-400 hover:text-black transition-all cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                >
                  <span>Explore Members</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Core Team Recruitment Card */}
            <div className="rounded-3xl border border-sky-400/20 bg-[#050814] p-8 sm:p-12 flex flex-col justify-between hover:border-sky-400/70 hover:shadow-[0_0_40px_rgba(56,189,248,0.2)] transition-all group">
              <div>
                <div className="flex items-center gap-2 text-sky-400 font-mono text-[11px] uppercase tracking-widest font-semibold">
                  <UserPlus className="size-4" />
                  <span>APPLICATIONS ACTIVE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3">
                  Join Core Team
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-3">
                  Ready to shape AI/ML culture at VIT Bhopal? Submit your application for interview
                  rounds across technical development, research, design, and operations.
                </p>
              </div>

              <div className="pt-8">
                <Link
                  to="/join"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-8 py-3 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-sky-300 hover:scale-105 transition-all cursor-pointer shadow-[0_0_25px_rgba(56,189,248,0.4)]"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Inquiry Section */}
        <SiloContact />
      </main>

      {/* Footer */}
      <FooterSection />

      {/* Interactive Event Detail Modal */}
      <SiloEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
