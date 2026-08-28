import React, { useState } from "react";
import ChromaGrid, { ChromaItem } from "@/components/ui/ChromaGrid";
import "./TeamSection.css";

interface TeamMember extends ChromaItem {
  group: "Executive Board" | "Leads" | "Core Team" | "Mentors";
}

const teamMembers: TeamMember[] = [
  {
    title: "Aarav Mehta",
    subtitle: "President",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    borderColor: "#00d2ff",
    gradient: "linear-gradient(145deg, rgba(0, 210, 255, 0.2) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Executive Board",
  },
  {
    title: "Ishita Rao",
    subtitle: "Vice President",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    borderColor: "#ec4899",
    gradient: "linear-gradient(145deg, rgba(236, 72, 153, 0.2) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Executive Board",
  },
  {
    title: "Kabir Nanda",
    subtitle: "General Secretary",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    borderColor: "#10b981",
    gradient: "linear-gradient(145deg, rgba(16, 185, 129, 0.2) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Executive Board",
  },
  {
    title: "Sanya Kapoor",
    subtitle: "AI/ML Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
    borderColor: "#8b5cf6",
    gradient: "linear-gradient(145deg, rgba(139, 92, 246, 0.2) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Leads",
  },
  {
    title: "Rohan Iyer",
    subtitle: "Data Engineering Lead",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80",
    borderColor: "#f59e0b",
    gradient: "linear-gradient(145deg, rgba(245, 158, 11, 0.2) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Leads",
  },
  {
    title: "Meera Joshi",
    subtitle: "Design Lead",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80",
    borderColor: "#06b6d4",
    gradient: "linear-gradient(145deg, rgba(6, 182, 212, 0.2) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Leads",
  },
  {
    title: "Dev Sharma",
    subtitle: "Technical Coordinator",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    borderColor: "#3b82f6",
    gradient: "linear-gradient(145deg, rgba(59, 130, 246, 0.2) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Core Team",
  },
  {
    title: "Ananya Bose",
    subtitle: "Content Head",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    borderColor: "#ef4444",
    gradient: "linear-gradient(145deg, rgba(239, 68, 68, 0.2) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Core Team",
  },
  {
    title: "Vikram Sethi",
    subtitle: "Events Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    borderColor: "#10b981",
    gradient: "linear-gradient(145deg, rgba(16, 185, 129, 0.2) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Core Team",
  },
  {
    title: "Dr. Priya Nair",
    subtitle: "Faculty Mentor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    borderColor: "#00d2ff",
    gradient: "linear-gradient(145deg, rgba(0, 210, 255, 0.25) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Mentors",
  },
  {
    title: "Arjun Verma",
    subtitle: "Alumni Mentor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    borderColor: "#8b5cf6",
    gradient: "linear-gradient(145deg, rgba(139, 92, 246, 0.25) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Mentors",
  },
  {
    title: "Nisha Pillai",
    subtitle: "Research Mentor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80",
    borderColor: "#ec4899",
    gradient: "linear-gradient(145deg, rgba(236, 72, 153, 0.25) 0%, rgba(11, 19, 41, 0.95) 100%)",
    group: "Mentors",
  },
];

const groups = ["All", "Executive Board", "Leads", "Core Team", "Mentors"] as const;

export const TeamSection: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>("All");

  const filteredMembers =
    activeGroup === "All"
      ? teamMembers
      : teamMembers.filter((m) => m.group === activeGroup);

  return (
    <section id="team" className="content-section">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-eyebrow">TEAM & LEADERSHIP</span>
          <h2 className="section-title">
            The Minds Behind <span className="gradient-text">DSC VITB</span>
          </h2>
          <p className="section-subtitle">
            Students, coordinators, and domain mentors driving workshops, software pipelines, and AI research.
          </p>
        </div>

        <div className="team-layout margin-top-lg">
          {/* Restored Sidebar Department Selector */}
          <div className="team-sidebar">
            <span className="filter-label">ROSTER DEPARTMENTS</span>
            <h3 className="filter-title">Filter Team</h3>
            <div className="team-filter-group">
              {groups.map((g) => (
                <button
                  key={g}
                  className={`team-tab-btn ${activeGroup === g ? "active" : ""}`}
                  onClick={() => setActiveGroup(g)}
                >
                  {g === "All" ? "All Members" : g}
                </button>
              ))}
            </div>
          </div>

          {/* Compact ChromaGrid Roster */}
          <div className="team-grid-area" style={{ width: "100%", position: "relative" }}>
            <ChromaGrid
              items={filteredMembers}
              radius={240}
              columns={3}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
