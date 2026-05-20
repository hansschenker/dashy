<script setup lang="ts">
const bars = [40, 55, 48, 62, 70, 58, 75]
</script>

<template>
  <WidgetCard title="Active Users" accent="blue">
    <div class="flex items-baseline gap-2">
      <span class="text-3xl font-semibold tracking-tight text-zinc-900">8,492</span>
      <span class="text-xs font-medium text-emerald-600">+12%</span>
    </div>
    <div class="mt-4 flex h-16 items-end gap-1">
      <div
        v-for="(h, i) in bars"
        :key="i"
        class="w-full rounded-sm bg-blue-500/80"
        :style="{ height: h + '%' }"
      />
    </div>
  </WidgetCard>
</template>
