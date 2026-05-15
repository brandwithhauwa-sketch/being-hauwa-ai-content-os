"use client";

import {
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  ChevronRight,
  Database as DatabaseIcon,
  Eye,
  Feather,
  FileText,
  Heart,
  LayoutDashboard,
  Layers3,
  Lightbulb,
  MessageCircle,
  Plus,
  RefreshCcw,
  Repeat2,
  Search,
  Sparkles,
  Tags,
  Upload,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  classifyFunnelStage,
  contentTags,
  type ContentTag,
  type FunnelStage,
  stageDescriptions,
  suggestTags,
} from "@/lib/brand";
import type { GenerationMode } from "@/lib/mock-ai";
import {
  explainPostPerformance,
  getFollowerConversionRate,
  getSaveRate,
  identifyPostRole,
  realTikTokPosts,
  suggestStrongerHooks,
  summarizeTikTokStrategy,
  weeklyTikTokAnalytics,
} from "@/lib/tiktok-analytics";

type Idea = {
  id: number;
  text: string;
  tags: ContentTag[];
  stage: FunnelStage;
  views: number;
  saves: number;
  comments: number;
  retention: number;
};

const starterIdeas: Idea[] = [
  {
    id: 1,
    text: "The older I get the more I realize freedom is the real luxury.",
    tags: ["freedom", "lifestyle", "identity"],
    stage: "TOFU",
    views: 48200,
    saves: 1900,
    comments: 244,
    retention: 62,
  },
  {
    id: 2,
    text: "How I would build a simple freelance system before quitting a job.",
    tags: ["freelancing", "systems", "money"],
    stage: "MOFU",
    views: 31800,
    saves: 2700,
    comments: 166,
    retention: 58,
  },
  {
    id: 3,
    text: "A soft productivity planner for women trying to rebuild their life online.",
    tags: ["productivity", "systems", "ambition"],
    stage: "BOFU",
    views: 12600,
    saves: 980,
    comments: 73,
    retention: 49,
  },
];

const modeLabels: Record<GenerationMode, string> = {
  script: "Script",
  hooks: "Hooks",
  repurpose: "Repurpose",
};

