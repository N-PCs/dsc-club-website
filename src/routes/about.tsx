import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Brain, Database, Code2, Users, Target, ShieldCheck } from "lucide-react";
import { CircleImage } from "@/components/site/CircleImage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — DSC VIT Bhopal" },
      {
        name: "description",
        content:
          "Learn about the Data Science Club at VIT Bhopal — our mission, history, principles, and community values.",
      },
    ],
  }),
  component: AboutRoute,
});

function AboutRoute() {
  return (
    <div className="min-h-screen bg-[#E9F1FF] text-[#0B1E36] p-6 sm:p-12 lg:p-16 relative">
      {/* Top Nav Bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between pb-8 border-b border-[#1E56C4]/20 mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1E56C4] font-mono text-xs font-bold border border-[#1E56C4]/30 shadow-xs hover:bg-[#1E56C4] hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO CHAPTER SCROLLETTING</span>
        </Link>
        <span className="font-mono text-xs font-bold opacity-60">CHAPTER 02 // ABOUT GUILD</span>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="num-circle bg-[#1E56C4] text-white border-[#1E56C4] mx-auto">
            02
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-slate-900">
            Mastering <span className="text-[#1E56C4]">AI & Data Systems</span> Together
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            The Data Science Club (DSC) at VIT Bhopal is an autonomous student research ecosystem dedicated to artificial intelligence, machine learning, and scalable data infrastructure.
          </p>
        </div>

        {/* Hero Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/90 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E56C4]/10 text-[#1E56C4] text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE DSC VISION</span>
            </div>
            <h2 className="text-3xl font-bold font-display text-slate-900">
              Open Source First, Hands-On Learning Always
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We believe in building in public. Every project, codebase, and ML pipeline built by our guild is published open source on GitHub. Our senior engineers and hackathon winners mentor juniors through 1-on-1 code reviews and career guidance.
            </p>
            <div className="pt-2 flex gap-3">
              <Link
                to="/"
                className="callout-bubble bg-[#1E56C4] text-white text-xs font-bold shadow-md"
              >
                <span>View Full Scrollytelling Tour →</span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <CircleImage
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
              alt="DSC VITB Workshop"
              size={240}
              accentColor="#1E56C4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
