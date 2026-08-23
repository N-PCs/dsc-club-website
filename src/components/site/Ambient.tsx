export function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-40" />
      <div className="glow-orb -left-32 top-[-10rem] size-[34rem] bg-primary" />
      <div className="glow-orb right-[-12rem] top-40 size-[30rem] bg-silver" />
      <div className="glow-orb bottom-[-14rem] left-1/3 size-[28rem] bg-silver" />
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
    <div className="mx-auto max-w-3xl text-center">
      <span className="glass inline-block rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-silver">
        {eyebrow}
      </span>
      <h1 className="mt-6 text-4xl font-bold sm:text-6xl">
        <span className="text-gradient">{title}</span>
      </h1>
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
    </div>
  );
}
