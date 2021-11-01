<template>
  <!-- 歌单广场 -->
  <div class="playlist-page" ref="listSquare">
    <!-- 导航条 -->
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
        <div class="playlist-name">歌单广场</div>
      </template>
    </Navbar>
    <!-- 滚动导航 -->
    <div class="tabbar" ref="squareTabbar">
      <div class="tab">
        <Tabbar :tabObj="tabData" ref="tabbar" @changeTab="tabChange"></Tabbar>
      </div>
      <div class="more">
        <img src="../../assets/more.png" />
      </div>
    </div>
    <!-- 轮播切换 -->
    <div class="swiper-box">
      <swiper
        :options="listSwiperOptions"
        ref="listSwiper"
        class="list-swiper"
        v-if="tabData.length"
        @slideChange="swiperChange"
      >
        <swiper-slide
          class="list-item-box"
          v-for="(item, index) in tabData"
          :key="index"
          ref="listItem"
        >
          <div class="playlist-content">
            <div class="playlist-box"
              v-for="(item1, index1) in playList[index]"
              :key="index1"
            >
              <PlayListBlock :topShadow="{background: '#e9e8e8', height: '.05rem'}" :playListData="item1"></PlayListBlock>
            </div>
          </div>
          <div class="loading" v-show="loading">
            <div class="circle"><van-loading color="red" size="0.2rem"/></div>
            <p>正在加载</p>
          </div>
          <div class="bottom" v-show="!tabParams[index].more">到底了!</div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script src="./PlayListSquare.js"></script>
<style lang="scss" scoped src="./PlayListSquare.scss"></style>
<style lang="scss">
.loading {
  .van-loading__circular circle {
    stroke-width: .05rem;
  }  
}
</style>