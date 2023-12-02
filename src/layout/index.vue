<template>
  <div class="layout">
    <Header />
    <div class="layout-body">
      <div
        class="layout-menu"
        v-show="isMenuShow"
      >
        <Menu />
      </div>
      <div
        class="content"
        id="page-content"
      >
        <router-view :class="routerView" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./header.vue"
import Menu from "./menu.vue"
import { useRoute } from "vue-router"
import { layoutCenterNames } from "@/router/routes"

const route = useRoute()
const isMenuShow = ref<Boolean>(false)
const routerView = layoutCenterNames.find(name => name === route.name)
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;

  .layout-body {
    display: flex;
    height: calc(100% - $header-height);

    .layout-menu {
      // 这个100%已经减去了头部height
      height: calc(100% - #{$mini-player-height});
    }

    .content {
      flex: 1;
      overflow-y: auto;
      min-width: $layout-content-min-width;
      margin-bottom: $mini-player-height;

      .router-view-center {
        max-width: $center-content-max-width;
        margin: auto;
      }
    }
  }
}
</style>