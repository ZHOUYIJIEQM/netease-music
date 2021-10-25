<template>
  <!-- 歌单详情页面 -->
  <div class="playlist-detail-page">
    <Navbar 
      class="navbar" 
      @clickLeft="goBack"
      ref="navbar"
      @navbarMounted="navbarMounted"
    >
      <template #left>
        <div class="icon">
          <i class="iconfont icon-fanhui"></i>
        </div>
      </template>
      <template #middle>
        <div class="middle-content">
          <div class="text">
            <van-notice-bar
              class="notice-bar"
              :text="playListName"
              speed="30"
              color="#fff"
              background="transparent"
            />
          </div>
          <i class="iconfont icon-sousuo"></i>
        </div>
      </template>
      <template #right>
        <i class="iconfont icon-gengduoxiao"></i>
      </template>
      <template #background>
        <!-- 高斯模糊 -->
        <div class="navbar-bg bg-outer" ref="navbarBg">
          <div
            class="bg-inner"
            :style="{ 'background-image': 'url(' + playList.coverImgUrl + ')' }"
          ></div>
        </div>
      </template>
    </Navbar>
    <!-- 歌单详情介绍 -->
    <div class="playlist-detail" ref="playlistDetail">
      <!-- 背景 -->
      <div class="description-bg">
        <div class="detail-bg bg-outer" ref="detailBg">
          <div 
            class="bg-inner"
            :style="{ 'background-image': 'url(' + playList.coverImgUrl + ')' }"
          ></div>
        </div>
      </div>
      <!-- 歌单描述 -->
      <div 
        class="description-box" 
        ref="description"
        @click="popUpDetail"
      >
        <div class="img-box">
          <template v-if="playList.coverImgUrl">
            <img v-lazy="playList.coverImgUrl" alt="">
            <span><i class="iconfont icon-bofangsanjiaoxing"></i> {{playList.playCount | formatNum}}</span>
          </template>
        </div>
        <div class="info-box" v-if="playList.creator">
          <div class="playlist-name text-eli">
            {{playList.name}}
          </div>
          <div class="author">
            <img v-lazy="playList.creator.avatarUrl" alt=""> <span>{{ playList.creator.nickname }}</span>
          </div>
          <div class="playlist-description">
            <span class="text-eli">{{playList.description}}</span><i class="iconfont icon-jiantouyou"></i>
          </div>
        </div>
      </div>
      <!-- 收藏 评论 分享 -->
      <div class="playlist-bar" ref="playlistBar">
        <!-- todo: 还需设置点击事件 -->
        <div 
          class="favo text-eli" 
          :class="{'grey-color': myPlayList}"
          @click="handlerSubscribe"
        >
          <!-- 登录状态, 自己创建的歌单 || 已经收藏的歌单, 显示打钩图标 -->
          <i class="iconfont icon-dagou" v-if="myPlayList || subscribed"></i>
          <!-- 非登录状态 || 或者登录后没收藏的歌单 显示收藏图标 -->
          <i class="iconfont icon-jia1" v-else></i>
          <span class="text-eli" v-if="playList.subscribedCount">{{playList.subscribedCount|formatNum}}</span>
          <span v-else>收藏</span>
        </div>
        <div class="comment text-eli" @click="goComment">
          <i class="iconfont icon-pinglun2"></i>
          <span class="text-eli" v-if="playList.commentCount">{{playList.commentCount|formatNum}}</span>
          <span v-else>评论</span>
        </div>
        <div class="share text-eli" @click="showShare = true">
          <i class="iconfont icon-fenxiang"></i>
          <span class="text-eli" v-if="playList.shareCount">{{playList.shareCount|formatNum}}</span>
          <span v-else>分享</span>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="playlist-song" ref="playlist">
      <!-- 头部 -->
      <van-sticky :offset-top="navbarHeight">
        <div class="playlist-title">
          <i class="iconfont icon-bofang1"></i>
          <span class="title-text">播放全部<span v-if="playList.trackIds">({{playList.trackIds.length}})</span></span>
          <span class="title-icon">
            <i class="iconfont icon-xiazai1"></i>
          </span>
        </div>
      </van-sticky>
      <!-- 歌曲列表 -->
      <van-list
        v-model="loadingData"
        :finished="finished"
        :error.sync="loadingError"
        error-text="请求失败，点击重新加载"
        @load="getSongs"
      >
        <div 
          v-for="(item, index) in songList" 
          :key="index"
          class="list-item"
        >
          <PlayListDetailItem :listIndex="index+1" :listInfo="item"></PlayListDetailItem>
        </div>
      </van-list>
    </div>

    <!-- 返回顶部 -->
    <i class="iconfont icon-fanhui toTop" :class="{topMore: $store.getters.showPlayer}" v-show="topFlag" @click="toTop"></i>

    <!-- 分享 -->
    <van-share-sheet
      v-model="showShare"
      :options="options"
      @select="onSelect"
    />

    <!-- 弹出更详细的信息 -->
    <transition name="fadeIn">
      <div class="pop-up" v-if="playList.id && popUpShow" @click="clickPopUp">
        <i class="iconfont icon-chacha"></i>
        <div class="inner-box">
          <div class="top">
            <div class="img">
              <img :src="playList.coverImgUrl" alt="">
            </div>
            <div class="name">{{playList.name}}</div>
            <div class="des-tagbox">
              <span>标签:</span>
              <div class="des-tag"
                v-for="(item, index) in playList.tags"
                :key="index"
              >
                {{item}}
              </div>
            </div>
            <div class="des-content" v-html="description"></div>
          </div>
          <div class="bottom">
            <span @click.stop="downloadImg(playList.coverImgUrl)">保存封面</span>
          </div>
        </div>
        <div class="popup-bg bg-outer">
          <div class="bg-inner" :style="{'background-image': 'url('+playList.coverImgUrl+')'}"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script src="./PlayListDetail.js"></script>
<style lang="scss" src="./PlayListDetail.scss"></style>
<style lang="scss">
@import '@/styles/mixin.scss';
.playlist-detail-page {
  .navbar {
    .van-notice-bar {
      padding: 0;
    }
    .van-notice-bar__content {
      font-size: .17rem;
    }
  }
  .playlist-song {
    .van-loading__spinner {
      width: .2rem;
      height: .2rem;
    }
    .van-loading__circular circle {
      color: #f05a5a;
      stroke-width: 5;
    }
    .van-loading__text {
      color: #f05a5a;
      // font-weight: bold;
    }
  }
}
</style>