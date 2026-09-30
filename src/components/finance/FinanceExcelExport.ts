/**
 * Multi-Sheet Excel Financial Ledger Export Engine
 * Powered by SheetJS (xlsx) — 100% Free, runs entirely client-side.
 */

import * as XLSX from "xlsx";
import type { FinanceSheet, FinanceTransaction } from "@/types/models";

interface ExportFinanceExcelOptions {
  sheets: FinanceSheet[];
  transactions: FinanceTransaction[];
  overallReserves: number;
  totalIncome: number;
  totalExpense: number;
}

export function exportFinanceToExcel({
  sheets,
  transactions,
  overallReserves,
  totalIncome,
  totalExpense,
}: ExportFinanceExcelOptions): void {
  const wb = XLSX.utils.book_new();

  // -------------------------------------------------------------
  // Sheet 1: Executive Overview & Event Breakdown
  // -------------------------------------------------------------
  const summaryHeader = [
    ["DATA SCIENCE CLUB (DSC) - VELLORE INSTITUTE OF TECHNOLOGY BHOPAL"],
    ["CONSOLIDATED TREASURY & FINANCIAL POSITION STATEMENT"],
    [`Generated On: ${new Date().toLocaleString("en-IN")}`],
    [],
    ["METRIC", "AMOUNT (INR)"],
    ["Total Treasury Inflows (Gross)", totalIncome],
    ["Total Treasury Outflows (Expenditure)", totalExpense],
    ["Net Treasury Reserve Balance", overallReserves],
    ["Active Event Ledgers Managed", sheets.length],
    [],
    ["EVENT LEDGER BREAKDOWN"],
    ["Event Title", "Total Inflow (₹)", "Total Outflow (₹)", "Net Margin (₹)", "Last Reconciled"],
  ];

  const eventRows = sheets.map((s) => [
    s.eventTitle,
    s.totalIncome,
    s.totalExpense,
    s.netBalance,
    new Date(s.lastUpdated).toLocaleDateString("en-IN"),
  ]);

  const overviewData = [...summaryHeader, ...eventRows];
  const wsOverview = XLSX.utils.aoa_to_sheet(overviewData);

  // Set column widths
  wsOverview["!cols"] = [
    { wch: 38 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 22 },
  ];

  XLSX.utils.book_append_sheet(wb, wsOverview, "Executive Summary");

  // -------------------------------------------------------------
  // Sheet 2: All Income Transactions
  // -------------------------------------------------------------
  const incomes = transactions.filter((t) => t.type === "income");
  const incomeRows = incomes.map((t) => ({
    "Transaction ID": t.id,
    "Date": t.transactionDate,
    "Event / Scope": t.eventTitle,
    "Category": t.category,
    "Amount (INR)": t.amount,
    "Payment Mode": t.paymentMode,
    "Reference / UTR": t.transactionRef || "N/A",
    "Description": t.description,
    "Logged By": t.addedByName || t.addedByEmail,
    "Timestamp": t.createdAt,
  }));

  const wsIncomes = XLSX.utils.json_to_sheet(incomeRows);
  wsIncomes["!cols"] = [
    { wch: 24 },
    { wch: 14 },
    { wch: 30 },
    { wch: 20 },
    { wch: 15 },
    { wch: 18 },
    { wch: 24 },
    { wch: 40 },
    { wch: 25 },
    { wch: 24 },
  ];
  XLSX.utils.book_append_sheet(wb, wsIncomes, "All Inflows");

  // -------------------------------------------------------------
  // Sheet 3: Itemized Expenses
  // -------------------------------------------------------------
  const expenses = transactions.filter((t) => t.type === "expense");
  const expenseRows = expenses.map((t) => ({
    "Transaction ID": t.id,
    "Date": t.transactionDate,
    "Event / Scope": t.eventTitle,
    "Expense Head": t.category,
    "Amount (INR)": t.amount,
    "Payment Mode": t.paymentMode,
    "Invoice / Voucher Ref": t.transactionRef || "N/A",
    "Receipt Attached": t.billFileName ? "YES" : "NO",
    "Description": t.description,
    "Logged By": t.addedByName || t.addedByEmail,
    "Timestamp": t.createdAt,
  }));

  const wsExpenses = XLSX.utils.json_to_sheet(expenseRows);
  wsExpenses["!cols"] = [
    { wch: 24 },
    { wch: 14 },
    { wch: 30 },
    { wch: 18 },
    { wch: 15 },
    { wch: 18 },
    { wch: 24 },
    { wch: 16 },
    { wch: 40 },
    { wch: 25 },
    { wch: 24 },
  ];
  XLSX.utils.book_append_sheet(wb, wsExpenses, "Itemized Expenditures");

  // Trigger download
  const dateStamp = new Date().toISOString().split("T")[0];
  XLSX.writeFile(wb, `DSC_VITB_Financial_Report_${dateStamp}.xlsx`);
}
