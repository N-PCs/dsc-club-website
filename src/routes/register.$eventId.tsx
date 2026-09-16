import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { RegistrationPortal } from "@/components/registration/RegistrationPortal";
import { FooterSection } from "@/components/sections/FooterSection";

export const Route = createFileRoute("/register/$eventId")({
  head: () => ({
    meta: [
      { title: "Event Registration — DSC Club VITB" },
      {
        name: "description",
        content: "Register for your selected event at Data Science Club VIT Bhopal.",
      },
    ],
  }),
  component: DirectRegisterPage,
});

function DirectRegisterPage() {
  const { eventId } = Route.useParams();

  return (
    <div className="main-wrapper">
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "85vh" }}>
        <RegistrationPortal initialEventId={eventId} />
      </main>
      <FooterSection />
    </div>
  );
}

export default DirectRegisterPage;
