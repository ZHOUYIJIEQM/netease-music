<template>
  <!-- 云村 -->
  <div class="cloud-village-content">
    <div v-for="i in 60" :key="i">云村 -> {{i}}</div>
  </div>
</template>
<script>
  export default {
    created() {
    },
    methods: {
      toT() {
        this.$Toast({ message: 'village', time: 2000 })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
