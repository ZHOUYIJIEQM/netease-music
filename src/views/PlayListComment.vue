<!-- 歌单评论 -->
<template>
  <div class="plcomment-content">
    <template v-if="show">
      <div class="comment-title" ref="header">
        <i class="iconfont icon-fanhui" @click="goBack()"></i>
        <span class="title">评论({{comments ? comments.total : 0}})</span>
      </div>
      <div class="songlist" ref="songlist">
        <div class="pic">
          <img v-lazy="songList.coverImgUrl" alt />
        </div>
        <div class="des">
          <div class="title">{{songList.name}}</div>
          <div class="creator">
            by
            <span>{{songList.creator.nickname}}</span>
          </div>
        </div>
      </div>
      <div class="nav" ref="nav">
        <span class="area active">评论区</span>
        <span>推荐</span>
        <span>最热</span>
        <span class="active">最新</span>
      </div>
      <div class="commentArea" ref="area">
        <div class="list">
          <div class="list-item" v-for="(item, index) in commentList" :key="index">
            <div class="pic">
              <img v-lazy="item.user.avatarUrl" alt />
            </div>
            <div class="comment">
              <div class="name">{{item.user.nickname}}</div>
              <div class="date">{{item.time|formatTime}}</div>
              <div class="content noactive" @click="toggleContent">{{item.content}}</div>
            </div>
            <div class="liked">
              <div class="inner">
                <span>{{item.likedCount===0 ? '' : item.likedCount}}</span>
                <i class="icon-dianzan1 iconfont"></i>
              </div>
            </div>
          </div>
          <pageEnd v-if="end"></pageEnd>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import api from '@/api/index.js';
export default {
  name: 'PlayListComment',
  data() {
    return {
      show: false,
      comments: null,
      commentList: [],
      songList: null,
      offset: 0,
      limit: 15,
      before: 0,
      isLoading: false,
      timer: null,
      end: false,
      scrollT: 0
    };
  },
  components: {
    pageEnd: () => import('@/components/PageEnd.vue')
  },
  filters: {
    formatTime(time) {
      const Time = new Date(time);
      const Month =
        Time.getMonth() + 1 > 10 ? Time.getMonth() : '0' + Time.getMonth();
      const date = Time.getDate() > 10 ? Time.getDate() : '0' + Time.getDate();
      return `${Month}月${date}日`;
    }
  },
  created() {
    Promise.all([
      this.getComments(this.$route.params.playlist_id, this.offset),
      this.getList(this.$route.params.playlist_id)
    ]).then(res => {
      this.$loading.hide();
      this.comments = res[0];
      this.commentList.push(...res[0].comments);
      this.before = res[0].comments[res[0].comments.length - 1].time;
      // console.log(res[0].comments)
      // console.log(this.before)
      this.songList = res[1].playlist;
      this.show = true;
      this.$nextTick(() => {
        // console.log(this.$refs.nav.offsetTop);
        this.scrollT = this.$refs.nav.offsetTop;
        this.headerHeight = this.$refs.header.offsetHeight;
        this.end = this.comments.total <= this.limit;
      });
    });
  },
  mounted() {
    window.addEventListener('scroll', this.handlerScroll, false);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handlerScroll, false);
  },
  methods: {
    handlerScroll() {
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      const nav = this.$refs.nav;
      const area = this.$refs.area;
      // fix 加了 2px 的上边框
      if (scrollTop > this.scrollT - this.headerHeight - 2) {
        nav.className = 'nav fix';
        area.className = 'commentArea top';
      } else {
        nav.className = 'nav';
        area.className = 'commentArea';
      }
      // console.log('area.offsetHeight', area.offsetHeight)
      this.timer && clearTimeout(this.timer);
      if (scrollTop + window.innerHeight > area.offsetHeight - 60 && !this.isLoading) {
        this.timer = setTimeout(() => {
          this.offset++;
          this.isLoading = true;
          if (this.offset * this.limit < this.comments.total) {
            this.$loading.show();
            api.PlayListComment(this.$route.params.playlist_id, this.offset, this.before).then(
              res => {
                // console.log(this.comments.total - this.offset * this.limit)
                if (this.comments.total - this.offset * this.limit < this.limit) {
                  this.commentList.push(...res.comments.slice(0, this.comments.total - this.offset * this.limit));
                  this.end = true;
                } else {
                  this.commentList.push(...res.comments);
                }
                this.before = res.comments[res.comments.length - 1].time;
                this.$loading.hide();
                this.isLoading = false;
              }
            );
          } else {
            this.end = true;
          }
        }, 200);
      }
    },
    toggleContent(e) {
      var target = e.target;
      target.className.indexOf('noactive') === -1
        ? (target.className = 'content noactive')
        : (target.className = 'content');
    },
    getComments(id, offset) {
      this.$loading.show();
      return api.PlayListComment(id, offset);
    },
    getList(id) {
      return api.PlayListDetail(id);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/styles/PlayListComment.scss";
</style>
