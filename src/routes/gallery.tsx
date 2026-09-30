import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import { X, ZoomIn, Camera, Layers } from "lucide-react";
import hackathonImg from "@/assets/event-hackathon.jpg";
import workshopImg from "@/assets/event-workshop.jpg";
import talkImg from "@/assets/event-talk.jpg";
import teamImg from "@/assets/event-team.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — DSC Club VITB" },
      {
        name: "description",
        content:
          "Photos from DSC Club VITB hackathons, tech talks, workshops and team sessions at VIT Bhopal.",
      },
      { property: "og:title", content: "Gallery — DSC Club VITB" },
      { property: "og:description", content: "Moments from DataHacks, bootcamps and tech talks." },
    ],
  }),
  component: Gallery,
});

const photos = [
  {
    img: hackathonImg,
    tag: "DataHacks '25 Main Stage",
    category: "HACKATHON",
    span: "col-span-1 md:col-span-2 md:row-span-2",
  },
  {
    img: workshopImg,
    tag: "PyTorch Deep Learning Lab",
    category: "BOOTCAMP",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    img: talkImg,
    tag: "AI Platforms Keynote",
    category: "TECH TALK",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    img: teamImg,
    tag: "Core Developer Sprint",
    category: "TEAM",
    span: "col-span-1 md:col-span-2 md:row-span-1",
  },
  {
    img: workshopImg,
    tag: "Neural Networks Setup",
    category: "LAB SESSION",
    span: "col-span-1 md:col-span-1 md:row-span-2",
  },
  {
    img: talkImg,
    tag: "Industry Telemetry Meetup",
    category: "COMMUNITY",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    img: hackathonImg,
    tag: "Campus Datathon Sprint",
    category: "HACKATHON",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    img: teamImg,
    tag: "Onboarding Keynote Celebration",
    category: "ANNUAL REVEAL",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
];

function Gallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-sky-400 selection:text-black">
      <Navbar />

      <main className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-xl border border-sky-400/40 bg-sky-950/40 flex items-center justify-center font-mono text-xs font-bold text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                05
              </span>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/30 px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-sky-400">
                <span className="size-1.5 rounded-full bg-sky-400" />
                <span>MEDIA ARCHIVE & TELEMETRY</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-3 leading-none">
              VISUAL DOSSIER
            </h1>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-xl">
              Photographic archives from 36-hour hackathons, hardware bootcamps, and technical
              keynotes across campus.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#050814] border border-sky-400/20 px-4 py-2 rounded-full">
            <Camera className="size-3.5 text-sky-400" />
            <span>{photos.length} ARCHIVED RECORDS</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {photos.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhoto(idx)}
              className={`group relative rounded-3xl overflow-hidden border border-sky-400/20 bg-[#050814] cursor-pointer hover:border-sky-400/80 hover:shadow-[0_0_35px_rgba(56,189,248,0.22)] hover:-translate-y-1 transition-all duration-300 ease-out ${item.span}`}
            >
              <img
                src={item.img}
                alt={item.tag}
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag & Action */}
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between z-10">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md border border-sky-400/30 bg-black/70 text-[9px] font-mono text-sky-400 uppercase tracking-widest backdrop-blur-md mb-1.5">
                    {item.category}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {item.tag}
                  </p>
                </div>

                <div className="size-8 rounded-full border border-sky-400/30 bg-black/60 flex items-center justify-center text-slate-400 group-hover:text-black group-hover:bg-sky-400 group-hover:border-sky-400 transition-all shrink-0">
                  <ZoomIn className="size-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <FooterSection />

      {/* Lightbox Modal */}
      {activePhoto !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-3xl border border-sky-400/40 bg-black shadow-[0_0_60px_rgba(56,189,248,0.3)] p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-10 size-10 rounded-full border border-sky-400/30 bg-black/70 flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-400 transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <img
              src={photos[activePhoto].img}
              alt={photos[activePhoto].tag}
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
            />

            <div className="p-4 flex items-center justify-between font-mono text-xs text-slate-400">
              <span className="text-white font-bold">{photos[activePhoto].tag}</span>
              <span className="text-sky-400">{photos[activePhoto].category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
