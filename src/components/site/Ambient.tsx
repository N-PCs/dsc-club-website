export function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-blueprint-blue absolute inset-0 opacity-40" />
      <div className="absolute -top-32 -left-32 size-[34rem] rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="absolute right-[-10rem] top-40 size-[30rem] rounded-full bg-sky-400/10 blur-[130px]" />
      <div className="absolute bottom-[-10rem] left-1/3 size-[28rem] rounded-full bg-indigo-500/10 blur-[120px]" />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center space-y-4">
      <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/40 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-sky-300 backdrop-blur-xl">
        <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
        {eyebrow}
      </span>
      <h1 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
        {title}
      </h1>
      <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
