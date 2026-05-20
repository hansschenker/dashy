export type Role = 'marketing' | 'analytics' | 'dev'
export type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'

export const user = {
  name: 'Alex',
  role: 'marketing' as Role,
  day: 'monday' as Day
}

export const roles: Role[] = ['marketing', 'analytics', 'dev']
export const days: Day[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
