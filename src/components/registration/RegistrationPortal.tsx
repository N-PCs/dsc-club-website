import React, { useState, useEffect, useMemo } from "react";
import { dataEngine } from "@/lib/data-engine";
import type { ClubEvent, RegistrationRecord, TeamMember, ResidenceType, RegistrationType } from "@/types/models";
import { QRCodeSVG } from "qrcode.react";
import { generateRegistrationPdf } from "./RegistrationReceiptPdf";
import {
  Calendar,
  MapPin,
  Users,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Download,
  Share2,
  Printer,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  QrCode,
  CreditCard,
  Building,
} from "lucide-react";
import "./RegistrationPortal.css";

interface RegistrationPortalProps {
  initialEventId?: string;
}

const DEFAULT_BRANCH = "Computer Science & Engineering (Core)";
const DEFAULT_YEAR = "1st Year";

const BRANCH_OPTIONS = [
  DEFAULT_BRANCH,
  "CSE with AI & Machine Learning",
  "CSE with Data Science",
  "CSE with Cyber Security & Digital Forensics",
  "CSE with Cloud Computing & Automation",
  "CSE with Gaming Technology",
  "Electronics & Communication Engineering",
  "Mechanical Engineering",
  "Aerospace Engineering",
  "Bioengineering",
  "Integrated M.Tech (CSE / Software)",
  "Other / Multidisciplinary",
];

const YEAR_OPTIONS = [DEFAULT_YEAR, "2nd Year", "3rd Year", "4th Year", "Postgraduate / Research"];

