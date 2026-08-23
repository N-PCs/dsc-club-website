import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/site/Ambient";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join Us — DSC Club VITB" },
      {
        name: "description",
        content:
          "Apply for membership at DSC Club VITB. Pick your domain — AI/ML, Web Dev, UI/UX, Management or Technical Writing.",
      },
      { property: "og:title", content: "Join Us — DSC Club VITB" },
      { property: "og:description", content: "Membership applications for the Data Science Club of VIT Bhopal." },
    ],
  }),
  component: Join,
});

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_12px_oklch(1_0_0_/_25%)]";

function Join() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="px-4 pt-36 pb-10">
      <PageHeader
        eyebrow="Membership"
        title="Join DSC Club VITB"
        subtitle="Applications are open for the 2026 cohort. Tell us where you want to build."
      />

      <div className="glass mx-auto mt-12 max-w-2xl rounded-3xl p-8">
        {sent ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="mx-auto size-12 text-silver" />
            <h2 className="mt-5 text-2xl font-semibold">Application received</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll reach out on your VITB email with next steps.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Full Name
                <input required placeholder="Aarav Mehta" className={fieldClass} />
              </label>
              <label className="block text-sm font-medium">
                VITB Registration Number
                <input required placeholder="24BCE10123" className={fieldClass} />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Branch / Year
                <input required placeholder="CSE (AI & ML), 2nd Year" className={fieldClass} />
              </label>
              <label className="block text-sm font-medium">
                Email ID
                <input
                  required
                  type="email"
                  pattern=".+@vitbhopal\.ac\.in"
                  placeholder="name@vitbhopal.ac.in"
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="block text-sm font-medium">
              Domain of Interest
              <select required defaultValue="" className={fieldClass}>
                <option value="" disabled>
                  Select a domain
                </option>
                {["AI/ML", "Web Dev", "UI/UX", "Management", "Technical Writing"].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium">
              GitHub / Portfolio Link
              <input type="url" placeholder="https://github.com/username" className={fieldClass} />
            </label>

            <button type="submit" className="btn-neon w-full rounded-xl px-6 py-3.5 font-semibold">
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
