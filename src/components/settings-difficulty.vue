<template>
  <div class="difficulty">
    <h3 class="difficulty__title">Уровень сложности</h3>
    <label @change="difficultyChange(DifficultyNames.Easy)" class="difficulty-level">
      <input
        :checked="props.difficulty.name === DifficultyNames.Easy"
        type="radio"
        name="difficulty-level"
      />
      Простой
    </label>
    <label @change="difficultyChange(DifficultyNames.Medium)" class="difficulty-level">
      <input
        :checked="props.difficulty.name === DifficultyNames.Medium"
        type="radio"
        name="difficulty-level"
      />
      Средний
    </label>
    <label @change="difficultyChange(DifficultyNames.Hard)" class="difficulty-level">
      <input
        :checked="props.difficulty.name === DifficultyNames.Hard"
        type="radio"
        name="difficulty-level"
      />
      Сложный
    </label>
    <div class="custom">
      <label @change="difficultyChange(DifficultyNames.Custom)" class="difficulty-level">
        <input
          :checked="props.difficulty.name === DifficultyNames.Custom"
          type="radio"
          name="difficulty-level"
        />
        Свой
      </label>
      <form class="difficulty_custom" action="">
        <label>
          <input
            v-model="customDifficulty.width"
            :disabled="difficulty.name !== DifficultyNames.Custom"
            type="number"
          />
          Ширина
        </label>
        <label>
          <input
            v-model="customDifficulty.height"
            :disabled="difficulty.name !== DifficultyNames.Custom"
            type="number"
          />
          Высота
        </label>
        <label>
          <input
            v-model="customDifficulty.countMines"
            :disabled="difficulty.name !== DifficultyNames.Custom"
            type="number"
          />
          Количество мин
        </label>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Settings, DifficultyNames, DefaultLevels } from '@/stores/Game'
import { computed } from 'vue'

const props = defineProps<{ difficulty: Settings }>()
const customDifficulty = computed(() => {
  if (props.difficulty.name === DifficultyNames.Custom) {
    return props.difficulty
  } else {
    return { name: DifficultyNames.Custom, width: 8, height: 8, countMines: 10 }
  }
})

const emit = defineEmits<{ (event: 'difficultyChange', settings: Settings): void }>()
function difficultyChange(name: DifficultyNames) {
  if (name === DifficultyNames.Easy) {
    emit('difficultyChange', DefaultLevels.Easy)
  } else if (name === DifficultyNames.Medium) {
    emit('difficultyChange', DefaultLevels.Medium)
  } else if (name === DifficultyNames.Hard) {
    emit('difficultyChange', DefaultLevels.Hard)
  } else {
    emit('difficultyChange', customDifficulty.value)
  }
}
</script>

<style scoped>
input {
  outline: none;
  border-radius: 3px;
  border: 2px solid #999999;
  padding: 4px;
}

.difficulty__title {
  font-weight: bold;
  font-style: italic;
  font-size: 16px;
  margin-bottom: 4px;
}

.difficulty-level {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
}

.custom {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.difficulty_custom {
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  gap: 5px;
}

.difficulty_custom label {
  font-weight: bold;
}
.difficulty_custom input {
  width: 50px;
}
</style>
