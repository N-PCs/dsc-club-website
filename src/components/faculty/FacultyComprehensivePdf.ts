/**
 * Faculty Coordinator Comprehensive Institutional Dossier PDF Generator
 * Powered by jsPDF & jspdf-autotable — 100% Free, runs entirely in the browser.
 * Generates official semester oversight report for university records and dean submission.
 */

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type {
  ClubEvent,
  RegistrationRecord,
  ApplicationRecord,
  FinanceSheet,
  ActivityLog,
} from "@/types/models";

interface FacultyReportData {
  facultyName: string;
  facultyEmail: string;
  events: ClubEvent[];
  registrations: RegistrationRecord[];
  applications: ApplicationRecord[];
  sheets: FinanceSheet[];
  overallReserves: number;
  totalIncome: number;
  totalExpense: number;
  logsCount: number;
}

export function generateFacultyComprehensivePdf(data: FacultyReportData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const reportRef = `VITB-DSC-FC-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Top University Banner
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, pageWidth, 26, "F");

  doc.setFillColor(168, 85, 247); // Purple accent strip for Faculty Oversight
  doc.rect(0, 25, pageWidth, 1.5, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("VELLORE INSTITUTE OF TECHNOLOGY (VIT) BHOPAL", pageWidth / 2, 9, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(216, 180, 254); // Purple 300
  doc.text("School of Computing Science and Engineering (SCSE)", pageWidth / 2, 15, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(243, 232, 255);
  doc.text("DATA SCIENCE CLUB (DSC) — SEMESTER FACULTY OVERSIGHT DOSSIER", pageWidth / 2, 21, { align: "center" });

  // Metadata Panel
  let currentY = 32;
  doc.setFillColor(250, 245, 255); // Purple 50
  doc.setDrawColor(233, 213, 255); // Purple 200
  doc.roundedRect(14, currentY, pageWidth - 28, 20, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("DOCUMENT ID:", 18, currentY + 5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text(reportRef, 55, currentY + 5);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("DATE OF ISSUE:", 18, currentY + 10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text(dateStr, 55, currentY + 10);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("ACADEMIC SESSION:", 18, currentY + 15);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text("2025–2026 (Annual Review)", 55, currentY + 15);

  // Right column
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("FACULTY COORDINATOR:", 115, currentY + 5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text(data.facultyName, 160, currentY + 5);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("COORDINATOR EMAIL:", 115, currentY + 10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text(data.facultyEmail, 160, currentY + 10);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("OVERSIGHT STATUS:", 115, currentY + 15);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(16, 185, 129); // Green
  doc.text("Audited & Verified", 160, currentY + 15);

  currentY += 25;

  // Executive Overview Summary Cards
  const cardWidth = (pageWidth - 28 - 9) / 4;

  const metrics = [
    { label: "REGISTERED STUDENTS", value: data.registrations.length.toString(), sub: `Across ${data.events.length} events` },
    { label: "RECRUITMENT APPS", value: data.applications.length.toString(), sub: `${data.applications.filter(a => a.status === "selected").length} Inducted` },
    { label: "TREASURY RESERVES", value: `INR ${data.overallReserves.toLocaleString("en-IN")}`, sub: `Inflow: INR ${data.totalIncome.toLocaleString("en-IN")}` },
    { label: "AUDITED ACTIONS", value: data.logsCount.toString(), sub: "Tamper-proof logs" },
  ];

  metrics.forEach((m, idx) => {
    const x = 14 + idx * (cardWidth + 3);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x, currentY, cardWidth, 16, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(m.label, x + 3, currentY + 4.5);

    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(m.value, x + 3, currentY + 10);

    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(m.sub, x + 3, currentY + 14);
  });

  currentY += 21;

  // Section 1: Events & Student Engagement Schedule
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("1. Academic Events & Student Participation Audit", 14, currentY);

  const eventTableBody = data.events.map((e) => [
    e.title,
    new Date(e.eventDate).toLocaleDateString("en-IN"),
    e.venue,
    `${e.currentRegistrations} / ${e.maxCapacity}`,
    e.isPaidEvent ? `INR ${e.registrationFee}` : "Free Event",
    e.isRegistrationOpen ? "Registration Open" : "Closed",
  ]);

  autoTable(doc, {
    startY: currentY + 3,
    margin: { left: 14, right: 14 },
    head: [["Event Title", "Date", "Venue", "Enrollment", "Registration Fee", "Current Status"]],
    body: eventTableBody,
    theme: "striped",
    headStyles: { fillColor: [15, 23, 42], fontSize: 7.5, fontStyle: "bold" },
    bodyStyles: { fontSize: 7, textColor: [51, 65, 85] },
    styles: { cellPadding: 2 },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastTableDoc = doc as any;
  currentY = (lastTableDoc.lastAutoTable?.finalY || currentY + 30) + 8;

  // Section 2: Recruitment & Domain Onboarding Statistics
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("2. Core Domain Recruitment & Student Induction Breakdown", 14, currentY);

  const domains = ["Technical", "AI & Data Science", "Design & Media", "Content & Editorial", "Management & PR"];
  const hiringTableBody = domains.map((domain) => {
    const domainApps = data.applications.filter((a) => a.primaryTeam === domain || a.secondaryTeam === domain);
    const shortlisted = domainApps.filter((a) => a.status === "shortlisted" || a.status === "interview").length;
    const selected = domainApps.filter((a) => a.status === "selected").length;
    const applied = domainApps.length;
    return [domain, applied.toString(), shortlisted.toString(), selected.toString()];
  });

  autoTable(doc, {
    startY: currentY + 3,
    margin: { left: 14, right: 14 },
    head: [["Domain / Team", "Total Applicants", "Interviewed / Shortlisted", "Final Inductions"]],
    body: hiringTableBody,
    foot: [[
      "Total Club Induction",
      data.applications.length.toString(),
      data.applications.filter((a) => a.status === "shortlisted" || a.status === "interview").length.toString(),
      data.applications.filter((a) => a.status === "selected").length.toString(),
    ]],
    theme: "striped",
    headStyles: { fillColor: [15, 23, 42], fontSize: 7.5, fontStyle: "bold" },
    bodyStyles: { fontSize: 7, textColor: [51, 65, 85] },
    footStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: "bold", fontSize: 7.5 },
    styles: { cellPadding: 2 },
  });

  currentY = (lastTableDoc.lastAutoTable?.finalY || currentY + 30) + 8;

  // Check if we need page break before Finance Section
  if (currentY > pageHeight - 75) {
    doc.addPage();
    currentY = 20;
  }

  // Section 3: Consolidated Treasury & Disbursement Position
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("3. Treasury Ledgers & University Compliance Summary", 14, currentY);

  const financeTableBody = data.sheets.map((s) => [
    s.eventTitle,
    `INR ${s.totalIncome.toLocaleString("en-IN")}`,
    `INR ${s.totalExpense.toLocaleString("en-IN")}`,
    `INR ${s.netBalance.toLocaleString("en-IN")}`,
    s.netBalance >= 0 ? "Surplus" : "Deficit",
    new Date(s.lastUpdated).toLocaleDateString("en-IN"),
  ]);

  autoTable(doc, {
    startY: currentY + 3,
    margin: { left: 14, right: 14 },
    head: [["Event Ledger Title", "Total Inflow", "Total Outflow", "Net Balance", "Position", "Reconciled On"]],
    body: financeTableBody,
    foot: [[
      "Consolidated Treasury Balance",
      `INR ${data.totalIncome.toLocaleString("en-IN")}`,
      `INR ${data.totalExpense.toLocaleString("en-IN")}`,
      `INR ${data.overallReserves.toLocaleString("en-IN")}`,
      data.overallReserves >= 0 ? "SURPLUS" : "DEFICIT",
      dateStr,
    ]],
    theme: "striped",
    headStyles: { fillColor: [15, 23, 42], fontSize: 7.5, fontStyle: "bold" },
    bodyStyles: { fontSize: 7, textColor: [51, 65, 85] },
    footStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: "bold", fontSize: 7.5 },
    styles: { cellPadding: 2 },
  });

  currentY = (lastTableDoc.lastAutoTable?.finalY || currentY + 30) + 10;

  // Institutional Faculty Sign-Off Block
  if (currentY > pageHeight - 50) {
    doc.addPage();
    currentY = 22;
  }

  doc.setFillColor(250, 245, 255);
  doc.setDrawColor(216, 180, 254);
  doc.roundedRect(14, currentY, pageWidth - 28, 38, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(88, 28, 135); // Purple 900
  doc.text("FACULTY COORDINATOR OVERSIGHT DECLARATION & ENDORSEMENT", 18, currentY + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(51, 65, 85);
  doc.text(
    "I hereby confirm that I have reviewed the student participation records, core recruitment inductions, and event-wise treasury disbursements for the Data Science Club. All operational processes comply with SCSE and VIT Bhopal university student organization guidelines.",
    18,
    currentY + 10,
    { maxWidth: pageWidth - 36 }
  );

  const sigWidth = (pageWidth - 28 - 16) / 3;
  const sigY = currentY + 19;

  // Sign 1: Faculty Coordinator
  doc.setDrawColor(203, 213, 225);
  doc.line(18, sigY + 10, 18 + sigWidth, sigY + 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text(data.facultyName, 18, sigY + 13.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Faculty Coordinator, Data Science Club", 18, sigY + 17);

  // Sign 2: Club President
  const sig2X = 18 + sigWidth + 8;
  doc.line(sig2X, sigY + 10, sig2X + sigWidth, sigY + 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text("Neel Pandey", sig2X, sigY + 13.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text("President, Data Science Club", sig2X, sigY + 17);

  // Sign 3: Dean / DSW
  const sig3X = sig2X + sigWidth + 8;
  doc.line(sig3X, sigY + 10, sig3X + sigWidth, sigY + 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text("Dean, SCSE / Student Welfare", sig3X, sigY + 13.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text("VIT Bhopal University", sig3X, sigY + 17);

  // Page Numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `VIT Bhopal University | Data Science Club Faculty Dossier | Ref: ${reportRef}`,
      14,
      pageHeight - 5
    );
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 14, pageHeight - 5, { align: "right" });
  }

  doc.save(`DSC_Faculty_Oversight_Report_${Date.now()}.pdf`);
}
