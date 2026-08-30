import { CircleImage } from "./CircleImage";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";

export interface EventData {
  id: string;
  exhibitCode?: string; // e.g. "EXHIBIT 03.1"
  title: string;
  categoryLabel: string;
  date: string;
  time: string;
  venue: string;
  desc: string;
  imgUrl: string;
  accentColor?: string;
  onRSVP?: (id: string) => void;
}

export function EventCard({
  id,
  exhibitCode = "EXHIBIT 03.1",
  title,
  categoryLabel,
  date,
  time,
  venue,
  desc,
  imgUrl,
  accentColor = "#2C7BE5",
  onRSVP,
}: EventData) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Editorial Exhibit Tag (Always visible on mobile, hover opacity on desktop) */}
      <div className="absolute top-3 right-4 font-mono text-[9px] font-bold tracking-widest text-slate-400 opacity-100 sm:opacity-60 sm:group-hover:opacity-100 transition-opacity">
        [ {exhibitCode} ]
      </div>

      <div>
        {/* Top Header Row with Circle Thumbnail */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-1">
            <span
              className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase border"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}40`,
                color: accentColor,
              }}
            >
              {categoryLabel}
            </span>
            <div className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1 mt-1">
              <Calendar className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>{date}</span>
            </div>
          </div>

          {/* Circular Thumbnail with Duotone Effect */}
          <CircleImage
            src={imgUrl}
            alt={title}
            size={65}
            accentColor={accentColor}
          />
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 mb-2 leading-tight group-hover:text-[#2C7BE5] transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {desc}
        </p>

        {/* Time & Venue Pills */}
        <div className="space-y-1.5 text-[11px] font-mono text-slate-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{venue}</span>
          </div>
        </div>
      </div>

      {/* Interactive Callout Bubble with minimum 44px touch target */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400">
          EVENT REGISTRATION
        </span>
        <button
          onClick={() => onRSVP?.(id)}
          className="callout-bubble text-white shadow-md text-xs font-bold min-h-[44px] px-4"
          style={{ backgroundColor: accentColor }}
        >
          <span>RSVP Pass</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
