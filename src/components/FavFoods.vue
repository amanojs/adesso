<template>
  <div class="favorite">
    <h2>人気急上昇中</h2>
    <div class="fav_list">
      <div class="fav_card">
        <img
          src="https://cdn.asagei.com/syokuraku/uploads/2019/01/20190204-koto01.jpg"
          width="100%"
          height="300px"
          style="object-fit: cover"
          alt="fav_shop"
        />
        <div class="card_box">
          <h3>桒畑食堂</h3>
          <div class="category_box">
            <div class="category">和食</div>
            <div class="category">アットホーム</div>
            <div class="category">大盛無料</div>
          </div>
          <div class="graph">
            <line-chart height="180" :chart-data="datacollection"></line-chart>
          </div>
        </div>
      </div>

      <div class="fav_card center">
        <img
          src="https://fujimi-ts.org/www2018/wp-content/uploads/img_jig_life_01-1.png"
          width="100%"
          height="300px"
          style="object-fit: cover"
          alt="fav_shop"
        />
        <div class="card_box">
          <h3>The Rich Kibun</h3>
          <div class="category_box">
            <div class="category">洋食</div>
            <div class="category">アットホーム</div>
            <div class="category">限定10名様</div>
          </div>
          <div class="graph">
            <line-chart height="180" :chart-data="datacollection"></line-chart>
          </div>
        </div>
      </div>

      <div class="fav_card">
        <img
          src="https://image.hitosara.com/gg/image/0006118824/0006118824F8_551x413y.jpg"
          width="100%"
          height="300px"
          style="object-fit: cover"
          alt="fav_shop"
        />
        <div class="card_box">
          <h3>ラーメン食堂 ～ assari ～</h3>
          <div class="category_box">
            <div class="category">ラーメン</div>
            <div class="category">あっさり</div>
          </div>
          <div class="graph">
            <line-chart height="180" :chart-data="datacollection"></line-chart>
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
import LineChart from "@/plugins/line.js";
export default {
  components: {
    LineChart,
  },
  data: () => ({
    datacollection: null,
  }),
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
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
.fav_list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 0;
}
.fav_card {
  width: 30%;
  height: 670px;
  box-shadow: 0 0 8px #e9e9e9;
}
.card_box {
  box-sizing: border-box;
  padding: 10px 20px;
}
.fav_card h3 {
  text-align: left;
}
.category_box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.category {
  padding: 5px 20px;
  margin-right: 5px;
  font-size: 12px;
  color: #fff;
  background-color: #e67e22;
  border-radius: 30px;
  box-shadow: 0 0 8px #e5e5e5;
}
.graph {
  height: 230px;
  margin-top: 10px;
  /* border: 1px solid #eee; */
}
.center {
  margin: 0 5%;
}
.fav_more {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}

@media screen and (min-width: 1100px) and (max-width: 1550px) {
  .fav_card {
    height: 580px;
  }
}

@media screen and (max-width: 1100px) {
  .fav_list {
  }
  .fav_card {
    width: 100%;
    height: 590px;
    margin-bottom: 10px;
    box-shadow: 0 0 8px #e9e9e9;
  }
  .center {
    margin: 0;
  }
}

@media screen and (min-width: 600px) and (max-width: 1100px) {
  .fav_card {
    height: 1100px;
    margin-bottom: 50px;
  }
  .fav_card img {
    height: 500px;
  }
  @media screen and (min-width: 600px) and (max-width: 870px) {
    .fav_card {
      height: 950px;
    }
  }
}

@media screen and (max-width: 600px) {
  .fav_card {
    height: 620px;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 400px) {
  .fav_card {
    height: 590px;
    margin-bottom: 10px;
  }
}
</style>