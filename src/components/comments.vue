<template>
  <div class="comment">
    <template v-if="loading">
      <L-Loading :loading="loading" />
    </template>
    <template v-else>
      <div
        class="block"
        v-if="shouldHotCommentShow"
      >
        <p class="title">精彩评论</p>
        <Comment
          v-for="(item, index) in hotComments"
          :comment="item"
          :key="index"
        />
      </div>
      <div
        class="block"
        v-if="shouldCommentShow"
      >
        <p
          class="title"
          ref="commentTitle"
        >
          最新评论
          <span class="count">({{pagination.total}})</span>
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  getSongComment,
  getPlaylistComment,
  getHotComment,
  getMvComment
} from "@/api"
import { getPageOffset } from '@/utils';
const props =defineProps({
  id: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'playlist'
  }
})
const loading = ref(false)
const comments = ref([])
const hotComments = ref([])
const pagination = reactive({
  currentPage: 1,
  pageSize: 50,
  total: 0
})
const shouldHotCommentShow = computed(() => hotComments.value && pagination.currentPage === 1)
const shouldCommentShow = computed(() => comments.value)

onMounted(() => {
  getComment()
})
const getComment = async () => {
  loading.value = true
  const commentRequestMap = {
    'playlist': getPlaylistComment,
    'song': getSongComment,
    'mv': getMvComment
  }
  const commentRequest = commentRequestMap[props.type as keyof typeof commentRequestMap];
  console.log(commentRequest)
  const { hotComments = [], comments = [], total } = await commentRequest({
    id: props.id,
    pageSize: pagination.pageSize,
    offset: getPageOffset(1, 20)
  }).finally(() => {
    loading.value = false
  }) as any

  // 歌单的热评需要单独请求接口获取
  if (props.type === 'playlist') {
  const { hotComments: exactHotComments = [] } = await getHotComment({
    id: props.id,
    type: 2 // 歌单type
  }) as any
    hotComments.value = exactHotComments
  } else {
    hotComments.value = hotComments
  }
  comments.value = comments
  pagination.total = total
}
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 48px;

  .title {
    font-size: 20px;
    font-weight: 20px;
    margin-bottom: 4px;

    .count {
      font-size: 12px;
    }
  }
}

.pagination {
  text-align: right;
}
</style>