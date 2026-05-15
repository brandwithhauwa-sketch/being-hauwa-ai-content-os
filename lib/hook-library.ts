import type { FunnelStage } from "@/lib/brand";
import type { EmotionalPattern } from "@/lib/content-memory";

export type HookLibraryItem = {
  id: number;
  hook: string;
  trigger: EmotionalPattern;
  stage: FunnelStage;
  style: "realization" | "confession" | "contrast" | "how I would" | "identity" | "lifestyle";
  useCase: string;
};

export const hookLibrary: HookLibraryItem[] = [
  {
    id: 1,
    hook: "The older I get, the more I realize freedom is the real luxury.",
    trigger: "freedom longing",
    stage: "TOFU",
    style: "realization",
    useCase: "Lifestyle or identity-led opener",
  },
  {
    id: 2,
    hook: "I think people underestimate how life changing clarity is.",
    trigger: "clarity relief",
    stage: "TOFU",
    style: "realization",
    useCase: "Reflective personal growth post",
  },
  {
    id: 3,
    hook: "Nobody tells you how emotional it is to want a softer life and more money.",
    trigger: "soft ambition",
    stage: "TOFU",
    style: "confession",
    useCase: "Soft life plus ambition angle",
  },
  {
    id: 4,
    hook: "How I would rebuild my life online if I was starting from zero.",
    trigger: "reinvention tension",
    stage: "TOFU",
    style: "how I would",
    useCase: "Identity-led online income and reinvention opener",
  },
  {
    id: 5,
    hook: "I used to think I needed motivation, but I actually needed a system.",
    trigger: "creative self-trust",
    stage: "MOFU",
    style: "contrast",
    useCase: "Productivity systems explainer",
  },
  {
    id: 6,
    hook: "If your life feels scattered, your content system probably feels scattered too.",
    trigger: "survival fatigue",
    stage: "TOFU",
    style: "identity",
    useCase: "Realistic productivity for overwhelmed ambitious women",
  },
  {
    id: 10,
    hook: "I think freelancing ruined normal jobs for me.",
    trigger: "freedom longing",
    stage: "TOFU",
    style: "confession",
    useCase: "Freelancing as lifestyle identity, not a tutorial",
  },
  {
    id: 11,
    hook: "I romanticize working in cafes way too much.",
    trigger: "freedom longing",
    stage: "TOFU",
    style: "lifestyle",
    useCase: "Remote work romance and lifestyle design",
  },
  {
    id: 12,
    hook: "I accidentally turned my iPad into my entire business.",
    trigger: "soft ambition",
    stage: "TOFU",
    style: "confession",
    useCase: "Aesthetic online business/lifestyle proof",
  },
  {
    id: 13,
    hook: "I have too many interests to live a normal life.",
    trigger: "reinvention tension",
    stage: "TOFU",
    style: "identity",
    useCase: "Multi-passionate identity content",
  },
  {
    id: 14,
    hook: "I genuinely don't understand how people survive with one income stream anymore.",
    trigger: "survival fatigue",
    stage: "TOFU",
    style: "realization",
    useCase: "Online income and financial survival observation",
  },
  {
    id: 15,
    hook: "Realizing the internet rewards visibility more than talent was genuinely life changing for me.",
    trigger: "clarity relief",
    stage: "TOFU",
    style: "realization",
    useCase: "Modern work culture observation",
  },
  {
    id: 16,
    hook: "How to know if a client is going to be a nightmare before you say yes.",
    trigger: "survival fatigue",
    stage: "MOFU",
    style: "how I would",
    useCase: "Freelancer survival, client red flags, searchable anxiety relief",
  },
  {
    id: 17,
    hook: "Talented people fail at freelancing every day and it has nothing to do with their skill.",
    trigger: "clarity relief",
    stage: "MOFU",
    style: "contrast",
    useCase: "Follower-converting emotional educational carousel",
  },
  {
    id: 18,
    hook: "The part of freelancing nobody prepares you for is how much the wrong clients can drain you.",
    trigger: "survival fatigue",
    stage: "MOFU",
    style: "confession",
    useCase: "Big-sister freelancer truth and authority content",
  },
  {
    id: 19,
    hook: "Before you start freelancing full time, please understand how money actually moves.",
    trigger: "soft ambition",
    stage: "MOFU",
    style: "realization",
    useCase: "Payment systems, foreign clients, and beginner preparation",
  },
  {
    id: 7,
    hook: "I made this planner for the version of me who wanted structure without pressure.",
    trigger: "clarity relief",
    stage: "BOFU",
    style: "confession",
    useCase: "Planner or template offer",
  },
  {
    id: 8,
    hook: "This is for the woman who wants her ambition to feel softer, not smaller.",
    trigger: "soft ambition",
    stage: "BOFU",
    style: "identity",
    useCase: "Product, service, or community pitch",
  },
  {
    id: 9,
    hook: "If you keep abandoning your ideas, you may not need more ideas. You may need a repeatable system.",
    trigger: "creative self-trust",
    stage: "BOFU",
    style: "contrast",
    useCase: "Consulting or content system offer",
  },
];
