<template>
  <div class="toastMessageBox" v-show="show">{{message}}</div>
</template>
<script>
  export default {
    name: 'toastMessage',
    data() {
      return {
        message: '',
        show: false
      }
    }
  }
</script>
<style lang='scss' scoped>
  .toastMessageBox {
    position: fixed;
    width: 66%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: .08rem;
    font-size: .16rem;
    border-radius: .08rem;
    text-align: center;
    z-index: 500;
  }
</style>
