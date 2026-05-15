"use client";

import {
  Feather,
  FileText,
  Film,
  Layers,
  Linkedin,
  MessageSquareText,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { repurposeIdea } from "@/lib/repurposing-engine";

const starterIdea = "The older I get the more I realize freedom is the real luxury.";

export default function RepurposePage() {
  const [idea, setIdea] = useState(starterIdea);
  const output = useMemo(() => repurposeIdea(idea), [idea]);

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
                Repurposing Engine
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          <Panel icon={<Sparkles size={18} />} title="TikTok Idea">
            <textarea
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              className="min-h-44 w-full resize-none rounded-lg border border-rosewood/15 bg-paper p-4 text-sm leading-6 text-ink outline-none transition focus:border-rosewood/45"
              placeholder="Paste one TikTok idea, hook, observation, or rough script..."
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-rosewood px-2.5 py-1 text-xs text-white">
                {output.stage}
              </span>
              {output.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-blush px-2.5 py-1 text-xs capitalize text-rosewood">
                  {tag}
                </span>
              ))}
            </div>
          </Panel>

          <Panel icon={<RefreshCcw size={18} />} title="Repurposing Logic">
            <p className="text-sm leading-6 text-cocoa">
              The engine keeps the emotional center of the TikTok idea, then changes the structure
              for each platform: short realization for TikTok, slide-by-slide tension for carousel,
              reflective work insight for LinkedIn, intimate narration for vlog, and expanded
              context for blog.
            </p>
          </Panel>
        </div>

        <div className="space-y-5">
          <OutputPanel icon={<Film size={18} />} title="TikTok Script">
            <Pre>{output.tiktok}</Pre>
          </OutputPanel>

          <OutputPanel icon={<Layers size={18} />} title="Carousel">
            <div className="grid gap-3 md:grid-cols-2">
              {output.carousel.map((slide) => (
                <div key={slide} className="rounded-lg border border-rosewood/10 bg-paper p-4 text-sm leading-6 text-cocoa">
                  {slide}
                </div>
              ))}
            </div>
          </OutputPanel>

          <OutputPanel icon={<Linkedin size={18} />} title="LinkedIn Post">
            <Pre>{output.linkedIn}</Pre>
          </OutputPanel>

          <OutputPanel icon={<MessageSquareText size={18} />} title="Vlog Narration">
            <Pre>{output.vlogNarration}</Pre>
          </OutputPanel>

          <OutputPanel icon={<FileText size={18} />} title="Blog Draft">
            <div className="space-y-4">
              <h2 className="font-editorial text-2xl font-semibold text-ink">{output.blog.title}</h2>
              <p className="text-sm leading-6 text-cocoa">{output.blog.intro}</p>
              {output.blog.sections.map((section) => (
                <div key={section.heading} className="rounded-lg border border-rosewood/10 bg-paper p-4">
                  <p className="font-editorial text-xl font-semibold text-ink">{section.heading}</p>
                  <p className="mt-2 text-sm leading-6 text-cocoa">{section.body}</p>
                </div>
              ))}
            </div>
          </OutputPanel>

          <OutputPanel icon={<MessageSquareText size={18} />} title="Caption">
            <Pre>{output.caption}</Pre>
          </OutputPanel>
        </div>
      </section>
    </main>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-white/70 bg-white/90 p-5 shadow-lift ring-1 ring-rosewood/5">
      <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-ink">
        <span className="text-rosewood">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function OutputPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return <Panel title={title} icon={icon}>{children}</Panel>;
}

function Pre({ children }: { children: string }) {
  return (
    <pre className="whitespace-pre-wrap rounded-lg border border-rosewood/10 bg-paper p-4 text-sm leading-6 text-cocoa">
      {children}
    </pre>
  );
}
