import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  layer: number;
  pulseTimer: number;
}

interface Pulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export function NeuralCanvas({ height = 480 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = height);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: width / 2, y: h / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Create 45 neural nodes organized across virtual layers
    const nodes: Node[] = [];
    const numNodes = Math.min(50, Math.floor(width / 24));
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.5,
        layer: Math.floor(Math.random() * 4),
        pulseTimer: Math.random() * 100,
      });
    }

    const pulses: Pulse[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, width, h);

      // Update & Draw Nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        // Mouse attraction
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            node.x += dx * 0.015;
            node.y += dy * 0.015;
          }
        }

        // Random pulse generator
        node.pulseTimer++;
        if (node.pulseTimer > 120 && Math.random() > 0.8) {
          node.pulseTimer = 0;
          // Find target node in next layer or nearest node
          const targetIndex = (i + Math.floor(Math.random() * 5) + 1) % nodes.length;
          pulses.push({
            fromNode: i,
            toNode: targetIndex,
            progress: 0,
            speed: 0.02 + Math.random() * 0.02,
          });
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#00f0ff";
        ctx.fill();
      });

      // Draw Synaptic Connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i]!;
          const n2 = nodes[j]!;
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.25;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw Pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p]!;
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const n1 = nodes[pulse.fromNode]!;
        const n2 = nodes[pulse.toNode]!;
        const px = n1.x + (n2.x - n1.x) * pulse.progress;
        const py = n1.y + (n2.y - n1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00ff9d";
        ctx.shadowColor = "#00ff9d";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [height]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-cyan-400/20 bg-slate-950/80">
      <canvas ref={canvasRef} className="block select-none" />
      <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-400">
        <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
        LIVE NEURAL SYNAPSE CANVAS
      </div>
    </div>
  );
}
