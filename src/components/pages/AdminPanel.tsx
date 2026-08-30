import React, { useState, useEffect } from "react";
import {
  databases,
  account,
  APPWRITE_DATABASE_ID,
  APPWRITE_RECRUITMENT_COLLECTION_ID,
  RecruitmentData,
  loginWithOAuth,
} from "@/lib/appwrite";
import { OAuthProvider } from "appwrite";
import "./AdminPanel.css";

// Super Admin Bypass Email
const SUPER_ADMIN_EMAIL = "neelpandeyofficial@gmail.com";

// Default domain filter for student admin access
const ALLOWED_DOMAIN = "@vitbhopal.ac.in";

export interface ApplicationRecord extends RecruitmentData {
  $id?: string;
  submittedAt?: string;
}

// Initial mock data if DB is newly initialized
const INITIAL_MOCK_APPLICATIONS: ApplicationRecord[] = [
  {
    $id: "app-1",
    fullName: "Aarav Sharma",
    registrationNumber: "24BAI10042",
    email: "aarav.24bai10042@vitbhopal.ac.in",
    phone: "9876543210",
    preferredTeam: "Software Dev Team",
    githubUrl: "https://github.com/aaravsharma",
    linkedinUrl: "https://linkedin.com/in/aaravsharma",
    whyJoin: "Passionate about full-stack development and open-source systems.",
    status: "shortlisted",
    submittedAt: "2026-08-29T14:30:00.000Z",
  },
  {
    $id: "app-2",
    fullName: "Priya Verma",
    registrationNumber: "24BCE10210",
    email: "priya.24bce10210@vitbhopal.ac.in",
    phone: "9123456789",
    preferredTeam: "HR Team",
    linkedinUrl: "https://linkedin.com/in/priyaverma",
    whyJoin: "Experienced in event management, public relations and student outreach.",
    status: "pending",
    submittedAt: "2026-08-29T16:15:00.000Z",
  },
  {
    $id: "app-3",
    fullName: "Rohan Gupta",
    registrationNumber: "24BET10088",
    email: "rohan.24bet10088@vitbhopal.ac.in",
    phone: "9988776655",
    preferredTeam: "Technical Team",
    githubUrl: "https://github.com/rohangupta",
    whyJoin: "Built machine learning pipelines and interested in AI research at DSC.",
    status: "accepted",
    submittedAt: "2026-08-29T18:00:00.000Z",
  },
];

