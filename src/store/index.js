import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favShops: []
  },
  getters: {
    favShops: state => state.favShops
  },
  mutations: {
    updateFavShops(state, shops) {
      state.favShops = shops
    }
  },
  actions: {
    async getFavShops({ commit }) {
      const { data } = await axios.get("http://localhost:9000/api/shops/getFavShops")
      commit("updateFavShops", data)
    }
  },
  modules: {
  }
})
