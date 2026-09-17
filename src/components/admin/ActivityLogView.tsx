import React, { useState, useEffect, useMemo } from "react";
import { dataEngine } from "@/lib/data-engine";
import type { ActivityLog } from "@/types/models";
import { Search, History, Download, RefreshCw } from "lucide-react";

export const ActivityLogView: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");

  const fetchLogs = async () => {
    try {
      const all = await dataEngine.getActivityLogs();
      setLogs(all);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const handleUpdate = () => fetchLogs();
    window.addEventListener("dsc_data_change", handleUpdate);
    return () => window.removeEventListener("dsc_data_change", handleUpdate);
  }, []);

  const filtered = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.actorEmail.toLowerCase().includes(search.toLowerCase()) ||
        log.actionType.toLowerCase().includes(search.toLowerCase()) ||
        log.details.toLowerCase().includes(search.toLowerCase());
      const matchesModule = moduleFilter === "All" || log.targetModule === moduleFilter;
      return matchesSearch && matchesModule;
    });
  }, [logs, search, moduleFilter]);

  const handleExportCsv = () => {
    const headers = ["Timestamp", "Actor Email", "Actor Name", "Role", "Action Type", "Module", "Details"];
    const rows = filtered.map((l) => [
      `"${new Date(l.timestamp).toLocaleString()}"`,
      l.actorEmail,
      `"${l.actorName}"`,
      l.actorRole,
      l.actionType,
      l.targetModule,
      `"${l.details.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encoded = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", `DSC_Audit_Logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-cyan-400 font-mono text-xs">
        <RefreshCw className="size-4 animate-spin mr-2" />
        <span>Loading Audit Trail...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      {/* Header bar */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
          <History className="size-4" />
          <span>IMMUTABLE SYSTEM AUDIT LOG ({logs.length} Recorded Entries)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-3 py-1.5 rounded-xl bg-white/10 text-white border border-white/15 text-xs font-bold hover:bg-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="size-3" />
            <span>Export Audit CSV</span>
          </button>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit trail by actor, action type, or details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-white/15 text-white pl-9 pr-4 py-2 rounded-xl text-xs focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="bg-slate-900 border border-white/15 text-white px-3 py-2 rounded-xl text-xs focus:border-cyan-400 focus:outline-none"
        >
          <option value="All">All Modules</option>
          <option value="Registration">Registration</option>
          <option value="Hiring">Hiring</option>
          <option value="Finance">Finance</option>
          <option value="UserRole">User Roles</option>
          <option value="Settings">Settings</option>
        </select>
      </div>

      {/* Log list */}
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 overflow-hidden">
        <div className="divide-y divide-white/5 text-xs">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono">
              No audit records match your search criteria.
            </div>
          ) : (
            filtered.map((log) => (
              <div
                key={log.id}
                className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 hover:bg-white/5 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {log.targetModule}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-white">
                      {log.actionType}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      by {log.actorEmail} ({log.actorRole})
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{log.details}</p>
                </div>

                <span className="font-mono text-[10px] text-slate-500 shrink-0">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
