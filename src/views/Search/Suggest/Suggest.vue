<template>
  <div class="Suggest-content">
    建议
    <input type="text">
    <div v-for="(item, index) in 100" :key="index">{{item}}</div>
  </div>
</template>
<script>
export default {
  name: 'SearchSuggest',
  data() {
    return {
      
    }
  },
  methods: {
    goSearchRes(keyWord) {
      this.$parent.searchText = keyWord
      this.$parent.goSearchResult()
    }
  },
}
</script>
<style lang="scss" scoped>
.Suggest-content {
  height: 100%;
  overflow: scroll;
}
</style>