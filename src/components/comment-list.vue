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
        <CommentItem
          v-for="(item, index) in hotCommentList"
          :comment="item"
          :key="index"
        ></CommentItem>
      </div>
      <div
        class="block"
        v-if="shouldCommentShow"
      >
        <p
          class="title"
          ref="commentRef"
        >
          最新评论
          <span class="count">({{pagination.total}})</span>
          <CommentItem
          v-for="(item, index) in commentList"
          :comment="item"
          :key="index"
        ></CommentItem>
        </p>
      </div>
      <el-pagination 
        layout="prev, pager, next"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize" 
        :total="pagination.total"
        @current-change="currentChange">
      </el-pagination>
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
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'playlist'
  }
})
const loading = ref(false)
const commentList = ref([])
const hotCommentList = ref([])
const pagination = reactive({
  currentPage: 1,
  pageSize: 50,
  total: 0
})
const shouldHotCommentShow = computed(() => hotCommentList.value.length && pagination.currentPage === 1)
const shouldCommentShow = computed(() => commentList.value.length)

const getComment = async () => {
  loading.value = true
  const commentRequestMap = {
    'playlist': getPlaylistComment,
    'song': getSongComment,
    'mv': getMvComment
  }
  const commentRequest = commentRequestMap[props.type as keyof typeof commentRequestMap];
  const { hotComments = [], comments = [], total } = await commentRequest({
    id: props.id,
    pageSize: pagination.pageSize,
    offset: getPageOffset(pagination.currentPage, 20)
  }) as any

  // 歌单的热评需要单独请求接口获取
  if (props.type === 'playlist') {
  const { hotComments: exactHotComments = [] } = await getHotComment({
    id: props.id,
    type: 2 // 歌单type
  }) as any
    hotCommentList.value = exactHotComments
  } else {
    hotCommentList.value = hotComments
  }
  commentList.value = comments
  pagination.total = total
  loading.value = false
}
const commentRef = ref()
const currentChange = (page: number) => {
  console.log('page', page)
  pagination.currentPage = page
  getComment()
  // 回到前面
  commentRef.value?.scrollIntoView({ behavior: "smooth" })
}
watch(
  () => props.id,
  () => {
    getComment()
  },
  { immediate: true }
)
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