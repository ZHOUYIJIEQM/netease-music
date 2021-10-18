<template>
  <!-- 云村 -->
  <div class="yun-village-page">
    <!-- 头部导航 -->
    <Navbar 
      ref="navbar"
      class="yun-village-navbar"
      @clickLeft="toggleMenu"
    >
      <template #left>
        <i class="iconfont icon-weibiaoti12"></i>
      </template>
      <template #middle>
        <div class="nav-flag">
          <!-- todo: 改一下切换时下方红线动画 -->
          <div 
            class="flag-item" 
            v-for="(item, index) in flagList"
            :key="index"
            :class="{'active': flagActive === index}"
            @click="clickFlag(index)"
          >{{item}}</div>
        </div>
      </template>
      <template #right>
        <i class="iconfont icon-zengjia"></i>
      </template>
    </Navbar>

    <div class="yun-village-content">
      <!-- 关注 -->
      <div class="yun-focus" v-show="flagActive === 0">
        <div class="yun-circle">
          <div class="title">我的云圈 <span>(还没有加入云圈)</span></div>
          <div class="go-circle"><span>去云圈广场逛逛</span><span class="iconfont icon-jiantou"></span></div>
        </div>
        <img class="tip-img" src="../../../assets/mine/yunCircle.png" alt="">
      </div>
      <!-- 推荐 -->
      <div class="video-recommend" v-show="flagActive === 1">
        <!-- todo: 通过设置 one-column two-column 改变列数 -->
        <!-- <div class="video-item one-column" -->
        <div class="video-item two-column"
          v-for="(item, index) in recommendVideo"
          :key="index"
        >
          <!-- <div class="img-box">
            <img :src="item.img" alt="">
            <span class="duration">{{item.duration}}</span>
          </div>
          <div class="mv-info">
            <div class="name text-eli">{{item.name}}</div>
            <div class="playinfo">
              <div class="count"><i class="iconfont icon-bofangsanjiaoxing"></i>{{item.playCount|formatNum}}</div>
              <div class="tag text-eli">{{item.tag}}</div>
            </div>
          </div> -->

          <YunRcmdMv :rcmdMv="item"></YunRcmdMv>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./YunVillage.js"></script>
<style lang="scss" scoped src="./YunVillage.scss"></style>
<style lang="scss">
.yun-village-page {
  $gap: .08rem;
  .video-recommend {
    .one-column {
      width: 100%;
      margin-bottom: .12rem;
      .img-box {
        aspect-ratio: 1 / .56; 
      }
    }
    .two-column {
      width: calc((100% - $gap) / 2);
      margin-bottom: $gap;
      .img-box {
        aspect-ratio: 1 / 1.27; 
      }
    }
  }
}
</style>