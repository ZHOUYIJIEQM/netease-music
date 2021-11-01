<template>
  <!-- 排行榜 -->
  <div class="leaderBoard-page">
    <Navbar
      class="navbar"
      @clickLeft="goBack"
      ref="navbar"
    >
      <template #left>
        <div class="icon">
          <i class="iconfont icon-fanhui"></i>
        </div>
      </template>
      <template #middle>
        <div>排行榜</div>
      </template>
    </Navbar>

    <div class="content" v-if="show">
      <van-tabs v-model="tabActive" scrollspy sticky offset-top="0.5rem">
        <div class="recommend normal songlist">
          <div class="title">榜单推荐</div>
          <div class="list-box" v-if="recommend.length">
            <div class="list-item"
              v-for="(item, index) in recommend"
              :key="index"
            >
              <PlayListBlock :playIcon="true" :playListData="item"></PlayListBlock>
            </div>
          </div>
          <div v-else style="text-align: center;">暂无推荐</div>
        </div>
        <van-tab title="官方">
          <div class="official">
            <div class="title">官方榜</div>
            <div 
              class="official-item"
              v-for="(item, index) in official"
              :key="index"
              @click="goPlaylist(item.id)"
            >
              <div class="left">
                <div class="list-name">{{item.name}}</div>
                <img v-lazy="item.img + '?param=300y300'" alt="">
              </div>
              <div class="right">
                <div 
                  class="song text-eli" 
                  v-for="(item, index) in item.tracks" 
                  :key="index"
                >
                  <span class="index">{{index+1}}.</span>
                  <span class="name">{{item.first}}</span>
                  <span class="split">-</span>
                  <span class="author">{{item.second}}</span>
                </div>
              </div>
              <div class="frequency">{{ item.frequency }}</div>
            </div>

          </div>
        </van-tab>
        <van-tab title="精选">
          <div class="normal songlist">
            <div class="title" ref="top">精选榜</div>
            <div class="list-box" v-if="selected">
              <div class="list-item"
                v-for="(item, index) in selected"
                :key="index"
              >
                <PlayListBlock :playIcon="true" :playListData="item"></PlayListBlock>
              </div>
            </div>
            <div v-else style="text-align: center;">暂无推荐</div>
          </div>
        </van-tab>
        <van-tab title="曲风">
          <div class="normal songlist">
            <div class="title">曲风榜</div>
            <div class="list-box" v-if="genre.length">
              <div class="list-item"
                v-for="(item, index) in genre"
                :key="index"
              >
                <PlayListBlock :playIcon="true" :playListData="item"></PlayListBlock>
              </div>
            </div>
            <div v-else style="text-align: center;">暂无推荐</div>
          </div>
        </van-tab>
        <van-tab title="全球">
          <div class="normal songlist">
            <div class="title">全球榜</div>
            <div class="list-box" v-if="global.length">
              <div class="list-item"
                v-for="(item, index) in global"
                :key="index"
              >
                <PlayListBlock :playIcon="true" :playListData="item"></PlayListBlock>
              </div>
            </div>
            <div v-else style="text-align: center;">暂无推荐</div>
          </div>
        </van-tab>
        <van-tab title="MV">
          <div class="normal songlist">
            <div class="title">MV榜</div>
            <div class="list-box" v-if="MV.length">
              <div class="list-item"
                v-for="(item, index) in MV"
                :key="index"
              >
                <PlayListBlock :playIcon="true" :playListData="item"></PlayListBlock>
              </div>
            </div>
            <div v-else style="text-align: center;">暂无推荐</div>
          </div>
        </van-tab>
        <van-tab title="特色">
          <div class="normal songlist">
            <div class="title">特色榜</div>
            <div class="list-box" v-if="feature.length">
              <div class="list-item"
                v-for="(item, index) in feature"
                :key="index"
              >
                <PlayListBlock :playIcon="true" :playListData="item"></PlayListBlock>
              </div>
            </div>
            <div v-else style="text-align: center;">暂无推荐</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script src="./LeaderBoard.js"></script>
<style lang="scss" scoped src="./LeaderBoard.scss"></style>
<style lang="scss">
@import '@/styles/variable.scss';
.leaderBoard-page {
  .navbar {
    background: $homeBgc;
  }
  .content {
    .van-tabs--line .van-tabs__wrap {
      padding-top: .1rem;
      padding-bottom: .1rem;
      box-sizing: content-box;
      height: .2rem;
      background-color: $homeBgc;
      &>div {
        background-color: inherit;
      }
    }
    .van-tabs__nav--line {
      padding-bottom: 0;
    }
    .van-tab {
      z-index: 100;
      position: relative;
    }
    .van-tab__text {
      font-size: .16rem;
    }
    .van-tabs__nav {
      // 第2个到倒数第3个
      .van-tab:nth-of-type(n+2):nth-last-of-type(n+3) {
        padding-left: .2rem;
        padding-right: .2rem;
      }
    }
    .van-tabs__content {
      overflow: hidden;
    }
    .van-tabs__line {
      bottom: 0rem;
      height: 0.05rem;
      background: linear-gradient(90deg, hsla(0, 100%, 50%, 0.35), #ff0000);
      border-radius: 0.06rem;
    }
    .van-tab.van-tab--active {
      font-size: 0.16rem;
      font-weight: bold;
    }
  }
}
</style>