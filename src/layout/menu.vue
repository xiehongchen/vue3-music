<template>
  <div class="layout-menu">
    <div class="menu-logo flex flex-col-center flex-row-center">
      <img src="../assets/vue.svg" />
    </div>
    <div class="menu-wrap">
      <div class="menu-box" v-for="menu, index in menuList" :key="index">
        <div class="menu-title" v-if="menu.title">{{ menu.title }}</div>
        <ul class="menu-list">
          <router-link v-for="item, index in menu.children" :key="index" :to="item.path" active-class="menu-item-active" class="menu-item">
            <i class="iconfont" :class="item.meta?.icon"></i>
            <span>{{ item.meta?.title }}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { menuRoutes } from "@/router/routes"
interface menuType {
  [key: string]: any
}
const menuList = reactive<menuType[]>([])
onMounted(() => {
  menuList.push({
    title: '',
    children: menuRoutes
  })
  console.log('menuList', menuList)
})
</script>

<style lang="scss" scoped>
.layout-menu {
  width: 250px;
  // 减去 header 和 player 的高度
  height: calc(100vh - $header-height - $player-height);
  background-color: var(--menu-bg-color);
  .menu-logo {
    height: 60px;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .menu-wrap {
    height: calc(100vh - $header-height - $player-height - 60px);
    overflow-y: scroll;
    .menu-box {
      .menu-title {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        color: var(--menu-text-color);
        font-size: 14px;
      }
      .menu-list {
        padding: 0;
        margin: 0;
        .menu-item {
          display: flex;
          align-items: center;
          height: 40px;
          margin: 0 20px;
          border-radius: 15px;
          padding: 0 10px;
          text-decoration: none;
          color: var(--menu-text-color);
          font-size: 14px;
          cursor: pointer;
          &:hover {
            background-color: var(--menu-item-hover-bg-color);
          }
          &-active {
            background-color: var(--menu-item-active-bg-color);
            color: var(--menu-item-active-text-color);
          }
          .iconfont {
            margin-right: 10px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>