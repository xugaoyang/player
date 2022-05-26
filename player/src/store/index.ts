import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'mainStore',
        storage: localStorage,
      },
    ],
  },
  state: () => {
    return {
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
