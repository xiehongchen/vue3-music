<template>
  <div class="container" ref="container">
    <ul class="list">
      <li v-for="(item, index) in data" :key="index">
        {{ item.word }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useMusicStore } from '@/store/music'
const musicStore = useMusicStore()
interface wordType {
  time: number
  word: string
}
const props = defineProps<{
  data: wordType[]
}>()


</script>

<style lang="scss" scoped>
.container {
  height: 600px;
  overflow: hidden;
  /* border: 2px solid #fff; */
}
.container ul {
  /* border: 2px solid #fff; */
  transition: 0.6s;
  list-style: none;
}
.container li {
  height: 30px;
  /* border: 1px solid #fff; */
  line-height: 30px;
  transition: 0.2s;
}
.container li.active {
  color: #fff;
  /* font-size: ; */
  transform: scale(1.2);
}

</style>