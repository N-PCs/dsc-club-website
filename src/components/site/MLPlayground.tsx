import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Sliders, Cpu, Activity, CheckCircle2 } from "lucide-react";
import { soundEngine } from "@/lib/SoundEngine";

interface DataPoint {
  x: number;
  y: number;
  label: number; // 0 or 1
}

export function MLPlayground() {
  const [learningRate, setLearningRate] = useState<number>(0.05);
  const [epochs, setEpochs] = useState<number>(50);
  const [noise, setNoise] = useState<number>(0.15);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [currentEpoch, setCurrentEpoch] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(64.5);
  const [loss, setLoss] = useState<number>(0.582);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<DataPoint[]>([]);
  const weightsRef = useRef<{ w1: number; w2: number; bias: number }>({
    w1: Math.random() - 0.5,
    w2: Math.random() - 0.5,
    bias: Math.random() - 0.5,
  });

  // Generate synthetic dataset (Circle / Spiral / Linear separable)
  useEffect(() => {
    const generateData = () => {
      const points: DataPoint[] = [];
      const numPoints = 120;
      for (let i = 0; i < numPoints; i++) {
        const x = (Math.random() - 0.5) * 2; // -1 to 1
        const y = (Math.random() - 0.5) * 2;
        const distance = Math.sqrt(x * x + y * y);

        // Class 1 inside circle, Class 0 outside
        let label = distance < 0.65 ? 1 : 0;
        if (Math.random() < noise) {
          label = label === 1 ? 0 : 1; // noise flip
        }
        points.push({ x, y, label });
      }
      pointsRef.current = points;
    };

    generateData();
    drawCanvas();
  }, [noise]);

  // Train Perceptron / Logistic Model step by step
  useEffect(() => {
    if (!isTraining) return;

    const interval = setInterval(() => {
      setCurrentEpoch((prevEpoch) => {
        if (prevEpoch >= epochs) {
          setIsTraining(false);
          soundEngine.playSuccess();
          clearInterval(interval);
          return prevEpoch;
        }

        // Perform one epoch of gradient descent updates
        const lr = learningRate;
        let totalLoss = 0;
        let correct = 0;

        pointsRef.current.forEach((pt) => {
          // Sigmoid activation
          const z = weightsRef.current.w1 * pt.x + weightsRef.current.w2 * pt.y + weightsRef.current.bias;
          const pred = 1 / (1 + Math.exp(-z));

          // Loss calculation
          const error = pt.label - pred;
          totalLoss += Math.abs(error);

          if ((pred >= 0.5 && pt.label === 1) || (pred < 0.5 && pt.label === 0)) {
            correct++;
          }

          // Gradient update
          weightsRef.current.w1 += lr * error * pt.x;
          weightsRef.current.w2 += lr * error * pt.y;
          weightsRef.current.bias += lr * error;
        });

        const newAcc = Math.round((correct / pointsRef.current.length) * 1000) / 10;
        const newLoss = Math.round((totalLoss / pointsRef.current.length) * 1000) / 1000;
        setAccuracy(newAcc);
        setLoss(newLoss);

        drawCanvas();
        soundEngine.playKeystroke();
        return prevEpoch + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isTraining, epochs, learningRate]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);

    // 1. Draw Decision Boundary Heatmap Grid
    const resolution = 25;
    const step = size / resolution;
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const normX = (i / resolution) * 2 - 1;
        const normY = (j / resolution) * 2 - 1;
        const z = weightsRef.current.w1 * normX + weightsRef.current.w2 * normY + weightsRef.current.bias;
        const prob = 1 / (1 + Math.exp(-z));

        // Color mesh without gradients: Crisp solid classification regions
        if (prob > 0.5) {
          ctx.fillStyle = `rgba(0, 240, 255, ${prob * 0.22})`;
        } else {
          ctx.fillStyle = `rgba(0, 255, 157, ${(1 - prob) * 0.22})`;
        }
        ctx.fillRect(i * step, j * step, step, step);
      }
    }

    // 2. Draw Points
    pointsRef.current.forEach((pt) => {
      const cx = ((pt.x + 1) / 2) * size;
      const cy = ((pt.y + 1) / 2) * size;

      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      if (pt.label === 1) {
        ctx.fillStyle = "#00f0ff";
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 6;
      } else {
        ctx.fillStyle = "#00ff9d";
        ctx.shadowColor = "#00ff9d";
        ctx.shadowBlur = 6;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  };

  const handleStartTrain = () => {
    soundEngine.playClick();
    setCurrentEpoch(0);
    weightsRef.current = {
      w1: (Math.random() - 0.5) * 2,
      w2: (Math.random() - 0.5) * 2,
      bias: (Math.random() - 0.5) * 2,
    };
    setIsTraining(true);
  };

  const handleReset = () => {
    soundEngine.playClick();
    setIsTraining(false);
    setCurrentEpoch(0);
    weightsRef.current = { w1: 0.1, w2: -0.1, bias: 0 };
    setAccuracy(64.5);
    setLoss(0.582);
    drawCanvas();
  };

  return (
    <div className="w-full rounded-3xl border border-cyan-400/30 bg-slate-950 p-6 md:p-8 font-mono">
      {/* Playground Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-bold">
            <Cpu className="size-4 animate-pulse text-cyan-400" />
            INTERACTIVE LAB // MODEL TRAINER SANDBOX
          </div>
          <h3 className="mt-1 font-display text-2xl font-bold text-white">
            In-Browser Neural Classifier
          </h3>
        </div>

        {/* Live Metrics Dossier */}
        <div className="flex flex-wrap gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-3 text-xs">
          <div>
            <span className="block text-[10px] text-slate-500 uppercase tracking-widest">EPOCH</span>
            <span className="font-bold text-white">{currentEpoch} / {epochs}</span>
          </div>
          <div className="border-l border-white/10 pl-4">
            <span className="block text-[10px] text-slate-500 uppercase tracking-widest">ACCURACY</span>
            <span className="font-bold text-cyan-400">{accuracy}%</span>
          </div>
          <div className="border-l border-white/10 pl-4">
            <span className="block text-[10px] text-slate-500 uppercase tracking-widest">LOSS</span>
            <span className="font-bold text-emerald-400">{loss}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls + Decision Boundary Canvas */}
      <div className="mt-8 grid gap-8 md:grid-cols-12 items-center">
        
        {/* Controls Column */}
        <div className="space-y-6 md:col-span-5">
          <label className="block text-xs uppercase tracking-wider text-slate-300">
            Learning Rate: <span className="text-cyan-400 font-bold">{learningRate}</span>
            <input
              type="range"
              min="0.001"
              max="0.2"
              step="0.005"
              value={learningRate}
              onChange={(e) => {
                setLearningRate(parseFloat(e.target.value));
                soundEngine.playKeystroke();
              }}
              className="mt-2 w-full accent-cyan-400 cursor-pointer"
            />
          </label>

          <label className="block text-xs uppercase tracking-wider text-slate-300">
            Total Epochs: <span className="text-cyan-400 font-bold">{epochs}</span>
            <input
              type="range"
              min="10"
              max="150"
              step="10"
              value={epochs}
              onChange={(e) => {
                setEpochs(parseInt(e.target.value));
                soundEngine.playKeystroke();
              }}
              className="mt-2 w-full accent-cyan-400 cursor-pointer"
            />
          </label>

          <label className="block text-xs uppercase tracking-wider text-slate-300">
            Data Noise: <span className="text-cyan-400 font-bold">{Math.round(noise * 100)}%</span>
            <input
              type="range"
              min="0"
              max="0.4"
              step="0.05"
              value={noise}
              onChange={(e) => {
                setNoise(parseFloat(e.target.value));
                soundEngine.playKeystroke();
              }}
              className="mt-2 w-full accent-cyan-400 cursor-pointer"
            />
          </label>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleStartTrain}
              disabled={isTraining}
              className="btn-neon flex-1 rounded-xl py-3.5 text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isTraining ? <Activity className="size-4 animate-spin" /> : <Play className="size-4" />}
              {isTraining ? "Training..." : "Run Epoch Sprint"}
            </button>

            <button
              onClick={handleReset}
              className="btn-glass rounded-xl p-3.5 text-xs"
              title="Reset Weights"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
        </div>

        {/* Canvas Display Column */}
        <div className="flex flex-col items-center justify-center md:col-span-7">
          <div className="relative rounded-2xl border border-cyan-400/40 bg-slate-900 p-2 shadow-xl">
            <canvas ref={canvasRef} width={320} height={320} className="block rounded-xl" />
            <div className="absolute bottom-4 left-4 flex gap-3 text-[9px] uppercase tracking-widest bg-slate-950/90 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="size-2 rounded-full bg-cyan-400" /> Class A
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-400" /> Class B
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
