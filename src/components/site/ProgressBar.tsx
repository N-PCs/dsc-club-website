interface ProgressBarProps {
  progress: number; // 0 to 100
  accentColor?: string;
}

export function ProgressBar({ progress, accentColor = "#0B3D91" }: ProgressBarProps) {
  const widthPercent = `${Math.min(100, Math.max(0, progress))}%`;

  return (
    <>
      {/* Desktop Progress Bar (Fixed at bottom edge, starting after fixed sidebar) */}
      <div className="hidden md:block fixed bottom-0 left-20 lg:left-24 right-0 h-1.5 bg-slate-200/60 z-40 pointer-events-none">
        <div
          className="h-full transition-all duration-200 ease-out"
          style={{
            width: widthPercent,
            backgroundColor: accentColor,
          }}
        />
      </div>

      {/* Mobile Progress Bar (Fixed below mobile header at top) */}
      <div className="block md:hidden fixed top-16 left-0 right-0 h-1 bg-slate-200/60 z-40 pointer-events-none">
        <div
          className="h-full transition-all duration-200 ease-out"
          style={{
            width: widthPercent,
            backgroundColor: accentColor,
          }}
        />
      </div>
    </>
  );
}
