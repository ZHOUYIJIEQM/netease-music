<template>
  <div class="broad-cast-comp">
    <div class="img-box">
      <img v-lazy="broadCastInfo.img" alt="">
      <i class="playicon iconfont icon-bofang2"></i>
    </div>
    <div class="name text-eli">{{broadCastInfo.name}}</div>
  </div>
</template>
<script>
export default {
  props: {
    broadCastInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.broad-cast-comp {
  .img-box {
    width: 100%;
    aspect-ratio: 1;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      top: 0;right: 0;bottom: 0;left: 0;
      background-color: rgba(66, 66, 66, 0.2);
    }
    img {
      width: 100%;
    }
    .playicon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: .3rem;
      color: hsla(0, 0%, 100%, 0.85);
      z-index: 1;
    }
  }
  .name {
    font-size: .14rem;
    width: 80%;
    margin: 0 auto;
    margin-top: .1rem;
  }
}
</style>