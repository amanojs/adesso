<template>
  <form @submit.prevent="search" class="search_body">
    <div class="area_tag_box">
      <div class="area_box">
        <v-text-field
          placeholder="東京都千代田区"
          label="エリア"
          v-model="formData.area"
          outlined
          clearable
          prepend-inner-icon="mdi-map-marker"
          style="border-radius: 3px 0 0 3px"
        ></v-text-field>
      </div>
      <div class="tag_box">
        <v-text-field
          placeholder="居酒屋,子供"
          hint="複数の場合はカンマで区切ってください"
          label="タグ・店名"
          v-model="formData.tags"
          outlined
          clearable
          prepend-inner-icon="mdi-tag"
          style="border-radius: 0 3px 3px 0"
        ></v-text-field>
      </div>
    </div>
    <div class="detail_box">
      <div class="date_box">
        <v-select
          label="日付"
          outlined
          :items="dates"
          item-text="text"
          item-value="data"
          prepend-inner-icon="mdi-calendar-check"
          style="border-radius: 3px 0 0 3px"
        ></v-select>
      </div>
      <div class="people_box">
        <v-select
          label="人数"
          outlined
          :items="nops"
          prepend-inner-icon="mdi-account-group"
          style="border-radius: 0"
        ></v-select>
      </div>
      <div class="time_box">
        <v-select
          label="時間"
          outlined
          :items="times"
          prepend-inner-icon="mdi-clock"
          style="border-radius: 0 3px 3px 0"
        ></v-select>
      </div>
    </div>
    <div class="search_btn_box">
      <v-btn tile color="#E57E22" class="search_btn" type="submit">
        <v-icon left> mdi-magnify </v-icon>
        検索
      </v-btn>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    formData: {
      area: "",
      tags: "",
    },
    nop: 20,
    nops: [],
    dates: [],
    times: [],
  }),
  mounted() {
    this.generateForm();
    this.formData.area = String(this.area);
    this.formData.tags = String(this.tags);
  },
  methods: {
    search() {
      this.updateSearchForm(this.formData);
      this.$router.push("/search");
      return this.searchShops();
    },
    generateForm() {
      const days = ["日", "月", "火", "水", "木", "金", "土"];
      const now = new Date();
      for (let i = 0; i < 90; i++) {
        now.setDate(now.getDate() + 1);
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const date = String(now.getDate()).padStart(2, "0");
        const day = days[now.getDay()];
        const year = String(now.getFullYear());
        this.dates = [
          ...this.dates,
          {
            text: `${month}月${date}日(${day})`,
            data: `${year}-${month}-${date}`,
          },
        ];
      }
      for (let i = 1; i < this.nop + 1; i++) {
        this.nops = [...this.nops, i];
      }
      const time = new Date();
      time.setHours(10);
      time.setMinutes(0, 0, 0);
      for (let i = 0; i < 28; i++) {
        const hour = String(time.getHours()).padStart(2, "0");
        const minute = String(time.getMinutes()).padStart(2, "0");
        this.times = [...this.times, `${hour}:${minute}`];
        time.setMinutes(time.getMinutes() + 30);
      }
    },
    ...mapMutations({
      updateSearchForm: "updateSearchForm",
    }),
    ...mapActions(["searchShops"]),
  },
  computed: {
    ...mapGetters(["area", "tags"]),
  },
};
</script>

<style scoped>
.search_body {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 3px;
  background-color: #fff;
  /* box-shadow: 0 0 8px #999; */
  z-index: 3;
  padding: 2% 1% 2% 1%;
}
.area_tag_box {
  display: flex;
  width: 55%;
}
.area_box {
  width: 50%;
}
.tag_box {
  width: 50%;
}

.detail_box {
  width: 45%;
  display: flex;
  padding-left: 1%;
}
.date_box {
  width: 45%;
}
.people_box {
  width: 25%;
}
.time_box {
  width: 30%;
}

.search_btn_box {
  width: 100%;
}
.search_btn {
  color: #fff;
  width: 60%;
}
</style>