import { brandVoice } from "@/lib/brand";

export type ToneCheck = {
  score: number;
  verdict: "Sounds like Hauwa" | "Close, but needs softening" | "Off voice";
  matches: string[];
  misses: string[];
  rewriteTips: string[];
};

const reflectiveMarkers = [
  "i think",
  "i realize",
  "i'm starting to realize",
  "i genuinely think",
  "i accidentally",
  "i am learning",
  "lately",
  "honestly",
  "the older i get",
  "i used to",
  "nobody talks",
  "there is something",
];

const hauwaThemes = [
  "freedom",
  "clarity",
  "online",
  "money",
  "soft life",
  "ambition",
  "systems",
  "identity",
  "becoming",
  "freelance",
  "flexibility",
  "remote work",
  "burnout",
  "potential",
  "ordinary life",
  "figuring",
];

const offVoiceMarkers = [
  "boss babe",
  "high value",
  "crush it",
  "unlock your potential",
  "level up",
  "dominate",
  "you need to",
  "here are 3 tips",
  "here are three tips",
  "framework",
  "how to become",
  "5 ways",
  "five ways",
];

export function checkHauwaTone(text: string): ToneCheck {
  const source = text.toLowerCase();
  const reflectiveHits = reflectiveMarkers.filter((marker) => source.includes(marker));
  const themeHits = hauwaThemes.filter((theme) => source.includes(theme));
  const phraseHits = brandVoice.phrasePatterns.filter((pattern) =>
    source.includes(pattern.replace("...", "").toLowerCase()),
  );
  const offVoiceHits = offVoiceMarkers.filter((marker) => source.includes(marker));
  const hasFirstPerson = /\bi\b|\bmy\b|\bme\b/.test(source);
  const hasQuestion = source.includes("?");

  const score = clamp(
    34 +
      reflectiveHits.length * 8 +
      themeHits.length * 5 +
      phraseHits.length * 7 +
      (hasFirstPerson ? 12 : 0) +
      (hasQuestion ? 4 : 0) -
      offVoiceHits.length * 14,
  );

  return {
    score,
    verdict:
      score >= 78
        ? "Sounds like Hauwa"
        : score >= 58
          ? "Close, but needs softening"
          : "Off voice",
    matches: buildMatches(reflectiveHits, themeHits, phraseHits, hasFirstPerson),
    misses: buildMisses(reflectiveHits, themeHits, offVoiceHits, hasFirstPerson),
    rewriteTips: buildRewriteTips(reflectiveHits, themeHits, offVoiceHits, hasFirstPerson),
  };
}

function buildMatches(
  reflectiveHits: string[],
  themeHits: string[],
  phraseHits: string[],
  hasFirstPerson: boolean,
) {
  const matches = [];
  if (hasFirstPerson) matches.push("Uses first-person perspective, which keeps it documentary.");
  if (reflectiveHits.length) matches.push("Includes reflective language like a voice note.");
  if (themeHits.length) matches.push("Touches core Being Hauwa themes.");
  if (themeHits.includes("freedom") || themeHits.includes("identity")) matches.push("Creates identity resonance, which is one of the strongest content patterns.");
  if (phraseHits.length) matches.push("Echoes existing Hauwa phrase patterns.");
  return matches.length ? matches : ["There is a base idea here, but the tone needs more Hauwa texture."];
}

function buildMisses(
  reflectiveHits: string[],
  themeHits: string[],
  offVoiceHits: string[],
  hasFirstPerson: boolean,
) {
  const misses = [];
  if (!hasFirstPerson) misses.push("It does not feel personal enough yet.");
  if (!reflectiveHits.length) misses.push("It needs more reflective phrasing.");
  if (!themeHits.length) misses.push("It does not clearly connect to freedom, clarity, money, systems, identity, burnout, or self-reinvention.");
  if (offVoiceHits.length) misses.push("It includes language that sounds too generic or motivational.");
  return misses.length ? misses : ["No major tone misses detected."];
}

function buildRewriteTips(
  reflectiveHits: string[],
  themeHits: string[],
  offVoiceHits: string[],
  hasFirstPerson: boolean,
) {
  const tips = [];
  if (!hasFirstPerson) tips.push("Rewrite at least one line with 'I used to think...' or 'I am learning...'");
  if (!reflectiveHits.length) tips.push("Open with a realization instead of a topic.");
  if (!themeHits.length) tips.push("Anchor the idea in freedom, clarity, soft ambition, identity, remote work, or fear of wasted potential.");
  if (offVoiceHits.length) tips.push("Remove guru language and make the line sound more like a private observation.");
  return tips.length ? tips : ["Keep the structure, but test a softer final line instead of a hard CTA."];
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