const navItems = [
  { label: "Content Brain", icon: LayoutDashboard, href: "/#content-brain" },
  { label: "Hook Library", icon: Tags, href: "/hooks/library" },
  { label: "Script Generator", icon: Sparkles, href: "/#script-generator" },
  { label: "Post Analyzer", icon: BarChart3, href: "/analyzer" },
  { label: "Analytics Tracker", icon: Eye, href: "/#analytics-tracker" },
  { label: "TOFU Sorter", icon: Layers3, href: "/classifier" },
  { label: "Repurposing Engine", icon: RefreshCcw, href: "/repurpose" },
  { label: "Sounds Like Hauwa?", icon: MessageCircle, href: "/tone-check" },
  { label: "Database", icon: DatabaseIcon, href: "/database" },
  { label: "Voice", icon: BookOpen, href: "/voice" },
  { label: "Training", icon: Upload, href: "/training" },
  { label: "Memory", icon: Brain, href: "/memory" },
  { label: "Audience", icon: MessageCircle, href: "/audience" },
  { label: "Calendar", icon: CalendarDays, href: "/" },
  { label: "Scripts", icon: FileText, href: "/" },
];

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>(starterIdeas);
  const [brainDump, setBrainDump] = useState("");
  const [generatorIdea, setGeneratorIdea] = useState(starterIdeas[0].text);
  const [mode, setMode] = useState<GenerationMode>("script");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTags, setSelectedTags] = useState<ContentTag[]>(["freedom"]);

  const groupedIdeas = useMemo(
    () =>
      ideas.reduce<Record<FunnelStage, Idea[]>>(
        (groups, idea) => {
          groups[idea.stage].push(idea);
          return groups;
        },
        { TOFU: [], MOFU: [], BOFU: [] },
      ),
    [ideas],
  );

  const totals = useMemo(
    () => ({
      views: ideas.reduce((sum, idea) => sum + idea.views, 0),
      saves: ideas.reduce((sum, idea) => sum + idea.saves, 0),
      comments: ideas.reduce((sum, idea) => sum + idea.comments, 0),
      avgRetention: Math.round(
        ideas.reduce((sum, idea) => sum + idea.retention, 0) / Math.max(ideas.length, 1),
      ),
    }),
    [ideas],
  );

  const patternSummary = useMemo(() => {
    const tagScores = new Map<ContentTag, number>();
    ideas.forEach((idea) => {
      idea.tags.forEach((tag) => {
        tagScores.set(tag, (tagScores.get(tag) || 0) + idea.views + idea.saves * 8);
      });
    });

    const strongestTag =
      Array.from(tagScores.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || "freedom";
    const bestIdea = [...ideas].sort((a, b) => b.retention - a.retention)[0];

    return {
      strongestTag,
      bestIdea,
      hookStyle: bestIdea?.text.includes("older")
        ? "quiet realization hooks"
        : "specific how-I-would hooks",
      savesRate: (
        (ideas.reduce((sum, idea) => sum + idea.saves / Math.max(idea.views, 1), 0) /
          ideas.length) *
        100
      ).toFixed(1),
    };
  }, [ideas]);
  const tiktokStrategy = useMemo(() => summarizeTikTokStrategy(realTikTokPosts), []);

  function addIdea() {
    const text = brainDump.trim();
    if (!text) return;

    const nextIdea: Idea = {
      id: Date.now(),
      text,
      tags: selectedTags.length ? selectedTags : suggestTags(text),
      stage: classifyFunnelStage(text),
      views: 0,
      saves: 0,
      comments: 0,
      retention: 0,
    };

    setIdeas((current) => [nextIdea, ...current]);
    setGeneratorIdea(text);
    setBrainDump("");
  }

  function toggleTag(tag: ContentTag) {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  }

  async function generate() {
    setIsGenerating(true);
    setOutput("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: generatorIdea, mode }),
      });
      const data = (await response.json()) as { output: string; source: string };
      setOutput(data.output);
    } catch {
      setOutput("The generator could not run. Check the dev server and try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <main className="min-h-screen bg-transparent text-ink">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-rosewood/10 bg-paper/90 px-4 py-5 shadow-lift lg:block">
          <div className="flex items-center gap-3 px-2">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white shadow-lift">
              <Feather size={18} />
            </div>
            <div>
              <p className="font-editorial text-base font-semibold">Being Hauwa</p>
              <p className="text-xs text-cocoa">Creator command center</p>
            </div>
          </div>

          <nav className="mt-8 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition ${
                  index === 0
                    ? "bg-rosewood text-white shadow-lift"
                    : "text-cocoa hover:bg-mist/80 hover:text-ink"
                }`}
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-lg border border-rosewood/10 bg-blush/55 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Lightbulb size={16} className="text-clay" />
              Brand note
            </p>
            <p className="mt-3 text-sm leading-6 text-cocoa">
              Document the becoming. Keep it honest, useful, and emotionally specific.
            </p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-rosewood/10 bg-paper/90 backdrop-blur">
            <div className="flex flex-col gap-4 px-5 py-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-medium uppercase text-rosewood">Friday content studio</p>
                <h1 className="font-editorial mt-1 text-3xl font-semibold tracking-normal md:text-4xl">
                  AI Content OS
                </h1>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex h-10 min-w-[16rem] items-center gap-2 rounded-lg border border-rosewood/10 bg-white/90 px-3 text-sm text-cocoa shadow-sm">
                  <Search size={16} />
                  Search ideas, hooks, comments
                </div>
                <button
                  onClick={generate}
                  disabled={isGenerating}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-medium text-white shadow-lift transition hover:bg-rosewood disabled:opacity-60"
                >
                  <Wand2 size={16} />
                  Generate
                </button>
                <ThemeToggle />
              </div>
            </div>
          </header>

          <div className="space-y-5 px-5 py-5">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Metric label="Total views" value={formatNumber(totals.views)} delta="+18%" accent="rose" />
              <Metric label="Saves" value={formatNumber(totals.saves)} delta="+27%" accent="peacock" />
              <Metric label="Comments" value={formatNumber(totals.comments)} delta="+9%" accent="honey" />
              <Metric label="Avg hold" value={`${totals.avgRetention}%`} delta="+6%" accent="sage" />
            </section>

            <section id="content-brain" className="grid gap-5 xl:grid-cols-[0.9fr_1.25fr_0.85fr]">
              <Panel
                icon={<Brain size={18} />}
                title="Brain Dump"
                action={
                  <button
                    onClick={addIdea}
                    className="inline-flex h-9 items-center gap-2 rounded-md bg-rosewood px-3 text-sm font-medium text-white shadow-sm transition hover:bg-ink"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                }
              >
                <textarea
                  value={brainDump}
                  onChange={(event) => setBrainDump(event.target.value)}
                  placeholder="Drop a thought, hook, voice note transcript, audience comment, or observation..."
                  className="min-h-40 w-full resize-none rounded-lg border border-rosewood/15 bg-paper p-4 text-sm leading-6 text-ink outline-none transition focus:border-rosewood/45"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {contentTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
                        selectedTags.includes(tag)
                          ? "border-rosewood bg-rosewood text-white"
                          : "border-rosewood/15 bg-white/80 text-cocoa hover:bg-mist"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Panel>

              <div id="script-generator">
                <Panel
                  icon={<Sparkles size={18} />}
                  title="Content Generator"
                  action={
                    <button
                      onClick={generate}
                      disabled={isGenerating}
                      className="inline-flex h-9 items-center gap-2 rounded-md bg-ink px-3 text-sm font-medium text-white shadow-sm transition hover:bg-rosewood disabled:opacity-60"
                    >
                      <RefreshCcw size={16} className={isGenerating ? "animate-spin" : ""} />
                      Run
                    </button>
                  }
                >
                  <textarea
                    value={generatorIdea}
                    onChange={(event) => setGeneratorIdea(event.target.value)}
                    className="min-h-24 w-full resize-none rounded-lg border border-rosewood/15 bg-paper p-4 text-sm leading-6 text-ink outline-none transition focus:border-rosewood/45"
                  />
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex rounded-lg border border-rosewood/15 bg-paper p-1 shadow-sm">
                      {(Object.keys(modeLabels) as GenerationMode[]).map((item) => (
                        <button
                          key={item}
                          onClick={() => setMode(item)}
                          className={`rounded-md px-3 py-2 text-sm transition ${
                            mode === item ? "bg-ink text-white" : "text-cocoa hover:bg-mist"
                          }`}
                        >
                          {modeLabels[item]}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-cocoa">
                      Stage: <span className="font-semibold text-rosewood">{classifyFunnelStage(generatorIdea)}</span>
                    </p>
                  </div>
                  <pre className="mt-4 min-h-72 whitespace-pre-wrap rounded-lg border border-rosewood/10 bg-paper p-4 text-sm leading-6 text-ink shadow-inner">
                    {output || "Generated content will appear here."}
                  </pre>
                </Panel>
              </div>

              <Panel icon={<BarChart3 size={18} />} title="Pattern Read">
                <div className="space-y-3">
                  <Insight label="Strongest theme" value={patternSummary.strongestTag} />
                  <Insight label="Best hook style" value={patternSummary.hookStyle} />
                  <Insight label="Save pull" value={`${patternSummary.savesRate}%`} />
                </div>
                <div className="mt-4 rounded-lg border border-rosewood/10 bg-blush/60 p-4">
                  <p className="text-xs font-semibold uppercase text-rosewood">Signal</p>
                  <p className="mt-2 text-sm leading-6 text-cocoa">
                    {patternSummary.bestIdea?.text}
                  </p>
                </div>
              </Panel>
            </section>

            <div id="analytics-tracker">
              <Panel
                icon={<BarChart3 size={18} />}
                title="Analytics Tracker"
                action={<span className="text-sm text-cocoa">Real 7-day data</span>}
              >
              <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-lg border border-rosewood/10 bg-blush/55 p-5">
                  <p className="text-xs font-semibold uppercase text-rosewood">Performance read</p>
                  <h3 className="font-editorial mt-3 text-3xl font-semibold text-ink">
                    Big-sister freelancer truth is your authority lane.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-cocoa">
                    The data says pain-based, practical, anxiety-relieving freelancer content is
                    your strongest authority signal, while vulnerable story-led carousels are your
                    best follower converters.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <AnalyticsStat icon={<Eye size={15} />} label="7-day views" value={formatNumber(weeklyTikTokAnalytics.postViews)} />
                    <AnalyticsStat icon={<Heart size={15} />} label="Likes" value={formatNumber(weeklyTikTokAnalytics.likes)} />
                    <AnalyticsStat icon={<MessageCircle size={15} />} label="Comments" value={weeklyTikTokAnalytics.comments.toString()} />
                    <AnalyticsStat icon={<Repeat2 size={15} />} label="Shares" value={weeklyTikTokAnalytics.shares.toString()} />
                  </div>
                  <div className="mt-5 rounded-lg border border-rosewood/10 bg-paper p-4">
                    <p className="text-xs font-semibold uppercase text-rosewood">Traffic source</p>
                    <div className="mt-3 space-y-2">
                      <TrafficBar label="For You" value={weeklyTikTokAnalytics.trafficSource.forYou} />
                      <TrafficBar label="Search" value={weeklyTikTokAnalytics.trafficSource.search} />
                      <TrafficBar label="Profile" value={weeklyTikTokAnalytics.trafficSource.profile} />
                      <TrafficBar label="Following" value={weeklyTikTokAnalytics.trafficSource.following} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {realTikTokPosts.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-lg border border-rosewood/10 bg-paper p-4 transition hover:-translate-y-0.5 hover:border-rosewood/25 hover:shadow-lift"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-ink">{item.title}</p>
                          <p className="mt-1 text-xs text-rosewood">{item.category} - {item.format}</p>
                        </div>
                        <div className="grid grid-cols-4 gap-3 text-right text-xs text-cocoa">
                          <span>{formatNumber(item.views)} views</span>
                          <span>{getSaveRate(item).toFixed(1)}% saves</span>
                          <span>{formatNumber(item.saves)} saves</span>
                          <span>{item.newFollowers} follows</span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-rosewood px-2 py-1 text-xs text-white">
                          {identifyPostRole(item)}
                        </span>
                        <span className="rounded-full bg-blush px-2 py-1 text-xs text-rosewood">
                          {item.funnelStage}
                        </span>
                        <span className="rounded-full bg-mist px-2 py-1 text-xs text-cocoa">
                          {getFollowerConversionRate(item).toFixed(2)}% follower conversion
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-cocoa">{explainPostPerformance(item)}</p>
                      <details className="mt-3 rounded-lg border border-rosewood/10 bg-white/70 p-3 text-sm text-cocoa">
                        <summary className="cursor-pointer text-rosewood">Stronger hook options</summary>
                        <div className="mt-3 space-y-2">
                          {suggestStrongerHooks(item).map((hook) => (
                            <p key={hook} className="rounded-md bg-paper p-2 leading-6">
                              {hook}
                            </p>
                          ))}
                        </div>
                      </details>
                    </article>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid gap-3 lg:grid-cols-2">
                {tiktokStrategy.doubleDown.map((item) => (
                  <div key={item} className="rounded-lg border border-rosewood/10 bg-paper p-4 text-sm leading-6 text-cocoa">
                    {item}
                  </div>
                ))}
              </div>
              </Panel>
            </div>

            <section className="grid gap-5 xl:grid-cols-3">
              {(["TOFU", "MOFU", "BOFU"] as FunnelStage[]).map((stage) => (
                <Panel
                  key={stage}
                  icon={<Layers3 size={18} />}
                  title={stage}
                  action={<span className="text-sm text-cocoa">{groupedIdeas[stage].length}</span>}
                >
                  <p className="mb-4 text-sm leading-6 text-cocoa">{stageDescriptions[stage]}</p>
                  <div className="space-y-3">
                    {groupedIdeas[stage].map((idea) => (
                      <IdeaCard key={idea.id} idea={idea} />
                    ))}
                  </div>
                </Panel>
              ))}
            </section>
          </div>
        </section>
      </div>
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

function Metric({
  label,
  value,
  delta,
  accent,
}: {
  label: string;
  value: string;
  delta: string;
  accent: "rose" | "peacock" | "honey" | "sage";
}) {
  const accents = {
    rose: "bg-rosewood",
    peacock: "bg-peacock",
    honey: "bg-honey",
    sage: "bg-sage",
  };

  return (
    <div className="rounded-lg border border-white/70 bg-white/90 p-4 shadow-lift ring-1 ring-rosewood/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-cocoa">{label}</p>
          <p className="font-editorial mt-2 text-3xl font-semibold text-ink">{value}</p>
        </div>
        <span className="rounded-full bg-sage/20 px-2 py-1 text-xs font-medium text-sage">
          {delta}
        </span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-mist">
        <div className={`h-full w-2/3 rounded-full ${accents[accent]}`} />
      </div>
    </div>
  );
}

function Insight({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-rosewood/10 bg-paper p-3">
      <p className="text-xs text-cocoa">{label}</p>
      <p className="mt-2 text-sm font-semibold capitalize leading-5 text-ink">{value}</p>
    </div>
  );
}

function AnalyticsStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-rosewood/10 bg-paper p-3">
      <div className="flex items-center gap-2 text-rosewood">{icon}</div>
      <p className="mt-2 text-xs text-cocoa">{label}</p>
      <p className="font-editorial mt-1 text-xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function TrafficBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs text-cocoa">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full bg-rosewood" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <article className="rounded-lg border border-rosewood/10 bg-paper p-4 transition hover:-translate-y-0.5 hover:border-rosewood/25 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm leading-6 text-ink">{idea.text}</p>
        <ChevronRight size={16} className="mt-1 shrink-0 text-cocoa" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {idea.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-1 text-xs capitalize text-cocoa"
          >
            <Tags size={12} />
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-cocoa sm:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4">
        <span>{formatNumber(idea.views)} views</span>
        <span>{formatNumber(idea.saves)} saves</span>
        <span>{formatNumber(idea.comments)} comments</span>
        <span>{idea.retention}% hold</span>
      </div>
    </article>
  );
}

function formatNumber(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toString();
}
