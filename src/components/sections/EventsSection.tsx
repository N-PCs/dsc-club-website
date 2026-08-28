import React, { useState } from "react";

interface EventItem {
  img: string;
  tag: string;
  title: string;
  date: string;
  place: string;
  text: string;
  btnText: string;
  btnType: "primary" | "secondary";
}

const upcomingEvents: EventItem[] = [
  {
    img: "/event-workshop.jpg",
    tag: "BOOTCAMP",
    title: "PyTorch Deep Dive Bootcamp",
    date: "12 Sep 2026 · 10:00 AM",
    place: "AB-1 Auditorium",
    text: "Three days of intensive tensors training, autograd computation graph breakdowns, and compiling vision classification models from scratch.",
    btnText: "Register For Event",
    btnType: "primary",
  },
  {
    img: "/event-talk.jpg",
    tag: "TECH TALK",
    title: "Talks: LLMs in Production",
    date: "26 Sep 2026 · 5:30 PM",
    place: "Seminar Hall 2",
    text: "An ML platform team member shares deployment telemetries, LLM evaluations, inference costs, and model monitoring guardrails.",
    btnText: "Register For Event",
    btnType: "primary",
  },
  {
    img: "/event-hackathon.jpg",
    tag: "HACKATHON",
    title: "DataHacks '26",
    date: "18 Oct 2026 · 9:00 AM",
    place: "Innovation Center",
    text: "Our flagship 36-hour hackathon focusing on open civic API integration and local-campus analytics platforms. 300+ builders expected.",
    btnText: "Register For Event",
    btnType: "primary",
  },
];

const pastEvents: EventItem[] = [
  {
    img: "/event-hackathon.jpg",
    tag: "HACKATHON",
    title: "DataHacks '25",
    date: "20 Oct 2025",
    place: "Innovation Center",
    text: "240 developers, 62 functional prototypes, and 36 hours of continuous pipeline building with real telemetry feedback.",
    btnText: "View Recap Dossier",
    btnType: "secondary",
  },
  {
    img: "/event-workshop.jpg",
    tag: "WORKSHOP",
    title: "Python for Data Bootcamp",
    date: "08 Aug 2025",
    place: "Lab Complex 3",
    text: "An intensive bootcamp covering Pandas indices, NumPy aggregations, and Seaborn visual layouts. 150+ students certified.",
    btnText: "View Recap Dossier",
    btnType: "secondary",
  },
  {
    img: "/event-team.jpg",
    tag: "COMMUNITY",
    title: "DSC Onboarding Night",
    date: "02 Aug 2025",
    place: "Open Air Theatre",
    text: "Welcoming our next cohort with lightning project demos, core coordinator reveals, and collaborative developer networking.",
    btnText: "View Recap Dossier",
    btnType: "secondary",
  },
];

export const EventsSection: React.FC = () => {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const currentList = tab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <section id="events" className="content-section">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-eyebrow">CALENDAR</span>
          <h2 className="section-title">
            Events That <span className="gradient-text">Ship Skills</span>
          </h2>
          <p className="section-subtitle">
            From weekend hackathons to deep learning bootcamps — choose your next
            track.
          </p>
        </div>

        <div className="events-layout margin-top-lg">
          {/* Sidebar Filter */}
          <div className="events-sidebar">
            <span className="filter-label">FILTER TIMELINE</span>
            <h3 className="filter-title">Select Cohort</h3>
            <div className="filter-btn-group">
              <button
                className={`filter-tab-btn ${tab === "upcoming" ? "active" : ""}`}
                onClick={() => setTab("upcoming")}
              >
                Upcoming Sprints
              </button>
              <button
                className={`filter-tab-btn ${tab === "past" ? "active" : ""}`}
                onClick={() => setTab("past")}
              >
                Completed Sprints
              </button>
            </div>
          </div>

          {/* Events List */}
          <div className="events-timeline">
            <div className="events-list active">
              {currentList.map((e) => (
                <article key={e.title} className="event-card glass-card">
                  <div className="event-img-wrap">
                    <img src={e.img} alt={e.title} className="event-img" />
                    <span className="event-tag">{e.tag}</span>
                  </div>
                  <div className="event-info">
                    <h4 className="event-title">{e.title}</h4>
                    <div className="event-meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i> {e.date}
                      </span>
                      <span>
                        <i className="fa-solid fa-location-dot"></i> {e.place}
                      </span>
                    </div>
                    <p className="event-text">{e.text}</p>
                    <a
                      href="#join"
                      className={`cta-btn ${
                        e.btnType === "primary" ? "primary-btn" : "secondary-btn"
                      } btn-sm margin-top-sm`}
                    >
                      {e.btnText} <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
