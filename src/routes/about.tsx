import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Code2, Mic, Trophy } from "lucide-react";
import { PageHeader } from "@/components/site/Ambient";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DSC Club VITB" },
      {
        name: "description",
        content:
          "Mission, vision and focus areas of DSC Club VITB: AI/ML, data engineering, analytics and competitive programming at VIT Bhopal.",
      },
      { property: "og:title", content: "About — DSC Club VITB" },
      {
        property: "og:description",
        content: "What the Data Science Club of VIT Bhopal builds, teaches and ships.",
      },
    ],
  }),
  component: About,
});

const doCards = [
  { icon: BookOpen, title: "Workshops", text: "Weekly hands-on sessions from pandas basics to transformer fine-tuning." },
  { icon: Mic, title: "Industry Talks", text: "Practitioners from analytics, ML platforms and research share real workflows." },
  { icon: Trophy, title: "Hackathons", text: "Flagship 36-hour builds plus Kaggle sprints and datathons every semester." },
  { icon: Code2, title: "Open Source", text: "Maintained club repos, mentored contributions and Hacktoberfest drives." },
];

const stack = ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "SQL", "Docker", "Spark", "Pandas"];

function About() {
  return (
    <div className="px-4 pt-36 pb-10">
      <PageHeader
        eyebrow="About the club"
        title="A campus lab for data builders"
        subtitle="We turn curiosity into shipped models, dashboards and research — together."
      />

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2">
        <div className="glass relative overflow-hidden rounded-3xl p-8">
          <div className="glow-orb -right-20 -top-20 size-64 bg-primary" />
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-silver">Our Mission</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Make data science accessible to every student at VIT Bhopal by pairing rigorous
            fundamentals with real projects, mentorship and an open, collaborative culture.
          </p>
        </div>
        <div className="glass relative overflow-hidden rounded-3xl p-8">
          <div className="glow-orb -left-20 -bottom-20 size-64 bg-silver" />
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Our Vision</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            To become central India's most active student data community — known for AI/ML research,
            data engineering craft, analytics depth and competitive programming strength.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl">
        <h2 className="text-3xl font-bold sm:text-4xl">What We Do</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doCards.map((c) => (
            <div key={c.title} className="glass glass-hover rounded-3xl p-6">
              <span className="inline-flex rounded-2xl bg-secondary p-3 text-silver">
                <c.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl">
        <h2 className="text-3xl font-bold sm:text-4xl">Technology Stack</h2>
        <div className="glass mt-8 overflow-hidden rounded-3xl py-6">
          <div className="marquee-track flex w-max gap-4 px-4">
            {[...stack, ...stack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="whitespace-nowrap rounded-2xl border border-border bg-secondary px-6 py-3 font-mono text-sm text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
