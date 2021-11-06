<template>
  <!-- 歌单评论页 -->
  <div class="playlist-comment-page" v-show="playList.id">
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
        <div class="title">
          评论
          <span v-if="commentCount">({{commentCount}})</span>
        </div>
      </template>
    </Navbar>

    <!-- 歌单信息 -->
    <div class="playlist-info">
      <div class="box">
        <template v-if="playList.id">
          <img v-lazy="playList.coverImgUrl+'?param=100y100'" alt="">
          <div class="des-info">
            <p class="name">{{playList.name}}</p>
            <p class="author">by <span>{{playList.creator.nickname}}</span></p>
          </div>
          <div class="right">
            <i class="iconfont icon-jiantou"></i>
          </div>
        </template>
      </div>
    </div>

    <!-- 歌单评论条 -->
    <van-sticky offset-top=".5rem" v-show="commentCount">
      <div class="comment-title">
        <span class="active">评论区</span>
        <span class="tag" :class="{active: active === '推荐'}" @click="setActive('推荐')">推荐</span>
        <span class="tag" :class="{active: active === '最热'}" @click="setActive('最热')">最热</span>
        <span class="tag" :class="{active: active === '最新'}" @click="setActive('最新')">最新</span>
      </div>
    </van-sticky>
    
    <!-- 评论内容 -->
    <div class="comments-box" v-if="comments.length">
      <div class="comment-item"
        v-for="(item, index) in comments"
        :key="index"
      >
        <div class="img-box">
          <img class="avatar" :src="item.user.avatarUrl+'?param=300y300'" alt="">
          <img class="pendant" v-if="item.pendantData" :src="item.pendantData.imageUrl+'?param=300y300'" alt="">
          <img class="avatarDetail" v-if="item.user.avatarDetail" :src="item.user.avatarDetail.identityIconUrl" alt="">
        </div>
        <div class="comment-content">
          <div class="top">
            <div class="user">
              <div class="name">
                <span class="user-name">{{item.user.nickname}}</span>
                <span class="vip-box" v-if="item.user.vipRights">
                  <img src="../../assets/cvip.png" alt="">
                  <span class="split">▪</span>
                  <span class="level">{{item.user.vipRights.redVipLevel}}</span>
                </span>
              </div>
              <div class="date">{{item.time|formatTime}}</div>
            </div>
            <div class="zan">
              <span class="zan-num" :style="{color: item.liked ? '#fe3a3b' : ''}" v-if="item.likedCount">{{item.likedCount}}</span>
              <i class="iconfont icon-zan" v-if="!item.liked"></i>
              <i class="iconfont icon-z-likeFill" v-else></i>
            </div>
          </div>
          <div class="content" v-html="formatComment(item.content)"></div>
          <div class="reply" v-if="item.showFloorComment.replyCount">{{item.showFloorComment.replyCount}}条回复 <i class="iconfont icon-jiantou"></i></div>
        </div>
      </div>
    </div>

    <div class="bottom" v-if="!this.hasMore">没有更多了哦!</div>

    <div class="no-comments" v-show="!commentCount">
      暂无评论, 欢迎抢沙发
    </div>

  </div>
</template>
<script src="./PlayListComment.js"></script>
<style lang="scss" scoped src="./PlayListComment.scss"></style>