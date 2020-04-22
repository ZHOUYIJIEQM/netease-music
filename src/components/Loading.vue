<template>
  <div class="loading-container">
    <img src="../assets/img/load.gif">
  </div>
</template>
<script>
  export default {
    name: 'loading'
  }
</script>
<style lang="scss" scoped>
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      display: block;
    }
  }
</style>