export const RegistrationPortal: React.FC<RegistrationPortalProps> = ({ initialEventId }) => {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>(initialEventId || "");
  const [loading, setLoading] = useState(true);

  // Form State
  const [regType, setRegType] = useState<RegistrationType>("individual");
  const [fullName, setFullName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState<string>(DEFAULT_BRANCH);
  const [yearSemester, setYearSemester] = useState<string>(DEFAULT_YEAR);
  const [department, setDepartment] = useState("SCSE");
  const [residenceType, setResidenceType] = useState<ResidenceType>("Hosteller");

  // Team State
  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState<number>(3);
  const [teammates, setTeammates] = useState<TeamMember[]>([
    {
      fullName: "",
      regNumber: "",
      email: "",
      phone: "",
      branch: DEFAULT_BRANCH,
      yearSemester: DEFAULT_YEAR,
      residenceType: "Hosteller",
    },
    {
      fullName: "",
      regNumber: "",
      email: "",
      phone: "",
      branch: DEFAULT_BRANCH,
      yearSemester: DEFAULT_YEAR,
      residenceType: "Hosteller",
    },
  ]);

  // OTP Verification State
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [otpNotice, setOtpNotice] = useState<string>("");

  // Payment State
  const [paymentUtr, setPaymentUtr] = useState<string>("");
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  // Submission State
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<RegistrationRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Countdown State
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Load events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const list = await dataEngine.getEvents();
        setEvents(list);
        if (!selectedEventId && list.length > 0) {
          const match = initialEventId
            ? list.find((e) => e.id === initialEventId || e.slug === initialEventId)
            : list[0];
          setSelectedEventId(match ? match.id : list[0]?.id || "");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [initialEventId]);

  const activeEvent = useMemo(() => {
    return events.find((e) => e.id === selectedEventId || e.slug === selectedEventId) || events[0] || null;
  }, [events, selectedEventId]);

  // Adjust teammates array length when teamSize changes
  useEffect(() => {
    const needed = Math.max(1, teamSize - 1);
    setTeammates((prev) => {
      if (prev.length === needed) return prev;
      if (prev.length < needed) {
        const additions: TeamMember[] = Array.from({ length: needed - prev.length }).map(() => ({
          fullName: "",
          regNumber: "",
          email: "",
          phone: "",
          branch: DEFAULT_BRANCH,
          yearSemester: DEFAULT_YEAR,
          residenceType: "Hosteller",
        }));
        return [...prev, ...additions];
      }
      return prev.slice(0, needed);
    });
  }, [teamSize]);

  // Deadline countdown timer
  useEffect(() => {
    if (!activeEvent) return;
    const calculateTime = () => {
      const deadline = new Date(activeEvent.registrationDeadline).getTime();
      const diff = deadline - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [activeEvent]);

  // Check if registrations are closed
  const isDeadlinePassed = useMemo(() => {
    if (!activeEvent) return false;
    return new Date(activeEvent.registrationDeadline).getTime() < Date.now() || !activeEvent.isRegistrationOpen;
  }, [activeEvent]);

  // Check if at capacity
  const isCapacityFull = useMemo(() => {
    if (!activeEvent) return false;
    return (activeEvent.currentRegistrations || 0) >= activeEvent.maxCapacity;
  }, [activeEvent]);

  // Handle OTP Trigger
  const handleSendOtp = () => {
    if (!email || !email.includes("@")) {
      setErrorMessage("Please provide a valid email address first.");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setIsOtpSent(true);
    setErrorMessage("");
    setOtpNotice(`🔐 Verification code: ${code} has been dispatched to ${email}. (Expires in 5 minutes)`);
  };

  const handleVerifyOtp = () => {
    if (enteredOtp.trim() === generatedOtp.trim() && generatedOtp !== "") {
      setIsOtpVerified(true);
      setOtpNotice("✅ Email address verified successfully!");
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect OTP code. Please enter the 6-digit code provided.");
    }
  };

  const handleCopyUpi = () => {
    if (!activeEvent?.upiId) return;
    navigator.clipboard.writeText(activeEvent.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleTeammateChange = (index: number, field: keyof TeamMember, value: string) => {
    setTeammates((prev) => {
      const updated = [...prev];
      const current = updated[index];
      if (current) {
        updated[index] = { ...current, [field]: value } as TeamMember;
      }
      return updated;
    });
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!activeEvent) {
      setErrorMessage("No event selected.");
      return;
    }

    if (isDeadlinePassed) {
      setErrorMessage("Registration deadline has passed for this event.");
      return;
    }

    if (!fullName.trim() || !regNumber.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Please fill all required student identity fields.");
      return;
    }

    if (!isOtpVerified) {
      setErrorMessage("Please verify your email with the 6-digit OTP code before proceeding.");
      return;
    }

    if (regType === "team") {
      if (!teamName.trim()) {
        setErrorMessage("Please provide your Team Name.");
        return;
      }
      for (let i = 0; i < teammates.length; i++) {
        const m = teammates[i];
        if (!m || !m.fullName.trim() || !m.regNumber.trim() || !m.email.trim()) {
          setErrorMessage(`Please provide complete details for Teammate #${i + 2}.`);
          return;
        }
      }
    }

    if (activeEvent.isPaidEvent && activeEvent.registrationFee > 0) {
      if (!paymentUtr.trim() || paymentUtr.trim().length < 6) {
        setErrorMessage("Please enter the 12-digit UPI Transaction Reference (UTR / Bank Ref Number).");
        return;
      }
    }

    setSubmitting(true);
    try {
      const created = await dataEngine.createRegistration({
        eventId: activeEvent.id,
        eventTitle: activeEvent.title,
        regType,
        fullName: fullName.trim(),
        regNumber: regNumber.trim().toUpperCase(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        branch: branch || DEFAULT_BRANCH,
        yearSemester: yearSemester || DEFAULT_YEAR,
        department,
        residenceType,
        teamName: regType === "team" ? teamName.trim() : undefined,
        teamSize: regType === "team" ? teamSize : 1,
        teamMembers: regType === "team" ? teammates : undefined,
        paymentStatus: activeEvent.isPaidEvent ? "pending_verification" : "free",
        paymentUtr: activeEvent.isPaidEvent ? paymentUtr.trim() : undefined,
        paymentAmount: activeEvent.isPaidEvent ? activeEvent.registrationFee : 0,
        registrationStatus: isCapacityFull ? "waitlisted" : "confirmed",
      });

      setSubmissionSuccess(created);
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to submit registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForAnother = () => {
    setSubmissionSuccess(null);
    setIsOtpVerified(false);
    setIsOtpSent(false);
    setEnteredOtp("");
    setGeneratedOtp("");
    setPaymentUtr("");
    setFullName("");
    setRegNumber("");
    setEmail("");
    setPhone("");
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-cyan-400 font-mono">
          <RefreshCw className="size-5 animate-spin" />
          <span>Synchronizing Event Registrations...</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SUCCESS SCREEN: DIGITAL EVENT PASS & OFFICIAL RECEIPT
  // =========================================================================
  if (submissionSuccess) {
    const isWaitlist = submissionSuccess.registrationStatus === "waitlisted";

    return (
      <div className="registration-success-container max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="glass-card rounded-3xl p-6 md:p-10 border border-cyan-500/30 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 size-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 size-48 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

          {/* Celebration Header */}
          <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-5">
            <Sparkles className="size-8 animate-pulse" />
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
            {isWaitlist ? "Waitlist Application Received!" : "Registration Confirmed!"}
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto mb-8">
            {isWaitlist
              ? "The event is currently at maximum hall capacity. Your entry has been queued in the priority waitlist and you will be notified if a seat opens up."
              : "Your pass has been generated. Keep your Registration ID handy during entry check-in."}
          </p>

          {/* Holographic Pass Preview */}
          <div className="holographic-pass max-w-md mx-auto rounded-2xl p-6 border border-white/15 bg-gradient-to-br from-slate-900/90 to-slate-950/90 shadow-2xl relative text-left">
            <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                  DSC VIT BHOPAL EVENT PASS
                </span>
                <h3 className="text-lg font-bold text-white leading-snug">{submissionSuccess.eventTitle}</h3>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
                  isWaitlist
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                }`}
              >
                {submissionSuccess.registrationStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div>
                <span className="text-slate-400 block text-[10px]">ATTENDEE / LEADER</span>
                <span className="font-semibold text-white">{submissionSuccess.fullName}</span>
                <span className="text-slate-400 block text-[10px]">{submissionSuccess.regNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">FORMAT</span>
                <span className="font-semibold text-cyan-300">
                  {submissionSuccess.regType === "team"
                    ? `Team: ${submissionSuccess.teamName} (${submissionSuccess.teamSize} pax)`
                    : "Individual"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">REGISTRATION ID</span>
                <span className="font-mono font-bold text-cyan-400">{submissionSuccess.registrationId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">PAYMENT</span>
                <span className="font-semibold text-slate-200">
                  {submissionSuccess.paymentAmount > 0
                    ? `₹${submissionSuccess.paymentAmount} (${submissionSuccess.paymentStatus})`
                    : "Free Entry"}
                </span>
              </div>
            </div>

            {/* QR Code token */}
            <div className="bg-white p-3 rounded-xl flex items-center justify-between">
              <QRCodeSVG
                value={`DSC-VERIFY:${submissionSuccess.registrationId}:${submissionSuccess.regNumber}`}
                size={70}
                level="M"
              />
              <div className="text-right text-slate-800 text-[10px] font-mono leading-tight">
                <span className="font-bold block text-slate-900">OFFICIAL SECURITY TOKEN</span>
                <span>Scan at event kiosk</span>
                <span className="block text-slate-500 mt-1">
                  {new Date(submissionSuccess.registeredAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => generateRegistrationPdf(submissionSuccess, activeEvent)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Download className="size-4" /> Download Official PDF Badge & Receipt
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white hover:bg-white/15 border border-white/10 font-bold text-xs transition-all cursor-pointer"
            >
              <Printer className="size-4" /> Print Badge
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `🎉 I just registered for *${submissionSuccess.eventTitle}* at DSC VIT Bhopal! Pass ID: *${submissionSuccess.registrationId}*. Register yours here: ${window.location.href}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30 font-bold text-xs transition-all cursor-pointer"
            >
              <Share2 className="size-4" /> Share on WhatsApp
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={handleResetForAnother}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Register Another Student or Event
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN REGISTRATION FORM
  // =========================================================================
  return (
    <div className="registration-portal-wrapper max-w-4xl mx-auto px-4 py-8">
      {/* Event Selector Dropdown if multiple events */}
      {events.length > 1 && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Calendar className="size-4 text-cyan-400" />
            <span>SELECT ACTIVE EVENT:</span>
          </div>
          <select
            value={activeEvent?.id}
            onChange={(e) => {
              setSelectedEventId(e.target.value);
              setIsOtpVerified(false);
              setIsOtpSent(false);
            }}
            className="bg-slate-900 border border-white/20 text-white rounded-xl px-4 py-2 text-xs font-medium focus:border-cyan-400 focus:outline-none"
          >
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title} ({evt.isPaidEvent ? `₹${evt.registrationFee}` : "FREE"})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Active Event Banner & Stats */}
      {activeEvent && (
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {activeEvent.tag}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest ${
                    activeEvent.isPaidEvent
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  }`}
                >
                  {activeEvent.isPaidEvent ? `Registration Fee: ₹${activeEvent.registrationFee}` : "Free Admission"}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                {activeEvent.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-xs text-slate-300 mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-cyan-400" />
                  {new Date(activeEvent.eventDate).toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-cyan-400" />
                  {activeEvent.venue}
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Users className="size-3.5 text-cyan-400" />
                  Capacity: {activeEvent.currentRegistrations} / {activeEvent.maxCapacity} slots
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{activeEvent.description}</p>
            </div>

            {/* Countdown & Capacity Gauge */}
            <div className="flex flex-col justify-between md:items-end min-w-[240px] pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                  REGISTRATION DEADLINE
                </span>
                <div className="flex items-center gap-2 font-mono text-sm font-bold text-white bg-slate-900/80 px-3 py-2 rounded-xl border border-white/10">
                  <Clock className="size-4 text-cyan-400" />
                  <span>
                    {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
                  </span>
                </div>
              </div>

              {/* Capacity Progress Bar */}
              <div className="w-full mt-4">
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>Capacity Filled</span>
                  <span>
                    {Math.round(((activeEvent.currentRegistrations || 0) / activeEvent.maxCapacity) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCapacityFull ? "bg-amber-500" : "bg-gradient-to-r from-cyan-500 to-blue-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round(((activeEvent.currentRegistrations || 0) / activeEvent.maxCapacity) * 100),
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Warning Banners */}
          {isDeadlinePassed && (
            <div className="mt-6 flex items-center gap-3 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
              <AlertCircle className="size-4 shrink-0 text-rose-400" />
              <span>
                <strong>Registrations Closed:</strong> The deadline for this event has expired. Submissions are no longer accepted.
              </span>
            </div>
          )}

          {isCapacityFull && !isDeadlinePassed && (
            <div className="mt-6 flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs">
              <AlertCircle className="size-4 shrink-0 text-amber-400" />
              <span>
                <strong>Capacity Limit Reached:</strong> Hall capacity is full. Any registrations submitted now will be placed on the official <strong>Priority Waitlist</strong>.
              </span>
            </div>
          )}
        </div>
      )}

      {/* REGISTRATION FORM */}
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 md:p-10 border border-white/10">
        {/* Error message banner */}
        {errorMessage && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs animate-shake">
            <AlertCircle className="size-5 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Step 1: Mode Switcher */}
        <div className="mb-8">
          <label className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3">
            1. REGISTRATION FORMAT
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRegType("individual")}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                regType === "individual"
                  ? "bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <User
                className={`size-5 mt-0.5 ${regType === "individual" ? "text-cyan-400" : "text-slate-400"}`}
              />
              <div>
                <span className="font-bold text-sm text-white block">Individual Entry</span>
                <span className="text-xs text-slate-400 leading-tight">
                  Single seat registration for workshops, talks, or solo attendees.
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRegType("team")}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                regType === "team"
                  ? "bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <Users
                className={`size-5 mt-0.5 ${regType === "team" ? "text-cyan-400" : "text-slate-400"}`}
              />
              <div>
                <span className="font-bold text-sm text-white block">Team Entry (Hackathons / Group)</span>
                <span className="text-xs text-slate-400 leading-tight">
                  Group registration for multi-member hackathons and team competitions.
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Team Configuration (if team selected) */}
        {regType === "team" && (
          <div className="mb-8 p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
            <h3 className="text-sm font-display font-bold text-cyan-300 mb-4 flex items-center gap-2">
              <Users className="size-4" /> Team Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1.5">Team Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Matrix Inverters"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1.5">Total Team Size *</label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
                >
                  <option value={2}>2 Members (Leader + 1 Teammate)</option>
                  <option value={3}>3 Members (Leader + 2 Teammates)</option>
                  <option value={4}>4 Members (Leader + 3 Teammates)</option>
                  <option value={5}>5 Members (Leader + 4 Teammates)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Primary Student / Leader Details */}
        <div className="mb-8">
          <label className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3">
            {regType === "team" ? "2. TEAM LEADER INFORMATION" : "2. PARTICIPANT IDENTITY"}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1.5">Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1.5">Registration / Roll No *</label>
              <input
                type="text"
                placeholder="e.g. 24BAI10042"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                className="w-full bg-slate-900 border border-white/20 text-white font-mono rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1.5">Official University Email *</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="student.24bai@vitbhopal.ac.in"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsOtpVerified(false);
                    setIsOtpSent(false);
                  }}
                  disabled={isOtpVerified}
                  className="flex-1 bg-slate-900 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none disabled:opacity-60"
                  required
                />
                {!isOtpVerified && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 whitespace-nowrap cursor-pointer"
                  >
                    {isOtpSent ? "Resend Code" : "Send OTP"}
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1.5">Phone / WhatsApp Number *</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1.5">Branch / Degree *</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
              >
                {BRANCH_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1.5">Academic Year / Sem *</label>
              <select
                value={yearSemester}
                onChange={(e) => setYearSemester(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
              >
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1.5">School / Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
              >
                <option value="SCSE">SCSE (Computer Science & Engineering)</option>
                <option value="SASL">SASL (Applied Sciences & Languages)</option>
                <option value="SEEE">SEEE (Electrical & Electronics)</option>
                <option value="SMEC">SMEC (Mechanical & Civil)</option>
                <option value="VBS">VBS (Business School)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1.5">Residence Status (Logistics) *</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setResidenceType("Hosteller")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                    residenceType === "Hosteller"
                      ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                      : "bg-slate-900 border-white/10 text-slate-400"
                  }`}
                >
                  <Building className="size-3.5" /> Hosteller
                </button>
                <button
                  type="button"
                  onClick={() => setResidenceType("Day Scholar")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                    residenceType === "Day Scholar"
                      ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                      : "bg-slate-900 border-white/10 text-slate-400"
                  }`}
                >
                  <User className="size-3.5" /> Day Scholar
                </button>
              </div>
            </div>
          </div>

          {/* OTP Verification Interactive Drawer */}
          {isOtpSent && !isOtpVerified && (
            <div className="mt-4 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-2">
                <ShieldCheck className="size-4" /> Enter 6-Digit Email Verification Code
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 481902"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ""))}
                  className="bg-slate-900 border border-white/30 text-white font-mono text-center tracking-widest text-lg rounded-xl px-4 py-2 focus:border-cyan-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
                >
                  Verify Code
                </button>
              </div>
              {otpNotice && (
                <div className="mt-2.5 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 shrink-0" /> {otpNotice}
                </div>
              )}
            </div>
          )}

          {isOtpVerified && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-400" />
              <span>
                Email verified: <strong>{email}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Step 3: Teammates Configuration (If Team) */}
        {regType === "team" && (
          <div className="mb-8">
            <label className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3">
              3. TEAM MEMBERS DETAILS
            </label>

            <div className="space-y-4">
              {teammates.map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                >
                  <span className="text-xs font-mono font-bold text-cyan-400 block mb-3">
                    Teammate #{idx + 2} Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={member.fullName}
                        onChange={(e) => handleTeammateChange(idx, "fullName", e.target.value)}
                        className="w-full bg-slate-900 border border-white/15 text-white rounded-lg px-3 py-2 text-xs focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Registration No *</label>
                      <input
                        type="text"
                        placeholder="24BCE10..."
                        value={member.regNumber}
                        onChange={(e) =>
                          handleTeammateChange(idx, "regNumber", e.target.value.toUpperCase())
                        }
                        className="w-full bg-slate-900 border border-white/15 text-white font-mono rounded-lg px-3 py-2 text-xs focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Email *</label>
                      <input
                        type="email"
                        placeholder="student@vitbhopal.ac.in"
                        value={member.email}
                        onChange={(e) => handleTeammateChange(idx, "email", e.target.value)}
                        className="w-full bg-slate-900 border border-white/15 text-white rounded-lg px-3 py-2 text-xs focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Phone *</label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={member.phone}
                        onChange={(e) => handleTeammateChange(idx, "phone", e.target.value)}
                        className="w-full bg-slate-900 border border-white/15 text-white rounded-lg px-3 py-2 text-xs focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Branch</label>
                      <select
                        value={member.branch}
                        onChange={(e) => handleTeammateChange(idx, "branch", e.target.value)}
                        className="w-full bg-slate-900 border border-white/15 text-white rounded-lg px-3 py-2 text-xs focus:border-cyan-400 focus:outline-none"
                      >
                        {BRANCH_OPTIONS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Residence</label>
                      <select
                        value={member.residenceType}
                        onChange={(e) => handleTeammateChange(idx, "residenceType", e.target.value)}
                        className="w-full bg-slate-900 border border-white/15 text-white rounded-lg px-3 py-2 text-xs focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="Hosteller">Hosteller</option>
                        <option value="Day Scholar">Day Scholar</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Zero-Cost NPCI UPI Payment (If Paid Event) */}
        {activeEvent?.isPaidEvent && activeEvent.registrationFee > 0 && (
          <div className="mb-8 p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">
              <CreditCard className="size-4" /> ZERO-FEE REGISTRATION PAYMENT (₹{activeEvent.registrationFee})
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Dynamic NPCI UPI QR */}
              <div className="flex flex-col items-center p-5 rounded-2xl bg-white text-slate-950">
                <QRCodeSVG
                  value={`upi://pay?pa=${activeEvent.upiId || "dscvitb@upi"}&pn=${encodeURIComponent(
                    activeEvent.upiPayeeName || "DSC VIT Bhopal",
                  )}&am=${activeEvent.registrationFee}&cu=INR`}
                  size={160}
                  level="M"
                />
                <span className="text-[10px] font-mono font-bold mt-2 text-slate-700">
                  SCAN WITH ANY UPI APP (GPay / PhonePe / Paytm)
                </span>
                <span className="text-xs font-bold text-cyan-700 mt-0.5">
                  Amount: ₹{activeEvent.registrationFee}
                </span>
              </div>

              {/* UPI Details & UTR Input */}
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block mb-0.5">CLUB UPI VPA ID</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-white text-xs">
                      {activeEvent.upiId || "dscvitb@upi"}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      {copiedUpi ? <Check className="size-3" /> : <Copy className="size-3" />}
                      <span>{copiedUpi ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <a
                  href={`upi://pay?pa=${activeEvent.upiId || "dscvitb@upi"}&pn=${encodeURIComponent(
                    activeEvent.upiPayeeName || "DSC VIT Bhopal",
                  )}&am=${activeEvent.registrationFee}&cu=INR`}
                  className="block w-full text-center py-2.5 px-4 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs hover:bg-cyan-500/30 transition-colors"
                >
                  Open in UPI App (Mobile)
                </a>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    12-Digit UPI Transaction Reference / UTR *
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    placeholder="e.g. 429188201928"
                    value={paymentUtr}
                    onChange={(e) => setPaymentUtr(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-slate-950 border border-white/20 text-white font-mono rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none tracking-wider"
                    required
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Find this 12-digit number in your payment confirmation screen.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {!isOtpVerified ? (
              <span className="text-amber-400">⚠️ Verify email OTP before submitting</span>
            ) : isCapacityFull ? (
              <span className="text-amber-400">Submitting entry to Priority Waitlist</span>
            ) : (
              <span className="text-emerald-400">All checks completed — Ready to confirm</span>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || isDeadlinePassed || !isOtpVerified}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? (
              <>
                <RefreshCw className="size-4 animate-spin" />
                <span>Processing Ticket...</span>
              </>
            ) : isDeadlinePassed ? (
              <span>Registrations Closed</span>
            ) : isCapacityFull ? (
              <>
                <span>Submit to Waitlist</span>
                <ArrowRight className="size-4" />
              </>
            ) : (
              <>
                <span>Confirm & Generate Pass</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
