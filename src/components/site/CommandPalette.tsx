import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  Layers,
  Calendar,
  Users,
  Image,
  UserPlus,
  Volume2,
  VolumeX,
  Code2,
  Terminal,
  Activity,
  Cpu,
  X,
  Sparkles,
} from "lucide-react";
import { soundEngine } from "@/lib/SoundEngine";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Simulators" | "System";
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) soundEngine.playClick();
          return !prev;
        });
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [open]);

  const items: CommandItem[] = [
    {
      id: "core",
      title: "Core Overview (Home)",
      category: "Navigation",
      icon: Layers,
      action: () => navigate({ to: "/" }),
      shortcut: "G H",
    },
    {
      id: "about",
      title: "About Mission & Milestones",
      category: "Navigation",
      icon: Cpu,
      action: () => navigate({ to: "/about" }),
      shortcut: "G A",
    },
    {
      id: "events",
      title: "Event Horizon & Hackathons",
      category: "Navigation",
      icon: Calendar,
      action: () => navigate({ to: "/events" }),
      shortcut: "G E",
    },
    {
      id: "members",
      title: "Cohort Roster & Leads",
      category: "Navigation",
      icon: Users,
      action: () => navigate({ to: "/members" }),
      shortcut: "G M",
    },
    {
      id: "gallery",
      title: "Photo Archive & Bento",
      category: "Navigation",
      icon: Image,
      action: () => navigate({ to: "/gallery" }),
      shortcut: "G G",
    },
    {
      id: "join",
      title: "Join Portal & Application",
      category: "Navigation",
      icon: UserPlus,
      action: () => navigate({ to: "/join" }),
      shortcut: "G J",
    },
    {
      id: "attention-lab",
      title: "Launch Attention Mechanism Lab",
      category: "Simulators",
      icon: Sparkles,
      action: () => {
        navigate({ to: "/" });
        setTimeout(() => {
          document.getElementById("neural-lab")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      },
    },
    {
      id: "toggle-sound",
      title: "Toggle Synthesized Audio FX",
      category: "System",
      icon: soundEngine.isEnabled() ? VolumeX : Volume2,
      action: () => {
        soundEngine.toggleSound();
      },
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-2xl border border-sky-400/30 bg-slate-900/95 p-4 shadow-2xl shadow-sky-950/60">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-3 px-2">
          <Terminal className="size-5 text-sky-400" />
          <input
            type="text"
            placeholder="Type a command or route name..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              soundEngine.playKeystroke();
            }}
            autoFocus
            className="w-full bg-transparent font-mono text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="mt-3 max-h-80 overflow-y-auto space-y-1 pr-1 font-mono text-xs">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No telemetry commands matching "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playClick();
                  item.action();
                  setOpen(false);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-slate-300 hover:bg-sky-500/15 hover:text-white transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-slate-800 text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                    <item.icon className="size-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white group-hover:text-sky-300">
                      {item.title}
                    </span>
                    <span className="ml-2 text-[10px] text-slate-500 uppercase">
                      [{item.category}]
                    </span>
                  </div>
                </div>
                {item.shortcut && (
                  <kbd className="rounded bg-black/40 px-2 py-0.5 text-[10px] text-slate-400 border border-white/5">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        {/* Bottom Hints */}
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 px-2 text-[10px] font-mono text-slate-500">
          <span>Navigation: ↑ ↓ Enter</span>
          <span>Close: ESC</span>
        </div>
      </div>
    </div>
  );
}
