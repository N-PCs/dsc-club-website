import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { JoinCTA } from "@/components/site/JoinCTA";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join Community — DSC VIT Bhopal" },
      {
        name: "description",
        content:
          "Register for membership at the Data Science Club (DSC) at VIT Bhopal. Connect with 1,500+ student data engineers and AI developers.",
      },
    ],
  }),
  component: JoinRoute,
});

function JoinRoute() {
  return (
    <div className="min-h-screen bg-[#0B3D91] text-white p-6 sm:p-12 lg:p-16 relative flex flex-col justify-between">
      {/* Top Nav Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between pb-8 border-b border-white/20 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-mono text-xs font-bold border border-white/30 hover:bg-white hover:text-[#0B3D91] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO CHAPTER SCROLLETTING</span>
        </Link>
        <span className="font-mono text-xs font-bold opacity-60">CHAPTER 06 // RECRUITMENT</span>
      </div>

      <div className="my-auto">
        <JoinCTA />
      </div>
    </div>
  );
}
