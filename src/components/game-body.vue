<template>
  <div
    @click="gameStore.startTimer"
    :class="{
      win: gameStore.status === GameStatus.Win,
      lose: gameStore.status === GameStatus.Lose
    }"
    class="game__body"
  >
    <div class="row" v-for="(row, index) of gameStore.field" :key="index">
      <game-cell
        @change-close-status="changeCloseStatus"
        @open="openCellHandler"
        :body="cell"
        v-for="(cell, index) of row"
        :key="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameStatus } from '@/stores/Game'
import { useGameStore } from '@/stores/Game'
import GameCell from '@/components/game-cell.vue'
import { onMounted, watch } from 'vue'
import { useStatsStore } from '@/stores/Stats'
import { Cell, CloseStatuses } from '@/helpers/create-field'

const gameStore = useGameStore()
const statsStore = useStatsStore()

onMounted(() => {
  gameStore.$reset()
})
watch([() => gameStore.cellsRemain, () => gameStore.flagedMines], () => {
  const flagWin =
    gameStore.flagedMines === gameStore.settings.countMines &&
    gameStore.flags === gameStore.settings.countMines

  if (gameStore.cellsRemain === 0 || flagWin) {
    gameStore.win()
    statsStore.addNewRecord({ playerName: 'YOU', time: gameStore.timer.time })
  }
})

function changeCloseStatus(status: CloseStatuses) {
  if (status === CloseStatuses.Flag) {
    gameStore.$patch({
      flags: gameStore.flags + 1
    })
  } else if (status === CloseStatuses.Question) {
    gameStore.$patch({
      flags: gameStore.flags - 1
    })
  }
}

function openCellHandler(cell: Cell) {
  if (gameStore.status !== GameStatus.Continues) return

  if (cell.isBomb) {
    gameStore.lose()
    cell.openCell()
  } else if (cell.value === 0) {
    cell.openAround(gameStore.field)
  } else if (cell.value > 0) {
    cell.openCell()
  }
}
</script>

<style scoped>
.game__body {
  display: flex;
  flex-direction: column;
  background-color: #aaaaaa;
}
.row {
  display: flex;
}

.win {
  background-color: green;
}

.lose {
  background-color: red;
}

@media (max-width: 992px) {
  .game__body {
    max-width: 992px;
    max-height: 500px;
    overflow: auto;
    position: relative;
  }
}
</style>
