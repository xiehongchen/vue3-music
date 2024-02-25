<template>
  <transition name="slide">
    <div v-if="hasCurrentSong" :class="getPlayerShowCls" class="player">
      <div class="content">
        <div class="song">
          <div class="left">
            <img
              class="play-bar-support"
              src="@/assets/image/play-bar-support.png"
            />
            <img
              :class="{playing}"
              class="play-bar"
              src="@/assets/image/play-bar.png"
            />
            <div
              class="img-outer-border"
              ref="disc"
            >
              <div
              :class="{paused: !playing}"
                class="img-outer"
                ref="discRotate"
              >
                <div class="img-wrap">
                  <img v-lazy="getImgUrl(currentSong.img || '', 400)" />
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="name-wrap">
              <p class="name">{{currentSong.name}}</p>
              <span
                @click="onGoMv"
                class="mv-tag"
                v-if="currentSong.mvId"
              >MV</span>
            </div>
            <div class="desc">
              <div class="desc-item">
                <div class="label">歌手</div>
                <div class="value">{{currentSong.artistsText}}</div>
              </div>
            </div>
            <div v-if="nolyric">还没有歌词哦~</div>
            <scroller :data="lyricList"></scroller>
          </div>
          <!-- <div class="bottom">
            <div class="left">
              <Comments
                :id="currentSong.id"
                ref="comments"
                v-if="currentSong.id"
              />
            </div>
            <div
              class="right"
              v-if="simiPlaylists.concat(simiSongs).length"
            >
              <Loading
                :loading="simiLoading"
                v-if="simiLoading"
              />
              <div v-else>
                <div
                  class="simi-playlists"
                  v-if="simiPlaylists.length"
                >
                  <p class="title">包含这首歌的歌单</p>
                  <div
                    :key="simiPlaylist.id"
                    class="simi-item"
                    v-for="simiPlaylist in simiPlaylists"
                  >
                    <Card
                      :img="simiPlaylist.coverImgUrl"
                      :name="simiPlaylist.name"
                      @click="onClickPlaylist(simiPlaylist.id)"
                    >
                      <template v-slot:desc>
                        <div class="desc">
                          <Icon
                            :size="12"
                            color="shallow"
                            type="play"
                          />
                          <p class="count">{{$utils.formatNumber(simiPlaylist.playCount)}}</p>
                        </div>
                      </template>
                    </Card>
                  </div>
                </div>
                <div
                  class="simi-songs"
                  v-if="simiSongs.length"
                >
                  <p class="title">相似歌曲</p>
                  <div
                    :key="simiSong.id"
                    class="simi-item"
                    v-for="simiSong in simiSongs"
                  >
                    <Card
                      :desc="simiSong.artistsText"
                      :img="simiSong.img"
                      :name="simiSong.name"
                      @click="onClickSong(simiSong)"
                    >
                      <template v-slot:img-mask>
                        <PlayIcon class="play-icon" />
                      </template>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang='ts'>
import { getLyric } from '@/api/song'
import { getImgUrl } from '@/utils'
import { useMusicStore } from '@/store/music'
const musicStore = useMusicStore()
const hasCurrentSong = computed(() => musicStore.hasCurrentSong)
const currentSong = computed(() => musicStore.currentSong)
const playing = computed(() => musicStore.playing)
const getPlayerShowCls = computed(() => {
  return musicStore.isPlayerShow ? 'show' : 'hide'
})

// 更新歌曲
const updateSong = () => {
  updateLyric()
}
// 没有歌词
const nolyric = ref(false)
// 歌词数据
const lyricList = ref<any[]>([])
const tlyricList = ref<any[]>([])
const updateLyric = async () => {
  const result = await getLyric(currentSong.value.id!) as any
  console.log('result', result)
  nolyric.value = !result.lrc.lyric || result.lrc === undefined
  if (!nolyric.value) {
    const { lyric, tlyric } = lyricParser(result)
    lyricList.value = lyric
    tlyricList.value = tlyric
    console.log('lyricList', lyricList.value);
    console.log('tlyricList', tlyricList.value);
    
  }
}

const onGoMv = () => {

}

const lyricWithTranslation = computed(() => {
  let ret: any[] = []
  // 空内容的去除
  const lyricFilltered = lyricList.value.filter((l: any) => Boolean(l.content))
  // content统一转换为数组
  if (lyricFilltered.length) {
    lyricFilltered.forEach((l: any) => {
      const { time, content } = l
        const lyricItem = { time, content, contents: [content] }
        const sameTimeTLyric = tlyricList.value.find(
          ({ time: tLyricTime }) => tLyricTime === time
        )
        if (sameTimeTLyric) {
          const { content: tLyricContent } = sameTimeTLyric
          if (content) {
            lyricItem.contents.push(tLyricContent)
          }
        }
        ret.push(lyricItem)
    })
  } else {
    ret = lyricFilltered.map(({ time, content }) => ({
      time, content, contents: [content] })
    )
  }
  return ret
})

console.log('lyricWithTranslation', lyricWithTranslation.value);


