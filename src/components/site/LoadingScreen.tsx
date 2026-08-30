import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number; // ms, e.g. 1200ms
}

export function LoadingScreen({ onComplete, minDuration = 1200 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Loading documentary experience...");
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      setProgress(pct);

      if (pct < 30) {
        setStatusText("Loading documentary experience...");
      } else if (pct < 65) {
        setStatusText("Preparing scrollytelling chapters...");
      } else if (pct < 90) {
        setStatusText("Initializing interactive ML tensor labs...");
      } else {
        setStatusText("Initializing Chapter 01...");
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoadingDone(true);
          onComplete?.();
        }, 200);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {!loadingDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#0B3D91] text-white flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden"
        >
          {/* Top Metadata */}
          <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-sky-300" />
              DATA SCIENCE CLUB
            </span>
            <span>VIT BHOPAL UNIVERSITY</span>
          </div>

          {/* Center Logo & Staged Narrative Text */}
          <div className="my-auto text-center max-w-sm mx-auto space-y-6 w-full">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white shadow-2xl backdrop-blur-md relative"
            >
              <Database className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-3xl border border-white/30 animate-ping opacity-25 pointer-events-none" />
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight uppercase text-white">
                DATA SCIENCE CLUB
              </h1>
              <div className="text-[11px] font-mono text-sky-200 uppercase tracking-widest">
                SCROLLETTING EXPERIENCE
              </div>
            </div>

            {/* Staged Narrative Status & Progress Bar */}
            <div className="space-y-3 pt-2">
              <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-sky-300 to-white rounded-full transition-all duration-75 ease-out shadow-sm"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-white/80">
                <span className="truncate pr-2 font-medium text-sky-100">{statusText}</span>
                <span className="font-bold font-mono">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="flex items-center justify-between text-[10px] font-mono text-white/50 border-t border-white/10 pt-4">
            <span>CHAPTER 01 INTRO</span>
            <span>EST 2022</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
