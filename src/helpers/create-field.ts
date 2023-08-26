import type { Settings } from '@/stores/Game'
import { getRandomInt } from './get-random'

const MINE = -1

export type Field = Cell[][]

export function createField(settings: Settings) {
  const field = Array.from({ length: settings.height }, (_, y) =>
    Array.from({ length: settings.width }, (_, x) => new Cell(false, x, y))
  )
  const fieldWithMines = fillMines(field, settings.countMines)
  return fieldWithMines
}

function fillMines(field: Field, countMines: number) {
  const fieldWidth = field[0].length
  const fieldHeight = field.length

  while (countMines) {
    const x = getRandomInt(fieldWidth - 1, 0)
    const y = getRandomInt(fieldHeight - 1, 0)

    if (!field[y][x].isBomb) {
      field[y][x].isBomb = true
      updateElementsAround(field, x, y)
      countMines--
    }
  }
  return field
}

function updateElementsAround(field: Field, x: number, y: number) {
  const fieldWidth = field[0].length
  const fieldHeight = field.length

  for (let cellY = y - 1; cellY <= y + 1; cellY++) {
    for (let cellX = x - 1; cellX <= x + 1; cellX++) {
      const xIsValid = cellX >= 0 && cellX < fieldWidth
      const yIsValid = cellY >= 0 && cellY < fieldHeight

      if (xIsValid && yIsValid && field[cellY][cellX].value !== MINE) {
        field[cellY][cellX].value += 1
      }
    }
  }
}

export enum CloseStatuses {
  Empty,
  Flag,
  Question
}

export class Cell {
  value = 0
  open = false
  closeStatus: CloseStatuses = CloseStatuses.Empty
  isBomb: boolean
  coordinates: { x: number; y: number }

  constructor(isBomb = false, x: number, y: number) {
    this.isBomb = isBomb
    this.coordinates = { x, y }
  }

  changeStatus() {
    if (this.closeStatus === CloseStatuses.Empty) {
      this.closeStatus = CloseStatuses.Flag
    } else if (this.closeStatus === CloseStatuses.Flag) {
      this.closeStatus = CloseStatuses.Question
    } else {
      this.closeStatus = CloseStatuses.Empty
    }
  }

  setValue(newValue: number) {
    this.value = newValue
  }

  openCell() {
    this.open = true
  }

  openAround(field: Field) {
    const fieldWidth = field[0].length
    const fieldHeight = field.length
    this.openCell()

    for (let cellY = this.coordinates.y - 1; cellY <= this.coordinates.y + 1; cellY++) {
      for (let cellX = this.coordinates.x - 1; cellX <= this.coordinates.x + 1; cellX++) {
        const xIsValid = cellX >= 0 && cellX < fieldWidth
        const yIsValid = cellY >= 0 && cellY < fieldHeight
        const coordinatesIsValid = xIsValid && yIsValid

        if (!coordinatesIsValid || field[cellY][cellX].open) continue

        if (field[cellY][cellX].value === 0) {
          field[cellY][cellX].openAround(field)
        } else if (field[cellY][cellX].value > 0) {
          field[cellY][cellX].openCell()
        }
      }
    }
  }
}
