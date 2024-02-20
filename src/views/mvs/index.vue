<template>
  <div class="mvs" ref="page">
    <div class="tabs-wrap">
      <span class="tabs-type">地区：</span>
      <l-tab 
        :data="areaTabs"
        class="tabs"
        type="split"
        v-model:active="tabIndexes.activeAreaTabIndex">
      </l-tab>
    </div>
    <div class="tabs-wrap">
      <span class="tabs-type">类型：</span>
      <l-tab 
        :data="typeTabs"
        class="tabs"
        type="split"
        v-model:active="tabIndexes.activeTypeTabIndex">
      </l-tab>
    </div>
    <div class="tabs-wrap">
      <span class="tabs-type">地区：</span>
      <l-tab 
        :data="sortTabs"
        class="tabs"
        type="split"
        v-model:active="tabIndexes.activeSortTabIndex">
      </l-tab>
    </div>
    <ul class="list-wrap">
      <li v-for="mv in mvs" :key="mv.id" class="list-item">
        <mv-card 
          :author="mv.artistName"
          :duration="mv.duration"
          :id="mv.id"
          :img="mv.cover"
          :name="mv.name"
          :playCount="mv.playCount"></mv-card>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getAllMvs } from '@/api'
import { getPageOffset } from '@/utils';
const areaTabs = ref(["全部", "内地", "港台", "欧美", "日本", "韩国"])
const typeTabs = ref(["全部", "官方版", "原声", "现场版", "网易出品"])
const sortTabs = ref(["上升最快", "最热", "最新"])
const tabIndexes = reactive({
  activeAreaTabIndex: 0,
  activeTypeTabIndex: 0,
  activeSortTabIndex: 0
})
const pagination = reactive({
  currentPage: 0,
  pageSize: 50,
  total: 0
})
const mvs = ref<any[]>([])
onMounted(() => {
  getList()
})
const getList = async () => {
  const result = await getAllMvs({
    limit: pagination.pageSize,
    offset: getPageOffset(pagination.currentPage, pagination.pageSize),
    area: areaTabs.value[tabIndexes.activeAreaTabIndex],
    order: sortTabs.value[tabIndexes.activeSortTabIndex],
    type: typeTabs.value[tabIndexes.activeTypeTabIndex]
  }) as any
  mvs.value = result.data
  pagination.total = result.count
}

watch(tabIndexes, () => {
  getList()
}, { deep: true })
</script>

<style lang="scss" scoped>
.mvs {
  padding: 20px;
  margin: auto;

  .tabs-wrap {
    margin-bottom: 16px;
    display: flex;
    align-items: center;

    .tabs-type {
      font-size: 12px;
    }
  }

  .list-wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -12px;

    .list-item {
      width: 25%;
      margin-bottom: 10px;
      padding: 0 12px;
    }
  }
}
</style>