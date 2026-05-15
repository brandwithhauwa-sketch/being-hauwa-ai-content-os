import { classifyFunnelStage, suggestTags } from "@/lib/brand";

export type RepurposedContent = {
  stage: ReturnType<typeof classifyFunnelStage>;
  tags: ReturnType<typeof suggestTags>;
  tiktok: string;
  carousel: string[];
  linkedIn: string;
  vlogNarration: string;
  blog: {
    title: string;
    intro: string;
    sections: Array<{ heading: string; body: string }>;
  };
  caption: string;
};

export function repurposeIdea(idea: string): RepurposedContent {
  const cleanIdea = idea.trim() || "freedom is the real luxury";
  const lowerIdea = cleanIdea.toLowerCase();

  return {
    stage: classifyFunnelStage(cleanIdea),
    tags: suggestTags(cleanIdea),
    tiktok: `Hook: The older I get, the more I realize ${lowerIdea} is really about freedom.

Body: Not even in a dramatic way. I just think a lot of us are tired of feeling like our whole life is built around survival. We want options. We want flexibility. We want to make money from our skills and still have enough energy to exist outside of work.

Close: And I do not fully have it all figured out yet, but I think that is what I have been chasing this whole time. Not just success. Freedom.`,
    carousel: [
      `Slide 1: The older I get, the more I realize ${lowerIdea} is about freedom.`,
      "Slide 2: Freedom to choose what your day looks like.",
      "Slide 3: Freedom to make money from your skills.",
      "Slide 4: Freedom to be ambitious without living in survival mode.",
      "Slide 5: Freedom to have too many interests and still build a real life.",
      "Slide 6: I used to think I wanted success. Now I think I wanted options.",
      "Slide 7: What would your life look like if you had more room to breathe?",
    ],
    linkedIn: `I have been thinking about ${lowerIdea}.

The older I get, the more I realize a lot of ambition is really a desire for options.

People do not just want to make money online because entrepreneurship is trendy.

They want flexibility.
They want control over their time.
They want to stop feeling trapped in one version of their life.

That is why freedom-based content resonates so deeply.

It is not just about work. It is about identity, lifestyle, and the kind of adulthood people are trying to build.`,
    vlogNarration: `Lately I have been thinking about ${lowerIdea}. And I think what feels so emotional about it is that it is not just about productivity or making more money. It is about wanting your life to feel like it finally has space inside it. Like working from a cafe on a random weekday, taking a walk when your brain feels foggy, or having options that do not depend on one job, one client, or one version of you.`,
    blog: {
      title: `What I Am Learning About ${toTitleCase(cleanIdea)}`,
      intro: `I keep coming back to this idea of ${lowerIdea}, because I do not think it is as simple as wanting a better routine or a more productive life. I think for a lot of women, it is connected to freedom, identity, and the quiet desire to stop living in survival mode.`,
      sections: [
        {
          heading: "The emotional layer",
          body: "Before there is a strategy, there is usually a feeling. The feeling of being tired of chaos, tired of guessing, or tired of wanting more without knowing where to place that desire.",
        },
        {
          heading: "The practical shift",
          body: "What helps is not always a bigger plan. Sometimes it is a smaller system: one place to put ideas, one rhythm for creating, one repeatable way to return to yourself.",
        },
        {
          heading: "The deeper realization",
          body: "Soft ambition still needs structure. Not the harsh kind that makes life feel like a punishment, but the kind that makes freedom easier to hold.",
        },
      ],
    },
    caption: `I am learning that ${lowerIdea} is not just a goal. Sometimes it is the quiet desire to have more room to breathe, think, create, and become yourself without constantly starting over.`,
  };
}

function toTitleCase(value: string) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
