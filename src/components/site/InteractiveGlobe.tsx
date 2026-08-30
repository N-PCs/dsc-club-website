import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  color?: string | undefined;
  isHub?: boolean | undefined;
}

export function InteractiveGlobe({ size = 440 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    for (let i = 0; i < numLatitudes; i++) {
      const phi = (Math.PI * (i + 1)) / (numLatitudes + 1) - Math.PI / 2;
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      for (let j = 0; j < numLongitudes; j++) {
        const theta = (Math.PI * 2 * j) / numLongitudes;
        const x = radius * cosPhi * Math.cos(theta);
        const y = radius * sinPhi;
        const z = radius * cosPhi * Math.sin(theta);
        
        const isHub = Math.random() > 0.92;
        points.push({ x, y, z, isHub });
      }
    }

    let angleX = 0.2;
    let angleY = 0.5;
    let targetSpeedX = 0.002;
    let targetSpeedY = 0.005;
    let speedX = targetSpeedX;
    let speedY = targetSpeedY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - center;
      const my = e.clientY - rect.top - center;

      const dist = Math.sqrt(mx * mx + my * my);
      if (dist < radius * 1.5) {
        targetSpeedY = mx * 0.00015;
        targetSpeedX = -my * 0.00015;
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
        isHub: p.isHub ?? false,
      };
    };

    const rotateY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos - p.z * sin,
        y: p.y,
        z: p.x * sin + p.z * cos,
        isHub: p.isHub ?? false,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      speedX += (targetSpeedX - speedX) * 0.1;
      speedY += (targetSpeedY - speedY) * 0.1;
      angleX += speedX;
      angleY += speedY;

      const projected = points.map((p) => {
        let r = rotateY(p, angleY);
        r = rotateX(r, angleX);

        const fov = 420;
        const scale = fov / (fov + r.z);
        const x2d = center + r.x * scale;
        const y2d = center + r.y * scale;

        return {
          x: x2d,
          y: y2d,
          z: r.z,
          isHub: p.isHub ?? false,
        };
      });

      // Draw sharp solid wireframe rings (NO GRADIENTS)
      ctx.lineWidth = 0.6;
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
          
          if (r.z < 20) {
            const alpha = Math.max(0.02, (radius - r.z) / (radius * 2.2)) * 0.25;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            const px = center + r.x * scale;
            const py = center + r.y * scale;
            if (th === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // Draw Plexus Connections
      ctx.lineWidth = 0.7;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i]!;
        if (p1.z > radius * 0.3) continue;

        let connections = 0;
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j]!;
          if (p2.z > radius * 0.3) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 42 && connections < 3) {
            const alpha = (1 - dist / 42) * 0.28;
            ctx.strokeStyle = `rgba(0, 255, 157, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            connections++;
          }
        }
      }

      // Draw Nodes (Solid Points, Zero Gradients)
      projected.forEach((p) => {
        const depthAlpha = Math.max(0.1, 1 - (p.z + radius) / (radius * 2));
        
        if (p.isHub) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${depthAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(0, 240, 255, ${depthAlpha * 0.7})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
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
      <div className="absolute rounded-full border border-cyan-400/10 pointer-events-none" style={{ width: `${size * 0.85}px`, height: `${size * 0.85}px` }} />
      <canvas ref={canvasRef} className="relative z-10 block select-none" />
    </div>
  );
}
