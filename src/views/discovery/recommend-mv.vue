<template>
  <div class="new_mvs" v-if="mvs.length">
    <l-title>推荐MV</l-title>
    <ul class="list_wrap">
      <li v-for="mv in mvs" :key="mv.id" class="list_item">
        <mv-card 
          :img="mv.picUrl">
        </mv-card>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getPersonalizedMv } from "@/api"
interface listType {
  id: string;
  picUrl: string,
  [key: string | number]: any;
}
const mvs = ref<listType[]>([]);
onMounted(() => {
  getMvs()
})

const getMvs = async () => {
  const { result } = await getPersonalizedMv() as any;
    mvs.value = result
}
</script>

<style lang="scss" scoped>
.new_mvs {
  @include list(25%);
}
</style>