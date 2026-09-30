import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { RegistrationPortal } from "@/components/registration/RegistrationPortal";
import { FooterSection } from "@/components/sections/FooterSection";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Event Registration Portal — DSC Club VITB" },
      {
        name: "description",
        content:
          "Official Event and Membership Registration Portal for the Data Science Club at VIT Bhopal. Register individually or as a team.",
      },
      { property: "og:title", content: "Event Registration — DSC Club VITB" },
      {
        property: "og:description",
        content: "Register for hackathons, bootcamps, and technical events at DSC VIT Bhopal.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-sky-400 selection:text-black">
      <Navbar />
      <main className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <RegistrationPortal />
      </main>
      <FooterSection />
    </div>
  );
}

export default RegisterPage;
