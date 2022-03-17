<template>
  <!-- 每日推荐 -->
  <div class="daily-playlist-page" ref="dailyList">
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
        <div>{{playlistName}}</div>
      </template>
      <template #background>
        <!-- 高斯模糊 -->
        <div class="navbar-bg bg-outer" ref="navbarBg"  v-if="dailySongs.length">
          <div
            class="bg-inner"
            :style="{ 'background-image': 'url(' + dailySongs[0].img + ')' }"
          ></div>
        </div>
      </template>
    </Navbar>

    <!-- 顶部 -->
    <div class="top">
      <!-- 每日推荐 日期 -->
      <div class="daily-info">
        <div class="date">
          <span class="day">{{currentDay}}</span>
          <span>/</span>
          <span>{{currentMonth}}</span>
        </div>
        <div class="recommend-text">
          <span>历史推荐</span>
          查看今日运势 >
        </div>
      </div>
      <!-- 头部背景 -->
      <div v-if="dailySongs.length" class="top-bg bg-outer">
        <div
          class="bg-inner"
          :style="{ 'background-image': 'url(' + dailySongs[0].img + ')' }"
        ></div>
      </div>
    </div>

    <div class="playlist-content" ref="playlist">
      <van-sticky :offset-top="'0.5rem'">
        <div class="playlist-title">
          <i class="iconfont icon-bofang1"></i>
          <span class="title-text">播放全部</span>
          <span class="title-icon">
            <i class="iconfont icon-xiazai1"></i>
          </span>
        </div>
      </van-sticky>
      <div class="playlist">
        <div 
          class="list-item"
          v-for="(item, index) in dailySongs"
          :key="index"
        >
          <SongInfo :songInfo="item"></SongInfo>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./DailyPlayList.js"></script>
<style lang="scss" scoped src="./DailyPlayList.scss"></style>