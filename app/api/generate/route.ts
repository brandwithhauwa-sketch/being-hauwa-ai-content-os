import { NextResponse } from "next/server";
import { buildBrandVoicePrompt, classifyFunnelStage, suggestTags } from "@/lib/brand";
import { generateMockContent, type GenerationMode } from "@/lib/mock-ai";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    idea?: string;
    mode?: GenerationMode;
  };

  const idea = body.idea?.trim() || "";
  const mode = body.mode || "script";

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      source: "mock",
      ...generateMockContent(idea, mode),
    });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      instructions: `You write for Being Hauwa.\n${buildBrandVoicePrompt()}\nReturn concise, emotionally reflective content that sounds like a smart friend thinking out loud in a voice note. Prefer observations, realizations, and gentle honesty over teaching.`,
      input: `Idea: ${idea}
Mode: ${mode}
Create output for this mode.
If mode is script, include:
- TikTok script with Hook, Body, Close
- carousel angle
- vlog narration
- LinkedIn post
- caption
- 5 hook variations

The script should feel reflective and conversational, not educational first. Use lines like "I think", "lately I am realizing", "honestly", and "the older I get" where natural. Do not use generic advice phrases like "here are three tips", "unlock your potential", "level up", or "you need to".

For hooks, return 6 emotionally specific hook variations.
For repurpose, convert the idea across TikTok, carousel, LinkedIn, blog, and caption in the same reflective voice.`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({
      source: "mock",
      ...generateMockContent(idea, mode),
    });
  }

  const data = (await response.json()) as { output_text?: string };

  return NextResponse.json({
    source: "openai",
    stage: classifyFunnelStage(idea),
    tags: suggestTags(idea),
    output: data.output_text || generateMockContent(idea, mode).output,
  });
}
