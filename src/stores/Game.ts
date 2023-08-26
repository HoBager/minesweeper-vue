import { createField, type Field, CloseStatuses } from '@/helpers/create-field'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface Settings {
  name: DifficultyNames
  width: number
  height: number
  countMines: number
}

interface Timer {
  stopKey: ReturnType<typeof setInterval> | undefined
  time: number
}

export enum GameStatus {
  Continues,
  Lose,
  Win
}

export enum DifficultyNames {
  Easy,
  Medium,
  Hard,
  Custom
}

export const DefaultLevels = {
  Easy: { name: DifficultyNames.Easy, width: 8, height: 8, countMines: 10 },
  Medium: { name: DifficultyNames.Medium, width: 16, height: 16, countMines: 40 },
  Hard: { name: DifficultyNames.Hard, width: 32, height: 16, countMines: 100 }
}

export const useGameStore = defineStore('Game', () => {
  const settings = ref<Settings>({
    name: DifficultyNames.Easy,
    width: 8,
    height: 8,
    countMines: 10
  })

  const field = ref<Field>(createField(settings.value))
  const timer = ref<Timer>({ stopKey: undefined, time: 0 })
  const status = ref<GameStatus>(GameStatus.Continues)
  const flags = ref<number>(0)

  const flagedMines = computed(() => {
    return field.value.reduce((result, row) => {
      return (
        result +
        row.reduce((rowResult, cell) => {
          return cell.closeStatus === CloseStatuses.Flag && cell.isBomb ? rowResult + 1 : rowResult
        }, 0)
      )
    }, 0)
  })

  const cellsRemain = computed(() => {
    return field.value.reduce((result, row) => {
      return (
        result +
        row.reduce((rowResult, cell) => {
          return !cell.open && !cell.isBomb ? rowResult + 1 : rowResult
        }, 0)
      )
    }, 0)
  })

  function startTimer() {
    if (!timer.value.stopKey && status.value !== GameStatus.Lose) {
      timer.value.stopKey = setInterval(() => timer.value.time++, 1000)
    }
  }

  function stopTimer() {
    clearInterval(timer.value.stopKey)
  }

  function $reset() {
    stopTimer()
    status.value = GameStatus.Continues
    timer.value.stopKey = undefined
    timer.value.time = 0
    flags.value = 0
    field.value = createField(settings.value)
  }

  function win() {
    stopTimer()
    status.value = GameStatus.Win
  }

  function lose() {
    stopTimer()
    status.value = GameStatus.Lose
  }
  return {
    field,
    settings,
    timer,
    status,
    cellsRemain,
    flagedMines,
    flags,
    startTimer,
    $reset,
    lose,
    win
  }
})
