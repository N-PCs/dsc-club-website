import React, { useState } from "react";
import {
  X,
  Play,
  Pause,
  Globe,
  Music,
  ExternalLink,
  Calendar,
  MapPin,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface SiloEventData {
  id: string;
  title: string;
  speaker: string;
  role: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  description: string;
  longBio: string;
  badge?: string;
  ticketPrice?: string;
  socials?: {
    x?: string;
    github?: string;
    linkedin?: string;
    youtube?: string;
    spotify?: string;
  };
}

interface SiloEventModalProps {
  event: SiloEventData | null;
  onClose: () => void;
}

export const SiloEventModal: React.FC<SiloEventModalProps> = ({ event, onClose }) => {
  const [showMore, setShowMore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-sky-400/30 bg-[#050813] p-6 sm:p-8 text-white shadow-[0_0_60px_rgba(56,189,248,0.2)] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: "thin", scrollbarColor: "#1e3a8a transparent" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 size-9 rounded-full border border-sky-400/20 bg-black/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-400 transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>

        {/* Top Profile / Showcase */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative shrink-0">
            <img
              src={event.image}
              alt={event.speaker}
              className="size-28 sm:size-32 rounded-2xl object-cover border border-sky-400/40 shadow-lg"
            />
            {event.badge && (
              <span className="absolute -bottom-2 -right-2 bg-sky-400 text-black text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                {event.badge}
              </span>
            )}
          </div>

          <div className="flex-1 pr-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                {event.category}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              {event.speaker}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">{event.role}</p>

            {/* Audio Preview Pill (Directly from inspo.webp) */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider text-sky-300 hover:bg-sky-400 hover:text-black transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="size-3.5 fill-current" />
                  <span>PAUSE PREVIEW</span>
                </>
              ) : (
                <>
                  <Play className="size-3.5 fill-current" />
                  <span>AUDIO PREVIEW</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Event Schedule Info */}
        <div className="mt-6 grid grid-cols-2 gap-3 p-3.5 rounded-2xl border border-sky-400/20 bg-sky-950/20">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Calendar className="size-3.5 text-sky-400 shrink-0" />
            <span>
              {event.date} · {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <MapPin className="size-3.5 text-sky-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* About Artist / Speaker (From inspo.webp) */}
        <div className="mt-6">
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
            About session & speaker
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed mt-2">{event.description}</p>

          {showMore && (
            <p className="text-xs text-slate-400 leading-relaxed mt-3 border-t border-white/5 pt-3 animate-fade-in">
              {event.longBio}
            </p>
          )}

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-3.5 inline-flex items-center rounded-full border border-sky-400/30 px-4 py-1 text-[11px] font-mono uppercase tracking-wider text-sky-300 hover:border-sky-400 hover:text-white transition-colors cursor-pointer"
          >
            {showMore ? "SHOW LESS" : "SHOW MORE"}
          </button>
        </div>

        {/* Social Media Row (From inspo.webp) */}
        <div className="mt-6">
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-3">
            Social media
          </h4>
          <div className="flex items-center gap-2.5 flex-wrap">
            {[
              {
                label: "X",
                icon: "fa-brands fa-x-twitter",
                href: event.socials?.x || "https://x.com/DSC_VITB",
              },
              {
                label: "GitHub",
                icon: "fa-brands fa-github",
                href: event.socials?.github || "https://github.com/cdsvitbhopal",
              },
              {
                label: "LinkedIn",
                icon: "fa-brands fa-linkedin-in",
                href: event.socials?.linkedin || "https://www.linkedin.com/company/dsc-vitb/",
              },
              {
                label: "YouTube",
                icon: "fa-brands fa-youtube",
                href: event.socials?.youtube || "https://youtube.com",
              },
              {
                label: "Spotify",
                icon: "fa-brands fa-spotify",
                href: event.socials?.spotify || "https://spotify.com",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="size-8 rounded-full border border-sky-400/30 bg-black/50 flex items-center justify-center text-sky-400 hover:bg-sky-400 hover:text-black hover:scale-105 transition-all"
              >
                <i className={`${s.icon} text-xs`} />
              </a>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-sky-400/20 flex gap-3">
          <Link
            to="/register/$eventId"
            params={{ eventId: event.id }}
            className="flex-1 py-3 px-6 rounded-full bg-sky-400 text-black font-bold uppercase tracking-wider text-xs hover:bg-sky-300 transition-all text-center shadow-[0_0_20px_rgba(56,189,248,0.4)] cursor-pointer"
          >
            Register For Pass
          </Link>
          <button
            onClick={onClose}
            className="py-3 px-6 rounded-full border border-sky-400/30 text-white font-mono uppercase tracking-wider text-xs hover:bg-white/5 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
