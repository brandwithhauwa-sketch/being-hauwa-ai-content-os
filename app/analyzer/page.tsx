"use client";

import {
  BarChart3,
  Check,
  Feather,
  Gauge,
  Lightbulb,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { analyzeScript } from "@/lib/script-analyzer";

const starterScript = `The older I get the more I realize freedom is the real luxury.

I used to think I just wanted to make more money, but honestly I think I wanted more room to breathe.
More options. More control over my time. More proof that my life could become softer without becoming smaller.

And I think that is why online income feels so emotional for a lot of women.`;

export default function ScriptAnalyzerPage() {
  const [script, setScript] = useState(starterScript);
  const analysis = useMemo(() => analyzeScript(script), [script]);

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
                Script Analyzer
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel icon={<Search size={18} />} title="Analyze Content">
          <textarea
            value={script}
            onChange={(event) => setScript(event.target.value)}
            placeholder="Paste a TikTok script, caption, hook, or voice-note transcript..."
            className="min-h-96 w-full resize-none rounded-lg border border-rosewood/15 bg-paper p-4 text-sm leading-6 text-ink outline-none transition focus:border-rosewood/45"
          />
        </Panel>

        <div className="space-y-5">
          <Panel
            icon={<Gauge size={18} />}
            title="Performance Diagnosis"
            action={
              <span className="rounded-full bg-blush px-2.5 py-1 text-xs font-medium text-rosewood">
                {analysis.likelyPerformance}
              </span>
            }
          >
            <div className="grid gap-4 md:grid-cols-[0.75fr_1.25fr]">
              <div className="rounded-lg border border-rosewood/10 bg-blush/55 p-5 text-center">
                <p className="text-xs font-semibold uppercase text-rosewood">Overall</p>
                <p className="font-editorial mt-2 text-6xl font-semibold text-ink">
                  {analysis.overallScore}
                </p>
                <p className="mt-2 text-sm capitalize text-cocoa">{analysis.emotionalPattern}</p>
              </div>
              <div className="space-y-3">
                <Score label="Hook strength" value={analysis.hookScore} />
                <Score label="Emotional resonance" value={analysis.emotionalScore} />
                <Score label="Clarity" value={analysis.clarityScore} />
                <Score label="Specificity" value={analysis.specificityScore} />
                <Score label="Retention potential" value={analysis.retentionScore} />
              </div>
            </div>
          </Panel>

          <section className="grid gap-5 lg:grid-cols-2">
            <Panel icon={<Check size={18} />} title="Why It May Work">
              <List items={analysis.strengths} icon={<Check size={14} />} />
            </Panel>
            <Panel icon={<X size={18} />} title="Why It May Struggle">
              <List items={analysis.risks} icon={<X size={14} />} />
            </Panel>
          </section>

          <Panel icon={<Lightbulb size={18} />} title="Rewrite Suggestions">
            <List items={analysis.recommendations} icon={<Sparkles size={14} />} />
          </Panel>

          <Panel icon={<BarChart3 size={18} />} title="Performance Explanation">
            <p className="text-sm leading-6 text-cocoa">
              This analyzer looks for the patterns that usually matter for Being Hauwa content:
              a first-line realization, emotional specificity, clarity, concrete modern-life
              details, and whether the piece sounds like documentation instead of advice. Strong
              content usually makes the audience feel seen before it teaches them anything.
            </p>
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

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-cocoa">{label}</span>
        <span className="font-semibold text-ink">{value}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full bg-rosewood" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function List({ items, icon }: { items: string[]; icon: ReactNode }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex gap-3 rounded-lg border border-rosewood/10 bg-paper p-3 text-sm leading-6 text-cocoa"
        >
          <span className="mt-1 text-rosewood">{icon}</span>
          {item}
        </div>
      ))}
    </div>
  );
}
