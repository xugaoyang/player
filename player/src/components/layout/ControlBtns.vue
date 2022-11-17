<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import {
  createFromIconfontCN,
  PauseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3583965_416phhby9e7.js'
})
import { getSongUrl } from '@/api/info'
import { usePlayerStore } from '@/store/player'
import Songs from './Songs.vue'

const playerStore = usePlayerStore()
const { player, currentSong, currentIndex, list } = storeToRefs(playerStore)

console.log(currentSong, currentIndex, player)

const strokeColor = ref('#000')
const showSongsStatus = ref(false)
const iconFontSize = reactive({
  fontSize: '26px'
})

const pauseOrPlay = () => {
  if (playerStore.player.isPlaying) {
    playerStore.player.pause()
  } else {
    playerStore.player.play()
  }
}

// mute
const changeMute = () => {
  console.log('mute', playerStore.player.mute)
  playerStore.player.mute = !playerStore.player.mute
  playerStore.player.SET_MUTE()
}

const changeVolume = (val: number) => {
  player.volume = val
  playerStore.player.SET_VOLUME()
}

const showLyric = () => {
  console.log('show me lyric')
  player.isLyricShow = !player.isLyricShow
}
// 秒转换分秒
const secToMin = (second: number) => {
  second = Math.floor(second)
  let minute: number = 0
  if (second < 60) {
    return second < 10 ? `0${minute}:0${second}` : `0${minute}:${second}`
  }
  minute = Math.floor(second / 60)
  second = Math.floor(second % 60)
  const m = minute < 10 ? `0${minute}` : minute
  const s = second < 10 ? `0${second}` : second
  return `${m}:${s}`
}

const showSongsPanel = () => {
  showSongsStatus = !showSongsStatus
}

// 播放列表展示
</script>

<template>
  <div class="footer bg-white flex justify-between items-center relative">
    <div class="song-info flex">
      <div class="song-cover mr-5px">
        <img :src="player.currentSong.al.picUrl" />
      </div>
      <div>
        <div class="song font-bold">{{ player.currentSong.name || '--'}}</div>
        <div class="singer font-bold text-12px">{{ player.currentSong.ar[0].name || '--'}}</div>
      </div>
    </div>
    <div class="player-control">
      <div class="player-control-btns flex justify-around items-center">
        <a-tooltip v-if="player.loopMode === 'single'" class="pr-5px">
          <template #title>单曲循环</template>
          <icon-font type="icon-single-circle" @click="player.changeLoop()" />
        </a-tooltip>
        <a-tooltip v-else-if="player.loopMode === 'list'" class="pr-5px">
          <template #title>列表循环</template>
          <icon-font type="icon-list-circle" @click="player.changeLoop()" />
        </a-tooltip>
        <a-tooltip v-else class="pr-5px">
          <template #title>关闭循环</template>
          <icon-font type="icon-close-circle" @click="player.changeLoop()" />
        </a-tooltip>
        <StepBackwardOutlined
          :style="iconFontSize"
          @click="player.toPrevSong()"
        />
        <span>
          <PauseOutlined
            v-if="player.isPlaying"
            :style="iconFontSize"
            @click="pauseOrPlay()" /><CaretRightOutlined
            :style="iconFontSize"
            v-else
            @click="pauseOrPlay()"
        /></span>
        <StepForwardOutlined
          :style="iconFontSize"
          @click="player.toNextSong()"
        />

        <icon-font class="icon-lyric pl-5px" type="icon-lyric" />
      </div>
      <div class="player-control-slider flex justify-around items-center">
        <span class="pr-5px font-bold">{{
          secToMin(playerStore.player.currentTime)
        }}</span>
        <a-progress
          :percent="playerStore.player.currentPos"
          :stroke-color="strokeColor"
          :showInfo="false"
        />
        <span class="pl-5px font-bold">{{ secToMin(player.currentSong.dt / 1000) }}</span>
      </div>
    </div>
    <div class="other-control text-right">
      <a-popover>
        <template #content>
          <div class="h-50px">
            <a-slider
              v-model:value="player.volume"
              :min="0"
              :max="1"
              :step="0.1"
              @change="changeVolume"
              :tooltip-visible="false"
              vertical
            />
          </div>
        </template>
        <icon-font v-if="player.volume === 0" type="icon-sound-mute" class="pr-5px" :style="iconFontSize" @click="changeMute()" />
        <icon-font v-else type="icon-sound-filling" class="pr-5px" :style="iconFontSize" @click="changeMute()" />
      </a-popover>
      <MenuUnfoldOutlined :style="iconFontSize" @click="showSongsStatus = !showSongsStatus" />
    </div>
    <div class="play-list absolute right-0 bg-white" v-if="showSongsStatus">
      <Songs></Songs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.anticon) {
  font-size: 20px;

  &.icon-lyric {
    font-size: 18px;
    font-weight: bold;
  }
}

.footer {
  padding: 0 50px;
  height: 50px;

  .song-info {
    max-width: 150px;
  }

  .song-cover {
    width: 40px;
    height: 40px;
    border-radius: 4px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  .player-control {
    width: 200px;
  }

  .other-control {
    width: 100px;
  }
}

.play-list {
  top: -600px;
  overflow-y: auto;
  width: 200px;
  height: 600px;
}
</style>
