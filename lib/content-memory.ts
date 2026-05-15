import type { ContentTag } from "@/lib/brand";

export type EmotionalPattern =
  | "freedom longing"
  | "clarity relief"
  | "reinvention tension"
  | "soft ambition"
  | "survival fatigue"
  | "creative self-trust";

export type MemoryRecord = {
  id: number;
  text: string;
  source: "Script" | "Caption" | "Hook" | "Voice Note" | "Brain Dump";
  tags: ContentTag[];
  emotion: EmotionalPattern;
  intensity: number;
  resonance: number;
  lastSeen: string;
};

export const emotionalPatterns: Record<EmotionalPattern, string[]> = {
  "freedom longing": ["freedom", "options", "soft life", "escape", "luxury", "breathe"],
  "clarity relief": ["clarity", "clear", "lighter", "relief", "direction", "focus"],
  "reinvention tension": ["reinvent", "starting over", "becoming", "identity", "version"],
  "soft ambition": ["ambition", "money", "online", "build", "dream", "income"],
  "survival fatigue": ["survival", "tired", "heavy", "urgent", "overwhelmed", "burnout"],
  "creative self-trust": ["creative", "systems", "repeat", "trust", "motivation", "discipline"],
};

export const starterMemoryRecords: MemoryRecord[] = [
  {
    id: 1,
    text: "The older I get the more I realize freedom is the real luxury.",
    source: "Hook",
    tags: ["freedom", "identity"],
    emotion: "freedom longing",
    intensity: 92,
    resonance: 96,
    lastSeen: "Today",
  },
  {
    id: 2,
    text: "I think people underestimate how life changing clarity is.",
    source: "Caption",
    tags: ["identity", "mindset"],
    emotion: "clarity relief",
    intensity: 86,
    resonance: 91,
    lastSeen: "Yesterday",
  },
  {
    id: 3,
    text: "I used to think I needed more motivation, but I think what I actually needed was a clearer system.",
    source: "Script",
    tags: ["systems", "productivity"],
    emotion: "creative self-trust",
    intensity: 78,
    resonance: 84,
    lastSeen: "May 12",
  },
  {
    id: 4,
    text: "Nobody tells you how emotional it is to want a softer life and more money.",
    source: "Voice Note",
    tags: ["money", "lifestyle", "ambition"],
    emotion: "soft ambition",
    intensity: 89,
    resonance: 88,
    lastSeen: "May 10",
  },
  {
    id: 5,
    text: "Sometimes your life just has too many open tabs and even the dream starts to feel heavy.",
    source: "Brain Dump",
    tags: ["mindset", "systems"],
    emotion: "survival fatigue",
    intensity: 82,
    resonance: 79,
    lastSeen: "May 8",
  },
];

export function identifyEmotionalPattern(text: string): EmotionalPattern {
  const source = text.toLowerCase();
  const scored = Object.entries(emotionalPatterns).map(([emotion, keywords]) => ({
    emotion: emotion as EmotionalPattern,
    score: keywords.filter((keyword) => source.includes(keyword)).length,
  }));

  return scored.sort((a, b) => b.score - a.score)[0]?.emotion || "soft ambition";
}

export function summarizeMemory(records: MemoryRecord[]) {
  const emotionCounts = records.reduce<Record<EmotionalPattern, number>>(
    (counts, record) => {
      counts[record.emotion] += 1;
      return counts;
    },
    {
      "freedom longing": 0,
      "clarity relief": 0,
      "reinvention tension": 0,
      "soft ambition": 0,
      "survival fatigue": 0,
      "creative self-trust": 0,
    },
  );

  const strongestEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0][0];
  const averageIntensity = Math.round(
    records.reduce((sum, record) => sum + record.intensity, 0) / Math.max(records.length, 1),
  );
  const averageResonance = Math.round(
    records.reduce((sum, record) => sum + record.resonance, 0) / Math.max(records.length, 1),
  );

  return {
    emotionCounts,
    strongestEmotion: strongestEmotion as EmotionalPattern,
    averageIntensity,
    averageResonance,
  };
}
