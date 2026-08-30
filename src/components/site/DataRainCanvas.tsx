import { useEffect, useRef } from "react";

// DS / math symbols for data rain
const SYMBOLS = [
  "∂", "∑", "λ", "π", "∞", "∈", "⊕", "⊗", "∇", "∫",
  "α", "β", "γ", "δ", "ε", "θ", "μ", "σ", "φ", "ψ",
  "0", "1", "A", "I", "X", "Y", "Z", "►", "◆", "◀",
];

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
  brightness: number;
  color: string;
}

const COLUMN_COLORS = ["#4466ff", "#00e5ff", "#ff44cc", "#44ff88", "#ffdd44"];

export function DataRainCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drops = useRef<Drop[]>([]);
  const animId = useRef<number>(0);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CHAR_SIZE = 14;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initDrops();
    };

    const initDrops = () => {
      const cols = Math.floor(canvas.width / CHAR_SIZE);
      drops.current = Array.from({ length: cols }, (_, i) => ({
        x: i * CHAR_SIZE,
        y: Math.random() * -canvas.height,
        speed: Math.random() * 1.5 + 0.5,
        length: Math.floor(Math.random() * 12) + 4,
        chars: Array.from({ length: 20 }, () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]),
        brightness: Math.random() * 0.5 + 0.2,
        color: COLUMN_COLORS[Math.floor(Math.random() * COLUMN_COLORS.length)],
      }));
    };

    let frame = 0;
    const draw = () => {
      frame++;

      // Fade trail
      ctx.fillStyle = "rgba(7, 7, 16, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.imageSmoothingEnabled = false;

      for (const drop of drops.current) {
        // Mouse repulsion: skip drawing if too close
        const dx = drop.x - mouse.current.x;
        const dy = drop.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelled = dist < 80;

        if (!repelled) {
          // Draw the column of characters
          for (let j = 0; j < drop.length; j++) {
            const cy = drop.y - j * CHAR_SIZE;
            if (cy < 0 || cy > canvas.height) continue;

            const alpha = j === 0
              ? 1
              : (1 - j / drop.length) * drop.brightness;

            const charIdx = (Math.floor(frame / 8) + j) % drop.chars.length;
            const char = drop.chars[charIdx];

            ctx.save();
            ctx.globalAlpha = alpha;
            if (j === 0) {
              // Leading char: bright white
              ctx.fillStyle = "#ffffff";
              ctx.shadowColor = drop.color;
              ctx.shadowBlur = 6;
            } else {
              ctx.fillStyle = drop.color;
              ctx.shadowBlur = 0;
            }
            ctx.font = `${CHAR_SIZE - 2}px "Press Start 2P", monospace`;
            ctx.fillText(char, drop.x, Math.round(cy));
            ctx.restore();
          }
        }

        // Advance drop
        drop.y += drop.speed * (repelled ? 0 : 1);
        if (drop.y > canvas.height + drop.length * CHAR_SIZE) {
          drop.y = -drop.length * CHAR_SIZE;
          drop.chars = drop.chars.map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
          drop.speed = Math.random() * 1.5 + 0.5;
          drop.color = COLUMN_COLORS[Math.floor(Math.random() * COLUMN_COLORS.length)];
        }
      }

      animId.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ imageRendering: "pixelated", display: "block" }}
    />
  );
}
