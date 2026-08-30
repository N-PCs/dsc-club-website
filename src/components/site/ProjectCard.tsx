import { CircleImage } from "./CircleImage";
import { ExternalLink, Github } from "lucide-react";

export interface ProjectData {
  id: string;
  exhibitCode?: string; // e.g. "EXHIBIT 04.1"
  title: string;
  desc: string;
  tags: string[];
  imgUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  accentColor?: string;
}

export function ProjectCard({
  exhibitCode = "EXHIBIT 04.1",
  title,
  desc,
  tags,
  imgUrl,
  githubUrl = "https://github.com",
  demoUrl = "#",
  accentColor = "#3F8EFF",
}: ProjectData) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Editorial Exhibit Tag */}
      <div className="absolute top-3 right-4 font-mono text-[9px] font-bold tracking-widest text-slate-400 opacity-100 sm:opacity-60 sm:group-hover:opacity-100 transition-opacity">
        [ {exhibitCode} ]
      </div>

      <div>
        {/* Header with Circular Project Image */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <CircleImage
            src={imgUrl}
            alt={title}
            size={75}
            accentColor={accentColor}
          />
          <div className="flex items-center gap-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Title & Desc */}
        <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 mb-2 group-hover:text-[#3F8EFF] transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          {desc}
        </p>
      </div>

      {/* Tech Tags */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
        {tags.map((tg, i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200/60"
          >
            {tg}
          </span>
        ))}
      </div>
    </div>
  );
}
