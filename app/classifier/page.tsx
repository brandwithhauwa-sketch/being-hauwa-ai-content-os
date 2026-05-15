"use client";

import { Brain, Feather, Filter, Layers3, Plus, Search, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  explainFunnelStage,
  stageDescriptions,
  suggestTags,
  type FunnelStage,
} from "@/lib/brand";

const starterIdeas = [
  "The older I get the more I realize freedom is the real luxury.",
  "I accidentally turned my iPad into my entire business.",
  "I genuinely don't understand how people survive with one income stream anymore.",
  "How to build a client acquisition system as a freelancer.",
  "A soft productivity planner for women trying to rebuild their life online.",
];

export default function FunnelClassifierPage() {
  const [idea, setIdea] = useState(starterIdeas[0]);
  const [ideas, setIdeas] = useState(starterIdeas);

  const classification = useMemo(() => explainFunnelStage(idea), [idea]);
  const tags = useMemo(() => suggestTags(idea), [idea]);

  function addIdea() {
    const cleanIdea = idea.trim();
    if (!cleanIdea) return;
    setIdeas((current) => [cleanIdea, ...current.filter((item) => item !== cleanIdea)]);
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
              <h1 className="font-editorial text-3xl font-semibold tracking-normal">
                Funnel Classifier
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <Panel
            icon={<Search size={18} />}
            title="Classify Content Idea"
            action={
              <button
                onClick={addIdea}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-rosewood px-3 text-sm font-medium text-white shadow-sm transition hover:bg-ink"
              >
                <Plus size={16} />
                Save
              </button>
            }
          >
            <textarea
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="Paste a hook, caption, script idea, offer idea, or audience comment..."
              className="min-h-48 w-full resize-none rounded-lg border border-rosewood/15 bg-paper p-4 text-sm leading-6 text-ink outline-none transition focus:border-rosewood/45"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.length ? (
                tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blush px-2.5 py-1 text-xs capitalize text-rosewood"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-cocoa">No tags detected yet.</span>
              )}
            </div>
          </Panel>

          <Panel icon={<Brain size={18} />} title="Saved Ideas">
            <div className="space-y-3">
              {ideas.map((item) => {
                const itemClassification = explainFunnelStage(item);
                return (
                  <button
                    key={item}
                    onClick={() => setIdea(item)}
                    className="w-full rounded-lg border border-rosewood/10 bg-paper p-4 text-left transition hover:-translate-y-0.5 hover:border-rosewood/25 hover:shadow-lift"
                  >
                    <p className="text-sm leading-6 text-ink">{item}</p>
                    <span className="mt-3 inline-flex rounded-full bg-rosewood px-2.5 py-1 text-xs text-white">
                      {itemClassification.stage}
                    </span>
                  </button>
                );
              })}
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel
            icon={<Layers3 size={18} />}
            title="Classification Result"
            action={<StageBadge stage={classification.stage} />}
          >
            <p className="font-editorial text-4xl font-semibold text-ink">{classification.stage}</p>
            <p className="mt-3 text-sm leading-6 text-cocoa">
              {stageDescriptions[classification.stage]}
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <ResultCard label="Objective" value={classification.objective} />
              <ResultCard label="Next move" value={classification.nextMove} />
            </div>
          </Panel>

          <Panel icon={<Filter size={18} />} title="Why This Stage">
            <div className="space-y-3">
              {classification.matchedSignals.map((signal) => (
                <div key={signal} className="rounded-lg border border-rosewood/10 bg-paper p-4">
                  <p className="text-sm leading-6 text-cocoa">
                    Detected signal: <span className="font-semibold text-ink">{signal}</span>
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel icon={<Sparkles size={18} />} title="Funnel Rules">
            <div className="grid gap-3">
              <FunnelRule stage="TOFU" text="Freedom, better life, survival mode, online income, soft life plus ambition, remote work romance, independence, identity, and realistic productivity. The audience should feel: I relate to her." />
              <FunnelRule stage="MOFU" text="Freelancing systems, positioning, client acquisition, branding, remote work tutorials, money systems, portfolio advice, workflow, and implementation." />
              <FunnelRule stage="BOFU" text="Planner, consulting, templates, ebooks, workshops, services, and offer conversion." />
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

function StageBadge({ stage }: { stage: FunnelStage }) {
  return <span className="rounded-full bg-rosewood px-3 py-1 text-xs font-medium text-white">{stage}</span>;
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-rosewood/10 bg-paper p-4">
      <p className="text-xs font-semibold uppercase text-rosewood">{label}</p>
      <p className="mt-2 text-sm leading-6 text-cocoa">{value}</p>
    </div>
  );
}

function FunnelRule({ stage, text }: { stage: FunnelStage; text: string }) {
  return (
    <div className="rounded-lg border border-rosewood/10 bg-paper p-4">
      <p className="font-editorial text-xl font-semibold text-ink">{stage}</p>
      <p className="mt-2 text-sm leading-6 text-cocoa">{text}</p>
    </div>
  );
}
