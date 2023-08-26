<template>
  <div class="header">
    <game-info-window :value="gameStore.timer.time" />
    <game-button @click="gameStore.$reset">
      <template v-slot:icon><restart-logo /></template>
    </game-button>
    <router-link to="/settings">
      <game-button>
        <template v-slot:icon><settings-logo /></template>
      </game-button>
    </router-link>

    <game-info-window class="mines" :value="gameStore.settings.countMines - gameStore.flags" />
  </div>
</template>

<script setup lang="ts">
import GameInfoWindow from '@/components/game-info-window.vue'
import { useGameStore } from '@/stores/Game'
import GameButton from '@/components/game-button.vue'
import RestartLogo from '@/assets/restart.svg'
import SettingsLogo from '@/assets/settings.svg'
const gameStore = useGameStore()
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 50px;
  background-color: #eeeeee;
  padding: 5px;
}
.mines {
  margin-left: auto;
}
</style>
@/stores/game-store
