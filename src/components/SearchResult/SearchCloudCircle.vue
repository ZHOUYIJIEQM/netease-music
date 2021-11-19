<template>
  <div class="cloud-circle-comp" @click="clickCloudCircle(cloudCircleData.id)">
    <div class="left">
      <img :src="cloudCircleData.image" alt="">
    </div>
    <div class="right">
      <div class="name" v-html="cloudCircleData.name"></div>
      <div class="count">{{cloudCircleData.count}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cloudCircleData: {
      type: Object,
      default: function () {
        return {}
      },
      require: true,
    }
  },
  methods: {
    clickCloudCircle(id) {
      this.$toast({
        message: `cloud circle id: ${id}, 未开发!`,
        className: "toastT",
        duration: 2000,
        position: "bottom",
      });
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';
.cloud-circle-comp {
  display: flex;
  align-items: center;
  padding: .08rem .15rem;
  .left {
    width: .5rem;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: .1rem;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .right {
    padding-left: .12rem;
    color: $black;
    line-height: 1.4;
    .count {
      font-size: .12rem;
      color: $greyFontC;
    }
  }
}
</style>