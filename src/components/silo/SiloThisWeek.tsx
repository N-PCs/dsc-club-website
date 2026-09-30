import React from "react";
import { Link } from "@tanstack/react-router";
import { SiloEventData } from "./SiloEventModal";
import { thisWeekEvents } from "./siloData";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";

interface SiloThisWeekProps {
  onSelectEvent: (event: SiloEventData) => void;
}

export const SiloThisWeek: React.FC<SiloThisWeekProps> = ({ onSelectEvent }) => {
  return (
    <section id="events" className="w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header (Sleek SILO spacing and hierarchy) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-xl border border-sky-400/40 bg-sky-950/40 flex items-center justify-center font-mono text-xs font-bold text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              03
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              This week at DSC
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2">
            Flagship bootcamps, 36-hour hackathons, and technical deep-dives with open reservations.
          </p>
        </div>

        <div>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 px-6 py-2.5 text-xs font-mono font-medium tracking-wider text-slate-300 hover:text-white hover:border-sky-400 hover:bg-sky-400/10 transition-colors uppercase cursor-pointer"
          >
            <span>VIEW ALL SPRINTS</span>
            <ArrowRight className="size-3 text-sky-400" />
          </Link>
        </div>
      </div>

      {/* 3 Showcase Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {thisWeekEvents.map((evt) => (
          <article
            key={evt.id}
            onClick={() => onSelectEvent(evt)}
            className="group relative rounded-3xl border border-sky-400/20 bg-[#050814] p-5 sm:p-6 flex flex-col justify-between hover:border-sky-400/80 hover:shadow-[0_0_40px_rgba(56,189,248,0.25)] hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer"
          >
            {/* Poster Art with Cyber Details */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-sky-400/20 bg-slate-950">
              <img
                src={evt.image}
                alt={evt.title}
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />

              {/* Poster Top Badges */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between text-[10px] font-mono tracking-wider">
                <span className="text-sky-300 font-bold bg-black/70 px-2.5 py-1 rounded-md border border-sky-400/40 backdrop-blur-md">
                  DSC LABS
                </span>
                <span className="text-slate-300 uppercase bg-black/70 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                  {evt.category}
                </span>
              </div>

              {/* Poster Bottom Text */}
              <div className="absolute bottom-4 inset-x-4">
                <div className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">
                  {evt.date.split(",")[0]} — 2026
                </div>
                <div className="text-base sm:text-lg font-black uppercase text-white tracking-tight leading-tight mt-1">
                  {evt.title}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1 uppercase">
                  WITH SUPPORT FROM DSC CORE MENTORS
                </div>
              </div>

              {/* Floating Status Badge */}
              {evt.badge && (
                <div className="absolute bottom-3 right-3 rotate-[-4deg]">
                  <span className="bg-sky-400 text-black text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
                    {evt.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Card Information */}
            <div className="mt-5 space-y-3">
              <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                {evt.speaker}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {evt.description}
              </p>

              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-slate-400 border-t border-sky-400/15 pt-3.5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3 text-sky-400 shrink-0" />
                  <span className="text-slate-300 truncate">
                    {evt.date.split(",")[1] || evt.date}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3 text-sky-400 shrink-0" />
                  <span className="text-slate-300 truncate">{evt.time.split("-")[0]}</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <MapPin className="size-3 text-sky-400 shrink-0" />
                  <span className="text-slate-300 truncate">{evt.venue}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex w-full items-center justify-center rounded-xl border border-sky-400/30 bg-sky-950/20 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-sky-300 group-hover:bg-sky-400 group-hover:text-black group-hover:border-sky-400 transition-all">
                  VIEW SESSION DETAILS
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
