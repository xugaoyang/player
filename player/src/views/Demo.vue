<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Howl, Howler } from 'howler'
import songSrc from '@/assets/kill the game.mp3'
import { CaretRightOutlined, PauseOutlined, createFromIconfontCN } from '@ant-design/icons-vue'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3583965_hva988pncgw.js',
})

const player = reactive({
  playing: false,
  currentTime: 0,
  currentPos: 0,
  duration: 0,
  mute: false,
  volume: 1,
})

let timer: any
const sound = new Howl({
  src: [songSrc],
  html5: true,
  onload: () => {
    console.log('load')
  },
  onplay: () => {
    player.playing = true
    console.log('play')
  },
  onend: () => {
    console.log('finished')
    if (timer) {
      clearInterval(timer)
    }
  },
  onpause: () => {
    player.playing = false
    console.log('pause')
  },
  onstop: () => {
    console.log('stop')
  },
})

const play = () => {
  sound.play()
  player.duration = sound.duration()
  // 定时器打开跑进度
  timer = setInterval(() => {
    player.currentTime = Math.round(sound.seek())
    player.currentPos = Math.round((sound.seek() / sound.duration()) * 100)
  }, 1000)
}
const pause = () => {
  sound.pause()
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
  <div class="flex justify-start items-center">
    <div><CaretRightOutlined @click="play" v-if="!player.playing" /> <PauseOutlined @click="pause" v-else /></div>
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
:deep(.anticon){
  font-size: 16px;
}
</style>
