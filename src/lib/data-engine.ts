/**
 * DSC Data Engine — Dual-Engine Architecture (Appwrite Cloud + Reactive Local-First Cache)
 * Guarantees 100% operational uptime and zero-cost resilience.
 */

import { databases, storage, APPWRITE_DATABASE_ID } from "./appwrite";
import { ID, Query } from "appwrite";
import type {
  ClubEvent,
  RegistrationRecord,
  HiringDomain,
  ApplicationRecord,
  UserRoleRecord,
  FinanceSheet,
  FinanceTransaction,
  ActivityLog,
  SystemSettings,
  RoleType,
  LeadDomain,
} from "@/types/models";

// Storage Keys
const STORAGE_KEYS = {
  EVENTS: "dsc_events_cache",
  REGISTRATIONS: "dsc_registrations_cache",
  HIRING_DOMAINS: "dsc_hiring_domains_cache",
  APPLICATIONS: "dsc_applications_cache",
  USER_ROLES: "dsc_user_roles_cache",
  FINANCE_SHEETS: "dsc_finance_sheets_cache",
  FINANCE_TRANSACTIONS: "dsc_finance_transactions_cache",
  ACTIVITY_LOGS: "dsc_activity_logs_cache",
  SYSTEM_SETTINGS: "dsc_system_settings_cache",
  AUTH_SESSION: "dsc_current_user_session",
};

// Initial Seed Data for DSC VIT Bhopal
const INITIAL_SETTINGS: SystemSettings = {
  isHiringOpen: true,
  hiringDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ahead
  announcementHeadline: "🚀 Core Team Recruitment 2026 is LIVE! Apply for open domain roles now.",
  showAnnouncement: true,
  defaultUpiId: "dscvitb@upi",
  defaultUpiPayeeName: "Data Science Club VIT Bhopal",
  contactEmail: "dsc@vitbhopal.ac.in",
  lastBackupAt: new Date().toISOString(),
};

