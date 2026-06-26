# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Dashy is a generative-UI demo built for a "Frontend Nation" workshop. An LLM (Claude Haiku via Vercel AI SDK) selects 5–7 widgets from a fixed catalog based on user role and day of week, returning structured JSON that the Vue frontend renders dynamically.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build
npm run preview      # Preview production build
```

Requires `ANTHROPIC_API_KEY` in `.env` (copy from `.env.example`).

## Architecture

**Data flow:**
1. `pages/index.vue` — user picks role + day, POSTs to `/api/dashboard`
2. `server/api/dashboard.post.ts` — builds prompt with widget catalog, calls `generateObject()` with Zod schema, returns `{ greeting, widgets: [{id}] }`
3. `pages/index.vue` — maps widget IDs → Vue components via `widgetMap`, renders via `<component :is="widgetMap[id]" />`

**Key files:**
- `shared/schema.ts` — Zod schema that defines the dashboard structure; both server and client import from here
- `data/widgets.ts` — source-of-truth widget catalog (IDs + descriptions fed to the LLM prompt)
- `data/user.ts` — `Role` and `Day` types; default user values
- `server/api/dashboard.post.ts` — the only place that touches the Anthropic SDK
- `components/WidgetCard.vue` — shared wrapper all widgets use (title, accent color, loading state)
- `components/widgets/` — 10 individual widget components, all with mock/static data

**Adding a widget** requires three steps: add an entry to `data/widgets.ts` (so the LLM knows it exists), create `components/widgets/YourWidget.vue`, and add it to the `widgetMap` in `pages/index.vue`.

**Swapping LLM providers** only requires changing the import and client in `server/api/dashboard.post.ts`; the Zod schema and prompt logic stay the same.
