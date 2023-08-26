<template>
  <button class="game__button">
    <slot name="text"></slot>
    <slot name="icon"></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
.game__button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 2px solid #222;
  border-radius: 3px;
}
.game__button:hover {
  cursor: pointer;
}

.game__button:active {
  box-shadow: inset 0px 0px 3px 1px #999;
}
</style>
