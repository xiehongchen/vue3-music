<template>
  <div class="new-mvs" v-if="mvs.length">
    <l-title>推荐MV</l-title>
    <div class="list-wrap">
      <div v-for="mv in mvs" :key="mv.id" class="list-item">
        <mv-card 
          :img="mv.picUrl"
          :id="mv.id">
        </mv-card>
      </div>
    </div>
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
.new-mvs {
  margin-bottom: 30px;
  min-height: 300px;
  @include list(25%);
  .list-wrap {
    display: flex;
  }
}
</style>