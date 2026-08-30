import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { soundEngine } from "@/lib/SoundEngine";
import { Play, RotateCcw, Activity, Zap } from "lucide-react";

export function LossLandscape3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [learningRate, setLearningRate] = useState<number>(0.05);
  const [optimizer, setOptimizer] = useState<"Adam" | "SGD" | "Momentum">("Adam");
  const [currentLoss, setCurrentLoss] = useState<number>(2.45);
  const [iteration, setIteration] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const stateRef = useRef({
    learningRate: 0.05,
    optimizer: "Adam" as "Adam" | "SGD" | "Momentum",
    isRunning: false,
    ballX: 3.5,
    ballY: 3.2,
    vx: 0,
    vy: 0,
    mX: 0,
    mY: 0,
    vX_adam: 0,
    vY_adam: 0,
    iteration: 0,
  });

  // Calculate Loss: Rastrigin / Non-convex multi-valley function
  const computeLoss = (x: number, y: number) => {
    return 0.3 * (x * x + y * y) + 1.2 * Math.cos(1.8 * x) * Math.sin(1.8 * y) + 1.5;
  };

  // Gradient computation
  const computeGrad = (x: number, y: number) => {
    const eps = 0.01;
    const gx = (computeLoss(x + eps, y) - computeLoss(x - eps, y)) / (2 * eps);
    const gy = (computeLoss(x, y + eps) - computeLoss(x, y - eps)) / (2 * eps);
    return { gx, gy };
  };

  useEffect(() => {
    stateRef.current.learningRate = learningRate;
    stateRef.current.optimizer = optimizer;
  }, [learningRate, optimizer]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 280;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(12, 14, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. 3D Wireframe / Solid Surface Mesh
    const gridRes = 45;
    const size = 10;
    const geometry = new THREE.PlaneGeometry(size, size, gridRes, gridRes);
    geometry.rotateX(-Math.PI / 2);

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const pz = pos.getZ(i);
      const py = computeLoss(px, pz);
      pos.setY(i, py);
    }
    geometry.computeVertexNormals();

    const surfaceMat = new THREE.MeshPhongMaterial({
      color: 0x081533,
      wireframe: true,
      emissive: 0x0f2b60,
      shininess: 80,
    });
    const surface = new THREE.Mesh(geometry, surfaceMat);
    scene.add(surface);

    // Coordinate Grid & Lighting
    const light = new THREE.DirectionalLight(0x38bdf8, 2.5);
    light.position.set(10, 20, 15);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // 3. Gradient Descent Ball
    const ballGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const ballMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    scene.add(ball);

    // Trajectory Line
    const maxPoints = 200;
    const trailPositions = new Float32Array(maxPoints * 3);
    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
    const trailMaterial = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      linewidth: 2,
    });
    const trail = new THREE.Line(trailGeometry, trailMaterial);
    scene.add(trail);

    let trailCount = 0;

    // Reset Ball
    const resetBall = () => {
      stateRef.current.ballX = 3.5 + (Math.random() - 0.5) * 1.5;
      stateRef.current.ballY = 3.2 + (Math.random() - 0.5) * 1.5;
      stateRef.current.vx = 0;
      stateRef.current.vy = 0;
      stateRef.current.mX = 0;
      stateRef.current.mY = 0;
      stateRef.current.vX_adam = 0;
      stateRef.current.vY_adam = 0;
      stateRef.current.iteration = 0;
      trailCount = 0;
      for (let i = 0; i < maxPoints * 3; i++) trailPositions[i] = 0;
      trailGeometry.attributes.position.needsUpdate = true;
    };

    (container as unknown as { reset: () => void }).reset = resetBall;

    let animationFrameId: number;
    let stepTimer = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate surface slowly for depth
      surface.rotation.y += 0.002;
      ball.position.x = stateRef.current.ballX;
      ball.position.z = stateRef.current.ballY;
      ball.position.y = computeLoss(stateRef.current.ballX, stateRef.current.ballY) + 0.35;

      // Update trajectory
      if (stateRef.current.isRunning && stepTimer % 4 === 0 && trailCount < maxPoints) {
        trailPositions[trailCount * 3] = ball.position.x;
        trailPositions[trailCount * 3 + 1] = ball.position.y;
        trailPositions[trailCount * 3 + 2] = ball.position.z;
        trailGeometry.attributes.position.needsUpdate = true;
        trailCount++;
      }

      // Step Optimization
      if (stateRef.current.isRunning) {
        stepTimer++;
        const { gx, gy } = computeGrad(stateRef.current.ballX, stateRef.current.ballY);
        const lr = stateRef.current.learningRate;
        const opt = stateRef.current.optimizer;

        if (opt === "SGD") {
          stateRef.current.ballX -= lr * gx;
          stateRef.current.ballY -= lr * gy;
        } else if (opt === "Momentum") {
          const beta = 0.88;
          stateRef.current.vx = beta * stateRef.current.vx + lr * gx;
          stateRef.current.vy = beta * stateRef.current.vy + lr * gy;
          stateRef.current.ballX -= stateRef.current.vx;
          stateRef.current.ballY -= stateRef.current.vy;
        } else if (opt === "Adam") {
          const beta1 = 0.9;
          const beta2 = 0.999;
          const eps = 1e-8;
          stateRef.current.mX = beta1 * stateRef.current.mX + (1 - beta1) * gx;
          stateRef.current.mY = beta1 * stateRef.current.mY + (1 - beta1) * gy;
          stateRef.current.vX_adam = beta2 * stateRef.current.vX_adam + (1 - beta2) * gx * gx;
          stateRef.current.vY_adam = beta2 * stateRef.current.vY_adam + (1 - beta2) * gy * gy;

          const mX_hat = stateRef.current.mX / (1 - Math.pow(beta1, stateRef.current.iteration + 1));
          const mY_hat = stateRef.current.mY / (1 - Math.pow(beta1, stateRef.current.iteration + 1));
          const vX_hat = stateRef.current.vX_adam / (1 - Math.pow(beta2, stateRef.current.iteration + 1));
          const vY_hat = stateRef.current.vY_adam / (1 - Math.pow(beta2, stateRef.current.iteration + 1));

          stateRef.current.ballX -= (lr * mX_hat) / (Math.sqrt(vX_hat) + eps);
          stateRef.current.ballY -= (lr * mY_hat) / (Math.sqrt(vY_hat) + eps);
        }

        // Clamp inside bounds
        stateRef.current.ballX = Math.max(-4.5, Math.min(4.5, stateRef.current.ballX));
        stateRef.current.ballY = Math.max(-4.5, Math.min(4.5, stateRef.current.ballY));

        stateRef.current.iteration++;
        if (stepTimer % 5 === 0) {
          const l = computeLoss(stateRef.current.ballX, stateRef.current.ballY);
          setCurrentLoss(Math.max(0.01, l));
          setIteration(stateRef.current.iteration);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      surfaceMat.dispose();
      ballGeo.dispose();
      ballMat.dispose();
      trailGeometry.dispose();
      trailMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const toggleRun = () => {
    const next = !isRunning;
    setIsRunning(next);
    stateRef.current.isRunning = next;
    soundEngine.playClick();
  };

  const handleReset = () => {
    setIsRunning(false);
    stateRef.current.isRunning = false;
    soundEngine.playClick();
    if (mountRef.current && (mountRef.current as unknown as { reset?: () => void }).reset) {
      (mountRef.current as unknown as { reset: () => void }).reset();
    }
    setCurrentLoss(2.45);
    setIteration(0);
  };

  return (
    <div className="relative rounded-2xl sm:rounded-3xl border border-sky-400/20 bg-slate-950/85 p-4 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden font-mono">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex w-9 h-9 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white flex flex-wrap items-center gap-2">
              3D Loss Surface Landscape
              <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[9px] sm:text-[10px] font-mono text-sky-300">
                OPTIMIZATION BENCHMARK
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Live gradient descent trajectory simulation
            </p>
          </div>
        </div>

        {/* Optimizer Picker */}
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-slate-900/90 p-1 w-full sm:w-auto">
          {(["Adam", "Momentum", "SGD"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setOptimizer(opt);
                soundEngine.playClick();
              }}
              className={`flex-1 sm:flex-none min-h-[38px] rounded-lg px-3 py-1 text-xs font-mono transition-all ${
                optimizer === opt
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative mt-4 flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-900/40">
        <div ref={mountRef} className="w-full h-[220px] sm:h-[280px] lg:h-[320px]" />

        {/* Telemetry Overlay */}
        <div className="absolute top-3 left-3 rounded-xl border border-white/10 bg-slate-950/85 p-2.5 font-mono text-[10px] sm:text-xs backdrop-blur-md space-y-1">
          <div className="flex justify-between gap-3 text-slate-400">
            <span>Loss (L):</span>
            <span className="text-sky-300 font-bold">{currentLoss.toFixed(4)}</span>
          </div>
          <div className="flex justify-between gap-3 text-slate-400">
            <span>Epoch:</span>
            <span className="text-white font-bold">{iteration}</span>
          </div>
          <div className="flex justify-between gap-3 text-slate-400">
            <span>Status:</span>
            <span className={currentLoss < 0.2 ? "text-emerald-400 font-bold" : "text-amber-400"}>
              {currentLoss < 0.2 ? "GLOBAL MINIMA" : "SEARCHING"}
            </span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-900/70 p-3.5 sm:p-4">
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleRun}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold min-h-[44px] transition-all ${
              isRunning ? "bg-amber-500 text-slate-950" : "bg-sky-400 text-slate-950 hover:bg-sky-300"
            }`}
          >
            {isRunning ? (
              <>
                <Zap className="w-4 h-4" /> Pause Optimization
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Drop Gradient Descent
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2.5 text-xs font-bold text-white min-h-[44px]"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Learning Rate Slider */}
        <div className="flex items-center justify-between sm:justify-end gap-3 font-mono text-xs">
          <span className="text-slate-400">LR (eta):</span>
          <input
            type="range"
            min="0.01"
            max="0.2"
            step="0.01"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-24 sm:w-28 accent-sky-400"
          />
          <span className="text-sky-300 font-bold w-8 text-right">{learningRate}</span>
        </div>
      </div>
    </div>
  );
}
