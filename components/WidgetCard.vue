<script setup lang="ts">
defineProps<{
  title?: string
  accent?: 'gray' | 'green' | 'blue' | 'orange' | 'purple'
  loading?: boolean
}>()

const dotClasses: Record<string, string> = {
  gray: 'bg-zinc-400',
  green: 'bg-emerald-500',
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500'
}
</script>

<template>
  <div class="rounded-xl border border-zinc-200 bg-white p-6">
    <div class="flex items-center gap-2">
      <span class="size-1.5 shrink-0 rounded-full" :class="dotClasses[accent ?? 'gray']" />
      <span v-if="loading" class="block h-3 w-24 animate-pulse rounded bg-zinc-100" />
      <span v-else class="text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
        {{ title }}
      </span>
    </div>
    <div class="mt-4">
      <template v-if="loading">
        <div class="h-3 w-full animate-pulse rounded bg-zinc-100" />
        <div class="mt-2 h-3 w-4/5 animate-pulse rounded bg-zinc-100" />
      </template>
      <slot v-else />
    </div>
  </div>
</template>
