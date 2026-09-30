import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./RadialMenu.css";

export interface RadialMenuItem {
  label: string;
  href: string;
  icon: string; // FontAwesome icon class, e.g. "fa-solid fa-house"
  ariaLabel?: string;
  bgColor?: string;
  textColor?: string;
}

export interface RadialMenuProps {
  items?: RadialMenuItem[];
  radius?: number;
  startAngle?: number; // degrees (e.g. 90 = down)
  endAngle?: number; // degrees (e.g. 180 = left)
}

const DEFAULT_RADIAL_ITEMS: RadialMenuItem[] = [
  {
    label: "Home",
    href: "/",
    icon: "fa-solid fa-house",
    ariaLabel: "Home",
    bgColor: "#38bdf8",
    textColor: "#000000",
  },
  {
    label: "About",
    href: "/#about",
    icon: "fa-solid fa-circle-info",
    ariaLabel: "About DSC",
    bgColor: "#60a5fa",
    textColor: "#000000",
  },
  {
    label: "Domains",
    href: "/#domains",
    icon: "fa-solid fa-cubes",
    ariaLabel: "Sub-Domains",
    bgColor: "#0284c7",
    textColor: "#ffffff",
  },
  {
    label: "Events",
    href: "/#events",
    icon: "fa-solid fa-calendar-days",
    ariaLabel: "Flagship Events",
    bgColor: "#2563eb",
    textColor: "#ffffff",
  },
  {
    label: "Team",
    href: "/members",
    icon: "fa-solid fa-users",
    ariaLabel: "Team Roster",
    bgColor: "#1d4ed8",
    textColor: "#ffffff",
  },
  {
    label: "Register",
    href: "/register",
    icon: "fa-solid fa-ticket",
    ariaLabel: "Event Registrations",
    bgColor: "#0ea5e9",
    textColor: "#ffffff",
  },
  {
    label: "Join Us",
    href: "/join",
    icon: "fa-solid fa-paper-plane",
    ariaLabel: "Join Core Team",
    bgColor: "#38bdf8",
    textColor: "#000000",
  },
];

export function RadialMenu({
  items = DEFAULT_RADIAL_ITEMS,
  radius = 145,
  startAngle = 180,
  endAngle = 90,
}: RadialMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const elements = itemRefs.current.filter(Boolean);
    if (!elements.length) return;

    const animateLayout = () => {
      const isMobile = window.innerWidth < 768;

      if (isOpen) {
        gsap.killTweensOf(elements);
        elements.forEach((el, index) => {
          let targetX = 0;
          let targetY = 0;

          if (isMobile) {
            // Mobile staggered vertical menu going down from toggle button
            targetX = 0;
            targetY = 56 + index * 48;
          } else {
            // Desktop radial menu fanning down and left
            const count = items.length;
            const angleDeg =
              count > 1 ? startAngle + (index * (endAngle - startAngle)) / (count - 1) : startAngle;
            const angleRad = (angleDeg * Math.PI) / 180;

            targetX = Math.cos(angleRad) * radius;
            targetY = Math.sin(angleRad) * radius;
          }

          gsap.fromTo(
            el,
            { x: 0, y: 0, scale: 0, opacity: 0 },
            {
              x: targetX,
              y: targetY,
              scale: 1,
              opacity: 1,
              duration: 0.4,
              delay: index * 0.04,
              ease: "back.out(1.7)",
            },
          );
        });
      } else {
        gsap.killTweensOf(elements);
        gsap.to(elements, {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
          duration: 0.22,
          stagger: 0.025,
          ease: "power2.in",
        });
      }
    };

    animateLayout();

    const handleResize = () => {
      if (isOpen) animateLayout();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, items, radius, startAngle, endAngle]);

  return (
    <>
      {/* Brand logo top-left (Obsidian & Electric Blue capsule) */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-8 z-[999] pointer-events-auto">
        <a
          href="/"
          className="group flex items-center gap-3 no-underline bg-black/85 border border-sky-400/25 hover:border-sky-400/80 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl backdrop-blur-xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:scale-[1.02]"
        >
          <div className="relative flex items-center justify-center size-9 sm:size-10 rounded-xl bg-sky-950/40 border border-sky-400/30 p-1 overflow-hidden group-hover:border-sky-400/70 transition-colors">
            <img
              src="/DSClogo.png"
              alt="DSC Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-black text-sm sm:text-base tracking-wider text-white leading-none">
                DSC CLUB
              </span>
              <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-sky-400 font-bold leading-none mt-1">
              VIT BHOPAL
            </span>
          </div>
        </a>
      </div>

      {/* Backdrop overlay */}
      <div className={`radial-overlay ${isOpen ? "open" : ""}`} onClick={closeMenu} />

      {/* Floating Radial Menu Top-Right */}
      <div className="radial-menu-container">
        {/* Toggle Button */}
        <button
          type="button"
          className={`radial-toggle-btn ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <div className="radial-toggle-icon">
            <span className="radial-bar" />
            <span className="radial-bar" />
            <span className="radial-bar" />
          </div>
        </button>

        {/* Radial items ring */}
        <div className="radial-items-ring">
          {items.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              aria-label={item.ariaLabel || item.label}
              className="radial-item-btn"
              onClick={closeMenu}
              style={
                {
                  "--hover-bg": item.bgColor || "#0284c7",
                  "--hover-color": item.textColor || "#ffffff",
                  opacity: 0,
                  transform: "scale(0)",
                } as React.CSSProperties
              }
              ref={(el) => {
                if (el) itemRefs.current[idx] = el;
              }}
            >
              <span className="radial-item-inner">
                <i className={item.icon}></i>
              </span>
              <span className="radial-label">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default RadialMenu;
