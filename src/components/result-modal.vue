<template>
  <Teleport to="body">
    <div @click="emit('closeModal')" v-if="props.isOpen" class="modal-wrap">
      <div @click.stop="" class="modal-body">
        <div v-if="props.result === GameStatus.Win" class="result">
          <h3>WIN!</h3>
          <div class="modal__control">
            <router-link to="/top">
              <game-button-vue>
                <template v-slot:icon><CupIcon /></template>
              </game-button-vue>
            </router-link>

            <game-button-vue @click="emit('closeModal')">
              <template v-slot:icon><close-icon /></template>
            </game-button-vue>
          </div>
        </div>
        <div v-else-if="props.result === GameStatus.Lose" class="result">
          <h3>Lose</h3>
          <div class="modal__control">
            <game-button-vue @click="emit('closeModal')">
              <template v-slot:icon><close-icon /></template>
            </game-button-vue>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import gameButtonVue from '@/components/game-button.vue'
import CloseIcon from '@/assets/close.svg'
import CupIcon from '@/assets/cup.svg'
import { GameStatus } from '@/stores/Game'

const props = defineProps<{ isOpen: boolean; result?: GameStatus }>()
const emit = defineEmits<{ (event: 'closeModal'): void }>()
</script>

<style scoped>
.modal-wrap {
  top: 0;
  left: 0;
  background-color: #22222228;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  padding: 0 15px;
  width: 100%;
  min-height: 100%;
  cursor: pointer;
  z-index: 1;
}

.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  max-width: 300px;
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  box-shadow: 0px 0px 10px #222222;
  z-index: 100;
  cursor: auto;
}

.modal__control {
  display: flex;
  gap: 4px;
}

.result {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.result h3 {
  text-align: center;
}
</style>
