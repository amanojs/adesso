import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favShops: [],
    nearShops: []
  },
  getters: {
    favShops: state => state.favShops,
    nearShops: state => state.nearShops
  },
  mutations: {
    updateFavShops(state, shops) {
      state.favShops = shops
    },
    updateNearShops(state, shops) {
      state.nearShops = shops
    }
  },
  actions: {
    async getFavShops({ commit }) {
      const { data } = await axios.get("http://localhost:9000/api/shops/getFavShops")
      commit("updateFavShops", data)
    },
    async getNearShops({ commit }) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          const lat = coords.latitude
          const lon = coords.longitude
          const { data } = await axios.post("http://localhost:9000/api/shops/getNearShops", { lat, lon })
          for (const [i, shop] of data.entries()) {
            if (shop.graphData.length !== 0) {
              data[i].graphData = {
                labels: ["おいしさ", "値段", "接客", "雰囲気", "速さ"],
                datasets: [
                  {
                    label: "評価",
                    backgroundColor: "rgba(230,126,34,0.4)",
                    data: [
                      shop.graphData[0].taste,
                      shop.graphData[0].price,
                      shop.graphData[0].service,
                      shop.graphData[0].atmosphere,
                      shop.graphData[0].speed,
                    ],
                  },
                ],
              };
            } else {
              data[i].graphData = null
            }
            if (shop.tags != null) {
              data[i].tags = shop.tags.split(",")
            }
          }
          console.log(data)
          commit("updateNearShops", data)
        })
      } else {
        console.log("この端末は位置情報をを取得できません。")
        return
      }
    }
  },
  modules: {
  }
})
