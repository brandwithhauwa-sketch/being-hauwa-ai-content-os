import { identifyEmotionalPattern } from "@/lib/content-memory";

export type ScriptAnalysis = {
  hookScore: number;
  emotionalScore: number;
  clarityScore: number;
  specificityScore: number;
  retentionScore: number;
  overallScore: number;
  likelyPerformance: "Strong" | "Mixed" | "Weak";
  emotionalPattern: ReturnType<typeof identifyEmotionalPattern>;
  strengths: string[];
  risks: string[];
  recommendations: string[];
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
  "nobody talks",
  "i used to",
];

const specificMarkers = [
  "ipad",
  "freelance",
  "client",
  "online",
  "money",
  "system",
  "planner",
  "remote",
  "tiktok",
  "caption",
  "remote work",
  "flexibility",
  "soft life",
  "ordinary life",
  "burnout",
  "potential",
  "freedom",
  "clarity",
];

const weakMarkers = ["tips", "level up", "unlock", "crush", "boss babe", "you need to"];

export function analyzeScript(text: string): ScriptAnalysis {
  const source = text.toLowerCase().trim();
  const words = source.split(/\s+/).filter(Boolean);
  const firstLine = source.split(/\n/).find(Boolean) || source;

  const reflectiveHits = reflectiveMarkers.filter((marker) => source.includes(marker)).length;
  const specificHits = specificMarkers.filter((marker) => source.includes(marker)).length;
  const weakHits = weakMarkers.filter((marker) => source.includes(marker)).length;
  const identityHits = ["identity", "freedom", "stuck", "potential", "ordinary life", "soft life", "ambition"].filter((marker) =>
    source.includes(marker),
  ).length;
  const questionCount = (source.match(/\?/g) || []).length;
  const sentenceCount = Math.max(source.split(/[.!?]/).filter((item) => item.trim()).length, 1);
  const averageSentenceLength = words.length / sentenceCount;

  const hookScore = clamp(
    46 +
      (firstLine.includes("i ") ? 12 : 0) +
      (firstLine.includes("realize") || firstLine.includes("think") ? 14 : 0) +
      (firstLine.length < 130 ? 12 : -8) +
      identityHits * 3 -
      weakHits * 8,
  );
  const emotionalScore = clamp(44 + reflectiveHits * 9 + identityHits * 5 + questionCount * 3 - weakHits * 7);
  const clarityScore = clamp(82 - Math.max(0, averageSentenceLength - 18) * 2 - weakHits * 5);
  const specificityScore = clamp(42 + specificHits * 10 + (source.includes("because") ? 6 : 0));
  const retentionScore = clamp(
    50 +
      (words.length >= 55 && words.length <= 180 ? 18 : 0) +
      reflectiveHits * 4 +
      specificHits * 3 +
      identityHits * 4 -
      weakHits * 9,
  );
  const overallScore = Math.round(
    (hookScore + emotionalScore + clarityScore + specificityScore + retentionScore) / 5,
  );

  return {
    hookScore,
    emotionalScore,
    clarityScore,
    specificityScore,
    retentionScore,
    overallScore,
    likelyPerformance: overallScore >= 78 ? "Strong" : overallScore >= 58 ? "Mixed" : "Weak",
    emotionalPattern: identifyEmotionalPattern(source),
    strengths: buildStrengths({ hookScore, emotionalScore, clarityScore, specificityScore }),
    risks: buildRisks({ hookScore, emotionalScore, clarityScore, specificityScore, weakHits }),
    recommendations: buildRecommendations({
      hookScore,
      emotionalScore,
      clarityScore,
      specificityScore,
      retentionScore,
    }),
  };
}

function buildStrengths(scores: {
  hookScore: number;
  emotionalScore: number;
  clarityScore: number;
  specificityScore: number;
}) {
  const strengths = [];
  if (scores.hookScore >= 70) strengths.push("The opening has a clear point of view.");
  if (scores.emotionalScore >= 70) strengths.push("The piece carries emotional self-awareness.");
  if (scores.hookScore >= 70 && scores.emotionalScore >= 70) strengths.push("The hook creates identity attachment instead of just introducing a topic.");
  if (scores.clarityScore >= 70) strengths.push("The idea is easy to follow without feeling over-explained.");
  if (scores.specificityScore >= 70) strengths.push("Specific details make the content feel more lived-in.");
  return strengths.length ? strengths : ["The idea has a usable base, but it needs a sharper emotional angle."];
}

function buildRisks(scores: {
  hookScore: number;
  emotionalScore: number;
  clarityScore: number;
  specificityScore: number;
  weakHits: number;
}) {
  const risks = [];
  if (scores.hookScore < 62) risks.push("The hook may be too broad to stop the scroll.");
  if (scores.emotionalScore < 62) risks.push("The emotional reason to care is not strong enough yet.");
  if (scores.clarityScore < 62) risks.push("The script may lose people because the thought takes too long to land.");
  if (scores.specificityScore < 62) risks.push("It needs more concrete details from real life or online work.");
  if (scores.weakHits > 0) risks.push("Some phrasing risks sounding generic or overly motivational.");
  return risks.length ? risks : ["The main risk is repeating this angle too often without a fresh detail."];
}

function buildRecommendations(scores: {
  hookScore: number;
  emotionalScore: number;
  clarityScore: number;
  specificityScore: number;
  retentionScore: number;
}) {
  const recommendations = [];
  if (scores.hookScore < 75) recommendations.push("Rewrite the first line as a realization, not a topic.");
  if (scores.emotionalScore < 75) recommendations.push("Add the private feeling underneath the idea.");
  if (scores.hookScore < 75) recommendations.push("Try a stronger Hauwa-style opener: 'The older I get...', 'I used to think...', or 'I genuinely think...'");
  if (scores.clarityScore < 75) recommendations.push("Cut one setup sentence and get to the shift sooner.");
  if (scores.specificityScore < 75) recommendations.push("Add one concrete detail: iPad, client, routine, platform, or money moment.");
  if (scores.retentionScore < 75) recommendations.push("Create a mid-script turn with: 'but lately I think...'");
  return recommendations.length
    ? recommendations
    : ["Turn this into a series by testing another hook with the same emotional pattern."];
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
