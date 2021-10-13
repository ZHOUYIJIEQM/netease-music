<template>
  <div class="navbar-comp">
    <div class="left" @click="clickItem('left')">
      <slot name="left"></slot>
    </div>
    <div class="middle" @click="clickItem('middle')">
      <slot name="middle"></slot>
    </div>
    <div class="right" @click="clickItem('right')">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    clickItem(type) {
      type === 'left' && this.$emit('clickLeft')
      type === 'middle' && this.$emit('clickMiddle')
      type === 'right' && this.$emit('clickRight')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/variable.scss";

.navbar-comp {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 10;
  height: $navHeight;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .08rem 0;
  i {
    font-size: .22rem;
  }
  .left, .right {
    height: 100%;
    padding: 0 .15rem;
    display: flex;
    align-items: center;
  }
  .middle {
    flex: 1;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    &>div {
      width: 100%;
    }
  }
}
</style>