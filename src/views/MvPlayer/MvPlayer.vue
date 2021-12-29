<template>
  <!-- 需要区分 mv 还是 视频 -->
  <!-- 视频播放器 -->
  <!-- icon-bofang2 播放 -->
  <!-- icon-fanhui 后退 -->
  <!-- icon-gengduoxiao 更多 -->
  <!-- icon-triangle-down 三角形 展开-->
  <!-- icon-triangle-up -->
  <!-- icon-z-likeFill 赞 -->
  <!-- icon-pinglunpt-wangyiicon 评论 -->
  <!-- icon-fenxiangpt 分享 -->
  <!-- icon-jia1 收藏 -->
  <div class="mv-player-page">
    <div class="nav">
      <i class="iconfont icon-fanhui" @click="goBack"></i>
      <i class="iconfont icon-gengduoxiao"></i>
    </div>
    <div class="vdo-content">
      <div class="vdo-box">
        <video 
          ref="vdoEl" 
          class="video-ele"
          @click="togglePlay"
          @play="vdoPlay"
          @pause="vdoPause"
          @loadeddata="vdoLoadedData"
          @timeupdate="vdoTimeUpdate"
          @error="vdoError"
        ></video>
      </div>
      <transition name="fadeIn">
        <i 
          @click="togglePlay"
          class="iconfont icon-bofang2" 
          v-if="playState === 'paused'"
        ></i>
      </transition>
      <div class="author-box" v-if="vdoInfo.id">
        <div class="artist">
          <div class="avatar-box">
            <img class="avatar" :src="vdoInfo.creator.avatarUrl || defaultImg" alt="">
            <img class="identityIcon" v-if="vdoInfo.creator.identityIconUrl" :src="vdoInfo.creator.identityIconUrl">
          </div>
          <div class="name">
            {{vdoInfo.creator.nickname}}
          </div>
          <div class="follow"><i class="iconfont icon-jiahao"></i>关注</div>
        </div>
        <div class="des-box">
          <div class="title" @click="toggleShowDes">
            <span>{{vdoInfo.title}}</span>
            <i class="iconfont icon-triangle-down" v-if="vdoInfo.description && !showDes"></i>
            <i class="iconfont icon-triangle-up" v-if="vdoInfo.description && showDes"></i>
          </div>
          <div class="des" v-if="vdoInfo.description && showDes" v-html="vdoInfo.description"></div>
        </div>
      </div>
      <div class="right-bar" v-if="vdoInfo.id">
        <div class="icon-box">
          <i class="iconfont icon-z-likeFill"></i>
          <p>{{vdoInfo.praisedCount|formatNum}}</p>
        </div>
        <div class="icon-box">
          <i class="iconfont icon-pinglunpt-wangyiicon"></i>
          <p>{{vdoInfo.commentCount|formatNum}}</p>
        </div>
        <div class="icon-box">
          <i class="iconfont icon-fenxiangpt"></i>
          <p>{{vdoInfo.shareCount|formatNum}}</p>
        </div>
        <div class="icon-box">
          <i class="iconfont icon-jia1"></i>
          <p>{{vdoInfo.subscribeCount|formatNum}}</p>
        </div>
      </div>
      <div class="progress-box">
        <van-slider 
          v-model="progressTime" 
          :bar-height="barHeight"
          :button-size="buttonSize"
          :active-color="activeColor"
          :inactive-color="inActiveColor"
          @input="progressChange"
          @change="progressChangeEnd"
        ></van-slider>
      </div>
    </div>
    <div class="bottom">
      <i class="iconfont icon-yinle"></i> 
      <span lang="">暂无相关音乐!</span>
    </div>
  </div>
</template>
<script src="./MvPlayer.js"></script>
<style lang="scss" scoped src="./MvPlayer.scss"></style>
<style lang="scss">
.mv-player-page {
  .progress-box {
    .van-slider {
      transition: height .2s;
    }
    .van-slider__button {
      transition: all .2s;
      background-color: #969696;
    }
  }
}
</style>