<template>
  <div class="playlist-page">
    歌单 <button @click="goPage('Home')">返回首页</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    goPage(name) {
      this.$router.push({name: `${name}`})
    }
  }
}
</script>
<style lang="scss" scoped>
.playlist-page {
  min-height: 100%;
  background-color: rebeccapurple;
}  
</style>