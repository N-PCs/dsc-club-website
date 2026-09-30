import React, { useState } from "react";
import {
  Car,
  Building2,
  Briefcase,
  Ticket,
  HelpCircle,
  UserCheck,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";

interface VisitTab {
  id: number;
  label: string;
  icon: React.ReactNode;
  title: string;
  badgeRight: string;
  mainLocation: string;
  subLocation: string;
  additionalInfo: string;
}

const visitTabs: VisitTab[] = [
  {
    id: 1,
    label: "Directions & Parking",
    icon: <Car className="size-5" />,
    title: "Campus Venue & Transit",
    badgeRight: "Complimentary designated parking available for verified attendees.",
    mainLocation: "Located along the Bhopal-Indore National Highway in central India.",
    subLocation: "VIT Bhopal University, Kothri Kalan, Sehore, Madhya Pradesh — 466114",
    additionalInfo:
      "Dedicated university shuttle services run regularly connecting Bhopal Junction, Habibganj (Rani Kamlapati Station), and the campus main gate. Registered hackathon attendees receive arrival parking clearances via email.",
  },
  {
    id: 2,
    label: "Accommodations",
    icon: <Building2 className="size-5" />,
    title: "Hackathon Stay & Dorms",
    badgeRight: "University guest house & dormitory arrangements for outstation cohorts.",
    mainLocation: "On-campus hostel accommodations provided for multi-day hackathon teams.",
    subLocation:
      "Over 8 vetted partner hotels situated along the highway corridor within 20 minutes.",
    additionalInfo:
      "All hackathon teams traveling from outside Madhya Pradesh receive dormitory lodging accommodations, hot water facilities, and designated 24/7 rest lounges inside the Innovation Center.",
  },
  {
    id: 3,
    label: "Hardware & Labs",
    icon: <Briefcase className="size-5" />,
    title: "Workstation Policies & Kit",
    badgeRight: "High-speed 1Gbps fiber drops & surge-protected power strips provided.",
    mainLocation: "Bring your development laptops, hardware microcontrollers, and chargers.",
    subLocation:
      "Prohibited: Unauthorized high-voltage equipment, soldering stations, or open flames.",
    additionalInfo:
      "Dedicated GPU computing clusters, high-speed campus Wi-Fi credentials, and extension boards will be provisioned directly upon registration badge collection.",
  },
  {
    id: 4,
    label: "Passes & QR Check-in",
    icon: <Ticket className="size-5" />,
    title: "Digital Pass Validation",
    badgeRight: "Instant cryptographic QR pass validation at entry turnstiles.",
    mainLocation: "All DSC events require prior portal RSVP and instant digital pass issuance.",
    subLocation: "Passes can be added to your mobile wallet or shown via the DSC club portal.",
    additionalInfo:
      "Early RSVPs guarantee keynote auditorium seats and exclusive event swag packs. Please present your digital pass at the entrance check-in counter to collect your lanyard.",
  },
  {
    id: 5,
    label: "Community FAQs",
    icon: <HelpCircle className="size-5" />,
    title: "Frequently Asked Questions",
    badgeRight: "24/7 support available on our official Discord and community groups.",
    mainLocation:
      "Who can participate? Collegiate developers, designers, and AI researchers across India.",
    subLocation:
      "Do I need advanced ML experience? Beginner bootcamps and advanced tracks run concurrently.",
    additionalInfo:
      "36-hour hackathons provide complimentary catering, midnight energy drinks, and direct 1-on-1 mentorship from industry architects and faculty researchers.",
  },
  {
    id: 6,
    label: "Accessibility",
    icon: <UserCheck className="size-5" />,
    title: "Campus Accessibility",
    badgeRight: "Wheelchair ramps and high-capacity elevators across all academic blocks.",
    mainLocation: "VIT Bhopal University is fully committed to inclusive access for every builder.",
    subLocation: "Dedicated support team available at the front entrance for mobility assistance.",
    additionalInfo:
      "Live closed captions and recorded sessions are provided for major keynote sessions. If you require special physical or dietary accommodations, please specify during event RSVP.",
  },
  {
    id: 7,
    label: "Required ID",
    icon: <ShieldCheck className="size-5" />,
    title: "Identity Verification",
    badgeRight: "Mandatory College Photo ID or Government Photo ID verification.",
    mainLocation:
      "Valid University Student ID card or Government ID (Aadhaar / Voter ID / Passport).",
    subLocation: "Identity details must match the name registered on your DSC portal profile.",
    additionalInfo:
      "Lanyards and attendee badges must be worn throughout hackathons and bootcamps. Badges grant seamless access to computer labs, library lounges, and cafeteria dining halls.",
  },
];

export const SiloPlanYourVisit: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const activeTab = visitTabs.find((t) => t.id === activeTabId) || visitTabs[0];

  return (
    <section
      id="visit"
      className="w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-24"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-xl border border-sky-400/40 bg-sky-950/40 flex items-center justify-center font-mono text-xs font-bold text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              04
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/30 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-sky-400">
              <MapPin className="size-3" />
              <span>VENUE & LOGISTICS PROTOCOLS</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3 uppercase">
            Campus Venue & Logistics
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2">
            Essential navigation, hardware policies, transit corridors, and accommodations for
            hackathons at VIT Bhopal.
          </p>
        </div>

        <div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/20 px-6 py-2.5 text-xs font-mono font-bold tracking-wider text-sky-300 hover:bg-sky-400 hover:text-black transition-all uppercase cursor-pointer"
          >
            <span>CONTACT DESK</span>
            <ArrowRight className="size-3" />
          </a>
        </div>
      </div>

      {/* Row of 7 Vertical Pill Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
        {visitTabs.map((item) => {
          const isActive = item.id === activeTabId;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTabId(item.id)}
              className={`group h-52 sm:h-56 rounded-3xl p-4 sm:p-5 flex flex-col justify-between text-left transition-all duration-300 cursor-pointer border ${
                isActive
                  ? "bg-sky-400 text-black border-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.4)] scale-[1.02]"
                  : "bg-[#050814] text-slate-300 border-sky-400/20 hover:border-sky-400/80 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] hover:-translate-y-1 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`size-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold border ${
                    isActive
                      ? "border-black/30 bg-black/10 text-black"
                      : "border-sky-400/30 bg-black/40 text-sky-400"
                  }`}
                >
                  0{item.id}
                </span>

                {isActive && <span className="size-2 rounded-full bg-black animate-ping" />}
              </div>

              <div
                className={`text-xs font-mono font-semibold tracking-wide uppercase leading-snug ${
                  isActive ? "text-black" : "text-slate-300 group-hover:text-white"
                }`}
              >
                {item.label}
              </div>

              <div
                className={`size-9 rounded-full flex items-center justify-center border transition-all ${
                  isActive
                    ? "border-black/30 bg-black/10 text-black"
                    : "border-sky-400/20 bg-sky-950/30 text-sky-400 group-hover:border-sky-400"
                }`}
              >
                {item.icon}
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Detailed Inspection Card */}
      <div className="rounded-3xl border border-sky-400/30 bg-[#050814] p-8 sm:p-12 text-white relative shadow-[0_0_50px_rgba(56,189,248,0.12)]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sky-400/15 pb-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-sky-400 block mb-1">
              LOGISTICS SPECIFICATION [0{activeTab.id}]
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {activeTab.title}
            </h3>
          </div>

          <div className="sm:max-w-md text-left sm:text-right">
            <span className="text-xs font-mono text-slate-400 leading-relaxed block">
              {activeTab.badgeRight}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider">
              {activeTab.mainLocation}
            </p>
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {activeTab.subLocation}
            </h4>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-l-2 border-sky-400/40 pl-4">
              {activeTab.additionalInfo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
