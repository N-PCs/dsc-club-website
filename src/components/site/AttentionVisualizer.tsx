import { useState } from "react";
import { soundEngine } from "@/lib/SoundEngine";
import { Sparkles, Cpu, Layers, RefreshCw } from "lucide-react";

interface AttentionHead {
  id: number;
  name: string;
  focus: string;
  weights: number[][];
}

const sampleTokens = ["Transformers", "learn", "deep", "representations", "of", "campus", "data"];

// Pre-computed attention weights for realistic transformer simulation
const attentionHeads: AttentionHead[] = [
  {
    id: 1,
    name: "Head 1: Syntactic",
    focus: "Grammar & Dependency Linkage",
    weights: [
      [0.6, 0.25, 0.05, 0.04, 0.02, 0.02, 0.02],
      [0.35, 0.4, 0.1, 0.08, 0.03, 0.02, 0.02],
      [0.05, 0.1, 0.5, 0.25, 0.04, 0.03, 0.03],
      [0.15, 0.2, 0.25, 0.3, 0.04, 0.03, 0.03],
      [0.02, 0.03, 0.05, 0.35, 0.1, 0.35, 0.1],
      [0.02, 0.03, 0.04, 0.05, 0.1, 0.55, 0.21],
      [0.08, 0.05, 0.08, 0.12, 0.05, 0.22, 0.4],
    ],
  },
  {
    id: 2,
    name: "Head 2: Semantic Core",
    focus: "Contextual Knowledge Clustering",
    weights: [
      [0.45, 0.1, 0.15, 0.18, 0.02, 0.04, 0.06],
      [0.12, 0.5, 0.15, 0.12, 0.03, 0.03, 0.05],
      [0.2, 0.05, 0.4, 0.25, 0.02, 0.04, 0.04],
      [0.3, 0.15, 0.22, 0.2, 0.03, 0.04, 0.06],
      [0.05, 0.05, 0.05, 0.1, 0.3, 0.2, 0.25],
      [0.15, 0.05, 0.1, 0.1, 0.05, 0.35, 0.2],
      [0.25, 0.08, 0.15, 0.18, 0.04, 0.12, 0.18],
    ],
  },
  {
    id: 3,
    name: "Head 3: Positional Relative",
    focus: "Distance-decay Sequence Order",
    weights: [
      [0.7, 0.2, 0.06, 0.02, 0.01, 0.005, 0.005],
      [0.2, 0.6, 0.15, 0.03, 0.01, 0.005, 0.005],
      [0.05, 0.2, 0.55, 0.15, 0.03, 0.01, 0.01],
      [0.02, 0.05, 0.2, 0.55, 0.14, 0.03, 0.01],
      [0.01, 0.02, 0.05, 0.2, 0.52, 0.16, 0.04],
      [0.005, 0.01, 0.02, 0.05, 0.2, 0.55, 0.165],
      [0.005, 0.005, 0.01, 0.03, 0.05, 0.25, 0.65],
    ],
  },
];

export function AttentionVisualizer() {
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number>(0);
  const [activeHeadIdx, setActiveHeadIdx] = useState<number>(0);
  const currentHead = attentionHeads[activeHeadIdx] || attentionHeads[0]!;
  const currentWeights = currentHead.weights[selectedTokenIdx] || [];

  return (
    <div className="relative rounded-3xl border border-sky-400/20 bg-slate-950/85 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-400">
            <Cpu className="size-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              Multi-Head Self-Attention Lab
              <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-mono text-sky-300">
                TRANSFORMER ARCHITECTURE
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Click tokens to inspect cross-attention weight distributions
            </p>
          </div>
        </div>

        {/* Head Switcher */}
        <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/90 p-1">
          {attentionHeads.map((head, idx) => (
            <button
              key={head.id}
              onClick={() => {
                setActiveHeadIdx(idx);
                soundEngine.playClick();
              }}
              className={`rounded-lg px-3 py-1 text-xs font-mono transition-all ${
                activeHeadIdx === idx
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Head {head.id}
            </button>
          ))}
        </div>
      </div>

      {/* Head Focus Description */}
      <div className="mt-4 flex items-center justify-between text-xs text-sky-300/80 font-mono bg-sky-950/30 rounded-xl px-4 py-2 border border-sky-400/15">
        <span className="flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-sky-400" />
          {currentHead.name}: <strong className="text-white">{currentHead.focus}</strong>
        </span>
        <span className="text-[10px] text-slate-400">Softmax Normalized: sum(alpha_i) = 1.0</span>
      </div>

      {/* Interactive Token Sequence */}
      <div className="mt-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-3">
          Input Query Tokens (Q_i):
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {sampleTokens.map((token, idx) => {
            const isSelected = selectedTokenIdx === idx;
            const weight = currentWeights[idx] || 0;
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedTokenIdx(idx);
                  soundEngine.playHover();
                }}
                className={`group relative rounded-2xl px-4 py-2.5 font-mono text-sm transition-all ${
                  isSelected
                    ? "border-2 border-sky-400 bg-sky-500/25 text-white shadow-lg shadow-sky-500/20"
                    : "border border-white/10 bg-slate-900/80 text-slate-300 hover:border-sky-400/40 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-sky-400 font-bold opacity-60">#{idx}</span>
                  <span className="font-semibold">{token}</span>
                </div>
                {isSelected && (
                  <span className="absolute -top-1 -right-1 flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-sky-500" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-Time Attention Arcs & Weight Matrix */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12 items-center">
        {/* Left: Attention Key Distribution Bars */}
        <div className="lg:col-span-7 space-y-2.5 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Key Attention Target (K_j)</span>
            <span>Attention Weight (alpha_{selectedTokenIdx},j)</span>
          </div>

          {sampleTokens.map((token, jdx) => {
            const weight = currentWeights[jdx] || 0;
            const percentage = Math.round(weight * 100);
            return (
              <div key={jdx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-medium">
                    {token}
                    {selectedTokenIdx === jdx && (
                      <span className="ml-2 text-[10px] text-sky-400">(Self-loop)</span>
                    )}
                  </span>
                  <span className="font-bold text-sky-300">{percentage}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Telemetry & Vector Dot Product Formula */}
        <div className="lg:col-span-5 rounded-2xl border border-sky-400/20 bg-slate-950 p-4 font-mono text-xs space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
            <Layers className="size-4" />
            Scaled Dot-Product Engine
          </div>
          <div className="rounded-xl bg-black/60 p-3 text-sky-200 text-[11px] border border-sky-500/15 leading-relaxed font-mono">
            Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-300">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-slate-400">Embedding Dim (d_k):</span>
              <span className="text-white font-bold">512</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-slate-400">Active Query:</span>
              <span className="text-sky-300 font-bold">"{sampleTokens[selectedTokenIdx]}"</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-slate-400">Highest Attention:</span>
              <span className="text-emerald-400 font-bold">
                {
                  sampleTokens[
                    currentWeights.indexOf(Math.max(...currentWeights))
                  ]
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
