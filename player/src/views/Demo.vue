<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { Howl, Howler } from 'howler'
import song0 from '@/assets/songs/kill the game.mp3'
import song1 from '@/assets/songs/少数派报告.mp3'
import song2 from '@/assets/songs/What Do You Mean.mp3'
import songs from '@/assets/songs/lyrics'
import { parseLyric } from '@/utils/lyrics'
import {
  CaretRightOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  PauseOutlined,
  createFromIconfontCN,
} from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3583965_416phhby9e7.js',
})

interface Lyric {
  content: string
  time: number
  rawTime: string
}

const player = reactive({
  playing: false, // 是否播放
  currentSong: {
    id: '',
    name: '',
    singer: '',
    src: '',
    lyric: '',
  }, // 当前歌曲
  currentIndex: 0, // 当前序号
  currentTime: 0, // 当前歌曲进度，秒
  currentPos: 0, // 当前歌曲进度，百分比
  currentLyric: [], // 当前歌词数组列表
  currentLyricIndex: 0, // 当前歌词行数
  duration: 0, // 当前歌曲时长
  mute: false, // 是否静音
  volume: 1, // 音量
  loopMode: 'off', // 单曲:single，关闭循环:off，列表:list
  list: [
    {
      id: '1',
      name: 'kill the game',
      singer: 'Round_2、贰万、早安',
      src: song0,
      lyric: songs[0].lyric,
    },
    {
      id: '2',
      name: '少数派报告',
      singer: 'Tizzy T、VaVa毛衍七、Jony J、布瑞吉Bridge、黄旭',
      src: song1,
      lyric: songs[1].lyric,
    },
    {
      id: '3',
      name: 'What Do You Mean',
      singer: 'Justin Bieber',
      src: song2,
      lyric: songs[2].lyric,
    },
  ],
})

let timer: any
let sound: any

const play = (src: string) => {
  Howler.unload()
  sound = new Howl({
    src: [src],
    html5: true,
    onload: () => {
      console.log('load', sound.duration())
      player.duration = sound.duration()
    },
    onplay: () => {
      player.playing = true
      console.log('play', player.currentSong.lyric, parseLyric(player.currentSong.lyric))
      player.currentLyric = parseLyric(player.currentSong.lyric).filter(
        (l) => !/^作(词|曲)\s*(:|：)\s*无$/.exec(l.content)
      )
      // 定时器打开跑进度
      timer = setInterval(() => {
        player.currentTime = sound.seek()
        console.log('当前时间戳', sound.seek())
        player.currentPos = (sound.seek() / sound.duration()) * 100
        // 歌词匹配
        player.currentLyric.forEach((item, index) => {
          if (
            player.currentTime > item.time &&
            (index + 1 <= player.currentLyric.length) &&
            player.currentTime < player.currentLyric[index + 1].time
          ) {
            player.currentLyricIndex = index
            // 滚动歌词
            // document.querySelector('.lyric-panel')!.scrollTop = index * 36
            document.querySelector('.lyric-panel')!.scrollTo({top: index * 36,behavior: 'smooth'})
          }
        })
      }, 1000)
    },
    onend: () => {
      console.log('finished')

      callbackAfterFinish()
    },
    onpause: () => {
      player.playing = false
      console.log('pause')
    },
    onstop: () => {
      console.log('stop')
    },
  })
  sound.play()
}

// 当前播放完成的后续动作
const callbackAfterFinish = () => {
  if (timer) {
    clearInterval(timer)
    player.currentTime = 0
    player.currentPos = 0
    document.querySelector('.lyric-panel')!.scrollTop = 0
  }
  console.log(player.loopMode)
  // 列表循环，自动播放下一首
  if (player.loopMode === 'list') {
    toNext()
  }
  // 单曲循环
  if (player.loopMode === 'single') {
    play(player.currentSong.src)
  }
}

const clickSong = (data: any) => {
  player.currentSong = JSON.parse(JSON.stringify(data))
  player.currentIndex = player.list.findIndex((item) => item.id === player.currentSong.id)
  play(player.currentSong?.src)
}

const toPrev = () => {
  console.log('toprev')
  const currentIndex = player.list.findIndex((item, index) => index === player.currentIndex)
  player.currentIndex = currentIndex - 1 < 0 ? player.list.length - 1 : currentIndex - 1
  const prevSong = player.list[player.currentIndex]
  play(prevSong.src)
}

