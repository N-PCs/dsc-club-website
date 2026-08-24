import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { CheckCircle2, Terminal, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/site/Ambient";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join Us — DSC Club VITB" },
      {
        name: "description",
        content:
          "Apply for membership at DSC Club VITB. Pick your domain — AI/ML, Web Dev, UI/UX, Management or Technical Writing.",
      },
      { property: "og:title", content: "Join Us — DSC Club VITB" },
      { property: "og:description", content: "Membership applications for the Data Science Club of VIT Bhopal." },
    ],
  }),
  component: Join,
});

const fieldClass =
  "mt-2 w-full rounded-2xl border border-white/5 bg-slate-950 px-4 py-3.5 text-sm text-foreground outline-none transition-all placeholder:text-slate-600 focus:border-primary focus:shadow-glow";

function Join() {
  const [submitting, setSubmitting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTerminalLogs(["Initializing transmission...", "Compiling metadata pipeline..."]);
  }

  useEffect(() => {
    if (!submitting) return;

    const logs = [
      "Verifying student credentials...",
      "Resolving domain path...",
      "Encrypting portfolio endpoints...",
      "Connecting to VITB registry...",
      "Transmission finalized successfully!"
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setTerminalLogs(prev => [...prev, logs[currentLogIndex]!]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setSent(true);
          setSubmitting(false);
        }, 800);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [submitting]);

  return (
    <div className="px-6 pt-36 pb-20 lg:px-16">
      {/* Header */}
      <PageHeader
        eyebrow="MEMBERSHIP APPLICATION"
        title="Enter the cohort"
        subtitle="Registration for the 2026 cohort is open. Select your track and join the lab."
      />

      <div className="mx-auto mt-20 max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: Bold terminal/text instructions */}
          <div className="lg:col-span-4">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">APPLICATION INSTRUCTIONS</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-white leading-none">
              JOIN THE <br/>
              <span className="text-outline">SYSTEM</span>
            </h2>
            <p className="mt-6 text-xs text-slate-400 leading-relaxed">
              We look for student developers, ML researchers, designers, and managers eager to build. After form submission, credentials will undergo review, followed by domain evaluations and interviews.
            </p>
            
            <div className="glass mt-8 p-6 rounded-2xl border border-white/5 bg-slate-900/10">
              <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold flex items-center gap-2">
                <AlertCircle className="size-4 text-accent" /> Timeline
              </h3>
              <ul className="mt-4 space-y-3 font-mono text-[10px] text-slate-400 tracking-wider">
                <li>• Applications: Aug 25 - Sep 10</li>
                <li>• Domain Reviews: Sep 12 - Sep 15</li>
                <li>• Core Onboarding: Sep 18</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive application terminal */}
          <div className="lg:col-span-8 glass relative rounded-3xl border border-white/5 p-8 bg-slate-900/10 min-h-[460px]">
            {submitting ? (
              // Terminal Loading Effect
              <div className="py-12 flex flex-col justify-center h-full">
                <div className="font-mono text-xs text-accent mb-6 flex items-center gap-2">
                  <Terminal className="size-4 animate-pulse" /> SYSTEM LOGS:
                </div>
                <div className="bg-black/80 rounded-2xl p-6 border border-white/5 font-mono text-[11px] text-slate-300 space-y-2.5 h-64 overflow-y-auto">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-primary font-bold">{`>`}</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <span className="inline-block w-2 h-4 bg-white animate-pulse" />
                </div>
              </div>
            ) : sent ? (
              // Success Screen
              <div className="py-16 text-center">
                <CheckCircle2 className="mx-auto size-16 text-accent animate-bounce" />
                <h2 className="mt-6 font-display text-3xl font-bold text-white">Application Received</h2>
                <p className="mt-3 text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Credentials compiled and registered. We have dispatched a confirmation email containing domain tasks to your official VITB address.
                </p>
              </div>
            ) : (
              // The Form
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block text-xs font-mono uppercase tracking-widest text-slate-400">
                    Full Name
                    <input required placeholder="Aarav Mehta" className={fieldClass} />
                  </label>
                  <label className="block text-xs font-mono uppercase tracking-widest text-slate-400">
                    VITB Reg Number
                    <input required placeholder="24BCE10123" className={fieldClass} />
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block text-xs font-mono uppercase tracking-widest text-slate-400">
                    Branch & Year
                    <input required placeholder="CSE (AI & ML), 2nd Year" className={fieldClass} />
                  </label>
                  <label className="block text-xs font-mono uppercase tracking-widest text-slate-400">
                    VITB Email ID
                    <input
                      required
                      type="email"
                      pattern=".+@vitbhopal\.ac\.in"
                      placeholder="name@vitbhopal.ac.in"
                      className={fieldClass}
                    />
                  </label>
                </div>

                <label className="block text-xs font-mono uppercase tracking-widest text-slate-400">
                  Domain of Interest
                  <select required defaultValue="" className={fieldClass}>
                    <option value="" disabled>
                      Select a domain
                    </option>
                    {["AI/ML Research", "Data Engineering", "Interactive Web Dev", "Management & Events", "Technical Writing"].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-xs font-mono uppercase tracking-widest text-slate-400">
                  GitHub / Portfolio Endpoint
                  <input type="url" placeholder="https://github.com/username" className={fieldClass} />
                </label>

                <button type="submit" className="btn-neon w-full rounded-2xl py-4 font-bold text-sm tracking-wider uppercase">
                  Transmit Application
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
