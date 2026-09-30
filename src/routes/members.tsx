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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-sky-400 selection:text-black">
      <Navbar />
      <main className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <TeamSection />
      </main>
      <FooterSection />
    </div>
  );
}
