import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { soundEngine } from "@/lib/SoundEngine";
import { Sparkles, Layers, Cpu } from "lucide-react";

export function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeCluster, setActiveCluster] = useState<"dense" | "expanded" | "torus">("dense");
  const [particleCount] = useState<number>(1800);
  const sceneStateRef = useRef({
    mode: "dense" as "dense" | "expanded" | "torus",
    hovered: false,
    mouseX: 0,
    mouseY: 0,
    targetRotationX: 0,
    targetRotationY: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 540;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Geometries & Particles
    const positions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const blueColor = new THREE.Color("#38bdf8"); // Cyan / Electric Blue
    const darkBlueColor = new THREE.Color("#2563eb"); // Royal Sapphire
    const whiteColor = new THREE.Color("#ffffff"); // Luminous White

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution with Fibonacci spiral
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 8 + (Math.random() - 0.5) * 1.5;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      targetPositions[i * 3] = x;
      targetPositions[i * 3 + 1] = y;
      targetPositions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Color distribution: Blue / Cyan / White highlights
      const rand = Math.random();
      let c = blueColor;
      if (rand > 0.7) c = whiteColor;
      else if (rand > 0.35) c = darkBlueColor;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 3. Holographic Orbital Wireframe Rings
    const ring1Geo = new THREE.TorusGeometry(10.2, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(11.4, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // 4. Central Core Glow (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // 5. Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);
      sceneStateRef.current.mouseX = x;
      sceneStateRef.current.mouseY = y;
      sceneStateRef.current.targetRotationY = x * 1.2;
      sceneStateRef.current.targetRotationX = -y * 1.2;
    };

    const handleMouseEnter = () => {
      sceneStateRef.current.hovered = true;
    };

    const handleMouseLeave = () => {
      sceneStateRef.current.hovered = false;
      sceneStateRef.current.targetRotationX = 0;
      sceneStateRef.current.targetRotationY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation with mouse influence
      particles.rotation.y += 0.003;
      particles.rotation.x += 0.001;

      particles.rotation.y += (sceneStateRef.current.targetRotationY - particles.rotation.y) * 0.05;
      particles.rotation.x += (sceneStateRef.current.targetRotationX - particles.rotation.x) * 0.05;

      ring1.rotation.z += 0.004;
      ring2.rotation.x -= 0.003;
      core.rotation.y -= 0.005;
      core.rotation.z += 0.002;

      // Particle Position Morphing & Wave Pulsing
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Interpolate towards target positions
        arr[i3] += (targetPositions[i3]! - arr[i3]!) * 0.06;
        arr[i3 + 1] += (targetPositions[i3 + 1]! - arr[i3 + 1]!) * 0.06;
        arr[i3 + 2] += (targetPositions[i3 + 2]! - arr[i3 + 2]!) * 0.06;

        // Subtle organic noise pulse
        if (sceneStateRef.current.mode === "dense") {
          const wave = Math.sin(elapsedTime * 2 + i * 0.1) * 0.02;
          arr[i3] += wave * (arr[i3]! / 8);
          arr[i3 + 1] += wave * (arr[i3 + 1]! / 8);
          arr[i3 + 2] += wave * (arr[i3 + 2]! / 8);
        }
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Morphing Handler Exposer
    (container as unknown as { morphTo: (mode: "dense" | "expanded" | "torus") => void }).morphTo = (mode) => {
      sceneStateRef.current.mode = mode;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        if (mode === "dense") {
          targetPositions[i3] = originalPositions[i3]!;
          targetPositions[i3 + 1] = originalPositions[i3 + 1]!;
          targetPositions[i3 + 2] = originalPositions[i3 + 2]!;
        } else if (mode === "expanded") {
          targetPositions[i3] = originalPositions[i3]! * 1.6 + (Math.random() - 0.5) * 4;
          targetPositions[i3 + 1] = originalPositions[i3 + 1]! * 1.6 + (Math.random() - 0.5) * 4;
          targetPositions[i3 + 2] = originalPositions[i3 + 2]! * 1.6 + (Math.random() - 0.5) * 4;
        } else if (mode === "torus") {
          const u = Math.random() * Math.PI * 2;
          const v = Math.random() * Math.PI * 2;
          const R = 8.5;
          const r = 3.0;
          targetPositions[i3] = (R + r * Math.cos(v)) * Math.cos(u);
          targetPositions[i3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
          targetPositions[i3 + 2] = r * Math.sin(v);
        }
      }
    };

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      pMaterial.dispose();
      ring1Geo.dispose();
      ringMat1.dispose();
      ring2Geo.dispose();
      ringMat2.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [particleCount]);

  const switchMode = (mode: "dense" | "expanded" | "torus") => {
    setActiveCluster(mode);
    soundEngine.playClick();
    if (mountRef.current && (mountRef.current as unknown as { morphTo?: (m: string) => void }).morphTo) {
      (mountRef.current as unknown as { morphTo: (m: string) => void }).morphTo(mode);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="relative size-[340px] sm:size-[440px] lg:size-[520px] cursor-grab active:cursor-grabbing"
      />

      {/* Floating HUD Controls for 3D Manifold */}
      <div className="mt-2 flex items-center gap-2 rounded-full border border-sky-400/20 bg-slate-950/80 p-1.5 backdrop-blur-xl shadow-2xl">
        <button
          onClick={() => switchMode("dense")}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-mono font-medium transition-all ${
            activeCluster === "dense"
              ? "bg-sky-500 text-slate-950 shadow-md font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Cpu className="size-3.5" />
          <span>Tensor Core</span>
        </button>
        <button
          onClick={() => switchMode("expanded")}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-mono font-medium transition-all ${
            activeCluster === "expanded"
              ? "bg-sky-500 text-slate-950 shadow-md font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles className="size-3.5" />
          <span>Latent Cloud</span>
        </button>
        <button
          onClick={() => switchMode("torus")}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-mono font-medium transition-all ${
            activeCluster === "torus"
              ? "bg-sky-500 text-slate-950 shadow-md font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Layers className="size-3.5" />
          <span>Manifold</span>
        </button>
      </div>

      <p className="mt-2 text-[10px] font-mono text-slate-400 tracking-wider">
        GPU WEBGL SHADER // DRAG TO ROTATE 3D TENSOR
      </p>
    </div>
  );
}
