<template>
  <div class="favorite">
    <h2>人気急上昇中</h2>
    <div class="fav_list">
      <div
        :class="i === 1 ? 'fav_card center' : 'fav_card'"
        v-for="(shop, i) in favShops"
        :key="shop"
      >
        <router-link :to="`/about?id=${shop.shop_id}`">
          <img
            v-if="shop.image !== null"
            :src="`http://localhost:9000/images/shops/${shop.image}`"
            width="100%"
            height="300px"
            style="object-fit: cover"
            alt="fav_shop"
          />
          <v-layout
            style="width: 100%; height: 300px; background-color: #555"
            v-else
            justify-center
            align-center
          >
            <v-icon x-large>mdi-image-off-outline</v-icon>
          </v-layout>
          <div class="card_box">
            <h3>{{ shop.shop_name }}</h3>
            <p>{{ shop.address }}</p>
            <div class="graph">
              <p>
                平均総合評価:
                <span>{{ String(shop.sumall).padEnd(4, ".0") }}</span> / 25.0
              </p>
            </div>
            <div class="review">
              <v-avatar color="#888" rounded
                ><v-icon color="white">mdi-account</v-icon></v-avatar
              >
              <p>
                たかあかたふぁふぁｓｆふぁあ椅子今後就職たかあかたふぁふぁｓｆふぁあ椅子今後就職たかあかたふぁふぁｓｆふぁあ椅子今後就職たかあかたふぁふぁｓｆふぁあ椅子今後就職
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="fav_more">
      <v-icon>mdi-arrow-down-drop-circle</v-icon>
      もっと見る
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({}),
  async mounted() {
    await this.getFavShops();
    console.log(this.favShops);
  },
  methods: {
    ...mapActions(["getFavShops"]),
  },
  computed: {
    ...mapGetters(["favShops"]),
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
  height: auto;
  box-shadow: 0 0 8px #e9e9e9;
}
.card_box {
  box-sizing: border-box;
  padding: 10px 20px;
}
.fav_card h3 {
  text-align: left;
}
.fav_card p {
  font-size: 13px;
  color: #555;
  text-align: left;
  margin-bottom: 10px;
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
  display: flex;
  align-items: flex-start;
  height: 60px;
  margin-top: 10px;
  /* border: 1px solid #eee; */
}
.graph p {
  font-weight: bold;
}
.graph span {
  font-size: 20px;
  color: #f1c40f;
  text-shadow: 0 0 1px #999;
}

.review {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 70px;
  box-shadow: 0 0 8px #e9e9e9;
  padding: 10px;
}
.review p {
  display: inline-block;
  box-sizing: border-box;
  width: 90%;
  height: 45px;
  padding: 0px 0 0 10px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
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