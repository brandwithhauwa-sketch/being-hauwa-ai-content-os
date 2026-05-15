"use client";

import {
  ArrowUpDown,
  CalendarDays,
  Database,
  Feather,
  Filter,
  MoreHorizontal,
  Search,
  Tags,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { ContentTag, FunnelStage } from "@/lib/brand";

type ContentStatus = "Idea" | "Draft" | "Published" | "Repurpose";

type ContentRecord = {
  id: number;
  title: string;
  source: string;
  stage: FunnelStage;
  status: ContentStatus;
  tags: ContentTag[];
  platform: "TikTok" | "Instagram" | "LinkedIn" | "Blog";
  views: number;
  saves: number;
  comments: number;
  retention: number;
  updated: string;
};

const records: ContentRecord[] = [
  {
    id: 1,
    title: "The older I get the more I realize freedom is the real luxury.",
    source: "Brain dump",
    stage: "TOFU",
    status: "Published",
    tags: ["freedom", "identity", "lifestyle"],
    platform: "TikTok",
    views: 48200,
    saves: 1900,
    comments: 244,
    retention: 62,
    updated: "Today",
  },
  {
    id: 2,
    title: "How I would build a simple freelance system before quitting a job.",
    source: "Script generator",
    stage: "MOFU",
    status: "Draft",
    tags: ["freelancing", "systems", "money"],
    platform: "TikTok",
    views: 31800,
    saves: 2700,
    comments: 166,
    retention: 58,
    updated: "Yesterday",
  },
  {
    id: 3,
    title: "I accidentally built my business from my iPad.",
    source: "Audience comment",
    stage: "TOFU",
    status: "Repurpose",
    tags: ["money", "lifestyle", "ambition"],
    platform: "Instagram",
    views: 22600,
    saves: 1400,
    comments: 121,
    retention: 55,
    updated: "May 12",
  },
  {
    id: 4,
    title: "A soft productivity planner for women trying to rebuild their life online.",
    source: "Offer idea",
    stage: "BOFU",
    status: "Idea",
    tags: ["productivity", "systems", "ambition"],
    platform: "LinkedIn",
    views: 12600,
    saves: 980,
    comments: 73,
    retention: 49,
    updated: "May 10",
  },
];

const stages: Array<"All" | FunnelStage> = ["All", "TOFU", "MOFU", "BOFU"];
const statuses: Array<"All" | ContentStatus> = ["All", "Idea", "Draft", "Published", "Repurpose"];

export default function ContentDatabasePage() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<"All" | FunnelStage>("All");
  const [status, setStatus] = useState<"All" | ContentStatus>("All");

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return records.filter((record) => {
      const matchesQuery =
        !normalizedQuery ||
        record.title.toLowerCase().includes(normalizedQuery) ||
        record.tags.some((tag) => tag.includes(normalizedQuery)) ||
        record.source.toLowerCase().includes(normalizedQuery);
      const matchesStage = stage === "All" || record.stage === stage;
      const matchesStatus = status === "All" || record.status === status;

      return matchesQuery && matchesStage && matchesStatus;
    });
  }, [query, stage, status]);

  const totals = useMemo(
    () => ({
      ideas: records.length,
      published: records.filter((record) => record.status === "Published").length,
      repurpose: records.filter((record) => record.status === "Repurpose").length,
      saves: records.reduce((sum, record) => sum + record.saves, 0),
    }),
    [],
  );

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
              <h1 className="font-editorial text-3xl font-semibold tracking-normal">Content Database</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 min-w-[16rem] items-center gap-2 rounded-lg border border-rosewood/10 bg-white/90 px-3 text-sm text-cocoa shadow-sm">
              <Search size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search ideas, tags, sources"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-cocoa"
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </section>

      <section className="mx-auto space-y-5 px-5 py-6 xl:max-w-7xl">
        <div className="grid gap-4 md:grid-cols-4">
          <Metric label="Total records" value={totals.ideas.toString()} />
          <Metric label="Published" value={totals.published.toString()} />
          <Metric label="Repurpose queue" value={totals.repurpose.toString()} />
          <Metric label="Saved signals" value={formatNumber(totals.saves)} />
        </div>

        <section className="rounded-lg border border-white/70 bg-white/90 p-5 shadow-lift ring-1 ring-rosewood/5">
          <div className="flex flex-col gap-4 border-b border-rosewood/10 pb-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-base font-semibold">
                <Database size={18} className="text-rosewood" />
                All Content Records
              </h2>
              <p className="mt-1 text-sm text-cocoa">
                Store observations, scripts, repurposed posts, performance notes, and offer ideas.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterGroup value={stage} options={stages} onChange={setStage} />
              <FilterGroup value={status} options={statuses} onChange={setStatus} />
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-rosewood/10">
            <div className="hidden bg-paper text-xs font-semibold uppercase text-cocoa lg:grid lg:grid-cols-[1.7fr_0.7fr_0.7fr_0.8fr_1fr_0.8fr]">
              <HeaderCell label="Content" />
              <HeaderCell label="Stage" />
              <HeaderCell label="Status" />
              <HeaderCell label="Platform" />
              <HeaderCell label="Performance" />
              <HeaderCell label="Updated" />
            </div>

            <div className="divide-y divide-rosewood/10">
              {filteredRecords.map((record) => (
                <article
                  key={record.id}
                  className="grid gap-4 bg-white/90 p-4 transition hover:bg-paper lg:grid-cols-[1.7fr_0.7fr_0.7fr_0.8fr_1fr_0.8fr] lg:items-center"
                >
                  <div>
                    <p className="text-sm font-medium leading-6 text-ink">{record.title}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {record.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-1 text-xs capitalize text-cocoa"
                        >
                          <Tags size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-cocoa">{record.source}</p>
                  </div>
                  <Badge tone={record.stage === "BOFU" ? "clay" : record.stage === "MOFU" ? "sage" : "rose"}>
                    {record.stage}
                  </Badge>
                  <Badge tone={record.status === "Published" ? "sage" : "rose"}>{record.status}</Badge>
                  <p className="text-sm text-cocoa">{record.platform}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-cocoa">
                    <span>{formatNumber(record.views)} views</span>
                    <span>{formatNumber(record.saves)} saves</span>
                    <span>{formatNumber(record.comments)} comments</span>
                    <span>{record.retention}% hold</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-sm text-cocoa">
                      <CalendarDays size={15} />
                      {record.updated}
                    </span>
                    <button
                      aria-label="More options"
                      className="grid h-8 w-8 place-items-center rounded-md border border-rosewood/10 bg-white/70 text-cocoa transition hover:bg-mist hover:text-ink"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/70 bg-white/90 p-4 shadow-lift ring-1 ring-rosewood/5">
      <p className="text-sm text-cocoa">{label}</p>
      <p className="font-editorial mt-2 text-3xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function FilterGroup<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-rosewood/15 bg-paper p-1 shadow-sm">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`rounded-md px-3 py-2 text-sm transition ${
            value === option ? "bg-ink text-white" : "text-cocoa hover:bg-mist"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function HeaderCell({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      {label}
      <ArrowUpDown size={13} />
    </div>
  );
}

function Badge({ children, tone }: { children: string; tone: "rose" | "sage" | "clay" }) {
  const classes = {
    rose: "bg-blush text-rosewood",
    sage: "bg-sage/20 text-sage",
    clay: "bg-clay/20 text-clay",
  };

  return (
    <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${classes[tone]}`}>
      {children}
    </span>
  );
}

function formatNumber(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toString();
}
