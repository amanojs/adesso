<template>
  <v-app class="about">
    <div class="search-box">
      <SearchBox />
    </div>
    <v-divider class="mb-4"></v-divider>
    <div class="about-header">
      <div class="shop_name">
        <h2>{{ shopInfo.shop_name }}</h2>
        <small>{{ shopInfo.address }}</small>
        <div class="tags" v-if="shopInfo.tags">
          <div class="tag" v-for="tag in shopInfo.tags" :key="tag">
            {{ tag }}
          </div>
        </div>
        <div class="tags" v-else>
          <div class="no-category">関連タグ無し</div>
        </div>
      </div>
      <div class="tells">
        <div class="tell_box">
          <v-icon class="mr-2">mdi-phone</v-icon>
          {{ shopInfo.shop_number }}
        </div>
        <div class="tell_review">レビューを書く</div>
      </div>
    </div>
    <div>
      <v-img
        class="mt-2"
        v-if="shopInfo.image"
        :src="`http://localhost:9000/images/shops/${shopInfo.image}`"
        height="500px"
      ></v-img>
      <div v-else class="mt-10"></div>
    </div>
    <div class="img_box">
      <img width="150px" height="150px" src="../assets/shops/4.jpg" />
      <img width="150px" height="150px" src="../assets/shops/5.jpg" />
      <img width="150px" height="150px" src="../assets/shops/6.jpg" />
      <img width="150px" height="150px" src="../assets/shops/7.jpg" />
    </div>
    <div class="review_wrap">
      <div class="review_base">
        <h3 class="review">レビュー・評価</h3>
        <div class="review_list">
          <div class="review_box" v-for="item in review" :key="item.review_id">
            <div class="avatar">
              <v-avatar color="#eee"><v-icon>mdi-account</v-icon></v-avatar>
            </div>
            <div class="review_about">
              <div class="review_date">{{ item.posted_at }}</div>
              <div class="feature_table">
                <div>
                  味: <span>{{ String(item.taste).padEnd(3, ".0") }}</span>
                </div>
                <div>
                  価格: <span>{{ String(item.price).padEnd(3, ".0") }}</span>
                </div>
                <div>
                  接客: <span>{{ String(item.service).padEnd(3, ".0") }}</span>
                </div>
                <div>
                  雰囲気:
                  <span>{{ String(item.atmosphere).padEnd(3, ".0") }}</span>
                </div>
                <div>
                  速さ: <span>{{ String(item.speed).padEnd(3, ".0") }}</span>
                </div>
              </div>
              {{ item.about }}
            </div>
          </div>
        </div>
      </div>
      <div class="graph_info_wrap">
        <div class="radar mb-10">
          <h3>特徴ごとの評価</h3>
          <radar-chart
            height="180"
            :chart-data="shopInfo.graphData"
            :options="options"
          ></radar-chart>
        </div>
        <div class="line mb-10">
          <h3>月ごとの特徴評価推移</h3>
          <line-chart
            height="180"
            :chart-data="shopInfo.rateByMonth"
            :options="lineOptions"
          ></line-chart>
        </div>
        <div class="shop_info">
          <div class="info_item">
            <h4>営業時間</h4>
            <p>[平日]<br />10:00 ~ 12:00<br />[土日]<br />09:00 ~ 18:00</p>
          </div>
          <div class="info_item">
            <h4>定休日</h4>
            <p>毎月第3月曜日</p>
          </div>
          <div class="info_item">
            <h4>住所</h4>
            <p>宮崎県北諸県郡三股町13-2</p>
          </div>
          <div class="info_item">
            <h4>アクセス</h4>
            <p>宮崎県三股駅から徒歩5分</p>
          </div>
        </div>
        <!-- 本当は設備とかこの店舗をグッドしている人はこの店舗もグッドしていますを表示したい -->
      </div>
    </div>
  </v-app>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import axios from "axios";
import RadarChart from "@/plugins/charts/radar.js";
import LineChart from "@/plugins/charts/line.js";

