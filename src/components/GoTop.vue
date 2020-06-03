<template>
  <transition name="fadeIn">
    <div class="back-top" v-show="showToTop" @click="toTop">
      <i class="iconfont icon-fanhui"></i>
    </div>
  </transition>
</template>
<script>
  export default {
    data() {
      return {
        showToTop: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handerScroll, false)
    },
    methods: {
      toTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      },
      handerScroll() {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop >= window.innerHeight / 2) {
          this.showToTop = true;
        } else {
          this.showToTop = false;
        }
      }
    },
    beforeDestory() {
      window.removeEventListener('scroll', this.handerScroll, false);
    }
  }
</script>
<style lang="scss" scoped>
  .back-top {
    position: fixed;
    bottom: .6rem;
    right: .1rem;
    transform: rotate(90deg);
    background: #616161;
    border-radius: 50%;
    text-align: center;
    padding: .1rem;

    i {
      font-size: .22rem;
      color: white;
    }
  }

  .fadeIn-enter-active,
  .fadeIn-leave-active {
    transition: opacity .5s;
  }

  .fadeIn-enter,
  .fadeIn-leave-to {
    opacity: 0;
  }
</style>
