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
    <div className="main-wrapper">
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "85vh" }}>
        <RegistrationPortal />
      </main>
      <FooterSection />
    </div>
  );
}

export default RegisterPage;
