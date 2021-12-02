<template>
  <!-- 播放器 -->
  <!-- 
    icon-jiantouyou-copy 返回
    icon-fenxiang 分享
    icon-icon-test 空心 
    icon-aixin  实心
    icon-xiazai1 下载
    icon-pinglun2 评论
    icon-gengduoxiao 更多
    icon-xunhuan 循环
    icon-shangyishou 上一曲
    icon-bofang 播放
    icon-zanting 暂停
    icon-shangyishoushangyige 下一曲
    icon-PlayListbofangliebiao 播放列表
  -->
  <transition name="playerTrans">
    <div class="player-comp" v-show="showPlayer">
      <!-- 高斯模糊背景 -->
      <div class="player-bg bg-outer">
        <div 
          class="bg-inner"
          ref="bgInnerEle"
          :style="{'background-image': `url(${defaultBg})`}"
        ></div>
      </div>

      <!-- 界面 -->
      <div class="player-box">
        <!-- 头部 -->
        <div class="navbar">
          <i class="iconfont icon-jiantouyou-copy" @click="hidePlayer"></i>
          <div class="navbar-text">
            <div class="name text-eli">{{songInfo.name}}</div>
            <div class="artist text-eli">{{songInfo.artist}}</div>
          </div>
          <i class="iconfont icon-fenxiang"></i>
        </div>
        <!-- 中部 -->
        <div class="middle-box">

        </div>
        <!-- 底部 -->
        <div class="bottom-box">
          <!-- 收藏 下载 铃声 评论 更多 -->
          <div class="song-bar">
            <!-- 空心 -->
            <i class="iconfont icon-icon-test"></i>
            <!-- 实心 -->
            <!-- <i class="iconfont icon-aixin"></i> -->
            <i class="iconfont icon-xiazai1"></i>
            <i class="iconfont icon-lingsheng"></i>
            <i class="iconfont icon-pinglun2"></i>
            <i class="iconfont icon-gengduoxiao"></i>
          </div>
          <!-- 进度条 -->
          <div class="progress-bar">
            
          </div>
          <!-- 歌曲控制 -->
          <div class="control-bar">
            <i class="iconfont icon-xunhuan"></i>
            <i class="iconfont icon-shangyishou"></i>
            <div class="status" @click="togglePlayStatus">
              <i class="iconfont icon-bofang2" v-if="playStatus==='paused'"></i>
              <i class="iconfont icon-weibiaoti519" v-else></i>
            </div>
            <i class="iconfont icon-shangyishoushangyige"></i>
            <i class="iconfont icon-PlayListbofangliebiao"></i>
          </div>
        </div>
      </div>

      <!-- 播放 -->
      <audio ref="audioPlayer"></audio>

    </div>
  </transition>
</template>
<script src="./Player.js"></script>
<style lang="scss" scoped src="./Player.scss"></style>