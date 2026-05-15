# Being Hauwa AI Content OS

A Phase 1 MVP for an AI-powered personal content operating system for the Being Hauwa creator brand.

## What is included

- Dashboard overview for ideas, content modes, and saved brand data.
- Content brain dump with brand tags.
- Automatic TOFU / MOFU / BOFU classification.
- Hook, script, and repurposing generator.
- Viral pattern summary for strongest themes, hook style, and save pull.
- OpenAI Responses API route with a local mock fallback when no API key is set.
- Supabase client placeholder for persistence.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and add keys when ready.

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Without `OPENAI_API_KEY`, the app still runs using the built-in Being Hauwa mock generator.

## Deploy on Vercel

1. Push this project to GitHub.
2. In Vercel, create a new project and import the repository.
3. Use the default Next.js settings. This repo includes `vercel.json` with the install, build, and dev commands.
4. Add these environment variables in Vercel Project Settings:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Only `OPENAI_API_KEY` is required for live AI generation. Supabase keys are optional until persistence is connected.

## Vercel routes to preview

```text
/
/hooks/library
/classifier
/analyzer
/repurpose
/tone-check
/audience
/memory
/training
/voice
/database
```

## Suggested Supabase schema

```sql
create table content_ideas (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  tags text[] not null default '{}',
  funnel_stage text not null check (funnel_stage in ('TOFU', 'MOFU', 'BOFU')),
  views integer not null default 0,
  saves integer not null default 0,
  comments integer not null default 0,
  retention integer not null default 0,
  created_at timestamptz not null default now()
);
```

## Next steps

1. Persist ideas to Supabase instead of local React state.
2. Add auth for the creator workspace.
3. Add CSV import for TikTok analytics.
4. Turn pattern tracking into weekly recommendations.
