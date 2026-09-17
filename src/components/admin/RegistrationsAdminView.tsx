import React, { useState, useEffect, useMemo } from "react";
import { dataEngine } from "@/lib/data-engine";
import type { RegistrationRecord, ClubEvent } from "@/types/models";
import * as XLSX from "xlsx";
import {
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  FileSpreadsheet,
  RefreshCw,
  Eye,
  Users,
  User,
  CreditCard,
  Building,
} from "lucide-react";
import { generateRegistrationPdf } from "@/components/registration/RegistrationReceiptPdf";

interface RegistrationsAdminViewProps {
  userRole?: string;
  actorEmail?: string;
}

export const RegistrationsAdminView: React.FC<RegistrationsAdminViewProps> = ({
  userRole = "super_admin",
  actorEmail = "admin@dsc.vitbhopal.ac.in",
}) => {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [paymentFilter, setPaymentFilter] = useState<string>("All");

  // Inspect Modal
  const [inspectingReg, setInspectingReg] = useState<RegistrationRecord | null>(null);

  const fetchData = async () => {
    try {
      const [regs, evts] = await Promise.all([
        dataEngine.getRegistrations(),
        dataEngine.getEvents(),
      ]);
      setRegistrations(regs);
      setEvents(evts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const handleUpdate = () => fetchData();
    window.addEventListener("dsc_data_change", handleUpdate);
    return () => window.removeEventListener("dsc_data_change", handleUpdate);
  }, []);

  const isReadOnly = userRole === "faculty_coordinator";

  // Filtered registrations
  const filtered = useMemo(() => {
    return registrations.filter((r) => {
      const matchesSearch =
        r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.registrationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.teamName && r.teamName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesEvent = selectedEventId === "All" || r.eventId === selectedEventId;
      const matchesStatus = statusFilter === "All" || r.registrationStatus === statusFilter;
      const matchesPayment = paymentFilter === "All" || r.paymentStatus === paymentFilter;

      return matchesSearch && matchesEvent && matchesStatus && matchesPayment;
    });
  }, [registrations, searchQuery, selectedEventId, statusFilter, paymentFilter]);

  // Status updates
  const handleVerifyPayment = async (id: string) => {
    if (isReadOnly) return;
    await dataEngine.updateRegistrationStatus(id, { paymentStatus: "paid" }, actorEmail);
    if (inspectingReg && inspectingReg.id === id) {
      setInspectingReg((prev) => (prev ? { ...prev, paymentStatus: "paid" } : null));
    }
    await fetchData();
  };

  const handleUpdateStatus = async (
    id: string,
    newStatus: RegistrationRecord["registrationStatus"],
  ) => {
    if (isReadOnly) return;
    await dataEngine.updateRegistrationStatus(id, { registrationStatus: newStatus }, actorEmail);
    if (inspectingReg && inspectingReg.id === id) {
      setInspectingReg((prev) => (prev ? { ...prev, registrationStatus: newStatus } : null));
    }
    await fetchData();
  };

  // Export Excel (.xlsx)
  const handleExportExcel = () => {
    const dataToExport = filtered.map((r) => ({
      "Registration ID": r.registrationId,
      "Event Title": r.eventTitle,
      Type: r.regType.toUpperCase(),
      "Full Name": r.fullName,
      "Roll Number": r.regNumber,
      Email: r.email,
      Phone: r.phone,
      Branch: r.branch,
      Year: r.yearSemester,
      Department: r.department,
      Residence: r.residenceType,
      "Team Name": r.teamName || "N/A",
      "Team Size": r.teamSize || 1,
      "Payment Amount": r.paymentAmount,
      "Payment Status": r.paymentStatus.toUpperCase(),
      "Payment UTR": r.paymentUtr || "N/A",
      "Registration Status": r.registrationStatus.toUpperCase(),
      "Registered At": new Date(r.registeredAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(
      workbook,
      `DSC_Event_Registrations_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      "Reg ID",
      "Event",
      "Type",
      "Name",
      "Roll No",
      "Email",
      "Phone",
      "Branch",
      "Residence",
      "Team Name",
      "Pay Status",
      "UTR",
      "Status",
      "Date",
    ];

    const rows = filtered.map((r) => [
      r.registrationId,
      `"${r.eventTitle}"`,
      r.regType,
      `"${r.fullName}"`,
      r.regNumber,
      r.email,
      r.phone,
      `"${r.branch}"`,
      r.residenceType,
      `"${r.teamName || ""}"`,
      r.paymentStatus,
      r.paymentUtr || "",
      r.registrationStatus,
      `"${new Date(r.registeredAt).toLocaleDateString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const encoded = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", `DSC_Registrations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-cyan-400 font-mono text-xs">
        <RefreshCw className="size-4 animate-spin mr-2" />
        <span>Loading Event Registrations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Total Registrations
          </span>
          <span className="text-2xl font-bold font-mono text-white">{registrations.length}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Confirmed Attendees
          </span>
          <span className="text-2xl font-bold font-mono text-emerald-400">
            {registrations.filter((r) => r.registrationStatus === "confirmed").length}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Waitlist Queue
          </span>
          <span className="text-2xl font-bold font-mono text-amber-400">
            {registrations.filter((r) => r.registrationStatus === "waitlisted").length}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Pending UTR Verification
          </span>
          <span className="text-2xl font-bold font-mono text-purple-400">
            {registrations.filter((r) => r.paymentStatus === "pending_verification").length}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, roll number, team, or registration ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-white/15 text-white pl-9 pr-4 py-2 rounded-xl text-xs focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Event Filter */}
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="bg-slate-900 border border-white/15 text-white px-3 py-2 rounded-xl text-xs focus:border-cyan-400 focus:outline-none"
          >
            <option value="All">All Events</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-white/15 text-white px-3 py-2 rounded-xl text-xs focus:border-cyan-400 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="waitlisted">Waitlisted</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-slate-900 border border-white/15 text-white px-3 py-2 rounded-xl text-xs focus:border-cyan-400 focus:outline-none"
          >
            <option value="All">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending_verification">Pending UTR</option>
            <option value="free">Free</option>
          </select>

          {/* Export Buttons */}
          <button
            type="button"
            onClick={handleExportExcel}
            className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="size-3.5" />
            <span>Excel</span>
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

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/60">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <th className="p-3">Pass ID</th>
              <th className="p-3">Attendee / Team</th>
              <th className="p-3">Event</th>
              <th className="p-3">Academic Info</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500 font-mono">
                  No registrations found matching the specified filters.
                </td>
              </tr>
            ) : (
              filtered.map((reg) => (
                <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-mono font-bold text-cyan-400 text-xs">
                    {reg.registrationId}
                    <span className="block text-[10px] text-slate-500 font-normal">
                      {new Date(reg.registeredAt).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      {reg.regType === "team" ? (
                        <Users className="size-3 text-cyan-400" />
                      ) : (
                        <User className="size-3 text-slate-400" />
                      )}
                      <span>{reg.fullName}</span>
                    </div>
                    {reg.regType === "team" && reg.teamName && (
                      <span className="text-[10px] text-cyan-300 block">
                        Team: {reg.teamName} ({reg.teamSize} pax)
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-slate-400 block">
                      {reg.regNumber} • {reg.phone}
                    </span>
                  </td>

                  <td className="p-3 font-medium text-slate-300 max-w-[180px] truncate" title={reg.eventTitle}>
                    {reg.eventTitle}
                  </td>

                  <td className="p-3">
                    <div className="text-[11px] text-slate-300 max-w-[150px] truncate" title={reg.branch}>
                      {reg.branch}
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      {reg.yearSemester} • {reg.residenceType}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase ${
                        reg.paymentStatus === "paid"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : reg.paymentStatus === "pending_verification"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-slate-500/20 text-slate-300"
                      }`}
                    >
                      {reg.paymentStatus === "free" ? "Free" : `₹${reg.paymentAmount} (${reg.paymentStatus})`}
                    </span>
                    {reg.paymentUtr && (
                      <span className="font-mono text-[9px] text-slate-400 block mt-0.5">
                        UTR: {reg.paymentUtr}
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase ${
                        reg.registrationStatus === "confirmed"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : reg.registrationStatus === "waitlisted"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {reg.registrationStatus}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => setInspectingReg(reg)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 transition-colors cursor-pointer"
                    >
                      <Eye className="size-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Inspect Modal */}
      {inspectingReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-left relative">
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block mb-0.5">
                  EVENT REGISTRATION #{inspectingReg.registrationId}
                </span>
                <h3 className="text-lg font-bold text-white">{inspectingReg.fullName}</h3>
                <span className="text-xs text-slate-400">
                  {inspectingReg.regNumber} • {inspectingReg.email} • {inspectingReg.phone}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInspectingReg(null)}
                className="size-8 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Status Modifiers */}
            {!isReadOnly && (
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Registration:</span>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(inspectingReg.id, "confirmed")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      inspectingReg.registrationStatus === "confirmed"
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-slate-900 text-slate-300 border border-white/10"
                    }`}
                  >
                    Confirm Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(inspectingReg.id, "waitlisted")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      inspectingReg.registrationStatus === "waitlisted"
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-900 text-slate-300 border border-white/10"
                    }`}
                  >
                    Waitlist
                  </button>
                </div>

                {inspectingReg.paymentAmount > 0 && inspectingReg.paymentStatus !== "paid" && (
                  <button
                    type="button"
                    onClick={() => handleVerifyPayment(inspectingReg.id)}
                    className="px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400"
                  >
                    Verify UPI Payment (UTR: {inspectingReg.paymentUtr || "None"})
                  </button>
                )}
              </div>
            )}

            {/* Teammates List (If Team) */}
            {inspectingReg.regType === "team" && inspectingReg.teamMembers && inspectingReg.teamMembers.length > 0 && (
              <div className="mb-6 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 block mb-3">
                  TEAM ROSTER: {inspectingReg.teamName} ({inspectingReg.teamSize} Members)
                </span>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 flex justify-between">
                    <div>
                      <span className="font-bold text-white block">1. {inspectingReg.fullName} (Leader)</span>
                      <span className="text-[10px] text-slate-400">
                        {inspectingReg.regNumber} • {inspectingReg.email}
                      </span>
                    </div>
                    <span className="text-cyan-400 font-mono text-[10px]">Team Leader</span>
                  </div>
                  {inspectingReg.teamMembers.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 flex justify-between"
                    >
                      <div>
                        <span className="font-bold text-white block">
                          {idx + 2}. {m.fullName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {m.regNumber} • {m.email} • {m.branch}
                        </span>
                      </div>
                      <span className="text-slate-400 font-mono text-[10px]">{m.residenceType}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions: Download PDF */}
            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setInspectingReg(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => generateRegistrationPdf(inspectingReg, null)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 flex items-center gap-1.5"
              >
                <Download className="size-3.5" />
                <span>Download Pass PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
