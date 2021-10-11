<template>
  <!-- 用于 云村 推荐视频 -->
  <div class="rcmd-mv" @click="clickMv(rcmdMv)">
    <div class="img-box" ref="imgbox">
      <transition name="fadeIn">
        <img ref="img" v-if="imgShow"/>
      </transition>
      <span class="duration">{{ rcmdMv.duration }}</span>
    </div>
    <div class="mv-info">
      <div class="name text-eli">{{ rcmdMv.name }}</div>
      <div class="playinfo">
        <div class="count">
          <i class="iconfont icon-bofangsanjiaoxing"></i
          >{{ rcmdMv.playCount | formatNum }}
        </div>
        <div class="tag text-eli">{{ rcmdMv.tag }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rcmdMv: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      imgShow: false,
      bgc: ['#f7b2b2', '#9ee0b4', '#9ecfe0', '#9eabe0', '#c59ee0', '#f7c7b2']
    }
  },
  mounted() {
    this.loadImg()
  },
  methods: {
    loadImg() {
      this.$refs.imgbox.style.background = this.bgc[this.roundNum(0, this.bgc.length - 1)]
      let img = new Image()
      img.src = this.rcmdMv.img
      img.onload = () => {
        this.$nextTick(() => {
          this.imgShow = true
          this.$nextTick(() => {
            this.$refs.img.src = this.rcmdMv.img
          })
        })
      }
    },
    // 生成范围内的随机数
    roundNum(start, end) {
      return Math.round(Math.random() * (end - start) + start)
    },
    clickMv(id) {
      console.log(id);
    }
  },
};
</script>

<style lang="scss" scoped>
.rcmd-mv {
  .img-box {
    width: 100%;
    aspect-ratio: 1 / 1.25;
    background-color: #f7b2b2;
    position: relative;
    font-size: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .duration {
      position: absolute;
      bottom: 0.08rem;
      right: 0.06rem;
      color: #e0e0e0;
      font-size: 0.12rem;
    }
  }
  .mv-info {
    padding: 0.1rem 0.08rem;
    .name {
      font-size: 0.14rem;
      color: #4a4a4a;
      line-height: 1.5;
    }
    .playinfo {
      margin-top: 0.06rem;
      color: #9e9e9e;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.1rem;
      .count {
        .icon-bofangsanjiaoxing {
          font-size: 0.12rem;
        }
      }
      .tag {
        max-width: 5em;
        line-height: 1.3;
      }
    }
  }
}
</style>