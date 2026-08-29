import { Link } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, MessageCircle, Twitter } from "lucide-react";

const socials = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Github, label: "GitHub" },
  { icon: MessageCircle, label: "Discord" },
  { icon: Twitter, label: "X / Twitter" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="dot-pulse block size-2.5 rounded-full bg-primary" />
              <span className="font-display text-lg font-bold">DSC Club VITB</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The official Data Science Club of VIT Bhopal — building an ecosystem of AI/ML
              engineers, analysts and open-source builders on campus.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="btn-glass rounded-xl p-2.5 text-muted-foreground hover:text-foreground"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-silver">Navigate</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                { to: "/about", label: "About" },
                { to: "/members", label: "Members" },
                { to: "/events", label: "Events" },
                { to: "/gallery", label: "Gallery" },
                { to: "/join", label: "Join Us" },
                { to: "/admin", label: "🛡️ Admin Access" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-silver">Campus</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              VIT Bhopal University, Kothri Kalan, Sehore, Madhya Pradesh
            </p>
            <p className="mt-3 font-mono text-xs text-gold">dsc@vitbhopal.ac.in</p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center font-mono text-xs text-muted-foreground">
          Copyright © 2026 DSC Club VITB. Built with passion by the DSC Web Team.
        </div>
      </div>
    </footer>
  );
}
