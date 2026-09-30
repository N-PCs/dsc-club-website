import React, { useState } from "react";
import { Send, CheckCircle2, MessageSquare } from "lucide-react";

export const SiloContact: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("Hackathon & Sprints");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const inquiryTypes = [
    "Hackathon & Sprints",
    "Speaker & Workshop Proposal",
    "Sponsorship & Compute Credits",
    "Core Team Recruitment",
    "Campus Partnership",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-24"
    >
      <div className="rounded-3xl border border-sky-400/25 bg-[#050814] p-8 sm:p-14 text-white relative shadow-[0_0_60px_rgba(56,189,248,0.1)]">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-sky-400/15 pb-8 mb-10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-sky-400 block mb-2 font-semibold">
              COMMUNICATION CHANNEL
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              CONTACT US
            </h2>
          </div>

          <div className="md:max-w-md text-left md:text-right">
            <p className="text-xs sm:text-sm font-mono text-slate-400 leading-relaxed">
              We collaborate with collegiate builders, guest researchers, industry speakers, and
              community sponsors.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-14 text-center space-y-4 animate-fade-in">
            <div className="size-16 mx-auto rounded-full bg-sky-400/20 border border-sky-400 flex items-center justify-center text-sky-400">
              <CheckCircle2 className="size-9" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Message Transmitted</h3>
            <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to DSC VIT Bhopal. Our core coordinator team will review
              your transmission and get in touch within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", message: "" });
              }}
              className="mt-4 inline-flex items-center rounded-full border border-sky-400/40 px-7 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-sky-300 hover:bg-sky-400 hover:text-black transition-all cursor-pointer"
            >
              Send Another Transmission
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Inquiry Type Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                Select inquiry classification
              </label>
              <div className="flex flex-wrap gap-2.5">
                {inquiryTypes.map((type) => {
                  const isSelected = selectedType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-sky-400 text-black border-sky-400 font-bold shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                          : "border-sky-400/20 bg-black/40 text-slate-300 hover:border-sky-400/50 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshu Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-2xl border border-sky-400/20 bg-black/60 px-5 py-3.5 text-xs text-white placeholder:text-slate-600 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                  College / Professional Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="priyanshu@vitbhopal.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-2xl border border-sky-400/20 bg-black/60 px-5 py-3.5 text-xs text-white placeholder:text-slate-600 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                Proposal / Transmission Details
              </label>
              <textarea
                rows={4}
                placeholder="Describe your session proposal, team registration inquiry, hackathon sponsorship, or query..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-2xl border border-sky-400/20 bg-black/60 p-5 text-xs text-white placeholder:text-slate-600 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <p className="text-[11px] font-mono text-slate-500">
                Official Data Science Club communication cell · VIT Bhopal University
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-400 px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-sky-300 hover:scale-105 transition-all shadow-[0_0_25px_rgba(56,189,248,0.4)] cursor-pointer"
              >
                <span>TRANSMIT INQUIRY</span>
                <Send className="size-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
