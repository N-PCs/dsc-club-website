import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
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
  { img: hackathonImg, tag: "DataHacks '25", span: "row-span-2" },
  { img: workshopImg, tag: "Python Bootcamp", span: "" },
  { img: talkImg, tag: "AI Talk Series", span: "" },
  { img: teamImg, tag: "Team Bonding", span: "row-span-2" },
  { img: workshopImg, tag: "PyTorch Lab", span: "" },
  { img: talkImg, tag: "Industry Session", span: "" },
  { img: hackathonImg, tag: "Datathon '25", span: "" },
  { img: teamImg, tag: "Core Team Night", span: "" },
];

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="px-4 pt-36 pb-10">
      <PageHeader
        eyebrow="Gallery"
        title="Moments from the club"
        subtitle="Hackathons, tech talks, hands-on labs and the people who make them happen."
      />

      <div className="mx-auto mt-12 grid max-w-6xl auto-rows-[180px] grid-cols-2 gap-4 lg:grid-cols-4">
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className={`glass glass-hover group relative overflow-hidden rounded-3xl p-0 ${p.span}`}
          >
            <img
              src={p.img}
              alt={p.tag}
              loading="lazy"
              width={1024}
              height={768}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-silver backdrop-blur">
              {p.tag}
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/85 p-4 backdrop-blur-xl"
          onClick={() => setOpen(null)}
        >
          <div className="glass relative max-w-3xl overflow-hidden rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <img src={photos[open]!.img} alt={photos[open]!.tag} className="w-full object-cover" />
            <div className="flex items-center justify-between p-5">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-silver">
                {photos[open]!.tag}
              </span>
              <button onClick={() => setOpen(null)} className="btn-glass rounded-xl p-2" aria-label="Close">
                <X className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
