<template>
  <div 
    class="lyric-box"
    ref="lyricBox"
    @touchstart="lyricBoxTouchS"
    @touchend="lyricBoxTouchE"
    @scroll.passive="lyricBoxScroll"
  >
    <div class="lyric-text" v-if="lyricTextArr.length">
      <div 
        class="line"
        ref="lyricText" 
        v-for="(item, index) in lyricTextArr"
        :key="index"
        :class="{'active': lyricActiveIndex === index}"
      >
        <p>{{item.lyric}}</p>
        <p v-if="item.tlyric">{{item.tlyric}}</p>
      </div>
    </div>
    <div class="no-lyric" v-else>暂无歌词!</div>
  </div>
</template>
<script>
  export default {
    name: 'Lyric',
    data() {
      return {
        lyricTextArr: [],
        lyricActiveIndex: 0,
        lyricTimer: null,
        lyricCanScroll: true,
      }
    },
    props: {
      lyricObj: {
        type: Object,
        require: true,
        default: function() {
          return {}
        }
      },
      playTime: {
        type: Number,
        require: true,
        default: 0
      }
    },
    computed: {
      timeKey() {
        return this.lyricTextArr.map(i => i.time)
      }
    },
    watch: {
      lyricObj: {
        handler: function (newV) {
          // console.log(newV);
          if (Object.keys(newV).length) {
            this.lyricTextArr = []
            this.lyricActiveIndex = 0
            this.extractLyric(newV)
            this.$nextTick(() => {
              this.scrollLyric()
            })
          }
        },
        deep: true
      },
      playTime(newV) {
        if (this.lyricTextArr.length > 1) {
          this.setActiveIndex(newV)
        }
      },
      lyricActiveIndex: {
        handler: function() {
          this.lyricCanScroll && this.scrollLyric()
        },
        immediate: true
      }
    },
    mounted() {
      this.lyricBoxEl = this.$refs.lyricBox
    },
    methods: {
      // 提取出歌词, 并格式化为需要的结构
      extractLyric(lyricObj) {
        // console.log(lyricObj);
        let res = {}
        let lyric = lyricObj?.lrc?.lyric
        let tlyric = lyricObj?.tlyric?.lyric
        // 原歌词
        if(lyric) {
          lyric = lyric.split('\n')
          if (lyric.length) {
            res.lyric = this.formatLyric(lyric)
          }
        }
        // 翻译歌词
        if (tlyric) {
          tlyric = tlyric.split('\n')
          if (tlyric.length) {
            res.tlyric = this.formatLyric(tlyric)
          }
        }
        // console.log(res.lyric, Object.keys(res.lyric).length);
        // 转换|合并
        if (res.lyric && Object.keys(res.lyric).length) {
          for (const key in res.lyric) {
            let o = { time: Number(key), lyric: res.lyric[key] }
            res?.tlyric && Object.assign(o, { tlyric: res?.tlyric[key] || '' })
            this.lyricTextArr.push(o)
          }
          // 排序, 避免顺序问题
          this.lyricTextArr.sort((a, b) => a.time - b.time)
          // 处理时间间隔过长
          if (this.lyricTextArr.length > 1) {
            // [ { "time": 0, "lyric": "..." }, { "time": 1, "lyric": "..." }, { "time": 5940, "lyric": "纯音乐，请欣赏" } ]
            // 时间间隔太长
            if (this.lyricTextArr.at(-1).time - this.lyricTextArr.at(-2).time > 300) {
              this.lyricTextArr[this.lyricTextArr.length - 1].time = this.lyricTextArr.at(-2).time + 1
            }
          } 
          // 歌词只有一个
          if (this.lyricTextArr.length === 1) {
            this.lyricTextArr[0].time = 0
          }
          // console.log(JSON.stringify(this.lyricTextArr, null, '  '));
        }
      },
      formatLyric(arr) {
        let res = {}
        arr.forEach(item => {
          // 取得时间和对应歌词
          let data = /^\[(.*?)\](.*)$/ig.exec(item)
          if (data) {
            if (data[2].length) {
              let t = data[1].split(':').reverse().reduce((pre, current, index) => {
                return Number(pre) + Number(current) * Math.pow(60, index)
              })
              res[t.toFixed(2)] = data[2].trim()
            }
          }
        })
        return res
      },
      // 计算播放时间到达歌词数组哪个位置
      setActiveIndex(time) {
        if (time >= this.timeKey.at(-1)) {
          return this.lyricActiveIndex = this.timeKey.length - 1
        }
        let index = this.timeKey.findIndex(i => i > time)
        if (index - 1 < 0) {
          return this.lyricActiveIndex = 0
        } else {
          return this.lyricActiveIndex = index - 1
        }
      },
      scrollLyric(type=false) {
        if (!this.lyricTextArr.length) {
          return
        }
        
        let currentLyric = this.$refs.lyricText[this.lyricActiveIndex]
        let top = currentLyric.offsetTop - this.lyricBoxEl.offsetHeight / 2 + currentLyric.offsetHeight / 2

        // 不带滚动动画
        if(type) {
          this.lyricBoxEl.scrollTo({ top })
          return;
        }
        
        // 有滚动动画
        this.lyricBoxEl.scrollTo({
          behavior: 'smooth',
          top
        })
      },
      lyricBoxTouchS() {
        this.lyricCanScroll = false
      },
      lyricBoxTouchE() {
        this.lyricCanScroll = true
        this.lyricTimer && clearTimeout(this.lyricTimer)
        // 与滚动事件同一个定时器, 只执行最后一次
        this.lyricTimer = setTimeout(() => {
          this.scrollLyric()
        }, 500)
      },
      lyricBoxScroll() {
        // 滚动只执行最后一次
        this.lyricTimer && clearTimeout(this.lyricTimer)
        this.lyricTimer = setTimeout(() => {
          this.lyricCanScroll && this.scrollLyric()
        }, 800)
      },
    }
  }
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.lyric-box {
  color: rgba(255, 255, 255, 0.6);
  overflow: scroll;
  position: relative;
  margin: .25rem 0;
  height: 100%;
  // scroll-behavior: smooth;
  .lyric-text {
    padding: 40vh .25rem;
    min-height: 100%;
    @include df(column);
    align-items: center;
    justify-content: center;
  }
  .line {
    line-height: 1.3;
    text-align: center;
    padding: .12rem 0;
    font-size: .14rem;
    transition: color .1s;
    &.active {
      color: #fff;
    }
  }
  .no-lyric {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
}
</style>