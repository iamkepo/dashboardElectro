import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminInfo: {}
  },
  mutations: {
    getAdminInfo(state) {
      state.adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    },
    resetAdminInfo(state) {
      state.adminInfo = null;
    }
  },
  actions: {
  },
  getters: {
    adminLevel(state) {
      return state.adminInfo ? state.adminInfo.level : null;
    }
  }
})
