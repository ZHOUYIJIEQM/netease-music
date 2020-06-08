<template>
  <!-- 歌单详情 -->
  <div class="playlist-content" ref="pl-cntent">
    <div class="content" ref="content" v-if="playListDate.coverImgUrl">
      <div class="header-title">
        <div class="title-bgi" ref="headerTitle">
          <img
            :class="{black: !playListDate.backgroundCoverUrl}"
            v-lazy="playListDate.backgroundCoverUrl || playListDate.coverImgUrl"
            alt
          />
        </div>
        <i class="iconfont icon-fanhui" @click="goBack"></i>
        <span class="title-text">{{playListTitle}}</span>
      </div>
      <div class="playlist-header">
        <div class="header-bgi">
          <img
            class="bgimage"
            :class="{black: !playListDate.backgroundCoverUrl}"
            v-lazy="(playListDate.backgroundCoverUrl || playListDate.coverImgUrl) "
            alt
          />
          <!-- <div class="mask"></div> -->
        </div>
        <div class="header-descript" @click="toggleDes">
          <div class="des-name">{{playListDate.name}}</div>
          <div class="des-creator">
            <img v-lazy="playListDate.creator.avatarUrl" alt />
            <span>{{playListDate.creator.nickname}}</span>
          </div>
          <div
            class="des-descript"
            v-html="playListDate.description && playListDate.description.replace(/\n/g, '<br/>')"
          ></div>
        </div>
        <div class="header-icon">
          <div class="box" @click="goComment">
            <i class="comment iconfont icon-pinglun"></i>
            <span class="comment-count">{{playListDate.commentCount|formatNum}}</span>
          </div>
          <div class="box" @click="$Toast({message:'功能未开发!', time: 500})">
            <i class="share iconfont icon-fenxiang"></i>
            <span class="share-count">{{playListDate.shareCount|formatNum}}</span>
          </div>
          <div class="box" @click="$Toast({message:'功能未开发!', time: 500})">
            <i class="comment iconfont icon-xiazai1"></i>
            <span class="comment-count">下载</span>
          </div>
          <div class="box" @click="$Toast({message:'功能未开发!', time: 500})">
            <i class="comment iconfont icon-show_duoxuan"></i>
            <span class="comment-count">多选</span>
          </div>
        </div>
      </div>
      <div class="playlist-song" ref="playlistSong">
        <div class="list-title border" ref="listTitle">
          <div class="plt-img">
            <img
              :class="{black: !playListDate.backgroundCoverUrl}"
              v-lazy="playListDate.backgroundCoverUrl || playListDate.coverImgUrl"
              alt
            />
          </div>
          <div class="list-title-box">
            <div class="play-all" @click="playAll">
              <i class="iconfont icon-bofang"></i>
              <span class="text">播放全部</span>
              <span class="count">(共{{playListDate.trackCount}}首)</span>
            </div>
            <div
              class="collect"
              @click="collectPl"
            >{{cltext}} ({{playListDate.subscribedCount|formatNum}})</div>
          </div>
        </div>
        <div class="list-song">
          <div
            class="list-song-item"
            v-for="(item, index) in playListSong"
            :key="index"
            @click="playSong(item)"
          >
            <div class="item-num">{{index+1}}</div>
            <div class="item-detail">
              <div class="song-name">{{item.name}}</div>
              <div class="song-singer">
                {{item.ar[0].name}}
                <template v-if="item.ar.length>1">/ {{item.ar[1].name}}</template>
                - {{item.al.name}}
              </div>
            </div>
            <div class="song-more" @click.stop>
              <i class="iconfont icon-ziyuan1"></i>
            </div>
          </div>
          <pageEnd v-if="playListSong.length"></pageEnd>
        </div>
      </div>
    </div>
    <!-- 弹出详细信息 -->
    <transition name="show-descript" mode="out-in">
      <div
        class="playlist-descript"
        v-show="showDes"
        @touchstart.stop="tStart"
        @touchend.stop="tEnd"
      >
        <div class="des-bg">
          <img v-lazy="playListDate.coverImgUrl" alt />
        </div>
        <div class="des-main">
          <div class="descript-header">
            <i class="des-close iconfont icon-chacha" @click="toggleDes"></i>
            <img v-lazy="playListDate.coverImgUrl" alt class="descript-img" />
            <div class="descript-title">{{playListDate.name}}</div>
          </div>
          <div class="descript-content">
            <div class="des-tag">
              <span class="tag-title">标签:</span>
              <span class="tags" v-for="(item, index) in playListDate.tags" :key="index">{{item}}</span>
            </div>
            <div
              class="des-text"
              v-html="playListDate.description && playListDate.description.replace(/\n/g, '<br/>')"
            ></div>
          </div>
        </div>
      </div>
    </transition>
    <toTop></toTop>
  </div>
