<template>
  <div class="box">
    <div class="prev" @click="btnClick('prev')">《</div>
    <div class="carousel" ref="carouselRef" @click="imgContainerClick">
      <img
        ref="imgRef"
        v-for="item in (imgs as any)"
        :key="item.id"
        :src="item.imageUrl"
        :alt="item.alt"
        :draggable="false"
      />
    </div>
    <div class="next" @click="btnClick('next')">》</div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api'
const x = ref(0)
const y = ref(0)
const newX = ref(0)
const newY = ref(0)

function getMouseNowLocation(event: any) {
  x.value = event.pageX
  y.value = event.pageY
  window.addEventListener('mousemove', updateMouseNewLocation)
}

function updateMouseNewLocation(event: any) {
  newX.value = event.pageX
  newY.value = event.pageY
  if (newX.value - x.value > 100) {
    btnClick('next')
    window.removeEventListener('mousemove', updateMouseNewLocation)
  } else if (x.value - newX.value > 100) {
    btnClick('prev')
    window.removeEventListener('mousemove', updateMouseNewLocation)
  }
}
function removeUpdateLocation() {
  window.removeEventListener('mousemove', updateMouseNewLocation)
}

onMounted(() => {
  window.addEventListener('mousedown', getMouseNowLocation)
  window.addEventListener('mouseup', removeUpdateLocation)

  api.discovery.getBanner().then((res: any) => {
    imgs.value = res.banners
  })
  nextTick(() => {
    setStyle(index.value);
  });
})

let index = ref(4)
const imgs = ref([])
const imgRef = ref()
const l = imgs.value.length
const OFFSET = ref(200)
const SCALE = ref(0.8)
const ROTATE = ref(45)
const OPACITY = ref(0.6)
const carouselRef = ref<HTMLElement>()

function setStyle(imgIndex: number) {
  console.log('carouselRef.value', carouselRef)
  console.log('imgRef.value', imgRef, imgRef.value)
  if (!carouselRef.value) return
  if (!imgRef.value) return
  
  carouselRef.value.style.display = 'none'
  for (let i = 0; i < imgRef.value.length; i++) {
    const img = imgRef.value[i]
    const i_imgIndex = i - imgIndex
    const abs = Math.abs(i_imgIndex)
    const sign = -1 * Math.sign(i_imgIndex)
    let translateX = i_imgIndex * OFFSET.value
    if (abs === 1) {
      translateX += sign * 30
    }
    const rotateY = abs === 0 ? 0 : sign * ROTATE.value
    const scale = Math.pow(SCALE.value, abs)
    const opacity = Math.pow(OPACITY.value, abs)
    const zIndex = l - abs
    img.style = `transform: translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale});opacity: ${opacity};z-index: ${zIndex};`
  }
  carouselRef.value.style.display = 'flex'
}

function imgContainerClick(e: any) {
  if (e.currentTarget === e.target) {
    return
  }
  index.value = imgRef.value.indexOf(e.target)
  setStyle(index.value)
}
function btnClick(type: string) {
  index.value = type === 'next' ? index.value + 1 : index.value - 1
  if (index.value < 0) return (index.value = 0)
  if (index.value > l - 1) return (index.value = l - 1)
  setStyle(index.value)
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
}
.prev,
.next {
  width: 24px;
  padding: 0 50px;
  cursor: pointer;
}
.carousel {
  display: flex;
  width: calc(100% - 248px);
  position: relative;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  perspective: 1000px;
}
img {
  width: 450px;
  height: 287;
  transition: 0.2s linear;
  position: absolute;
}
</style>