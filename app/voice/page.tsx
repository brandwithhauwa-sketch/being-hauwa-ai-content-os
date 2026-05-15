"use client";

import {
  BookOpen,
  Check,
  Feather,
  MessageSquareText,
  Moon,
  Sparkles,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { brandVoice } from "@/lib/brand";

export default function BrandVoicePage() {
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
                Brand Voice System
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          <Panel icon={<Sparkles size={18} />} title="Voice Essence">
            <p className="font-editorial text-3xl font-semibold leading-tight text-ink">
              Smart, soft, ambitious, and honest about the becoming.
            </p>
            <p className="mt-4 text-sm leading-6 text-cocoa">{brandVoice.positioning}</p>
          </Panel>

          <Panel icon={<Moon size={18} />} title="Tone Formula">
            <div className="space-y-3">
              <Formula label="Energy" value="soft ambition" />
              <Formula label="Posture" value="documenting, not preaching" />
              <Formula label="Texture" value="voice note, journal, smart friend" />
              <Formula label="Promise" value="freedom through clarity and systems" />
            </div>
          </Panel>

          <Panel icon={<MessageSquareText size={18} />} title="Signature Lines">
            <div className="space-y-3">
              {brandVoice.examples.map((example) => (
                <blockquote
                  key={example}
                  className="rounded-lg border border-rosewood/10 bg-paper p-4 font-editorial text-lg leading-7 text-ink"
                >
                  {example}
                </blockquote>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel icon={<BookOpen size={18} />} title="Voice Pillars">
            <div className="grid gap-3 md:grid-cols-2">
              {brandVoice.voicePillars.map((pillar) => (
                <article key={pillar.name} className="rounded-lg border border-rosewood/10 bg-paper p-4">
                  <p className="font-editorial text-xl font-semibold text-ink">{pillar.name}</p>
                  <p className="mt-2 text-sm leading-6 text-cocoa">{pillar.description}</p>
                </article>
              ))}
            </div>
          </Panel>

          <Panel icon={<Sparkles size={18} />} title="Phrase Patterns">
            <div className="grid gap-2 md:grid-cols-2">
              {brandVoice.phrasePatterns.map((pattern) => (
                <span
                  key={pattern}
                  className="rounded-full border border-rosewood/10 bg-blush/55 px-3 py-2 text-sm text-rosewood"
                >
                  {pattern}
                </span>
              ))}
            </div>
          </Panel>

          <section className="grid gap-5 lg:grid-cols-2">
            <Panel icon={<Check size={18} />} title="Do">
              <div className="space-y-3">
                {brandVoice.doList.map((item) => (
                  <Rule key={item} icon={<Check size={14} />} text={item} />
                ))}
              </div>
            </Panel>

            <Panel icon={<X size={18} />} title="Avoid">
              <div className="space-y-3">
                {brandVoice.dontList.map((item) => (
                  <Rule key={item} icon={<X size={14} />} text={item} />
                ))}
              </div>
            </Panel>
          </section>

          <Panel icon={<BookOpen size={18} />} title="Content Angles">
            <div className="grid gap-2 md:grid-cols-2">
              {brandVoice.contentAngles.map((angle) => (
                <span
                  key={angle}
                  className="rounded-lg border border-rosewood/10 bg-paper px-3 py-2 text-sm capitalize text-cocoa"
                >
                  {angle}
                </span>
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

function Formula({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-rosewood/10 bg-paper p-3">
      <span className="text-sm text-cocoa">{label}</span>
      <span className="text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}

function Rule({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex gap-3 rounded-lg border border-rosewood/10 bg-paper p-3 text-sm leading-6 text-cocoa">
      <span className="mt-1 text-rosewood">{icon}</span>
      {text}
    </div>
  );
}
