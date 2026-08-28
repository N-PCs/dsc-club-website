import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { JoinSection } from "@/components/sections/JoinSection";
import { FooterSection } from "@/components/sections/FooterSection";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join Us — DSC Club VITB" },
      {
        name: "description",
        content:
          "Apply for membership at DSC Club VITB. Pick your domain — AI/ML, Web Dev, UI/UX, Management or Technical Writing.",
      },
      { property: "og:title", content: "Join Us — DSC Club VITB" },
      { property: "og:description", content: "Membership applications for the Data Science Club of VIT Bhopal." },
    ],
  }),
  component: Join,
});

function Join() {
  return (
    <div className="main-wrapper">
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <JoinSection />
      </main>
      <FooterSection />
    </div>
  );
}
