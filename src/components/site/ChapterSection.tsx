import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ChapterSectionProps {
  id: string; // e.g. "home", "about", etc.
  number: string; // "01", "02", etc.
  title: string;
  subtitle?: string;
  bgTint: string; // e.g. "#F5F9FF"
  accentColor: string; // e.g. "#0B3D91"
  textColor?: string; // e.g. "#0B1E36"
  museumAnnotation?: string; // e.g. "EXHIBIT 01.1 — HERO INTRO"
  children: ReactNode;
  className?: string;
  widthClass?: string; // e.g. "md:w-max"
  isActive?: boolean;
}

export function ChapterSection({
  id,
  number,
  title,
  subtitle,
  bgTint,
  accentColor,
  textColor = "#0B1E36",
  museumAnnotation,
  children,
  className = "",
  widthClass = "md:w-max md:min-w-full",
  isActive = false,
}: ChapterSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Stagger animation container variants for active chapter reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <section
      id={id}
      data-chapter-id={id}
      className={`snap-chapter relative w-full ${widthClass} min-h-screen md:h-screen flex-shrink-0 flex flex-col justify-between p-4 sm:p-8 md:py-10 md:px-12 lg:px-16 md:overflow-y-auto select-text ${className}`}
      style={{
        backgroundColor: bgTint,
        color: textColor,
      }}
    >
      {/* OVERSIZED HERO WATERMARK CHAPTER NUMERAL (Low opacity background depth) */}
      <div
        className="absolute right-4 bottom-4 sm:right-12 sm:bottom-6 text-[8rem] sm:text-[14rem] lg:text-[22rem] font-display font-black leading-none pointer-events-none select-none z-0 opacity-[0.03] overflow-hidden"
        style={{ color: accentColor }}
        aria-hidden="true"
      >
        {number}
      </div>

      {/* Editorial Grid Hairline Overlay (Desktop) */}
      <div className="hidden md:grid absolute inset-0 grid-cols-12 pointer-events-none z-0">
        <div className="col-span-3 hairline-col" />
        <div className="col-span-3 hairline-col" />
        <div className="col-span-3 hairline-col" />
        <div className="col-span-3" />
      </div>

      {/* Right Edge Museum Annotation (Desktop Rotated Vertical Caption) */}
      {museumAnnotation && (
        <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase opacity-45 writing-mode-vertical">
          <span style={{ color: accentColor }}>[ CHAPTER {number} ]</span>
          <span>{museumAnnotation}</span>
        </div>
      )}

      {/* Chapter Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between gap-4 pb-4 border-b border-current/10 w-full">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Small Circular Number Badge */}
          <div
            className="num-circle flex-shrink-0 shadow-xs"
            style={{
              borderColor: accentColor,
              color: accentColor,
            }}
          >
            {number}
          </div>

          <div>
            <div
              className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase opacity-75 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <span>CHAPTER {number}</span>
              <span>•</span>
              <span>EXHIBIT {number}.1</span>
            </div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold font-display leading-tight tracking-tight">
              {title}
            </h2>
          </div>
        </div>

        {subtitle && (
          <span className="hidden sm:inline-block text-xs font-mono opacity-60 max-w-xs text-right">
            {subtitle}
          </span>
        )}
      </header>

      {/* Main Chapter Content Body with Stagger Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive || shouldReduceMotion ? "visible" : "hidden"}
        className="relative z-10 my-auto py-4 flex-1 flex flex-col justify-center w-full"
      >
        <motion.div variants={itemVariants} className="w-full">
          {children}
        </motion.div>
      </motion.div>

      {/* Chapter Bottom Hairline Footer */}
      <footer className="relative z-10 pt-4 border-t border-current/10 flex items-center justify-between text-xs opacity-60 font-mono w-full">
        <span>DATA SCIENCE CLUB — CHAPTER {number}</span>
        <span className="hidden sm:inline">VIT BHOPAL UNIVERSITY</span>
      </footer>
    </section>
  );
}
