import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";

import appCss from "../styles.css?url";
import TopAnnouncementBanner from "@/components/site/TopAnnouncementBanner";

function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "#F5F9FF", color: "#0B1E36" }}
    >
      <div className="text-center space-y-4 font-mono">
        <div className="text-6xl font-extrabold text-[#0B3D91]">404</div>
        <div className="text-lg font-bold text-slate-800">PAGE NOT FOUND</div>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          The requested route could not be found.
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-full bg-[#0B3D91] text-white text-xs font-bold shadow-md hover:bg-[#0B3D91]/90"
        >
          ← Return to Chapter 01
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
      className="flex min-h-screen items-center justify-center px-6 font-mono"
      style={{ background: "#F5F9FF" }}
    >
      <div className="max-w-md w-full p-6 bg-white rounded-2xl border border-red-200 shadow-xl space-y-4">
        <div className="text-xs font-bold text-red-600 uppercase">RUNTIME ERROR</div>
        <p className="text-xs text-slate-700 font-sans">
          {error?.message || "An unexpected error occurred."}
        </p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold"
          >
            TRY AGAIN
          </button>
          <a
            href="/"
            className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200"
          >
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
      { title: "Data Science Club — VIT Bhopal" },
      {
        name: "description",
        content:
          "Official Data Science Club of VIT Bhopal — AI/ML, Cloud Data Pipelines, Open Source Research, and Hackathons.",
      },
      { name: "theme-color", content: "#0B3D91" },
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
    <RootShell>
      <QueryClientProvider client={queryClient}>
        <TopAnnouncementBanner />
        <main className="relative min-h-screen">
          <Outlet />
        </main>
      </QueryClientProvider>
    </RootShell>
  );
}
