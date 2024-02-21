<template>
  <div class="comment">
    <div class="avatar">
      <img v-lazy="getImgUrl(comment.user.avatarUrl, 80)" />
    </div>
    <div :class="{ border }" class="content">
      <p class="comment-text">
        <span class="username">{{ comment.user.nickname }}:</span>
        <span class="text">{{ comment.content }}</span>
      </p>
      <div class="replied" v-if="comment.beReplied.length">
        <p class="comment-text">
          <span class="username"
            >{{ comment.beReplied[0].user.nickname }}:</span
          >
          <span class="text">{{ comment.beReplied[0].content }}</span>
        </p>
      </div>
      <div class="bottom">
        <span class="date">{{ formatDate(comment.time) }}</span>
        <div class="actions">
          <Icon :size="12" type="good" />
          {{ comment.likedCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImgUrl, formatDate } from '@/utils';
defineProps({
  comment: {
    type: Object,
    default: () => {}
  },
  border: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  padding-top: 20px;

  .avatar {
    @include img-wrap(40px);
    margin-right: 12px;

    img {
      border-radius: 50%;
    }
  }

  .content {
    padding-bottom: 20px;
    width: 100%;
    font-size: 12px;

    &.border {
      border-bottom: 1px solid #ffffff;
    }

    .replied {
      padding: 8px;
      margin-top: 8px;
      background: #333;
      border-radius: 4px;
    }

    .comment-text {
      .username {
        display: inline-block;
        margin-right: 4px;
        color: blue;
      }

      .text {
        line-height: 1.5;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;

      .date {
        color: #eee;
      }

      .actions {
        color: #eee;
      }
    }
  }
}
</style>
