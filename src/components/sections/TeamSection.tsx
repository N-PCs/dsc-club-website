import React, { useState } from "react";
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
  // PANEL
  createMember("Divish Jain", "President", "Panel", "#00d2ff", "0, 210, 255"),
  createMember("Kritika Maurya", "Vice President", "Panel", "#00d2ff", "0, 210, 255"),
  createMember("Aman Panday", "General Secretary", "Panel", "#00d2ff", "0, 210, 255"),
  createMember("Somya Tiwari", "Joint Secretary", "Panel", "#00d2ff", "0, 210, 255"),
  createMember("Shriyash Sahu", "Ops Manager", "Panel", "#00d2ff", "0, 210, 255"),

  // HR TEAM
  createMember("Aditya Saini", "Lead", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Vedant Patil", "Co-Lead", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Gargi Singh", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Swagatika Priyadarshini Sahoo", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Tanisha Sethi", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Mitali Pandey", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Aryan Awasthi", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),
  createMember("Aryan Raj Mishra", "Core Member", "HR Team", "#ec4899", "236, 72, 153"),

  // EVENT MANAGEMENT TEAM
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

  // PR AND OUTREACH TEAM
  createMember("Shalini Pal", "Lead", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Soumya Chouhan", "Co-Lead", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Sousthab Mitra", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Pranjal Bhatnagar", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Anandita Sharma", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Karan Kumar Gupta", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Sivi Shrivastav", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),
  createMember("Vijval Singh", "Core Member", "PR & Outreach Team", "#a855f7", "168, 85, 247"),

  // CONTENT TEAM
  createMember("Jihi Mamtani", "Lead", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Anusha Singh Rajput", "Co-Lead", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Shruti Mishra", "Core Member", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Akshat Singh", "Core Member", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Ananya Pandey", "Core Member", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Bhavesh Wadhwani", "Core Member", "Content Team", "#06b6d4", "6, 182, 212"),
  createMember("Ashi Gupta", "Core Member", "Content Team", "#06b6d4", "6, 182, 212"),

  // TECHNICAL TEAM
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

  // SOCIAL MEDIA TEAM
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

  // DESIGN TEAM
  createMember("Pranjal Tiwari", "Lead", "Design Team", "#8b5cf6", "139, 92, 246"),
  createMember("Aditya Pandey", "Co-Lead", "Design Team", "#8b5cf6", "139, 92, 246"),
  createMember("Ishani Sahay", "Co-Lead", "Design Team", "#8b5cf6", "139, 92, 246"),
  createMember("Saumya Dayal", "Core Member", "Design Team", "#8b5cf6", "139, 92, 246"),
  createMember("Vaibhav Santosh Tiwari", "Core Member", "Design Team", "#8b5cf6", "139, 92, 246"),
  createMember("Abhishek", "Core Member", "Design Team", "#8b5cf6", "139, 92, 246"),
  createMember("Drishti Singh", "Core Member", "Design Team", "#8b5cf6", "139, 92, 246"),
  createMember("Prisha Sharma", "Core Member", "Design Team", "#8b5cf6", "139, 92, 246"),

  // PHOTOGRAPHY TEAM
  createMember("Prabhav Sharma", "Lead", "Photography Team", "#ff7849", "255, 120, 73"),
  createMember("Neha A", "Core Member", "Photography Team", "#ff7849", "255, 120, 73"),
  createMember("Vaishnavi Gupta", "Core Member", "Photography Team", "#ff7849", "255, 120, 73"),
  createMember("Prince Gupta", "Core Member", "Photography Team", "#ff7849", "255, 120, 73"),
  createMember("Parimal Vinod Swami", "Core Member", "Photography Team", "#ff7849", "255, 120, 73"),

  // SOFTWARE DEV TEAM
  createMember("Neel Pandey", "Lead", "Software Dev Team", "#3b82f6", "59, 130, 246"),
  createMember("Aarush Rahul Patel", "Co-Lead", "Software Dev Team", "#3b82f6", "59, 130, 246"),
  createMember("Sanskar", "Co-Lead", "Software Dev Team", "#3b82f6", "59, 130, 246"),
  createMember("Nikhil Kumar Tiwari", "Core Member", "Software Dev Team", "#3b82f6", "59, 130, 246"),
  createMember("Shresth Bhargava", "Core Member", "Software Dev Team", "#3b82f6", "59, 130, 246"),
  createMember("Tanishka", "Core Member", "Software Dev Team", "#3b82f6", "59, 130, 246"),
  createMember("Ritik", "Core Member", "Software Dev Team", "#3b82f6", "59, 130, 246"),
  createMember("Varun Saini", "Core Member", "Software Dev Team", "#3b82f6", "59, 130, 246"),
  createMember("Rajnarayan", "Core Member", "Software Dev Team", "#3b82f6", "59, 130, 246"),
  createMember("Anish", "Core Member", "Software Dev Team", "#3b82f6", "59, 130, 246"),
  createMember("Ananya", "Core Member", "Software Dev Team", "#3b82f6", "59, 130, 246"),
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
          {/* Sidebar Department Selector */}
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




