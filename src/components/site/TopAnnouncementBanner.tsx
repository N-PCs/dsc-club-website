import React, { useState, useEffect } from "react";

export const TopAnnouncementBanner: React.FC = () => {
  const [headline, setHeadline] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  const syncBanner = () => {
    try {
      const storedHeadline = localStorage.getItem("dsc_admin_headline");
      const storedEnabled = localStorage.getItem("dsc_admin_headline_enabled");
      if (storedHeadline && storedEnabled === "true") {
        setHeadline(storedHeadline);
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    } catch {
      setEnabled(false);
    }
  };

  useEffect(() => {
    syncBanner();

    const handleStorageChange = () => {
      syncBanner();
    };

    window.addEventListener("dsc_headline_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("dsc_headline_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!enabled || !headline || dismissed) {
    return null;
  }

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
        background: "linear-gradient(90deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
        borderBottom: "1px solid rgba(0, 210, 255, 0.3)",
        boxShadow: "0 4px 20px rgba(0, 210, 255, 0.15)",
        color: "#ffffff",
        fontSize: "13px",
        fontWeight: 600,
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        textAlign: "center",
        backdropFilter: "blur(12px)",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "#00d2ff",
          letterSpacing: "0.02em",
        }}
      >
        <span style={{ animation: "pulse 2s infinite" }}>⚡</span>
        {headline}
      </span>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        style={{
          background: "none",
          border: "none",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          padding: "0 6px",
          lineHeight: 1,
          transition: "color 0.2s ease",
        }}
        title="Dismiss announcement"
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")}
      >
        ×
      </button>
    </div>
  );
};

export default TopAnnouncementBanner;
