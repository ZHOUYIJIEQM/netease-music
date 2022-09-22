<template>
  <!-- 播放器 -->
  <!-- 
    icon-jiantouyou-copy 返回
    icon-fenxiangpt 分享
    icon-icon-test 空心 
    icon-aixin  实心
    icon-xiazaipt 下载
    icon-pinglunpt-wangyiicon 评论
    icon-gengduoxiao 更多
    icon-list-loop 列表循环
    icon-danquxunhuan 单曲循环
    icon-suijibofang-wangyiicon 随机播放
    icon-shangyiqu-wangyiicon 上一曲
    icon-bofang2 播放
    icon-zanting 暂停
    icon-shangyiqu-wangyiicon 下一曲
    icon-caidan 播放列表
    icon-laba 喇叭
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
            <div class="name text-eli">{{songInfo?.name}}</div>
            <div class="artist text-eli">{{songInfo?.artist}}</div>
          </div>
          <i class="iconfont icon-fenxiangpt"></i>
        </div>
        <!-- 中部 -->
        <div class="middle-box" @click="togglePlayerImg">
          <transition-group name="fadeIn" mode="in-out">
            <div class="player-img" key="img" v-show="playerImg">
              <div class="top">
                <div class="needle-box">
                  <img ref="needle" class="needle" src="../../assets/player/needle.png" alt="">
                </div>
                <div class="disk-box" ref="disk"
                  :class="[playStatus === 'paused' ? 'paused' : 'playing', {'ready': adoReady}]"
                >
                  <img ref="diskImg" alt="">
                </div>
              </div>
              <!-- <div class="ly">
                <p class="text-eli" v-if="lyricText[lyricActiveIndex]">{{lyricText[lyricActiveIndex].text}}</p>
              </div> -->
              <!-- 收藏 下载 铃声 评论 更多 -->
              <div class="song-bar" @click.stop="clickSong">
                <div @click.stop="clickFavorite" style="width: .24rem;">
                  <!-- 实心 -->
                  <i class="iconfont icon-aixin" v-if="favoriteIcon"></i>
                  <!-- 空心 -->
                  <i class="iconfont icon-icon-test" v-else></i>
                </div>
                <i class="iconfont icon-xiazaipt"></i>
                <i class="iconfont icon-lingsheng"></i>
                <i class="iconfont icon-pinglunpt-wangyiicon"></i>
                <i class="iconfont icon-gengduoxiao"></i>
              </div>
            </div>
            <div class="player-lyric" key="lyric" v-show="!playerImg">
              <div class="volume-box">
                <i class="iconfont icon-laba"></i>
                <van-slider 
                  class="volume-slider"
                  v-model="volume"
                  bar-height="2px"
                  button-size=".08rem"
                  :active-color="volumeActiveColor"
                  :inactive-color="volumeInActiveColor"
                  @input="volumeChange"
                />
              </div>
              <lyricBox ref="lyricBoxEl" :lyricObj="lyricData" :playTime="currentTime"></lyricBox>
            </div>
          </transition-group>
        </div>
        <!-- 底部 -->
        <div class="bottom-box">
          <!-- 进度条 -->
          <div class="progress-box">
            <!-- 当前时间 -->
            <div class="current-time">{{fCurrentTime}}</div>
            <div class="music-progress">
              <van-slider 
                v-model="progressTime" 
                bar-height="1.5px"
                button-size=".06rem"
                :active-color="activeColor"
                :inactive-color="inActiveColor"
                @input="progressChange"
                @change="progressChangeEnd"
              />
            </div>
            <div class="duration-time">{{durationTime}}</div>
          </div>
          <!-- 歌曲控制 -->
          <div class="control-bar">
            <div class="sort" @click="changeSortType">
              <!-- 列表循环 -->
              <i class="iconfont icon-list-loop" v-if="playSortType === 'listCycle'"></i>
              <!-- 单曲循环 -->
              <i class="iconfont icon-danquxunhuan" v-if="playSortType === 'singleCycle'"></i>
              <!-- 随机播放 -->
              <i class="iconfont icon-suijibofang-wangyiicon" v-if="playSortType === 'random'"></i>
            </div>
            <i class="iconfont icon-shangyiqu-wangyiicon" @click="preSong"></i>
            <div class="status" @click="togglePlay">
              <i class="iconfont icon-bofang2" v-if="playStatus==='paused'"></i>
              <i class="iconfont icon-weibiaoti519" v-else></i>
            </div>
            <i class="iconfont icon-nextsong" @click="nextSong"></i>
            <i class="iconfont icon-caidan" @click="showPlayList"></i>
          </div>
        </div>
      </div>

      <!-- 播放音频 -->
      <audio 
        id="adoEl"
        ref="audioPlayer"
        @canplay="audioCanplay"
        @play="audioPlay"
        @pause="audioPause"
        @error="audioError"
        @waiting="audioWaiting"
        @ended="audioEnded"
        @timeupdate="audioTimeUpdate"
      ></audio>

    </div>
  </transition>
</template>
<script src="./Player.js"></script>
<style lang="scss" scoped src="./Player.scss"></style>