import React, { useState, useEffect, useMemo } from "react";
import { dataEngine } from "@/lib/data-engine";
import type {
  FinanceSheet,
  FinanceTransaction,
  RoleType,
  TransactionType,
  IncomeCategory,
  ExpenseCategory,
  PaymentMode,
  ClubEvent,
} from "@/types/models";
import { generateFinanceReportPdf } from "./FinanceReportPdf";
import { exportFinanceToExcel } from "./FinanceExcelExport";
import imageCompression from "browser-image-compression";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  FileSpreadsheet,
  FileText,
  Eye,
  Trash2,
  Paperclip,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Building,
  Receipt,
  ShieldCheck,
  Lock,
  X,
  Download,
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
} from "lucide-react";

interface FinanceSectionViewProps {
  userRole: RoleType;
  actorEmail: string;
}

const INCOME_CATEGORIES: IncomeCategory[] = [
  "Registration Fee",
  "Sponsorship",
  "College Grant",
  "Merchandise",
  "Other Income",
];

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Venue",
  "Food",
  "Prizes",
  "Marketing",
  "Logistics",
  "Misc",
];

const PAYMENT_MODES: PaymentMode[] = [
  "UPI",
  "Bank Transfer",
  "Cash",
  "Card",
  "College Requisition",
];

