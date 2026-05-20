import { createAnthropic } from '@ai-sdk/anthropic'
import { generateObject } from 'ai'
import { dashboardSchema } from '~/shared/schema'
import { widgetCatalog } from '~/data/widgets'

const catalog = Object.entries(widgetCatalog)
  .map(([id, description]) => `- ${id}: ${description}`)
  .join('\n')

const system = `
You design dashboards by picking widgets from a catalog.

Pick 5 to 7 widgets, in the order they should appear.

Catalog:
${catalog}

Guidelines:
- Role: marketing → campaigns, email, social. analytics → users, funnel, revenue. dev → PRs, builds.
- Day: monday → planning (weekly-goals high). friday → review (team-activity high). mid-week → operational.
- weekly-goals and team-activity are universal — great for mondays and fridays respectively.
`.trim()

export default defineEventHandler(async (event) => {
  const { name, role, day } = await readBody(event)
  const { anthropicApiKey } = useRuntimeConfig()

  const anthropic = createAnthropic({ apiKey: anthropicApiKey })

  const { object } = await generateObject({
    model: anthropic('claude-haiku-4-5-20251001'),
    schema: dashboardSchema,
    system,
    prompt: `Design a dashboard for ${name}, a ${role} person. Today is ${day}.`
  })

  return object
})
