<template>
  <div class="playlist-page">
    <button @click="$router.push({name: 'Home'})">回首页</button>
  </div>
</template>
<script>
export default {
  name: 'PlayListInclude',
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