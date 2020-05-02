<template>
  <!-- 搜索 -->
  <transition name="fadeInRight" mode="out-in">
    <div class="search-page" ref="searchPage">
      <div class="search-box-wrapper">
        <div class="rback">
          <i class="iconfont icon-fanhui" @click="goBack()"></i>
        </div>
        <div class="search-box">
          <input class="input-box" :placeholder="placeholder" v-model="query" type="text" />
          <i class="iconfont icon-chacha" v-show="query" @click="cleanQuery"></i>
        </div>
        <div class="search-icon">
          <i class="icon-sousuo iconfont"></i>
        </div>
      </div>
      <div class="search-hots" v-show="!query">
        <div class="search-hots-title">
          热搜榜
        </div>
        <div class="search-hots-list">
          <div class="hots-item" v-for="(item, index) in hotsList" :key="index" @click="clickHotList(item)">
            <div class="hots-item-numb" :class="{three: index < 3}">{{index+1}}</div>
            <div class="hots-item-detail">
              <div class="item-searchWord">
                <div class="item-name" :class="{bold: index < 3}">{{item.searchWord}}</div>
                <div class="hots-item-pic" :class="{up: item.iconType == 5}" v-if="item.iconUrl">
                  <img :src="item.iconUrl" />
                </div>
                <div class="hots-item-score">{{item.score}}</div>
              </div>
              <div class="item-content">{{item.content}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="search-result" v-if="searchResult.length">
        <div class="header">单曲</div>
        <div class="search-result-list">
          <div class="search-result-item" v-for="(item, index) in searchResult" :key="index" @click="playSong(item)">
            <div class="song-num">{{index+1}}</div>
            <div class="song-item">
              <div class="song-name">{{item.name}}</div>
              <div class="singer-name">{{(item.artists && item.artists[0].name)}} - {{(item.album && item.album.name)}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-end" v-show="hotsList.length || searchResult.length">
        <pageEnd></pageEnd>
      </div>
    </div>
  </transition>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        query: '',
        placeholder: '搜索歌曲、歌手',
        hotsList: [],
        resultOffset: 0,
        // 是否 正在加载
        isLoading: false,
        searchResult: []
      }
    },
    components: {
      pageEnd: () => import('@/components/PageEnd.vue')
    },
    created() {
      this.$loading.show();
      api.HotSearch()
        .then(res => {
          if (res.code === api.STATUS) {
            this.hotsList = res.data;
            this.$loading.hide();
          }
        })
    },
    mounted() {
      const _this = this;
      this.$refs.searchPage.addEventListener('scroll', function (event) {
        _this.scrllBottom()
      }, false)
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      cleanQuery() {
        this.query = '';
        this.searchResult = [];
      },
      clickHotList(hotsItem) {
        this.query = hotsItem.searchWord
      },
      scrllBottom() {
        const searchPage = this.$refs.searchPage;
        const pageY = searchPage.scrollTop;
        const pageHeight = searchPage.scrollHeight;
        const wInnerH = window.innerHeight;
        if (wInnerH + pageY + 100 > pageHeight && !this.isLoading && this.query) {
          this.resultOffset++;
          this.isLoading = true;
          this.$loading.show();
          api.SearchSong({ keywords: this.query, offset: this.resultOffset, limit: 30 })
            .then(res => {
              this.isLoading = false
              this.searchResult.push(...res.result.songs);
              this.$loading.hide();
            })
            .catch(err => {
              console.log('err', err)
              this.$loading.hide()
            })
        }
      },
      playSong(song) {
        // console.log('song ', song)
        this.$loading.show()
        api.MusicDetail(song.id)
          .then(res => {
            this.$store.commit('SETPLAYLIST', res.songs[0]);
            this.$store.commit('SETFULLSCREEN', true);
            this.$store.commit('SETPLAYING', true);
            this.$store.commit('SETSHOWPLAYER', true);
          })
      },
      getSong(keyWords, pageOffset = 0) {
        this.isLoading = true;
        this.searchResult = [];
        this.$loading.show();
        api.SearchSong({ keywords: keyWords, offset: pageOffset, limit: 30 })
          .then(res => {
            // if (res.code === api.STATUS) {
            this.searchResult = res.result.songs;
            this.isLoading = false;
            this.$loading.hide()
            // }
          })
          .catch(err => {
            console.log('err', err)
            this.$loading.hide()
          })
      }
    },
    watch: {
      query(newValue, oldVale) {
        if (newValue.trim()) {
          this.getSong(newValue)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';
  .search-page {
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    z-index: 100;
    .search-box-wrapper {
      display: flex;
      padding-bottom: .05rem;
      position: fixed;
      top: 0;
      left: 0;
      background: white;
      width: 100%;
      box-shadow: 0px 1px 1px #dedede;
      .rback,
      .search-icon {
        width: .45rem;
        height: .45rem;
        line-height: .45rem;
        flex: 0 0 .45rem;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
          font-size: .25rem;
          color: #313131;
        }
        .icon-sousuo {
          padding-top: .05rem;
          font-size: .3rem;
        }
      }

      .search-box {
        flex: 1 0 auto;
        border-bottom: 1px solid #9c9c9c;
        padding-left: .1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: .4rem;
        align-self: flex-end;

        input {
          width: 100%;
          outline: none;
          font-size: .18rem;
        }
        i.iconfont {
          font-size: .23rem;
          color: #333333;
        }

      }

    }

    .search-hots, .search-result {
      padding-top: .5rem;

      // padding: 0 .15rem;
      .search-hots-title {
        // line-height: .45rem;
        // height: .45rem;
        font-size: .18rem;
        font-weight: bold;
        padding: .2rem 0 0 .15rem;
      }

      .search-hots-list {
        .hots-item {
          display: flex;
          padding: .1rem .15rem;

          &:hover {
            background-color: #dadada;
          }

          .three {
            color: red;
            font-size: .18rem;
          }

          .bold {
            font-weight: bold;
          }

          .hots-item-numb {
            flex: 0 0 .2rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .hots-item-detail {
            display: flex;
            flex-direction: column;
            flex: 1 0 auto;
            padding-left: .15rem;

            .item-searchWord {
              height: .3rem;
              line-height: .3rem;
              display: flex;

              .item-name {
                font-size: .18rem;
              }

              .hots-item-pic {
                flex: 0 0 .32rem;
                overflow: hidden;
                margin-left: .1rem;

                img {
                  width: 100%;
                  vertical-align: text-bottom;
                }
              }

              .hots-item-pic.up {
                img {
                  width: 43%;
                }
              }

              .hots-item-score {
                margin-left: auto;
                color: #909090;
                font-size: .12rem;
              }
            }

            .item-content {
              color: #6b6b6b;
              font-size: .12rem;
            }

          }

        }
      }
    }

    .search-result {
      .header {
        font-size: .18rem;
        font-weight: bold;
        padding: .15rem 0 0 .13rem;
      }
      .search-result-list {
        padding: .13rem 0;
        .search-result-item {
          padding: .07rem .1rem;
          color: #3a3a3a;
          display: flex;
          align-items: center;
          &:hover {
            background-color: #f1f1f1;
          }
          .song-num {
            width: .35rem;
            text-align: center;
          }
          .song-item {
            padding-left: .05rem;
            flex: 1 0;
            &>div {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              width: 3rem;
              padding: .025rem;
            }
            .song-name {
              font-size: .16rem;
              color: #000;
            }
            .singer-name {
              font-size: .12rem;
            }
          }
        }
      }
    }
  }
</style>
