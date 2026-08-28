import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { DomainsSection } from "@/components/sections/DomainsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { JoinSection } from "@/components/sections/JoinSection";
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
        <TeamSection />
        <JoinSection />
      </main>
      <FooterSection />
    </div>
  );
}
