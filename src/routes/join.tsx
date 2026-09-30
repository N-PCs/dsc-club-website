import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { HiringPortal } from "@/components/hiring/HiringPortal";
import { FooterSection } from "@/components/sections/FooterSection";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Core Team Recruitment 2026 — DSC Club VITB" },
      {
        name: "description",
        content:
          "Apply for core team membership at DSC Club VITB. Open domains: Technical, AI & Data Science, Design & Media, Content & Editorial, Management & PR.",
      },
      { property: "og:title", content: "Recruitment Portal — DSC Club VITB" },
      {
        property: "og:description",
        content: "Core team recruitment applications for the Data Science Club of VIT Bhopal.",
      },
    ],
  }),
  component: JoinRoute,
});

function JoinRoute() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-sky-400 selection:text-black">
      <Navbar />
      <main className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <HiringPortal />
      </main>
      <FooterSection />
    </div>
  );
}

export default JoinRoute;