export default {
  components: {
    SearchBox,
    RadarChart,
    LineChart,
  },
  data: () => ({
    shopInfo: null,
    review: [],
    options: {
      responsive: true,
      scale: {
        ticks: {
          max: 5,
          min: 0,
          stepSize: 1,
        },
      },
    },
    lineOptions: {
      responsive: true,
      legend: {
        align: "start",
        position: "right",
        labels: {
          padding: 15,
        },
      },
      scales: {
        xAxes: [
          {
            // 軸線を表示しない
            gridLines: {
              display: false,
            },
            // 目盛り
            ticks: {
              fontColor: "#333",
            },
          },
        ],
        // Y 軸
        yAxes: [
          {
            gridLines: {
              color: "#f3f3f3",
              zeroLineColor: "#ddd",
            },
            ticks: {
              fontColor: "#333",
              min: 0,
              max: 5,
              stepSize: 0.5,
            },
          },
        ],
      },
    },
  }),
  async mounted() {
    const url = window.location.hash;
    const paramI = url.indexOf("id=");
    const id = url.substring(paramI + 3, paramI + 4);
    await this.getShop(id);
    await this.getReview(id);
  },
  methods: {
    async getShop(id) {
      const { data } = await axios.get(
        "http://localhost:9000/api/shops/getShop",
        {
          params: { shopId: id },
        }
      );

      // 特徴Radar生成
      if (data.graphData.length !== 0) {
        data.graphData = {
          labels: ["おいしさ", "値段", "接客", "雰囲気", "速さ"],
          datasets: [
            {
              label: "平均評価",
              backgroundColor: "rgba(230,126,34,0.4)",
              data: [
                data.graphData[0].taste,
                data.graphData[0].price,
                data.graphData[0].service,
                data.graphData[0].atmosphere,
                data.graphData[0].speed,
              ],
            },
          ],
        };
      } else {
        data.graphData = null;
      }

      //時間軸Line生成
      const labels = [];
      const features = [
        { key: "taste", val: "味", color: "#f39c12" },
        { key: "price", val: "価格", color: "#e74c3c" },
        { key: "service", val: "接客", color: "#2ecc71" },
        { key: "atmosphere", val: "雰囲気", color: "#16a085" },
        { key: "speed", val: "速さ", color: "#3498db" },
      ];
      const lineDatas = [];
      if (data.rateByMonth.length !== 0) {
        for (const month of data.rateByMonth) {
          labels.push(month.date.replace("-", "年") + "月");
        }
        for (let i = 0; i < features.length; i++) {
          const lineData = [];
          for (const month of data.rateByMonth) {
            lineData.push(month[features[i].key]);
          }
          lineDatas.push({
            label: features[i].val,
            fill: false,
            borderColor: features[i].color,
            data: lineData,
          });
        }
        data.rateByMonth = {
          labels,
          datasets: lineDatas,
        };
      }
      if (data.tags != null) {
        data.tags = data.tags.split(",");
      }
      this.shopInfo = data;
      console.log(this.shopInfo);
    },
    async getReview(id) {
      const { data } = await axios.get(
        "http://localhost:9000/api/shops/getReview",
        {
          params: { shopId: id },
        }
      );
      this.review = data;
    },
  },
  computed: {},
};
</script>

<style scoped>
.about {
  width: 65%;
  margin: 30px auto;
}
.about-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
}
.shop_name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 55%;
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #333;
}
.shop_name h2 {
  width: 100%;
  text-align: left;
}
.tags {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
}
.tag {
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
.tells {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 35%;
  height: 100%;
  background-color: #eee;
  border-radius: 3px;
}
.tell_box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 45%;
  font-weight: bold;
  background-color: #fff;
  border-radius: 2px;
}
.tell_review {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 25%;
  font-size: 14px;
  color: #666;
  background-color: #fff;
  border: 1px solid #909090;
}
.tell_review:hover {
  cursor: pointer;
  background-color: #666;
  color: #fff;
  transition: 0.2s;
}
.img_box {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 5px 0;
}
.img_box img {
  object-fit: cover;
}
.review_wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 50px;
}
.review_base {
  width: 55%;
}
.review {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #999;
}
.review_list {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
}
.review_box {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  padding: 40px 0;
  border-bottom: 1px solid #eaeaea;
}
.feature_table {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.feature_table div {
  display: flex;
  align-items: center;
  margin-right: 5%;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}
.feature_table span {
  font-size: 20px;
  color: #f1c40f;
  text-shadow: 0 0 1px #999;
  margin-left: 5px;
}
.avatar {
  width: 10%;
}
.review_about {
  width: 80%;
}

.graph_info_wrap {
  width: 39%;
}

.radar h3,
.line h3 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 0;
  margin-bottom: 40px;
  border-bottom: 1px solid #999;
}

.shop_info {
  width: 100%;
  border: 1px solid #eaeaeb;
  background-color: #fafafa;
  padding: 0 10px;
}
.info_item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #eaeaeb;
  margin-top: 10px;
}
.info_item h4 {
  width: 100%;
  background-color: #fff;
  border-radius: 3px;
  padding: 5px 0;
}
.info_item p {
  width: 100%;
  margin: 0;
  padding: 15px 0;
}
</style>
