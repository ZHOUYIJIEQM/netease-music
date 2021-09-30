<template>
  <div class="home-page">
    <router-view></router-view>
    <button @click="goPage('PlayList')">歌单</button>
  </div>
</template>

<script>
export default {
  name: "HomeInclude",
  data() {
    return {
      
    }
  },
  methods: {
    goPage(name) {
      this.$router.push({name: `${name}`})
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/variable.scss';
.home-page {
  min-height: 100%;
  background-color: burlywood;
}
</style>
