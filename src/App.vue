<template>
  <div id="app">
    <keep-alive :include="/.*Include$/">
      <router-view class="app-content"></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
</style>