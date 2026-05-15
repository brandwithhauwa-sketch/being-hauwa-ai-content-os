"use client";

import {
  ArrowUpRight,
  Copy,
  Feather,
  Flame,
  Lightbulb,
  RefreshCcw,
  Search,
  Sparkles,
  Tags,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { classifyFunnelStage, contentTags, suggestTags, type ContentTag } from "@/lib/brand";

const starterIdea =
  "The older I get the more I realize freedom is the real luxury.";

const savedHooks = [
  {
    hook: "I think people underestimate how life changing clarity is.",
    score: 92,
    tag: "identity",
    angle: "quiet realization",
  },
  {
    hook: "Nobody tells you how emotional it is to want a softer life and more money.",
    score: 88,
    tag: "freedom",
    angle: "emotional tension",
  },
  {
    hook: "How I would rebuild my life online if I was starting from zero.",
    score: 84,
    tag: "money",
    angle: "specific scenario",
  },
];

export default function HookGenerationPage() {
  const [idea, setIdea] = useState(starterIdea);
  const [hooks, setHooks] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const stage = classifyFunnelStage(idea);
  const suggestedTags = useMemo(() => suggestTags(idea), [idea]);
  const activeTags = suggestedTags.length ? suggestedTags : (["freedom", "identity"] as ContentTag[]);

  async function generateHooks() {
    setIsGenerating(true);
    setHooks([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, mode: "hooks" }),
      });
      const data = (await response.json()) as { output: string };
      setHooks(
        data.output
          .split("\n")
          .map((line) => line.replace(/^[-\d.)\s]+/, "").trim())
          .filter(Boolean),
      );
    } catch {
      setHooks(["The hook generator could not run. Check the dev server and try again."]);
    } finally {
      setIsGenerating(false);
    }
  }

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
              <h1 className="font-editorial text-3xl font-semibold tracking-normal">Hook Generator</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 min-w-[16rem] items-center gap-2 rounded-lg border border-rosewood/10 bg-white/90 px-3 text-sm text-cocoa shadow-sm">
              <Search size={16} />
              Search hooks and angles
            </div>
            <ThemeToggle />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <Panel
            icon={<Sparkles size={18} />}
            title="Generate Hook Variations"
            action={
              <button
                onClick={generateHooks}
                disabled={isGenerating}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-ink px-3 text-sm font-medium text-white shadow-sm transition hover:bg-rosewood disabled:opacity-60"
              >
                <RefreshCcw size={16} className={isGenerating ? "animate-spin" : ""} />
                Generate
              </button>
            }
          >
            <textarea
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              className="min-h-36 w-full resize-none rounded-lg border border-rosewood/15 bg-paper p-4 text-sm leading-6 text-ink outline-none transition focus:border-rosewood/45"
              placeholder="Paste a rough observation, content idea, comment, or voice note..."
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <MiniStat label="Funnel" value={stage} />
              <MiniStat label="Best angle" value="realization" />
              <MiniStat label="Format" value="TikTok open" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {contentTags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-3 py-1 text-xs capitalize ${
                    activeTags.includes(tag)
                      ? "border-rosewood bg-rosewood text-white"
                      : "border-rosewood/15 bg-white/80 text-cocoa"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Panel>

          <Panel icon={<Flame size={18} />} title="Generated Hooks">
            <div className="space-y-3">
              {(hooks.length ? hooks : ["Generated hooks will appear here."]).map((hook, index) => (
                <article
                  key={`${hook}-${index}`}
                  className="rounded-lg border border-rosewood/10 bg-paper p-4 transition hover:-translate-y-0.5 hover:border-rosewood/25 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm leading-6 text-ink">{hook}</p>
                    <button
                      aria-label="Copy hook"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-rosewood/10 bg-white/75 text-cocoa transition hover:bg-mist hover:text-ink"
                    >
                      <Copy size={15} />
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-cocoa">
                    <span className="rounded-full bg-blush px-2 py-1">emotional</span>
                    <span className="rounded-full bg-mist px-2 py-1">conversational</span>
                    <span className="rounded-full bg-mist px-2 py-1">{stage}</span>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel icon={<Lightbulb size={18} />} title="Hook Strategy">
            <div className="space-y-3">
              <StrategyItem
                title="Lead with a realization"
                body="Use the feeling before the lesson. Hauwa's strongest hooks should sound like a thought she finally admitted out loud."
              />
              <StrategyItem
                title="Make ambition feel personal"
                body="Tie freedom, income, and clarity back to identity instead of making the content sound like a tutorial."
              />
              <StrategyItem
                title="Keep it internet-native"
                body="Short, specific, slightly vulnerable, and easy to imagine as text on screen."
              />
            </div>
          </Panel>

          <Panel icon={<ArrowUpRight size={18} />} title="Saved Winners">
            <div className="space-y-3">
              {savedHooks.map((item) => (
                <article key={item.hook} className="rounded-lg border border-rosewood/10 bg-paper p-4 transition hover:-translate-y-0.5 hover:border-rosewood/25 hover:shadow-lift">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm leading-6 text-ink">{item.hook}</p>
                    <span className="rounded-full bg-sage/20 px-2 py-1 text-xs font-medium text-sage">
                      {item.score}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-1 text-xs capitalize text-cocoa">
                      <Tags size={12} />
                      {item.tag}
                    </span>
                    <span className="rounded-full bg-blush px-2 py-1 text-xs text-rosewood">
                      {item.angle}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        </div>
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

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-rosewood/10 bg-paper p-3">
      <p className="text-xs text-cocoa">{label}</p>
      <p className="mt-2 text-sm font-semibold capitalize text-ink">{value}</p>
    </div>
  );
}

function StrategyItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-rosewood/10 bg-paper p-4">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-6 text-cocoa">{body}</p>
    </div>
  );
}
