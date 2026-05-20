export const widgetCatalog = {
  'campaign-performance': 'Active marketing campaigns with their click-through rates.',
  'email-open-rate': 'Headline email open rate vs. previous week.',
  'social-engagement': 'Follower count and most recent post engagement.',
  'active-users': 'Daily active users with a 7-day trend.',
  'conversion-funnel': 'Funnel from visit → signup → active → paid.',
  'revenue-summary': 'MRR and ARR with month-over-month change.',
  'open-prs': 'Open pull requests awaiting review.',
  'build-status': 'CI pass/fail for the most recent commits.',
  'weekly-goals': 'This week\'s goals with completion state.',
  'team-activity': 'Recent activity from teammates.'
} as const

export type WidgetId = keyof typeof widgetCatalog
export const widgetIds = Object.keys(widgetCatalog) as WidgetId[]
