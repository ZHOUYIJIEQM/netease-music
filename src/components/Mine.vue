<template>
  <!-- 我的 -->
  <div class="mine-content">
    <div class="mine-title" :style="{backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)), url('+titleBg+')', backgroundSize: '100%'}">
      <div class="mine-title-login" v-if="!loginStatus">
        <div class="login-pic">
          <img :src="loginpic" alt="" />
        </div>
        <div class="login-descript">登录立享手机电脑多端同步</div>
        <div class="login-btn">
          <router-link to="/login">
            <span>立即登录</span>
          </router-link>
        </div>
      </div>
      <div class="mine-title-login" v-else-if="userInfo!==null">
        <div class="login-pic">
          <img :src="userInfo.profile.avatarUrl" alt="" />
        </div>
        <div class="login-descript">{{userInfo.profile.nickname}}</div>
      </div>
      <div class="login-icon">
        <div class="icon"  @click="undone" v-for="(item, index) in loginIcon" :key="index">
          <i class="iconfont" :class="item.icon"></i>
          <div class="icon-text">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="mine-music" ref="mineMusic">
      <div class="my-music-title">
        <div class="title-name">我的音乐</div>
        <div class="title-more">></div>
      </div>
      <div class="my-music">
        <div class="my-music-list">
          <div class="my-music-item" @click="undone">
            <div class="item-bgi" v-if="userPlayList[0]">
              <img v-if="userPlayList[0].picUrl" v-lazy="userPlayList[0].picUrl+'?param=600y600'" alt="" />
              <img v-else v-lazy="userPlayList[0].coverImgUrl+'?param=600y600'" alt="" />
            </div>
            <div class="z2">
              <i class="iconlike iconfont icon-aixin"></i>
              <div class="my-music-item-text">
                我喜欢的音乐
              </div>
              <div class="my-music-item-model">
                <i class="icon-ziyuan iconfont"></i>
                <span>心动模式</span>
              </div>
            </div>
          </div>
          <div class="my-music-item" @click="undone">
            <div class="item-bgi" v-if="userPlayList[1]">
              <img v-if="userPlayList[1].picUrl" v-lazy="userPlayList[1].picUrl+'?param=600y600'" alt="" />
              <img v-else v-lazy="userPlayList[1].coverImgUrl+'?param=600y600'" alt="" />
            </div>
            <div class="z2">
              <i class="iconfm iconfont icon-Radiodiantai"></i>
              <div class="my-music-item-text">
                私人FM
              </div>
              <div class="my-music-item-model">
                <i class="icon-ziyuan iconfont"></i>
                <span>来这里听好歌</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="recommendList">
        <div class="recommendList-title" v-if="!loginStatus">推荐歌单</div>
        <div class="recommendList-title" v-else>用户歌单</div>
        <div class="loading-postion" v-if="!userPlayList.length">
          <loading :show="true"></loading>
        </div>
        <div class="recommendList-List">
          <div class="recommendList-item" v-for="(item, index) in userPlayList" :key="index" @click="goPlayListDetail(item.id)">
            <div class="recommendList-pic">
              <img v-if="item.picUrl" v-lazy="item.picUrl+'?param=200y200'" alt="" />
              <img v-else v-lazy="item.coverImgUrl+'?param=200y200'" alt="" />
            </div>
            <div class="recommendList-text">
              <div class="recommendList-text-name">{{item.name}}</div>
              <div class="recommendList-text-count">{{item.trackCount}}首</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pageEnd></pageEnd>
  </div>
