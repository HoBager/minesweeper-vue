<template>
  <div class="window__body">{{ contentNumber }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ value: number }>()

const contentNumber = computed(() => {
  if (props.value > 999) {
    return '999'
  }
  return ('000' + props.value).slice(-3)
})
</script>

<style scoped>
.window__body {
  height: 32px;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 4px 6px;
  border-radius: 3px;
  background-color: #aaa;
  border: 2px solid #222;
  cursor: default;
}
</style>
