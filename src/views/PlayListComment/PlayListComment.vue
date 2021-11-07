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
          <span>评论</span>
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
        <CommentItem :commentData="item" :commentType="2" :resourceId="commentId"></CommentItem>
      </div>
      <div class="bottom" v-if="!this.hasMore">没有更多了哦!</div>
    </div>

    <div class="no-comments" v-show="!commentCount">
      暂无评论, 欢迎抢沙发
    </div>

    <div class="bottom-input">
      <input type="text" placeholder="写评论...">
      <p>发送</p>
    </div>

  </div>
</template>
<script src="./PlayListComment.js"></script>
<style lang="scss" scoped src="./PlayListComment.scss"></style>