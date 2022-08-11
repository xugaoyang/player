<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Howl, Howler } from 'howler'
import songSrc from '@/assets/kill the game.mp3'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons-vue'

const player = reactive({
  status: false,
  currentPos: 0,
  duration: 0,
  mute: false,
  volume: 1,
})

let id: any = null
const sound = new Howl({
  src: [songSrc],
  html5: true,
  onload: () => {
    console.log('load')
  },
  onplay: () => {
    console.log('play')
  },
  onend: () => {
    console.log('finished')
  },
  onpause: () => {
    console.log('pause')
  },
  onstop: () => {
    console.log('stop')
  },
})

const play = () => {
  sound.play()
  // 定时器打开跑进度
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
// get duration
const currentTime = () => {
  console.log(sound)
  player.currentPos = Math.round(sound.seek())
  player.duration = sound.duration()
}

// 秒转换分秒
const secToMin = (second:number) => {
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
  <CaretRightOutlined @click="play" />
  <PauseOutlined @click="pause" />
  <div>
    <a-button type="primary" @click="changeMute">静音状态</a-button>
    <span>{{ player.mute }}</span>
  </div>
  <div class="pt-5">
    <a-button type="primary" @click="changeVolume">音量</a-button>
    <div style="width: 100px">
      <a-slider
        v-model:value="player.volume"
        :min="0"
        :max="1"
        :step="0.1"
        @change="changeVolume"
      />
    </div>

    <span>{{ player.volume }}</span>
  </div>

  <div class="pt-5">
    <a-button type="primary" @click="currentTime">时间</a-button>{{secToMin(player.currentPos)}} -- {{ secToMin(player.duration) }}
  </div>
</template>

<style></style>
