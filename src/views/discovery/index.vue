<template>
  <div>
    <l-button>ann</l-button>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance() as any; 
console.log(proxy?.$utils.getImgUrl())
</script>

<style lang="scss" scoped>

</style>