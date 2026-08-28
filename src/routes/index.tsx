import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { DomainsSection } from "@/components/sections/DomainsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { FooterSection } from "@/components/sections/FooterSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DSC Club VITB — Data Science Club of VIT Bhopal" },
      {
        name: "description",
        content:
          "Official Data Science Club of VIT Bhopal — workshops, hackathons, AI/ML projects, and a 1500+ strong builder community.",
      },
      { property: "og:title", content: "DSC Club VITB" },
      {
        property: "og:description",
        content: "Data Science Club of VIT Bhopal — Unlocking insights, driving innovation.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="main-wrapper">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <DomainsSection />
        <EventsSection />

        {/* Multi-Page Navigation Teaser Section */}
        <section className="content-section">
          <div className="section-container">
            <div className="section-header text-center">
              <span className="section-eyebrow">EXPLORE MORE</span>
              <h2 className="section-title">
                Get Involved With <span className="gradient-text">DSC VITB</span>
              </h2>
              <p className="section-subtitle">
                Explore our full member dossier or apply directly to join our core executive team.
              </p>
            </div>

            <div className="grid-2-col margin-top-lg gap-8">
              {/* Members Page Teaser */}
              <div className="glass-card padding-lg relative overflow-hidden group">
                <span className="section-eyebrow text-cyan-400">MEET THE TEAM</span>
                <h3 className="text-2xl font-bold text-white mt-2">Member Dossier</h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Discover the presidents, domain leads, core developers, and faculty mentors driving our machine learning workshops and open-source initiatives.
                </p>
                <div className="mt-6">
                  <Link to="/members" className="cta-btn primary-btn inline-flex items-center gap-2">
                    View Team Members <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              {/* Join Page Teaser */}
              <div className="glass-card padding-lg relative overflow-hidden group">
                <span className="section-eyebrow text-fuchsia-400">APPLICATIONS OPEN</span>
                <h3 className="text-2xl font-bold text-white mt-2">Join Core Team</h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Ready to shape AI/ML culture at VIT Bhopal? Submit your application for interview selection across tech, research, design, or events.
                </p>
                <div className="mt-6">
                  <Link to="/join" className="cta-btn secondary-btn inline-flex items-center gap-2">
                    Apply Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
