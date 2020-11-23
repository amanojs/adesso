<template>
  <div class="header">
    <div class="wrap">
      <div class="logo">
        <router-link to="/"
          ><img src="../assets/adesso.png" width="100%" alt="logo"
        /></router-link>
      </div>
      <div class="member_reg">
        <v-btn outlined>会員登録</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.wrap {
  display: flex;
  position: relative;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  margin: 0 auto;
}

.logo {
  vertical-align: bottom;
  width: 120px;
}

.member_reg {
  position: absolute;
  right: 0;
}
</style>