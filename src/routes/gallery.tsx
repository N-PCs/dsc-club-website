import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, Maximize2, X } from "lucide-react";
import { CircleImage } from "@/components/site/CircleImage";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery & Highlights — DSC VIT Bhopal" },
      {
        name: "description",
        content:
          "Moments and memories from hackathons, workshops, bootcamps, and community events at DSC VIT Bhopal.",
      },
    ],
  }),
  component: GalleryRoute,
});

type Category = "all" | "hackathons" | "workshops" | "team";

interface Photo {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string;
  date: string;
  imgUrl: string;
}

function GalleryRoute() {
  const [filter, setFilter] = useState<Category>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const photos: Photo[] = [
    {
      id: "g-1",
      title: "NeuralHack 2025 Grand Finale",
      category: "hackathons",
      categoryLabel: "Hackathon",
      date: "OCT 2025",
      imgUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "g-2",
      title: "Deep Learning & PyTorch Bootcamp",
      category: "workshops",
      categoryLabel: "Workshop",
      date: "NOV 2025",
      imgUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "g-3",
      title: "Core Executive Team Meet",
      category: "team",
      categoryLabel: "Community",
      date: "DEC 2025",
      imgUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "g-4",
      title: "Data Streaming with Kafka Code Along",
      category: "workshops",
      categoryLabel: "Workshop",
      date: "JAN 2026",
      imgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredPhotos =
    filter === "all" ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#F5F9FF] text-[#0B1E36] p-6 sm:p-12 lg:p-16 relative">
      {/* Top Nav Bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between pb-8 border-b border-[#0B3D91]/20 mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#0B3D91] font-mono text-xs font-bold border border-[#0B3D91]/30 shadow-xs hover:bg-[#0B3D91] hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO CHAPTER SCROLLETTING</span>
        </Link>
        <span className="font-mono text-xs font-bold opacity-60">ARCHIVE // GALLERY</span>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#0B3D91] text-white flex items-center justify-center mx-auto shadow-md">
            <Camera className="w-6 h-6" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-slate-900">
            Community <span className="text-[#0B3D91]">Gallery & Retrospective</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Visual retrospective of our hackathons, bootcamps, code sprints, and community gatherings.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: "all", label: "All Photos" },
            { id: "hackathons", label: "Hackathons" },
            { id: "workshops", label: "Workshops" },
            { id: "team", label: "Community" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as Category)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all border ${
                filter === cat.id
                  ? "bg-[#0B3D91] text-white border-[#0B3D91] shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="mb-4">
                <CircleImage
                  src={photo.imgUrl}
                  alt={photo.title}
                  size={140}
                  accentColor="#0B3D91"
                />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#0B3D91]">
                {photo.categoryLabel} • {photo.date}
              </span>
              <h3 className="text-lg font-bold font-display text-slate-900 mt-1 group-hover:text-[#0B3D91] transition-colors">
                {photo.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