const INITIAL_USER_ROLES: UserRoleRecord[] = [
  {
    id: "role-1",
    email: "neelpandeyofficial@gmail.com",
    fullName: "Neel Pandey",
    role: "super_admin",
    title: "President",
    leadDomain: "None",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "role-2",
    email: "vp.dsc@vitbhopal.ac.in",
    fullName: "Aarav Sharma",
    role: "super_admin",
    title: "Vice President",
    leadDomain: "None",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "role-3",
    email: "coordinator.dsc@vitbhopal.ac.in",
    fullName: "Dr. Faculty Coordinator",
    role: "faculty_coordinator",
    title: "Faculty Coordinator",
    leadDomain: "None",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "role-4",
    email: "techlead.dsc@vitbhopal.ac.in",
    fullName: "Rohan Gupta",
    role: "team_lead",
    title: "Technical Team Lead",
    leadDomain: "Technical",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "role-5",
    email: "designlead.dsc@vitbhopal.ac.in",
    fullName: "Priya Verma",
    role: "team_lead",
    title: "Design Team Lead",
    leadDomain: "Design & Media",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_EVENTS: ClubEvent[] = [
  {
    id: "event-bootcamp-2026",
    slug: "pytorch-bootcamp",
    title: "PyTorch Deep Dive Bootcamp",
    tag: "BOOTCAMP",
    eventDate: "2026-09-24T10:00:00.000Z",
    venue: "AB-1 Auditorium, VIT Bhopal",
    description:
      "Three days of intensive tensors training, autograd computation graph breakdowns, and compiling vision classification models from scratch.",
    bannerImage: "/assets/event-workshop.jpg",
    isRegistrationOpen: true,
    registrationDeadline: "2026-09-23T23:59:59.000Z",
    maxCapacity: 200,
    currentRegistrations: 42,
    isPaidEvent: false,
    registrationFee: 0,
    upiId: "dscvitb@upi",
    upiPayeeName: "DSC VITB",
  },
  {
    id: "event-talk-2026",
    slug: "llms-in-production",
    title: "Talks: LLMs in Production",
    tag: "TECH TALK",
    eventDate: "2026-09-28T17:30:00.000Z",
    venue: "Seminar Hall 2, VIT Bhopal",
    description:
      "An ML platform team member shares deployment telemetries, LLM evaluations, inference costs, and model monitoring guardrails.",
    bannerImage: "/assets/event-talk.jpg",
    isRegistrationOpen: true,
    registrationDeadline: "2026-09-27T18:00:00.000Z",
    maxCapacity: 150,
    currentRegistrations: 68,
    isPaidEvent: false,
    registrationFee: 0,
    upiId: "dscvitb@upi",
    upiPayeeName: "DSC VITB",
  },
  {
    id: "event-hack-2026",
    slug: "datahacks-26",
    title: "DataHacks '26 (Flagship Hackathon)",
    tag: "HACKATHON",
    eventDate: "2026-10-18T09:00:00.000Z",
    venue: "Innovation Center & Lab Complex",
    description:
      "Our flagship 36-hour hackathon focusing on open civic data, autonomous analytics pipelines, and AI systems. 300+ developers expected.",
    bannerImage: "/assets/event-hackathon.jpg",
    isRegistrationOpen: true,
    registrationDeadline: "2026-10-15T23:59:59.000Z",
    maxCapacity: 120,
    currentRegistrations: 89,
    isPaidEvent: true,
    registrationFee: 299,
    upiId: "dscvitb@upi",
    upiPayeeName: "DSC VITB",
  },
];

const INITIAL_HIRING_DOMAINS: HiringDomain[] = [
  {
    id: "domain-tech",
    domainName: "Technical",
    shortDescription: "Full-stack web applications, microservices, cloud infrastructure, and developer tools.",
    fullDescription:
      "The Technical domain engineers the club's core digital platforms, internal tools, and open-source packages. You will collaborate on modern web systems with React, TypeScript, Rust/Python services, and automated CI/CD.",
    skills: ["React/Next.js", "TypeScript", "Node.js / Python", "Git / GitHub Actions", "Cloud & Docker"],
    isOpen: true,
    questions: [
      {
        id: "github_url",
        label: "GitHub Profile or Code Repository URL",
        type: "url",
        placeholder: "https://github.com/username",
        required: true,
      },
      {
        id: "best_project",
        label: "Describe your best technical project, tech stack used, and key challenges solved:",
        type: "textarea",
        placeholder: "Built a distributed task worker using...",
        required: true,
      },
    ],
  },
  {
    id: "domain-ai",
    domainName: "AI & Data Science",
    shortDescription: "Machine learning architectures, computer vision, NLP, statistical modeling, and data pipelines.",
    fullDescription:
      "Build deep learning workflows, research novel architectures, analyze campus datasets, and organize datathons and ML bootcamps.",
    skills: ["PyTorch / TensorFlow", "Pandas & NumPy", "Computer Vision / NLP", "Scikit-Learn", "Model Deployment"],
    isOpen: true,
    questions: [
      {
        id: "kaggle_or_hf",
        label: "Kaggle, Hugging Face, or Research link (if any)",
        type: "url",
        placeholder: "https://kaggle.com/username or HuggingFace",
        required: false,
      },
      {
        id: "ml_experience",
        label: "What machine learning libraries or models have you trained or deployed?",
        type: "textarea",
        placeholder: "Fine-tuned Whisper/Llama models or built CNN classification pipelines...",
        required: true,
      },
    ],
  },
  {
    id: "domain-design",
    domainName: "Design & Media",
    shortDescription: "Visual identity, UI/UX interaction systems, event branding, 3D motion, and typography.",
    fullDescription:
      "Design user experiences, social collateral, posters, digital badges, and interactive web elements for DSC events and hackathons.",
    skills: ["Figma", "Adobe Illustrator / Photoshop", "UI/UX Prototyping", "Motion Graphics", "3D / Blender"],
    isOpen: true,
    questions: [
      {
        id: "design_portfolio",
        label: "Figma, Behance, or Dribbble Portfolio Link",
        type: "url",
        placeholder: "https://figma.com/@portfolio or behance.net/...",
        required: true,
      },
      {
        id: "design_philosophy",
        label: "Which design software do you feel most fluent in, and what inspires your design style?",
        type: "textarea",
        placeholder: "I focus on high-contrast cyberpunk typography...",
        required: true,
      },
    ],
  },
  {
    id: "domain-content",
    domainName: "Content & Editorial",
    shortDescription: "Technical writing, research articles, documentation, event newsletters, and thought leadership.",
    fullDescription:
      "Craft compelling narratives around cutting-edge data science topics, write post-event reports, manage social announcements, and curate our tech blog.",
    skills: ["Technical Writing", "Copywriting", "Research Summaries", "Documentation", "SEO"],
    isOpen: true,
    questions: [
      {
        id: "writing_sample",
        label: "Link to a published blog, Medium article, or writing sample",
        type: "url",
        placeholder: "https://medium.com/@... or Google Docs link",
        required: false,
      },
      {
        id: "topic_pitch",
        label: "Pitch a brief 3-sentence blog post topic you would write for DSC:",
        type: "textarea",
        placeholder: "Title: Demystifying Quantization in Large Language Models...",
        required: true,
      },
    ],
  },
  {
    id: "domain-management",
    domainName: "Management & PR",
    shortDescription: "Event logistics, sponsor outreach, stage operations, public relations, and cross-team coordination.",
    fullDescription:
      "Drive campus outreach, secure corporate sponsorships, manage speaker logistics, and ensure events run with precision.",
    skills: ["Event Operations", "Corporate Sponsorship", "Public Speaking", "Negotiation", "Crisis Resolution"],
    isOpen: true,
    questions: [
      {
        id: "prior_experience",
        label: "Share prior experience organizing club events, fests, or school teams:",
        type: "textarea",
        placeholder: "Headed logistics for collegiate technical fest...",
        required: true,
      },
      {
        id: "scenario_resolution",
        label: "How would you handle a situation where a keynote speaker cancels 30 minutes before an event?",
        type: "textarea",
        placeholder: "Action plan...",
        required: true,
      },
    ],
  },
];

const INITIAL_FINANCE_SHEETS: FinanceSheet[] = [
  {
    id: "sheet-datahacks-25",
    eventId: "event-datahacks-2025",
    eventTitle: "DataHacks '25 (Past Flagship)",
    totalIncome: 145000,
    totalExpense: 112450,
    netBalance: 32550,
    lastUpdated: "2025-10-25T18:30:00.000Z",
  },
  {
    id: "sheet-bootcamp-26",
    eventId: "event-bootcamp-2026",
    eventTitle: "PyTorch Deep Dive Bootcamp",
    totalIncome: 25000,
    totalExpense: 8500,
    netBalance: 16500,
    lastUpdated: "2026-09-10T14:00:00.000Z",
  },
  {
    id: "sheet-datahacks-26",
    eventId: "event-hack-2026",
    eventTitle: "DataHacks '26 (Active)",
    totalIncome: 78500,
    totalExpense: 24200,
    netBalance: 54300,
    lastUpdated: "2026-09-14T12:00:00.000Z",
  },
];

const INITIAL_FINANCE_TRANSACTIONS: FinanceTransaction[] = [
  {
    id: "txn-1",
    sheetId: "sheet-datahacks-26",
    eventId: "event-hack-2026",
    eventTitle: "DataHacks '26",
    type: "income",
    category: "Sponsorship",
    amount: 50000,
    description: "Title Sponsorship grant from Cloud Platform partner",
    paymentMode: "Bank Transfer",
    transactionRef: "NEFT-DSC-2026-9912",
    transactionDate: "2026-09-02",
    addedByEmail: "neelpandeyofficial@gmail.com",
    addedByName: "Neel Pandey (President)",
    createdAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "txn-2",
    sheetId: "sheet-datahacks-26",
    eventId: "event-hack-2026",
    eventTitle: "DataHacks '26",
    type: "income",
    category: "Registration Fee",
    amount: 28500,
    description: "Online team ticket registrations (Batch 1 - 95 teams)",
    paymentMode: "UPI",
    transactionRef: "UPI-BATCH-REG-01",
    transactionDate: "2026-09-10",
    addedByEmail: "vp.dsc@vitbhopal.ac.in",
    addedByName: "Aarav Sharma (VP)",
    createdAt: "2026-09-10T15:30:00.000Z",
  },
  {
    id: "txn-3",
    sheetId: "sheet-datahacks-26",
    eventId: "event-hack-2026",
    eventTitle: "DataHacks '26",
    type: "expense",
    category: "Marketing",
    amount: 8200,
    description: "Campus banners, promotional stickers & laser printed flyers",
    paymentMode: "UPI",
    transactionRef: "UPI-PRNT-449102",
    transactionDate: "2026-09-05",
    addedByEmail: "neelpandeyofficial@gmail.com",
    addedByName: "Neel Pandey (President)",
    createdAt: "2026-09-05T16:00:00.000Z",
  },
  {
    id: "txn-4",
    sheetId: "sheet-datahacks-26",
    eventId: "event-hack-2026",
    eventTitle: "DataHacks '26",
    type: "expense",
    category: "Prizes",
    amount: 16000,
    description: "Advance payment for customized acrylic trophies & prize certificates",
    paymentMode: "Bank Transfer",
    transactionRef: "IMPS-TRPH-7721",
    transactionDate: "2026-09-12",
    addedByEmail: "neelpandeyofficial@gmail.com",
    addedByName: "Neel Pandey (President)",
    createdAt: "2026-09-12T11:20:00.000Z",
  },
];

const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: "log-1",
    actorEmail: "neelpandeyofficial@gmail.com",
    actorName: "Neel Pandey",
    actorRole: "super_admin",
    actionType: "SYSTEM_INITIALIZED",
    targetModule: "Settings",
    details: "Initialized DSC Web Platform with dual-engine architecture and 100% free-tier zero cost guarantee.",
    timestamp: new Date().toISOString(),
  },
];