const toNext = () => {
  console.log('clickNext')
  const currentIndex = player.list.findIndex((item, index) => index === player.currentIndex)
  player.currentIndex = currentIndex + 1 === player.list.length ? 0 : currentIndex + 1
  const nextSong = player.list[player.currentIndex]
  play(nextSong.src)
}

const pauseOrPlay = () => {
  if (sound.playing()) {
    sound.pause()
  } else {
    sound.play()
  }
}
// change volume
const changeVolume = (val: number) => {
  player.volume = val
  sound.volume(player.volume)
}

// mute
const changeMute = () => {
  player.mute = !player.mute
  sound.mute(player.mute)
}

const changeLoop = () => {
  const loopArr = ['single', 'list', 'off']
  const idx = loopArr.findIndex((item) => item === player.loopMode)
  player.loopMode = idx + 1 === loopArr.length ? loopArr[0] : loopArr[idx + 1]
}

const showLyric = () => {
  console.log('show me lyric')
}
// 秒转换分秒
const secToMin = (second: number) => {
  second = Math.floor(second)
  let minute: number = 0
  if (second < 60) {
    return second < 10 ? `0${minute}:0${second}` : `0${minute}:${second}`
  } else {
    minute = Math.floor(second / 60)
    second = Math.floor(second % 60)
    const m = minute < 10 ? `0${minute}` : minute
    const s = second < 10 ? `0${second}` : second
    return `${m}:${s}`
  }
}
onMounted(() => {})
</script>

<template>
  <div class="font-bold text-center">howler测试</div>
  <a-list item-layout="horizontal" :data-source="player.list">
    <template #renderItem="{ item }">
      <a-list-item @click="clickSong(item)">
        <a-list-item-meta :description="item.singer">
          <template #title>
            <h4>{{ item.name }}</h4>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  <div class="control-bar flex justify-center items-center pb-2">
    <div class="control-button text-center">
      <!-- 循环按钮 -->
      <a-tooltip v-if="player.loopMode === 'single'" class="pr-5">
        <template #title>单曲循环</template>
        <icon-font type="icon-single-circle" @click="changeLoop" />
      </a-tooltip>
      <a-tooltip v-else-if="player.loopMode === 'list'" class="pr-5">
        <template #title>列表循环</template>
        <icon-font type="icon-list-circle" @click="changeLoop" />
      </a-tooltip>
      <a-tooltip v-else class="pr-5">
        <template #title>关闭循环</template>
        <icon-font type="icon-close-circle" @click="changeLoop" />
      </a-tooltip>
      <!-- 控制按钮 -->
      <StepBackwardOutlined @click="toPrev" class="pr-5" />
      <CaretRightOutlined @click="pauseOrPlay" v-if="!player.playing" class="pr-5" />
      <PauseOutlined @click="pauseOrPlay" v-else class="pr-5" />
      <StepForwardOutlined @click="toNext" />

      <!-- 歌词显示按钮 -->
      <icon-font class="icon-lyric pl-5" type="icon-lyric" @click="showLyric" />
    </div>

    <div class="control-bar-r">
      <a-popover>
        <template #content>
          <div style="height: 50px">
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
        <icon-font v-if="player.volume === 0" type="icon-sound-mute" />
        <icon-font v-else type="icon-sound-filling" />
      </a-popover>
    </div>
  </div>
  <div class="duration-bar flex justify-center items-center">
    <span class="pr-1">{{ secToMin(player.currentTime) }}</span>
    <a-progress
      :stroke-color="{
        from: '#108ee9',
        to: '#87d068',
      }"
      status="active"
      :percent="player.currentPos"
      :show-info="false"
      style="width: 200px"
    />
    <span class="pl-1">{{ secToMin(player.duration) }}</span>
  </div>

  <div class="lyric-panel">
    <div class="lyric" v-if="player.currentLyric.length">
      <p
        class="text-center lyric-text"
        :class="{
          highlight: player.currentLyricIndex === index,
        }"
        v-for="(item, index) in player.currentLyric"
      >
        {{ item.content }}
      </p>
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
.control-bar {
  position: relative;
  .control-bar-r {
    position: absolute;
    right: 20px;
    top: 0;
  }
}
.lyric-panel {
  height: 400px;
  overflow-y: scroll;
  .lyric {
  }
  .lyric-text {
    color: #666;
    &.highlight {
      color: lightcoral;
    }
  }
}
</style>

<style lang="scss">
.ant-popover-inner-content {
  padding: 5px !important;
}
.ant-slider-vertical {
  margin: 0 !important;
}
</style>
