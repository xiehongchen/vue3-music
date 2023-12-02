<template>
  <div class="header flex flex-row-between">
    <div class="left">
      <div class="buttons">
        <div class="mac-button red">
          <el-icon><House /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.header {
  height: $header-height;
  background-color: var(--header-bg-color);
  padding-right: 36px;
}
</style>