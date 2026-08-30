import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TeamCard, type TeamMemberData } from "@/components/site/TeamCard";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Team & Roster — DSC VIT Bhopal" },
      {
        name: "description",
        content:
          "Meet the core leads, AI researchers, and data engineers powering the Data Science Club at VIT Bhopal.",
      },
    ],
  }),
  component: MembersRoute,
});

function MembersRoute() {
  const members: TeamMemberData[] = [
    {
      id: "tm-1",
      name: "Aarav Sharma",
      role: "Club President & AI Lead",
      bio: "Senior AI researcher building open-weight LLMs and distributed deep learning pipelines.",
      imgUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      accentColor: "#1B2A6B",
    },
    {
      id: "tm-2",
      name: "Ananya Verma",
      role: "Vice President & Data Ops Lead",
      bio: "Data Infrastructure specialist passionate about Apache Kafka, Docker, and cloud data architecture.",
      imgUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      accentColor: "#1B2A6B",
    },
    {
      id: "tm-3",
      name: "Rohan Patel",
      role: "AI Research Lead",
      bio: "Computer Vision & Transformer developer focusing on multimodal neural networks.",
      imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      accentColor: "#1B2A6B",
    },
    {
      id: "tm-4",
      name: "Diya Gupta",
      role: "Data Engineering Lead",
      bio: "ETL pipeline engineer mastering Apache Spark, PostgreSQL, and MLOps workflows.",
      imgUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      accentColor: "#1B2A6B",
    },
  ];

  return (
    <div className="min-h-screen bg-[#C2D9FF] text-[#0B1E36] p-6 sm:p-12 lg:p-16 relative">
      {/* Top Nav Bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between pb-8 border-b border-[#1B2A6B]/20 mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1B2A6B] font-mono text-xs font-bold border border-[#1B2A6B]/30 shadow-xs hover:bg-[#1B2A6B] hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO CHAPTER SCROLLETTING</span>
        </Link>
        <span className="font-mono text-xs font-bold opacity-60">CHAPTER 05 // CORE ROSTER</span>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="num-circle bg-[#1B2A6B] text-white border-[#1B2A6B] mx-auto">
            05
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-slate-900">
            Meet the <span className="text-[#1B2A6B]">Engineers & Leads</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            The passionate minds behind workshops, hackathons, and open-source projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m) => (
            <TeamCard key={m.id} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
}
