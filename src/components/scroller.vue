<template>
  <div class="container" ref="container">
    <ul class="list" ref="ulRef">
      <li v-for="(item, index) in data" :key="index" ref="liRef">
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

const container = ref<HTMLElement | null>(null)
const ulRef = ref<HTMLElement | null>(null)
const liRef = ref<HTMLElement[] | null>(null)
function setOffset() {
  console.log('setOffset');
  if (container.value && ulRef.value) {
    const index = findIndex()

    let offset = index * 30 + 15 - container.value.clientHeight / 2
    const maxOffset = ulRef.value.clientHeight - container.value.clientHeight
    if (offset < 0) {
      offset = 0
    }
    if (offset > maxOffset) {
      offset = maxOffset
    }
    ulRef.value.style.transform = `translateY(-${offset}px)`;

    if (liRef.value) {
      liRef.value.forEach((li, i) => {
        if (i === index) {
          li.classList.add('active')
        } else {
          li.classList.remove('active')
        }
      })
    }
  }
}

function findIndex () {
  const curTime = musicStore.currentTime
  for (let i = 0; i < props.data.length; i++) {
    if (curTime < props.data[i].time) {
      return i -1
    }
  }
  return props.data.length - 1
}

onMounted(() => {
  musicStore.audioElement?.addEventListener('timeupdate', setOffset)
})
</script>

<style lang="scss" scoped>
.container {
  height: 400px;
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
  text-align: center;
  transition: 0.2s;
}
.container li.active {
  color: blue;
  /* font-size: ; */
  transform: scale(1.2);
}

</style>