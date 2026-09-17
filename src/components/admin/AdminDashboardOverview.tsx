import React, { useState, useEffect } from "react";
import { dataEngine } from "@/lib/data-engine";
import type { ClubEvent, RegistrationRecord, ApplicationRecord, ActivityLog, RoleType, LeadDomain } from "@/types/models";
import {
  Users,
  Calendar,
  Briefcase,
  Wallet,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface AdminDashboardOverviewProps {
  userRole: RoleType;
  leadDomain: LeadDomain;
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  userRole,
  leadDomain,
  onNavigateTab,
}) => {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [treasury, setTreasury] = useState<{ overallClubReserves: number; totalTreasuryIncome: number; totalTreasuryExpense: number }>({
    overallClubReserves: 0,
    totalTreasuryIncome: 0,
    totalTreasuryExpense: 0,
  });
  const [recentLogs, setRecentLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const loadOverview = async () => {
      const [evts, regs, apps, summary, logs] = await Promise.all([
        dataEngine.getEvents(),
        dataEngine.getRegistrations(),
        dataEngine.getApplications(userRole === "team_lead" ? leadDomain : undefined),
        dataEngine.getFinanceSummary(),
        dataEngine.getActivityLogs(),
      ]);
      setEvents(evts);
      setRegistrations(regs);
      setApplications(apps);
      setTreasury(summary);
      setRecentLogs(logs.slice(0, 5));
    };
    loadOverview();
  }, [userRole, leadDomain]);

  const isTeamLead = userRole === "team_lead";

  return (
    <div className="space-y-6 text-left">
      {/* Welcome Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
              <Sparkles className="size-3.5" />
              <span>
                {userRole === "super_admin"
                  ? "SUPER ADMIN CONSOLE"
                  : userRole === "faculty_coordinator"
                  ? "FACULTY COORDINATOR OVERSIGHT"
                  : `TEAM LEAD CONSOLE (${leadDomain})`}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Club Operations Command Center
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              {isTeamLead
                ? `You are managing candidates and activities scoped strictly to the ${leadDomain} domain.`
                : "Real-time visibility across student registrations, core recruitment, and club finances."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onNavigateTab("recruitment")}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Review Candidates</span>
              <ArrowRight className="size-3.5" />
            </button>

            {!isTeamLead && (
              <button
                type="button"
                onClick={() => onNavigateTab("registrations")}
                className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Registrations</span>
                <ArrowRight className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Registrations */}
        <div
          onClick={() => !isTeamLead && onNavigateTab("registrations")}
          className={`p-5 rounded-2xl bg-white/5 border border-white/10 ${
            !isTeamLead ? "hover:border-cyan-500/40 cursor-pointer" : ""
          } transition-all`}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Total Registrations
            </span>
            <Users className="size-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mb-1">
            {registrations.length}
          </div>
          <span className="text-[10px] text-slate-400">Across {events.length} active events</span>
        </div>

        {/* Applications */}
        <div
          onClick={() => onNavigateTab("recruitment")}
          className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              {isTeamLead ? `${leadDomain} Candidates` : "Recruitment Candidates"}
            </span>
            <Briefcase className="size-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mb-1">
            {applications.length}
          </div>
          <span className="text-[10px] text-amber-300">
            {applications.filter((a) => a.status === "applied").length} pending review
          </span>
        </div>

        {/* Active Events */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Upcoming Events
            </span>
            <Calendar className="size-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mb-1">{events.length}</div>
          <span className="text-[10px] text-slate-400">Scheduled on campus</span>
        </div>

        {/* Treasury (Hidden from Team Lead) */}
        {!isTeamLead ? (
          <div
            onClick={() => onNavigateTab("finance")}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Club Reserves Balance
              </span>
              <Wallet className="size-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mb-1">
              ₹{treasury.overallClubReserves.toLocaleString("en-IN")}
            </div>
            <span className="text-[10px] text-slate-400">
              Inflow: ₹{treasury.totalTreasuryIncome.toLocaleString("en-IN")}
            </span>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                Domain Scope
              </span>
              <ShieldAlert className="size-4 text-slate-500" />
            </div>
            <div className="text-lg font-bold text-slate-300 mb-1">{leadDomain}</div>
            <span className="text-[10px] text-slate-500">Finance access restricted to Super Admin</span>
          </div>
        )}
      </div>

      {/* Grid: Events Overview & Recent Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events summary */}
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="size-4 text-cyan-400" />
              <span>Campus Events Tracker</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">{events.length} Events Active</span>
          </div>

          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-white text-xs block">{evt.title}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(evt.eventDate).toLocaleDateString()} • {evt.venue}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-cyan-300 font-bold block">
                    {evt.currentRegistrations} / {evt.maxCapacity}
                  </span>
                  <span className="text-[9px] text-slate-400">
                    {evt.isPaidEvent ? `Fee: ₹${evt.registrationFee}` : "Free Event"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Trail */}
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="size-4 text-cyan-400" />
              <span>Recent Activity Audit</span>
            </h3>
            {!isTeamLead && (
              <button
                type="button"
                onClick={() => onNavigateTab("logs")}
                className="text-xs text-cyan-400 hover:underline cursor-pointer"
              >
                View all logs →
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs flex justify-between items-start gap-2"
              >
                <div>
                  <span className="font-mono text-[10px] text-cyan-400 font-bold mr-1.5 uppercase">
                    [{log.actionType}]
                  </span>
                  <span className="text-slate-300">{log.details}</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500 shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
