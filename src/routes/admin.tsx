import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { AdminPanel } from "@/components/pages/AdminPanel";
import { FooterSection } from "@/components/sections/FooterSection";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — DSC Club VITB" },
      {
        name: "description",
        content:
          "Administrative recruitment portal for Data Science Club VIT Bhopal.",
      },
    ],
  }),
  component: AdminRoute,
});

function AdminRoute() {
  return (
    <div className="main-wrapper">
      <Navbar />
      <main style={{ paddingTop: "60px" }}>
        <AdminPanel />
      </main>
      <FooterSection />
    </div>
  );
}

export default AdminRoute;
