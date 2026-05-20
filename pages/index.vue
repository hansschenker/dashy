<script setup lang="ts">
import { user, roles, days, type Role, type Day } from '~/data/user'
import { type WidgetId } from '~/data/widgets'
import type { Dashboard } from '~/shared/schema'

import CampaignPerformance from '~/components/widgets/CampaignPerformance.vue'
import EmailOpenRate from '~/components/widgets/EmailOpenRate.vue'
import SocialEngagement from '~/components/widgets/SocialEngagement.vue'
import ActiveUsers from '~/components/widgets/ActiveUsers.vue'
import ConversionFunnel from '~/components/widgets/ConversionFunnel.vue'
import RevenueSummary from '~/components/widgets/RevenueSummary.vue'
import OpenPRs from '~/components/widgets/OpenPRs.vue'
import BuildStatus from '~/components/widgets/BuildStatus.vue'
import WeeklyGoals from '~/components/widgets/WeeklyGoals.vue'
import TeamActivity from '~/components/widgets/TeamActivity.vue'

const widgetMap: Record<WidgetId, Component> = {
  'campaign-performance': CampaignPerformance,
  'email-open-rate': EmailOpenRate,
  'social-engagement': SocialEngagement,
  'active-users': ActiveUsers,
  'conversion-funnel': ConversionFunnel,
  'revenue-summary': RevenueSummary,
  'open-prs': OpenPRs,
  'build-status': BuildStatus,
  'weekly-goals': WeeklyGoals,
  'team-activity': TeamActivity
}

const selectedRole = ref<Role>(user.role)
const selectedDay = ref<Day>(user.day)

const dashboard = ref<Dashboard | null>(null)
const isLoading = ref(false)

const COLUMN_COUNT = 3

const columns = computed(() => {
  const cols: Dashboard['widgets'][] = Array.from({ length: COLUMN_COUNT }, () => [])
  const widgets = dashboard.value?.widgets ?? []
  widgets.forEach((widget, index) => cols[index % COLUMN_COUNT].push(widget))
  return cols
})

async function generate() {
  isLoading.value = true
  dashboard.value = null

  dashboard.value = await $fetch<Dashboard>('/api/dashboard', {
    method: 'POST',
    body: { name: user.name, role: selectedRole.value, day: selectedDay.value }
  })

  isLoading.value = false
}

onMounted(generate)
</script>

<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
    <div class="border-b border-zinc-200">
      <div class="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-3 text-sm">
        <div class="flex items-center gap-3">
          <span class="text-xs uppercase tracking-[0.18em] text-zinc-400">Role</span>
          <div class="flex items-center gap-0.5 rounded-md bg-zinc-100 p-0.5">
            <button
              v-for="role in roles"
              :key="role"
              class="rounded px-2.5 py-1 text-xs capitalize transition"
              :class="selectedRole === role
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'"
              @click="selectedRole = role"
            >
              {{ role }}
            </button>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-xs uppercase tracking-[0.18em] text-zinc-400">Day</span>
          <div class="flex items-center gap-0.5 rounded-md bg-zinc-100 p-0.5">
            <button
              v-for="day in days"
              :key="day"
              class="rounded px-2.5 py-1 text-xs capitalize transition"
              :class="selectedDay === day
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'"
              @click="selectedDay = day"
            >
              {{ day.slice(0, 3) }}
            </button>
          </div>
        </div>

        <button
          :disabled="isLoading"
          class="ml-auto min-w-28 rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
          @click="generate"
        >
          {{ isLoading ? 'Generating…' : 'Regenerate' }}
        </button>
      </div>
    </div>

    <div class="mx-auto max-w-5xl px-6 py-16">
      <div class="flex items-center gap-2">
        <span class="size-1.5 rounded-full bg-zinc-900" />
        <span class="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Dashboard</span>
      </div>

      <h1 class="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">
        <template v-if="dashboard?.greeting">{{ dashboard.greeting }}</template>
        <span v-else class="inline-block h-9 w-2/3 animate-pulse rounded bg-zinc-200 align-middle" />
      </h1>
      <p class="mt-3 text-base text-zinc-500">
        A generative UI demo. The layout adapts to role and day of week.
      </p>

      <div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <template v-if="dashboard">
          <div
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            class="flex flex-col gap-4"
          >
            <component
              v-for="(widget, widgetIndex) in column"
              :is="widgetMap[widget.id]"
              :key="widgetIndex"
            />
          </div>
        </template>

        <template v-else>
          <div v-for="columnIndex in COLUMN_COUNT" :key="columnIndex" class="flex flex-col gap-4">
            <WidgetCard v-for="placeholderIndex in 2" :key="placeholderIndex" loading />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
