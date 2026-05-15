"use client";

import {
  AlertCircle,
  Eye,
  Feather,
  Heart,
  MessageCircle,
  Search,
  Sparkles,
  Tags,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  audienceComments,
  summarizeAudiencePatterns,
  type AudiencePatternType,
} from "@/lib/audience-patterns";

const patternTypes: Array<"All" | AudiencePatternType> = ["All", "Desire", "Fear", "Identity"];

export default function AudienceDashboardPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"All" | AudiencePatternType>("All");

  const summary = useMemo(() => summarizeAudiencePatterns(audienceComments), []);
  const filteredComments = useMemo(() => {
    const normalized = query.toLowerCase().trim();

    return audienceComments.filter((item) => {
      const matchesType = type === "All" || item.type === type;
      const matchesQuery =
        !normalized ||
        item.comment.toLowerCase().includes(normalized) ||
        item.pattern.toLowerCase().includes(normalized) ||
        item.tags.some((tag) => tag.includes(normalized));

      return matchesType && matchesQuery;
    });
  }, [query, type]);

  return (
    <main className="min-h-screen bg-transparent text-ink">
      <section className="border-b border-rosewood/10 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-white shadow-lift">
              <Feather size={18} />
            </div>
            <div>
              <p className="text-sm font-medium uppercase text-rosewood">Being Hauwa</p>
              <h1 className="font-editorial text-3xl font-semibold tracking-normal">
                Audience Patterns
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 min-w-[16rem] items-center gap-2 rounded-lg border border-rosewood/10 bg-white/90 px-3 text-sm text-cocoa shadow-sm">
              <Search size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search comments or patterns"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-cocoa"
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </section>

      <section className="mx-auto space-y-5 px-5 py-6 xl:max-w-7xl">
        <section className="grid gap-4 md:grid-cols-4">
          <Metric icon={<MessageCircle size={16} />} label="Audience signals" value={summary.totalSignals.toString()} />
          <Metric icon={<Heart size={16} />} label="Desires" value={summary.byType.Desire.toString()} />
          <Metric icon={<AlertCircle size={16} />} label="Fears" value={summary.byType.Fear.toString()} />
          <Metric icon={<UserRound size={16} />} label="Identity" value={summary.byType.Identity.toString()} />
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <Panel icon={<Eye size={18} />} title="Audience Read">
              <p className="font-editorial text-3xl font-semibold leading-tight text-ink">
                Your audience wants freedom without losing themselves.
              </p>
              <p className="mt-3 text-sm leading-6 text-cocoa">
                The strongest repeated signals are about wanting online income, softness,
                clarity, and consistency without becoming harsh, performative, or burnt out.
              </p>
              <div className="mt-5 space-y-3">
                <PatternCallout label="Top desire" value={summary.topDesire.pattern} />
                <PatternCallout label="Top fear" value={summary.topFear.pattern} />
                <PatternCallout label="Top identity" value={summary.topIdentity.pattern} />
              </div>
            </Panel>

            <Panel icon={<Sparkles size={18} />} title="Content Opportunities">
              <div className="space-y-3">
                <Opportunity text="Create a series around making money online without performing confidence." />
                <Opportunity text="Turn consistency burnout into systems content with a softer emotional frame." />
                <Opportunity text="Build identity-led TOFU posts around soft life, ambition, and freedom over status." />
              </div>
            </Panel>
          </div>

          <Panel
            icon={<MessageCircle size={18} />}
            title="Comment Pattern Database"
            action={
              <div className="flex flex-wrap gap-2">
                {patternTypes.map((item) => (
                  <button
                    key={item}
                    onClick={() => setType(item)}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      type === item
                        ? "border-rosewood bg-rosewood text-white"
                        : "border-rosewood/15 bg-white/80 text-cocoa hover:bg-mist"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            }
          >
            <div className="space-y-3">
              {filteredComments.map((item) => (
                <article
                  key={item.id}
                  className="rounded-lg border border-rosewood/10 bg-paper p-4 transition hover:-translate-y-0.5 hover:border-rosewood/25 hover:shadow-lift"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm leading-6 text-ink">{item.comment}</p>
                      <p className="mt-2 text-xs capitalize text-rosewood">{item.pattern}</p>
                    </div>
                    <span className="w-fit rounded-full bg-blush px-2.5 py-1 text-xs font-medium text-rosewood">
                      {item.frequency}x
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1.3fr] md:items-center">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-rosewood px-2 py-1 text-xs text-white">
                        {item.type}
                      </span>
                      <span className="rounded-full bg-mist px-2 py-1 text-xs capitalize text-cocoa">
                        {item.sentiment}
                      </span>
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-1 text-xs capitalize text-cocoa"
                        >
                          <Tags size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm leading-6 text-cocoa">{item.contentAngle}</p>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        </section>
      </section>
    </main>
  );
}

function Panel({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-white/70 bg-white/90 p-5 shadow-lift ring-1 ring-rosewood/5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
          <span className="text-rosewood">{icon}</span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/70 bg-white/90 p-4 shadow-lift ring-1 ring-rosewood/5">
      <span className="text-rosewood">{icon}</span>
      <p className="mt-2 text-xs text-cocoa">{label}</p>
      <p className="font-editorial mt-1 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function PatternCallout({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-rosewood/10 bg-paper p-3">
      <p className="text-xs font-semibold uppercase text-rosewood">{label}</p>
      <p className="mt-1 text-sm capitalize text-cocoa">{value}</p>
    </div>
  );
}

function Opportunity({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-rosewood/10 bg-paper p-4 text-sm leading-6 text-cocoa">
      {text}
    </div>
  );
}
