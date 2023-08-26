import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface Record {
  playerName: string
  time: number
}

const MOCK_STATS = [
  { playerName: 'RandomPlayer1', time: 999 },
  { playerName: 'RandomPlayer2', time: 900 },
  { playerName: 'RandomPlayer3', time: 899 },
  { playerName: 'RandomPlayer3', time: 700 },
  { playerName: 'RandomPlayer4', time: 799 },
  { playerName: 'RandomPlayer5', time: 600 },
  { playerName: 'RandomPlayer6', time: 599 },
  { playerName: 'RandomPlayer7', time: 500 },
  { playerName: 'RandomPlayer8', time: 659 }
]

export const useStatsStore = defineStore('stats', () => {
  const stats = ref<Record[]>(MOCK_STATS)
  const top = computed(() => {
    return [...stats.value].sort((a, b) => a.time - b.time).slice(0, 10)
  })
  function addNewRecord(record: Record) {
    stats.value.push(record)
  }
  return { stats, top, addNewRecord }
})
