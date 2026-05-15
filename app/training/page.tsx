"use client";

import {
  FileAudio,
  FileText,
  Feather,
  Mic,
  Plus,
  Sparkles,
  Tags,
  Upload,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { contentTags, type ContentTag } from "@/lib/brand";

type TrainingType = "TikTok Script" | "Caption" | "Hook" | "Voice Note";

type TrainingItem = {
  id: number;
  title: string;
  type: TrainingType;
  text: string;
  tags: ContentTag[];
  quality: "Reference" | "Strong" | "Experimental";
};

const starterItems: TrainingItem[] = [
  {
    id: 1,
    title: "Freedom is the real luxury",
    type: "Hook",
    text: "The older I get the more I realize freedom is the real luxury.",
    tags: ["freedom", "identity"],
    quality: "Reference",
  },
  {
    id: 2,
    title: "Clarity note",
    type: "Caption",
    text: "I think people underestimate how life changing clarity is.",
    tags: ["identity", "mindset"],
    quality: "Strong",
  },
];

const trainingTypes: TrainingType[] = ["TikTok Script", "Caption", "Hook", "Voice Note"];

export default function TrainingPage() {
  const [items, setItems] = useState<TrainingItem[]>(starterItems);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<TrainingType>("TikTok Script");
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<ContentTag[]>(["freedom"]);
  const [fileName, setFileName] = useState("");

  const totals = useMemo(
    () => ({
      scripts: items.filter((item) => item.type === "TikTok Script").length,
      captions: items.filter((item) => item.type === "Caption").length,
      hooks: items.filter((item) => item.type === "Hook").length,
      voiceNotes: items.filter((item) => item.type === "Voice Note").length,
    }),
    [items],
  );

  function addTrainingItem() {
    const cleanText = text.trim();
    if (!cleanText) return;

    setItems((current) => [
      {
        id: Date.now(),
        title: title.trim() || `${type} example`,
        type,
        text: cleanText,
        tags: selectedTags,
        quality: "Experimental",
      },
      ...current,
    ]);
    setTitle("");
    setText("");
    setFileName("");
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
                AI Training Library
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <Panel
            icon={<Upload size={18} />}
            title="Upload Voice Examples"
            action={
              <button
                onClick={addTrainingItem}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-rosewood px-3 text-sm font-medium text-white shadow-sm transition hover:bg-ink"
              >
                <Plus size={16} />
                Add
              </button>
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Title or content name"
                className="h-11 rounded-lg border border-rosewood/15 bg-paper px-3 text-sm text-ink outline-none focus:border-rosewood/45"
              />
              <select
                value={type}
                onChange={(event) => setType(event.target.value as TrainingType)}
                className="h-11 rounded-lg border border-rosewood/15 bg-paper px-3 text-sm text-ink outline-none focus:border-rosewood/45"
              >
                {trainingTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <label className="mt-4 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-rosewood/25 bg-blush/45 p-4 text-center transition hover:bg-blush/60">
              <input
                type="file"
                accept=".txt,.md,.doc,.docx,.mp3,.m4a,.wav,.aac"
                className="sr-only"
                onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
              />
              <FileAudio size={22} className="text-rosewood" />
              <p className="mt-2 text-sm font-medium text-ink">
                {fileName || "Upload a script, caption file, hook list, or voice note"}
              </p>
              <p className="mt-1 text-xs text-cocoa">
                For now, files are staged in the UI. Paste the transcript or text below for training.
              </p>
            </label>

            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Paste the TikTok script, caption, hook list, or voice-note transcription here..."
              className="mt-4 min-h-48 w-full resize-none rounded-lg border border-rosewood/15 bg-paper p-4 text-sm leading-6 text-ink outline-none transition focus:border-rosewood/45"
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

          <Panel icon={<Sparkles size={18} />} title="Training Guidance">
            <div className="space-y-3">
              <Guidance title="Best examples" body="Upload scripts that sound most like you, not just posts that performed well." />
              <Guidance title="Voice notes" body="Transcripts are most useful when they keep your natural pauses, repeated thoughts, and emotional phrasing." />
              <Guidance title="Captions" body="Save captions that show how you move from observation to realization without sounding too polished." />
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <section className="grid gap-4 sm:grid-cols-4">
            <Metric icon={<FileText size={16} />} label="Scripts" value={totals.scripts.toString()} />
            <Metric icon={<FileText size={16} />} label="Captions" value={totals.captions.toString()} />
            <Metric icon={<Tags size={16} />} label="Hooks" value={totals.hooks.toString()} />
            <Metric icon={<Mic size={16} />} label="Voice notes" value={totals.voiceNotes.toString()} />
          </section>

          <Panel icon={<FileText size={18} />} title="Training Dataset">
            <div className="space-y-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-lg border border-rosewood/10 bg-paper p-4 transition hover:-translate-y-0.5 hover:border-rosewood/25 hover:shadow-lift"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-editorial text-xl font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 text-xs text-rosewood">{item.type}</p>
                    </div>
                    <span className="w-fit rounded-full bg-blush px-2.5 py-1 text-xs font-medium text-rosewood">
                      {item.quality}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-cocoa">{item.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-mist px-2 py-1 text-xs capitalize text-cocoa"
                      >
                        {tag}
                      </span>
                    ))}
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

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/70 bg-white/90 p-4 shadow-lift ring-1 ring-rosewood/5">
      <span className="text-rosewood">{icon}</span>
      <p className="mt-2 text-xs text-cocoa">{label}</p>
      <p className="font-editorial mt-1 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function Guidance({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-rosewood/10 bg-paper p-4">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm leading-6 text-cocoa">{body}</p>
    </div>
  );
}
