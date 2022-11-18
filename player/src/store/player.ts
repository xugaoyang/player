import { defineStore } from 'pinia'
import Player from '@/utils/player'

let howler_player = new Player()
export const usePlayerStore = defineStore('playerStore', {
  persist: {
    key: 'player',
    storage: localStorage
  },
  state: () => {
    return {
      player: howler_player,
    }
  },
  getters: {
  },
  actions: {
  }
})
