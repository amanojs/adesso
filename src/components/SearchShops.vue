<template>
  <div class="near_list">
    <div
      v-for="(item, i) in searchShops"
      :key="i"
      :class="[
        (i + 1) % 4 === 0 ? 'right near_card' : 'near_card',
        (i + 1) % 2 === 0 ? 'mod' : '',
      ]"
    >
      <router-link :to="`/about?id=${item.shop_id}`">
        <img
          v-if="item.image !== null"
          :src="`http://localhost:9000/images/shops/${item.image}`"
          width="100%"
          height="220px"
          style="object-fit: cover"
          alt="fav_shop"
        />
        <v-layout
          style="width: 100%; height: 220px; background-color: #555"
          v-else
          justify-center
          align-center
        >
          <v-icon x-large>mdi-image-off-outline</v-icon>
        </v-layout>
        <div class="card_box">
          <h3>{{ item.shop_name }}</h3>
          <p>{{ item.address }}</p>
          <div class="category_box">
            <div class="category" v-for="tag in item.tags" :key="tag">
              {{ tag }}
            </div>
            <div v-if="!item.tags" class="no-category">関連タグ無し</div>
          </div>
          <div class="graph">
            <radar-chart
              v-if="item.graphData"
              height="180"
              :chart-data="item.graphData"
              :options="options"
            ></radar-chart>
            <div v-else>
              <div>
                <v-avatar class="mb-1" size="30" color="#999"
                  ><v-icon size="15" color="#fff"
                    >mdi-pencil-off-outline</v-icon
                  ></v-avatar
                >
              </div>
              <p>まだレビューが投稿されていません</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import RadarChart from "@/plugins/charts/radar.js";
import { mapGetters } from "vuex";

export default {
  components: {
    RadarChart,
  },
  data: () => ({
    options: {
      legend: {
        display: false,
      },
      responsive: true,
      scale: {
        ticks: {
          max: 5,
          min: 0,
          stepSize: 1,
        },
      },
    },
  }),
  mounted() {
    console.log(this.searchShops);
  },
  methods: {},
  computed: {
    tagSplit: (tags) => {
      return console.log(tags), tags !== null ? tags.split(",") : [];
    },
    ...mapGetters(["searchShops"]),
  },
};
</script>

<style scoped>
.near_list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
}
.near_card {
  width: 23%;
  height: 500px;
  margin-right: 2.6%;
  margin-bottom: 40px;
  box-shadow: 0 0 8px #e9e9e9;
}
.card_box {
  box-sizing: border-box;
  padding: 10px 20px;
}
.near_card h3 {
  font-size: 15px;
  text-align: left;
}
.card_box p {
  font-size: 13px;
  color: #555;
  text-align: left;
  margin-bottom: 10px;
}
.category_box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0px;
}
.category {
  padding: 3px 15px;
  margin-top: 0px;
  margin-right: 4px;
  font-size: 11px;
  color: #fff;
  background-color: #e67e22;
  border-radius: 30px;
  box-shadow: 0 0 8px #e5e5e5;
}
.no-category {
  padding: 3px 15px;
  margin-top: 0px;
  margin-right: 4px;
  font-size: 11px;
  color: #fff;
  background-color: #666;
  border-radius: 2px;
  box-shadow: 0 0 8px #e5e5e5;
}
.graph {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  /* border: 1px solid #eee; */
}

.right {
  margin-right: 0;
}

@media screen and (max-width: 1350px) and (min-width: 645px) {
  .near_card {
    width: 48.5%;
    height: 580px;
  }
  .mod {
    margin-right: 0;
  }
  @media screen and (max-width: 900px) {
    .near_card {
      height: 500px;
    }
  }
}

@media screen and (max-width: 645px) and (min-width: 401px) {
  .near_card {
    width: 100%;
    height: 580px;
    margin-bottom: 10px;
    margin-right: 0px;
  }
}

@media screen and (max-width: 400px) {
  .near_card {
    width: 100%;
    height: 500px;
    margin-bottom: 10px;
    margin-right: 0px;
  }
}
</style>