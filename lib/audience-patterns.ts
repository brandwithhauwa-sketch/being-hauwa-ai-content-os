import type { ContentTag } from "@/lib/brand";

export type AudiencePatternType = "Desire" | "Fear" | "Identity";

export type AudienceComment = {
  id: number;
  comment: string;
  type: AudiencePatternType;
  pattern: string;
  tags: ContentTag[];
  frequency: number;
  sentiment: "hopeful" | "overwhelmed" | "curious" | "frustrated";
  contentAngle: string;
};

export const audienceComments: AudienceComment[] = [
  {
    id: 1,
    comment: "I just want to make money online without feeling like I have to become a completely different person.",
    type: "Desire",
    pattern: "online income that still feels authentic",
    tags: ["money", "identity"],
    frequency: 18,
    sentiment: "hopeful",
    contentAngle: "Show online income as identity-safe, not performative.",
  },
  {
    id: 2,
    comment: "I am tired of feeling behind. I want to restart but I do not know where to begin.",
    type: "Fear",
    pattern: "fear of being behind",
    tags: ["identity", "mindset"],
    frequency: 24,
    sentiment: "overwhelmed",
    contentAngle: "Create reinvention content that starts from emotional overwhelm.",
  },
  {
    id: 3,
    comment: "This is me. I want soft life but I am also ambitious and I feel guilty for wanting both.",
    type: "Identity",
    pattern: "soft life plus ambition",
    tags: ["lifestyle", "ambition"],
    frequency: 31,
    sentiment: "curious",
    contentAngle: "Normalize wanting comfort, money, and meaning at the same time.",
  },
  {
    id: 4,
    comment: "Every time I try to be consistent I burn out after one week.",
    type: "Fear",
    pattern: "consistency burnout",
    tags: ["productivity", "systems"],
    frequency: 21,
    sentiment: "frustrated",
    contentAngle: "Teach systems as emotional support, not discipline content.",
  },
  {
    id: 5,
    comment: "I want freedom more than I want a fancy job title.",
    type: "Desire",
    pattern: "freedom over status",
    tags: ["freedom", "lifestyle"],
    frequency: 27,
    sentiment: "hopeful",
    contentAngle: "Position freedom as the real luxury and status as optional.",
  },
  {
    id: 6,
    comment: "I feel like I am multi-passionate but also scattered.",
    type: "Identity",
    pattern: "multi-passionate but scattered",
    tags: ["identity", "systems"],
    frequency: 16,
    sentiment: "overwhelmed",
    contentAngle: "Build content around clarity for women with many interests.",
  },
  {
    id: 7,
    comment: "I am scared of wasting my potential because I know I am meant for more but I feel so confused.",
    type: "Fear",
    pattern: "wasting potential while feeling confused",
    tags: ["identity", "ambition"],
    frequency: 29,
    sentiment: "overwhelmed",
    contentAngle: "Create identity-led posts about potential, clarity, and rebuilding slowly.",
  },
  {
    id: 8,
    comment: "I romanticize remote work so much because I just want flexibility and a life that feels like mine.",
    type: "Desire",
    pattern: "romanticizing remote work for flexibility",
    tags: ["lifestyle", "freelancing"],
    frequency: 22,
    sentiment: "hopeful",
    contentAngle: "Connect remote work to freedom, flexibility, and self-reinvention.",
  },
  {
    id: 9,
    comment: "I do not want to live an ordinary life but I also feel tired all the time.",
    type: "Identity",
    pattern: "fear of ordinary life plus burnout",
    tags: ["ambition", "mindset"],
    frequency: 26,
    sentiment: "frustrated",
    contentAngle: "Frame realistic productivity as a way to protect ambition from burnout.",
  },
];

export function summarizeAudiencePatterns(comments: AudienceComment[]) {
  const byType = comments.reduce<Record<AudiencePatternType, number>>(
    (counts, comment) => {
      counts[comment.type] += comment.frequency;
      return counts;
    },
    { Desire: 0, Fear: 0, Identity: 0 },
  );

  const topPattern = [...comments].sort((a, b) => b.frequency - a.frequency)[0];
  const topDesire = comments
    .filter((comment) => comment.type === "Desire")
    .sort((a, b) => b.frequency - a.frequency)[0];
  const topFear = comments
    .filter((comment) => comment.type === "Fear")
    .sort((a, b) => b.frequency - a.frequency)[0];
  const topIdentity = comments
    .filter((comment) => comment.type === "Identity")
    .sort((a, b) => b.frequency - a.frequency)[0];

  return {
    byType,
    topPattern,
    topDesire,
    topFear,
    topIdentity,
    totalSignals: comments.reduce((sum, comment) => sum + comment.frequency, 0),
  };
}
