"use client";

import {
  Copy,
  Feather,
  Filter,
  Library,
  Search,
  Sparkles,
  Tags,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { FunnelStage } from "@/lib/brand";
import { emotionalPatterns, type EmotionalPattern } from "@/lib/content-memory";
import { hookLibrary, type HookLibraryItem } from "@/lib/hook-library";

const stages: Array<"All" | FunnelStage> = ["All", "TOFU", "MOFU", "BOFU"];
const triggers: Array<"All" | EmotionalPattern> = [
  "All",
  "freedom longing",
  "clarity relief",
  "reinvention tension",
  "soft ambition",
  "survival fatigue",
  "creative self-trust",
];

export default function HookLibraryPage() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<"All" | FunnelStage>("All");
  const [trigger, setTrigger] = useState<"All" | EmotionalPattern>("All");

  const filteredHooks = useMemo(() => {
    const normalized = query.toLowerCase().trim();

    return hookLibrary.filter((item) => {
      const matchesQuery =
        !normalized ||
        item.hook.toLowerCase().includes(normalized) ||
        item.useCase.toLowerCase().includes(normalized) ||
        item.style.includes(normalized);
      const matchesStage = stage === "All" || item.stage === stage;
      const matchesTrigger = trigger === "All" || item.trigger === trigger;

      return matchesQuery && matchesStage && matchesTrigger;
    });
  }, [query, stage, trigger]);

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
                Hook Library
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 min-w-[16rem] items-center gap-2 rounded-lg border border-rosewood/10 bg-white/90 px-3 text-sm text-cocoa shadow-sm">
              <Search size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search hooks"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-cocoa"
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <Panel icon={<Filter size={18} />} title="Filters">
            <FilterGroup label="Funnel Stage" value={stage} options={stages} onChange={setStage} />
            <div className="mt-4">
              <FilterGroup
                label="Emotional Trigger"
                value={trigger}
                options={triggers}
                onChange={setTrigger}
              />
            </div>
          </Panel>

          <Panel icon={<Sparkles size={18} />} title="Trigger Map">
            <div className="space-y-3">
              {Object.entries(emotionalPatterns).map(([emotion, keywords]) => (
                <div key={emotion} className="rounded-lg border border-rosewood/10 bg-paper p-4">
                  <p className="font-editorial text-lg font-semibold capitalize text-ink">{emotion}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keywords.slice(0, 5).map((keyword) => (
                      <span key={keyword} className="rounded-full bg-blush px-2 py-1 text-xs text-rosewood">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel
          icon={<Library size={18} />}
          title="Swipeable Hooks"
          action={<span className="text-sm text-cocoa">{filteredHooks.length} hooks</span>}
        >
          <div className="grid gap-3">
            {filteredHooks.map((item) => (
              <HookCard key={item.id} item={item} />
            ))}
          </div>
        </Panel>
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

function FilterGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase text-rosewood">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
              value === option
                ? "border-rosewood bg-rosewood text-white"
                : "border-rosewood/15 bg-white/80 text-cocoa hover:bg-mist"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function HookCard({ item }: { item: HookLibraryItem }) {
  return (
    <article className="rounded-lg border border-rosewood/10 bg-paper p-4 transition hover:-translate-y-0.5 hover:border-rosewood/25 hover:shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <p className="font-editorial text-xl leading-8 text-ink">{item.hook}</p>
        <button
          aria-label="Copy hook"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-rosewood/10 bg-white/75 text-cocoa transition hover:bg-mist hover:text-ink"
        >
          <Copy size={15} />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-rosewood px-2 py-1 text-xs text-white">{item.stage}</span>
        <span className="rounded-full bg-blush px-2 py-1 text-xs capitalize text-rosewood">
          {item.trigger}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-1 text-xs capitalize text-cocoa">
          <Tags size={12} />
          {item.style}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-cocoa">{item.useCase}</p>
    </article>
  );
}
