import type { FunnelStage } from "@/lib/brand";

export type TrafficSource = {
  forYou: number;
  search: number;
  profile: number;
  following: number;
};

export type TikTokFormat = "Photo carousel" | "Talking head" | "Mini vlog" | "Text-on-screen";

export type StrategyCategory =
  | "Freelancer survival"
  | "Emotional educational carousel"
  | "Broad TOFU identity"
  | "Lifestyle escapism";

export type TikTokPostAnalytics = {
  id: number;
  title: string;
  hook: string;
  caption: string;
  format: TikTokFormat;
  category: StrategyCategory;
  funnelStage: FunnelStage;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  newFollowers: number;
  photosViewed?: string;
  trafficSource: TrafficSource;
  insight: string;
};

export const weeklyTikTokAnalytics = {
  postViews: 22000,
  profileViews: 162,
  likes: 1016,
  comments: 38,
  shares: 64,
  trafficSource: {
    forYou: 85.8,
    search: 11.8,
    profile: 1.8,
    following: 0.6,
  },
};

export const realTikTokPosts: TikTokPostAnalytics[] = [
  {
    id: 1,
    title: "How to know if a client is going to be a nightmare before you say yes",
    hook: "How to know if a client is going to be a nightmare before you say yes",
    caption: "Freelancer red flags to look out for during discovery calls",
    format: "Photo carousel",
    category: "Freelancer survival",
    funnelStage: "MOFU",
    views: 2418,
    likes: 76,
    comments: 4,
    shares: 5,
    saves: 22,
    newFollowers: 2,
    photosViewed: "2.2/8",
    trafficSource: weeklyTikTokAnalytics.trafficSource,
    insight:
      "Pain-based, practical, searchable, and anxiety-relieving. It helps freelancers avoid a specific mistake before it costs them.",
  },
  {
    id: 2,
    title: "Mistakes I Made In My First Year of Freelancing",
    hook: "Talented people fail at freelancing every day and it has nothing to do with their skill.",
    caption:
      "It's the stuff nobody sits you down and explains before you start...",
    format: "Photo carousel",
    category: "Emotional educational carousel",
    funnelStage: "MOFU",
    views: 1647,
    likes: 98,
    comments: 3,
    shares: 2,
    saves: 36,
    newFollowers: 10,
    photosViewed: "2.7/9",
    trafficSource: weeklyTikTokAnalytics.trafficSource,
    insight:
      "Follower-converting because it combines vulnerability, authority, storytelling, mentorship, realism, and practical freelancer wisdom.",
  },
  {
    id: 3,
    title: "Why I stopped glorifying being busy",
    hook: "I realized most productivity advice completely falls apart once you're mentally overwhelmed.",
    caption:
      "Realistic productivity for ambitious women who are trying to build without burning out.",
    format: "Text-on-screen",
    category: "Broad TOFU identity",
    funnelStage: "TOFU",
    views: 1320,
    likes: 74,
    comments: 5,
    shares: 9,
    saves: 28,
    newFollowers: 4,
    trafficSource: weeklyTikTokAnalytics.trafficSource,
    insight:
      "Works as TOFU because it sounds like a person, not a lesson. It names a familiar emotional tension.",
  },
  {
    id: 4,
    title: "My favorite remote work cafes in Abuja",
    hook: "I romanticize working in cafes way too much.",
    caption:
      "A tiny Abuja remote work day because I am trying to make my life feel less chaotic.",
    format: "Mini vlog",
    category: "Lifestyle escapism",
    funnelStage: "TOFU",
    views: 890,
    likes: 41,
    comments: 2,
    shares: 3,
    saves: 11,
    newFollowers: 1,
    trafficSource: weeklyTikTokAnalytics.trafficSource,
    insight:
      "Builds personality and aspiration, but needs a sharper emotional hook to convert beyond lifestyle interest.",
  },
];

export function getSaveRate(post: TikTokPostAnalytics) {
  return post.views ? (post.saves / post.views) * 100 : 0;
}

export function getFollowerConversionRate(post: TikTokPostAnalytics) {
  return post.views ? (post.newFollowers / post.views) * 100 : 0;
}

export function identifyPostRole(post: TikTokPostAnalytics) {
  const saveRate = getSaveRate(post);
  const followerRate = getFollowerConversionRate(post);

  if (followerRate >= 0.45) return "Follower converter";
  if (saveRate >= 1.5) return "Save driver";
  if (post.trafficSource.forYou >= 80 && post.views >= 1800) return "Reach driver";
  return "Needs stronger framing";
}

export function explainPostPerformance(post: TikTokPostAnalytics) {
  const role = identifyPostRole(post);
  const saveRate = getSaveRate(post);
  const followerRate = getFollowerConversionRate(post);

  if (role === "Follower converter") {
    return "This is converting because it feels like big-sister freelancer mentorship: vulnerable, specific, realistic, and useful enough to make people want more.";
  }

  if (role === "Save driver") {
    return "This is saving well because it solves an anxiety or decision point people expect to return to later.";
  }

  if (role === "Reach driver") {
    return "This is reaching because the hook is broad enough for For You discovery while still tied to a strong identity or pain point.";
  }

  if (saveRate < 1 && followerRate < 0.2) {
    return "This likely needs more emotional tension, a clearer pain point, or a stronger first-line promise.";
  }

  return "This has a usable signal, but the hook and payoff need a cleaner relationship.";
}

export function suggestStrongerHooks(post: TikTokPostAnalytics) {
  const patterns = [
    "How to know if...",
    "Mistakes I made...",
    "Talented people fail at...",
    "Before you start...",
    "Nobody tells you...",
    "I wish I knew...",
    "If you're serious about...",
    "The part of freelancing nobody prepares you for...",
    "The older I get, the more I realize...",
    "I genuinely think...",
  ];

  if (post.category === "Freelancer survival") {
    return [
      `How to know if ${post.title.toLowerCase().replace(/^how to know if /, "")}`,
      "The part of freelancing nobody prepares you for is how much bad clients can drain you.",
      "Before you say yes to a client, please look for this.",
    ];
  }

  if (post.category === "Emotional educational carousel") {
    return [
      "Talented people fail at freelancing every day and it has nothing to do with talent.",
      "Mistakes I made in my first year of freelancing that nobody warned me about.",
      "I wish I knew this before I tried to freelance full time.",
    ];
  }

  if (post.category === "Lifestyle escapism") {
    return [
      "I romanticize working in cafes because normal work culture genuinely stresses me out.",
      "The older I get, the more I understand why women want remote work so badly.",
      "I do not think I want luxury as much as I want control over my day.",
    ];
  }

  return patterns.slice(0, 3);
}

export function summarizeTikTokStrategy(posts: TikTokPostAnalytics[]) {
  const bestFollowerPost = [...posts].sort(
    (a, b) => getFollowerConversionRate(b) - getFollowerConversionRate(a),
  )[0];
  const bestSavePost = [...posts].sort((a, b) => getSaveRate(b) - getSaveRate(a))[0];
  const bestReachPost = [...posts].sort((a, b) => b.views - a.views)[0];

  return {
    bestFollowerPost,
    bestSavePost,
    bestReachPost,
    doubleDown: [
      "Freelancer survival content: red flags, mistakes, payment systems, bad advice, and beginner warnings.",
      "Emotional educational carousels with 'I learned this the hard way' energy.",
      "Broad TOFU identity content around freedom, online income, realistic productivity, and women wanting independence.",
      "Lifestyle/escapism content only when the hook has emotional tension, not just a day-in-the-life frame.",
    ],
  };
}
