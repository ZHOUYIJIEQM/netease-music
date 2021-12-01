// 记录滚动高度
export let saveEleScrollH = {
  data() {
    return {
      scrollH: 0,
      scrollTimer: null,
    }
  },
  mounted() {
    this.$refs.contentBox.addEventListener('scroll', () => {
      this.scrollTimer && clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(() => {
        this.scrollH = this.$refs.contentBox.scrollTop
      }, 100)
    })
  },
  activated() {
    this.$refs.contentBox.scrollTop = this.scrollH
  },
}