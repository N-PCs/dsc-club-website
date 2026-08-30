# ⚡ Data Science Club — VIT Bhopal (DSC VITB)

[![React 19](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.170-FF4154?style=for-the-badge&logo=react-router&logoColor=white)](https://tanstack.com/router)
[![Appwrite Cloud](https://img.shields.io/badge/Appwrite-Cloud-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r185-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

The official, high-performance web platform for the **Data Science Club at VIT Bhopal University**. Built to showcase club projects, host event registrations, highlight member dossiers, and streamline core team recruitment via **Appwrite Cloud**.

---

## 🌟 Key Features

* **🎨 Cyberpunk & Glassmorphism Aesthetic**: Rich dark mode visuals, HSL glow effects, backdrop blur shaders, custom cursors, and responsive layouts.
* **🌀 Shader-Powered Hero Section**: Live dynamic GLSL Dither shader background visualising data science concepts (graphs, noise, neural node scatter plots).
* **👥 Member Roster & ChromaGrid**: Interactive grid featuring team cards with spotlight animations, domain color badges (Platinum, Gold, Silver, Neon Blue, Emerald), and strict core team filtering.
* **📱 Custom Mobile Glassmorphism Dropdown**:
  * Animated glass dropdown menu replacing native selects on mobile.
  * Live **Member Count Pills** per team.
  * **Auto-Slideshow Mode**: Automatically cycles through departmental teams every 3.5 seconds until manually interacted with.
* **📝 Online Core Team Recruitment**: Seamless application form submitting candidate profiles directly to Appwrite Cloud.
* **🛡️ Admin Access Portal (`/admin`)**:
  * **Strict Campus Domain Filter**: Restricts standard admin logins to `@vitbhopal.ac.in` student email addresses.
  * **Super Admin Override**: `neelpandeyofficial@gmail.com` enjoys direct super administrative privileges.
  * **Email Access Manager 👑**: Super Admins can dynamically grant or revoke admin access for specific team lead email addresses.
  * **Real-time Applicant Dashboard**: View, filter (by domain/team/status), search, and update candidate statuses (*Pending*, *Shortlisted*, *Accepted*, *Rejected*).
* **⚙️ Automated Database Provisioning**: Automated CLI & script setup (`npm run setup:db`) to provision Appwrite database schemas and attributes in seconds.

---

## 🛠️ Tech Stack & Badges

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | ![React](https://img.shields.io/badge/-React_19-61DAFB?logo=react&logoColor=black) | Next-gen UI rendering |
| **Language** | ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | Strict end-to-end type safety |
| **Routing** | ![TanStack Router](https://img.shields.io/badge/-TanStack_Router-FF4154?logo=react-router&logoColor=white) | Fully type-safe file-based client & SSR routing |
| **Backend & Auth** | ![Appwrite](https://img.shields.io/badge/-Appwrite_Cloud-F02E65?logo=appwrite&logoColor=white) | Authentication, Database, and Member Recruitment Storage |
| **3D & Shaders** | ![Three.js](https://img.shields.io/badge/-Three.js_/_WebGL-000000?logo=three.js&logoColor=white) | Dither WebGL fragment shaders & 3D Interactive Globe |
| **Animations** | ![GSAP](https://img.shields.io/badge/-GSAP-88CE02?logo=greensock&logoColor=white) | Smooth timeline animations and reactive UI motion |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white) | Utility-first CSS & Vanilla glassmorphism styling |
| **Build Tool** | ![Vite](https://img.shields.io/badge/-Vite_8-646CFF?logo=vite&logoColor=white) | Instant HMR dev server & optimized bundler |

---

## 🔄 System Architecture & Workflow

```mermaid
flowchart TD
    subgraph Frontend["Frontend (React 19 + TanStack Router)"]
        User["🌐 Visitor / Student"]
        Nav["🧭 Navigation & Hero (Dither Shader)"]
        Members["👥 Members Roster (ChromaGrid + Glassmorphism Dropdown)"]
        Join["📝 Recruitment Application (Join Us)"]
        Admin["🛡️ Admin Access Portal (/admin)"]
    end

    subgraph Authentication["Authentication & Access Control"]
        AuthCheck{"🔐 Access Check"}
        CampusDomain["Email: *@vitbhopal.ac.in"]
        SuperAdmin["Super Admin: neelpandeyofficial@gmail.com"]
        CustomAdmins["Custom Authorized Email List"]
    end

    subgraph Appwrite["Appwrite Cloud Backend"]
        AccountService["Appwrite Auth Service"]
        Database["Database (dscvitb_db)"]
        Collection["Recruitment Applications Collection"]
    end

    User --> Nav
    User --> Members
    User --> Join
    Join -->|Submit Application| Collection
    User -->|Click Footer Admin Link| Admin
    Admin --> AuthCheck
    AuthCheck -->|Validates| CampusDomain
    AuthCheck -->|Bypasses| SuperAdmin
    AuthCheck -->|Validates| CustomAdmins
    SuperAdmin -->|Grant / Revoke Admin Access| CustomAdmins
    Admin -->|Manage Registrations| Database
    Database --> Collection
```

---

## 📁 Project Structure

```text
dsc-club-website/
├── public/                     # Static public assets, branding logos, icons
├── scripts/
│   └── init-appwrite-db.js     # Automated Appwrite Database & Attribute setup script
├── src/
│   ├── assets/                 # SVGs and static media files
│   ├── components/
│   │   ├── pages/
│   │   │   ├── AdminPanel.tsx  # Recruitment Admin Dashboard component
│   │   │   └── AdminPanel.css  # Glassmorphism styling for Admin Dashboard
│   │   ├── sections/
│   │   │   ├── TeamSection.tsx # ChromaGrid Member Roster & Mobile Dropdown
│   │   │   ├── TeamSection.css # Roster glassmorphism & dropdown keyframes
│   │   │   ├── JoinSection.tsx # Core Team recruitment application form
│   │   │   └── FooterSection.tsx # Site footer with Admin Access link
│   │   ├── site/               # Shared site components (Navbar, Globe, TextLoop)
│   │   └── ui/                 # React Bits UI components (ChromaGrid, Dither)
│   ├── lib/
│   │   ├── appwrite.ts         # Appwrite Client, Account, & Database utilities
│   │   └── utils.ts            # Helper utilities
│   ├── routes/                 # TanStack file-based routes
│   │   ├── __root.tsx          # Root layout shell
│   │   ├── index.tsx           # Homepage
│   │   ├── about.tsx           # About section route
│   │   ├── members.tsx         # Members & Leads dossier route
│   │   ├── join.tsx            # Recruitment route
│   │   └── admin.tsx           # Protected Admin Access route
│   ├── routeTree.gen.ts        # Auto-generated TanStack router tree
│   ├── main.tsx                # Client app entrypoint
│   └── styles.css              # Global CSS & color tokens
├── .env.example                # Appwrite environment variable template
├── package.json                # Project scripts and dependencies
├── vite.config.ts              # Vite & TanStack plugin configuration
└── README.md                   # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js**: `v22.12.0` or higher
* **npm**: `v10.0.0` or higher

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/dscvitb/dsc-club-website.git
cd dsc-club-website
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to create your local `.env` file:
```bash
cp .env.example .env
```

Add your Appwrite credentials to `.env`:
```dotenv
VITE_APPWRITE_PROJECT_ID="6a931d3300098a4116bf"
VITE_APPWRITE_PROJECT_NAME="dscvitb"
VITE_APPWRITE_ENDPOINT="https://sgp.cloud.appwrite.io/v1"
APPWRITE_API_KEY="your_secret_appwrite_api_key_here"
```

### 3. Provision Appwrite Database Automatically
Run the setup script to automatically build the database, collection, and required schema attributes on Appwrite Cloud:
```bash
npm run setup:db
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Scripts Overview

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite development server with HMR |
| `npm run build` | Builds optimized production bundle |
| `npm run preview` | Previews production build locally |
| `npm run setup:db` | Provisions Appwrite database, recruitment collections, and attributes |
| `npm run lint` | Runs ESLint type checks and code quality rules |
| `npm run format` | Formats codebase using Prettier |

---

## 🌐 Deployment (Vercel)

This project is configured for seamless deployment on **Vercel**:

1. Push your repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set **Framework Preset** to **Vite** (or TanStack Start).
4. Under **Environment Variables**, add:
   * `VITE_APPWRITE_PROJECT_ID`
   * `VITE_APPWRITE_PROJECT_NAME`
   * `VITE_APPWRITE_ENDPOINT`
5. Click **Deploy**.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Crafted with ❤️ by the <strong>Data Science Club Web Team</strong> at VIT Bhopal University.
</p>
