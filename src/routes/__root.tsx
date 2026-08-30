import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PixelCursor } from "@/components/site/CustomCursor";

function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6 pixel-grid"
      style={{ background: "#070710" }}
    >
      <div className="text-center">
        <div
          style={{
            fontFamily: "Press Start 2P",
            fontSize: "clamp(48px, 10vw, 96px)",
            color: "#4466ff",
            textShadow: "6px 6px 0 #2233cc, 12px 12px 0 #111133",
            lineHeight: 1,
          }}
        >
          404
        </div>
        <div style={{ fontFamily: "Press Start 2P", fontSize: "12px", color: "#e8e8f0", marginTop: 20, marginBottom: 8 }}>
          DUNGEON NOT FOUND
        </div>
        <div style={{ fontFamily: "VT323", fontSize: "18px", color: "#5a5a7a", marginBottom: 24 }}>
          This quest location doesn't exist.
        </div>
        <Link to="/" className="btn-pixel" style={{ fontSize: "8px" }}>
          ▶ RETURN TO CAMP
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "#070710" }}
    >
      <div className="max-w-md w-full">
        <div
          style={{
            fontFamily: "Press Start 2P",
            fontSize: "9px",
            color: "#ff4444",
            marginBottom: 16,
            border: "3px solid #ff4444",
            padding: 16,
            background: "rgba(255,68,68,0.05)",
          }}
        >
          <div style={{ marginBottom: 8 }}>RUNTIME ERROR</div>
          <div style={{ fontFamily: "VT323", fontSize: "16px", color: "#5a5a7a" }}>
            {error?.message || "An unexpected error occurred."}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-pixel"
            style={{ fontSize: "8px" }}
          >
            TRY AGAIN
          </button>
          <a href="/" className="btn-pixel-outline" style={{ fontSize: "8px" }}>
            GO HOME
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DSC VITB — Data Science Club at VIT Bhopal" },
      {
        name: "description",
        content:
          "Official Data Science Club of VIT Bhopal — AI/ML, Cloud Data Pipelines, Open Source Research, and Hackathons.",
      },
      { name: "theme-color", content: "#2563eb" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning style={{ background: "#F5F9FF", color: "#0B1E36" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="relative min-h-screen overflow-hidden">
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}
