import React, { useState, useEffect } from "react";
import { dataEngine } from "@/lib/data-engine";
import type {
  ClubEvent,
  RegistrationRecord,
  ApplicationRecord,
  FinanceSheet,
  ActivityLog,
  UserRoleRecord,
} from "@/types/models";
import { generateFacultyComprehensivePdf } from "./FacultyComprehensivePdf";
import {
  GraduationCap,
  FileText,
  ShieldCheck,
  Users,
  Ticket,
  Briefcase,
  Wallet,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Download,
  Building,
  CheckCircle2,
  CheckCircle,
} from "lucide-react";

interface FacultyOversightViewProps {
  actorEmail: string;
  onNavigateTab: (tab: string) => void;
}

export const FacultyOversightView: React.FC<FacultyOversightViewProps> = ({
  actorEmail,
  onNavigateTab,
}) => {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [sheets, setSheets] = useState<FinanceSheet[]>([]);
  const [treasury, setTreasury] = useState<{
    overallClubReserves: number;
    totalTreasuryIncome: number;
    totalTreasuryExpense: number;
  }>({
    overallClubReserves: 0,
    totalTreasuryIncome: 0,
    totalTreasuryExpense: 0,
  });
  const [roles, setRoles] = useState<UserRoleRecord[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  useEffect(() => {
    const loadAllFacultyData = async () => {
      try {
        setIsLoading(true);
        const [evts, regs, apps, shts, sum, roleList, logList] = await Promise.all([
          dataEngine.getEvents(),
          dataEngine.getRegistrations(),
          dataEngine.getApplications(),
          dataEngine.getFinanceSheets(),
          dataEngine.getFinanceSummary(),
          dataEngine.getUserRoles(),
          dataEngine.getActivityLogs(),
        ]);
        setEvents(evts);
        setRegistrations(regs);
        setApplications(apps);
        setSheets(shts);
        setTreasury(sum);
        setRoles(roleList);
        setLogs(logList);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllFacultyData();
  }, []);

  // Compute Logistics & Statistics
  const hostellersCount = registrations.filter((r) => r.residenceType === "Hosteller").length;
  const dayScholarsCount = registrations.length - hostellersCount;
  const teamsCount = registrations.filter((r) => r.regType === "team").length;

  const selectedCandidates = applications.filter((a) => a.status === "selected");
  const interviewedCandidates = applications.filter((a) => a.status === "interview");

  const handleDownloadMasterDossier = () => {
    setIsExporting(true);
    try {
      generateFacultyComprehensivePdf({
        facultyName: "Dr. Faculty Coordinator",
        facultyEmail: actorEmail || "coordinator.dsc@vitbhopal.ac.in",
        events,
        registrations,
        applications,
        sheets,
        overallReserves: treasury.overallClubReserves,
        totalIncome: treasury.totalTreasuryIncome,
        totalExpense: treasury.totalTreasuryExpense,
        logsCount: logs.length,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/60 border border-purple-500/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
              <GraduationCap className="size-3.5" />
              <span>FACULTY COORDINATOR OVERSIGHT MANDATE</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Institutional Governance & Audit Dossier
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              University supervisory portal for the Data Science Club (VIT Bhopal). Monitor student
              involvement, verify recruitment equity across academic domains, inspect itemized
              treasury reserves, and generate signed audit dossiers for university administration.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadMasterDossier}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold font-mono text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-500/20"
              title="Download signed semester dossier for submission to university authorities"
            >
              <FileText className="size-4" />
              <span>{isExporting ? "Generating Dossier..." : "Generate Master Dossier (PDF)"}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab("finance")}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold font-mono text-xs border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Wallet className="size-4 text-amber-400" />
              <span>Review Treasury</span>
            </button>
          </div>
        </div>

        {/* Compliance Checklist Chips */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle className="size-3.5" />
            <span>Academic Charter: Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400">
            <ShieldCheck className="size-3.5" />
            <span>Audit Trail: Tamper-Proof</span>
          </div>
          <div className="flex items-center gap-1.5 text-purple-300">
            <Users className="size-3.5" />
            <span>RBAC: Least-Privilege</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <Building className="size-3.5" />
            <span>100% Free-Tier Architecture</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Registrations */}
        <div
          onClick={() => onNavigateTab("registrations")}
          className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 cursor-pointer transition-all"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Student Enrollment
            </span>
            <Ticket className="size-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mb-1">
            {registrations.length}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {hostellersCount} Hostellers • {dayScholarsCount} Day Scholars
          </span>
        </div>

        {/* Recruitment */}
        <div
          onClick={() => onNavigateTab("recruitment")}
          className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 cursor-pointer transition-all"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Talent Recruitment
            </span>
            <Briefcase className="size-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mb-1">
            {applications.length} Applicants
          </div>
          <span className="text-[10px] text-purple-300 font-mono">
            {selectedCandidates.length} Inducted • {interviewedCandidates.length} Interviewed
          </span>
        </div>

        {/* Treasury Reserves */}
        <div
          onClick={() => onNavigateTab("finance")}
          className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 cursor-pointer transition-all"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Treasury Net Reserve
            </span>
            <Wallet className="size-4 text-amber-400" />
          </div>
          <div className={`text-2xl font-bold font-mono ${treasury.overallClubReserves >= 0 ? "text-emerald-400" : "text-rose-400"} mb-1`}>
            ₹{treasury.overallClubReserves.toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Inflow: ₹{treasury.totalTreasuryIncome.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Executive Governance */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Executive Council
            </span>
            <Users className="size-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mb-1">
            {roles.filter((r) => r.isActive).length} Officers
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Super Admins & Domain Leads
          </span>
        </div>
      </div>

      {/* 2-Column Detailed Audit Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Events & Enrollment Schedule */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="size-4 text-cyan-400" />
              <span>Campus Events & Capacity Audit</span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab("registrations")}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-mono"
            >
              <span>View Registrations</span>
              <ArrowRight className="size-3" />
            </button>
          </div>

          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-white text-xs block">{evt.title}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(evt.eventDate).toLocaleDateString()} • {evt.venue}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-cyan-300 font-bold block">
                    {evt.currentRegistrations} / {evt.maxCapacity} enrolled
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    {evt.isPaidEvent ? `Fee: ₹${evt.registrationFee}` : "Free Attendance"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Domain Recruitment Breakdown */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase className="size-4 text-purple-400" />
              <span>Domain Recruitment Quotas</span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab("recruitment")}
              className="text-xs text-purple-400 hover:underline flex items-center gap-1 cursor-pointer font-mono"
            >
              <span>View Candidates</span>
              <ArrowRight className="size-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              "Technical",
              "AI & Data Science",
              "Design & Media",
              "Content & Editorial",
              "Management & PR",
            ].map((domain) => {
              const domainCount = applications.filter((a) => a.primaryTeam === domain).length;
              const selectedCount = applications.filter((a) => a.primaryTeam === domain && a.status === "selected").length;
              const percent = applications.length > 0 ? Math.round((domainCount / applications.length) * 100) : 0;

              return (
                <div
                  key={domain}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{domain}</span>
                    <span className="text-[10px] font-mono text-slate-400">({percent}%)</span>
                  </div>
                  <div className="text-right font-mono text-[11px]">
                    <span className="text-slate-300">{domainCount} applicants</span>
                    <span className="text-purple-300 ml-2 font-bold">({selectedCount} inducted)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Event Finance Ledger Balances */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4 lg:col-span-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Wallet className="size-4 text-amber-400" />
              <span>Event-Wise Treasury Ledger Summaries</span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab("finance")}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-mono"
            >
              <span>Open Finance Ledger</span>
              <ArrowRight className="size-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {sheets.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs font-mono"
              >
                <span className="font-bold text-white font-sans block text-sm">
                  {s.eventTitle}
                </span>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Total Inflow:</span>
                  <span className="text-emerald-400 font-bold">₹{s.totalIncome.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Total Outflow:</span>
                  <span className="text-rose-400 font-bold">₹{s.totalExpense.toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="text-slate-300 text-[10px] uppercase">Net Margin:</span>
                  <span
                    className={`font-bold ${
                      s.netBalance >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    ₹{s.netBalance.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyOversightView;
