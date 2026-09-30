# Data Science Club — VIT Bhopal University (DSC VITB)

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=react-router&logoColor=white)](https://tanstack.com/router)
[![Appwrite Cloud](https://img.shields.io/badge/Appwrite_Cloud-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Zero SaaS Cost](https://img.shields.io/badge/Operational_Cost-%E2%82%B90.00%20(100%25%20Free)-10b981?style=for-the-badge)](https://github.com/N-PCs/dsc-club-website)

**The official, high-performance web platform and operations management system for the Data Science Club at VIT Bhopal University.** Engineered from the ground up to deliver a modern cyber-infused public showcase, a full-featured event registration engine with dynamic UPI payments, an online core team recruitment portal, and a secure multi-tier Role-Based Access Control (RBAC) management panel with a dedicated finance section and faculty oversight.

---

## 🏛️ Core System Modules

### 1. 🎟️ Public Event Registration Portal (`/register`, `/register/$eventId`)
* **Individual & Team Registrations:** Flexible mode toggle allowing solo entries or team formations with dynamic member rosters (Leader + up to 4 members).
* **Campus Logistics:** Auto-categorization for Hosteller vs. Day Scholar logistics.
* **OTP Email Verification:** Real-time OTP challenge to prevent spam, duplicate submissions, and fake enrollments.
* **Capacity Tracking & Auto-Close:** Real-time seat tally with automated waitlist routing once event limits are met.
* **Zero-Cost NPCI UPI Payments:** Dynamic on-the-fly UPI QR generation encoding payee VPA, amount, and unique registration ID tag. Bypasses 2% + GST gateway charges via instant 12-digit bank UTR entry and verification.
* **Vector PDF Passes:** Client-side generation of branded event badges with scannable QR codes via `jspdf`.

### 2. 💼 Public Hiring & Core Recruitment Portal (`/hiring`, `/join`)
* **Recruitment Status Banner:** Dynamic hiring toggle (*Open* / *Closed*) with live deadline countdown clocks.
* **5 Core Technical & Creative Domains:**
  1. **Technical:** Full-stack web development, cloud infra, microservices.
  2. **AI & Data Science:** Machine learning pipelines, deep learning, NLP, computer vision.
  3. **Design & Media:** UI/UX, graphic design, 3D assets, video editing.
  4. **Content & Editorial:** Technical blogging, newsletters, documentation, social copy.
  5. **Management & PR:** Event coordination, sponsorships, logistics, public relations.
* **Dynamic Domain Questionnaires:** Contextual questions rendered on-the-fly based on applicant domain selection.
* **Resume & Portfolio Integration:** Secure client-compressed PDF resume upload and GitHub/LinkedIn linking.
* **Applicant Review Pipeline:** 5-stage status workflow (*Applied* ➔ *Shortlisted* ➔ *Interview* ➔ *Selected* ➔ *Rejected*), candidate dossier modal, and multi-format CSV/Excel export.

### 3. 🛡️ Club Management Panel & RBAC Operations Center (`/admin`)
* **Role-Based Access Control (RBAC):**
  * 👑 **Super Admins (President, VP, GS, JS):** Universal read/write authority across registrations, recruitment, team governance, audit logs, and finance.
  * 🎓 **Faculty Coordinator:** Dedicated read-only oversight across all modules, compliance metrics, and direct institutional PDF dossier exports.
  * 💻 **Team Leads:** Scoped exclusively to their assigned technical domain. Automatically locked out of other teams' applications and strictly barred from the Finance section.
  * 👤 **General Members:** No panel access; directed to public registration and application forms.
* **Team Lead Governance:** Super Admins can dynamically grant or revoke lead permissions by university email and bind domain scopes.
* **Immutable Audit Trail:** Comprehensive activity log capturing every mutation with actor email, role, module, details, and ISO timestamps.
* **Disaster Recovery:** 1-click JSON database snapshot export and restore.

### 4. 💰 Dedicated Finance & Treasury Section (`/admin` -> Finance)
* **Event-Wise Bookkeeping:** Dedicated ledger sheets auto-provisioned for every event to maintain separate accounting.
* **Revenue Inflow Tracking:** Categorized tracking for *Registration Fees*, *Sponsorships*, *College Grants*, *Merchandise*, and *Other Income*.
* **Itemized Expenditure & Bill Attachment:** Log disbursements across *Venue*, *Food*, *Prizes*, *Marketing*, *Logistics*, and *Misc* with digital invoice photo/PDF attachments.
* **Zero-Cost Client-Side Image Compression:** Employs `browser-image-compression` to optimize receipt photos locally before storing as Base64 data URIs.
* **Digital Voucher Inspection Modal:** In-app receipt zoom viewer and PDF attachment downloader.
* **Institutional PDF Audit Statements:** Generates formal financial audit reports compliant with university standards, including signature blocks for the Club President, Faculty Coordinator, and Dean.
* **Multi-Sheet Excel Workbooks (`.xlsx`):** Formatted multi-tab workbook with Master Summary, Inflows, and Expenditures.

---

## 🚀 Implementation Phases & Architecture Roadmap

The platform was built following the comprehensive requirements in [`system-design.md`](./system-design.md). Every phase includes dedicated documentation with performance statistics:

| Phase | Milestone Name | Key Deliverables | Status | Documentation |
| :---: | :--- | :--- | :---: | :---: |
| **Phase 1** | **Data Layer & Collections** | Appwrite collections schema, dual-engine hybrid storage, strict TypeScript models | **Complete** | [`phase-1.md`](./phase-1.md) |
| **Phase 2** | **Public Registration Portal** | Individual/Team forms, OTP gate, UPI QR passes, vector PDF badges | **Complete** | [`phase-2.md`](./phase-2.md) |
| **Phase 3** | **Public Hiring Portal** | Domain forms, countdown timer, 5-stage status review pipeline, candidate dossiers | **Complete** | [`phase-3.md`](./phase-3.md) |
| **Phase 4** | **Club Management & RBAC** | Role-based navigation, candidate review, team lead manager, audit log, backup utility | **Complete** | [`phase-4.md`](./phase-4.md) |
| **Phase 5** | **Dedicated Finance Section** | Event-wise ledgers, bill upload/viewer, audit PDF & Excel workbooks | **Complete** | [`phase-5.md`](./phase-5.md) |
| **Phase 6** | **Faculty Oversight & Final Verification** | Faculty dashboard, institutional semester dossier, mobile audit, zero dummy data sign-off | **Complete** | [`phase-6.md`](./phase-6.md) |

---

## ⚡ 100% Free-Tier & Zero-Cost Architecture Guarantee

Every service and library in this platform was selected to ensure **₹0.00 / month lifetime operational and recurring cost**:

1. **Zero Gateway Fees:** Native NPCI UPI QR code generation via `qrcode.react` with 12-digit bank UTR entry eliminates payment gateway charges (saving 2% + GST per registration).
2. **Zero Server Rendering Costs:** Institutional audit statements and registration passes are vector-rendered directly in the client's browser via `jspdf` and `jspdf-autotable`.
3. **Zero Spreadsheet Service Costs:** Complex multi-sheet Excel workbooks (`.xlsx`) stream directly from browser memory via `xlsx` (SheetJS).
4. **Zero Cloud Bandwidth Overhead:** Receipt images and invoices are compressed on the client's device using HTML5 canvas via `browser-image-compression`.
5. **High-Availability Hybrid Data Engine:** Local-first reactive storage with automatic synchronization ensures 100% operational uptime even during university Wi-Fi outages.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 | High-performance reactive UI rendering |
| **Language** | TypeScript 5.8 | Strict type safety with `exactOptionalPropertyTypes` |
| **Routing** | TanStack Router 1.170 | Type-safe, file-based client routing with code-splitting |
| **Backend & Cloud DB** | Appwrite Cloud | Headless serverless backend, Auth, and Database collections |
| **Styling** | Tailwind CSS v4 | High-performance CSS design system |
| **Visual Effects & 3D** | Three.js & GLSL Shaders | Dither shaders, dynamic particle globe, ambient lights |
| **Document Generation** | jsPDF & jsPDF-AutoTable | Client-side vector PDF passes and university audit statements |
| **Spreadsheet Engine** | SheetJS (xlsx) | Multi-sheet Excel workbook export |
| **Image Compression** | browser-image-compression | Client-side receipt compression |
| **QR Code Engine** | qrcode.react | Dynamic NPCI UPI payment QR codes |
| **Icons & UI** | Lucide React & Radix UI | Accessible UI primitives and icons |
| **Build Tool** | Vite 8 | Sub-second HMR and production bundling |

---

## 📁 Project Directory Structure

```text
dsc-club-website/
├── public/                         # Static assets, branding, and campus event media
├── scripts/
│   └── init-appwrite-db.js         # Automated Appwrite Database & collection provisioner
├── src/
│   ├── components/
│   │   ├── admin/                  # Management panel views (Dashboard, Registrations, Leads, Logs, Backup)
│   │   ├── faculty/                # Faculty Coordinator oversight & master dossier PDF generator
│   │   ├── finance/                # Finance ledger view, bill upload/viewer, Excel & PDF statement engines
│   │   ├── hiring/                 # Public recruitment portal, domain forms, and review pipeline
│   │   ├── registration/           # Public event registration portal, OTP challenge, and PDF passes
│   │   ├── pages/                  # Page containers (AdminPanel, NotFoundPage)
│   │   ├── sections/               # Landing page sections (Hero, About, Events, Domains, Team, Footer)
│   │   ├── site/                   # Global site elements (Navbar, Ambient, Globe, RadialMenu, TextLoop)
│   │   └── ui/                     # UI components (ChromaGrid, Dither, Dialog, Table, Tabs, Sonner)
│   ├── lib/
│   │   ├── data-engine.ts          # Reactive dual-engine hybrid data layer & offline storage
│   │   ├── appwrite.ts             # Appwrite SDK client and authentication methods
│   │   └── utils.ts                # Styling utilities and class variance helpers
│   ├── routes/                     # TanStack file-based routes
│   │   ├── __root.tsx              # Root shell layout
│   │   ├── index.tsx               # Homepage
│   │   ├── events.tsx              # Campus events explorer
│   │   ├── register.tsx            # Event registration route
│   │   ├── register.$eventId.tsx   # Dynamic event registration route
│   │   ├── hiring.tsx              # Core recruitment portal
│   │   ├── join.tsx                # Recruitment redirect route
│   │   ├── members.tsx             # Executive board and member roster
│   │   ├── about.tsx               # Club history and mission
│   │   └── admin.tsx               # Protected Club Management Panel
│   ├── types/
│   │   └── models.ts               # Strict TypeScript data models for all modules
│   ├── main.tsx                    # React application entrypoint
│   └── styles.css                  # Global tokens and cyber-infused theme styling
├── phase-1.md                      # Phase 1 Summary: Appwrite Database & Data Layer
├── phase-2.md                      # Phase 2 Summary: Public Registration Portal
├── phase-3.md                      # Phase 3 Summary: Public Hiring Portal
├── phase-4.md                      # Phase 4 Summary: Management Panel & RBAC Core
├── phase-5.md                      # Phase 5 Summary: Dedicated Finance Section
├── phase-6.md                      # Phase 6 Summary: Faculty Oversight & Final Verification
├── system-design.md                # Comprehensive System Design Document
├── package.json                    # Dependencies and npm scripts
├── vite.config.ts                  # Vite and TanStack Router build configuration
└── README.md                       # Master project documentation
```

---

## 🚀 How to Run Locally

### Prerequisites
* **Node.js**: `>= 22.12.0`
* **npm**: `>= 10.0.0`

### 1. Clone & Install
```bash
git clone https://github.com/N-PCs/dsc-club-website.git
cd dsc-club-website
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to create your local `.env`:
```bash
cp .env.example .env
```

Configure your credentials in `.env`:
```dotenv
VITE_APPWRITE_PROJECT_ID="6a931d3300098a4116bf"
VITE_APPWRITE_PROJECT_NAME="dscvitb"
VITE_APPWRITE_ENDPOINT="https://sgp.cloud.appwrite.io/v1"
APPWRITE_API_KEY="your_optional_appwrite_api_key"
```
*(Note: If Appwrite Cloud credentials are not configured, the platform automatically activates its high-availability local-first hybrid data engine with 100% functionality).*

### 3. Provision Database Collections (Optional)
```bash
npm run setup:db
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Build & Type Checking
```bash
# Verify TypeScript types
npx tsc --noEmit

# Compile production bundle
npm run build
```

---

## 👥 Management Panel Access Details

Access to the Management Panel (`/admin`) is strictly controlled:

| Account / Role | Access Level | Description |
| :--- | :--- | :--- |
| **👑 President (Super Admin)** | Universal Read/Write | Full control across Registrations, Recruitment, Finance, and RBAC governance. |
| **🎓 Faculty Coordinator** | Read-Only Oversight | Comprehensive oversight, verification checklists, and Master Dossier PDF generation. |
| **💻 Team Leads** | Scoped Domain Control | Manage applicants and tasks scoped to assigned domain. Finance section locked. |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

<p align="center">
  Crafted with ❤️ by the Data Science Club Web Team at VIT Bhopal University.
</p>
