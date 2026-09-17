import React, { useState, useEffect, useMemo } from "react";
import { dataEngine } from "@/lib/data-engine";
import type { ApplicationRecord, ApplicationStatus, LeadDomain, SystemSettings } from "@/types/models";
import * as XLSX from "xlsx";
import {
  Search,
  Filter,
  Download,
  Mail,
  CheckSquare,
  Square,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Edit3,
  Calendar,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  FileSpreadsheet,
  Copy,
  Check,
  UserCheck,
  UserX,
  FileText,
} from "lucide-react";

interface HiringAdminViewProps {
  userRole?: string;
  leadDomain?: LeadDomain;
  actorEmail?: string;
}

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  applied: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  shortlisted: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  interview: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  selected: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  rejected: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export const HiringAdminView: React.FC<HiringAdminViewProps> = ({
  userRole = "super_admin",
  leadDomain = "None",
  actorEmail = "admin@dsc.vitbhopal.ac.in",
}) => {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState<string>(
    userRole === "team_lead" && leadDomain !== "None" ? leadDomain : "All",
  );
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Selection for bulk operations
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Detailed Candidate Drawer
  const [inspectingApp, setInspectingApp] = useState<ApplicationRecord | null>(null);
  const [reviewNoteInput, setReviewNoteInput] = useState("");

  // Email template modal
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState(
    "Data Science Club VIT Bhopal — Recruitment Update",
  );
  const [copiedEmails, setCopiedEmails] = useState(false);

  // Load Data
  const fetchData = async () => {
    try {
      const [apps, sett] = await Promise.all([
        dataEngine.getApplications(userRole === "team_lead" ? leadDomain : undefined),
        dataEngine.getSystemSettings(),
      ]);
      setApplications(apps);
      setSettings(sett);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const handleUpdate = () => fetchData();
    window.addEventListener("dsc_data_change", handleUpdate);
    return () => window.removeEventListener("dsc_data_change", handleUpdate);
  }, [userRole, leadDomain]);

  // Toggle Hiring Status
  const handleToggleHiring = async () => {
    if (!settings) return;
    const nextState = !settings.isHiringOpen;
    const updated = await dataEngine.updateSystemSettings({ isHiringOpen: nextState }, actorEmail);
    setSettings(updated);
  };

  // Update Hiring Deadline
  const handleDeadlineChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const updated = await dataEngine.updateSystemSettings(
      { hiringDeadline: new Date(e.target.value).toISOString() },
      actorEmail,
    );
    setSettings(updated);
  };

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.primaryTeam.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTeam =
        teamFilter === "All" || app.primaryTeam === teamFilter || app.secondaryTeam === teamFilter;

      const matchesStatus = statusFilter === "All" || app.status === statusFilter;

      return matchesSearch && matchesTeam && matchesStatus;
    });
  }, [applications, searchQuery, teamFilter, statusFilter]);

  // Handle single status update
  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    await dataEngine.updateApplicationStatus(id, newStatus, undefined, actorEmail);
    if (inspectingApp && inspectingApp.id === id) {
      setInspectingApp((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    await fetchData();
  };

  // Save reviewer notes
  const handleSaveReviewerNote = async (id: string) => {
    await dataEngine.updateApplicationStatus(id, inspectingApp?.status || "applied", reviewNoteInput, actorEmail);
    if (inspectingApp) {
      setInspectingApp((prev) => (prev ? { ...prev, reviewerNotes: reviewNoteInput } : null));
    }
    await fetchData();
  };

  // Bulk Selection
  const handleSelectAll = () => {
    if (selectedIds.length === filteredApplications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApplications.map((a) => a.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Bulk Status Update
  const handleBulkStatusUpdate = async (status: ApplicationStatus) => {
    if (selectedIds.length === 0) return;
    for (const id of selectedIds) {
      await dataEngine.updateApplicationStatus(id, status, undefined, actorEmail);
    }
    setSelectedIds([]);
    await fetchData();
  };

  // Bulk Export to Excel (.xlsx)
  const handleExportExcel = () => {
    const dataToExport = (selectedIds.length > 0
      ? applications.filter((a) => selectedIds.includes(a.id))
      : filteredApplications
    ).map((a) => ({
      "Application ID": a.id,
      "Full Name": a.fullName,
      "Registration Number": a.registrationNumber,
      Email: a.email,
      Phone: a.phone,
      Branch: a.branch,
      Year: a.year,
      "1st Choice Domain": a.primaryTeam,
      "2nd Choice Domain": a.secondaryTeam || "None",
      Status: a.status.toUpperCase(),
      "Submitted At": new Date(a.submittedAt).toLocaleString(),
      "Why Join": a.whyJoin,
      "GitHub URL": a.githubUrl || "",
      "LinkedIn URL": a.linkedinUrl || "",
      "Portfolio URL": a.portfolioUrl || "",
      "Reviewer Notes": a.reviewerNotes || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Recruitment Applications");
    XLSX.writeFile(
      workbook,
      `DSC_Recruitment_Applications_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  // Bulk Export to CSV
  const handleExportCsv = () => {
    const list = selectedIds.length > 0
      ? applications.filter((a) => selectedIds.includes(a.id))
      : filteredApplications;

    const headers = [
      "ID",
      "Full Name",
      "Reg No",
      "Email",
      "Phone",
      "Branch",
      "Year",
      "Primary Team",
      "Secondary Team",
      "Status",
      "Submitted At",
    ];

    const rows = list.map((a) => [
      a.id,
      `"${a.fullName}"`,
      a.registrationNumber,
      a.email,
      a.phone,
      `"${a.branch}"`,
      a.year,
      `"${a.primaryTeam}"`,
      `"${a.secondaryTeam || "None"}"`,
      a.status,
      `"${new Date(a.submittedAt).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DSC_Applications_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Selected Emails
  const handleCopyEmails = () => {
    const list = selectedIds.length > 0
      ? applications.filter((a) => selectedIds.includes(a.id))
      : filteredApplications;
    const emails = list.map((a) => a.email).join(", ");
    navigator.clipboard.writeText(emails);
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-cyan-400 font-mono text-xs">
        <RefreshCw className="size-4 animate-spin mr-2" />
        <span>Loading Recruitment Applications...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner: Recruitment Status & Admin Controls */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block mb-1">
            RECRUITMENT CAMPAIGN CONTROLS
          </span>
          <div className="flex items-center gap-3">
            <span
              className={`size-2.5 rounded-full ${
                settings?.isHiringOpen ? "bg-emerald-400 animate-pulse" : "bg-rose-500"
              }`}
            />
            <h3 className="text-base font-bold text-white">
              Status: {settings?.isHiringOpen ? "APPLICATIONS OPEN" : "APPLICATIONS CLOSED"}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Deadline Picker */}
          <div className="flex items-center gap-2 bg-slate-900 border border-white/15 px-3 py-1.5 rounded-xl text-xs">
            <Calendar className="size-3.5 text-cyan-400" />
            <span className="text-slate-400">Deadline:</span>
            <input
              type="datetime-local"
              value={settings?.hiringDeadline ? settings.hiringDeadline.slice(0, 16) : ""}
              onChange={handleDeadlineChange}
              disabled={userRole !== "super_admin"}
              className="bg-transparent text-white font-mono text-xs focus:outline-none disabled:opacity-50"
            />
          </div>

          {/* Toggle Button */}
          {userRole === "super_admin" && (
            <button
              type="button"
              onClick={handleToggleHiring}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                settings?.isHiringOpen
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
              }`}
            >
              {settings?.isHiringOpen ? (
                <>
                  <ToggleRight className="size-4 text-rose-400" />
                  <span>Turn Off Recruitment</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="size-4 text-emerald-400" />
                  <span>Open Recruitment</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(["applied", "shortlisted", "interview", "selected", "rejected"] as ApplicationStatus[]).map(
          (st) => {
            const count = applications.filter((a) => a.status === st).length;
            return (
              <div
                key={st}
                onClick={() => setStatusFilter(statusFilter === st ? "All" : st)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === st
                    ? "bg-white/10 border-cyan-400/50 shadow-md shadow-cyan-500/10"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  {st}
                </span>
                <span className="text-xl font-bold font-mono text-white">{count}</span>
              </div>
            );
          },
        )}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by candidate name, roll no, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-white/15 text-white pl-9 pr-4 py-2 rounded-xl text-xs focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Team Filter */}
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            disabled={userRole === "team_lead" && leadDomain !== "None"}
            className="bg-slate-900 border border-white/15 text-white px-3 py-2 rounded-xl text-xs focus:border-cyan-400 focus:outline-none disabled:opacity-50"
          >
            <option value="All">All Domains</option>
            <option value="Technical">Technical</option>
            <option value="AI & Data Science">AI & Data Science</option>
            <option value="Design & Media">Design & Media</option>
            <option value="Content & Editorial">Content & Editorial</option>
            <option value="Management & PR">Management & PR</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-white/15 text-white px-3 py-2 rounded-xl text-xs focus:border-cyan-400 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Export Buttons */}
          <button
            type="button"
            onClick={handleExportExcel}
            className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="size-3.5" />
            <span>Export Excel</span>
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="px-3 py-2 rounded-xl bg-white/10 text-white border border-white/15 text-xs font-bold hover:bg-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="size-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Bulk Action Bar (When Items Selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
            <CheckSquare className="size-4" />
            <span>{selectedIds.length} candidate(s) selected</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400">Mark as:</span>
            <button
              type="button"
              onClick={() => handleBulkStatusUpdate("shortlisted")}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold hover:bg-amber-500/30 cursor-pointer"
            >
              Shortlist
            </button>
            <button
              type="button"
              onClick={() => handleBulkStatusUpdate("interview")}
              className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-bold hover:bg-purple-500/30 cursor-pointer"
            >
              Interview
            </button>
            <button
              type="button"
              onClick={() => handleBulkStatusUpdate("selected")}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold hover:bg-emerald-500/30 cursor-pointer"
            >
              Select
            </button>
            <button
              type="button"
              onClick={() => handleBulkStatusUpdate("rejected")}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold hover:bg-rose-500/30 cursor-pointer"
            >
              Reject
            </button>

            <div className="h-4 w-px bg-white/20 mx-1" />

            <button
              type="button"
              onClick={() => setShowBulkEmailModal(true)}
              className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold hover:bg-cyan-500/30 flex items-center gap-1 cursor-pointer"
            >
              <Mail className="size-3" />
              <span>Bulk Email / Message</span>
            </button>
          </div>
        </div>
      )}

      {/* Applications Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <th className="p-3 w-10 text-center">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="cursor-pointer text-slate-400 hover:text-white"
                >
                  {selectedIds.length === filteredApplications.length &&
                  filteredApplications.length > 0 ? (
                    <CheckSquare className="size-4 text-cyan-400" />
                  ) : (
                    <Square className="size-4" />
                  )}
                </button>
              </th>
              <th className="p-3">Candidate</th>
              <th className="p-3">Domain Choices</th>
              <th className="p-3">Academic Info</th>
              <th className="p-3">Status</th>
              <th className="p-3">Submitted</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredApplications.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500 font-mono">
                  No recruitment applications match the current filter criteria.
                </td>
              </tr>
            ) : (
              filteredApplications.map((app) => {
                const isSelected = selectedIds.includes(app.id);
                return (
                  <tr
                    key={app.id}
                    className={`hover:bg-white/5 transition-colors ${
                      isSelected ? "bg-cyan-500/5" : ""
                    }`}
                  >
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleSelect(app.id)}
                        className="cursor-pointer text-slate-400 hover:text-white"
                      >
                        {isSelected ? (
                          <CheckSquare className="size-4 text-cyan-400" />
                        ) : (
                          <Square className="size-4" />
                        )}
                      </button>
                    </td>

                    {/* Candidate */}
                    <td className="p-3">
                      <div className="font-bold text-white text-xs">{app.fullName}</div>
                      <div className="font-mono text-[10px] text-slate-400">{app.registrationNumber}</div>
                      <div className="text-[10px] text-slate-500">{app.email}</div>
                    </td>

                    {/* Domain Choices */}
                    <td className="p-3">
                      <div className="font-semibold text-cyan-300 text-xs">{app.primaryTeam}</div>
                      {app.secondaryTeam && app.secondaryTeam !== "None" && (
                        <div className="text-[10px] text-slate-400">
                          2nd: {app.secondaryTeam}
                        </div>
                      )}
                    </td>

                    {/* Academic Info */}
                    <td className="p-3">
                      <div className="text-slate-300 text-[11px] truncate max-w-[150px]" title={app.branch}>
                        {app.branch}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{app.year}</div>
                    </td>

                    {/* Status Badge */}
                    <td className="p-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase border ${
                          STATUS_COLORS[app.status]
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* Submitted At */}
                    <td className="p-3 font-mono text-[10px] text-slate-400">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </td>

                    {/* Action Buttons */}
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setInspectingApp(app);
                          setReviewNoteInput(app.reviewerNotes || "");
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 transition-colors cursor-pointer"
                      >
                        <Eye className="size-3.5" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* =========================================================================
          CANDIDATE INSPECTION DRAWER / MODAL
          ========================================================================= */}
      {inspectingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative text-left">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block mb-0.5">
                  APPLICATION DOSSIER #{inspectingApp.id}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {inspectingApp.fullName}
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {inspectingApp.registrationNumber} • {inspectingApp.email} • {inspectingApp.phone}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setInspectingApp(null)}
                className="size-8 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Status Pipeline Controls */}
            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
                TRANSITION CANDIDATE STATUS
              </span>
              <div className="flex flex-wrap gap-2">
                {(["applied", "shortlisted", "interview", "selected", "rejected"] as ApplicationStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(inspectingApp.id, st)}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                        inspectingApp.status === st
                          ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                          : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Core Candidate Data Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-6 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
              <div>
                <span className="text-slate-500 block text-[10px]">1ST CHOICE TEAM</span>
                <span className="font-bold text-cyan-300">{inspectingApp.primaryTeam}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">2ND CHOICE TEAM</span>
                <span className="font-bold text-white">{inspectingApp.secondaryTeam || "None"}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">ACADEMIC BRANCH</span>
                <span className="font-medium text-slate-300 truncate block">{inspectingApp.branch}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">YEAR OF STUDY</span>
                <span className="font-medium text-slate-300">{inspectingApp.year}</span>
              </div>
            </div>

            {/* Dynamic Domain Answers Section */}
            {inspectingApp.domainAnswers && Object.keys(inspectingApp.domainAnswers).length > 0 && (
              <div className="mb-6 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
                  DOMAIN SPECIFIC QUESTION RESPONSES ({inspectingApp.primaryTeam})
                </span>
                <div className="space-y-3 text-xs">
                  {Object.entries(inspectingApp.domainAnswers).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                      <span className="font-mono text-cyan-300 text-[11px] block mb-1">
                        Q: {key.replace(/_/g, " ").toUpperCase()}
                      </span>
                      <p className="text-slate-200 leading-relaxed">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Statement of Purpose */}
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
                WHY DO YOU WANT TO JOIN DSC CLUB?
              </span>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
                {inspectingApp.whyJoin}
              </div>
            </div>

            {/* Work Samples & Resume Links */}
            <div className="mb-6 flex flex-wrap gap-3">
              {inspectingApp.githubUrl && (
                <a
                  href={inspectingApp.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/10 text-white hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="size-3" /> GitHub Profile
                </a>
              )}
              {inspectingApp.linkedinUrl && (
                <a
                  href={inspectingApp.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="size-3" /> LinkedIn Profile
                </a>
              )}
              {inspectingApp.portfolioUrl && (
                <a
                  href={inspectingApp.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="size-3" /> Portfolio Website
                </a>
              )}
              {inspectingApp.resumeFileUrl && (
                <a
                  href={inspectingApp.resumeFileUrl}
                  download={`${inspectingApp.fullName}_Resume.pdf`}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="size-3" /> Download Attached Resume
                </a>
              )}
            </div>

            {/* Private Reviewer Notes */}
            <div className="pt-4 border-t border-white/10">
              <label className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
                INTERNAL REVIEWER NOTES (VISIBLE TO ADMINS ONLY)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Strong React fundamentals, scheduled for technical interview round 2..."
                  value={reviewNoteInput}
                  onChange={(e) => setReviewNoteInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-white/15 text-white rounded-xl px-4 py-2 text-xs focus:border-cyan-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleSaveReviewerNote(inspectingApp.id)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          BULK EMAIL / NOTIFICATION MODAL
          ========================================================================= */}
      {showBulkEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/20 w-full max-w-xl text-left relative">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Mail className="size-4 text-cyan-400" />
                <span>Bulk Applicant Notification</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowBulkEmailModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Generate dispatch emails for <strong>{selectedIds.length}</strong> selected candidate(s).
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Email Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 text-white rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Applicant Email Addresses (BCC)</label>
                <div className="flex gap-2">
                  <textarea
                    rows={3}
                    readOnly
                    value={applications
                      .filter((a) => selectedIds.includes(a.id))
                      .map((a) => a.email)
                      .join(", ")}
                    className="flex-1 bg-slate-900 border border-white/15 text-slate-300 font-mono text-[11px] rounded-xl p-3"
                  />
                  <button
                    type="button"
                    onClick={handleCopyEmails}
                    className="px-3 rounded-xl bg-white/10 text-cyan-300 text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedEmails ? <Check className="size-4" /> : <Copy className="size-4" />}
                    <span>{copiedEmails ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBulkEmailModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs"
                >
                  Close
                </button>
                <a
                  href={`mailto:dsc@vitbhopal.ac.in?bcc=${encodeURIComponent(
                    applications
                      .filter((a) => selectedIds.includes(a.id))
                      .map((a) => a.email)
                      .join(","),
                  )}&subject=${encodeURIComponent(emailSubject)}`}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                >
                  Open in Mail Client
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
