<template>
  <!-- <transition name="search" mode="out-in"> -->
  <transition name="bounce" mode="out-in">
    <div class="search-page">
      <div @click="goback">============</div>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
      <h1>This is an search page</h1>
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
.search-enter-active, .search-leave-active {
  transition: all 1s;
}
.search-enter,
.serach-leave-to{
  transform: translate3d(0, 100%, 0 );
  opacity: 1;
}

.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    // transform: scale(0);
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
  // 50% {
  //   // transform: scale(1.5);
  // }
  100% {
    // transform: scale(1);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.search-page{
  background: black;
  color: white;
}
</style>
