# Data Science Club — VIT Bhopal (DSC VITB)

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
 [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
 [![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=react-router&logoColor=white)](https://tanstack.com/router)
 [![Appwrite Cloud](https://img.shields.io/badge/Appwrite_Cloud-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)
 [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
 [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
 [![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
 [![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://greensock.com/)
 
**The official, high-performance web platform for the Data Science Club at VIT Bhopal University.** Built to showcase club projects, host event registrations, highlight member dossiers, and streamline core team recruitment via **Appwrite Cloud**.

---

## ✨ Features

* **🎨 Cyberpunk & Glassmorphism Aesthetic**: Rich dark mode visuals, HSL glow effects, backdrop blur shaders, custom cursors, and responsive layouts.
* **🌀 Shader-Powered Hero Section**: Live dynamic GLSL Dither shader background visualising data science concepts (graphs, noise, neural node scatter plots).
* **👥 Member Roster & ChromaGrid**: Interactive grid featuring team cards with spotlight animations, domain color badges (Platinum, Gold, Silver, Neon Blue, Emerald), and strict core team filtering.
* **📱 Custom Mobile Glassmorphism Dropdown**: Animated glass dropdown menu replacing native selects on mobile. Live **Member Count Pills** per team. **Auto-Slideshow Mode**: Automatically cycles through departmental teams every 3.5 seconds until manually interacted with.
* **📝 Online Core Team Recruitment**: Seamless application form submitting candidate profiles directly to Appwrite Cloud.
* **🛡️ Admin Access Portal (`/admin`)**:
  * **Strict Campus Domain Filter**: Restricts standard admin logins to `@vitbhopal.ac.in` student email addresses.
  * **Super Admin Override**: `neelpandeyofficial@gmail.com` enjoys direct super administrative privileges.
  * **Email Access Manager 👑**: Super Admins can dynamically grant or revoke admin access for specific team lead email addresses.
  * **Real-time Applicant Dashboard**: View, filter (by domain/team/status), search, and update candidate statuses (*Pending*, *Shortlisted*, *Accepted*, *Rejected*).
* **⚙️ Automated Database Provisioning**: Automated CLI & script setup (`npm run setup:db`) to provision Appwrite database schemas and attributes in seconds.

---

## 🛠️ Tech Stack

<center>

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=white) ![v19](https://img.shields.io/badge/v19-000000?style=flat) |
| **Language** | ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![5.8](https://img.shields.io/badge/5.8-000000?style=flat) |
| **Routing** | ![TanStack Router](https://img.shields.io/badge/-TanStack_Router-FF4154?style=flat&logo=react-router&logoColor=white) ![1.170](https://img.shields.io/badge/1.170-000000?style=flat) |
| **Backend & Auth** | ![Appwrite Cloud](https://img.shields.io/badge/-Appwrite_Cloud-F02E65?style=flat&logo=appwrite&logoColor=white) ![Latest](https://img.shields.io/badge/Latest-000000?style=flat) |
| **3D & Shaders** | ![Three.js](https://img.shields.io/badge/-Three.js-000000?style=flat&logo=three.js&logoColor=white) ![r185](https://img.shields.io/badge/r185-000000?style=flat) |
| **Animations** | ![GSAP](https://img.shields.io/badge/-GSAP-88CE02?style=flat&logo=greensock&logoColor=white) ![Latest](https://img.shields.io/badge/Latest-000000?style=flat) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![v4](https://img.shields.io/badge/v4-000000?style=flat) |
| **Build Tool** | ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white) ![v8](https://img.shields.io/badge/v8-000000?style=flat) |

</center>

---

## 🔄 Workflow Diagram

```mermaid
flowchart TD
    subgraph Frontend["🎨 Frontend (React 19 + TanStack Router)"]
        User(("🌐 Visitor / Student"))
        Nav["🧭 Navigation & Hero<br/>Dither Shader"]
        Members["👥 Members Roster<br/>ChromaGrid + Dropdown"]
        Join["📝 Recruitment<br/>Application Form"]
        Admin["🛡️ Admin Portal<br/>/admin"]
    end
 
    subgraph Authentication["🔐 Appwrite Authentication Layer"]
        AuthCheck{{"🔑 Access Check<br/>Validation Logic"}}
        CampusDomain["📧 Campus Domain<br/>*@vitbhopal.ac.in"]
        SuperAdmin["👑 Super Admin<br/>neelpandey...@gmail.com"]
        CustomAdmins["📋 Custom Admin List<br/>Team Leads"]
        AppwriteAuth[("⚡ Appwrite<br/>Auth Service")]
    end
 
    subgraph Appwrite["☁️ Appwrite Cloud Platform"]
        AppwriteLogo["🔗 Appwrite Cloud<br/>https://appwrite.io"]
        APILayer["🌐 REST API Layer<br/>SDK Integration"]
    end
 
    subgraph Database["💾 Appwrite Cloud Database"]
        DBCore[("🗄️ dscvitb_db<br/>Main Database")]
        Collection[("📦 Recruitment<br/>Applications")]
        AdminAccess[("👨‍💼 Admin Access<br/>Control")]
        ApplicationAttributes[("📋 Schema<br/>Attributes")]
    end
 
    User --> Nav
    User --> Members
    User --> Join
    Join -->|Submit Application| Collection
    User -->|Click Footer Link| Admin
    Admin --> AuthCheck
    AuthCheck -->|Validates Email| AppwriteAuth
    AppwriteAuth -->|Checks Domain| CampusDomain
    AppwriteAuth -->|Bypass Check| SuperAdmin
    AppwriteAuth -->|Validate List| CustomAdmins
    CustomAdmins --> AdminAccess
    SuperAdmin -->|Grant/Revoke Access| AdminAccess
    Admin -->|Manage Registrations| DBCore
    AppwriteAuth -->|Authenticate| AppwriteLogo
    AppwriteLogo --> APILayer
    APILayer --> DBCore
    DBCore --> Collection
    DBCore --> AdminAccess
    Collection --> ApplicationAttributes
    AdminAccess --> ApplicationAttributes
 
     
    style User fill:#61DAFB,stroke:#fff,stroke-width:2px,color:#000
    style AuthCheck fill:#FFD700,stroke:#F02E65,stroke-width:2px,color:#000
    style AppwriteAuth fill:#F02E65,stroke:#fff,stroke-width:2px,color:#fff
    style AppwriteLogo fill:#F02E65,stroke:#fff,stroke-width:2px,color:#fff
    style APILayer fill:#00D4FF,stroke:#fff,stroke-width:2px,color:#000
    style DBCore fill:#06B6D4,stroke:#fff,stroke-width:2px,color:#000
    style Collection fill:#00E5CC,stroke:#fff,stroke-width:2px,color:#000
    style AdminAccess fill:#FF6B9D,stroke:#fff,stroke-width:2px,color:#fff
    style ApplicationAttributes fill:#88CE02,stroke:#fff,stroke-width:2px,color:#000
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

## 🚀 How to Run

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

## 👥 Contributors

The amazing team behind this project:

```
Generated with: https://contrib.rocks/image/gh/dscvitb/dsc-club-website
```

For a live contributors list, visit: [Contributors on GitHub](https://github.com/dscvitb/dsc-club-website/graphs/contributors)

> **Note**: If the contributor image doesn't load, visit the [Contributors Graph](https://github.com/dscvitb/dsc-club-website/graphs/contributors) on GitHub directly.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Crafted with ❤️ by the Data Science Club Web Team at VIT Bhopal University.
</p>
