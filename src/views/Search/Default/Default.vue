<template>
  <div class="default-content" ref="contentBox">
    <!-- 历史记录 -->
    <div class="history" v-show="searchHistoryArr.length">
      <div class="text">历史</div>
      <div 
        class="history-content" 
        ref="historyContent" 
        :class="searchHistoryMask"
      >
        <div 
          class="inner-box"
          ref="historyContentInner"
          @scroll="historyScroll"
        >
          <span 
            class="his-item" 
            v-for="(item, index) in searchHistoryArr" 
            :key="index"
            @click="goSearchRes(item)"
          >{{item}}</span>
        </div>
      </div>
      <span class="iconfont icon-laji" @click="clearHistory"></span>
    </div>

    <template v-if="boardData.length">
      <div class="board-pagination">
        <!-- 榜单 -->
        <div 
          class="pagination-item"
          v-for="(item, index) in boardPagination"
          :key="index"
          :class="{'active': pagination === index}"
          @click="changePagintion(index)"
        >{{item}}</div>
        <!-- 榜单轮播 -->
      </div>
      <div class="board-box">
        <swiper
          class="board-swiper"
          ref="boardSwiper"
          :options="boardOptions"
          @slideChange="changeBoard"
          v-if="boardData.length"
        >
          <swiper-slide
            class="board-item"
            v-for="(item, index) in 3"
            :key="index"
          >
            <div class="board-inner">
              <div 
                class="inner-item"
                v-for="(item1, index1) in boardData[0].slice(0, 10)"
                :key="index1"
                @click="goSearchRes(item1.searchWord)"                  
              >
                <div class="index">{{index1+1}}</div>
                <div class="text text-eli">{{item1.searchWord}}</div>
                <div 
                  class="icon iconfont icon-shang"
                  v-if="item1.iconUrl && item1.iconType === 5"
                ></div>
                <div 
                  class="icon new" 
                  v-else-if="item1.iconUrl && item1.iconType === 0"
                >NEW</div>
                <div 
                  class="icon hot"
                  v-if="item1.iconUrl && item1.iconType === 1"
                >HOT</div>
              </div>
              <template v-if="!showMore">
                <div 
                  class="inner-item"
                  v-for="(item1, index1) in boardData[0].slice(10)"
                  :key="index1+'-'"
                  @click="goSearchRes(item1.searchWord)"
                >
                  <div class="index">{{index1+11}}</div>
                  <div class="text text-eli">{{item1.searchWord}}</div>
                  <div 
                    class="icon iconfont icon-shang"
                    v-if="item1.iconUrl && item1.iconType === 5"
                  ></div>
                  <div 
                    class="icon new" 
                    v-else-if="item1.iconUrl && item1.iconType === 3"
                  >NEW</div>
                  <div 
                    class="icon hot"
                    v-if="item1.iconUrl && (item1.iconType === 0 || item1.iconType === 1)"
                  >HOT</div>
                </div>
              </template>
              <div 
                class="show-more" 
                v-if="showMore"
                @click="showMore = false"
              >展开更多热搜<i class="iconfont icon-jiantouyou-copy"></i></div>
            </div>
          </swiper-slide>
        </swiper>
      
      </div>

      <!-- 音乐专区 -->
      <div class="music-area">
        <div class="title">音乐专区</div>
        <div class="music-area-content" ref="areaContent" style="height: 2.63rem">
          <div class="area-item"
            v-for="(item, index) in musicArea"
            :key="index"
            @click="$toast(item.name+' 未开发!')"
          >
            <div class="name">
              <span>{{item.name}}</span> 
              <img :src="item.img" v-if="item.img" alt="">
            </div>
            <div class="info text-eli" v-if="item.info">{{item.info}}</div>
          </div>
          <div class="collapse" @click="collapse">
            展开更多专区<i class="iconfont icon-jiantouyou-copy"></i>
          </div>
        </div>
      </div>
      
      <!-- 推荐活动 -->
      <div class="recommend-active">
        <div class="title">推荐活动</div>
        <div 
          class="recommend-item"
          v-for="(item, index) in recommend"
          :key="index"
          @click="$toast('未开发!')"
        >
          <img :src="item.img" alt="">
          <div class="name">{{item.info}}</div>
        </div>
      </div>

    </template>
  </div>
