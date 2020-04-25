<template>
  <div class="cloud-village-content">
    <div @click="toT">btn</div>
    <div v-for="i in 60" :key="i">village -> {{i}}</div>
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
