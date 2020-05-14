import Vue from 'vue'
import Vuex from 'vuex'

import { getWords } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawing: {
      text: '人'
    },
    words: []
  },
  mutations: {
    setWords(state, data) {
      state.words = data
    },
    changeDrawText(state, text) {
      state.drawing.text = text
    }
  },
  actions: {
    async getWords(state) {
      return new Promise(async res=> {
        try {
          let LS = localStorage.getItem('data') || '[]'
          LS = JSON.parse(LS)
          let result = []
          if (!LS.length) {
            result = await getWords()
          } else result = LS
          state.commit('setWords', result)
        } catch (error) {
          throw new Error(error)
        }
      })
    }
  },
  modules: {
  }
})
