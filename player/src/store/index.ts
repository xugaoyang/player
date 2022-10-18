import { defineStore } from 'pinia'
import Player from '@/utils/player'

let howler_player = new Player()
console.log(howler_player)
export const useMainStore = defineStore('mainStore', {
  persist: {
    key: 'mainStore',
    storage: localStorage,
  },
  state: () => {
    return {
      player: howler_player,
      account: {},
      profile: {},
      token: '',
      cookie: '',
    }
  },
  getters: {
    getAccount(state) {
      return state.account
    },
    getProfile(state) {
      return state.profile
    },
    getToken(state) {
      return state.token
    },
    getCookie(state) {
      return state.cookie
    },
  },
  actions: {
    changeAccount(data: any) {
      Object.assign(this.account, data)
    },
    changeProfile(data: any) {
      Object.assign(this.profile, data)
    },
    changeToken(data: string) {
      this.token = data
    },
    changeCookie(data: string) {
      this.cookie = data
    },
  },
})
