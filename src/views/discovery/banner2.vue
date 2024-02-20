<template>
  <el-carousel trigger="click" :interval="4000" height="400px" class="banner-carousel">
    <el-carousel-item v-for="item, index in imgs" :key="index">
      <img
        :src="getImgUrl(item.imageUrl, 1000, 400)"
        class="banner-img"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import { getImgUrl} from '@/utils';
import { getBanner } from '@/api'
interface imgItem {
  targetId: number
  imageUrl: string
  alt: string
  [key: string]: any
}
const imgs = ref<imgItem[]>([])

onMounted(async () => {
  await getBanner().then((res: any) => {
    imgs.value = res.banners
  })
})
</script>

<style lang="scss" scoped>
.banner-carousel {

  .banner-img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
</style>
