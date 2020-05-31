<template>
  <!-- 歌单详情 -->
  <div class="playlist-content" ref="pl-cntent">
    <div class="content" ref="content" v-if="playListDate.coverImgUrl">
      <div class="playlist-header">
        <div class="header-bgi">
          <img class="bgimage" :class="{black: !playListDate.backgroundCoverUrl}" v-lazy="(playListDate.backgroundCoverUrl || playListDate.coverImgUrl) " alt="">
          <!-- <div class="mask"></div> -->
        </div>
        <div class="header-title">
          <div class="title-bgi" ref='headerTitle'>
            <img :src="playListDate.backgroundCoverUrl || playListDate.coverImgUrl" alt="">
          </div>
          <i class="iconfont icon-fanhui" @click="goBack"></i>
          <span class="title-text">{{playListTitle}}</span>
        </div>
        <div class="header-descript" @click="toggleDes">
          <div class="des-name">{{playListDate.name}}</div>
          <div class="des-creator">
            <img :src="playListDate.creator.avatarUrl" alt="">
            <span>{{playListDate.creator.nickname}}</span>
          </div>
          <div class="des-descript" v-html="playListDate.description.replace(/\n/g, '<br/>')"></div>
        </div>
        <div class="header-icon">
          <div class="box" @click="$Toast({message:'功能未开发!', time: 500})">
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
          <div class="box">
            <i class="comment iconfont icon-show_duoxuan"></i>
            <span class="comment-count">多选</span>
          </div>
        </div>
      </div>
      <div class="playlist-song" ref="playlistSong">
        <div class="list-title">
          <div class="play-all" @click="playAll">
            <i class="iconfont icon-bofang"></i>
            <span class="text">播放全部</span>
            <span class="count">(共{{playListDate.trackCount}}首)</span>
          </div>
          <div class="collect">
            + 收藏 ({{playListDate.subscribedCount|formatNum}})
          </div>
        </div>
        <div class="list-song" @scroll="handerPlScroll">
          <div class="list-song-item" v-for="(item, index) in playListSong" :key="index" @click="playSong(item)">
            <div class="item-num">{{index+1}}</div>
            <div class="item-detail">
              <div class="song-name">{{item.name}}</div>
              <div class="song-singer">
                {{item.ar[0].name}}
                <template v-if="item.ar.length>1">/{{item.ar[1].name}}</template>-{{item.al.name}}
              </div>
            </div>
            <div class="song-more" @click.stop="">
              <i class="iconfont icon-ziyuan1"></i>
            </div>
          </div>
          <pageEnd v-if="playListSong.length"></pageEnd>
        </div>
      </div>
    </div>
    <!-- 弹出详细信息 -->
    <transition name="show-descript" mode="out-in">
      <div class="playlist-descript" v-show="showDes" @touchstart.stop="tStart" @touchend.stop="tEnd">
        <div class="des-bg">
          <img v-lazy="playListDate.coverImgUrl" alt="">
        </div>
        <div class="des-main">
          <div class="descript-header">
            <i class="des-close iconfont icon-chacha" @click="toggleDes"></i>
            <img v-lazy="playListDate.coverImgUrl" alt="" class="descript-img">
            <div class="descript-title">{{playListDate.name}}</div>
          </div>
          <div class="descript-content">
            <div class="des-tag">
              <span class="tag-title">标签:</span>
              <span class="tags" v-for="(item, index) in playListDate.tags" :key="index">{{item}}</span>
            </div>
            <div class="des-text" v-html="playListDate.description && playListDate.description.replace(/\n/g, '<br/>')"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        playListDate: {},
        listId: 0,
        showDes: false,
        playListTitle: '歌单',
        playListSong: [],
        start: null,
        end: null
      }
    },
    computed: {
      playListId() {
        return this.$route.params.playlist_id
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
        const number = parseInt(num)
        if (number > 100000000) {
          return (number / 100000000).toFixed(2) + '亿'
        } else if (number > 100000) {
          return (number / 10000).toFixed(1) + '万'
        } else {
          return number;
        }
      }
    },
    mounted() {
      window.addEventListener('touchstart', this.handerTouchStart, false);
      window.addEventListener('touchmove', this.handerTouchMove, false);
      window.addEventListener('touchend', this.handerTouchEnd, false)
      // 触摸判断滑动方向, 滚动添加css属性
      window.addEventListener('scroll', this.handerScroll, false);
    },
    components: {
      pageEnd: () => import('@/components/PageEnd.vue')
    },
    activated() {
      this.listId = parseInt(this.playListId);
    },
    methods: {
      playAll() {
        if (this.playListSong.length) {
          this.$store.dispatch('setPlayShow', this.playListSong)
        }
      },
      handerTouchEnd(event) {
        var endY = event.changedTouches[0].clientY;
        var playlist = this.$refs.playlistSong;
        var title = this.$refs.headerTitle;
        if (playlist.getBoundingClientRect().top < playlist.offsetTop && playlist.getBoundingClientRect().top > title.offsetHeight) {
          if (endY < this.start) {
            window.scrollTo({
              top: playlist.offsetTop - title.offsetHeight,
              behavior: 'smooth'
            })
          }
        }
      },
      handerTouchMove(event) {
        this.end = event.changedTouches[0].clientY;
        // console.log('move')
        var playlist = this.$refs.playlistSong;
        var title = this.$refs.headerTitle;
        // console.log('===', Math.abs(this.start - this.end))
        if (this.end - this.start < 0 && playlist.getBoundingClientRect().top === title.offsetHeight && playlist.querySelector('.list-song').style.overflowY === '') {
          playlist.querySelector('.list-song').style.overflowY = 'scroll'
          // setTimeout(() => {
          playlist.querySelector('.list-song').scrollTo({
            top: Math.abs(this.start - this.end) * 5,
            behavior: 'smooth'
          })
          // }, 0)
        }
      },
      handerTouchStart(event) {
        this.start = event.changedTouches[0].clientY
      },
      handerScroll() {
        this.$nextTick(() => {
          var playlist = this.$refs.playlistSong;
          var title = this.$refs.headerTitle;
          // var content = this.$refs.content;
          var sTop = document.body.scrollTop || document.documentElement.scrollTop;
          var winH = document.body.clientHeight || document.documentElement.clientHeight
          //
          if (sTop <= playlist.offsetTop - title.offsetHeight) {
            title.style.opacity = ((sTop) / (playlist.offsetTop - title.offsetHeight)).toFixed(2)
            this.playListTitle = this.playListDate.name;
            playlist.querySelector('.list-song').style.overflowY = ''
          }

          if (playlist.getBoundingClientRect().top <= title.offsetHeight + 80) {
            playlist.style.overflow = 'hidden';
            playlist.style.height = winH - title.offsetHeight + 'px';
            playlist.querySelector('.list-song').style.height = winH - title.offsetHeight - playlist.querySelector('.list-title').offsetHeight + 'px';
            playlist.querySelector('.list-song').style.overflowY = 'scroll'
          } else {
            playlist.querySelector('.list-song').style.overflowY = ''
          }
        })
      },
      handerPlScroll() {
        var playlist = this.$refs.playlistSong;
        // 滚动列表时, 检测到上滑并且列表到顶, 去除scroll
        if (this.end - this.start > 0 && playlist.querySelector('.list-song').scrollTop === 0) {
          // playlist.querySelector('.list-song').style.overflowY = ''
        }
      },
      handerPlTM(event) {},
      tStart(event) {
        this.$refs['pl-cntent'].style.overflowY = 'hidden'
        event.stopPropagation();
      },
      tEnd(event) {
        this.$refs['pl-cntent'].style.overflowY = ''
        event.stopPropagation();
      },
      toggleDes() {
        this.showDes = !this.showDes;
      },
      goBack() {
        this.$router.back()
      },
      getIds(trackIds) {
        const ids = [];
        if (Array.isArray(trackIds)) {
          for (var i = 0, len = trackIds.length; i < len; i++) {
            ids.push(trackIds[i].id)
          }
          return ids.join(',')
        }
      },
      getPlayList() {
        this.playListDate = [];
        this.playListSong = [];
        this.$loading.show();
        api.PlayListDetail(this.$route.params.playlist_id)
          .then(res => {
            if (res.code === api.STATUS) {
              this.playListDate = res.playlist
              api.MusicDetail(this.getIds(res.playlist.trackIds))
                .then(res => {
                  // 只留100首
                  this.playListSong = res.songs.slice(0, 100);
                  // console.log(this.playListSong)
                  this.$loading.hide()
                })
            }
          })
          .catch(err => {
            console.log('err', err)
            this.$loading.hide()
            alert('网络错误!')
          })
      },
      playSong(song) {
        this.$store.dispatch('setPlayShow', song)
      }
    },
    watch: {
      listId(newV, oldV) {
        this.getPlayList();
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/PlayList.scss';
</style>
