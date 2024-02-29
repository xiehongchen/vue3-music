<template>
  <div class="progress-bar" ref="progressBarRef" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progressRef"></div>
      <div class="progress-btn-wrapper" ref="progressBtnRef">
        <div class="progress-btn" :class="{show: alwaysShowBtn}"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  percent: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  alwaysShowBtn: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['change'])
const progressBarRef = ref<HTMLElement | null>(null)
const progressRef = ref<HTMLElement | null>(null)
const progressBtnRef = ref<HTMLElement | null>(null)
const progressClick = (e: MouseEvent) => {
  if (!props.disabled) {
    const rect = progressBarRef.value!.getBoundingClientRect()
    const offsetWidth = Math.max(0, Math.min(e.pageX - rect.left, progressBarRef.value!.clientWidth))
    offset(offsetWidth)
    triggerPercent()
  }
}
const triggerPercent = () => {
  emit('change', getPercent())
}
const getPercent = () => {
  const barWidth = progressBarRef.value!.clientWidth
  const percent = progressRef.value!.clientWidth / barWidth
  return percent
}
const setProgressOffset = (percent: number) => {
  if (percent >= 0) {
    const barWidth = progressBarRef.value!.offsetWidth
    const offsetWidth = percent * barWidth
    offset(offsetWidth)
  }
}
const offset = (offsetWidth: number) => {
  progressRef.value!.style.width = `${offsetWidth}px`
  progressBtnRef.value!.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
}

onMounted(() => {
  setProgressOffset(props.percent)
})

watch(() => props.percent, (newVal) => {
  setProgressOffset(newVal)
})
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  cursor: pointer;

  .bar-inner {
    position: relative;
    top: 14px;
    height: 2px;
    background: #F5F5F5;

    .progress {
      position: absolute;
      height: 100%;
      background: #333;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        display: none;
        position: relative;
        top: 8px;
        left: 9px;
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #333;

        &.show {
          display: block;
        }
      }
    }
  }

  &:hover {
    .progress-btn {
      display: block !important;
    }
  }
}
</style>