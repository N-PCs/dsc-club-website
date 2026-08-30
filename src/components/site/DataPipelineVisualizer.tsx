import { useState } from "react";
import { Database, Filter, Cpu, CheckCircle2, Rocket, Terminal } from "lucide-react";
import { soundEngine } from "@/lib/SoundEngine";

const steps = [
  {
    id: "01",
    title: "Data Ingestion",
    icon: Database,
    desc: "Fetching structured & unstructured streams from campus sensors, open civic APIs, and time-series telemetry endpoints with sub-10ms latency.",
    tech: "Kafka / Python / Polars",
    throughput: "140K msgs/sec",
    code: `import polars as pl
import asyncio

async def ingest_stream():
    stream = pl.read_ndjson(
        "https://api.vitbhopal.ac.in/telemetry/live"
    )
    return stream.select([
        "sensor_id", "timestamp", "voltage", "current"
    ])`,
  },
  {
    id: "02",
    title: "Feature ETL & Embeddings",
    icon: Filter,
    desc: "Removing outliers, normalizing multi-modal vector spaces, generating 768-dim embeddings, and building high-speed Parquet data stores.",
    tech: "NumPy / HuggingFace",
    throughput: "1.2M rows/sec",
    code: `def build_embeddings(df: pl.DataFrame):
    df_clean = df.drop_nulls()
    features = transformer.encode(
        df_clean["text"].to_list(), 
        normalize=True
    )
    return df_clean.with_columns(
        pl.Series("vector", features)
    )`,
  },
  {
    id: "03",
    title: "Neural Model Architecture",
    icon: Cpu,
    desc: "Training custom deep learning models, attention heads, transformer layers, or gradient boosted decision trees on GPU clusters.",
    tech: "PyTorch 2.3 / CUDA",
    throughput: "4,800 tokens/sec",
    code: `class DSCTransformer(nn.Module):
    def __init__(self, d_model=512, nhead=8):
        super().__init__()
        self.encoder = nn.TransformerEncoderLayer(
            d_model=d_model, nhead=nhead
        )
        self.classifier = nn.Linear(d_model, 10)`,
  },
  {
    id: "04",
    title: "Evaluation & Benchmarks",
    icon: CheckCircle2,
    desc: "Computing F1 scores, ROC curves, latency profile stats, and validating cross-fold validation metrics against benchmark test sets.",
    tech: "Scikit-Learn / MLflow",
    throughput: "99.2% F1-Score",
    code: `metrics = {
    "f1_weighted": f1_score(
        y_true, y_pred, average="weighted"
    ),
    "latency_p99_ms": compute_p99(latencies),
    "loss": cross_entropy(y_pred, y_true).item()
}`,
  },
  {
    id: "05",
    title: "Production Edge Telemetry",
    icon: Rocket,
    desc: "Containerizing model runtime via Docker, exposing high-throughput FastAPI REST endpoints, and logging live inference telemetry.",
    tech: "Docker / FastAPI / Triton",
    throughput: "4.2ms P99 Latency",
    code: `@app.post("/v1/models/infer")
async def infer_pipeline(payload: InferencePayload):
    tensor = preprocess(payload.data)
    result = await engine.predict_async(tensor)
    return {
        "prediction": result.tolist(), 
        "status": 200
    }`,
  },
];

export function DataPipelineVisualizer() {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep]!;

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl border border-sky-400/20 bg-slate-950/90 p-4 sm:p-8 font-mono backdrop-blur-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-sky-400 font-bold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            END-TO-END WORKFLOW ARCHITECTURE
          </span>
          <h3 className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-white">
            How DSC VITB Ships Pipelines
          </h3>
        </div>
        <span className="rounded-full bg-sky-500/10 border border-sky-400/30 px-3 py-1 text-[10px] sm:text-xs font-mono font-bold text-sky-300">
          5 DISTRIBUTED STAGES
        </span>
      </div>

      {/* Step Selector Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = idx === activeStep;
          return (
            <button
              key={s.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveStep(idx);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className={`group relative rounded-xl p-3 sm:p-4 text-left transition-all border ${
                isActive
                  ? "bg-slate-900 border-sky-400 text-white shadow-lg shadow-sky-500/15"
                  : "bg-slate-950/80 border-white/10 text-slate-400 hover:border-sky-400/40 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-sky-400">
                <span>{s.id}</span>
                <Icon className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${isActive ? "text-white" : ""}`} />
              </div>
              <div className="mt-2 text-[11px] sm:text-xs font-bold truncate text-white">{s.title}</div>
              <div className="mt-0.5 text-[9px] sm:text-[10px] text-sky-300/70 truncate">{s.throughput}</div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail & Code Terminal */}
      <div className="mt-6 grid gap-4 lg:grid-cols-12 items-stretch">
        {/* Stage Description Box */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-emerald-400 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              STAGE {current.id} ACTIVE // HIGH-THROUGHPUT
            </div>
            <h4 className="font-display text-lg sm:text-xl font-bold text-white">{current.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{current.desc}</p>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400">Stack:</span>
              <span className="font-bold text-sky-300">{current.tech}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400">Throughput:</span>
              <span className="font-bold text-emerald-400">{current.throughput}</span>
            </div>
          </div>
        </div>

        {/* Live Code Snippet Frame */}
        <div className="lg:col-span-7 rounded-xl sm:rounded-2xl border border-sky-400/20 bg-slate-950 p-3.5 sm:p-5 shadow-inner overflow-hidden">
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-2.5 gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-1 font-mono text-[11px] text-slate-300 truncate max-w-[160px] sm:max-w-none">
                pipeline_stage_{current.id}.py
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] uppercase text-sky-400 font-bold tracking-wider">
              PYTHON 3.11 // GPU JIT
            </span>
          </div>

          {/* Code Terminal Box with Horizontal Scrollbar */}
          <div className="mt-3 bg-slate-900/60 rounded-lg p-3 overflow-x-auto max-w-full">
            <pre className="text-[11px] sm:text-xs text-sky-200 leading-relaxed font-mono whitespace-pre">
              <code>{current.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
