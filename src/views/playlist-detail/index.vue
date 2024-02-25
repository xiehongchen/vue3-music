<template>
  <div class="playlist-detail" v-if="list.id">
    <div class="header">
      <div class="img-wrap">
        <img :src="getImgUrl(list.coverImgUrl, 400)" />
      </div>
      <div class="content">
        <div class="title-wrap">
          <p class="title">{{ list.name }}</p>
        </div>
        <div class="creator-wrap">
          <img :src="list.creator.avatarUrl" class="avatar" />
          <p class="creator">{{ list.creator.nickname }}</p>
          <p class="create-time">
            {{ formatDate(list.createTime, "yyyy-MM-dd") }} 创建
          </p>
        </div>
        <div class="action-wrap" @click="playAll">
          <L-Button class="button">
            <play-icon></play-icon>
            <span class="middle">播放全部</span>
          </L-Button>
        </div>
        <div class="desc-wrap">
          <p class="desc" v-if="tagsText">
            <span>标签：{{ tagsText }}</span>
          </p>
          <p class="desc" v-if="list.description">
            <span class="value">简介：{{ list.description }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="tabs-wrap">
      <L-Tab :data="tabs" type="theme" v-model:active="activeTab" />
      <el-input
        class="input"
        placeholder="搜索歌单音乐"
        prefix-icon="el-icon-search"
        v-model="searchValue"
      ></el-input>
    </div>
    <SongTable
      :song-list="filteredSongs"
      class="table"
      v-show="activeTab === 0"
    />
    <div class="comments" v-show="activeTab === 1">
      <CommentList :id="id" type="playlist" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getListDetail, getSongDetail } from '@/api'
import { createSong, getImgUrl, formatDate } from '@/utils';
import { useMusicStore } from '@/store/music'
const musicStore = useMusicStore()
const route = useRoute()
const id = route.params?.id
const tabs = ref(["歌曲列表", "评论"])
const activeTab = ref(0)
const searchValue = ref('')
const list = ref<any>({})
const songlist = ref([])
const tagsText = computed(() => list.value.tags.join('/'))
const filteredSongs = computed(() => songlist.value.filter(({ name, artistsText, albumName }: any) => {
  return `${name}${artistsText}${albumName}`.toLowerCase().includes(searchValue.value.toLowerCase())
}))

onMounted(() => {
  init()
})
const init = async () => {
  const { playlist } = await getListDetail({id}) as any
  list.value = playlist
  const trackIds = playlist.trackIds.map((item: any) => item.id)
  const songDetails = await getSongDetail(trackIds.slice(0, 500)) as any
  const songs = songDetails.songs.map(({ id, name, al, ar, mv, dt }: any) =>
    createSong({
      id,
      name,
      artists: ar,
      duration: dt,
      mvId: mv,
      albumName: al.name,
      img: al.picUrl,
    }),
  )
  songlist.value = songs
  console.log(list.value, songlist.value);
}

const playAll = () => {
  musicStore.playlist = songlist.value
  musicStore.startSong(songlist.value[0])
}

</script>

<style lang="scss" scoped>
.playlist-detail {
  width: 100%;
  .header {
    display: flex;
    padding: 36px;

    .img-wrap {
      width: 200px;
      height: 200px;
      margin-right: 24px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      .title-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        .title {
          font-size: 12px;
          color: #fff;
        }
      }

      .action-wrap {
        margin-bottom: 18px;

        .button {
          background: #f95043;
          background: linear-gradient(to right, #fa5143, #f44d41, #d53b32);
          color: #fbdfdd;
          border: none;

          .icon {
            margin-right: 4px;
          }

          .middle {
            margin-left: 5px;
            vertical-align: middle;
          }
        }
      }

      .creator-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 18px;

        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 8px;
        }

        .creator {
          margin-right: 8px;
        }

        .create-time {
          font-size: 12px;
        }
      }

      .desc {
        margin-bottom: 8px;

        .label {
          display: inline-block;
          margin-right: 8px;
        }

        .value {
          @include text-ellipsis-multi(3);
        }
      }
    }
  }
  .tabs-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 24px;
    border-bottom: 1px solid #fff;

    .input {
      width: 125px;

    }
  }

  .empty {
    @include flex-center;
    height: 200px;

    .keyword {
      color: blue;
    }
  }

  .comments {
    padding: 16px 32px;
  }
}
</style>