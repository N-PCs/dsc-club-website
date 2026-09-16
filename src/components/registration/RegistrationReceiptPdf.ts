/**
 * Zero-Cost Client-Side Vector PDF Badge & Receipt Generator
 * Powered by jsPDF — 100% Free, runs entirely in the student's browser.
 */

import { jsPDF } from "jspdf";
import type { RegistrationRecord, ClubEvent } from "@/types/models";

export async function generateRegistrationPdf(
  reg: RegistrationRecord,
  event?: ClubEvent | null,
): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Dark cyber-infused background styling
  doc.setFillColor(10, 15, 30);
  doc.rect(0, 0, pageWidth, 297, "F");

  // Border frame
  doc.setDrawColor(0, 210, 255);
  doc.setLineWidth(0.8);
  doc.roundedRect(12, 12, pageWidth - 24, 273, 5, 5, "S");

  // Subtle inner accent line
  doc.setDrawColor(255, 255, 255, 0.1);
  doc.setLineWidth(0.3);
  doc.roundedRect(14, 14, pageWidth - 28, 269, 4, 4, "S");

  // Header Banner
  doc.setFillColor(17, 24, 48);
  doc.roundedRect(15, 15, pageWidth - 30, 32, 4, 4, "F");

  // Club Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("DATA SCIENCE CLUB", pageWidth / 2, 27, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 210, 255);
  doc.text("VELLORE INSTITUTE OF TECHNOLOGY BHOPAL", pageWidth / 2, 34, { align: "center" });

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("OFFICIAL EVENT BADGE & REGISTRATION RECEIPT", pageWidth / 2, 41, { align: "center" });

  // Status Chip
  const isConfirmed = reg.registrationStatus === "confirmed";
  doc.setFillColor(isConfirmed ? 16 : 217, isConfirmed ? 185 : 119, isConfirmed ? 129 : 6);
  doc.roundedRect(pageWidth / 2 - 30, 52, 60, 9, 3, 3, "F");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(
    isConfirmed ? "STATUS: CONFIRMED PASS" : "STATUS: WAITLIST ENTRY",
    pageWidth / 2,
    58,
    { align: "center" },
  );

  // Event Details Box
  let y = 70;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(20, y, pageWidth - 40, 36, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(reg.eventTitle, 25, y + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  const eventDateStr = event?.eventDate ? new Date(event.eventDate).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : "Check Event Schedule";
  doc.text(`Date: ${eventDateStr}`, 25, y + 18);
  doc.text(`Venue: ${event?.venue || "VIT Bhopal Campus"}`, 25, y + 25);
  doc.text(`Format: ${reg.regType === "team" ? `Team (${reg.teamSize || 2} Members)` : "Individual"}`, 25, y + 32);

  // Participant Information Box
  y = 114;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(20, y, pageWidth - 40, reg.regType === "team" && reg.teamMembers?.length ? 72 : 55, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(0, 210, 255);
  doc.text("PARTICIPANT DETAILS", 25, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);

  if (reg.regType === "team") {
    doc.text(`Team Name: ${reg.teamName || "N/A"}`, 25, y + 17);
    doc.text(`Leader: ${reg.fullName} (${reg.regNumber})`, 25, y + 24);
    doc.text(`Email: ${reg.email}`, 25, y + 31);
    doc.text(`Branch & Year: ${reg.branch} - Year ${reg.yearSemester}`, 25, y + 38);
    doc.text(`Residence: ${reg.residenceType}`, 25, y + 45);

    if (reg.teamMembers && reg.teamMembers.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(148, 163, 184);
      doc.text("Teammates:", 25, y + 53);
      doc.setFont("helvetica", "normal");
      reg.teamMembers.forEach((m, idx) => {
        doc.text(
          `${idx + 1}. ${m.fullName} (${m.regNumber}) - ${m.branch}`,
          30,
          y + 60 + idx * 5,
        );
      });
    }
  } else {
    doc.text(`Full Name: ${reg.fullName}`, 25, y + 17);
    doc.text(`Registration No: ${reg.regNumber}`, 25, y + 24);
    doc.text(`Email: ${reg.email}`, 25, y + 31);
    doc.text(`Branch & Year: ${reg.branch} - ${reg.yearSemester}`, 25, y + 38);
    doc.text(`Residence: ${reg.residenceType}`, 25, y + 45);
    doc.text(`Contact: ${reg.phone}`, 25, y + 52);
  }

  // Payment & Security Token Box
  const nextY = reg.regType === "team" && reg.teamMembers?.length ? y + 80 : y + 63;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(20, nextY, pageWidth - 40, 42, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(0, 210, 255);
  doc.text("VERIFICATION & PAYMENT TOKEN", 25, nextY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(`Pass ID: ${reg.registrationId}`, 25, nextY + 17);
  doc.text(
    `Registration Fee: ${reg.paymentAmount > 0 ? `INR ${reg.paymentAmount}` : "FREE (Sponsored by DSC)"}`,
    25,
    nextY + 24,
  );
  doc.text(
    `Payment Status: ${reg.paymentStatus.toUpperCase()} ${reg.paymentUtr ? `(UTR: ${reg.paymentUtr})` : ""}`,
    25,
    nextY + 31,
  );
  doc.text(
    `Timestamp: ${new Date(reg.registeredAt).toLocaleString("en-IN")}`,
    25,
    nextY + 38,
  );

  // Security barcode / QR notice
  const footerY = nextY + 48;
  doc.setDrawColor(255, 255, 255, 0.15);
  doc.line(20, footerY, pageWidth - 20, footerY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "1. Please present this digital pass or a printed copy along with your VIT Student ID at the venue entrance.",
    pageWidth / 2,
    footerY + 8,
    { align: "center" },
  );
  doc.text(
    "2. Entry is subject to verification of college credentials and attendance requirements.",
    pageWidth / 2,
    footerY + 13,
    { align: "center" },
  );

  // Signatory Block
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Authorized by: Data Science Club Executive Committee", pageWidth / 2, footerY + 24, {
    align: "center",
  });
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(0, 210, 255);
  doc.text(
    "Verified Digital Token — Valid for DSC VIT Bhopal Campus Events",
    pageWidth / 2,
    footerY + 29,
    { align: "center" },
  );

  // Save the PDF
  doc.save(`${reg.registrationId}_Pass.pdf`);
}
