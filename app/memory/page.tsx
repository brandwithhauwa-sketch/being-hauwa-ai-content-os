"use client";

import {
  Archive,
  Brain,
  Feather,
  HeartPulse,
  Plus,
  Search,
  Sparkles,
  Tags,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { contentTags, suggestTags, type ContentTag } from "@/lib/brand";
import {
  emotionalPatterns,
  identifyEmotionalPattern,
  starterMemoryRecords,
  summarizeMemory,
  type EmotionalPattern,
  type MemoryRecord,
} from "@/lib/content-memory";

const sources: MemoryRecord["source"][] = ["Script", "Caption", "Hook", "Voice Note", "Brain Dump"];

export default function ContentMemoryPage() {
  const [records, setRecords] = useState<MemoryRecord[]>(starterMemoryRecords);
  const [memoryText, setMemoryText] = useState("");
  const [source, setSource] = useState<MemoryRecord["source"]>("Brain Dump");
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<ContentTag[]>(["freedom"]);

  const summary = useMemo(() => summarizeMemory(records), [records]);
  const filteredRecords = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return records;

    return records.filter(
      (record) =>
        record.text.toLowerCase().includes(normalized) ||
        record.emotion.includes(normalized) ||
        record.tags.some((tag) => tag.includes(normalized)),
    );
  }, [query, records]);

  function addMemory() {
    const cleanText = memoryText.trim();
    if (!cleanText) return;

    const emotion = identifyEmotionalPattern(cleanText);
    setRecords((current) => [
      {
        id: Date.now(),
        text: cleanText,
        source,
        tags: selectedTags.length ? selectedTags : suggestTags(cleanText),
        emotion,
        intensity: 74,
        resonance: 70,
        lastSeen: "Now",
      },
      ...current,
    ]);
    setMemoryText("");
  }

  function toggleTag(tag: ContentTag) {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
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
                Content Memory
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 min-w-[16rem] items-center gap-2 rounded-lg border border-rosewood/10 bg-white/90 px-3 text-sm text-cocoa shadow-sm">
              <Search size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search themes or emotions"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-cocoa"
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <Panel
            icon={<Brain size={18} />}
            title="Add To Memory"
            action={
              <button
                onClick={addMemory}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-rosewood px-3 text-sm font-medium text-white shadow-sm transition hover:bg-ink"
              >
                <Plus size={16} />
                Add
              </button>
            }
          >
            <textarea
              value={memoryText}
              onChange={(event) => setMemoryText(event.target.value)}
              placeholder="Paste a script, caption, hook, audience comment, or voice-note line you want the system to remember..."
              className="min-h-40 w-full resize-none rounded-lg border border-rosewood/15 bg-paper p-4 text-sm leading-6 text-ink outline-none transition focus:border-rosewood/45"
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
              <select
                value={source}
                onChange={(event) => setSource(event.target.value as MemoryRecord["source"])}
                className="h-11 rounded-lg border border-rosewood/15 bg-paper px-3 text-sm text-ink outline-none focus:border-rosewood/45"
              >
                {sources.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2">
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
            </div>
          </Panel>

          <Panel icon={<HeartPulse size={18} />} title="Emotional Pattern Read">
            <p className="font-editorial text-3xl font-semibold leading-tight text-ink">
              Your strongest recurring pattern is {summary.strongestEmotion}.
            </p>
            <p className="mt-3 text-sm leading-6 text-cocoa">
              The memory system is noticing repeated language around freedom, clarity, becoming,
              softness, money, and the emotional weight of building a new life online.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <MiniStat label="Avg intensity" value={`${summary.averageIntensity}%`} />
              <MiniStat label="Avg resonance" value={`${summary.averageResonance}%`} />
            </div>
          </Panel>

          <Panel icon={<Sparkles size={18} />} title="Recurring Themes">
            <div className="space-y-3">
              {Object.entries(summary.emotionCounts).map(([emotion, count]) => (
                <ThemeBar
                  key={emotion}
                  emotion={emotion as EmotionalPattern}
                  count={count}
                  max={records.length}
                />
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel icon={<Archive size={18} />} title="Memory Database">
            <div className="space-y-3">
              {filteredRecords.map((record) => (
                <article
                  key={record.id}
                  className="rounded-lg border border-rosewood/10 bg-paper p-4 transition hover:-translate-y-0.5 hover:border-rosewood/25 hover:shadow-lift"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-ink">{record.source}</p>
                      <p className="mt-1 text-xs capitalize text-rosewood">{record.emotion}</p>
                    </div>
                    <span className="w-fit rounded-full bg-blush px-2.5 py-1 text-xs font-medium text-rosewood">
                      {record.lastSeen}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-cocoa">{record.text}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_7rem_7rem] sm:items-center">
                    <div className="flex flex-wrap gap-2">
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
                    <Score label="Intensity" value={record.intensity} />
                    <Score label="Resonance" value={record.resonance} />
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel icon={<Sparkles size={18} />} title="Pattern Keywords">
            <div className="grid gap-3 md:grid-cols-2">
              {Object.entries(emotionalPatterns).map(([emotion, keywords]) => (
                <div key={emotion} className="rounded-lg border border-rosewood/10 bg-paper p-4">
                  <p className="font-editorial text-lg font-semibold capitalize text-ink">{emotion}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keywords.map((keyword) => (
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
      <p className="font-editorial mt-1 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function ThemeBar({
  emotion,
  count,
  max,
}: {
  emotion: EmotionalPattern;
  count: number;
  max: number;
}) {
  const width = Math.max(8, (count / Math.max(max, 1)) * 100);

  return (
    <div className="rounded-lg border border-rosewood/10 bg-paper p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold capitalize text-ink">{emotion}</p>
        <span className="text-xs text-cocoa">{count} memories</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full bg-rosewood" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-xs text-cocoa">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full bg-rosewood" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