</template>
<script>
import { saveEleScrollH } from "../mixin";
import { hotSearch } from "@/api/api"
export default {
  name: "SearchDefault",
  mixins: [saveEleScrollH],
  data() {
    return {
      searchHistoryMask: '',
      boardPagination: ['热搜榜', '视频榜', '播客榜'],
      pagination: 0,
      boardOptions: {
        // slidesPerView: 'auto',
        slidesPerView: 1.05,
        // 获取到 activeIndex
        normalizeSlideIndex: false,
        resistanceRatio: 0,
      },
      boardData: [],
      // 显示展开更多热搜
      showMore: true,
      // 音乐专区
      musicArea: [
        { name: "歌手分类" },
        { name: "曲风分类", info: "查查你的专属曲风偏好", img: require("@/assets/search/曲风分类.png"), },
        { name: "影视原声专区", info: "听歌追剧好时光", img: require("@/assets/search/影视原声专区.png"), },
        { name: "电音专区", info: "全球热门电音嗨翻现场 ", img: require("@/assets/search/电音专区.png"), },
        { name: "说唱专区", info: "说唱人物志Vol.6 Travis Scott", img: require("@/assets/search/说唱专区.png"), },
        { name: "摇滚专区", info: "国摇新声势力等你来听", img: require("@/assets/search/摇滚专区.png"), },
        { name: "古典专区", info: "大咖来了Vol.2:古典VS流行", img: require("@/assets/search/古典专区.png"), },
        { name: "ACG专区", info: "测测你是ACG大粉头吗", img: require("@/assets/search/ACG专区.png"), },
        { name: "DJ专区", info: "潮流网络热歌一网打尽", img: require("@/assets/search/DJ专区.png"), },
        { name: "亲子专区", info: "陪伴宝贝快乐成长", img: require("@/assets/search/亲子专区.png"), },
        { name: "中国特色专区", info: "了解中国传统音乐文化", img: require("@/assets/search/中国特色专区.png"), },
        { name: "经典专区", info: "致敬时代 留住经典", img: require("@/assets/search/经典专区.png"), },
      ],
      // 推荐活动
      recommend: [
        { img: require('@/assets/search/1.png'), info: "邀新福利：速领现金券+VIP月卡！", },
        { img: require('@/assets/search/2.png'), info: "关注音乐好朋友，每日抽周边黑胶！", },
        { img: require('@/assets/search/3.png'), info: "火前留名：挑战你的听歌品味", },
        { img: require('@/assets/search/4.png'), info: "广播电台：一键收听音乐资讯有声书", },
      ],
    };
  },
  computed: {
    searchHistoryArr() {
      return this.$store.getters.searchHistoryArr
    },
    // 轮播对象
    boardSwiper() {
      return this.$refs.boardSwiper.$swiper
    },
  },
  mounted() {
    this.initData()
  },
  activated() {
    this.historyScroll()
  },
  methods: {
    async initData() {
      this.$store.commit("changeLoading", true);
      try {
        let board = await hotSearch()
        // console.log(board);
        this.$set(this.boardData, 0, board.data)
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          this.$store.commit("changeLoading", false);
        }, 300);
      }
    },
    changeBoard() {
      console.log('changeboard');
      this.boardSwiper && (this.pagination = this.boardSwiper.activeIndex)
    },
    changePagintion(index) {
      console.log('changepagination');
      this.pagination = index
      this.boardSwiper.slideTo(this.pagination)
    },
    goSearchRes(keyWord) {
      this.historyScroll()
      this.$parent.searchText = keyWord
      this.$parent.goSearchResult()
    },
    // 展开更多专区
    collapse() {
      this.$refs.areaContent.style.height = 'auto'
      this.$refs.areaContent.removeChild(this.$refs.areaContent.querySelector('.collapse'))
    },
    // 处理历史记录滚动遮罩
    historyScroll() {
      let parentW = this.$refs.historyContent.offsetWidth
      let innerW = this.$refs.historyContentInner.scrollWidth
      let left = this.$refs.historyContentInner.scrollLeft
      let gap = 5
      // console.log(parentW, innerW, left);
      // 右侧遮罩
      if (innerW > parentW) {
        this.searchHistoryMask = 'right-mask'
      } else {
        this.searchHistoryMask = ''
      }
      // 向左滑动大于 设置的值
      if (left > gap) {
        this.searchHistoryMask = 'left-mask right-mask'
      }
      if (left <= 0) {
        this.searchHistoryMask = this.searchHistoryMask.replace(/left-mask\s*/, '')
      }
    },
    clearHistory() {
      this.$store.commit('saveSearchHistoryArr', [])
    }
  },
  watch: {
    searchHistoryArr: {
      handler: function (newV) {
        if (newV.length) {
          this.$nextTick(() => {
            // 滚动未触发时, 先执行一次
            this.historyScroll()
          })
        }
      },
      immediate: true,
    },
  }
};
</script>
<style lang="scss" scoped>
.default-content {
  height: 100%;
  overflow: scroll;

  .history {
    display: flex;
    align-items: center;
    padding: .15rem;
    font-size: .14rem;
    .text {
      font-weight: bold;
    }
    .history-content {
      flex: 1;
      margin: 0 .12rem;
      overflow: hidden;
      position: relative;
      min-height: 100%;
      &.left-mask::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 100%;
        width: .2rem;
        background: linear-gradient(to left, transparent, #fff 85%);
      }
      &.right-mask::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        height: 100%;
        width: .2rem;
        background: linear-gradient(to right, transparent, #fff 85%);
      }
      .inner-box {
        overflow-x: scroll;
        display: flex;
        padding: 0 .06rem;
      }
      span {
        border-radius: .5rem;
        background-color: #f3f3f3;
        padding: .05rem .12rem;
        margin-right: .1rem;
        display: flex;
        align-items: center;
        font-size: .13rem;
        justify-content: center;
        line-height: 1;
        white-space: nowrap;
        &:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }
    .icon-laji {
      flex-shrink: 0;
      color: #b6b6b6;
    }
  }

  .board-pagination {
    padding: .1rem .15rem 0;
    display: flex;
    align-items: center;
    .pagination-item {
      font-size: .14rem;
      &:nth-child(-n+2) {
        margin-right: .3rem;
      }
      &.active {
        font-weight: bold;
      }
    }
  }
  .board-box {
    margin-top: .06rem;
    min-height: 1.8rem;
    .board-item {
      width: 95%;
      padding: .1rem 0;
      &:last-child {
        .board-inner {
          margin-right: .15rem;
        }
      }
      // padding-right: .01rem;
      &:first-child {
        .board-inner {
          margin-left: .15rem;
        }
      }
      .board-inner {
        position: relative;
        margin-left: .05rem;
        margin-right: .03rem;
        display: flex;
        flex-wrap: wrap;
        padding: .1rem 0 .15rem .15rem;
        box-shadow: 0px 0px 5px 1px #e0e0e0;
        border-radius: .1rem;
        .inner-item {
          display: flex;
          align-items: center;
          width: 50%;
          font-size: .13rem;
          &:active {
            background-color: #dadada;
          }
          &:nth-child(-n+3) {
            .index {
              color: #fe4041;
            }
            .text {
              font-weight: bold;
            }
          }
          .index {
            color: #979797;
            min-width: .22rem;
            font-size: .16rem;
          }
          .text {
            padding: .06rem;
            max-width: 70%;
          }
          img {
            width: .25rem;
          }
          .icon {
            font-size: .12rem;
            color: #fc4945;
            margin-right: .2rem;
          }
          .hot, .new {
            font-weight: bold;
            font-style: italic;
          }
          .new {
            color: #13a717;
          }
          .icon.icon-shang {
            font-size: .16rem;
            font-weight: bold;
          }
        }
        .show-more {
          width: 100%;
          color: #9d9d9d;
          font-size: .13rem;
          text-align: center;
          padding: .1rem 0 0;
          background-color: #fff;
          border-bottom-left-radius: .1rem;
          border-bottom-right-radius: .1rem;
          i {
            vertical-align: middle;
            margin-left: .03rem;
            font-size: .12rem;
            font-weight: bold;
          }
        }
      }
    }
  }

  .music-area {
    padding: 0 .15rem;
    .title {
      padding: .16rem 0 .12rem;
      font-size: .14rem;
      font-weight: bold;
    }
    .music-area-content {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      overflow: hidden;
      .area-item {
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius: .1rem;
        height: .6rem;
        margin-bottom: .1rem;
        width: 48.5%;
        background: linear-gradient(30deg, #907f77, #dfd1c8), #94837b;
        overflow: hidden;
        &:nth-child(2n+1) {
          margin-right: 3%;
        }
        .name {
          padding: 0 .1rem 0 .12rem;
          flex: 1;
          display: flex;
          align-items: center;
          color: #fff;
          font-weight: bold;
          font-size: .15rem;
          img {
            margin-left: auto;
            width: .2rem;
          }
        }
        .info {
          padding: 0 .15rem;
          font-size: .1rem;
          color: #ebebeb;
          height: .24rem;
          line-height: .24rem;
          background: rgba(190, 190, 190, 0.08);
        }
        &:nth-child(2) {
          background: linear-gradient(30deg, #fb4b3c, #ffb3a5);
        }
        &:nth-child(3) {
          background: linear-gradient(30deg, #c84817, #f6bf89);
        }
        &:nth-child(4) {
          background: linear-gradient(30deg, #4e3ff4, #78dcf4);
        }
        &:nth-child(5) {
          background: linear-gradient(30deg, #fb3f0f, #febf72);
        }
        &:nth-child(6) {
          background: linear-gradient(30deg, #280677, #ad27a0);
        }
        &:nth-child(7) {
          background: linear-gradient(30deg, #924b45, #febf72);
        }
        &:nth-child(8) {
          background: linear-gradient(30deg, #e75471, #fdd2cc);
        }
        &:nth-child(9) {
          background: linear-gradient(30deg, #7e55d9, #e7c3ff);
        }
        &:nth-child(10) {
          background: linear-gradient(30deg, #e79049, #f9e5b3);
        }
        &:nth-child(11) {
          background: linear-gradient(30deg, #d91f5c, #ff9aa2);
        }
        &:nth-child(12) {
          background: linear-gradient(30deg, #bf9a42, #f4dfb2);
        }
      }
      .collapse {
        position: absolute;
        width: 100%;
        bottom: 0;
        color: #9d9d9d;
        font-size: 0.13rem;
        text-align: center;
        background: linear-gradient(to bottom, hsl(0deg 0% 100% / 80%) 0%, #fff 70%);
        padding: .4rem 0 0;
      }
    }
  }

  .recommend-active {
    padding-bottom: .4rem;
    .title {
      padding: .15rem .15rem .1rem;
      font-weight: bold;
    }
  }
  .recommend-item {
    display: flex;
    align-items: center;
    padding-left: .15rem;
    &:active {
      background-color: #ebebeb;
    }
    img {
      width: .4rem;
      border-radius: .06rem;
    }
    .name {
      flex: 1;
      font-size: .14rem;
      margin-left: .1rem;
      border-bottom: 1px solid #f3f3f3;
      padding: .18rem 0;
    }
    &:nth-last-child(1) {
      .name {
        border-bottom: 0px;
      }
    }
  }
}
</style>