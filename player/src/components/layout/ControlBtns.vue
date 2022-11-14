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

const playerStore = usePlayerStore()
const { player, currentSong, currentIndex, list } = storeToRefs(playerStore)

console.log(currentSong, currentIndex, player)
const progress = ref(30)
const strokeColor = ref('#000')
const isPlaying = ref(false)

const iconFontSize = reactive({
  fontSize: '26px'
})

const getSongUrlById = async (id: string) => {
  const res = await getSongUrl(id)
  if (res.code === 200) {
    return res.data[0].url
  }
  return ''
}

const toPrev = async () => {
  await playerStore.toPrevSong()
  console.log(toRaw(currentSong), toRaw(currentSong.value))
  const res = await getSongUrlById(toRaw(currentSong.value).id)
  playerStore.player.playAudioSource(res)
}

const toNext = async () => {
  await playerStore.toNextSong()
  const res = await getSongUrlById(toRaw(currentSong.value).id)
  playerStore.player.playAudioSource(res)
}

const pauseOrPlay = () => {
  if (playerStore.player.isPlaying) {
    playerStore.player.pause()
  } else {
    playerStore.player.play()
  }
}

// mute
const changeMute = () => {
  player.mute = !player.mute
  sound.mute(player.mute)
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

// 播放列表展示
</script>

<template>
  <div class="footer bg-white flex justify-between items-center">
    <div class="song-info flex">
      <div class="song-cover mr-5px">
        <img :src="player.currentSong.al.picUrl" />
      </div>
      <div>
        <div class="song">{{ player.currentSong.name }}</div>
        <div class="singer">{{ player.currentSong.ar[0].name }}</div>
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
        <span class="pr-5px">{{
          secToMin(playerStore.player.currentTime)
        }}</span>
        <a-progress
          :percent="playerStore.player.currentPos"
          :stroke-color="strokeColor"
          :showInfo="false"
        />
        <span class="pl-5px">{{ secToMin(player.currentSong.dt / 1000) }}</span>
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
        <icon-font v-if="player.volume === 0" type="icon-sound-mute" class="pr-5px" :style="iconFontSize" />
        <icon-font v-else type="icon-sound-filling" class="pr-5px" :style="iconFontSize" />
      </a-popover>
      <MenuUnfoldOutlined :style="iconFontSize" />
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
</style>
