import { classifyFunnelStage, suggestTags } from "@/lib/brand";

export type GenerationMode = "script" | "hooks" | "repurpose";

export function generateMockContent(idea: string, mode: GenerationMode) {
  const cleanIdea = idea.trim() || "building a calmer online income system";
  const stage = classifyFunnelStage(cleanIdea);
  const tags = suggestTags(cleanIdea);

  if (mode === "hooks") {
    return {
      stage,
      tags,
      output: [
        `The older I get, the more I realize ${cleanIdea.toLowerCase()} is really about freedom.`,
        `I'm starting to realize ${cleanIdea.toLowerCase()} changes your standards for what a normal life should feel like.`,
        `I genuinely think ${cleanIdea.toLowerCase()} is one of those things people only understand when they are tired of survival mode.`,
        `I used to think ${cleanIdea.toLowerCase()} was about discipline, but now I think it is about wanting options.`,
        `I accidentally made ${cleanIdea.toLowerCase()} part of my entire personality at this point.`,
        `Nobody talks about how badly ambitious girls want ${cleanIdea.toLowerCase()} and peace at the same time.`,
      ].join("\n"),
    };
  }

  if (mode === "repurpose") {
    return {
      stage,
      tags,
      output: `TikTok: I keep thinking about ${cleanIdea.toLowerCase()} and how it is never just about the thing itself. It is usually about wanting more control over your time, your energy, and the kind of life you are building.

Carousel: Start with the emotional truth, then move through the tension, the small realization, the practical shift, and end with a question that feels like journaling.

LinkedIn: Frame it as a modern work culture observation. Not a lesson, more like: I am learning that the internet changed what freedom can look like for ambitious women.

Vlog narration: Lately I have been noticing how much lighter life feels when I stop waiting to feel motivated and start building small systems I can actually return to.

Caption: I am learning that clarity is not loud. Sometimes it is just finally knowing what to repeat without abandoning yourself.`,
    };
  }

  return {
    stage,
    tags,
    output: `TikTok Script

Hook:
The older I get, the more I realize ${cleanIdea.toLowerCase()} is really about freedom.

Body:
Not even in a dramatic way.
I just genuinely think being able to decide what your day looks like is one of the biggest flexes in the world now.

Like being able to work from a cafe on a random Tuesday.
Or take a walk in the middle of the day because your brain feels foggy.
Or build something from your skills without feeling trapped in one version of your life forever.

When I was younger, I thought success was supposed to look loud.
The title, the car, the perfect routine, the perfectly disciplined version of yourself.
But now I think a lot of us are not chasing status as much as we are chasing space.

Space to think.
Space to earn in more than one way.
Space to be multi-passionate without feeling scattered.
Space to rest without feeling like you are falling behind.

Close:
And I do not fully have it all figured out yet, but I think this is why online income and flexible work feel so emotional.
It is not just about work.
It is about wanting a life that finally feels like yours.`,
  };
}
