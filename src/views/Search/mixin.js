export let saveEleScrollH = {
  data() {
    return {
      scrollH: 0,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$nextTick(() => {
        vm.$refs.contentBox.scrollTop = vm.scrollH
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    let boxEle = this.$refs.contentBox
    this.scrollH = boxEle.scrollTop
    next()
  }
}