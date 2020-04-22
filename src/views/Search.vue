<template>
  <transition name="search" mode="out-in">
    <div class="search-page">
      <div @click="goback">============</div>
      <div v-for="index in 60" :key="index">
        <h1>This is {{index}} search page</h1>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    methods: {
      goback() {
        this.$router.back()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .search-enter-active {
    animation: right-search .5s;
  }

  .search-leave-active {
    animation: right-search .5s reverse;
  }

  @keyframes right-search {
    0% {
      transform: translate3d(100%, 0, 0);
      // opacity: 0.5;
    }

    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  .search-page {
    background: black;
    color: white;
  }
</style>
