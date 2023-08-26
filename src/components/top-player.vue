<template>
  <div class="score">
    <span class="player__name">{{ `${props.record.playerName}:` }}</span>
    <span>{{ `${props.record.time}sec` }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Record } from '@/stores/Stats'

const props = defineProps<{ record: Record }>()
</script>

<style scoped>
.score {
  display: flex;
  gap: 5px;
}
.player__name {
  font-weight: bold;
}
</style>
