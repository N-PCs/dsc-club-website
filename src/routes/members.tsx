import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { gsap } from "gsap";
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
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade and translate on filtering
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [active]);

  return (
    <div className="px-6 pt-36 pb-20 lg:px-16">
      {/* Header */}
      <PageHeader
        eyebrow="TEAM & LEADERSHIP"
        title="The minds behind DSC"
        subtitle="Students, coordinators, and domain mentors driving workshops, software, and research."
      />

      <div className="mx-auto mt-20 max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Left Column: Filter panel */}
          <div className="lg:col-span-3 lg:sticky lg:top-32 h-fit">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">ROSTER DEPARTMENTS</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-white">Filter Team</h2>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              Toggle different active groups within our local cohort directory.
            </p>

            <div className="mt-8 flex flex-col gap-2">
              {groups.map((g) => (
                <button
                  key={g}
                  onClick={() => setActive(g)}
                  className={`w-full rounded-xl py-3 px-5 font-mono text-xs uppercase tracking-widest text-left transition-all border ${
                    active === g 
                      ? "bg-white text-slate-950 font-bold border-white" 
                      : "text-slate-400 hover:text-white border-white/5 bg-slate-900/10"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Member Dossiers Asymmetric Grid */}
          <div 
            ref={gridRef} 
            className="lg:col-span-9 grid gap-6 sm:grid-cols-2 md:grid-cols-3"
          >
            {shown.map((m) => (
              <article 
                key={m.name} 
                className="glass glass-hover group relative rounded-3xl border border-white/5 p-6 text-center flex flex-col justify-between"
              >
                <div>
                  {/* Glowing Dossier Avatar */}
                  <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-white/5 bg-slate-950 font-display text-xl font-bold text-white group-hover:border-primary group-hover:shadow-glow transition-all duration-300">
                    {initials(m.name)}
                  </div>
                  
                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {m.name}
                  </h3>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-accent">
                    {m.role}
                  </p>
                  <p className="mt-3 text-xs text-slate-400">
                    {m.dept}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 flex justify-center gap-2">
                  {[
                    { Icon: Github, href: "https://github.com" },
                    { Icon: Linkedin, href: "https://linkedin.com" },
                    { Icon: Twitter, href: "https://twitter.com" }
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} social profile`}
                      className="btn-glass rounded-xl p-2.5 text-slate-400 hover:text-white hover:border-white/20 transition-all"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
