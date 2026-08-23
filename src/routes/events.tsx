import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
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
    text: "Three days of tensors, autograd and training a vision model end to end.",
  },
  {
    img: talkImg,
    title: "Industry Talk: LLMs in Production",
    date: "26 Sep 2026 · 5:30 PM",
    place: "Seminar Hall 2",
    text: "An ML platform engineer on evaluation, guardrails and inference cost.",
  },
  {
    img: hackathonImg,
    title: "DataHacks '26",
    date: "18 Oct 2026 · 9:00 AM",
    place: "Innovation Center",
    text: "Our flagship 36-hour hackathon on open civic and campus datasets.",
  },
];

const past = [
  {
    img: hackathonImg,
    title: "DataHacks '25",
    date: "20 Oct 2025",
    place: "Innovation Center",
    text: "240 participants, 62 prototypes, 36 hours of building.",
  },
  {
    img: workshopImg,
    title: "Python for Data Bootcamp",
    date: "08 Aug 2025",
    place: "Lab Complex 3",
    text: "Beginner-friendly pandas, numpy and visualization intensive.",
  },
  {
    img: teamImg,
    title: "DSC Onboarding Night",
    date: "02 Aug 2025",
    place: "Open Air Theatre",
    text: "Team bonding, project showcase and the new core team reveal.",
  },
];

function Events() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = tab === "upcoming" ? upcoming : past;

  return (
    <div className="px-4 pt-36 pb-10">
      <PageHeader
        eyebrow="Calendar"
        title="Events that ship skills"
        subtitle="From weekend bootcamps to 36-hour hackathons — here's what's happening."
      />

      <div className="glass mx-auto mt-10 flex w-fit gap-1 rounded-2xl p-1">
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-all ${
              tab === t ? "btn-neon" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "upcoming" ? "Upcoming Events" : "Past Events"}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
        {list.map((e) => (
          <article key={e.title} className="glass glass-hover overflow-hidden rounded-3xl">
            <img
              src={e.img}
              alt={e.title}
              loading="lazy"
              width={1024}
              height={768}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold">{e.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-silver">
                  <CalendarDays className="size-3" /> {e.date}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  <MapPin className="size-3" /> {e.place}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{e.text}</p>
              <button
                className={`mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-semibold ${
                  tab === "upcoming" ? "btn-neon" : "btn-glass"
                }`}
              >
                {tab === "upcoming" ? "Register Now" : "View Recap"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
