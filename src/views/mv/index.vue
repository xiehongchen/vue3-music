<template>
    <div class="mv">
    <div class="mv-content">
      <div class="left">
        <p class="title">mv详情</p>

        <div class="player">
          <!-- <VideoPlayer
            :url="mvPlayInfo.url"
            :poster="mvDetail.cover"
            ref="video"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

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