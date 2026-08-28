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
  endAngle?: number;   // degrees (e.g. 180 = left)
}

const DEFAULT_RADIAL_ITEMS: RadialMenuItem[] = [
  {
    label: "Home",
    href: "/",
    icon: "fa-solid fa-house",
    ariaLabel: "Home",
    bgColor: "#3b82f6",
    textColor: "#ffffff",
  },
  {
    label: "About",
    href: "/#about",
    icon: "fa-solid fa-circle-info",
    ariaLabel: "About Us",
    bgColor: "#10b981",
    textColor: "#ffffff",
  },
  {
    label: "Domains",
    href: "/#domains",
    icon: "fa-solid fa-cubes",
    ariaLabel: "Domains",
    bgColor: "#00d2ff",
    textColor: "#0b1329",
  },
  {
    label: "Events",
    href: "/#events",
    icon: "fa-solid fa-calendar-days",
    ariaLabel: "Events",
    bgColor: "#f59e0b",
    textColor: "#ffffff",
  },
  {
    label: "Team",
    href: "/members",
    icon: "fa-solid fa-users",
    ariaLabel: "Team Roster",
    bgColor: "#8b5cf6",
    textColor: "#ffffff",
  },
  {
    label: "Join Us",
    href: "/join",
    icon: "fa-solid fa-paper-plane",
    ariaLabel: "Join Core Team",
    bgColor: "#ec4899",
    textColor: "#ffffff",
  },
];

export function RadialMenu({
  items = DEFAULT_RADIAL_ITEMS,
  radius = 135,
  startAngle = 90,
  endAngle = 180,
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
            targetY = 56 + index * 50;
          } else {
            // Desktop radial menu
            const count = items.length;
            const angleDeg =
              count > 1
                ? startAngle + (index * (endAngle - startAngle)) / (count - 1)
                : startAngle;
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
              duration: 0.45,
              delay: index * 0.05,
              ease: "back.out(1.7)",
            }
          );
        });
      } else {
        gsap.killTweensOf(elements);
        gsap.to(elements, {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
          duration: 0.25,
          stagger: 0.03,
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
      {/* Brand logo top-left */}
      <div
        style={{
          position: "fixed",
          top: "28px",
          left: "36px",
          zIndex: 999,
          pointerEvents: "auto",
        }}
      >
        <a
          href="/"
          className="brand-group"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            background: "rgba(11, 19, 41, 0.85)",
            padding: "8px 18px 8px 12px",
            borderRadius: "14px",
            border: "1px solid rgba(0, 210, 255, 0.25)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src="/DSClogo.png"
            alt="DSC Logo"
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontWeight: 800,
                fontSize: "17.5px",
                letterSpacing: "0.08em",
                color: "#ffffff",
                lineHeight: 1.1,
              }}
            >
              DSC CLUB
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: "var(--blue-bright, #00d2ff)",
                fontWeight: 700,
              }}
            >
              VIT BHOPAL
            </span>
          </div>
        </a>
      </div>

      {/* Backdrop overlay */}
      <div
        className={`radial-overlay ${isOpen ? "open" : ""}`}
        onClick={closeMenu}
      />

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
                  "--hover-bg": item.bgColor || "#0066ff",
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
