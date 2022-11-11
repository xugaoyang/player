import { defineStore } from 'pinia'
import Player from '@/utils/player'
import {getSongDetail} from '@/api/info'

let howler_player = new Player()
export const usePlayerStore = defineStore('playerStore', {
  persist: {
    key: 'player',
    storage: localStorage
  },
  state: () => {
    return {
      player: howler_player,
      list: [],
      currentSong: {
        al: {
          picUrl: '/src/assets/avatar.png'
        },
        ar: [
          {
            name: ''
          }
        ],
        name: '',
        dt: 0,
        id: ''

      },
      currentIndex: 0
    }
  },
  getters: {
    getList(state) {
      return state.list
    },
    getCurrentSong(state) {
      return state.currentSong
    },
    getCurrentIndex(state) {
      return state.currentIndex
    }
  },
  actions: {
    async addToList(data: any) {
      const hasIdx = this.list.findIndex((val) => val.id === data.id)
      console.log('是否有重复id数据', hasIdx)
      if (hasIdx < 0) {
        const currentIdx = this.list.findIndex(
          (val) => val!.id === this.currentSong!.id
        )
        this.currentIndex = currentIdx + 1
        this.list.splice(currentIdx + 1, 0, data)
      } else {
        this.currentIndex = hasIdx
      }
      const currentSongInfo = await getSongDetail(data.id)
      console.log(currentSongInfo)
      this.currentSong = currentSongInfo.songs[0]
    },
    replaceList(data: any) {
      this.list = data
    },
    toPrevSong() {
      const currentIndex =
        this.currentIndex - 1 < 0 ? this.list.length - 1 : this.currentIndex - 1
      this.currentIndex = currentIndex
      this.currentSong = this.list[this.currentIndex]
    },
    toNextSong() {
      const currentIndex =
        this.currentIndex + 1 === this.list.length ? 0 : this.currentIndex + 1
      this.currentIndex = currentIndex
      this.currentSong = this.list[this.currentIndex]
    }
  }
})
