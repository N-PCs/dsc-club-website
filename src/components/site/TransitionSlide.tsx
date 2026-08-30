import { motion } from "framer-motion";
import { Database } from "lucide-react";

interface TransitionSlideProps {
  id: string; // e.g. "trans-1-2"
  nextChapterNumber: string; // "02"
  nextChapterTitle: string; // "ABOUT US"
  bgColor: string; // Next chapter's accent color, e.g. "#1E56C4"
  tagline: string; // Short tagline bottom-left
}

export function TransitionSlide({
  id,
  nextChapterNumber,
  nextChapterTitle,
  bgColor,
  tagline,
}: TransitionSlideProps) {
  return (
    <section
      id={id}
      className="snap-chapter relative w-full md:w-[48vw] lg:w-[42vw] min-h-[50vh] md:h-screen flex-shrink-0 flex flex-col justify-between p-8 md:p-12 text-white overflow-hidden select-none"
      style={{ backgroundColor: bgColor }}
    >
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none dot-pattern-light" />

      {/* Watermark Upcoming Chapter Numeral */}
      <div
        className="absolute right-6 bottom-4 sm:right-12 sm:bottom-6 text-[14rem] sm:text-[18rem] lg:text-[22rem] font-display font-black leading-none pointer-events-none select-none z-0 opacity-10 text-white"
        aria-hidden="true"
      >
        {nextChapterNumber}
      </div>

      {/* Top Bar Label */}
      <div className="relative z-10 font-mono text-xs tracking-widest uppercase opacity-75 flex items-center justify-between">
        <span>DATA SCIENCE CLUB</span>
        <span>TRANSITION // 0{nextChapterNumber}</span>
      </div>

      {/* Center Hero Logo & Title */}
      <div className="relative z-10 my-auto text-center max-w-md mx-auto space-y-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-20 h-20 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-white shadow-xl"
        >
          <Database className="w-10 h-10" />
        </motion.div>

        <motion.div
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-1.5"
        >
          <div className="font-mono text-xs font-bold tracking-[0.25em] uppercase opacity-80">
            UPCOMING CHAPTER {nextChapterNumber}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight uppercase">
            {nextChapterTitle}
          </h2>
        </motion.div>
      </div>

      {/* Bottom Tagline & Annotation */}
      <div className="relative z-10 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[11px] opacity-90">
        <span className="font-bold tracking-wider">{tagline}</span>
        <span className="text-white/60">VIT BHOPAL →</span>
      </div>
    </section>
  );
}
