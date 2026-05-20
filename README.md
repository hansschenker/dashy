# Dashy

A small generative-UI demo built for the [Frontend Nation](https://frontendnation.com) workshop *"Generative UI: Building Apps That Compose Themselves."*

The app asks an LLM to design a personal dashboard for a given role and day of the week. The model picks 5–7 widgets from a fixed catalog and returns them as structured output (a Zod-validated object), which the Vue frontend then renders by mapping widget IDs to pre-built components.

Stack: [Nuxt 3](https://nuxt.com), [Vue 3](https://vuejs.org), [Vercel AI SDK](https://sdk.vercel.ai), [Anthropic Claude](https://www.anthropic.com), [Tailwind CSS](https://tailwindcss.com), [Zod](https://zod.dev).

## Getting started

You'll need Node 18+ and an Anthropic API key.

### 1. Install dependencies

```bash
npm install
```

### 2. Copy the example env file

```bash
cp .env.example .env
```

### 3. Add your API key

Open `.env` and set:

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Start the dev server

```bash
npm run dev
```

Open http://localhost:3000. Switch role and day of the week, click *Regenerate*, and watch the dashboard re-compose itself.

## Using a different model provider

The demo uses Anthropic's Claude via `@ai-sdk/anthropic`, but the Vercel AI SDK is provider-agnostic. Swapping to OpenAI (or any other supported provider) is a small change in two files.

### 1. Install the provider package

```bash
npm install @ai-sdk/openai
npm uninstall @ai-sdk/anthropic
```

### 2. Update `server/api/dashboard.post.ts`

Replace the Anthropic import and client with OpenAI:

```ts
import { createOpenAI } from '@ai-sdk/openai'
import { generateObject } from 'ai'

const openai = createOpenAI({ apiKey: openaiApiKey })

const { object } = await generateObject({
  model: openai('gpt-4o-mini'),
  schema: dashboardSchema,
  system,
  prompt: `Design a dashboard for ${name}, a ${role} person. Today is ${day}.`
})
```

### 3. Update env vars

In `.env`:

```
OPENAI_API_KEY=sk-...
```

In `nuxt.config.ts`, swap the runtime config key:

```ts
runtimeConfig: {
  openaiApiKey: process.env.OPENAI_API_KEY
}
```

That's it. Everything else (the schema, the widget catalog, the frontend) stays the same. The AI SDK normalizes structured-output calls across providers, so `generateObject` with a Zod schema works identically.

Other providers (Google, Mistral, Groq, local models via Ollama, etc.) follow the same pattern. Install the relevant `@ai-sdk/*` package and swap the client constructor. See the [AI SDK providers docs](https://sdk.vercel.ai/providers/ai-sdk-providers) for the full list.
