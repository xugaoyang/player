<script setup lang="ts">
import { ref, reactive} from 'vue'
import {
  PauseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
} from '@ant-design/icons-vue'
const progress = ref(30)
const strokeColor = ref('#000')
const isPlaying = ref(false)
const songInfo = reactive({
  cover: `/src/assets/avatar.png`,
  name: '--',
  singer: '--',
  duration: '04:00'
})
const iconFontSize = reactive({
  fontSize: '26px'
})
</script>

<template>
  <div class="footer bg-white flex justify-between items-center">
    <div class="song-info flex">
      <div class="song-cover mr-2">
        <img :src="songInfo.cover" />
      </div>
      <div>
        <div class="song">{{songInfo.name}}</div>
        <div class="singer">{{songInfo.singer}}</div>
      </div>
    </div>
    <div class="player-control">
      <div class="player-control-btns flex justify-around items-center">
        <StepBackwardOutlined :style="iconFontSize"/>
        <span> <PauseOutlined v-if="isPlaying" :style="iconFontSize" /><CaretRightOutlined  :style="iconFontSize" v-else /></span>
        <StepForwardOutlined :style="iconFontSize" />
      </div>
      <div class="player-control-slider flex justify-around items-center">
        <span class="pr-2">00:00</span>
        <a-progress :percent="progress" :stroke-color="strokeColor" :showInfo="false" />
        <span class="pl-2">{{songInfo.duration}}</span>
      </div>
    </div>
    <div class="other-control">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  height: 50px;
  padding: 0 50px;
  .song-cover {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
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
