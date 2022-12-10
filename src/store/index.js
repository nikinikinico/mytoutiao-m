import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'toutiao_user'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY),
    cachePages: ['LayoutIndex']
  },
  getters: {},
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setItem(TOKEN_KEY, state.user)
    },
    addCachePage (state, pageName) {
      if (!state.cachePages.includes[pageName]) {
        state.cachePages.push(pageName)
      }
    },
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
