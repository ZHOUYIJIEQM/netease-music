// keep-alive 离开当前路由页面再返回时, 滚动到离开前的位置
export let scrollPosition = {
  data() {
    return {
      scrollH: 0,
    };
  },
  methods: {
    /**
     * @description 获取页面滚动高度
     */
    getScrollTop() {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    },
    /**
     * @description 获取浏览器窗口高度
     */
    getClientHeight() {
      return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight ||
        0
      );
    },
  },
  // activated() {
  //   this.$nextTick(() => {
  //     window.scrollTo(0, this.scrollH);
  //   });
  // },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$nextTick(() => {
        window.scrollTo(0, vm.scrollH)
      })
    })
  },
  beforeRouteLeave(to, from, next) {
    this.scrollH = this.getScrollTop();
    next();
  },
};
