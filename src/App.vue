<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
  export default {
    components: {
      player: () => import('@/components/Player.vue')
    }
  }
</script>
<style lang="scss">
</style>
