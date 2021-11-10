<template>
  <div class="result-content">
    结果
    <input type="text">
    <div v-for="(item, index) in 100" :key="index">{{item}}</div>
  </div>
</template>
<script>
export default {
  name: 'SearchResult',
}
</script>
<style lang="scss" scoped>
.result-content {
  height: 100%;
  overflow: scroll;
}
</style>