</template>
<script>
import api from '@/api/index.js';
export default {
  data() {
    return {
      playListDate: {},
      listId: 0,
      showDes: false,
      playListTitle: '歌单',
      playListSong: [],
      cltext: '收藏',
      start: null,
      end: null
    };
  },
  computed: {
    playListId() {
      return this.$route.params.playlist_id;
    },
    navig() {
      const name = window.navigator.appVersion;
      let result = false;
      if (/mobile/i.test(name) && /chrome/i.test(name)) {
        result = true;
      }
      return result;
    }
  },
  filters: {
    formatNum(num) {
      const number = parseInt(num);
      if (number > 100000000) {
        return (number / 100000000).toFixed(2) + '亿';
      } else if (number > 100000) {
        return (number / 10000).toFixed(1) + '万';
      } else {
        return number;
      }
    }
  },
  mounted() {
    // 改为滚动到指定位置 添加定位fix属性, 制作类似sticky效果 https://zzp-ui.zezeping.com/sticky
    window.addEventListener('scroll', this.handerScroll, true);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handerScroll);
  },
  components: {
    toTop: () => import('@/components/GoTop.vue'),
    pageEnd: () => import('@/components/PageEnd.vue')
  },
  activated() {
    // console.log('activated')
    this.listId = parseInt(this.playListId);
    if (
      (document.body.scrollTop || document.documentElement.scrollTop <= 0) &&
      this.$refs.listTitle &&
      this.$refs.playlistSong
    ) {
      this.$refs.listTitle.className = 'list-title border';
      this.$refs.playlistSong.querySelector('.list-song').className =
        'list-song';
      this.playListTitle = '歌单';
      this.$refs.headerTitle.style.opacity = '0'
    }
  },
  methods: {
    goComment() {
      this.$router.push({
        name: 'PlayListComment',
        params: { playlist_id: this.listId }
      });
    },
    playAll() {
      if (this.playListSong.length) {
        this.$store.dispatch('setPlayShow', this.playListSong);
      }
    },
    collectPl() {
      this.$loading.show();
      let type = 1;
      api.PlayListDetail(this.$route.params.playlist_id).then(res => {
        console.log('收藏状态', this.playListDate.subscribed);
        if (res.playlist.subscribed) {
          type = 2;
        }
        api.collectPlayList(type, this.playListDate.id).then(res => {
          if (res.code === 200) {
            this.$loading.hide();
            this.cltext = type === 2 ? '收藏' : '已收藏';
          }
        });
      });
    },
    handerScroll() {
      var sTop = document.body.scrollTop || document.documentElement.scrollTop;
      var playlist = this.$refs.playlistSong;
      var plTitle = this.$refs.listTitle;
      var plSong = this.$refs.playlistSong.querySelector('.list-song');
      var title = this.$refs.headerTitle;
      if (sTop >= playlist.offsetTop - title.offsetHeight) {
        plTitle.className = 'list-title sticky';
        plSong.className = 'list-song list-song-top';
        this.playListTitle = this.playListDate.name;
      } else {
        plTitle.className = 'list-title border';
        plSong.className = 'list-song';
        this.playListTitle = '歌单';
      }
      if (sTop >= 0 && sTop <= playlist.offsetTop) {
        title.style.opacity = (
          sTop /
          (playlist.offsetTop - title.offsetHeight)
        ).toFixed(2);
      } else {
        title.style.opacity = 1;
      }
    },
    // window.scrollTo 回调
    scrollToCallback(toTop, callback) {
      window.scrollTo({
        top: toTop,
        behavior: 'smooth'
      });
      window.onscroll = e => {
        const winTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (winTop >= toTop - 60) {
          callback && callback();
        }
      };
    },
    tStart(event) {
      this.$refs['pl-cntent'].style.position = 'fixed';
      event.stopPropagation();
    },
    tEnd(event) {
      this.$refs['pl-cntent'].style.position = '';
      event.stopPropagation();
    },
    toggleDes() {
      this.showDes = !this.showDes;
    },
    goBack() {
      this.$router.go(-1);
    },
    getIds(trackIds) {
      const ids = [];
      if (Array.isArray(trackIds)) {
        for (var i = 0, len = trackIds.length; i < len; i++) {
          ids.push(trackIds[i].id);
        }
        return ids.join(',');
      }
    },
    getPlayList() {
      this.playListDate = [];
      this.playListSong = [];
      this.$loading.show();
      api
        .PlayListDetail(this.$route.params.playlist_id)
        .then(res => {
          if (res.code === api.STATUS) {
            this.playListDate = res.playlist;
            this.cltext = res.playlist.subscribed ? '已收藏' : '收藏';
            api.MusicDetail(this.getIds(res.playlist.trackIds)).then(res => {
              // 只留100首
              this.playListSong = res.songs.slice(0, 100);
              this.$loading.hide();
            });
          }
        })
        .catch(err => {
          console.log('err', err);
          this.$loading.hide();
          alert('网络错误!');
        });
    },
    playSong(song) {
      this.$store.dispatch('setPlayShow', song);
    }
  },
  watch: {
    listId(newV, oldV) {
      this.getPlayList();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/PlayList.scss";
</style>
