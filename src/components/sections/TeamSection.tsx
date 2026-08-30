import React, { useState, useEffect } from "react";
import ChromaGrid, { ChromaItem } from "@/components/ui/ChromaGrid";
import "./TeamSection.css";

export interface TeamMember extends ChromaItem {
  group:
    | "Panel"
    | "HR Team"
    | "Event Management Team"
    | "PR & Outreach Team"
    | "Content Team"
    | "Technical Team"
    | "Social Media Team"
    | "Design Team"
    | "Photography Team"
    | "Software Dev Team";
  role: string;
}

const createMember = (
  name: string,
  role: string,
  group: TeamMember["group"],
  borderColor: string,
  rgbGlow: string
): TeamMember => ({
  title: name,
  subtitle: `${role} • ${group}`,
  group,
  role,
  borderColor,
  gradient: `linear-gradient(145deg, rgba(${rgbGlow}, 0.22) 0%, rgba(11, 19, 41, 0.95) 100%)`,
  image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0b1329&color=${borderColor.replace('#', '')}&bold=true&font-size=0.38`
});

const teamMembers: TeamMember[] = [
  // PANEL (METALLIC SILVER)
  createMember("Divish Jain", "President", "Panel", "#cbd5e1", "203, 213, 225"),
  createMember("Kritika Maurya", "Vice President", "Panel", "#cbd5e1", "203, 213, 225"),
  createMember("Aman Panday", "General Secretary", "Panel", "#cbd5e1", "203, 213, 225"),
  createMember("Somya Tiwari", "Joint Secretary", "Panel", "#cbd5e1", "203, 213, 225"),
  createMember("Shriyash Sahu", "Ops Manager", "Panel", "#cbd5e1", "203, 213, 225"),

  // HR TEAM (HOT PINK)
  createMember("Aditya Saini", "Lead", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Vedant Patil", "Co-Lead", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Gargi Singh", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Swagatika Priyadarshini Sahoo", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Tanisha Sethi", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Mitali Pandey", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Aryan Awasthi", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Aryan Raj Mishra", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),

  // EVENT MANAGEMENT TEAM (GOLDEN AMBER)
  createMember("Ayush Gupta", "Lead", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Arunika Bag", "Co-Lead", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Ashutosh Shrivastava", "Co-Lead", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Divyansh Dhimole", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Akshat Mujmer", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Anshima", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Nilesh Ugale", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Ayush Ranjan", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Prashant Dubey", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Rakshit Yadav", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Anushka Dubey", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Bhawesh Kumar Gautam", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Sandeep Ganesh", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Anvesha Agrawal", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Satwik Singh", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Anushka Sahu", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Khushi Thakur", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Krishna Nishad", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Tejal Sharma", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Abhinav Gomra", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Siddhi Gupta", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),
  createMember("Salam Khan", "Core Member", "Event Management Team", "#f59e0b", "245, 158, 11"),

  // PR AND OUTREACH TEAM (NEON PURPLE)
  createMember("Shalini Pal", "Lead", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Soumya Chouhan", "Co-Lead", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Sousthab Mitra", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Pranjal Bhatnagar", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Anandita Sharma", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Karan Kumar Gupta", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Sivi Shrivastav", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Vijval Singh", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),

  // CONTENT TEAM (ELECTRIC TEAL)
  createMember("Jihi Mamtani", "Lead", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Anusha Singh Rajput", "Co-Lead", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Shruti Mishra", "Core Member", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Akshat Singh", "Core Member", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Ananya Pandey", "Core Member", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Bhavesh Wadhwani", "Core Member", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Ashi Gupta", "Core Member", "Content Team", "#06b6d4", "6, 182, 212"),

  // TECHNICAL TEAM (EMERALD GREEN)
  createMember("Sumit Tripathi", "Lead", "Technical Team", "#10b981", "16, 185, 129"),
  createMember("Abhishek Bochare", "Core Member", "Technical Team", "#10b981", "16, 185, 129"),
  createMember("Sparsh Kapoor", "Core Member", "Technical Team", "#10b981", "16, 185, 129"),
  createMember("Harshit Mohta", "Core Member", "Technical Team", "#10b981", "16, 185, 129"),
  createMember("Divyanshi Adhikari", "Core Member", "Technical Team", "#10b981", "16, 185, 129"),
  createMember("Monika Sahu", "Core Member", "Technical Team", "#10b981", "16, 185, 129"),
  createMember("Parth Chopra", "Core Member", "Technical Team", "#10b981", "16, 185, 129"),
  createMember("Anwesha Dhote", "Core Member", "Technical Team", "#10b981", "16, 185, 129"),
  createMember("Mansi Kumari", "Core Member", "Technical Team", "#10b981", "16, 185, 129"),
  createMember("Siddhi Dogne", "Core Member", "Technical Team", "#10b981", "16, 185, 129"),
  createMember("Kuldeep", "Core Member", "Technical Team", "#10b981", "16, 185, 129"),

  // SOCIAL MEDIA TEAM (CRIMSON ROSE)
  createMember("Himesh Jham", "Lead", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Shalvi Pandey", "Co-Lead", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Pari Pancholiya", "Co-Lead", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Ankit Kumar Yadav", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Rudra Pratap Singh", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Sanidhya Raj", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Aarushi Raizada", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Utkarsh Agrawal", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Shrashti Bansal", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Indrayudh Paul", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Riddhima Gupta", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Aastha Sharma", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Dhanraj Choudhary", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Muskan Bhatia", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Abhinav Sharma", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Sohini Dutta", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("Aashish", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),
  createMember("N Nishchay Reddy", "Core Member", "Social Media Team", "#f43f5e", "244, 63, 94"),

  // DESIGN TEAM (VIVID INDIGO)
  createMember("Pranjal Tiwari", "Lead", "Design Team", "#818cf8", "129, 140, 248"),
  createMember("Aditya Pandey", "Co-Lead", "Design Team", "#818cf8", "129, 140, 248"),
  createMember("Ishani Sahay", "Co-Lead", "Design Team", "#818cf8", "129, 140, 248"),
  createMember("Saumya Dayal", "Core Member", "Design Team", "#818cf8", "129, 140, 248"),
  createMember("Vaibhav Santosh Tiwari", "Core Member", "Design Team", "#818cf8", "129, 140, 248"),
  createMember("Abhishek", "Core Member", "Design Team", "#818cf8", "129, 140, 248"),
  createMember("Drishti Singh", "Core Member", "Design Team", "#818cf8", "129, 140, 248"),
  createMember("Prisha Sharma", "Core Member", "Design Team", "#818cf8", "129, 140, 248"),

  // PHOTOGRAPHY TEAM (SUNSET CORAL)
  createMember("Prabhav Sharma", "Lead", "Photography Team", "#ff7849", "255, 120, 73"),
  createMember("Neha A", "Core Member", "Photography Team", "#ff7849", "255, 120, 73"),
  createMember("Vaishnavi Gupta", "Core Member", "Photography Team", "#ff7849", "255, 120, 73"),
  createMember("Prince Gupta", "Core Member", "Photography Team", "#ff7849", "255, 120, 73"),
  createMember("Parimal Vinod Swami", "Core Member", "Photography Team", "#ff7849", "255, 120, 73"),

  // SOFTWARE DEV TEAM (PLATINUM CYAN)
  createMember("Neel Pandey", "Lead", "Software Dev Team", "#38bdf8", "56, 189, 248"),
  createMember("Aarush Rahul Patel", "Co-Lead", "Software Dev Team", "#38bdf8", "56, 189, 248"),
  createMember("Sanskar", "Co-Lead", "Software Dev Team", "#38bdf8", "56, 189, 248"),
  createMember("Nikhil Kumar Tiwari", "Core Member", "Software Dev Team", "#38bdf8", "56, 189, 248"),
  createMember("Shresth Bhargava", "Core Member", "Software Dev Team", "#38bdf8", "56, 189, 248"),
  createMember("Tanishka", "Core Member", "Software Dev Team", "#38bdf8", "56, 189, 248"),
  createMember("Ritik", "Core Member", "Software Dev Team", "#38bdf8", "56, 189, 248"),
  createMember("Varun Saini", "Core Member", "Software Dev Team", "#38bdf8", "56, 189, 248"),
  createMember("Rajnarayan", "Core Member", "Software Dev Team", "#38bdf8", "56, 189, 248"),
  createMember("Anish", "Core Member", "Software Dev Team", "#38bdf8", "56, 189, 248"),
  createMember("Ananya", "Core Member", "Software Dev Team", "#38bdf8", "56, 189, 248"),
];

const groups = [
  "Panel",
  "Leads",
  "Co-Leads",
  "Software Dev Team",
  "Technical Team",
  "Event Management Team",
  "HR Team",
  "PR & Outreach Team",
  "Content Team",
  "Social Media Team",
  "Design Team",
  "Photography Team",
] as const;

const teamOrderMap: Record<string, number> = {
  "Software Dev Team": 1,
  "Technical Team": 2,
  "Event Management Team": 3,
  "HR Team": 4,
  "PR & Outreach Team": 5,
  "Content Team": 6,
  "Social Media Team": 7,
  "Design Team": 8,
  "Photography Team": 9,
};

export const TeamSection: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>("Panel");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || userInteracted) return;

    const interval = setInterval(() => {
      setActiveGroup((prev) => {
        const currentIndex = groups.indexOf(prev as typeof groups[number]);
        const nextIndex = (currentIndex + 1) % groups.length;
        return groups[nextIndex] || "Panel";
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isMobile, userInteracted]);

  const filteredMembers =
    activeGroup === "Leads"
      ? teamMembers
          .filter((m) => m.role === "Lead")
          .sort((a, b) => (teamOrderMap[a.group] || 99) - (teamOrderMap[b.group] || 99))
      : activeGroup === "Co-Leads"
      ? teamMembers
          .filter((m) => m.role === "Co-Lead")
          .sort((a, b) => (teamOrderMap[a.group] || 99) - (teamOrderMap[b.group] || 99))
      : teamMembers.filter((m) => m.group === activeGroup);

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <section id="team" className="content-section">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-eyebrow">TEAM & LEADERSHIP</span>
          <h2 className="section-title">
            The Minds Behind <span className="gradient-text">DSC VITB</span>
          </h2>
          <p className="section-subtitle">
            Students, leads, and core members driving innovation, event management, software development, and AI initiatives.
          </p>
        </div>

        <div className="team-layout margin-top-lg">
          {/* Custom Animated Mobile Dropdown View */}
          <div className="mobile-custom-dropdown-container">
            <div className="mobile-dropdown-topbar">
              <span className="filter-label">ROSTER DEPARTMENTS</span>
              {!userInteracted ? (
                <span className="auto-slide-badge">
                  <span className="pulse-dot" /> Auto-playing teams
                </span>
              ) : (
                <span className="auto-slide-badge paused">
                  {filteredMembers.length} Members
                </span>
              )}
            </div>

            <button
              type="button"
              className={`mobile-dropdown-trigger ${dropdownOpen ? "open" : ""}`}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <div className="trigger-left">
                <span className="trigger-icon">❖</span>
                <span className="trigger-selected-text">{activeGroup}</span>
              </div>
              <div className="trigger-right">
                <span className="count-pill">{filteredMembers.length}</span>
                <span className={`trigger-chevron ${dropdownOpen ? "rotate" : ""}`}>▼</span>
              </div>
            </button>

            {dropdownOpen && (
              <div className="mobile-dropdown-menu">
                {groups.map((g) => {
                  const count =
                    g === "Leads"
                      ? teamMembers.filter((m) => m.role === "Lead").length
                      : g === "Co-Leads"
                      ? teamMembers.filter((m) => m.role === "Co-Lead").length
                      : teamMembers.filter((m) => m.group === g).length;

                  return (
                    <button
                      key={g}
                      type="button"
                      className={`mobile-dropdown-item ${activeGroup === g ? "active" : ""}`}
                      onClick={() => {
                        setActiveGroup(g);
                        setUserInteracted(true);
                        setDropdownOpen(false);
                      }}
                    >
                      <span className="item-name">{g}</span>
                      <span className="item-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Sidebar Department Selector */}
          <div className="team-sidebar">
            <span className="filter-label">ROSTER DEPARTMENTS</span>
            <h3 className="filter-title">Filter Team</h3>
            <div className="team-filter-group">
              {groups.map((g) => (
                <button
                  key={g}
                  className={`team-tab-btn ${activeGroup === g ? "active" : ""}`}
                  onClick={() => {
                    setActiveGroup(g);
                    setUserInteracted(true);
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Compact ChromaGrid Roster */}
          <div className="team-grid-area" style={{ width: "100%", position: "relative" }}>
            <ChromaGrid
              items={filteredMembers}
              radius={240}
              columns={4}
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