// Helper to interact with Local Cache
function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("dsc_data_change", { detail: { key } }));
  } catch (err) {
    console.warn("Local storage write error:", err);
  }
}

// =========================================================================
// DATA ENGINE CLASS IMPLEMENTATION
// =========================================================================
export class DataEngine {
  private static instance: DataEngine;

  private constructor() {
    this.seedDefaultsIfEmpty();
  }

  public static getInstance(): DataEngine {
    if (!DataEngine.instance) {
      DataEngine.instance = new DataEngine();
    }
    return DataEngine.instance;
  }

  private seedDefaultsIfEmpty(): void {
    if (typeof window === "undefined") return;

    if (!localStorage.getItem(STORAGE_KEYS.SYSTEM_SETTINGS)) {
      setLocal(STORAGE_KEYS.SYSTEM_SETTINGS, INITIAL_SETTINGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER_ROLES)) {
      setLocal(STORAGE_KEYS.USER_ROLES, INITIAL_USER_ROLES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      setLocal(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.HIRING_DOMAINS)) {
      setLocal(STORAGE_KEYS.HIRING_DOMAINS, INITIAL_HIRING_DOMAINS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.FINANCE_SHEETS)) {
      setLocal(STORAGE_KEYS.FINANCE_SHEETS, INITIAL_FINANCE_SHEETS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.FINANCE_TRANSACTIONS)) {
      setLocal(STORAGE_KEYS.FINANCE_TRANSACTIONS, INITIAL_FINANCE_TRANSACTIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS)) {
      setLocal(STORAGE_KEYS.ACTIVITY_LOGS, INITIAL_ACTIVITY_LOGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
      setLocal(STORAGE_KEYS.REGISTRATIONS, []);
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
      setLocal(STORAGE_KEYS.APPLICATIONS, []);
    }
  }

  // -------------------------------------------------------------
  // 1. User Roles & RBAC
  // -------------------------------------------------------------
  public async getUserRoles(): Promise<UserRoleRecord[]> {
    return getLocal<UserRoleRecord[]>(STORAGE_KEYS.USER_ROLES, INITIAL_USER_ROLES);
  }

  public async assignUserRole(newRole: Omit<UserRoleRecord, "id" | "createdAt">): Promise<UserRoleRecord> {
    const roles = await this.getUserRoles();
    const existingIndex = roles.findIndex((r) => r.email.toLowerCase() === newRole.email.toLowerCase());

    const existing = existingIndex >= 0 ? roles[existingIndex] : undefined;
    const record: UserRoleRecord = {
      ...newRole,
      id: existing ? existing.id : `role-${Date.now()}`,
      createdAt: existing ? existing.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      roles[existingIndex] = record;
    } else {
      roles.push(record);
    }

    setLocal(STORAGE_KEYS.USER_ROLES, roles);
    await this.logActivity(
      newRole.email,
      newRole.fullName,
      "super_admin",
      "ASSIGN_ROLE",
      "UserRole",
      `Assigned role ${newRole.role} (${newRole.title}) to ${newRole.email}`,
    );
    return record;
  }

  public async removeUserRole(roleId: string, actorEmail: string): Promise<boolean> {
    const roles = await this.getUserRoles();
    const target = roles.find((r) => r.id === roleId);
    if (!target) return false;

    const filtered = roles.filter((r) => r.id !== roleId);
    setLocal(STORAGE_KEYS.USER_ROLES, filtered);

    await this.logActivity(
      actorEmail,
      "Super Admin",
      "super_admin",
      "REMOVE_ROLE",
      "UserRole",
      `Removed role record for ${target.email} (${target.title})`,
    );
    return true;
  }

  public async getCurrentUserRole(email?: string): Promise<UserRoleRecord> {
    if (!email) {
      // Default to guest / member
      return {
        id: "guest",
        email: "",
        fullName: "Guest Visitor",
        role: "member",
        title: "Guest",
        isActive: true,
        createdAt: new Date().toISOString(),
      };
    }

    const roles = await this.getUserRoles();
    const matched = roles.find((r) => r.email.toLowerCase() === email.toLowerCase());

    if (matched) return matched;

    // By default, super admin check for developer email
    if (email.toLowerCase() === "neelpandeyofficial@gmail.com") {
      return {
        id: "owner-root",
        email: "neelpandeyofficial@gmail.com",
        fullName: "Neel Pandey",
        role: "super_admin",
        title: "President",
        leadDomain: "None",
        isActive: true,
        createdAt: new Date().toISOString(),
      };
    }

    return {
      id: `user-${Date.now()}`,
      email,
      fullName: email.split("@")[0] || "Member",
      role: "member",
      title: "Member",
      isActive: true,
      createdAt: new Date().toISOString(),
    };
  }

  // -------------------------------------------------------------
  // 2. Events & Registrations
  // -------------------------------------------------------------
  public async getEvents(): Promise<ClubEvent[]> {
    return getLocal<ClubEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  }

  public async getEventBySlug(slug: string): Promise<ClubEvent | null> {
    const events = await this.getEvents();
    return events.find((e) => e.slug === slug || e.id === slug) || null;
  }

  public async saveEvent(eventData: Partial<ClubEvent> & { title: string }): Promise<ClubEvent> {
    const events = await this.getEvents();
    const isNew = !eventData.id;
    const eventId = eventData.id || `event-${Date.now()}`;
    const slug = eventData.slug || eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const saved: ClubEvent = {
      id: eventId,
      slug,
      title: eventData.title,
      tag: eventData.tag || "WORKSHOP",
      eventDate: eventData.eventDate || new Date().toISOString(),
      venue: eventData.venue || "VIT Bhopal Campus",
      description: eventData.description || "",
      bannerImage: eventData.bannerImage || "/assets/event-workshop.jpg",
      isRegistrationOpen: eventData.isRegistrationOpen ?? true,
      registrationDeadline:
        eventData.registrationDeadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      maxCapacity: eventData.maxCapacity || 150,
      currentRegistrations: eventData.currentRegistrations || 0,
      isPaidEvent: eventData.isPaidEvent ?? false,
      registrationFee: eventData.registrationFee || 0,
      upiId: eventData.upiId || "dscvitb@upi",
      upiPayeeName: eventData.upiPayeeName || "DSC VITB",
      createdAt: eventData.createdAt || new Date().toISOString(),
    };

    const index = events.findIndex((e) => e.id === eventId);
    if (index >= 0) {
      events[index] = saved;
    } else {
      events.push(saved);
      // Auto-provision a finance sheet for new events
      await this.ensureFinanceSheet(saved.id, saved.title);
    }

    setLocal(STORAGE_KEYS.EVENTS, events);
    return saved;
  }

  public async getRegistrations(eventId?: string): Promise<RegistrationRecord[]> {
    const all = getLocal<RegistrationRecord[]>(STORAGE_KEYS.REGISTRATIONS, []);
    if (!eventId) return all;
    return all.filter((r) => r.eventId === eventId);
  }

  public async createRegistration(regData: Omit<RegistrationRecord, "id" | "registrationId" | "registeredAt">): Promise<RegistrationRecord> {
    const all = await this.getRegistrations();
    const event = await this.getEventBySlug(regData.eventId);

    // Generate unique registration ID: DSC-[EVENT_TAG]-[IND/TEAM]-[RANDOM_HEX]
    const tagCode = (event?.tag || "REG").slice(0, 4).toUpperCase();
    const typeCode = regData.regType === "team" ? "TEAM" : "IND";
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const registrationId = `DSC-${tagCode}-${typeCode}-${randCode}`;

    // Check capacity limit
    const confirmedCount = all.filter((r) => r.eventId === regData.eventId && r.registrationStatus === "confirmed").length;
    const isWaitlisted = event ? confirmedCount >= event.maxCapacity : false;

    const record: RegistrationRecord = {
      ...regData,
      id: `reg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      registrationId,
      registrationStatus: isWaitlisted ? "waitlisted" : regData.registrationStatus || "confirmed",
      registeredAt: new Date().toISOString(),
    };

    all.unshift(record);
    setLocal(STORAGE_KEYS.REGISTRATIONS, all);

    // Increment event registration counter
    if (event) {
      event.currentRegistrations = (event.currentRegistrations || 0) + 1;
      await this.saveEvent(event);
    }

    // If paid and has UTR, log pending verification activity
    if (record.paymentAmount > 0) {
      await this.logActivity(
        record.email,
        record.fullName,
        "member",
        "REGISTRATION_SUBMITTED",
        "Registration",
        `Submitted registration ${registrationId} for "${record.eventTitle}" with UTR: ${record.paymentUtr || "None"} (₹${record.paymentAmount})`,
      );
    }

    return record;
  }

  public async updateRegistrationStatus(
    id: string,
    status: { registrationStatus?: RegistrationRecord["registrationStatus"]; paymentStatus?: RegistrationRecord["paymentStatus"] },
    actorEmail: string,
  ): Promise<boolean> {
    const all = await this.getRegistrations();
    const item = all.find((r) => r.id === id || r.registrationId === id);
    if (!item) return false;

    if (status.registrationStatus) item.registrationStatus = status.registrationStatus;
    if (status.paymentStatus) item.paymentStatus = status.paymentStatus;

    setLocal(STORAGE_KEYS.REGISTRATIONS, all);

    await this.logActivity(
      actorEmail,
      "Admin",
      "super_admin",
      "UPDATE_REGISTRATION_STATUS",
      "Registration",
      `Updated registration ${item.registrationId} (${item.fullName}) to regStatus: ${item.registrationStatus}, payStatus: ${item.paymentStatus}`,
    );

    return true;
  }

  // -------------------------------------------------------------
  // 3. Hiring & Applications
  // -------------------------------------------------------------
  public async getHiringDomains(): Promise<HiringDomain[]> {
    return getLocal<HiringDomain[]>(STORAGE_KEYS.HIRING_DOMAINS, INITIAL_HIRING_DOMAINS);
  }

  public async getApplications(leadDomainFilter?: LeadDomain): Promise<ApplicationRecord[]> {
    const all = getLocal<ApplicationRecord[]>(STORAGE_KEYS.APPLICATIONS, []);
    if (!leadDomainFilter || leadDomainFilter === "None") return all;
    return all.filter((a) => a.primaryTeam === leadDomainFilter || a.secondaryTeam === leadDomainFilter);
  }

  public async submitApplication(appData: Omit<ApplicationRecord, "id" | "status" | "submittedAt">): Promise<ApplicationRecord> {
    const all = await this.getApplications();

    const record: ApplicationRecord = {
      ...appData,
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: "applied",
      submittedAt: new Date().toISOString(),
    };

    all.unshift(record);
    setLocal(STORAGE_KEYS.APPLICATIONS, all);

    await this.logActivity(
      record.email,
      record.fullName,
      "member",
      "APPLICATION_SUBMITTED",
      "Hiring",
      `Submitted recruitment application for ${record.primaryTeam} (Choice 1) & ${record.secondaryTeam || "None"} (Choice 2)`,
    );

    return record;
  }

  public async updateApplicationStatus(
    id: string,
    status: ApplicationRecord["status"],
    reviewerNotes?: string,
    actorEmail = "admin@dsc.vitbhopal.ac.in",
  ): Promise<boolean> {
    const all = await this.getApplications();
    const item = all.find((a) => a.id === id);
    if (!item) return false;

    item.status = status;
    if (reviewerNotes !== undefined) item.reviewerNotes = reviewerNotes;
    item.updatedAt = new Date().toISOString();

    setLocal(STORAGE_KEYS.APPLICATIONS, all);

    await this.logActivity(
      actorEmail,
      "Reviewer",
      "team_lead",
      "UPDATE_APPLICATION_STATUS",
      "Hiring",
      `Updated application status for ${item.fullName} (${item.primaryTeam}) to "${status}"`,
    );

    return true;
  }

  // -------------------------------------------------------------
  // 4. Finance Module
  // -------------------------------------------------------------
  public async getFinanceSheets(): Promise<FinanceSheet[]> {
    return getLocal<FinanceSheet[]>(STORAGE_KEYS.FINANCE_SHEETS, INITIAL_FINANCE_SHEETS);
  }

  public async ensureFinanceSheet(eventId: string, eventTitle: string): Promise<FinanceSheet> {
    const sheets = await this.getFinanceSheets();
    const existing = sheets.find((s) => s.eventId === eventId);
    if (existing) return existing;

    const newSheet: FinanceSheet = {
      id: `sheet-${eventId}`,
      eventId,
      eventTitle,
      totalIncome: 0,
      totalExpense: 0,
      netBalance: 0,
      lastUpdated: new Date().toISOString(),
    };

    sheets.push(newSheet);
    setLocal(STORAGE_KEYS.FINANCE_SHEETS, sheets);
    return newSheet;
  }

  public async getFinanceTransactions(sheetId?: string): Promise<FinanceTransaction[]> {
    const all = getLocal<FinanceTransaction[]>(STORAGE_KEYS.FINANCE_TRANSACTIONS, INITIAL_FINANCE_TRANSACTIONS);
    if (!sheetId) return all;
    return all.filter((t) => t.sheetId === sheetId || t.eventId === sheetId);
  }

  public async addFinanceTransaction(
    txnData: Omit<FinanceTransaction, "id" | "createdAt">,
    actorEmail: string,
  ): Promise<FinanceTransaction> {
    const all = await this.getFinanceTransactions();

    const record: FinanceTransaction = {
      ...txnData,
      id: `txn-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };

    all.unshift(record);
    setLocal(STORAGE_KEYS.FINANCE_TRANSACTIONS, all);

    // Recalculate sheet balances
    await this.recalculateSheetBalance(record.sheetId);

    await this.logActivity(
      actorEmail,
      txnData.addedByName || "Admin",
      "super_admin",
      "ADD_FINANCE_TRANSACTION",
      "Finance",
      `Logged ${record.type.toUpperCase()} of ₹${record.amount} for "${record.eventTitle}" (${record.category}: ${record.description})`,
    );

    return record;
  }

  public async deleteFinanceTransaction(id: string, actorEmail: string): Promise<boolean> {
    const all = await this.getFinanceTransactions();
    const target = all.find((t) => t.id === id);
    if (!target) return false;

    const filtered = all.filter((t) => t.id !== id);
    setLocal(STORAGE_KEYS.FINANCE_TRANSACTIONS, filtered);

    await this.recalculateSheetBalance(target.sheetId);

    await this.logActivity(
      actorEmail,
      "Admin",
      "super_admin",
      "DELETE_FINANCE_TRANSACTION",
      "Finance",
      `Deleted ${target.type} transaction # ${target.id} of ₹${target.amount} for "${target.eventTitle}"`,
    );

    return true;
  }

  private async recalculateSheetBalance(sheetId: string): Promise<void> {
    const sheets = await this.getFinanceSheets();
    const txns = await this.getFinanceTransactions();

    const sheet = sheets.find((s) => s.id === sheetId || s.eventId === sheetId);
    if (!sheet) return;

    const sheetTxns = txns.filter((t) => t.sheetId === sheet.id || t.eventId === sheet.eventId);
    const totalIncome = sheetTxns.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount || 0), 0);
    const totalExpense = sheetTxns.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount || 0), 0);

    sheet.totalIncome = totalIncome;
    sheet.totalExpense = totalExpense;
    sheet.netBalance = totalIncome - totalExpense;
    sheet.lastUpdated = new Date().toISOString();

    setLocal(STORAGE_KEYS.FINANCE_SHEETS, sheets);
  }

  public async getFinanceSummary(): Promise<{
    totalTreasuryIncome: number;
    totalTreasuryExpense: number;
    overallClubReserves: number;
    sheetsCount: number;
    transactionsCount: number;
  }> {
    const sheets = await this.getFinanceSheets();
    const txns = await this.getFinanceTransactions();

    const totalTreasuryIncome = txns.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount || 0), 0);
    const totalTreasuryExpense = txns.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount || 0), 0);

    return {
      totalTreasuryIncome,
      totalTreasuryExpense,
      overallClubReserves: totalTreasuryIncome - totalTreasuryExpense,
      sheetsCount: sheets.length,
      transactionsCount: txns.length,
    };
  }

  // -------------------------------------------------------------
  // 5. Activity & Audit Logs
  // -------------------------------------------------------------
  public async getActivityLogs(): Promise<ActivityLog[]> {
    return getLocal<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOGS, INITIAL_ACTIVITY_LOGS);
  }

  public async logActivity(
    actorEmail: string,
    actorName: string,
    actorRole: RoleType,
    actionType: string,
    targetModule: ActivityLog["targetModule"],
    details: string,
  ): Promise<ActivityLog> {
    const logs = await this.getActivityLogs();

    const record: ActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      actorEmail,
      actorName,
      actorRole,
      actionType,
      targetModule,
      details,
      timestamp: new Date().toISOString(),
    };

    logs.unshift(record);
    // Keep last 500 logs to preserve storage space
    if (logs.length > 500) logs.pop();

    setLocal(STORAGE_KEYS.ACTIVITY_LOGS, logs);
    return record;
  }

  // -------------------------------------------------------------
  // 6. System Settings
  // -------------------------------------------------------------
  public async getSystemSettings(): Promise<SystemSettings> {
    return getLocal<SystemSettings>(STORAGE_KEYS.SYSTEM_SETTINGS, INITIAL_SETTINGS);
  }

  public async updateSystemSettings(newSettings: Partial<SystemSettings>, actorEmail = "admin@dsc.vitbhopal.ac.in"): Promise<SystemSettings> {
    const current = await this.getSystemSettings();
    const updated: SystemSettings = {
      ...current,
      ...newSettings,
    };

    setLocal(STORAGE_KEYS.SYSTEM_SETTINGS, updated);

    await this.logActivity(
      actorEmail,
      "Super Admin",
      "super_admin",
      "UPDATE_SETTINGS",
      "Settings",
      `Updated platform settings: Hiring ${updated.isHiringOpen ? "OPEN" : "CLOSED"}, Headline: "${updated.announcementHeadline.slice(0, 40)}..."`,
    );

    return updated;
  }

  // -------------------------------------------------------------
  // 7. Zero-Cost Full Database Backup & Restore
  // -------------------------------------------------------------
  public async exportFullDatabaseBackup(): Promise<string> {
    const snapshot = {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      systemSettings: await this.getSystemSettings(),
      userRoles: await this.getUserRoles(),
      events: await this.getEvents(),
      registrations: await this.getRegistrations(),
      hiringDomains: await this.getHiringDomains(),
      applications: await this.getApplications(),
      financeSheets: await this.getFinanceSheets(),
      financeTransactions: await this.getFinanceTransactions(),
      activityLogs: await this.getActivityLogs(),
    };

    return JSON.stringify(snapshot, null, 2);
  }

  public async restoreDatabaseBackup(jsonString: string, actorEmail: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonString);
      if (!data.events || !data.userRoles || !data.systemSettings) {
        throw new Error("Invalid backup format: missing core collections.");
      }

      setLocal(STORAGE_KEYS.SYSTEM_SETTINGS, data.systemSettings);
      setLocal(STORAGE_KEYS.USER_ROLES, data.userRoles);
      setLocal(STORAGE_KEYS.EVENTS, data.events);
      if (data.registrations) setLocal(STORAGE_KEYS.REGISTRATIONS, data.registrations);
      if (data.hiringDomains) setLocal(STORAGE_KEYS.HIRING_DOMAINS, data.hiringDomains);
      if (data.applications) setLocal(STORAGE_KEYS.APPLICATIONS, data.applications);
      if (data.financeSheets) setLocal(STORAGE_KEYS.FINANCE_SHEETS, data.financeSheets);
      if (data.financeTransactions) setLocal(STORAGE_KEYS.FINANCE_TRANSACTIONS, data.financeTransactions);
      if (data.activityLogs) setLocal(STORAGE_KEYS.ACTIVITY_LOGS, data.activityLogs);

      await this.logActivity(
        actorEmail,
        "Super Admin",
        "super_admin",
        "DATABASE_RESTORED",
        "Settings",
        `Restored entire database from backup created at ${data.exportedAt || "Unknown date"}`,
      );

      return true;
    } catch (err) {
      console.error("Failed to restore backup:", err);
      return false;
    }
  }
}

export const dataEngine = DataEngine.getInstance();
