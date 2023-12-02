<template>
  <div class="menu">
    <user />
    <div class="menu-wrap">
      <div v-for="(menu, index) in menusWithPlaylist" :key="index" class="menu-block">
        <p class="menu-block-title" v-if="menu.title">{{ menu.title }}</p>
        <ul class="menu-list">
          <router-link v-for="(item, i) in menu" :key="i" :to="item.path" active-class="menu-item-active" class="menu-item" tag="li">
            <span class="menu-title">{{ item.meta.title }}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { menuRoutes } from '@/router/routes'

interface menuType {
  title?: String
  [key: string]: any
}

const user = useUserStore()
const menus = reactive<menuType[]>([
  {
    type: 'root',
    children: menuRoutes
  }
])
const menusWithPlaylist = user.isLogin && user.userMenus.length ? menus.concat(user.userMenus) : menus
</script>

<style lang="scss" scoped>
.menu {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--menu-bg-color);

  .menu-wrap {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;

    .menu-block {
      margin-bottom: 16px;

      .menu-block-title {
        font-size: $font-size-12;
        color: var(--font-color-grey);
        padding-left: 16px;
        margin-bottom: 8px;
      }

      .menu-list {
        .menu-item {
          @include text-ellipsis;
          padding: 12px 18px;
          cursor: pointer;

          &:hover {
            background: var(--menu-item-hover-bg-color);
          }

          &-active {
            color: var(--theme-colo);
            background: var(--menu-item-hover-bg-color);

            i {
              color: var(--theme-colo);
            }
          }

          .iconfont {
            font-size: $font-size-13;
          }

          .menu-title {
            font-size: $font-size-13;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>