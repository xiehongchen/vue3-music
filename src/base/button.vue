<template>
  <div class="l-button" @click="onClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'common'
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
}
</style>