export const AdminPanel: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [dbNotice, setDbNotice] = useState<string>("");

  // Manage custom authorized admin emails list
  const [authorizedAdmins, setAuthorizedAdmins] = useState<string[]>([SUPER_ADMIN_EMAIL]);
  const [newAdminEmail, setNewAdminEmail] = useState<string>("");
  const [showAdminManager, setShowAdminManager] = useState<boolean>(false);

  // Recruitment Toggle (On / Off)
  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState<boolean>(true);

  // Top Notification Headline Controls
  const [adminHeadline, setAdminHeadline] = useState<string>("🚀 Core Team Recruitment 2026 is LIVE! Submit your application now.");
  const [showHeadline, setShowHeadline] = useState<boolean>(false);
  const [showBannerControls, setShowBannerControls] = useState<boolean>(false);

  const [applications, setApplications] = useState<ApplicationRecord[]>(INITIAL_MOCK_APPLICATIONS);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [teamFilter, setTeamFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedAdmins = localStorage.getItem("dsc_authorized_admin_emails");
      if (storedAdmins) {
        const parsed = JSON.parse(storedAdmins);
        if (Array.isArray(parsed)) {
          setAuthorizedAdmins(Array.from(new Set([SUPER_ADMIN_EMAIL, ...parsed])));
        }
      }

      const storedRecruitmentStatus = localStorage.getItem("dsc_recruitment_open");
      if (storedRecruitmentStatus === "false") {
        setIsRecruitmentOpen(false);
      }

      const storedHeadline = localStorage.getItem("dsc_admin_headline");
      if (storedHeadline) setAdminHeadline(storedHeadline);

      const storedHeadlineEnabled = localStorage.getItem("dsc_admin_headline_enabled");
      if (storedHeadlineEnabled === "true") setShowHeadline(true);
    } catch (e) {
      console.warn("Failed loading stored admin settings:", e);
    }

    const checkActiveSession = async () => {
      try {
        const currentUser = await account.get();
        if (currentUser && currentUser.email) {
          handleValidateLogin(currentUser.email, true);
          return;
        }
      } catch {
        const savedEmail = localStorage.getItem("dsc_admin_email");
        if (savedEmail) {
          handleValidateLogin(savedEmail, true);
        }
      }
    };

    checkActiveSession();
  }, []);

  // Save Recruitment Toggle Status
  const toggleRecruitmentStatus = () => {
    const nextStatus = !isRecruitmentOpen;
    setIsRecruitmentOpen(nextStatus);
    localStorage.setItem("dsc_recruitment_open", String(nextStatus));
    window.dispatchEvent(new Event("dsc_recruitment_status_updated"));
  };

  // Save Top Banner Announcement Settings
  const handleSaveHeadline = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("dsc_admin_headline", adminHeadline);
    localStorage.setItem("dsc_admin_headline_enabled", String(showHeadline));
    window.dispatchEvent(new Event("dsc_headline_updated"));
    alert("Top Notification Headline updated successfully!");
  };

  // Save authorized admin emails list
  const saveAuthorizedAdmins = (newList: string[]) => {
    const uniqueList = Array.from(new Set([SUPER_ADMIN_EMAIL, ...newList.map((e) => e.trim().toLowerCase())]));
    setAuthorizedAdmins(uniqueList);
    localStorage.setItem("dsc_authorized_admin_emails", JSON.stringify(uniqueList));
  };

  const handleAddAdminEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail) return;
    const clean = newAdminEmail.trim().toLowerCase();
    if (authorizedAdmins.includes(clean)) {
      alert(`Email "${clean}" is already an authorized admin.`);
      return;
    }
    saveAuthorizedAdmins([...authorizedAdmins, clean]);
    setNewAdminEmail("");
  };

  const handleRemoveAdminEmail = (emailToRemove: string) => {
    if (emailToRemove.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
      alert("Super Admin email cannot be removed.");
      return;
    }
    saveAuthorizedAdmins(authorizedAdmins.filter((e) => e.toLowerCase() !== emailToRemove.toLowerCase()));
  };

  const handleValidateLogin = (emailInput: string, isAutoLogin = false) => {
    const cleanEmail = emailInput.trim().toLowerCase();

    // 1. Super Admin Access
    if (cleanEmail === SUPER_ADMIN_EMAIL.toLowerCase()) {
      setIsAuthenticated(true);
      setIsSuperAdmin(true);
      setUserEmail(cleanEmail);
      localStorage.setItem("dsc_admin_email", cleanEmail);
      localStorage.setItem("dsc_admin_authenticated", "true");
      setErrorMsg("");
      fetchLiveApplications();
      return;
    }

    // 2. Custom Authorized Admin Email List match
    if (authorizedAdmins.map((a) => a.toLowerCase()).includes(cleanEmail)) {
      setIsAuthenticated(true);
      setIsSuperAdmin(false);
      setUserEmail(cleanEmail);
      localStorage.setItem("dsc_admin_email", cleanEmail);
      localStorage.setItem("dsc_admin_authenticated", "true");
      setErrorMsg("");
      fetchLiveApplications();
      return;
    }

    // 3. Domain Filter check (@vitbhopal.ac.in)
    if (cleanEmail.endsWith(ALLOWED_DOMAIN)) {
      setIsAuthenticated(true);
      setIsSuperAdmin(false);
      setUserEmail(cleanEmail);
      localStorage.setItem("dsc_admin_email", cleanEmail);
      localStorage.setItem("dsc_admin_authenticated", "true");
      setErrorMsg("");
      fetchLiveApplications();
      return;
    }

    // 4. Access Denied
    if (!isAutoLogin) {
      setErrorMsg(
        `Access Denied: Email "${cleanEmail}" is not authorized. Only @vitbhopal.ac.in student emails or authorized admins can log in.`
      );
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) {
      setErrorMsg("Please enter your email address.");
      return;
    }
    handleValidateLogin(userEmail);
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setIsSuperAdmin(false);
    setUserEmail("");
    setPassword("");
    localStorage.removeItem("dsc_admin_email");
    localStorage.removeItem("dsc_admin_authenticated");
    try {
      await account.deleteSession("current");
    } catch {
      // Ignore if no active Appwrite OAuth session
    }
  };

  // Fetch live documents from Appwrite Database with safe error handling
  const fetchLiveApplications = async () => {
    setLoading(true);
    setDbNotice("");
    try {
      const response = await databases.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_RECRUITMENT_COLLECTION_ID
      );
      if (response && response.documents && response.documents.length > 0) {
        const fetchedDocs: ApplicationRecord[] = response.documents.map((doc: any) => ({
          $id: doc.$id,
          fullName: doc.fullName || "N/A",
          registrationNumber: doc.registrationNumber || "N/A",
          email: doc.email || "N/A",
          phone: doc.phone || "N/A",
          preferredTeam: doc.preferredTeam || "General",
          githubUrl: doc.githubUrl,
          linkedinUrl: doc.linkedinUrl,
          portfolioUrl: doc.portfolioUrl,
          whyJoin: doc.whyJoin || "",
          experience: doc.experience || "",
          status: doc.status || "pending",
          submittedAt: doc.submittedAt || doc.$createdAt,
        }));
        setApplications(fetchedDocs);
      } else {
        setDbNotice("Appwrite collection connected (0 live submissions currently).");
      }
    } catch (err: any) {
      console.warn("Appwrite live fetch notice:", err?.message || err);
      setDbNotice(
        "💡 Appwrite Notice: Displaying local dashboard applications. Run 'npm run setup:db' to sync live Appwrite database collection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: "pending" | "shortlisted" | "accepted" | "rejected") => {
    setApplications((prev) =>
      prev.map((app) => (app.$id === id ? { ...app, status: newStatus } : app))
    );

    try {
      await databases.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_RECRUITMENT_COLLECTION_ID,
        id,
        { status: newStatus }
      );
    } catch (err) {
      console.warn("Appwrite status sync fallback:", err);
    }
  };

  // Filtered Applications List
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTeam = teamFilter === "All" || app.preferredTeam === teamFilter;
    const matchesStatus = statusFilter === "All" || app.status === statusFilter.toLowerCase();

    return matchesSearch && matchesTeam && matchesStatus;
  });

  // Calculate Stats
  const totalCount = applications.length;
  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const shortlistedCount = applications.filter((a) => a.status === "shortlisted").length;
  const acceptedCount = applications.filter((a) => a.status === "accepted").length;

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <span className="dot-pulse" style={{ display: "inline-block", width: "10px", height: "10px", background: "#00d2ff", borderRadius: "50%" }} />
            <h2 className="admin-login-title">DSC VITB Admin Portal</h2>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "6px" }}>
              Sign in with your campus credentials to review recruitment applications.
            </p>
          </div>

          <div className="domain-notice-box">
            🔒 <strong>Strict Access Rule:</strong> Restricted to <code>@vitbhopal.ac.in</code> emails or authorized admins.
          </div>

          {errorMsg && <div className="error-alert-box">{errorMsg}</div>}

          <form onSubmit={handleLoginSubmit}>
            <div className="admin-form-group">
              <label className="admin-form-label">Email Address</label>
              <input
                type="email"
                className="admin-form-input"
                placeholder="name.regNo@vitbhopal.ac.in"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Password</label>
              <input
                type="password"
                className="admin-form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-admin-submit">
              Authenticate & Access Panel →
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", margin: "20px 0", gap: "10px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255, 255, 255, 0.1)" }} />
            <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255, 255, 255, 0.1)" }} />
          </div>

          <button
            type="button"
            className="btn-admin-submit"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              boxShadow: "none",
            }}
            onClick={() => loginWithOAuth(OAuthProvider.Google)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google OAuth
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">
            Recruitment Dashboard
            {isSuperAdmin ? (
              <span className="super-admin-badge">⚡ SUPER ADMIN</span>
            ) : (
              <span className="admin-badge">VERIFIED ADMIN</span>
            )}
          </h1>
          <p style={{ fontSize: "13.5px", color: "#94a3b8", marginTop: "4px" }}>
            Real-time management of member applications for Data Science Club VIT Bhopal.
          </p>
        </div>

        <div className="admin-user-info" style={{ flexWrap: "wrap", gap: "10px" }}>
          {/* Recruitment On / Off Toggle */}
          <button
            type="button"
            onClick={toggleRecruitmentStatus}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              border: "1px solid " + (isRecruitmentOpen ? "rgba(52, 211, 153, 0.5)" : "rgba(239, 68, 68, 0.5)"),
              background: isRecruitmentOpen ? "rgba(52, 211, 153, 0.15)" : "rgba(239, 68, 68, 0.15)",
              color: isRecruitmentOpen ? "#34d399" : "#f87171",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isRecruitmentOpen ? "#34d399" : "#f87171" }} />
            Recruitments: {isRecruitmentOpen ? "OPEN (Active)" : "CLOSED (Paused)"}
          </button>

          {/* Top Banner Control Toggle */}
          <button
            type="button"
            className="filter-select"
            style={{ padding: "8px 14px", fontSize: "13px", color: "#00d2ff", borderColor: "rgba(0, 210, 255, 0.4)" }}
            onClick={() => setShowBannerControls(!showBannerControls)}
          >
            📢 Website Banner Notice
          </button>

          {isSuperAdmin && (
            <button
              type="button"
              className="btn-action btn-shortlist"
              style={{ padding: "8px 14px", fontSize: "13px", fontWeight: "700" }}
              onClick={() => setShowAdminManager(!showAdminManager)}
            >
              👑 Manage Admins ({authorizedAdmins.length})
            </button>
          )}

          <span className="user-email-text">{userEmail}</span>
          <button type="button" className="btn-admin-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Top Banner Control Panel */}
      {showBannerControls && (
        <div style={{ background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(0, 210, 255, 0.4)", borderRadius: "18px", padding: "20px", marginBottom: "28px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#00d2ff", marginBottom: "6px" }}>
            📢 Admin Announcement Banner (Top of Website)
          </h3>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px" }}>
            Set a custom ticker headline notification visible across the top of all website pages.
          </p>

          <form onSubmit={handleSaveHeadline} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <input
              type="text"
              className="search-input-box"
              placeholder="e.g. 🚀 Core Team Recruitments 2026 are OPEN! Apply now."
              value={adminHeadline}
              onChange={(e) => setAdminHeadline(e.target.value)}
              required
            />

            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#ffffff", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={showHeadline}
                  onChange={(e) => setShowHeadline(e.target.checked)}
                  style={{ width: "16px", height: "16px", accentColor: "#00d2ff" }}
                />
                Show Announcement Banner on Website
              </label>

              <button type="submit" className="btn-admin-submit" style={{ width: "auto", padding: "8px 20px", marginTop: 0 }}>
                Save Banner Announcement
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Appwrite Status / Database Notice */}
      {dbNotice && (
        <div style={{ background: "rgba(0, 210, 255, 0.08)", border: "1px solid rgba(0, 210, 255, 0.25)", color: "#00d2ff", padding: "12px 18px", borderRadius: "12px", fontSize: "13px", marginBottom: "24px" }}>
          {dbNotice}
        </div>
      )}

      {/* Super Admin Manager Modal / Banner */}
      {isSuperAdmin && showAdminManager && (
        <div style={{ background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(0, 210, 255, 0.4)", borderRadius: "18px", padding: "20px", marginBottom: "32px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#00d2ff", marginBottom: "8px" }}>
            👑 Super Admin Power: Grant Admin Access via Email
          </h3>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px" }}>
            Add any email address to grant direct administrative access to this dashboard.
          </p>

          <form onSubmit={handleAddAdminEmail} style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
            <input
              type="email"
              className="search-input-box"
              placeholder="Enter email address (e.g. member@gmail.com)"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              style={{ flex: 1, minWidth: "260px" }}
              required
            />
            <button type="submit" className="btn-admin-submit" style={{ width: "auto", padding: "10px 20px", marginTop: 0 }}>
              + Grant Admin Access
            </button>
          </form>

          <div style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff", marginBottom: "10px" }}>
            Authorized Admin Emails:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {authorizedAdmins.map((email) => (
              <span
                key={email}
                style={{
                  background: email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() ? "rgba(245,158,11,0.2)" : "rgba(0,210,255,0.15)",
                  border: "1px solid " + (email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() ? "rgba(245,158,11,0.4)" : "rgba(0,210,255,0.3)"),
                  color: email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() ? "#f59e0b" : "#00d2ff",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12.5px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {email}
                {email.toLowerCase() !== SUPER_ADMIN_EMAIL.toLowerCase() && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAdminEmail(email)}
                    style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontWeight: "bold", fontSize: "14px", padding: 0 }}
                    title="Revoke Admin Access"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Applications</span>
          <div className="stat-value">{totalCount}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending Review</span>
          <div className="stat-value" style={{ color: "#f59e0b" }}>{pendingCount}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Shortlisted</span>
          <div className="stat-value" style={{ color: "#c084fc" }}>{shortlistedCount}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Accepted</span>
          <div className="stat-value" style={{ color: "#34d399" }}>{acceptedCount}</div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="admin-controls-bar">
        <input
          type="text"
          className="search-input-box"
          placeholder="🔍 Search applicant name, email, or reg number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <select
            className="filter-select"
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
          >
            <option value="All">All Domains / Teams</option>
            <option value="Software Dev Team">Software Dev Team</option>
            <option value="Technical Team">Technical Team</option>
            <option value="Event Management Team">Event Management Team</option>
            <option value="HR Team">HR Team</option>
            <option value="PR & Outreach Team">PR & Outreach Team</option>
            <option value="Content Team">Content Team</option>
            <option value="Social Media Team">Social Media Team</option>
            <option value="Design Team">Design Team</option>
            <option value="Photography Team">Photography Team</option>
          </select>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            type="button"
            className="filter-select"
            style={{ background: "rgba(0,210,255,0.15)", color: "#00d2ff" }}
            onClick={fetchLiveApplications}
          >
            🔄 Sync Appwrite
          </button>
        </div>
      </div>

      {/* Applications Data Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Contact</th>
              <th>Domain / Team</th>
              <th>Links & Details</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>
                  Fetching Appwrite registrations...
                </td>
              </tr>
            ) : filteredApps.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>
                  No recruitment applications match your current filters.
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr key={app.$id || app.email}>
                  <td>
                    <div className="applicant-name">{app.fullName}</div>
                    <div className="reg-number">{app.registrationNumber}</div>
                  </td>

                  <td>
                    <div>{app.email}</div>
                    <div style={{ fontSize: "12px", color: "#94a3b8" }}>{app.phone}</div>
                  </td>

                  <td>
                    <span className="team-chip">{app.preferredTeam}</span>
                  </td>

                  <td>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {app.githubUrl && (
                        <a
                          href={app.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "#00d2ff", fontSize: "12px" }}
                        >
                          GitHub ↗
                        </a>
                      )}
                      {app.linkedinUrl && (
                        <a
                          href={app.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "#00d2ff", fontSize: "12px" }}
                        >
                          LinkedIn ↗
                        </a>
                      )}
                    </div>
                    {app.whyJoin && (
                      <p style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "4px", maxWidth: "240px" }}>
                        "{app.whyJoin.slice(0, 70)}..."
                      </p>
                    )}
                  </td>

                  <td>
                    <span className={`status-badge ${app.status || "pending"}`}>
                      {app.status || "pending"}
                    </span>
                  </td>

                  <td>
                    <div className="action-btn-group">
                      <button
                        type="button"
                        className="btn-action btn-shortlist"
                        onClick={() => handleUpdateStatus(app.$id || "", "shortlisted")}
                      >
                        Shortlist
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-accept"
                        onClick={() => handleUpdateStatus(app.$id || "", "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-reject"
                        onClick={() => handleUpdateStatus(app.$id || "", "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