const activeLyricIndex = computed(() => {
  return lyricWithTranslation.value ? lyricWithTranslation.value.findIndex((l: any, index: number) => {
    const nextLyric = lyricWithTranslation.value[index + 1]
    return (
      musicStore.currentTime > l.time &&
      (nextLyric ? musicStore.currentTime < nextLyric.time : true)
    )
  }) : -1
})

const getActiveCls = (index: number) => {
  return index === activeLyricIndex.value ? 'active' : ''
}

console.log(getActiveCls);


watch(() => currentSong.value.id, () => {
  updateSong()
}, { immediate: true })

function lyricParser(lyric: any) {
  return {
    'lyric': parseLyric(lyric.lrc.lyric || ''), 
    'tlyric': parseLyric(lyric.tlyric.tlyric || ''),
    'lyricuser': lyric.lyricUser,
    'transuser': lyric.transUser,
  }
}
// 解析歌词字符串
function parseLyric(lrc: any) {
  var lines = lrc.split('\n');
  var result = []; // 歌词对象数组
  for (var i = 0; i < lines.length; i++) {
    var str = lines[i];
    var parts = str.split(']');
    var timeStr = parts[0].substring(1);
    var obj = {
      time: parseTime(timeStr),
      word: parts[1],
    };
    result.push(obj);
  }
  return result;
}
function parseTime(timeStr: string) {
  var parts = timeStr.split(':');
  return +parts[0] * 60 + +parts[1];
}

</script>

<style scoped lang='scss'>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}

$img-left-padding: 36px;
$img-outer-border-d: 320px;
$img-outer-d: 300px;

.player {
  position: fixed;
  top: $header-height;
  bottom: $player-height;
  left: 0;
  right: 0;
  padding: 0 36px;
  background: #F9F9F9;
  z-index: 1000;
  overflow: hidden;
  overflow-y: auto;
  transition: transform 0.5s;

  &.hide {
    transform: translateY(105%);
  }

  &.show {
    transform: none;
  }

  .content {
    max-width: 870px;
    margin: auto;

    .song {
      display: flex;
      max-height: 500px;

      .left {
        position: relative;
        padding: 80px 70px 0 $img-left-padding;
        display: flex;
        justify-content: center;

        $support-d: 30px;
        $support-d-half: calc($support-d / 2);
        .play-bar-support {
          position: absolute;
          left: $img-left-padding + calc($img-outer-border-d / 2) - calc($support-d / 2);
          top: -$support-d-half;
          width: $support-d;
          height: $support-d;
          z-index: 2;
        }

        .play-bar {
          $w: 100px;
          $h: 146px;
          position: absolute;
          top: 0;
          left: $img-left-padding + calc($img-outer-border-d / 2) - 6px;
          width: $w;
          height: $h;
          z-index: 1;
          transform-origin: 0 0;
          transform: rotate(-30deg);
          transition: all 0.3s;

          &.playing {
            transform: rotate(5deg);
          }
        }

        .img-outer-border {
          @include round($img-outer-border-d);
          @include flex-center;
          background: #E6E5E6;

          .img-outer {
            @include round($img-outer-d);
            @include flex-center;
            background: black;
            background: linear-gradient(-45deg, #333540, #070708, #333540);
            animation: rotate 20s linear infinite;

            &.paused {
              animation-play-state: paused;
            }

            .img-wrap {
              @include img-wrap(200px);

              img {
                border-radius: 50%;
              }
            }
          }
        }
      }

      .right {
        flex: 1;
        padding-top: 45px;
        .name-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;

          .name {
            font-size: 24px;
            color: #333;
          }

          .mv-tag {
            display: inline-block;
            margin-left: 8px;
            padding: 2px;
            border: 1px solid currentColor;
            border-radius: 2px;
            color: red;
            cursor: pointer;
          }
        }

        .artists {
          margin-bottom: 16px;
        }

        .desc {
          display: flex;
          justify-content: center;
          font-size: 12px;
          margin-bottom: 10px;

          .desc-item {
            display: flex;
            margin-right: 32px;
            .label {
              display: inline-block;
              margin-right: 4px;
            }

            .value {
              color: blue;
            }
          }
        }

        .lyric-wrap {
          width: 380px;
          height: 350px;
          mask-image: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0) 0,
            hsla(0, 0%, 100%, 0.6) 15%,
            #fff 25%,
            #fff 75%,
            hsla(0, 0%, 100%, 0.6) 85%,
            hsla(0, 0%, 100%, 0)
          );

          .lyric-item {
            margin-bottom: 16px;
            font-size: 12px;

            &.active {
              font-size: 14px;
              color: #fff;
              font-weight: 700;
            }

            .lyric-text {
              margin-bottom: 8px;
            }
          }
        }
      }
    }

    .bottom {
      display: flex;
      margin-top: 48px;
      margin-bottom: 36px;

      .left {
        flex: 1;
      }

      .right {
        padding-left: 36px;
        width: 28%;
        overflow: hidden;

        .simi-playlists {
          margin-bottom: 36px;
        }

        .simi-songs {
          .play-icon {
            @include abs-center;
          }
        }

        .simi-item {
          margin-bottom: 6px;
        }

        .title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .desc {
          display: flex;
          align-items: center;

          .count {
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>