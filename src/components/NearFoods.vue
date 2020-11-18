<template>
  <div class="nearFoods">
    <h2>近くの飲食店</h2>
    <div class="near_list">
      <div
        v-for="(item, i) in itemList"
        :key="i"
        :class="[
          (i + 1) % 4 === 0 ? 'right near_card' : 'near_card',
          (i + 1) % 2 === 0 ? 'mod' : '',
        ]"
      >
        <img
          src="../assets/shops/4.jpg"
          width="100%"
          height="220px"
          style="object-fit: cover"
          alt="fav_shop"
        />
        <div class="card_box">
          <h3>{{ item.name }}</h3>
          <p>{{ item.address }}</p>
          <div class="category_box">
            <div class="category" v-for="tag in item.tag" :key="tag">
              {{ tag }}
            </div>
          </div>
          <div class="graph">
            <radar-chart
              height="180"
              :chart-data="datacollection"
              :options="options"
            ></radar-chart>
          </div>
        </div>
      </div>
    </div>

    <div class="fav_more">
      <v-icon>mdi-arrow-down-drop-circle</v-icon>
      もっと見る
    </div>
  </div>
</template>

<script>
import RadarChart from "@/plugins/charts/radar.js";

export default {
  components: {
    RadarChart,
  },
  data: () => ({
    datacollection: null,
    options: null,
    itemList: [
      {
        id: 4,
        name: "餃子のニシヤマ",
        address: "愛知県名古屋市中村区",
        image: "../assets/shops/4.jpg",
        tag: ["コロッケ", "低価格", "揚げたて"],
        graph: [],
      },
      {
        id: 5,
        name: "スシオー",
        address: "愛知県名古屋市中村区",
        image: "../assets/shops/5.jpg",
        tag: ["寿司", "リーズナブル"],
        graph: [],
      },
      {
        id: 6,
        name: "サイゾリア",
        address: "愛知県名古屋市中村区",
        image: "../assets/shops/6.jpg",
        tag: ["イタリアン", "低価格", "多人数OK"],
        graph: [],
      },
      {
        id: 7,
        name: "洋食屋さと",
        address: "愛知県名古屋市中村区",
        image: "../assets/shops/7.jpg",
        tag: ["食べ放題"],
        graph: [],
      },
      {
        id: 8,
        name: "マクドナダル",
        address: "愛知県名古屋市中村区",
        image: "../assets/shops/8.jpg",
        tag: ["ハンバーガー", "スピーディー", "期間限定"],
        graph: [],
      },
    ],
  }),
  mounted() {
    this.fillData();
    this.options = {
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
    };
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["おいしさ", "値段", "接客", "雰囲気", "速さ"],
        datasets: [
          {
            label: "評価",
            backgroundColor: "rgba(230,126,34,0.6)",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (5 + 1));
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 35px;
  font-weight: normal;
  text-align: left;
}

.near_list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 0;
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
.graph {
  width: 100%;
  height: 180px;
  margin-top: 10px;
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