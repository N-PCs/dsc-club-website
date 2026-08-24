import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { X, ZoomIn } from "lucide-react";
import { gsap } from "gsap";
import { PageHeader } from "@/components/site/Ambient";
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
  { img: hackathonImg, tag: "DataHacks '25 Showcase", aspect: "col-span-2 row-span-2 md:h-[420px]" },
  { img: workshopImg, tag: "PyTorch Deep Learning Lab", aspect: "col-span-1 row-span-1 md:h-[200px]" },
  { img: talkImg, tag: "AI Platforms Session", aspect: "col-span-1 row-span-1 md:h-[200px]" },
  { img: teamImg, tag: "Core Developer Sprint", aspect: "col-span-2 row-span-1 md:h-[200px]" },
  { img: workshopImg, tag: "Neural Networks Setup", aspect: "col-span-1 row-span-2 md:h-[420px]" },
  { img: talkImg, tag: "Industry Telemetry Meetup", aspect: "col-span-1 row-span-1 md:h-[200px]" },
  { img: hackathonImg, tag: "Campus Datathon Sprint", aspect: "col-span-1 row-span-1 md:h-[200px]" },
  { img: teamImg, tag: "Onboarding Celebration", aspect: "col-span-1 row-span-1 md:h-[200px]" },
];

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate items on mount
    if (galleryRef.current) {
      gsap.from(galleryRef.current.children, {
        opacity: 0,
        scale: 0.9,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <div className="px-6 pt-36 pb-20 lg:px-16">
      {/* Header */}
      <PageHeader
        eyebrow="PORTFOLIO"
        title="Moments from the lab"
        subtitle="Exploring the milestones, prototype sprints, and community hack nights."
      />

      {/* Asymmetric Masonry Masonry Grid */}
      <div 
        ref={galleryRef} 
        className="mx-auto mt-16 grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max"
      >
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className={`glass glass-hover group relative overflow-hidden rounded-3xl p-0 block w-full text-left ${p.aspect}`}
          >
            {/* Visual Overlays & Hover zoom */}
            <div className="relative size-full overflow-hidden">
              <img
                src={p.img}
                alt={p.tag}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Dark layout cover */}
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors duration-300" />
              
              {/* Zoom Trigger visual indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="p-4 rounded-full bg-slate-950/80 border border-white/20 text-accent shadow-glow">
                  <ZoomIn className="size-5" />
                </span>
              </div>
            </div>

            {/* Custom info tags */}
            <span className="absolute bottom-4 left-4 bg-slate-950/80 border border-white/10 px-4 py-1.5 font-mono text-[9px] uppercase tracking-widest text-accent rounded-full backdrop-blur-md">
              {p.tag}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox Modal (Custom GSAP animated overlay effect) */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xl transition-all"
          onClick={() => setOpen(null)}
        >
          <div 
            className="glass relative max-w-4xl overflow-hidden rounded-3xl border border-white/10" 
            onClick={(e) => e.stopPropagation()}
          >
            <img src={photos[open]!.img} alt={photos[open]!.tag} className="max-h-[70vh] w-full object-contain" />
            
            <div className="flex items-center justify-between p-6 bg-slate-900/60 border-t border-white/5">
              <span className="font-mono text-xs uppercase tracking-widest text-white">
                {photos[open]!.tag}
              </span>
              <button 
                onClick={() => setOpen(null)} 
                className="btn-glass rounded-xl p-2.5 hover:bg-white/10" 
                aria-label="Close Lightbox"
              >
                <X className="size-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
