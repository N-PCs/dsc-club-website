import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "DSC-VITB BIOS v2.0.26 ─── Copyright (C) 2024", delay: 0, color: "#e8e8f0" },
  { text: "", delay: 200, color: "#e8e8f0" },
  { text: "CPU: Neural Engine Mk.IV ................ OK", delay: 400, color: "#44ff88" },
  { text: "RAM: 65536K Extended Memory ............. OK", delay: 700, color: "#44ff88" },
  { text: "GPU: PixelArt Renderer v3 ............... OK", delay: 900, color: "#44ff88" },
  { text: "INIT: Data Science Kernel loading...", delay: 1200, color: "#00e5ff" },
  { text: "", delay: 1800, color: "#e8e8f0" },
  { text: "████████████████████ 100%", delay: 2000, color: "#4466ff" },
  { text: "", delay: 2600, color: "#e8e8f0" },
  { text: "GUILD: VIT Bhopal University ............ FOUND", delay: 2800, color: "#44ff88" },
  { text: "MEMBERS: 1,500+ adventurers ............. READY", delay: 3100, color: "#44ff88" },
  { text: "AI ENGINE: Neural Forge ................. ONLINE", delay: 3400, color: "#44ff88" },
  { text: "", delay: 3800, color: "#e8e8f0" },
  { text: "▶ PRESS ANY KEY TO ENTER THE REALM", delay: 4200, color: "#ffdd44" },
];

interface Props {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [pixels, setPixels] = useState<{ x: number; y: number; delay: number }[]>([]);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Schedule each line
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });

    setTimeout(() => {
      setShowPrompt(true);
    }, 4200);
  }, []);

  const handleExit = () => {
    if (exiting) return;
    setExiting(true);

    // Generate pixel shards for dissolve
    const shards = Array.from({ length: 64 }, (_, i) => ({
      x: (i % 8) * 12.5,
      y: Math.floor(i / 8) * 12.5,
      delay: Math.random() * 0.4,
    }));
    setPixels(shards);

    setTimeout(() => {
      onComplete();
    }, 800);
  };

  useEffect(() => {
    if (!showPrompt) return;
    const handler = () => handleExit();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showPrompt]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[9999] flex flex-col justify-center px-8 sm:px-16 overflow-hidden"
          style={{ background: "#000008", fontFamily: "JetBrains Mono, monospace" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleExit}
        >
          {/* CRT scanlines */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
            }}
          />

          {/* CRT vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          <div className="relative max-w-3xl w-full mx-auto">
            {BOOT_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.05, ease: "linear" }}
                style={{
                  fontSize: "clamp(9px, 1.5vw, 13px)",
                  lineHeight: "2",
                  color: line.color,
                  minHeight: "1.4em",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {line.text}
                {/* Blinking cursor on last visible line */}
                {visibleLines[visibleLines.length - 1] === i && !showPrompt && (
                  <span
                    style={{ color: "#e8e8f0" }}
                    className="animate-blink-cursor ml-1"
                  >
                    █
                  </span>
                )}
              </motion.div>
            ))}

            {showPrompt && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <span
                  className="animate-insert-coin"
                  style={{
                    fontSize: "clamp(9px, 1.5vw, 13px)",
                    color: "#ffdd44",
                    fontFamily: "JetBrains Mono, monospace",
                    display: "block",
                  }}
                >
                  ▶ PRESS ANY KEY OR CLICK TO CONTINUE_
                </span>
              </motion.div>
            )}
          </div>

          {/* Bottom info */}
          <div
            className="absolute bottom-4 left-8 right-8 flex justify-between"
            style={{
              fontSize: "9px",
              color: "#333355",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            <span>DSC-VITB © 2024</span>
            <span>VIT BHOPAL UNIVERSITY</span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="dissolve"
          className="fixed inset-0 z-[9999]"
          style={{ background: "#000008" }}
          exit={{ opacity: 0 }}
        >
          {/* Pixel shard dissolve */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
            {pixels.map((px, i) => (
              <motion.div
                key={i}
                className="w-full h-full"
                style={{ background: "#000008" }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: 0,
                  scale: 0,
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 0.5,
                  delay: px.delay,
                  ease: [0.4, 0, 0.8, 1],
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
