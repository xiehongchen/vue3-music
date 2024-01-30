<template>
  <div class="box">
    <div class="prev" @click="btnClick('prev')">《</div>
    <div class="carousel" ref="carouselRef" @click="imgContainerClick">
      <img
        v-for="item, index in imgs"
        ref="imgRef"
        :key="index"
        :src="item.imageUrl"
        :alt="item.alt"
        :draggable="false"
      />
    </div>
    <div class="next" @click="btnClick('next')">》</div>
  </div>
</template>

<script setup lang="ts">
import { getBanner } from '@/api'
const x = ref(0)
const y = ref(0)
const newX = ref(0)
const newY = ref(0)
const carouselRef = ref<HTMLElement>()
const imgRef = ref<HTMLImageElement[]>([])
  interface imgItem {
  targetId: number
  imageUrl: string
  alt: string
  [key: string]: any
}
let index = ref(4)
const imgs = ref<imgItem[]>([])
const imgsLength = ref()

// 鼠标点击事件
function getMouseNowLocation(event: any) {
  x.value = event.pageX
  y.value = event.pageY
  carouselRef.value?.addEventListener('mousemove', updateMouseNewLocation)
}
// 鼠标移动事件
function updateMouseNewLocation(event: any) {
  // console.log('鼠标移动事件')
  newX.value = event.pageX
  newY.value = event.pageY
  if (newX.value - x.value > 100) {
    btnClick('prev')
    carouselRef.value?.removeEventListener('mousemove', updateMouseNewLocation)
  } else if (x.value - newX.value > 100) {
    btnClick('next')
    carouselRef.value?.removeEventListener('mousemove', updateMouseNewLocation)
  }
}
function removeUpdateLocation() {
  carouselRef.value?.removeEventListener('mousemove', updateMouseNewLocation)
}

onMounted(async () => {
  await getBanner().then((res: any) => {
    imgs.value = res.banners
    imgsLength.value = res.banners.length
  })
  // 绑定鼠标点击事件
  carouselRef.value?.addEventListener('mousedown', getMouseNowLocation)
  // 鼠标点击松开绑定事件，移除鼠标移动事件
  carouselRef.value?.addEventListener('mouseup', removeUpdateLocation)
  // 鼠标离开绑定事件，开启自动轮播
  carouselRef.value?.addEventListener('mouseleave', autoPlay)
  // 鼠标移入绑定事件，停止轮播
  carouselRef.value?.addEventListener('mouseenter', stopAutoPlay)
  nextTick(() => {
    setStyle(index.value)
  })
})

onUnmounted(() => {
  carouselRef.value?.removeEventListener('mouseleave', autoPlay)
  clearInterval(timer.value)
})
// 设置样式
function setStyle(imgIndex: number) {
  // console.log("carouselRef", carouselRef.value)
  // console.log("imgRef", imgRef, imgRef.value)
  if (!carouselRef.value) return
  if (!imgRef.value) return
  carouselRef.value.style.display = 'none'
  let max = 0
  if (imgsLength.value <= 10) {
    max = 5
  } else if (imgsLength.value <= 15) {
    max = 7
  } else {
    max = 9
  }
  const arr = getImageIndex(imgIndex, max, imgsLength.value)
  // console.log('arr', arr)
  // console.log('imgsLength.value', imgsLength.value)
  for (let i = 0; i < imgsLength.value; i++) {
    const img = imgRef.value[i]
    img.className = ''
    img.classList.add('img-item')
  }
  const list = [
    'img-item-left-4',
    'img-item-left-3',
    'img-item-left-2',
    'img-item-left-1',
    'img-item-center',
    'img-item-right-1',
    'img-item-right-2',
    'img-item-right-3',
    'img-item-right-4',
  ]
  const first = {
    5: 2,
    7: 1,
    9: 0
  }[max] || 0
  const classList = list.splice(first, 5)
  // console.log(classList)
  for (let i = 0; i < arr.length; i++) {
    const img = imgRef.value[arr[i]]
    img.classList.remove('img-item')
    img.classList.add(classList[i])
  }
  carouselRef.value.style.display = 'flex'
}

function getImageIndex(index: number, len: number, max: number) {
  // 确保 index 和 len 是有效的数字
  if (
    typeof index !== 'number' ||
    typeof len !== 'number' ||
    index < 0 ||
    len < 1
  ) {
    return []
  }

  // 计算数组的起始位置
  const start = index - Math.floor(len / 2)
  // 生成数组
  const resultArray = Array.from({ length: len }, (_, i) => start + i)
  for (let i = 0; i < resultArray.length; i++) {
    if (resultArray[i] < 0) {
      resultArray[i] += max
    }
    if (resultArray[i] >= max) {
      resultArray[i] -= max
    }
  }

  return resultArray
}
// 点击轮播图当中的图片
function imgContainerClick(e: any) {
  if (e.currentTarget === e.target) {
    return
  }
  index.value = imgRef.value!.indexOf(e.target)
  setStyle(index.value)
}
// 上下一张图
function btnClick(type: string) {
  if (type === 'next') {
    index.value = index.value + 1 < imgsLength.value ? index.value + 1 : index.value + 1 - imgsLength.value
  } else {
    index.value = index.value - 1 < 0 ? index.value - 1 + imgsLength.value : index.value - 1
  }
  if (index.value < 0) return (index.value = 0)
  if (index.value > imgsLength.value - 1) return (index.value = imgsLength.value - 1)
  setStyle(index.value)
}

// 自动播放
const timer = ref()
function autoPlay() {
  clearInterval(timer.value)
  // timer.value = setInterval(() => btnClick('next'), 1000)
}
function stopAutoPlay() {
  clearInterval(timer.value)
}
// 开启自动播放
autoPlay()
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 300px;
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
  height: 287px;
  transition: 0.2s linear;
  position: absolute;
}
@mixin img-item($translateX, $rotateY, $scale, $opacity, $zIndex) {
  transform: translateX($translateX) rotateY($rotateY) scale($scale);
  opacity: $opacity;
  z-index: $zIndex;
}
.img-item-left-1 {
  @include img-item(-170px, 45deg, 0.8, 0.8, 15);
}
.img-item-left-2 {
  @include img-item(-400px, 45deg, 0.64, 0.5, 14);
}
.img-item-left-3 {
  @include img-item(-600px, 45deg, 0.512, 0.4, 13);
}
.img-item-left-4 {
  @include img-item(-800px, 45deg, 0.4096, 0.2, 12);
}
.img-item-right-1 {
  @include img-item(170px, -45deg, 0.8, 0.8, 15);
}
.img-item-right-2 {
  @include img-item(400px, -45deg, 0.64, 0.5, 14);
}
.img-item-right-3 {
  @include img-item(600px, -45deg, 0.512, 0.4, 13);
}
.img-item-right-4 {
  @include img-item(800px, -45deg, 0.4096, 0.2, 12);
}
.img-item {
  opacity: 0;
}
.img-item-center {
  @include img-item(0, 0, 1, 1, 16);
}
</style>