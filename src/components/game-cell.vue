<template>
  <div
    v-if="props.body.open"
    :class="[{ lose: props.body.isBomb, open: !props.body.isBomb }, cellColor]"
    class="cell"
  >
    <bomb-icon v-if="props.body.isBomb" />
    <span v-else>{{ props.body.value > 0 ? props.body.value : '' }}</span>
  </div>
  <div @click.right.prevent="changeStatus" @click.once="open" v-else class="cell close">
    <span v-if="props.body.closeStatus === CloseStatuses.Empty"></span>
    <flag-icon v-else-if="props.body.closeStatus === CloseStatuses.Flag" />
    <question-icon v-else />
  </div>
</template>

<script setup lang="ts">
import BombIcon from '@/assets/bomb.svg'
import FlagIcon from '@/assets/flag.svg'
import QuestionIcon from '@/assets/question.svg'
import { Cell, CloseStatuses } from '@/helpers/create-field'
import { computed } from 'vue'

const props = defineProps<{ body: Cell }>()

const emit = defineEmits<{
  (event: 'open', cell: Cell): void
  (event: 'changeCloseStatus', status: CloseStatuses): void
}>()

function changeStatus() {
  props.body.changeStatus()
  emit('changeCloseStatus', props.body.closeStatus)
}

function open() {
  emit('open', props.body)
}

const cellColor = computed(() => (props.body.value > 0 ? `color${props.body.value}` : ''))
</script>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eeeeee;
  border-radius: 2px;
  width: 24px;
  height: 24px;
  box-shadow: inset 0px 0px 0px 1px #dddddd;
  margin: 1px;
  cursor: default;
}

.cell span {
  font-weight: bold;
}
.open {
  background-color: #dddddd;
}

.close {
  background-color: #eeeeee;
  box-shadow: inset 0px 0px 1px 3px #cccccc;
  cursor: pointer;
}

.lose {
  box-shadow: inset 0px 0px 0.5px 3px #fa0000;
  background-color: #ff0000;
  border-color: #ff0000;
}

.color1 {
  color: blue;
}
.color2 {
  color: green;
}
.color3 {
  color: red;
}
.color4 {
  color: darkblue;
}
.color5 {
  color: rgb(165, 104, 42);
}
.color6 {
  color: aquamarine;
}
.color7 {
  color: black;
}
.color8 {
  color: white;
}

@media (max-width: 992px) {
  .cell {
    min-width: 32px;
    min-height: 32px;
  }
}
</style>
