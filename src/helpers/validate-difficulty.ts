import type { Settings } from '@/stores/Game'

export function validateDifficulty(difficulty: Settings) {
  if (difficulty.width < 8) {
    difficulty.width = 8
  } else if (difficulty.width > 50) {
    difficulty.width = 50
  }
  if (difficulty.height < 8) {
    difficulty.height = 8
  } else if (difficulty.height > 50) {
    difficulty.width = 50
  }
  const countCells = difficulty.width * difficulty.height
  const maximumMines = Math.floor(countCells / 3)
  if (difficulty.countMines > maximumMines) {
    difficulty.countMines = maximumMines
  }
  console.log(difficulty)
  return difficulty
}
