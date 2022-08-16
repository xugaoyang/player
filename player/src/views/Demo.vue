<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Howl, Howler } from 'howler'
import song0 from '@/assets/songs/kill the game.mp3'
import song1 from '@/assets/songs/少数派报告.mp3'
import song2 from '@/assets/songs/What Do You Mean.mp3'
import {
  CaretRightOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  PauseOutlined,
  createFromIconfontCN,
} from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3583965_6y2o1lofk4m.js',
})

const player = reactive({
  playing: false, // 是否播放
  currentSong: {
    id: '',
    name: '',
    singer: '',
    src: '',
  }, // 当前歌曲
  currentIndex: 0, // 当前序号
  currentTime: 0, // 当前歌曲进度，秒
  currentPos: 0, // 当前歌曲进度，百分比
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
    },
    {
      id: '2',
      name: '少数派报告',
      singer: 'Tizzy T、VaVa毛衍七、Jony J、布瑞吉Bridge、黄旭',
      src: song1,
    },
    {
      id: '3',
      name: 'What Do You Mean',
      singer: 'Justin Bieber',
      src: song2,
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
      player.duration = Math.round(sound.duration())
    },
    onplay: () => {
      player.playing = true
      console.log('play')
      // 定时器打开跑进度
      timer = setInterval(() => {
        player.currentTime = Math.round(sound.seek())
        player.currentPos = Math.round((sound.seek() / sound.duration()) * 100)
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
  }
  console.log(player.loopMode)
  // 列表循环，自动播放下一首
  if (player.loopMode === 'list') {
    toNext()
  }
  // 单曲循环
  if (player.loopMode === 'single') {
    sound.loop(true)
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

// 秒转换分秒
const secToMin = (second: number) => {
  let minute: number = 0
  if (second < 60) {
    return second < 10 ? `0${minute}:0${second}` : `0${minute}:${second}`
  } else {
    minute = Math.round(second / 60)
    second = Math.round(second % 60)
    const m = minute < 10 ? `0${minute}` : minute
    const s = second < 10 ? `0${second}` : second
    return `${m}:${s}`
  }
}
</script>

<template>
  <div>howler测试</div>
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
  <div class="flex justify-start items-center">
    <div>
      <a-tooltip v-if="player.loopMode === 'single'">
        <template #title>单曲循环</template>
        <icon-font type="icon-single-circle" @click="changeLoop" />
      </a-tooltip>
      <a-tooltip v-else-if="player.loopMode === 'list'">
        <template #title>列表循环</template>
        <icon-font type="icon-list-circle" @click="changeLoop" />
      </a-tooltip>
      <a-tooltip v-else>
        <template #title>关闭循环</template>
        <icon-font type="icon-close-circle" @click="changeLoop" />
      </a-tooltip>
    </div>
    <div>
      <StepBackwardOutlined @click="toPrev" />
      <CaretRightOutlined @click="pauseOrPlay" v-if="!player.playing" />
      <PauseOutlined @click="pauseOrPlay" v-else />
      <StepForwardOutlined @click="toNext" />
    </div>
    <div class="pr-5">
      <icon-font v-if="player.mute" type="icon-sound-mute" @click="changeMute" />
      <icon-font v-else type="icon-sound-filling" @click="changeMute" />
    </div>
    <div class="pr-5" style="width: 100px">
      <a-slider
        v-model:value="player.volume"
        :min="0"
        :max="1"
        :step="0.1"
        @change="changeVolume"
        :tooltip-visible="false"
      />
    </div>
    <div>
      {{ secToMin(player.currentTime)
      }}<a-progress
        :stroke-color="{
          from: '#108ee9',
          to: '#87d068',
        }"
        status="active"
        :percent="player.currentPos"
        :show-info="false"
        style="width: 100px"
      />{{ secToMin(player.duration) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.anticon) {
  font-size: 16px;
}
</style>
