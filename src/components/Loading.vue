<template>
  <!-- 加载提示圈 -->
  <div class="loading-comp" :class="{ mask: loadingMask }">
    <van-loading :color="loadingColor" :size="loadingSize" />
  </div>
</template>
<script>
export default {
  props: {
    // 背景遮罩
    loadingMask: {
      type: Boolean,
      default: false,
    },
    // 加载提示圈的颜色
    loadingColor: {
      type: String,
      default: "#bbb",
    },
    // 加载提示圈的大小
    loadingSize: {
      type: String,
      default: ".24rem",
    },
  },
}
</script>
<style lang="scss" scoped>
.mask {
  background-color: rgba(236, 236, 236, 0.1);
}
.loading-comp {
  min-height: inherit;
  width: 100%;
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>