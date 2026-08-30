import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Sliders, Cpu, Activity } from "lucide-react";

type DatasetType = "circles" | "moons" | "spiral";

interface Point {
  x: number;
  y: number;
  label: number;
}

export function InteractiveMLSandbox() {
  const [datasetType, setDatasetType] = useState<DatasetType>("circles");
  const [learningRate, setLearningRate] = useState<number>(0.03);
  const [noise, setNoise] = useState<number>(15);
  const [epochs, setEpochs] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(50);
  const [loss, setLoss] = useState<number>(0.69);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);

  // Generate synthetic dataset
  useEffect(() => {
    const pts: Point[] = [];
    const n = 120;
    const noiseFactor = noise / 100;

    for (let i = 0; i < n; i++) {
      if (datasetType === "circles") {
        const r = i < n / 2 ? Math.random() * 0.4 : 0.6 + Math.random() * 0.35;
        const angle = Math.random() * Math.PI * 2;
        const x = r * Math.cos(angle) + (Math.random() - 0.5) * noiseFactor * 0.3;
        const y = r * Math.sin(angle) + (Math.random() - 0.5) * noiseFactor * 0.3;
        pts.push({ x, y, label: i < n / 2 ? 0 : 1 });
      } else if (datasetType === "moons") {
        const theta = Math.random() * Math.PI;
        if (i < n / 2) {
          pts.push({
            x: Math.cos(theta) * 0.6 + (Math.random() - 0.5) * noiseFactor * 0.3,
            y: Math.sin(theta) * 0.6 - 0.2 + (Math.random() - 0.5) * noiseFactor * 0.3,
            label: 0,
          });
        } else {
          pts.push({
            x: 1 - Math.cos(theta) * 0.6 + (Math.random() - 0.5) * noiseFactor * 0.3,
            y: 0.2 - Math.sin(theta) * 0.6 + (Math.random() - 0.5) * noiseFactor * 0.3,
            label: 1,
          });
        }
      } else {
        const r = (i / n) * 0.8;
        const angle = i * 0.15;
        const label = i % 2;
        pts.push({
          x: r * Math.cos(angle + (label ? Math.PI : 0)) + (Math.random() - 0.5) * noiseFactor * 0.3,
          y: r * Math.sin(angle + (label ? Math.PI : 0)) + (Math.random() - 0.5) * noiseFactor * 0.3,
          label,
        });
      }
    }

    pointsRef.current = pts;
    setEpochs(0);
    setAccuracy(52.4);
    setLoss(0.683);
  }, [datasetType, noise]);

  // Animation Loop for Model Training
  useEffect(() => {
    if (!isTraining) return;

    const interval = setInterval(() => {
      setEpochs((prev) => {
        const next = prev + 5;
        if (next >= 200) {
          setIsTraining(false);
          return 200;
        }
        return next;
      });

      setAccuracy((prev) => Math.min(99.4, +(prev + Math.random() * 2.8 + learningRate * 10).toFixed(1)));
      setLoss((prev) => Math.max(0.042, +(prev - Math.random() * 0.03 - learningRate * 0.05).toFixed(3)));
    }, 80);

    return () => clearInterval(interval);
  }, [isTraining, learningRate]);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw background decision boundary
    const progress = Math.min(1, epochs / 200);
    const grad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      10,
      width / 2,
      height / 2,
      width * (0.4 + progress * 0.2)
    );
    grad.addColorStop(0, `rgba(37, 99, 235, ${0.08 + progress * 0.15})`);
    grad.addColorStop(1, `rgba(2, 132, 199, ${0.02 + progress * 0.05})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = "rgba(226, 232, 240, 0.6)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw data points
    pointsRef.current.forEach((pt) => {
      const cx = (pt.x + 1) * 0.5 * width;
      const cy = (pt.y + 1) * 0.5 * height;

      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      if (pt.label === 0) {
        ctx.fillStyle = "#2563eb";
        ctx.shadowColor = "rgba(37, 99, 235, 0.4)";
      } else {
        ctx.fillStyle = "#0284c7";
        ctx.shadowColor = "rgba(2, 132, 199, 0.4)";
      }
      ctx.shadowBlur = 8;
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });
  }, [datasetType, noise, epochs]);

  return (
    <div className="modern-card p-4 sm:p-6 md:p-8 border border-slate-200 shadow-xl bg-white rounded-2xl sm:rounded-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-200 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE TENSOR LAB</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">Neural Decision Classifier</h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Simulate gradient descent convergence live in your browser.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsTraining(!isTraining)}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md min-h-[44px] ${
              isTraining ? "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20" : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
            }`}
          >
            {isTraining ? (
              <>
                <Activity className="w-4 h-4 animate-spin" />
                <span>Pause Training</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Train Model</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setIsTraining(false);
              setEpochs(0);
              setAccuracy(52.4);
              setLoss(0.683);
            }}
            className="inline-flex items-center justify-center gap-1.5 font-bold text-xs px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 min-h-[44px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Sidebar (Tablet/Mobile: Full width, Desktop: col-span-4) */}
        <div className="lg:col-span-4 space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 font-mono">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Hyperparameters</span>
          </div>

          {/* Dataset Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5 font-mono">Dataset Topology</label>
            <div className="grid grid-cols-3 gap-2">
              {(["circles", "moons", "spiral"] as DatasetType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setDatasetType(type)}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all capitalize min-h-[44px] ${
                    datasetType === type
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Rate Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5 font-mono">
              <span>Learning Rate</span>
              <span className="font-mono text-blue-600 font-semibold">{learningRate}</span>
            </div>
            <input
              type="range"
              min="0.005"
              max="0.1"
              step="0.005"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Noise Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5 font-mono">
              <span>Dataset Noise</span>
              <span className="font-mono text-blue-600 font-semibold">{noise}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={noise}
              onChange={(e) => setNoise(parseInt(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Training Stats Card */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5 shadow-xs font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Epochs</span>
              <span className="font-bold text-slate-900">{epochs} / 200</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-200"
                style={{ width: `${(epochs / 200) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-center">
              <div className="bg-blue-50/80 p-2 rounded-lg border border-blue-100">
                <div className="text-[10px] text-blue-600 font-bold uppercase">Accuracy</div>
                <div className="font-bold text-blue-700 text-sm">{accuracy}%</div>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Loss</div>
                <div className="font-bold text-slate-800 text-sm">{loss}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Canvas Area */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center bg-slate-900 rounded-2xl p-4 sm:p-6 relative overflow-hidden border border-slate-800">
          <div className="absolute top-3 left-4 z-10 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] sm:text-xs text-slate-300 font-mono">LIVE_TENSOR_CANVAS</span>
          </div>

          <canvas
            ref={canvasRef}
            width={480}
            height={360}
            className="w-full max-w-[480px] h-[220px] sm:h-[280px] lg:h-[320px] rounded-xl bg-slate-950 border border-slate-800 shadow-inner"
          />

          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 border border-white" />
              <span>Class 0 (Positive)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-500 border border-white" />
              <span>Class 1 (Negative)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
