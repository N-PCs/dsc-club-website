import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  color: string;
}

const TRAIL_COLORS = ["#00e5ff", "#4466ff", "#ff44cc", "#44ff88", "#ffdd44"];
let trailId = 0;

export function PixelCursor() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 800, damping: 40, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 800, damping: 40, mass: 0.3 });

  const trailRef = useRef<TrailPoint[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    document.body.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      // Add trail point
      const newPt: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++,
        color: TRAIL_COLORS[trailId % TRAIL_COLORS.length],
      };
      trailRef.current = [newPt, ...trailRef.current.slice(0, 7)];
      setTrail([...trailRef.current]);

      // Check for interactive elements
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isHover =
        el?.matches("button, a, [role=button], input, select, textarea, label, [tabindex]") ?? false;
      setHovering(isHover);
    };

    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      cancelAnimationFrame(frameRef.current);
    };
  }, [rawX, rawY]);

  const cursorSize = hovering ? 20 : clicking ? 8 : 12;
  const cursorColor = hovering ? "#ffdd44" : "#00e5ff";

  return (
    <>
      {/* Trail pixels */}
      {trail.map((pt, i) => (
        <motion.div
          key={pt.id}
          className="pixel-cursor-trail"
          style={{
            left: pt.x - 2,
            top: pt.y - 2,
            width: Math.max(2, 4 - i * 0.4),
            height: Math.max(2, 4 - i * 0.4),
            background: pt.color,
            opacity: (1 - i / 8) * 0.6,
          }}
          initial={{ opacity: (1 - i / 8) * 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, ease: "linear" }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="pixel-cursor"
        style={{ x, y }}
      >
        {/* Crosshair lines */}
        {hovering && (
          <>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: -8,
                right: -8,
                height: 1,
                background: cursorColor,
                transform: "translateY(-50%)",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -8,
                bottom: -8,
                width: 1,
                background: cursorColor,
                transform: "translateX(-50%)",
                opacity: 0.6,
              }}
            />
          </>
        )}
        {/* Core dot */}
        <motion.div
          animate={{
            width: cursorSize,
            height: cursorSize,
            background: cursorColor,
            boxShadow: `0 0 0 2px #070710, 0 0 ${hovering ? 16 : 8}px ${cursorColor}`,
          }}
          transition={{ duration: 0.1, ease: "linear" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </motion.div>
    </>
  );
}
