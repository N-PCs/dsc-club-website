import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { PageHeader } from "@/components/site/Ambient";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Members — DSC Club VITB" },
      {
        name: "description",
        content:
          "Meet the executive board, core team, domain leads and mentors driving DSC Club VITB at VIT Bhopal.",
      },
      { property: "og:title", content: "Members — DSC Club VITB" },
      { property: "og:description", content: "The team and leadership behind DSC Club VITB." },
    ],
  }),
  component: Members,
});

const groups = ["All", "Executive Board", "Core Team", "Leads", "Mentors"] as const;

const members = [
  { name: "Aarav Mehta", role: "President", dept: "CSE (AI & ML), '26", group: "Executive Board" },
  { name: "Ishita Rao", role: "Vice President", dept: "CSE (Data Science), '26", group: "Executive Board" },
  { name: "Kabir Nanda", role: "General Secretary", dept: "ECE, '27", group: "Executive Board" },
  { name: "Sanya Kapoor", role: "AI/ML Lead", dept: "CSE (AI & ML), '27", group: "Leads" },
  { name: "Rohan Iyer", role: "Data Engineering Lead", dept: "CSE, '27", group: "Leads" },
  { name: "Meera Joshi", role: "Design Lead", dept: "CSE (UI/UX), '28", group: "Leads" },
  { name: "Dev Sharma", role: "Technical Coordinator", dept: "CSE, '28", group: "Core Team" },
  { name: "Ananya Bose", role: "Content Head", dept: "CSE (Data Science), '28", group: "Core Team" },
  { name: "Vikram Sethi", role: "Events Manager", dept: "Mechanical, '27", group: "Core Team" },
  { name: "Dr. Priya Nair", role: "Faculty Mentor", dept: "School of Computing", group: "Mentors" },
  { name: "Arjun Verma", role: "Alumni Mentor", dept: "Data Scientist, '23", group: "Mentors" },
  { name: "Nisha Pillai", role: "Research Mentor", dept: "School of Computing", group: "Mentors" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

function Members() {
  const [active, setActive] = useState<(typeof groups)[number]>("All");
  const shown = active === "All" ? members : members.filter((m) => m.group === active);

  return (
    <div className="px-4 pt-36 pb-10">
      <PageHeader
        eyebrow="Team & leadership"
        title="The people behind DSC"
        subtitle="Students, leads and mentors who run every workshop, hackathon and research sprint."
      />

      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setActive(g)}
            className={`rounded-xl px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-all ${
              active === g ? "btn-neon" : "btn-glass text-muted-foreground"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((m) => (
          <article key={m.name} className="glass glass-hover rounded-3xl p-6 text-center">
            <div className="mx-auto flex size-24 items-center justify-center rounded-full border border-border bg-secondary font-display text-2xl font-bold text-gradient">
              {initials(m.name)}
            </div>
            <h3 className="mt-5 text-lg font-semibold">{m.name}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-silver">{m.role}</p>
            <p className="mt-2 text-xs text-muted-foreground">{m.dept}</p>
            <div className="mt-5 flex justify-center gap-2">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={`${m.name} social link`}
                  className="btn-glass rounded-xl p-2 text-muted-foreground hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
