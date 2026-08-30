import React, { useEffect, useRef } from "react";
import "./ParticleCloud.css";

interface CloudParticle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  color: string;
  glowColor: string;
  orbitSpeed: number;
  orbitRadius: number;
  phase: number;
  pulseSpeed: number;
}

interface ConstellationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  glowColor: string;
  alpha: number;
  pulsePhase: number;
}

export default function ParticleCloud() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Pointer state
    const pointer = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = e.clientX - rect.left;
      pointer.targetY = e.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.targetX = width / 2;
      pointer.targetY = height / 2;
    };

    window.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("mouseleave", handlePointerLeave);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Color palette: Core White, Pink, Magenta, Fuchsia, Purple, Cyan
    const colors = [
      { main: "#ffffff", glow: "rgba(255, 255, 255, 0.95)" }, // Core White
      { main: "#f472b6", glow: "rgba(244, 114, 182, 0.85)" }, // Soft Pink
      { main: "#ec4899", glow: "rgba(236, 72, 153, 0.85)" }, // Neon Magenta
      { main: "#d946ef", glow: "rgba(217, 70, 239, 0.8)" },  // Fuchsia
      { main: "#a855f7", glow: "rgba(168, 85, 247, 0.8)" },  // Purple
      { main: "#8b5cf6", glow: "rgba(139, 92, 246, 0.75)" }, // Violet
      { main: "#06b6d4", glow: "rgba(6, 182, 212, 0.75)" },  // Cyan
      { main: "#38bdf8", glow: "rgba(56, 189, 248, 0.7)" },  // Sky
    ];

    // ==========================================
    // 1. Central Particle Nebula Swarm (850)
    // ==========================================
    const cloudCount = 850;
    const cloudParticles: CloudParticle[] = [];
    const maxDim = Math.max(width, height);

    for (let i = 0; i < cloudCount; i++) {
      const u = Math.random();
      const r = Math.pow(u, 1.6) * maxDim * 0.42;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const px = r * Math.sin(phi) * Math.cos(theta);
      const py = r * Math.sin(phi) * Math.sin(theta) * 0.65;
      const pz = r * Math.cos(phi) * 0.8;

      const defaultColor = colors[0] ?? { main: "#ffffff", glow: "rgba(255,255,255,0.95)" };
      const baseColor = colors[Math.floor(Math.random() * colors.length)] ?? defaultColor;
      const coreColor = Math.random() < 0.5 ? defaultColor : colors[2] ?? defaultColor;
      const colorObj = r < maxDim * 0.1 ? coreColor : baseColor;

      cloudParticles.push({
        x: px,
        y: py,
        z: pz,
        baseX: px,
        baseY: py,
        baseZ: pz,
        radius: Math.random() < 0.82 ? 1.6 + Math.random() * 2.2 : 2.8 + Math.random() * 2.8,
        color: colorObj.main,
        glowColor: colorObj.glow,
        orbitSpeed: (0.0004 + Math.random() * 0.0012) * (Math.random() < 0.5 ? 1 : -1),
        orbitRadius: r,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.001 + Math.random() * 0.003,
      });
    }

    // ==========================================
    // 2. Outer Cyber Constellations (45)
    // ==========================================
    const nodeCount = Math.min(48, Math.max(24, Math.floor((width * height) / 22000)));
    const constellationNodes: ConstellationNode[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const defaultColor = colors[0] ?? { main: "#ffffff", glow: "rgba(255,255,255,0.95)" };
      const colorObj = colors[Math.floor(Math.random() * colors.length)] ?? defaultColor;

      const rad = Math.random() < 0.8 ? 1.8 + Math.random() * 2 : 3.2 + Math.random() * 2;

      constellationNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: rad,
        glowColor: colorObj.glow,
        alpha: 0.4 + Math.random() * 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const perspective = 700;

    const render = () => {
      time += 1;

      // Pointer smoothing
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Clear background with UWDSC rich space dark (#000211)
      ctx.fillStyle = "#000211";
      ctx.fillRect(0, 0, width, height);

      // 2. Cyber Grid Overlay
      ctx.strokeStyle = "rgba(255, 255, 255, 0.022)";
      ctx.lineWidth = 1;
      const gridSize = 52;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Central Glowing Backdrop Aura
      const nebulaRadius = Math.min(width, height) * 0.45;
      const pulseScale = 1 + Math.sin(time * 0.015) * 0.05;

      const nebulaGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        nebulaRadius * pulseScale
      );
      nebulaGrad.addColorStop(0, "rgba(236, 72, 153, 0.28)");  // Core Magenta
      nebulaGrad.addColorStop(0.35, "rgba(168, 85, 247, 0.18)"); // Violet Mid
      nebulaGrad.addColorStop(0.7, "rgba(6, 182, 212, 0.08)");  // Cyan Halo
      nebulaGrad.addColorStop(1, "rgba(0, 2, 17, 0)");

      ctx.fillStyle = nebulaGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, nebulaRadius * pulseScale, 0, Math.PI * 2);
      ctx.fill();

      // 4. Cursor Follower Light
      if (pointer.active) {
        const cursorGrad = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 200);
        cursorGrad.addColorStop(0, "rgba(217, 70, 239, 0.16)");
        cursorGrad.addColorStop(0.6, "rgba(99, 102, 241, 0.06)");
        cursorGrad.addColorStop(1, "rgba(0, 2, 17, 0)");

        ctx.fillStyle = cursorGrad;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "lighter";

      // ==========================================
      // 5. Render Outer Side Constellations
      // ==========================================
      for (let i = 0; i < constellationNodes.length; i++) {
        const node = constellationNodes[i];
        if (!node) continue;

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Pointer repulsion
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 160) {
          const force = (1 - dist / 160) * 0.5;
          node.x -= (dx / dist) * force * 3;
          node.y -= (dy / dist) * force * 3;
        }

        // Draw connections between side nodes
        for (let j = i + 1; j < constellationNodes.length; j++) {
          const other = constellationNodes[j];
          if (!other) continue;

          const ndx = other.x - node.x;
          const ndy = other.y - node.y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

          const maxDist = 135;
          if (nDist < maxDist) {
            const lineAlpha = (1 - nDist / maxDist) * 0.25;
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        const currentAlpha = Math.min(1, node.alpha * (0.75 + 0.25 * Math.sin(time * 0.03 + node.pulsePhase)));
        ctx.fillStyle = node.glowColor;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ==========================================
      // 6. Render Central Particle Swarm Nebula
      // ==========================================
      const rotY = time * 0.002;
      const rotZ = Math.sin(time * 0.001) * 0.15;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      for (let i = 0; i < cloudParticles.length; i++) {
        const p = cloudParticles[i];
        if (!p) continue;

        const currentAngle = p.phase + time * p.orbitSpeed;
        const noiseX = Math.sin(time * 0.01 + p.phase) * 12;
        const noiseY = Math.cos(time * 0.012 + p.phase) * 12;

        let px = p.baseX * Math.cos(currentAngle) - p.baseZ * Math.sin(currentAngle) + noiseX;
        let py = p.baseY + noiseY;
        let pz = p.baseX * Math.sin(currentAngle) + p.baseZ * Math.cos(currentAngle);

        let rx = px * cosY - pz * sinY;
        let rz = px * sinY + pz * cosY;
        let ry = py * cosZ - rx * sinZ;
        rx = rx * cosZ + py * sinZ;

        const scale = perspective / (perspective + rz + 200);
        const screenX = centerX + rx * scale;
        const screenY = centerY + ry * scale;

        let mouseForceX = 0;
        let mouseForceY = 0;

        if (pointer.active) {
          const dx = screenX - pointer.x;
          const dy = screenY - pointer.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 200;

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxDist) * 35;
            const angle = Math.atan2(dy, dx);
            mouseForceX = Math.cos(angle) * force;
            mouseForceY = Math.sin(angle) * force;
          }
        }

        const finalScreenX = screenX + mouseForceX;
        const finalScreenY = screenY + mouseForceY;

        if (
          finalScreenX < -50 ||
          finalScreenX > width + 50 ||
          finalScreenY < -50 ||
          finalScreenY > height + 50
        ) {
          continue;
        }

        const drawRadius = Math.max(0.5, p.radius * scale);
        const alpha = Math.min(
          1,
          Math.max(0.1, scale * 0.85 * (0.7 + 0.3 * Math.sin(time * p.pulseSpeed + p.phase)))
        );

        ctx.fillStyle = p.glowColor;
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.arc(finalScreenX, finalScreenY, drawRadius, 0, Math.PI * 2);
        ctx.fill();

        if (p.radius > 2.2) {
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = alpha * 0.9;
          ctx.beginPath();
          ctx.arc(finalScreenX, finalScreenY, drawRadius * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="particle-cloud-container">
      <canvas ref={canvasRef} className="particle-cloud-canvas" />
    </div>
  );
}
