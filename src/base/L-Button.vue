<template>
  <button 
    :class="[customClass]"
    :style="[customStyle]"
    @click="onClick"
    :loading="loading"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['clickHandle'])
const onClick = (e: Event) => {
  emit('clickHandle', e)
}
</script>

<style lang="scss" scoped>
.l-button {
  display: inline-block;
  padding: 5px 16px;
  border: 1px solid var(--button-border-color);
  text-align: center;
  cursor: pointer;
  &:hover {
    background: var(--button-hover-bg-color);
  }
}
</style>