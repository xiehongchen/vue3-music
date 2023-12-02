<template>
  <div class="user">
    <div @click="onOpenModal" class="login-trigger" v-if="!user.isLogin">
      <i class="user-icon iconfont icon-yonghu"></i>
      <p class="user-name">未登录</p>
    </div>
    <div class="logined-user" v-else>
      <img v-lazy="getImgUrl(user.userInfo.avatarUrl, 80)" class="avatar">
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImgUrl } from '@/utils/utils'
import { useUserStore } from '@/store/user'
const user = useUserStore()


const onOpenModal = () => {

}
</script>

<style lang="scss" scoped>

</style>