import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Cpu, Rocket, Sparkles } from "lucide-react";
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
  { value: "1500+", label: "Members" },
  { value: "40+", label: "Events Hosted" },
  { value: "15+", label: "Projects Built" },
  { value: "5+", label: "Hackathons" },
];

const highlights = [
  {
    img: workshopImg,
    tag: "Upcoming Workshop",
    icon: Sparkles,
    title: "Deep Learning with PyTorch",
    text: "A three-day hands-on bootcamp covering tensors, autograd and training your first vision model.",
  },
  {
    img: hackathonImg,
    tag: "Flagship Hackathon",
    icon: Rocket,
    title: "DataHacks '25 Recap",
    text: "36 hours, 240 participants, 62 shipped prototypes solving real campus and civic datasets.",
  },
  {
    img: talkImg,
    tag: "Research Track",
    icon: Cpu,
    title: "AI Research Lab",
    text: "Student-led work on multimodal retrieval, time-series forecasting and LLM evaluation.",
  },
];

function Home() {
  return (
    <div>
      <section className="relative px-4 pt-36 pb-20 sm:pt-44">
        <div className="mx-auto max-w-5xl text-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-silver">
            <span className="dot-pulse size-1.5 rounded-full bg-primary" />
            VIT Bhopal · Est. 2021
          </span>
          <h1 className="mt-8 text-5xl font-bold leading-[1.05] sm:text-7xl lg:text-8xl">
            <span className="text-gradient">Unlocking Insights.</span>
            <br />
            <span className="text-gradient">Driving Innovation.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            The Official Data Science Club of VIT Bhopal.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/join" className="btn-neon rounded-xl px-6 py-3 font-semibold">
              Join the Club
            </Link>
            <Link to="/events" className="btn-glass rounded-xl px-6 py-3 font-semibold">
              Explore Events
            </Link>
          </div>
        </div>

        <div className="glass mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-8 text-center">
              <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold sm:text-4xl">Featured Highlights</h2>
            <Link
              to="/events"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em] text-silver"
            >
              All events <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {highlights.map((h) => (
              <article key={h.title} className="glass glass-hover overflow-hidden rounded-3xl">
                <img
                  src={h.img}
                  alt={h.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-44 w-full object-cover"
                />
                <div className="p-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    <h.icon className="size-3" /> {h.tag}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{h.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
