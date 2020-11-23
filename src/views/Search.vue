<template>
  <v-app class="Search">
    <SearchBox />
    <div class="result-header">
      <div class="header-top">検索結果</div>
      <div class="header-tags">
        エリア: <span class="result-tags">{{ area }}</span
        >, タグ:
        <div v-if="tagArray.length > 0">
          <span class="result-tags" v-for="tag in tagArray" :key="tag">{{
            tag
          }}</span>
        </div>
        <div v-else>
          <span class="result-tags">条件無し</span>
        </div>
      </div>
    </div>
    <SearchShops />
  </v-app>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import SearchShops from "@/components/SearchShops";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SearchBox,
    SearchShops,
  },
  data: () => ({
    tagArray: [],
  }),
  async mounted() {
    /* const date = params.get("date");
    const pn = params.get("pn");
    const time = params.get("time"); */
    if (this.tags != "") {
      this.tagArray = this.tags.split(",");
    }
    await this.searchShops();
  },
  methods: {
    ...mapActions(["searchShops"]),
  },
  computed: {
    ...mapGetters(["area", "tags"]),
  },
};
</script>

<style scoped>
.Search {
  width: 65%;
  margin: 30px auto;
}
.result-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 20px;
  background-color: #eee;
  text-align: left;
  border-radius: 2px;
}
.header-top {
  width: 100%;
  font-weight: bold;
}
.result-tags {
  background-color: #fff;
  padding: 5px;
  margin-left: 5px;
  font-size: 14px;
  color: #666;
  border-radius: 3px;
}
.header-tags {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

@media screen and (max-width: 1550px) {
  .Search {
    width: 90%;
  }
}
</style>