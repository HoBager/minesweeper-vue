<template>
  <div class="settings">
    <settings-difficulty @difficulty-change="changeDifficulty" :difficulty="gameStore.settings" />
    <nav class="navigation">
      <router-link to="/">
        <game-button-vue>
          <template v-slot:icon><play-icon /></template>
        </game-button-vue>
      </router-link>
      <router-link to="/top">
        <game-button-vue>
          <template v-slot:icon><cup-icon /></template>
        </game-button-vue>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import gameButtonVue from '@/components/game-button.vue'
import settingsDifficulty from '@/components/settings-difficulty.vue'
import { useGameStore, type Settings } from '@/stores/Game'
import PlayIcon from '@/assets/play.svg'
import CupIcon from '@/assets/cup.svg'
const gameStore = useGameStore()

function changeDifficulty(difficulty: Settings) {
  gameStore.$patch({
    settings: difficulty
  })
}
</script>

<style scoped>
.settings {
  min-width: 240px;
  min-height: 400px;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #999999;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.navigation {
  display: flex;
  justify-content: space-between;
}
</style>
