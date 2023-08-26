<template>
  <div class="top">
    <ul class="top__list">
      <li class="player" v-for="record of statsStore.top" :key="record.playerName + record.time">
        <top-player :record="record" />
      </li>
    </ul>
    <nav class="navigation">
      <router-link to="/">
        <game-button>
          <template v-slot:icon><play-icon /></template>
        </game-button>
      </router-link>
      <router-link to="/settings">
        <game-button>
          <template v-slot:icon><settings-icon /></template>
        </game-button>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import topPlayer from '@/components/top-player.vue'
import { useStatsStore } from '@/stores/Stats'
import gameButton from '@/components/game-button.vue'
import PlayIcon from '@/assets/play.svg'
import SettingsIcon from '@/assets/settings.svg'
const statsStore = useStatsStore()
</script>

<style scoped>
.top {
  min-width: 320px;
  height: 400px;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #999999;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top__list {
  overflow-y: auto;
}
.player {
  list-style: decimal;
}
.navigation {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 992px) {
  .top {
    min-width: unset;
  }
}
</style>
