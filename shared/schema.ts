import { z } from 'zod'
import { widgetIds, type WidgetId } from '~/data/widgets'

export const dashboardSchema = z.object({
  greeting: z.string().describe('A short, friendly greeting (max 12 words) referencing the role and day.'),
  widgets: z.array(
    z.object({
      id: z.enum(widgetIds as [WidgetId, ...WidgetId[]])
    })
  ).describe('5 to 7 widget IDs in the order they should appear on the dashboard.')
})

export type Dashboard = z.infer<typeof dashboardSchema>
