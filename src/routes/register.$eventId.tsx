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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-sky-400 selection:text-black">
      <Navbar />
      <main className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <RegistrationPortal initialEventId={eventId} />
      </main>
      <FooterSection />
    </div>
  );
}

export default DirectRegisterPage;
