"use client";

import { Check, Feather, Gauge, MessageSquareText, Sparkles, X } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { checkHauwaTone } from "@/lib/hauwa-tone-checker";

const starterScript = `I keep thinking about freedom and how it is not really about looking successful.

I used to think I wanted a better title or a more impressive life, but honestly I think I just wanted more room to breathe.

More time. More options. More proof that I could build something softer without becoming less ambitious.`;

export default function ToneCheckPage() {
  const [script, setScript] = useState(starterScript);
  const result = useMemo(() => checkHauwaTone(script), [script]);

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
                Sounds Like Hauwa?
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel icon={<MessageSquareText size={18} />} title="Paste Script">
          <textarea
            value={script}
            onChange={(event) => setScript(event.target.value)}
            placeholder="Paste a generated script, caption, hook, or narration..."
            className="min-h-96 w-full resize-none rounded-lg border border-rosewood/15 bg-paper p-4 text-sm leading-6 text-ink outline-none transition focus:border-rosewood/45"
          />
        </Panel>

        <div className="space-y-5">
          <Panel
            icon={<Gauge size={18} />}
            title="Tone Match Score"
            action={
              <span className="rounded-full bg-blush px-2.5 py-1 text-xs font-medium text-rosewood">
                {result.verdict}
              </span>
            }
          >
            <div className="rounded-lg border border-rosewood/10 bg-blush/55 p-5 text-center">
              <p className="text-xs font-semibold uppercase text-rosewood">Hauwa match</p>
              <p className="font-editorial mt-2 text-6xl font-semibold text-ink">{result.score}</p>
            </div>
          </Panel>

          <section className="grid gap-5 lg:grid-cols-2">
            <Panel icon={<Check size={18} />} title="What Matches">
              <List items={result.matches} icon={<Check size={14} />} />
            </Panel>
            <Panel icon={<X size={18} />} title="What Feels Off">
              <List items={result.misses} icon={<X size={14} />} />
            </Panel>
          </section>

          <Panel icon={<Sparkles size={18} />} title="Rewrite Direction">
            <List items={result.rewriteTips} icon={<Sparkles size={14} />} />
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
