import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { EventCard, type EventData } from "@/components/site/EventCard";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Hackathons — DSC VIT Bhopal" },
      {
        name: "description",
        content:
          "Explore upcoming AI hackathons, machine learning workshops, and guest lectures at DSC VIT Bhopal.",
      },
    ],
  }),
  component: EventsRoute,
});

function EventsRoute() {
  const events: EventData[] = [
    {
      id: "ev-1",
      title: "NeuralHack 2026: National AI Hackathon",
      categoryLabel: "36H BUILD SPRINT",
      date: "OCT 14-16, 2026",
      time: "36 Hours Continuous",
      venue: "Lab Complex 302 & Discord",
      desc: "Build breakthrough applications using Generative AI, Large Language Models, and real-time data pipelines.",
      imgUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
      accentColor: "#2C7BE5",
    },
    {
      id: "ev-2",
      title: "LLM Fine-Tuning & Quantization Workshop",
      categoryLabel: "HANDS-ON WORKSHOP",
      date: "SEP 10, 2026",
      time: "2:00 PM - 5:30 PM",
      venue: "Auditorium Hall B",
      desc: "Learn LoRA parameter-efficient fine-tuning, GGUF quantization, and Ollama deployment on consumer GPUs.",
      imgUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
      accentColor: "#2C7BE5",
    },
    {
      id: "ev-3",
      title: "Data Streaming Architecture with Apache Kafka",
      categoryLabel: "MASTERCLASS",
      date: "SEP 24, 2026",
      time: "4:00 PM - 6:00 PM",
      venue: "Online Code Stream",
      desc: "Build scalable event-driven stream processing pipelines using Python, Kafka brokers, and Docker.",
      imgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      accentColor: "#2C7BE5",
    },
  ];

  return (
    <div className="min-h-screen bg-[#DCEAFF] text-[#0B1E36] p-6 sm:p-12 lg:p-16 relative">
      {/* Top Nav Bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between pb-8 border-b border-[#2C7BE5]/20 mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#2C7BE5] font-mono text-xs font-bold border border-[#2C7BE5]/30 shadow-xs hover:bg-[#2C7BE5] hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO CHAPTER SCROLLETTING</span>
        </Link>
        <span className="font-mono text-xs font-bold opacity-60">CHAPTER 03 // EVENTS & SPRINTS</span>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="num-circle bg-[#2C7BE5] text-white border-[#2C7BE5] mx-auto">
            03
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-slate-900">
            Upcoming <span className="text-[#2C7BE5]">Hackathons & Bootcamps</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Participate in high-impact AI build sprints, technical workshops, and expert masterclasses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((ev) => (
            <EventCard key={ev.id} {...ev} />
          ))}
        </div>
      </div>
    </div>
  );
}
