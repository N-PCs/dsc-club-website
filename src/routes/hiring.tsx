import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { HiringPortal } from "@/components/hiring/HiringPortal";
import { FooterSection } from "@/components/sections/FooterSection";

export const Route = createFileRoute("/hiring")({
  head: () => ({
    meta: [
      { title: "Recruitment Portal — DSC Club VITB" },
      {
        name: "description",
        content:
          "Official Core Team Hiring & Recruitment Portal for the Data Science Club at VIT Bhopal.",
      },
      { property: "og:title", content: "Recruitment Portal — DSC Club VITB" },
      {
        property: "og:description",
        content: "Apply for open domain roles at DSC VIT Bhopal.",
      },
    ],
  }),
  component: HiringRoute,
});

function HiringRoute() {
  return (
    <div className="main-wrapper">
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "85vh" }}>
        <HiringPortal />
      </main>
      <FooterSection />
    </div>
  );
}

export default HiringRoute;
