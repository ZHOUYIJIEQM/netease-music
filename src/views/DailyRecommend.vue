<template>
  <div class="daily-recommend-content">
    <div class="recommend-header" ref="header">
      <i class="iconfont icon-fanhui" @click="goBack()"></i>
      <transition name="fadeIn">
        <span v-show="showTitle">每日推荐</span>
      </transition>
    </div>
    <div class="header-pic" ref="headerPic">
      <img v-lazy="headerPic" alt="">
      <transition name="fadeIn">
        <div class="date" v-if="recommendList.length" v-show="!showTitle">
          <div class="date-box">
            <span class="day">{{date}}</span>
            <span class="month">/{{month}}</span>
          </div>
          <div class="history">历史日推</div>
        </div>
      </transition>
    </div>
    <div class="song-title" ref="songListTitle">
      <template v-if="recommendList.length">
        <div class="play-all" @click="playAll">
          <i class="iconfont icon-bofang"></i>
          <span>播放全部</span>
        </div>
        <span class="select">多选</span>
      </template>
    </div>
    <div class="song-content" ref="songListContent">
      <div v-for="(item, index) in recommendList" :key="index">
        <songItem :songItemData="item"></songItem>
      </div>
    </div>
    <pageEnd v-if="recommendList.length"></pageEnd>
  </div>
</template>
<script>
  import api from '@/api/index.js';
  export default {
    data() {
      return {
        showTitle: false,
        recommendList: [],
        playListSong: [],
        today: new Date(),
        headerPic: '',
        scrollT: 0
      }
    },
    components: {
      songItem: () => import('@/components/PlayListItem.vue'),
      pageEnd: () => import('@/components/PageEnd.vue')
    },
    computed: {
      month() {
        const Today = new Date();
        return Today.getMonth() + 1 > 10 ? Today.getMonth() + 1 : '0' + (Today.getMonth() + 1);
      },
      date() {
        const Today = new Date();
        return Today.getDate() + 1 > 10 ? Today.getDate() : '0' + Today.getDate();
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      handerScroll() {
        this.$nextTick(() => {
          const header = this.$refs.header;
          const title = this.$refs.songListTitle;
          const headerPic = this.$refs.headerPic;
          const content = this.$refs.songListContent;
          const sTop = document.body.scrollTop || document.documentElement.scrollTop;
          // 到顶部 固定定位
          if (sTop >= this.scrollT - header.offsetHeight) {
            title.className = 'song-title fix';
            title.style.top = header.offsetHeight + 'px';
            headerPic.className = 'header-pic fix';
            headerPic.style.top = -(this.scrollT - header.offsetHeight) + 'px';
            content.style.paddingTop = this.scrollT + title.offsetHeight + 'px';
          } else {
          // 不在顶部取消固定定位
            title.className = 'song-title'
            title.style.top = '';
            headerPic.className = 'header-pic';
            headerPic.style.top = '';
            content.style.paddingTop = '';
          }
          // 设置是否显示每日推荐这几个字
          if (sTop >= this.scrollT - header.offsetHeight - 100) {
            this.showTitle = true;
          } else {
            this.showTitle = false;
          }
          // 滚动图片改变亮度
          if (sTop >= 0 && sTop <= this.scrollT - header.offsetHeight) {
            // console.log(sTop / (this.scrollT - header.offsetHeight))
            headerPic.querySelector('img').style.filter = `brightness(${(1 - sTop / (this.scrollT - header.offsetHeight)) * 0.5 + 0.3}) blur(${parseFloat(sTop / (this.scrollT - header.offsetHeight).toFixed(2)) * 10}px)`
          }
        })
      },
      getIds(arr) {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
          result.push(arr[i].id);
        }
        return result.join(',');
      },
      playAll() {
        this.$loading.show();
        // console.log(this.recommendList)
        // 取得所有id, 再获取对应id的歌曲信息
        api.MusicDetail(this.getIds(this.recommendList))
          .then(res => {
            this.playListSong = res.songs;
            this.playListSong.length && this.$store.dispatch('setPlayShow', this.playListSong);
          })
      }
    },
    created() {
      this.$loading.show();
      api.RecommendMusic()
        .then(res => {
          this.$loading.hide();
          // 每日推荐
          this.recommendList = res.recommend;
          this.headerPic = res.recommend[0].album.picUrl + '?param=500y500';
          // console.log(this.headerPic)
        })
    },
    mounted() {
      this.$nextTick(() => {
        // console.log('this.$refs.songListTitle', this.$refs.songListTitle)
        this.scrollT = this.$refs.songListTitle.offsetTop
      })
      window.addEventListener('scroll', this.handerScroll, false);
    },
    beforeDestory() {
      window.removeEventListener('scroll', this.handerScroll, false)
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/DailyRecommend.scss';
</style>
