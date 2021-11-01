<template>
  <!-- 用于歌单广场的标签栏 -->
  <div class="tabbar-comp" ref="tabbar">
    <div 
      class="tabbar-item"
      ref="tabItem"
      v-for="(item, index) in tabObj"
      :key="index"
      :class="{active: tabIndex === index}"
      @click="changeTab(index)"
    >
      {{item}} 
    </div>
    <div class="line" ref="line"></div>
  </div>
</template>
<script>
export default {
  props: {
    tabObj: {
      type: Array,
      default: function() {
        return []
      },
      require: true
    }
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  mounted() {
    this.changeTab(this.tabIndex)
  },
  methods: {
    changeTab(index) {
      this.tabIndex = index
      let line = this.$refs.line
      let allItem = this.$refs.tabItem
      let pdL = parseInt(getComputedStyle(allItem[0]).paddingLeft)
      let gap = 8
      let width = allItem[index].offsetWidth - 2 * pdL + gap
      let left = allItem[index].offsetLeft + pdL - gap/2
      let center = this.$refs.tabbar.offsetWidth / 2 - width / 2
      line.style.width = width + 'px'
      line.style.left = left + 'px'
      if (left <= center) {
        this.$refs.tabbar.scrollLeft = 0
      } else {
        this.$refs.tabbar.scrollLeft = left - center
      }
      this.$emit('changeTab', index)
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';
$gap: .08rem;
$lineH: .05rem;
.tabbar-comp {
  // 平滑滚动
  scroll-behavior: smooth;
  position: relative;
  overflow: scroll;
  @include df();
  align-items: center;
  .tabbar-item {
    z-index: 1;
    padding: $gap .15rem;
    white-space: nowrap;
    &.active {
      font-weight: bold;
    }
  }
  .line {
    position: absolute;
    left: .1rem;
    bottom: calc($gap - $lineH + .03rem);
    height: $lineH;
    width: calc(2em + .05rem);
    border-radius: 2rem;
    background: linear-gradient(80deg, hsla(0, 100%, 63%, 0.7), #fe3030);
    transition: all .2s;
  }
}
</style>