<template>
    <div class="mv" v-if="detail.id">
    <div class="mv-content">
      <div class="left">
        <p class="title">mv详情</p>

        <div class="player">
          <VideoPlayer
            :url="palyInfo.url"
            :poster="detail.cover"
            ref="video"
          />
        </div>

        <div class="author-wrap">
          <div class="avatar">
            <img v-lazy="getImgUrl(artistInfo.picUrl, 120)" />
          </div>
          <p class="author">{{ artistInfo.name }}</p>
        </div>

        <p class="name">{{ detail.name }}</p>

        <div class="desc">
          <span class="date"
            >发布：{{
              formatDate(detail.publishTime, "yyyy-MM-dd")
            }}</span
          >
          <span class="count">播放：{{ detail.playCount }}次</span>
        </div>

        <div class="comments">
          <CommentList :id="(id as string)" type="mv" />
        </div>
      </div>

      <div class="right">
        <p class="title">相关推荐</p>
        <div class="simi-mvs">
          <L-card
            v-for="item in simiMvLst"
            :desc="`by ${item.artistName}`"
            :key="item.id"
            :name="item.name"
            @click="goMv(item.id)"
            class="simi-mv-card">
            <template #img-wrap>
              <mv-card :duration="item.duration" :img="item.cover" :playCount="item.playCount"></mv-card>
            </template>
          </L-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImgUrl, formatDate } from '@/utils';
import { getMvDetail, getMvUrl, getArtists, getSimiMv } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import CommentList from '@/components/comment-list.vue';
const route = useRoute()
const router = useRouter()
console.log('route', route)

const id = computed(() => route.params.id)
const detail = ref<any>({})
const palyInfo = ref<any>()
const artistInfo = ref<any>({})
const simiMvLst = ref<any[]>([])
const init = async () => {
  const [
    {data: mvDetail},
    {data: mvPlayInfo},
    {mvs: simiMvs }
  ] = await Promise.all([
    getMvDetail(id.value as string),
    getMvUrl(id.value as string),
    getSimiMv(id.value as string) as any
  ])
  const { artist } = await getArtists(mvDetail.artistId) as any
  artistInfo.value = artist
  detail.value = mvDetail
  palyInfo.value = mvPlayInfo
  simiMvLst.value = simiMvs
  console.log('mvDetail', detail.value)
  console.log('mvPlayInfo', palyInfo.value)
}

const goMv = (mvId: string) => {
  router.push({
    path: `/mv/${mvId}`
  })
  console.log('router', router, route)
}

onMounted(() => {
  init()
})

watch(() => route.params.id, (newId, oldId) => {
  if (newId !== oldId && newId !== '0') {
    console.log('newId', newId)
    console.log('oldId', oldId)
    init()
  }
})
</script>

<style lang="scss" scoped>
.mv {
  padding: 16px 32px;

  .title {
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: 700;
  }

  .mv-content {
    display: flex;
    max-width: 950px;
    margin: auto;

    .left {
      flex: 1;

      .player {
        margin-bottom: 16px;
        overflow: hidden;
        border-radius: 4px;
      }

      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 32px;

        .avatar {
          @include img-wrap(60px);
          margin-right: 8px;
          img {
            @include round(60px);
          }
        }

        .author {
          font-size: 20px;
        }
      }

      .name {
        margin-bottom: 16px;
        font-size: 20px;
        font-weight: 700;
      }

      .desc {
        display: flex;
        color: #BEBEBE;
        font-size: 13px;

        .date {
          display: inline-block;
          margin-right: 24px;
        }
      }

      .comments {
        margin-top: 48px;
      }
    }

    .right {
      width: 36%;
      padding-left: 32px;

      .simi-mvs {
        padding: -8px 0;

        .simi-mv-card {
          padding: 8px 0;
        }
      }
    }
  }
}
</style>