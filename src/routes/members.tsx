import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { TeamSection } from "@/components/sections/TeamSection";
import { FooterSection } from "@/components/sections/FooterSection";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Members — DSC Club VITB" },
      {
        name: "description",
        content:
          "Meet the executive board, core team, domain leads and mentors driving DSC Club VITB at VIT Bhopal.",
      },
      { property: "og:title", content: "Members — DSC Club VITB" },
      { property: "og:description", content: "The team and leadership behind DSC Club VITB." },
    ],
  }),
  component: Members,
});

function Members() {
  return (
    <div className="main-wrapper">
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <TeamSection />
      </main>
      <FooterSection />
    </div>
  );
}
