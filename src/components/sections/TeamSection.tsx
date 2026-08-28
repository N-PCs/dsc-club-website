import React, { useState } from "react";

interface Member {
  name: string;
  role: string;
  dept: string;
  group: "Executive Board" | "Leads" | "Core Team" | "Mentors";
}

const members: Member[] = [
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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

const groups = ["All", "Executive Board", "Leads", "Core Team", "Mentors"] as const;

export const TeamSection: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>("All");

  const filteredMembers =
    activeGroup === "All"
      ? members
      : members.filter((m) => m.group === activeGroup);

  return (
    <section id="team" className="content-section">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-eyebrow">TEAM & LEADERSHIP</span>
          <h2 className="section-title">
            The Minds Behind <span className="gradient-text">DSC</span>
          </h2>
          <p className="section-subtitle">
            Students, coordinators, and domain mentors driving workshops, software,
            and research.
          </p>
        </div>

        <div className="team-layout margin-top-lg">
          {/* Sidebar Filter */}
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

          {/* Member Grid */}
          <div className="team-grid">
            {filteredMembers.map((m) => (
              <div key={m.name} className="member-card glass-card">
                <div className="member-avatar">{getInitials(m.name)}</div>
                <h4 className="member-name">{m.name}</h4>
                <span className="member-role">{m.role}</span>
                <p className="member-dept">{m.dept}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
