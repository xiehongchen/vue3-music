<!--
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-01-17 16:26:20
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-01-17 16:26:34
 * @FilePath: /vue3-music/src/components/song-card.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="song-card">
    <div class="order-wrap">
      <span class="order">{{  }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.song-card {
  display: flex;
  padding: 8px;
  font-size: 12px;
  cursor: pointer;

  div {
    flex-shrink: 0;
  }

  &:hover {
    background: #FFFFFF;
  }
  .order-wrap {
    @include flex-center();
    width: 30px;
    margin-right: 8px;
  }

  .img-wrap {
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 8px;
    img {
      width: 100%;
      height: 100%;
    }

    .play-icon {
      @include abs-center;
    }
  }

  .song-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    overflow: hidden;

    .song-name {
      @include text-ellipsis;
      color: #FFFFFF;
    }

    .singer {
      @include text-ellipsis;
    }
  }
}
</style>