</template>
<script>
  import loginPic from '@/assets/image/person.png'
  import api from '@/api/index.js'
  export default {
    components: {
      pageEnd: () => import('@/components/PageEnd.vue'),
      loading: () => import('@/components/Loading/index.vue')
    },
    data() {
      return {
        loginpic: loginPic,
        loginIcon: [
          { name: '本地音乐', icon: 'icon-yinle' },
          { name: '下载管理', icon: 'icon-xiazai' },
          { name: '我的电台', icon: 'icon-diantai' },
          { name: '我的收藏', icon: 'icon-shoucang1' },
          { name: '关注新歌', icon: 'icon-guanzhu' }
        ],
        userPlayList: [],
        userProfile: null,
        titleBg: ''
      }
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo;
      },
      loginStatus() {
        return this.$store.getters.loginStatus;
      },
      backgroundUrl() {
        let result = '';
        if (this.userInfo !== null) {
          result = this.userInfo.profile.backgroundUrl;
        }
        return result;
      }
    },
    created() {
      this.titleBg = this.backgroundUrl;
      this.getRecommend();
    },
    watch: {
      loginStatus() {
        this.getRecommend()
        if (!this.loginStatus) {
          this.titleBg = ''
        }
        if (this.loginStatus) {
          this.titleBg = this.backgroundUrl;
        }
      }
    },
    methods: {
      getRecommend() {
        this.userPlayList = [];
        if (this.loginStatus) {
          api.UserPlayList({ uid: this.userInfo.account.id })
            .then(res => {
              // console.log('用户歌单 登录', res)
              this.userPlayList = res.playlist;
            })
        } else {
          // 推荐歌单
          api.RecommendListNo()
            .then(res => {
              // console.log('推荐歌单 不用登录', res)
              this.userPlayList = res.result;
            })
        }
      },
      goPlayListDetail(id) {
        // console.log('id', id)
        this.$router.push({ path: `/playList/${id}` })
      },
      undone() {
        this.$Toast({ message: '功能未开发!', time: 1000 })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';

  .mine-content {
    .mine-title {
      background-color: #2d2d2d;
      padding: .2rem 0;
      margin-bottom: -.2rem;
    }

    .mine-title-login {
      display: flex;
      align-items: center;
      padding: .2rem 0;
    }

    .login-pic {
      width: .5rem;
      height: .5rem;
      border-radius: 50%;
      overflow: hidden;
      background-color: #fff;
      margin-left: .2rem;

      img {
        width: 100%;
      }
    }

    .login-descript,
    .login-btn {
      font-size: $fsize-12;
      color: #fff;
    }

    .login-descript {
      // padding-left: .2rem;
      margin-left: .2rem;
    }

    .login-btn {
      // padding-left: .6rem;
      margin-left: auto;
      padding-right: .3rem;

      span {
        font-size: $fsize-10;
        border: 1px solid #777777;
        padding: 2px 5px;
        border-radius: 20px;
        color: white;
      }
    }

    .login-icon {
      display: flex;
      padding: .1rem 0 .2rem;

      .icon {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        color: white;

        .iconfont {
          font-size: .28rem;
        }

        .icon-text {
          font-size: .1rem;
          padding-top: .1rem;
        }
      }
    }

    .mine-music {
      border-radius: .2rem .2rem 0 0;
      background: white;
      padding: .17rem;

      .my-music-title {
        display: flex;
        justify-content: space-between;
        padding: 0 0 .1rem;

        .title-name,
        .title-more {
          font-weight: bold;
        }
      }

      .my-music-list {
        display: flex;
        // padding-left: .1rem;
      }

      .my-music-item {
        width: 1.12rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: rgba(21, 21, 21, 0.5);
        overflow: hidden;
        border-radius: 8px;
        position: relative;
        margin-right: .1rem;

        .item-bgi {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;

          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1.5);
            width: 100%;
          }
        }

        .z2 {
          z-index: 2;
          background: rgba(74, 74, 74, 0.5);
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          align-items: center;

          .iconlike {
            color: red;
            padding-top: .3rem;
            font-size: .28rem;
          }

          .iconfm {
            color: white;
            padding-top: .3rem;
            font-size: .28rem;
          }

          .my-music-item-text {
            color: white;
            font-size: $fsize-14;
            padding-top: .1rem;
          }

          .my-music-item-model {
            margin-top: .38rem;
            padding: 4px 6px;
            background: rgba(158, 158, 158, 0.6588235294117647);
            border-radius: 20px;
            display: flex;

            i {
              font-size: .1rem;
              color: white;
            }

            span {
              font-size: .1rem;
              color: white;
            }
          }
        }
      }
    }

    .recommendList {
      padding: .2rem 0;

      .loading-postion {
        position: relative;
        margin-top: .3rem;
        .loader {
          position: absolute;
        }
      }

      .recommendList-title {
        font-weight: bold;
        font-size: $fsize-16;
        padding-bottom: .15rem;
      }
    }

    .recommendList-List {
      display: flex;
      flex-flow: wrap;

      .recommendList-item {
        display: flex;
        width: 50%;
        padding-bottom: .1rem;

        .recommendList-pic {
          border-radius: 8px;
          overflow: hidden;
          width: 0.5rem;
          height: 0.5rem;
          flex-shrink: 0;

          img {
            width: 100%;
          }
        }

        &:nth-child(2n) {
          .recommendList-text-name {
            padding-right: 0 !important;
          }
        }

        .recommendList-text {
          display: flex;
          flex-direction: column;
          justify-content: center;

          .recommendList-text-name {
            padding: 0 .1rem;
            margin: 0 auto;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: .12rem;
            color: #191919;
            line-height: 1.2;
          }

          .recommendList-text-count {
            font-size: .1rem;
            color: #696969;
            padding: 0 .1rem;
          }
        }
      }
    }
  }
</style>
