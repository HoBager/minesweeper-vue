<template>
  <div
    class="game"
    :class="{
      smal: gameStore.settings.name === DifficultyNames.Easy,
      medium: gameStore.settings.name === DifficultyNames.Medium
    }"
  >
    <game-header />
    <game-body />
    <result-modal-vue
      :result="gameStore.status"
      @close-modal="modalIsOpen = false"
      :is-open="modalIsOpen"
    />
  </div>
</template>

<script setup lang="ts">
import gameBody from '@/components/game-body.vue'
import GameHeader from '@/components/game-header.vue'
import resultModalVue from '@/components/result-modal.vue'
import { DifficultyNames, GameStatus, useGameStore } from '@/stores/Game'
import { ref, watch } from 'vue'
const gameStore = useGameStore()
const modalIsOpen = ref<boolean>(false)

watch(
  () => gameStore.status,
  () => {
    if (gameStore.status === GameStatus.Lose) {
      modalIsOpen.value = true
    } else if (gameStore.status === GameStatus.Win) {
      modalIsOpen.value = true
    }
  }
)
</script>

<style scoped>
.game {
  border-radius: 3px;
  border: 2px solid #999999;
}

@media (max-width: 992px) {
  .game {
    margin: 0 auto;
  }

  .smal {
    max-width: 275px;
  }

  .medium {
    max-width: 546px;
  }
}
</style>
