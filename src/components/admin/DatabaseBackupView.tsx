import React, { useState, useEffect } from "react";
import { dataEngine } from "@/lib/data-engine";
import type { SystemSettings } from "@/types/models";
import { Database, Download, Upload, CheckCircle2, AlertCircle, RefreshCw, Bell } from "lucide-react";

interface DatabaseBackupViewProps {
  actorEmail?: string;
}

export const DatabaseBackupView: React.FC<DatabaseBackupViewProps> = ({
  actorEmail = "admin@dsc.vitbhopal.ac.in",
}) => {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [headline, setHeadline] = useState("");
  const [showHeadline, setShowHeadline] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const s = await dataEngine.getSystemSettings();
        setSettings(s);
        setHeadline(s.announcementHeadline);
        setShowHeadline(s.showAnnouncement);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSaveHeadline = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("");
    setErrorMsg("");
    try {
      const updated = await dataEngine.updateSystemSettings(
        {
          announcementHeadline: headline.trim(),
          showAnnouncement: showHeadline,
        },
        actorEmail,
      );
      setSettings(updated);
      setStatusMsg("Site headline banner updated successfully!");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to update headline.");
    }
  };

  const handleExportBackup = async () => {
    setStatusMsg("");
    setErrorMsg("");
    try {
      const json = await dataEngine.exportFullDatabaseBackup();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `DSC_VITB_Full_Database_Backup_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusMsg("Full database backup downloaded successfully!");
    } catch (err: any) {
      setErrorMsg(err?.message || "Export failed.");
    }
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm("WARNING: Restoring from a backup will overwrite current database records. Proceed?")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const content = reader.result as string;
        const success = await dataEngine.restoreDatabaseBackup(content, actorEmail);
        if (success) {
          setStatusMsg("Database restored successfully from backup!");
          setTimeout(() => window.location.reload(), 1500);
        } else {
          setErrorMsg("Failed to restore backup. Invalid file format.");
        }
      } catch (err: any) {
        setErrorMsg("Restore failed: " + err?.message);
      }
    };
    reader.readAsText(file);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-cyan-400 font-mono text-xs">
        <RefreshCw className="size-4 animate-spin mr-2" />
        <span>Loading System Controls...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="size-4" /> {statusMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="size-4" /> {errorMsg}
        </div>
      )}

      {/* Website Announcement Banner Controls */}
      <form onSubmit={handleSaveHeadline} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase tracking-widest">
          <Bell className="size-4" />
          <span>Website Global Announcement Banner</span>
        </div>

        <div>
          <label className="text-xs text-slate-300 block mb-1">Ticker Headline Text</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full bg-slate-900 border border-white/15 text-white rounded-xl px-4 py-2.5 text-xs focus:border-cyan-400 focus:outline-none"
            placeholder="e.g. 🚀 Core Team Recruitments 2026 are LIVE! Apply now."
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showHeadline}
              onChange={(e) => setShowHeadline(e.target.checked)}
              className="size-4 accent-cyan-400"
            />
            <span>Show Announcement Banner Across Public Pages</span>
          </label>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Save Announcement
          </button>
        </div>
      </form>

      {/* Zero-Cost Full Database Backup & Restore */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase tracking-widest">
          <Database className="size-4" />
          <span>Zero-Cost Database Backup & Disaster Recovery</span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Create an offline JSON snapshot of all 7 collections (Events, Registrations, Hiring Applications,
          User Roles, Finance Ledgers, Activity Logs, and System Settings). No third-party backup service fees.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleExportBackup}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="size-4" />
            <span>Download Database Snapshot (JSON)</span>
          </button>

          <label className="px-5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/15 border border-white/15 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer">
            <Upload className="size-4" />
            <span>Restore From JSON Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleRestoreBackup}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
