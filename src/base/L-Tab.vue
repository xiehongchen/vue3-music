<template>
  <ul class="tab-wrap" :class="{[align]: true}">
    <template v-if="isRouteMode">
      <router-link 
        v-for="(tab, index) in (tabs as any[])"
        :key="index"
        :to="tab.to"
        class="tab-item"
        :style="getItemStyle(tab, index)"
        tag="li"
        :active-class="activeItemClass">
        <span class="title">{{ tab.title }}</span>
      </router-link>
    </template>
    <template v-else>
      <li
        v-for="(tab, index) in (tabs as any[])"
        :key="index"
        class="tab-item"
        :class="getItemCls(tab, index)"
        :style="getItemStyle(tab, index)"
        @click="onChangeTab(tab, index)">
        <span class="title">{{ tab.title }}</span>
      </li>
    </template>
  </ul>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
  active: {
    type: Number,
    default: 0
  },
  data: {
    type: Array,
    default: () => []
  },
  activeItemClass: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: "left"
  },
  itemStyle: {
    type: Object,
    default: () => ({})
  },
  activeItemStyle: {
    type: Object,
    default: () => ({})
  },
  itemClass: {
    type: String
  },
  type: {
    type: String
  }
})
const emit = defineEmits(['tabChange', 'update:active'])
const isRouteMode = computed(() => props.data.length && (props.data[0] as any).to)
const tabs = computed(() => {
  return typeof props.data[0] === 'string' ? props.data.map(tab => ({ title: tab })) : props.data
})
console.log('tabs', tabs.value)
const onChangeTab = (tab: any, index: number) => {
  console.log(tab, index)
  if (isRouteMode.value) {
    router.push(tab.to)
  } else {
    emit('update:active', index)
    emit('tabChange', index)
  }
}

const isActive = (tab: any, index: number) => {
  // 路由模式
  if (isRouteMode.value) {
    console.log(tab)
  } else {
    return index === props.active
  }
}

const getItemStyle = (tab: any, index: number) => {
  return Object.assign(
    {},
    props.itemStyle,
    isActive(tab, index) ? Object.assign({}, props.activeItemStyle) : ''
  )
}
const getItemCls = (tab: any, index: number) => {
  let base = []
  if (props.itemClass) {
    base.push(props.itemClass)
  }
  if (props.type) {
    base.push(props.type)
  }
  if (isActive(tab, index)) {
    if (props.activeItemClass) {
      base.push(props.activeItemClass)
    }
    base.push("active")
  }
  return base.join(" ")
}
</script>

<style scoped lang='scss'>
.tab-wrap {
  display: flex;
  list-style-type: none;
  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }
  .tab-item {
    padding: 12px 0;
    margin: 0 12px;
    color: #000;
    font-size: 12px;
    white-space: nowrap;
    cursor: pointer;
    &.active {
      color: red;
      &:hover {
        color: red;
      }
    }

    &.small {
      font-size: 12px;
      &.active {
        color: blue;
      }
    }
    &.theme {
      font-size: 12px;

      &.active {
        color: red;
        border-bottom: 2px solid red;
        font-weight: 500;
      }
    }
    &.split {
      font-size: 12px;
      padding: 4px 12px;
      margin: 0 16px;
      border-radius: 999em;

      &.active {
        color: red;
        background: blue;
      }

      &:not(:last-child) {
        &::after {
          position: relative;
          left: 28px;
          width: 1px;
          height: 100%;
          background: blue;
          display: inline-block;
          vertical-align: middle;
          content: " ";
        }

        .title {
          vertical-align: middle;
        }
      }
    }

    &:hover {
      color: green;
    }
  }

}
</style>