import React, { useState, useEffect } from "react";
import { dataEngine } from "@/lib/data-engine";
import { account, loginWithOAuth } from "@/lib/appwrite";
import { OAuthProvider } from "appwrite";
import type { UserRoleRecord, RoleType, LeadDomain } from "@/types/models";
import { AdminDashboardOverview } from "@/components/admin/AdminDashboardOverview";
import { RegistrationsAdminView } from "@/components/admin/RegistrationsAdminView";
import { HiringAdminView } from "@/components/hiring/HiringAdminView";
import { TeamLeadManager } from "@/components/admin/TeamLeadManager";
import { ActivityLogView } from "@/components/admin/ActivityLogView";
import { DatabaseBackupView } from "@/components/admin/DatabaseBackupView";
import {
  ShieldCheck,
  Crown,
  GraduationCap,
  Users,
  LayoutDashboard,
  Ticket,
  Briefcase,
  History,
  Settings,
  LogOut,
  RefreshCw,
  Lock,
  UserCheck,
  ChevronDown,
} from "lucide-react";
import "./AdminPanel.css";

const SUPER_ADMIN_EMAIL = "neelpandeyofficial@gmail.com";

export const AdminPanel: React.FC = () => {
  // Session / Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [userRoleRecord, setUserRoleRecord] = useState<UserRoleRecord | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Login form state
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loadingSession, setLoadingSession] = useState<boolean>(true);

  // Check stored session or pre-authenticated role
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedEmail = localStorage.getItem("dsc_admin_authenticated_email");
        if (storedEmail) {
          const role = await dataEngine.getCurrentUserRole(storedEmail);
          if (role.role !== "member") {
            setCurrentUserEmail(storedEmail);
            setUserRoleRecord(role);
            setIsAuthenticated(true);
          }
        } else {
          // Attempt Appwrite session
          const user = await account.get().catch(() => null);
          if (user?.email) {
            const role = await dataEngine.getCurrentUserRole(user.email);
            if (role.role !== "member") {
              setCurrentUserEmail(user.email);
              setUserRoleRecord(role);
              setIsAuthenticated(true);
            }
          }
        }
      } finally {
        setLoadingSession(false);
      }
    };
    checkSession();
  }, []);

  // Handle Login Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const email = emailInput.trim().toLowerCase();
    if (!email) {
      setErrorMsg("Please provide your email address.");
      return;
    }

    const role = await dataEngine.getCurrentUserRole(email);
    if (role.role === "member") {
      setErrorMsg(
        `Access denied. ${email} does not have assigned management panel privileges. Please contact the Club President or Faculty Coordinator.`,
      );
      return;
    }

    localStorage.setItem("dsc_admin_authenticated_email", email);
    setCurrentUserEmail(email);
    setUserRoleRecord(role);
    setIsAuthenticated(true);
    await dataEngine.logActivity(
      email,
      role.fullName,
      role.role,
      "USER_LOGIN",
      "Settings",
      `Logged into the Management Panel as ${role.role} (${role.title})`,
    );
  };

  // Switch demo account / role
  const handleQuickRoleSwitch = async (email: string) => {
    const role = await dataEngine.getCurrentUserRole(email);
    localStorage.setItem("dsc_admin_authenticated_email", email);
    setCurrentUserEmail(email);
    setUserRoleRecord(role);
    setIsAuthenticated(true);
    // Reset tab if current tab is not allowed for the new role
    if (role.role === "team_lead" && (activeTab === "registrations" || activeTab === "team_leads" || activeTab === "settings")) {
      setActiveTab("dashboard");
    }
  };

  // Logout
  const handleLogout = async () => {
    localStorage.removeItem("dsc_admin_authenticated_email");
    await account.deleteSession("current").catch(() => {});
    setIsAuthenticated(false);
    setCurrentUserEmail("");
    setUserRoleRecord(null);
  };

  if (loadingSession) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs">
          <RefreshCw className="size-4 animate-spin" />
          <span>Validating Administrator Credentials...</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // UN-AUTHENTICATED: LOGIN & QUICK ACCESS
  // =========================================================================
  if (!isAuthenticated || !userRoleRecord) {
    return (
      <div className="admin-page-container flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-xl relative text-left">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
            <Lock className="size-6" />
          </div>

          <h2 className="text-2xl font-display font-bold text-white mb-1">
            DSC Club Management Panel
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Restricted to Executive Board, Faculty Coordinator, and Domain Leads.
          </p>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="text-[11px] font-mono text-slate-300 block mb-1">
                Authorized University Email
              </label>
              <input
                type="email"
                placeholder="e.g. president@vitbhopal.ac.in"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-slate-950 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-300 block mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              Sign In to Management Panel →
            </button>
          </form>

          {/* Quick Demo Access Switcher */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-3">
              DEMO / FAST RBAC ACCESS (1-CLICK TESTING)
            </span>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickRoleSwitch(SUPER_ADMIN_EMAIL)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <div>
                  <span className="font-bold text-white block">👑 Super Admin (President)</span>
                  <span className="text-[10px] font-mono text-slate-400">{SUPER_ADMIN_EMAIL}</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400">Universal Access</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleSwitch("coordinator.dsc@vitbhopal.ac.in")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <div>
                  <span className="font-bold text-white block">🎓 Faculty Coordinator</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    coordinator.dsc@vitbhopal.ac.in
                  </span>
                </div>
                <span className="text-[10px] font-mono text-purple-400">Read-Only Oversight</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleSwitch("techlead.dsc@vitbhopal.ac.in")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <div>
                  <span className="font-bold text-white block">💻 Technical Team Lead</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    techlead.dsc@vitbhopal.ac.in
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">Scoped to Technical</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Permissions
  const roleType = userRoleRecord.role;
  const leadDomain = userRoleRecord.leadDomain || "None";
  const isSuperAdmin = roleType === "super_admin";
  const isFaculty = roleType === "faculty_coordinator";
  const isTeamLead = roleType === "team_lead";

  // =========================================================================
  // AUTHENTICATED MANAGEMENT PANEL
  // =========================================================================
  return (
    <div className="admin-page-container max-w-6xl mx-auto px-4 py-8">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isSuperAdmin
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : isFaculty
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              }`}
            >
              {isSuperAdmin && <Crown className="size-3" />}
              {isFaculty && <GraduationCap className="size-3" />}
              {isTeamLead && <Users className="size-3" />}
              <span>{userRoleRecord.title}</span>
            </span>

            {isTeamLead && (
              <span className="px-2 py-0.5 rounded-full font-mono text-[10px] bg-white/10 text-slate-300">
                Scope: {leadDomain}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
            DSC Club Management Panel
          </h1>
          <span className="text-xs text-slate-400 font-mono">
            Signed in as: <strong className="text-slate-200">{currentUserEmail}</strong>
          </span>
        </div>

        {/* Action Controls & Demo Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Fast Switch Role Dropdown */}
          <select
            value={currentUserEmail}
            onChange={(e) => handleQuickRoleSwitch(e.target.value)}
            className="bg-slate-900 border border-white/20 text-white rounded-xl px-3 py-2 text-xs font-mono focus:border-cyan-400 focus:outline-none"
            title="Switch demo role on the fly"
          >
            <option value={SUPER_ADMIN_EMAIL}>👑 President (Super Admin)</option>
            <option value="coordinator.dsc@vitbhopal.ac.in">🎓 Faculty Coordinator</option>
            <option value="techlead.dsc@vitbhopal.ac.in">💻 Technical Lead</option>
            <option value="designlead.dsc@vitbhopal.ac.in">🎨 Design Lead</option>
          </select>

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="size-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Role-Aware Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "dashboard"
              ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
              : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          <LayoutDashboard className="size-3.5" />
          <span>Dashboard</span>
        </button>

        {/* Registrations (Super Admin + Faculty) */}
        {(isSuperAdmin || isFaculty) && (
          <button
            type="button"
            onClick={() => setActiveTab("registrations")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "registrations"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Ticket className="size-3.5" />
            <span>Registrations</span>
          </button>
        )}

        {/* Recruitment (Super Admin, Faculty, and Team Leads) */}
        <button
          type="button"
          onClick={() => setActiveTab("recruitment")}
          className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === "recruitment"
              ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
              : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Briefcase className="size-3.5" />
          <span>Recruitment {isTeamLead ? `(${leadDomain})` : "Candidates"}</span>
        </button>

        {/* Team Leads Governance (Super Admin only) */}
        {isSuperAdmin && (
          <button
            type="button"
            onClick={() => setActiveTab("team_leads")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "team_leads"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Users className="size-3.5" />
            <span>Team Leads (RBAC)</span>
          </button>
        )}

        {/* Audit Logs (Super Admin + Faculty) */}
        {(isSuperAdmin || isFaculty) && (
          <button
            type="button"
            onClick={() => setActiveTab("logs")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "logs"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <History className="size-3.5" />
            <span>Audit Trail</span>
          </button>
        )}

        {/* Settings & Disaster Recovery (Super Admin only) */}
        {isSuperAdmin && (
          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Settings className="size-3.5" />
            <span>Settings & Backup</span>
          </button>
        )}
      </div>

      {/* Tab Content Display */}
      <div className="animate-fadeIn">
        {activeTab === "dashboard" && (
          <AdminDashboardOverview
            userRole={roleType}
            leadDomain={leadDomain}
            onNavigateTab={(t) => setActiveTab(t)}
          />
        )}

        {activeTab === "registrations" && (isSuperAdmin || isFaculty) && (
          <RegistrationsAdminView
            userRole={roleType}
            actorEmail={currentUserEmail}
          />
        )}

        {activeTab === "recruitment" && (
          <HiringAdminView
            userRole={roleType}
            leadDomain={leadDomain}
            actorEmail={currentUserEmail}
          />
        )}

        {activeTab === "team_leads" && isSuperAdmin && (
          <TeamLeadManager actorEmail={currentUserEmail} />
        )}

        {activeTab === "logs" && (isSuperAdmin || isFaculty) && (
          <ActivityLogView />
        )}

        {activeTab === "settings" && isSuperAdmin && (
          <DatabaseBackupView actorEmail={currentUserEmail} />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