export const FinanceSectionView: React.FC<FinanceSectionViewProps> = ({
  userRole,
  actorEmail,
}) => {
  // -------------------------------------------------------------
  // RBAC Guard
  // -------------------------------------------------------------
  if (userRole === "team_lead" || userRole === "member") {
    return (
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-rose-500/20 text-center max-w-xl mx-auto my-12">
        <div className="size-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <Lock className="size-6" />
        </div>
        <h2 className="text-xl font-bold font-display text-white mb-2">Access Strictly Restricted</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The Club Finance and Accounts section is restricted exclusively to the Executive Board
          (President, VP, GS, JS) and the Faculty Coordinator. Team Leads do not have permissions
          to view or modify treasury records.
        </p>
      </div>
    );
  }

  const isSuperAdmin = userRole === "super_admin";
  const isFaculty = userRole === "faculty_coordinator";

  // -------------------------------------------------------------
  // Component State
  // -------------------------------------------------------------
  const [sheets, setSheets] = useState<FinanceSheet[]>([]);
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [transactions, setTransactions] = useState<FinanceTransaction[]>([]);
  const [selectedSheetId, setSelectedSheetId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");

  // Modal States
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [modalTxnType, setModalTxnType] = useState<TransactionType>("income");
  const [viewingReceiptTxn, setViewingReceiptTxn] = useState<FinanceTransaction | null>(null);

  // Add Transaction Form State
  const [formSheetId, setFormSheetId] = useState<string>("");
  const [formCategory, setFormCategory] = useState<string>("Registration Fee");
  const [formAmount, setFormAmount] = useState<string>("");
  const [formPaymentMode, setFormPaymentMode] = useState<PaymentMode>("UPI");
  const [formRef, setFormRef] = useState<string>("");
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().split("T")[0] || "");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formBillDataUrl, setFormBillDataUrl] = useState<string>("");
  const [formBillFileName, setFormBillFileName] = useState<string>("");
  const [isCompressingFile, setIsCompressingFile] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // -------------------------------------------------------------
  // Load Finance Data
  // -------------------------------------------------------------
  const loadData = async () => {
    try {
      setIsLoading(true);
      const [fetchedSheets, fetchedTxns, fetchedEvents] = await Promise.all([
        dataEngine.getFinanceSheets(),
        dataEngine.getFinanceTransactions(),
        dataEngine.getEvents(),
      ]);
      setSheets(fetchedSheets);
      setTransactions(fetchedTxns);
      setEvents(fetchedEvents);

      const firstSheet = fetchedSheets[0];
      if (firstSheet && !formSheetId) {
        setFormSheetId(firstSheet.id);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const handleDataChange = () => {
      loadData();
    };

    window.addEventListener("dsc_data_change", handleDataChange);
    return () => {
      window.removeEventListener("dsc_data_change", handleDataChange);
    };
  }, []);

  // -------------------------------------------------------------
  // Computed Metrics
  // -------------------------------------------------------------
  const activeSheet = useMemo(() => {
    if (selectedSheetId === "all") return null;
    return sheets.find((s) => s.id === selectedSheetId) || null;
  }, [sheets, selectedSheetId]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      // Sheet filter
      if (selectedSheetId !== "all" && t.sheetId !== selectedSheetId && t.eventId !== selectedSheetId) {
        return false;
      }
      // Type filter
      if (typeFilter !== "all" && t.type !== typeFilter) {
        return false;
      }
      // Category filter
      if (categoryFilter !== "all" && t.category !== categoryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesDesc = t.description?.toLowerCase().includes(query);
        const matchesRef = t.transactionRef?.toLowerCase().includes(query);
        const matchesCat = t.category?.toLowerCase().includes(query);
        const matchesEvent = t.eventTitle?.toLowerCase().includes(query);
        const matchesActor = t.addedByName?.toLowerCase().includes(query) || t.addedByEmail?.toLowerCase().includes(query);
        if (!matchesDesc && !matchesRef && !matchesCat && !matchesEvent && !matchesActor) {
          return false;
        }
      }
      return true;
    });
  }, [transactions, selectedSheetId, typeFilter, categoryFilter, searchQuery]);

  // Overall Treasury Figures
  const overallIncome = useMemo(
    () => transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount || 0), 0),
    [transactions]
  );
  const overallExpense = useMemo(
    () => transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount || 0), 0),
    [transactions]
  );
  const overallReserves = overallIncome - overallExpense;

  // Selected Scope Figures
  const scopeIncome = useMemo(
    () => filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount || 0), 0),
    [filteredTransactions]
  );
  const scopeExpense = useMemo(
    () => filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount || 0), 0),
    [filteredTransactions]
  );
  const scopeBalance = scopeIncome - scopeExpense;
  const scopeReceiptsCount = useMemo(
    () => filteredTransactions.filter((t) => Boolean(t.billFileName || t.billFileUrl)).length,
    [filteredTransactions]
  );

  // -------------------------------------------------------------
  // File Upload & Compression
  // -------------------------------------------------------------
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressingFile(true);
      setFormBillFileName(file.name);

      if (file.type.startsWith("image/")) {
        // Compress image client-side to ensure zero cost and fast local storage
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1280,
          useWebWorker: true,
        };
        const compressed = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormBillDataUrl(reader.result as string);
          setIsCompressingFile(false);
        };
        reader.readAsDataURL(compressed);
      } else {
        // For PDF or other files
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormBillDataUrl(reader.result as string);
          setIsCompressingFile(false);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("File processing failed:", err);
      setIsCompressingFile(false);
      setFormError("Could not process receipt file. Please try another image or PDF.");
    }
  };

  // -------------------------------------------------------------
  // Add Transaction Handler
  // -------------------------------------------------------------
  const handleOpenAddModal = (type: TransactionType) => {
    setModalTxnType(type);
    setFormCategory(type === "income" ? "Registration Fee" : "Food");
    setFormAmount("");
    setFormRef("");
    setFormDescription("");
    setFormBillDataUrl("");
    setFormBillFileName("");
    setFormError("");
    setShowAddModal(true);
  };

  const handleSaveTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const parsedAmount = parseFloat(formAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError("Please enter a valid monetary amount in INR.");
      return;
    }

    if (!formDescription.trim()) {
      setFormError("Please enter a description or purpose for this transaction.");
      return;
    }

    const targetSheet = sheets.find((s) => s.id === formSheetId) || sheets[0];
    if (!targetSheet) {
      setFormError("No valid event ledger selected.");
      return;
    }

    try {
      await dataEngine.addFinanceTransaction(
        {
          sheetId: targetSheet.id,
          eventId: targetSheet.eventId,
          eventTitle: targetSheet.eventTitle,
          type: modalTxnType,
          category: formCategory as IncomeCategory | ExpenseCategory,
          amount: parsedAmount,
          description: formDescription.trim(),
          paymentMode: formPaymentMode,
          transactionRef: formRef.trim() || undefined,
          transactionDate: formDate,
          addedByEmail: actorEmail,
          addedByName: actorEmail === "neelpandeyofficial@gmail.com" ? "Neel Pandey (President)" : "Executive Board",
          billFileName: formBillFileName || undefined,
          billFileUrl: formBillDataUrl || undefined,
        },
        actorEmail
      );

      setFeedbackMsg(`Successfully logged ${modalTxnType.toUpperCase()} of ₹${parsedAmount.toLocaleString("en-IN")}`);
      setTimeout(() => setFeedbackMsg(""), 4000);
      setShowAddModal(false);
      await loadData();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to record transaction.");
    }
  };

  // -------------------------------------------------------------
  // Delete Transaction Handler
  // -------------------------------------------------------------
  const handleDeleteTransaction = async (txn: FinanceTransaction) => {
    if (!isSuperAdmin) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete this ${txn.type} of ₹${txn.amount} (${txn.description})?`
    );
    if (!confirmDelete) return;

    await dataEngine.deleteFinanceTransaction(txn.id, actorEmail);
    setFeedbackMsg(`Deleted transaction #${txn.id}`);
    setTimeout(() => setFeedbackMsg(""), 4000);
    await loadData();
  };

  // -------------------------------------------------------------
  // Export PDF Statement
  // -------------------------------------------------------------
  const handleDownloadPdfStatement = () => {
    const scopeTitle = activeSheet ? activeSheet.eventTitle : "Consolidated Club Treasury (All Events)";
    generateFinanceReportPdf({
      sheetTitle: scopeTitle,
      sheet: activeSheet || undefined,
      transactions: filteredTransactions,
      generatedByName: actorEmail === "neelpandeyofficial@gmail.com" ? "Neel Pandey" : actorEmail,
      generatedByRole: isSuperAdmin ? "President / Executive Board" : "Faculty Coordinator",
    });
  };

  // -------------------------------------------------------------
  // Export Excel Workbook
  // -------------------------------------------------------------
  const handleExportExcel = () => {
    exportFinanceToExcel({
      sheets,
      transactions,
      overallReserves,
      totalIncome: overallIncome,
      totalExpense: overallExpense,
    });
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner & Oversight Notice */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-2">
              <Wallet className="size-3.5" />
              <span>
                {isFaculty ? "FACULTY OVERSIGHT & AUDIT MODE" : "TREASURY & DISBURSEMENT CONSOLE"}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Club Finance & Accounts Ledger
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {isFaculty
                ? "As Faculty Coordinator, you have read-only oversight across all event sheets, itemized vouchers, and reserve balances. You can download formal audit statements directly for college reporting."
                : "Real-time, zero-cost event-by-event bookkeeping. Log inflows from registrations and grants, itemize expenses with bill attachments, and maintain automated university audit compliance."}
            </p>
          </div>

          {/* Master Export Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportExcel}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-bold font-mono transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              title="Export complete financial workbook with master summary and itemized sheets"
            >
              <FileSpreadsheet className="size-4" />
              <span>Export Excel (.xlsx)</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdfStatement}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold font-mono transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
              title="Download formal institutional financial statement with college signature blocks"
            >
              <FileText className="size-4" />
              <span>Audit PDF Statement</span>
            </button>
          </div>
        </div>

        {feedbackMsg && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Treasury Reserves */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Total Club Reserves
            </span>
            <Building className="size-4 text-amber-400" />
          </div>
          <div className={`text-2xl font-bold font-mono ${overallReserves >= 0 ? "text-emerald-400" : "text-rose-400"} mb-1`}>
            ₹{overallReserves.toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Across {sheets.length} event accounts
          </span>
        </div>

        {/* Selected Scope Inflow */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              {selectedSheetId === "all" ? "Total Inflow (All)" : "Sheet Inflow"}
            </span>
            <div className="size-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="size-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white mb-1">
            ₹{scopeIncome.toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">
            {filteredTransactions.filter((t) => t.type === "income").length} inflow entries
          </span>
        </div>

        {/* Selected Scope Outflow */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              {selectedSheetId === "all" ? "Total Outflow (All)" : "Sheet Outflow"}
            </span>
            <div className="size-6 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <TrendingDown className="size-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white mb-1">
            ₹{scopeExpense.toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-rose-400 font-mono">
            {filteredTransactions.filter((t) => t.type === "expense").length} expense vouchers
          </span>
        </div>

        {/* Selected Scope Net Margin */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Scope Net Balance
            </span>
            <Receipt className="size-4 text-cyan-400" />
          </div>
          <div className={`text-2xl font-bold font-mono ${scopeBalance >= 0 ? "text-cyan-400" : "text-amber-400"} mb-1`}>
            ₹{scopeBalance.toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {scopeReceiptsCount} bills / vouchers archived
          </span>
        </div>
      </div>

      {/* Event Sheet Navigation & Action Toolbar */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Sheet Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1">
              Select Ledger:
            </span>
            <button
              type="button"
              onClick={() => setSelectedSheetId("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedSheetId === "all"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              🌟 Consolidated Treasury (All)
            </button>

            {sheets.map((sheet) => (
              <button
                key={sheet.id}
                type="button"
                onClick={() => setSelectedSheetId(sheet.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedSheetId === sheet.id
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <span>{sheet.eventTitle}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                    sheet.netBalance >= 0
                      ? selectedSheetId === sheet.id
                        ? "bg-slate-950/20 text-slate-900"
                        : "bg-emerald-500/20 text-emerald-300"
                      : selectedSheetId === sheet.id
                      ? "bg-slate-950/20 text-slate-900"
                      : "bg-rose-500/20 text-rose-300"
                  }`}
                >
                  ₹{sheet.netBalance.toLocaleString("en-IN")}
                </span>
              </button>
            ))}
          </div>

          {/* Log Entry Buttons (Super Admin Only) */}
          {isSuperAdmin && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleOpenAddModal("income")}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-bold font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="size-3.5" />
                <span>Log Income</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenAddModal("expense")}
                className="px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 text-xs font-bold font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="size-3.5" />
                <span>Log Expense</span>
              </button>
            </div>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-3 border-t border-white/5">
          {/* Search Query */}
          <div className="relative md:col-span-2">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by description, reference, category, or event..."
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as "all" | "income" | "expense")}
              className="w-full bg-slate-900 border border-white/10 text-white rounded-xl px-3 py-2 text-xs font-mono focus:border-cyan-400 focus:outline-none"
            >
              <option value="all">All Transaction Types</option>
              <option value="income">Incomes Only (Inflow)</option>
              <option value="expense">Expenses Only (Disbursement)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 text-white rounded-xl px-3 py-2 text-xs font-mono focus:border-cyan-400 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <optgroup label="Income Heads">
                {INCOME_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Expense Heads">
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction Records Table */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white text-sm">
              Ledger Transactions
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-slate-300">
              {filteredTransactions.length} records
            </span>
          </div>

          <span className="text-[10px] font-mono text-slate-400">
            {activeSheet ? `Viewing: ${activeSheet.eventTitle}` : "Viewing: All Events Consolidated"}
          </span>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <Receipt className="size-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-display text-slate-300">No finance records found</p>
            <p className="text-xs text-slate-500 mt-1">
              Adjust your filters or click "+ Log Income" / "+ Log Expense" to record a new transaction.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Event Ledger</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Description & Reference</th>
                  <th className="py-3 px-4">Mode</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Amount (₹)</th>
                  <th className="py-3 px-4 text-center">Voucher / Bill</th>
                  {isSuperAdmin && <th className="py-3 px-4 text-center">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredTransactions.map((txn) => {
                  const isIncome = txn.type === "income";
                  const hasBill = Boolean(txn.billFileName || txn.billFileUrl);

                  return (
                    <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Type Badge */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isIncome
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          }`}
                        >
                          {isIncome ? (
                            <ArrowUpRight className="size-3" />
                          ) : (
                            <ArrowDownRight className="size-3" />
                          )}
                          <span>{txn.type}</span>
                        </span>
                      </td>

                      {/* Event Ledger */}
                      <td className="py-3 px-4 whitespace-nowrap text-slate-300 font-sans font-medium">
                        {txn.eventTitle}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-[10px]">
                          {txn.category}
                        </span>
                      </td>

                      {/* Description & Reference */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-sans text-white text-xs line-clamp-1">
                          {txn.description}
                        </div>
                        {txn.transactionRef && (
                          <div className="text-[10px] text-cyan-400/80 font-mono mt-0.5">
                            Ref: {txn.transactionRef}
                          </div>
                        )}
                        <div className="text-[9px] text-slate-500 font-mono">
                          By: {txn.addedByName || txn.addedByEmail}
                        </div>
                      </td>

                      {/* Payment Mode */}
                      <td className="py-3 px-4 whitespace-nowrap text-slate-400">
                        {txn.paymentMode}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 whitespace-nowrap text-slate-400">
                        {txn.transactionDate}
                      </td>

                      {/* Amount */}
                      <td
                        className={`py-3 px-4 whitespace-nowrap text-right font-bold text-sm ${
                          isIncome ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {isIncome ? "+" : "-"}₹{Number(txn.amount || 0).toLocaleString("en-IN")}
                      </td>

                      {/* Voucher / Bill */}
                      <td className="py-3 px-4 whitespace-nowrap text-center">
                        {hasBill ? (
                          <button
                            type="button"
                            onClick={() => setViewingReceiptTxn(txn)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono transition-colors cursor-pointer"
                          >
                            <Eye className="size-3" />
                            <span>View Bill</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-600 font-mono">—</span>
                        )}
                      </td>

                      {/* Actions (Super Admin Only) */}
                      {isSuperAdmin && (
                        <td className="py-3 px-4 whitespace-nowrap text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteTransaction(txn)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Delete transaction"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: ADD TRANSACTION (INCOME / EXPENSE) */}
      {/* ========================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative text-left shadow-2xl">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  modalTxnType === "income"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                }`}
              >
                {modalTxnType === "income" ? "Log Revenue / Inflow" : "Log Expenditure / Outflow"}
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-white mb-4">
              {modalTxnType === "income" ? "Record Income Entry" : "Record Expense Voucher"}
            </h3>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveTransaction} className="space-y-4 text-xs font-mono">
              {/* Type Switcher */}
              <div>
                <label className="text-slate-400 block mb-1">Transaction Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalTxnType("income");
                      setFormCategory("Registration Fee");
                    }}
                    className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                      modalTxnType === "income"
                        ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                        : "bg-white/5 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    + Income (Inflow)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModalTxnType("expense");
                      setFormCategory("Food");
                    }}
                    className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                      modalTxnType === "expense"
                        ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                        : "bg-white/5 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    - Expense (Outflow)
                  </button>
                </div>
              </div>

              {/* Event Ledger Selection */}
              <div>
                <label className="text-slate-400 block mb-1">Target Event Ledger *</label>
                <select
                  value={formSheetId}
                  onChange={(e) => setFormSheetId(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  required
                >
                  {sheets.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.eventTitle} (Current Net: ₹{s.netBalance.toLocaleString("en-IN")})
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="text-slate-400 block mb-1">
                  {modalTxnType === "income" ? "Income Category *" : "Expense Category *"}
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  required
                >
                  {modalTxnType === "income"
                    ? INCOME_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))
                    : EXPENSE_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                </select>
              </div>

              {/* Amount & Date in 2 cols */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Amount (INR ₹) *</label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Transaction Date *</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Payment Mode & Reference */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Payment Mode *</label>
                  <select
                    value={formPaymentMode}
                    onChange={(e) => setFormPaymentMode(e.target.value as PaymentMode)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    {PAYMENT_MODES.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Reference / UTR / Invoice</label>
                  <input
                    type="text"
                    value={formRef}
                    onChange={(e) => setFormRef(e.target.value)}
                    placeholder="e.g. UTR-994102 or INV-44"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-slate-400 block mb-1">Purpose / Description *</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide an itemized description for audit reconciliation..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white placeholder-slate-600 focus:border-cyan-400 focus:outline-none font-sans"
                  required
                />
              </div>

              {/* Bill / Voucher Upload */}
              <div>
                <label className="text-slate-400 block mb-1">
                  Attach Voucher / Invoice / Bill (Photo or PDF)
                </label>
                <div className="p-3 border border-dashed border-white/20 rounded-xl bg-slate-950/50 text-center relative hover:border-cyan-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center gap-1.5 py-1">
                    <Paperclip className="size-4 text-cyan-400" />
                    <span className="text-[11px] text-slate-300 font-sans">
                      {isCompressingFile
                        ? "Optimizing and compressing receipt..."
                        : formBillFileName
                        ? `Attached: ${formBillFileName}`
                        : "Click or drag invoice receipt (PNG, JPG, PDF)"}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">
                      100% Free Client-Side Compression & Storage
                    </span>
                  </div>
                </div>

                {formBillDataUrl && formBillDataUrl.startsWith("data:image/") && (
                  <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={formBillDataUrl}
                      alt="Receipt Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormBillDataUrl("");
                        setFormBillFileName("");
                      }}
                      className="absolute top-1 right-1 p-0.5 rounded bg-slate-950/80 text-rose-400 hover:text-rose-300"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCompressingFile}
                  className={`px-5 py-2 rounded-xl font-bold font-sans transition-all cursor-pointer ${
                    modalTxnType === "income"
                      ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
                      : "bg-rose-500 text-white hover:bg-rose-400 shadow-md shadow-rose-500/20"
                  }`}
                >
                  {modalTxnType === "income" ? "Save Income Record" : "Save Expense Voucher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: RECEIPT / BILL VIEWER */}
      {/* ========================================================= */}
      {viewingReceiptTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative text-left shadow-2xl">
            <button
              type="button"
              onClick={() => setViewingReceiptTxn(null)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                Official Voucher Audit
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-white mb-1">
              {viewingReceiptTxn.eventTitle}
            </h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              {viewingReceiptTxn.category} • Ref: {viewingReceiptTxn.transactionRef || "N/A"} • Amount: ₹
              {viewingReceiptTxn.amount.toLocaleString("en-IN")}
            </p>

            {/* Receipt Preview */}
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 mb-4 flex flex-col items-center justify-center min-h-[220px]">
              {viewingReceiptTxn.billFileUrl ? (
                viewingReceiptTxn.billFileUrl.startsWith("data:image/") ? (
                  <img
                    src={viewingReceiptTxn.billFileUrl}
                    alt="Receipt Voucher"
                    className="max-h-[420px] w-auto rounded-lg object-contain"
                  />
                ) : (
                  <div className="text-center py-8">
                    <FileText className="size-12 text-cyan-400 mx-auto mb-2" />
                    <span className="text-sm text-slate-300 font-mono block">
                      {viewingReceiptTxn.billFileName || "Attached Document"}
                    </span>
                    <a
                      href={viewingReceiptTxn.billFileUrl}
                      download={viewingReceiptTxn.billFileName || "receipt-document"}
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                    >
                      <Download className="size-3.5" />
                      <span>Download Attached PDF</span>
                    </a>
                  </div>
                )
              ) : (
                <div className="text-center py-6 text-slate-500 font-mono text-xs">
                  <Receipt className="size-8 text-slate-600 mx-auto mb-2" />
                  <span>No digital receipt image attached to this voucher.</span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-slate-300 space-y-1">
              <div>
                <span className="text-slate-500">Description:</span> {viewingReceiptTxn.description}
              </div>
              <div>
                <span className="text-slate-500">Payment Mode:</span> {viewingReceiptTxn.paymentMode}
              </div>
              <div>
                <span className="text-slate-500">Date:</span> {viewingReceiptTxn.transactionDate}
              </div>
              <div>
                <span className="text-slate-500">Logged By:</span>{" "}
                {viewingReceiptTxn.addedByName || viewingReceiptTxn.addedByEmail}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingReceiptTxn(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceSectionView;
