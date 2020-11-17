<template>
  <div class="home">
    <div class="mainVisual">
      <div class="overlay"></div>
      <div class="search_body">
        <div class="area_tag_box">
          <div class="area_box">
            <v-text-field
              name="name"
              label="エリア・駅"
              outlined
              clearable
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
          </div>
          <div class="tag_box">
            <v-text-field
              name="name"
              label="タグ・店名"
              outlined
              clearable
              prepend-inner-icon="mdi-tag"
            ></v-text-field>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap">
      <FavFoods />

      <div class="divider"></div>

      <div class="feature">
        <h2>特徴で探す</h2>
        <div class="features">
          <div class="feature_item">
            <h3>おいしさ</h3>
            <v-rating
              hover
              length="5"
              size="30"
              value="2.5"
              background-color="white"
              color="#f1c40f"
              half-increments
            ></v-rating>
          </div>
          <div class="feature_item">
            <h3>値段</h3>
            <v-rating
              hover
              length="5"
              size="30"
              value="2.5"
              background-color="white"
              color="#f1c40f"
              half-increments
            ></v-rating>
          </div>
          <div class="feature_item feature_center">
            <h3>接客</h3>
            <v-rating
              hover
              length="5"
              size="30"
              value="2.5"
              background-color="white"
              color="#f1c40f"
              half-increments
            ></v-rating>
          </div>
          <div class="feature_item">
            <h3>雰囲気</h3>
            <v-rating
              hover
              length="5"
              size="30"
              value="2.5"
              background-color="white"
              color="#f1c40f"
              half-increments
            ></v-rating>
          </div>
          <div class="feature_item last">
            <h3>速さ</h3>
            <v-rating
              hover
              length="5"
              size="30"
              value="2.5"
              background-color="white"
              color="#f1c40f"
              half-increments
            ></v-rating>
          </div>
        </div>

        <div class="feature_btn">
          <v-btn outlined color="">この特徴で探す</v-btn>
        </div>
      </div>

      <div class="divider"></div>

      <NearFoods />
    </div>
  </div>
</template>

<script>
import NearFoods from "@/components/NearFoods";
import FavFoods from "@/components/FavFoods";

export default {
  components: {
    NearFoods,
    FavFoods,
  },
  name: "Home",
};
</script>


<style scoped>
.mainVisual {
  width: 100%;
  height: 90vh;
  position: relative;
  background-image: url(../assets/mainVisual.jpg);
  background-size: cover;
  background-position: center;
}
.overlay {
  width: 100%;
  height: 90vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
}
.wrap {
  width: 95%;
  height: auto;
  box-sizing: border-box;
  padding: 50px 0;
  margin: 0 auto;
}
h2 {
  font-size: 35px;
  font-weight: normal;
  text-align: left;
}
.search_body {
  display: flex;
  position: absolute;
  top: 70%;
  left: 20%;
  width: 60%;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 0 8px #444;
  z-index: 3;
  padding: 2% 1% 1% 1%;
}
.area_tag_box {
  display: flex;
  width: 60%;
}
.area_box {
  width: 50%;
}
.tag_box {
  width: 50%;
}

.fav_list {
  display: flex;
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
  border: 1px solid #eee;
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

.divider {
  width: 100%;
  height: 2px;
  margin: 30px 0;
  background-color: #eee;
}

.features {
  margin-top: 50px;
  display: flex;
}
.feature_item {
  width: 15%;
  margin-right: 7%;
}
.features button {
  cursor: pointer;
  width: 15%;
  height: 100px;
  margin-right: 7%;
  border: #fff;
  border-radius: 3px;
}
.features .last {
  margin-right: 0;
}
.feature_btn {
  margin: 50px 0;
}

@media screen and (min-width: 1050px) and (max-width: 1680px) {
  .features {
    flex-wrap: wrap;
    justify-content: center;
  }
  .feature_item {
    width: 20%;
    margin-right: 6.8%;
    margin-bottom: 40px;
  }
  .feature_center {
    margin-right: 0;
  }
}

@media screen and (max-width: 1050px) {
  .features {
    flex-wrap: wrap;
    justify-content: center;
  }
  .feature_item {
    width: 40%;
    margin-right: 6.8%;
    margin-bottom: 40px;
  }
}

@media screen and (max-width: 570px) {
  .features {
    display: block;
  }
  .feature_item {
    width: 100%;
  }
}
</style>