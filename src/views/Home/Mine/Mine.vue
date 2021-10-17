<template>
  <!-- 我的 -->
  <div class="mine-page">
    <!-- 头部导航 -->
    <Navbar 
      ref="navbar" 
      class="mine-navbar" 
      :style="{'background': navbarColor}"
      @clickLeft="toggleMenu"
    >
      <template #left>
        <i class="iconfont icon-weibiaoti12"></i>
      </template>
      <template #middle>
        <transition name="fadeDown">
          <div class="navbar-content" v-show="navbarMiddleShow" @click="goLogin">
            <template v-if="loginStatus">
              <img v-lazy="userInfo.avatarUrl" alt="">
              <span>{{userInfo.nickname}}</span>
            </template>
            <template v-else>
              <img src="../../../assets/mine/未登录.png" alt="">
              <span>立即登录</span>
            </template>
          </div>
        </transition>
      </template>
      <template #right>
        <i class="iconfont icon-sousuo"></i>
      </template>
    </Navbar>

    <!-- 主要内容 -->
    <div class="mine-content">
      <!-- 头像 立即登录/用户名 -->
      <div class="header" ref="header" @click="goLogin">
        <template v-if="loginStatus">
          <div class="userPic">
            <img v-lazy="userInfo.avatarUrl" alt="">
          </div>
          <div class="userName">
            <div class="name">{{userInfo.nickname}}</div>
            <!-- todo: 需要先提取等级 -->
            <!-- <div class="level">{{userInfo.}}</div> -->
          </div>
        </template>
        <template v-else>
          <div class="userPic">
            <img src="../../../assets/mine/未登录.png" alt="">
          </div>
          <div class="userName"><span>立即登录</span><i class="iconfont icon-jiantou"></i></div>
        </template>
      </div>

      <!-- icon 导航 -->
      <div class="iconlist-box">
        <div 
          class="iconbox" 
          v-for="(item, index) in iconlist" 
          :key="index"
          @click="clickIcon(item.title)"
        >
          <img :src="item.icon" alt="" class="icon">
          <p>{{item.title}}</p>
        </div>
      </div>

      <!-- 我喜欢的音乐 -->
      <!-- 登录 -->
      <div class="your-like-music" 
        v-if="loginStatus && createdList.length" 
        @click="goPlaylist(createdList[0].id)"
      >
        <div class="like-icon">
          <img v-lazy="createdList[0].coverImgUrl" alt="">
        </div>
        <div class="like-tip">
          <p>我喜欢的音乐</p>
          <span>{{createdList[0].trackCount}}首</span>
        </div>
        <div class="music-model">
          心动模式
        </div>
      </div>
      <!-- 未登录 -->
      <div class="your-like-music" v-else @click="$toast('需先登录!')">
        <div class="like-icon">
          <div class="iconfont icon-aixin"></div>
        </div>
        <div class="like-tip">
          <p>我喜欢的音乐</p>
          <span>0首</span>
        </div>
        <div class="music-model">
          心动模式
        </div>
      </div>

      <!-- 创建歌单, 收藏歌单 -->
      <div class="mine-song-list">
        <van-tabs 
          v-model="tabActive" 
          scrollspy 
          sticky 
          offset-top="0.5rem"
          :background="tabsColor"
          @scroll="tabsScroll"
        >
          <van-tab title="创建歌单">
            <div class="create-song-list">
              <div class="content">
                <p class="title">创建共享歌单, 和你的好友一同管理</p>
                <div class="main-content">
                  <div class="title">
                    <span class="title-text">创建歌单<template v-if="loginStatus && subCount">({{subCount.createdPlaylistCount}}个)</template></span>
                    <i class="iconfont icon-jiahao"></i>
                    <i class="iconfont icon-gengduoxiao"></i>
                  </div>
                  <div class="created">
                    <div 
                      v-if="loginStatus"
                      
                    >
                      <template v-if="createdList.length > 1">
                        <div class="list-box"
                          v-for="(item, index) in createdList.slice(1)"
                          :key="index"
                        >
                          <PlayListInfoMore :playlistInfo="item"></PlayListInfoMore>
                        </div>
                      </template>
                      <div v-else style="min-height: 1rem;">
                        <Loading></Loading>
                      </div>
                    </div>
                    <div class="import">
                      <div class="img-box">
                        <img src="../../../assets/mine/导入.png" alt="">
                      </div>
                      <p class="text">一键导入外部音乐</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="收藏歌单">
            <div class="favorite-sont-list">
              <div class="content">
                <div class="main-content">
                  <div class="title">
                    <span class="title-text">收藏歌单<template v-if="loginStatus && subCount">({{subCount.subPlaylistCount}}个)</template></span>
                    <i class="iconfont icon-gengduoxiao"></i>
                  </div>
                  <template v-if="loginStatus && subList.length">
                    <div class="favorite">
                      <div class="list-box"
                        v-for="(item, index) in subList"
                        :key="index"
                      >
                        <PlayListInfoMore :playlistInfo="item" :showCreator="true"></PlayListInfoMore>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="no-favorite">
                      暂无收藏歌单
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <!-- 为你推荐 -->
      <div class="recommend-for-you" v-show="showRecommend">
        <div class="title">
          <span>为你推荐</span>
          <i class="iconfont icon-cuowu" @click="showRecommend = !showRecommend"></i>
        </div>
        <div class="content">
          <template v-if="recommendList.length">
            <div class="content-item"
              v-for="(item, index) in recommendList"
              :key="index"
            >
              <PlayListBlock
                @clickPlayList="goPlaylist(item.id)"
                :playListData="item"
                :topShadow="{height: '.04rem', background: '#e4e4e4'}"
              ></PlayListBlock>
            </div>
          </template>
          <Loading v-else></Loading>
        </div>
        <div class="more">
          <span>更多推荐歌单 ></span>
        </div>
      </div>

    </div>
  </div>
</template>

<script src="./Mine.js"></script>
<style lang="scss" scoped src="./Mine.scss"></style>
<style lang="scss">
.mine-page {
  .mine-song-list {
    position: relative;
    .van-tabs__nav {
      padding: 0.1rem 0 .06rem!important;
    }
    .van-tabs--line .van-tabs__wrap {
      height: auto;
    }
    .van-tabs__nav--line {
      padding-bottom: 0;
    }
    .van-tab {
      z-index: 100;
      position: relative;
    }
    .van-tabs__wrap {
      .van-tabs__nav {
        .van-tab:nth-child(n+1):nth-last-child(n+3):after {
          content: "";
          position: absolute;
          display: block;
          background: #c5c5c5;
          width: .5px;
          height: 66%;
          right: 0;
        }
      }
    }
    .van-tabs__content {
      overflow: hidden;
    }
    .van-tabs__line {
      bottom: .05rem;
      width: 0.78rem;
      height: 0.05rem;
      background: linear-gradient( 90deg , #ff0000, #ff000059);
      border-radius: 0.06rem;
    }
    .van-tab.van-tab--active {
      font-size: .16rem;
      font-weight: bold;
    }
  }
  // .van-tab__pane {
  //   padding: .05rem .15rem .1rem;
  // }
}
</style>