import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  color?: string;
  isHub?: boolean;
}

export function InteractiveGlobe({ size = 420 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const radius = size * 0.38;
    const center = size / 2;
    const points: Point3D[] = [];
    const numLatitudes = 14;
    const numLongitudes = 14;

    // Generate latitude & longitude grid points to represent a wireframe globe
    for (let i = 0; i < numLatitudes; i++) {
      const phi = (Math.PI * (i + 1)) / (numLatitudes + 1) - Math.PI / 2; // latitude
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      for (let j = 0; j < numLongitudes; j++) {
        const theta = (Math.PI * 2 * j) / numLongitudes; // longitude
        const x = radius * cosPhi * Math.cos(theta);
        const y = radius * sinPhi;
        const z = radius * cosPhi * Math.sin(theta);
        
        // Randomly assign some points as "hubs"
        const isHub = Math.random() > 0.94;
        points.push({ x, y, z, isHub });
      }
    }

    // Add some random nodes floating slightly above the surface
    for (let i = 0; i < 30; i++) {
      const phi = Math.random() * Math.PI - Math.PI / 2;
      const theta = Math.random() * Math.PI * 2;
      const hRadius = radius * (1.0 + Math.random() * 0.05); // slightly above
      points.push({
        x: hRadius * Math.cos(phi) * Math.cos(theta),
        y: hRadius * Math.sin(phi),
        z: hRadius * Math.cos(phi) * Math.sin(theta),
        isHub: Math.random() > 0.6,
      });
    }

    // Rotation angles
    let angleX = 0.2;
    let angleY = 0.5;
    let targetSpeedX = 0.002;
    let targetSpeedY = 0.005;
    let speedX = targetSpeedX;
    let speedY = targetSpeedY;

    let mouse = { x: 0, y: 0, lastX: 0, lastY: 0, dragging: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left - center;
      mouse.y = e.clientY - rect.top - center;

      // Spin acceleration on hover
      const dist = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
      if (dist < radius * 1.5) {
        targetSpeedY = mouse.x * 0.00015;
        targetSpeedX = -mouse.y * 0.00015;
      } else {
        targetSpeedX = 0.001;
        targetSpeedY = 0.004;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const rotateX = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x,
        y: p.y * cos - p.z * sin,
        z: p.y * sin + p.z * cos,
        isHub: p.isHub,
      };
    };

    const rotateY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos - p.z * sin,
        y: p.y,
        z: p.x * sin + p.z * cos,
        isHub: p.isHub,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Smooth spin inertia
      speedX += (targetSpeedX - speedX) * 0.1;
      speedY += (targetSpeedY - speedY) * 0.1;
      angleX += speedX;
      angleY += speedY;

      // Project and sort points by Z depth so we draw back-to-front
      const projected = points.map((p) => {
        let r = rotateY(p, angleY);
        r = rotateX(r, angleX);

        // Perspective scaling
        const fov = 420;
        const scale = fov / (fov + r.z);
        const x2d = center + r.x * scale;
        const y2d = center + r.y * scale;

        return {
          x: x2d,
          y: y2d,
          z: r.z,
          isHub: p.isHub,
        };
      });

      // Draw faint wireframe rings (latitudes)
      ctx.lineWidth = 0.5;
      for (let lat = 1; lat < numLatitudes; lat++) {
        const phi = (Math.PI * lat) / numLatitudes - Math.PI / 2;
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);

        ctx.beginPath();
        for (let th = 0; th <= numLongitudes; th++) {
          const theta = (Math.PI * 2 * th) / numLongitudes;
          const x = radius * cosPhi * Math.cos(theta);
          const y = radius * sinPhi;
          const z = radius * cosPhi * Math.sin(theta);

          let r = rotateY({ x, y, z }, angleY);
          r = rotateX(r, angleX);
          const scale = 420 / (420 + r.z);
          
          // Only draw if on front side for clarity
          if (r.z < 20) {
            const alpha = Math.max(0.01, (radius - r.z) / (radius * 2.2)) * 0.12;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            const px = center + r.x * scale;
            const py = center + r.y * scale;
            if (th === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // Draw the connections (Plexus)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i]!;
        // Skip drawing connections for background nodes to avoid clutter
        if (p1.z > radius * 0.3) continue;

        let connections = 0;
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j]!;
          if (p2.z > radius * 0.3) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 40 && connections < 3) {
            const alpha = (1 - dist / 40) * 0.18 * (1 - (p1.z + p2.z) / (radius * 2));
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            connections++;
          }
        }
      }

      // Draw particles
      projected.forEach((p) => {
        const depthAlpha = Math.max(0.05, 1 - (p.z + radius) / (radius * 2));
        
        if (p.isHub) {
          // Glow effect for data centers/hubs
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 7);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${depthAlpha * 0.95})`);
          gradient.addColorStop(0.3, `rgba(96, 165, 250, ${depthAlpha * 0.75})`);
          gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
          ctx.fill();

          // Core point
          ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Standard nodes
          ctx.fillStyle = `rgba(96, 165, 250, ${depthAlpha * 0.55})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Dynamic Glow Aura behind the globe */}
      <div 
        className="absolute rounded-full bg-primary/10 blur-[90px] pointer-events-none" 
        style={{ width: `${size * 0.7}px`, height: `${size * 0.7}px` }}
      />
      <canvas ref={canvasRef} className="relative z-10 block select-none" />
    </div>
  );
}
