<template>
  <div class="title-wrap">
    <p class="title">
      <slot></slot>
    </p>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.title-wrap {
  display: flex;
  padding: 12px 0;
  .title {
    font-size: 20px;
  }
}
</style>