import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface CircleImageProps {
  src: string;
  alt: string;
  size?: number; // size in px on desktop, e.g. 180, 240, 320
  accentColor?: string; // hex string e.g. #0B3D91
  className?: string;
  badgeContent?: ReactNode;
}

export function CircleImage({
  src,
  alt,
  size = 220,
  accentColor = "#0B3D91",
  className = "",
  badgeContent,
}: CircleImageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Duotone Overlapping Accent Circle */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: size,
          height: size,
          backgroundColor: accentColor,
          opacity: 0.35,
          mixBlendMode: "multiply",
          top: "8%",
          left: "8%",
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 6, 0],
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Clipped Circular Image Container */}
      <motion.div
        className="relative z-10 rounded-full overflow-hidden border-2 border-white/60 shadow-xl"
        style={{ width: size, height: size }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover filter contrast-[1.05]"
          loading="lazy"
        />
        {/* Subtle Gradient Vignette */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
      </motion.div>

      {/* Optional Badge Overlay */}
      {badgeContent && (
        <div className="absolute -bottom-2 -right-2 z-20 shadow-md">
          {badgeContent}
        </div>
      )}
    </div>
  );
}
