import { CircleImage } from "./CircleImage";
import { Github, Linkedin } from "lucide-react";

export interface TeamMemberData {
  id: string;
  exhibitCode?: string; // e.g. "EXHIBIT 05.1"
  name: string;
  role: string;
  bio: string;
  imgUrl: string;
  githubUrl?: string;
  linkedinUrl?: string;
  accentColor?: string;
}

export function TeamCard({
  exhibitCode = "EXHIBIT 05.1",
  name,
  role,
  bio,
  imgUrl,
  githubUrl = "https://github.com",
  linkedinUrl = "https://linkedin.com",
  accentColor = "#1B2A6B",
}: TeamMemberData) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center justify-between group relative overflow-hidden">
      {/* Editorial Exhibit Tag */}
      <div className="absolute top-3 right-4 font-mono text-[9px] font-bold tracking-widest text-slate-400 opacity-100 sm:opacity-60 sm:group-hover:opacity-100 transition-opacity">
        [ {exhibitCode} ]
      </div>

      <div>
        {/* Centered Circular Duotone Photo Mask */}
        <div className="mb-4">
          <CircleImage
            src={imgUrl}
            alt={name}
            size={100}
            accentColor={accentColor}
          />
        </div>

        {/* Name & Role */}
        <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-[#1B2A6B] transition-colors">
          {name}
        </h3>
        <div
          className="text-xs font-mono font-bold uppercase tracking-wider mb-2 mt-0.5"
          style={{ color: accentColor }}
        >
          {role}
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {bio}
        </p>
      </div>

      {/* Social Links with 44px Touch Target Padding */}
      <div className="pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-5 text-slate-400">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 hover:text-slate-900 transition-colors"
            aria-label={`${name}'s GitHub`}
          >
            <Github className="w-5 h-5" />
          </a>
        )}
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 hover:text-[#1B2A6B] transition-colors"
            aria-label={`${name}'s LinkedIn`}
          >
            <Linkedin className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}
