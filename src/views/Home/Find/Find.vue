<template>
  <!-- 发现 -->
  <div class="find-page">
    <!-- 顶部 菜单 搜索 话筒 -->
    <Navbar 
      class="find-navbar"
      @clickLeft="toggleMenu"
      @clickMiddle="goSearch"
      @clickRight="yuyin"
    >
      <template #left>
        <i class="iconfont icon-weibiaoti12"></i>
      </template>
      <template #middle>
        <div class="searchbox">
          <i class="icon-sousuo iconfont"></i>
          <div class="text-eli search-word">{{searchText}}</div>
        </div>
      </template>
      <template #right>
        <i class="iconfont icon-weibiaoti--"></i>
      </template>
    </Navbar>

    <!-- 内容部分 -->
    <div class="find-content" :class="{'loading': !homeFindData.length}">
      <div class="top-content">
        <!-- 轮播 -->
        <swiper
          class="banner-box"
          ref="banner"
          :options="swiperOptions"
          v-if="banner.length"
        >
          <swiper-slide
            class="swiper-slide"
            v-for="(item, index) in banner"
            :key="index"
          >
            <div class="banner-item">
              <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
              <img class="banner-pic swiper-lazy" :data-src="item.pic" />
              <p
                :style="'background-color:' + (color[item.titleColor] || item.titleColor)"
                class="banner-text"
              >
                {{ item.typeTitle }}
              </p>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 轮播数据未加载前用灰色块显示 -->
        <div class="banner-gj" v-else></div>
        <!-- 一系列图标 -->
        <div class="icon-list-box">
          <div
            class="icon"
            v-for="(item, index) in iconList"
            :key="index"
            @click="clickIcon(item.title)"
          >
            <img :src="item.icon" alt="" />
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>

      <!-- 发现页里的块 根据 item 里的 type 来渲染块 -->
      <div class="find-data-box"
        v-for="(item, index) in homeFindData"
        :key="index"
      >

        <div class="find-data-item bottom-border" v-if="item.type === '推荐歌单'">
          <div class="item-title">
            <div class="title">{{item.title}}</div>
            <div class="text" v-if="item.text">
              <span>{{item.text}}</span>
              <span class="iconfont icon-jiantouyou"></span>
            </div>
          </div>
          <div class="item-content">
            <!-- 歌单 -->
            <swiper
              class="threeColumn"
              :options="threeColumnOptions"
              v-if="item.list.length"
            >
            <!-- todo: 测试template可否去掉 -->
              <template v-if="item.scrollPlaylist.length">
                <swiper-slide class="list-item-box">
                  <div class="list-item-inner scroll-list">
                    <swiper
                      ref="scrollList"
                      class="scroll-play-list"
                      :options="scrollPlayList"
                      v-if="item.scrollPlaylist.length"
                      @slideChange="scrollListChange"
                      @progress="progressHandler"
                      @setTransition="setTrans"
                      @click.native="goPlaylist(item.scrollPlaylist[scrollList.realIndex].id)"
                    >
                      <swiper-slide
                        class="scroll-play-list-item"
                        v-for="(item1, index1) in item.scrollPlaylist"
                        :key="index1"
                      >
                      <!-- @click.native="goPlaylist(item1.id)" -->
                      <!-- 这样 loop 模式, 有一个点击无效, 获取 swiper 的 realIndex, 在 <swiper> 处 绑定点击事件, 用 realIndex 操作 -->
                        <div class="img-box">
                          <img v-lazy="item1.img+'?param=200y200'" alt="">
                        </div>
                      </swiper-slide>
                    </swiper>

                    <i class="scroll-icon iconfont icon-huaban"></i>
                    <div
                      class="list-name-box"
                      v-for="(item1, index1) in item.scrollPlaylist"
                      :key="index1"
                      @click="goPlaylist(item1.id)"
                    >
                      <transition name="fadeIn">
                        <div class="list-name two-eli"  v-if="index1 === scrollPlayListIndex">{{item1.name}}</div>
                      </transition>
                    </div>
                  </div>
                </swiper-slide>
              </template>
              <swiper-slide
                class="list-item-box"
                v-for="(item1, index1) in item.list"
                :key="index1"
              >
                <div class="list-item-inner">
                  <PlayListBlock 
                    @clickPlayList="goPlaylist(item1.id)"
                    :playListData="item1"
                  ></PlayListBlock>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div class="find-data-item" v-if="item.type === '推荐歌曲'">
          <div class="item-title">
            <div class="title">{{item.title}}</div>
            <div class="text" v-if="item.text">
              <span class="iconfont icon-bofang2"></span>
              <span>{{item.text}}</span>
            </div>
          </div>
          <div class="item-content">
            <swiper 
              :options="songOptions"
              class="oneMoreColumn"
              v-if="item.list.length"
            >
              <swiper-slide
                class="oneMoreColumn-item"
                v-for="(item1, index1) in item.list"
                :key="index1"
              >
                <div class="oneMoreColumn-item-inner">
                  <div class="rcmd-song-item"
                    v-for="(item2, index2) in item1"
                    :key="index2"
                  >
                    <FindSongItem :songInfo="item2"></FindSongItem>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div class="find-data-item" v-if="item.type === '精选音乐视频'">
          <div class="item-title">
            <div class="title">{{item.title}}</div>
            <div class="text" v-if="item.text" @click="refreshMlog">
              <span class="iconfont icon-icon_refresh"></span>
              <!-- <span>{{item.text}}</span> -->
              <span>换一批</span>
            </div>
          </div>
          <div class="item-content">
            <!-- 音乐视频 -->
            <swiper
              class="threeColumn"
              :options="threeColumnOptions"
              v-if="item.list.length"
            >
              <swiper-slide
                class="list-item-box"
                v-for="(item1, index1) in item.list"
                :key="index1"
              >
                <div class="list-item-inner">
                  <MvLog :mvLogData="item1"></MvLog>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div class="find-data-item" v-if="item.type === '雷达歌单'">
          <div class="item-title">
            <div class="title">{{item.title}}</div>
            <div class="text" v-if="item.text">
              <span>{{item.text}}</span>
              <span class="iconfont icon-jiantouyou"></span>
            </div>
          </div>
          <div class="item-content">
            <swiper
              class="threeColumn"
              :options="threeColumnOptions"
              v-if="item.list.length"
            >
              <swiper-slide
                class="list-item-box"
                v-for="(item1, index1) in item.list"
                :key="index1"
              >
                <div class="list-item-inner">
                  <PlayListBlock 
                    @clickPlayList="goPlaylist(item1.id)"
                    :playListData="item1"
                  ></PlayListBlock>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div class="find-data-item" v-if="item.type === '热门播客'">
          <div class="item-title">
            <div class="title">{{item.title}}</div>
            <div class="text" v-if="item.text">
              <span>{{item.text}}</span>
              <span class="iconfont icon-jiantouyou"></span>
            </div>
          </div>
          <div class="item-content">
            <swiper 
              :options="songOptions"
              class="oneMoreColumn"
              v-if="item.list.length"
            >
              <swiper-slide
                class="oneMoreColumn-item"
                v-for="(item1, index1) in item.list"
                :key="index1"
              >
                <div class="oneMoreColumn-item-inner">
                  <div class="rcmd-song-item hotPodcast-item"
                    v-for="(item2, index2) in item1"
                    :key="index2"
                    @click="$toast(`id: ${item2.id}, 播客未开发!`)"
                  >
                    <div class="img-box">
                      <img v-lazy="item2.img" alt="">
                      <i class="playicon iconfont icon-bofang2"></i>
                    </div>
                    <div class="right-box">
                      <div class="name text-eli">{{item2.name}}</div>
                      <div class="des">
                        <span v-if="item2.labelText" class="tag">{{item2.labelText}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div class="find-data-item" v-if="item.type === '专属场景歌单'">
          <div class="item-title">
            <div class="title">{{item.title}}</div>
            <div class="text" v-if="item.text">
              <span>{{item.text}}</span>
              <span class="iconfont icon-jiantouyou"></span>
            </div>
          </div>
          <div class="item-content">
            <swiper
              class="threeColumn"
              :options="threeColumnOptions"
              v-if="item.list.length"
            >
              <swiper-slide
                class="list-item-box"
                v-for="(item1, index1) in item.list"
                :key="index1"
              >
                <div class="list-item-inner">
                  <PlayListBlock
                    @clickPlayList="goPlaylist(item1.id)"
                    :playListData="item1"
                  ></PlayListBlock>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div class="find-data-item" v-if="item.type === '新歌新碟数字专辑'">
          <div class="item-title">
            <div class="title">
              <span class="title-item"
                v-for="(item1, index1) in item.title"
                :key="index1"
                :class="{'item-active': index1 === newListActive}"
                @click="newListActive = index1"
              >
                {{item1}}
              </span>
            </div>
            <div class="text" v-if="item.text">
              <span>{{item.text}}</span>
              <span class="iconfont icon-jiantouyou"></span>
            </div>
          </div>
          <div class="item-content newlist-content">
            <div class="newlist content-item" v-show="newListActive === 0">
              <swiper 
                :options="songOptions"
                class="oneMoreColumn"
                v-if="item.newSong.length"
              >
                <swiper-slide
                  class="oneMoreColumn-item"
                  v-for="(item1, index1) in item.newSong"
                  :key="index1"
                >
                  <div class="oneMoreColumn-item-inner">
                    <div class="rcmd-song-item"
                      v-for="(item2, index2) in item1"
                      :key="index2"
                    >
                      <FindSongItem :songInfo="item2"></FindSongItem>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <div class="newlist content-item" v-show="newListActive === 1">
              <swiper 
                :options="songOptions"
                class="oneMoreColumn"
                v-if="item.newAlbum.length"
              >
                <swiper-slide
                  class="oneMoreColumn-item"
                  v-for="(item1, index1) in item.newAlbum"
                  :key="index1"
                >
                  <div class="oneMoreColumn-item-inner">
                    <div class="rcmd-song-item"
                      v-for="(item2, index2) in item1"
                      :key="index2"
                    >
                      <FindSongItem :songInfo="item2" :imgShadow="true"></FindSongItem>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <div class="newlist content-item" v-show="newListActive === 2">
              <swiper 
                :options="songOptions"
                class="oneMoreColumn"
                v-if="item.digitalAlbum.length"
              >
                <swiper-slide
                  class="oneMoreColumn-item"
                  v-for="(item1, index1) in item.digitalAlbum"
                  :key="index1"
                >
                  <div class="oneMoreColumn-item-inner">
                    <div class="rcmd-song-item"
                      v-for="(item2, index2) in item1"
                      :key="index2"
                    >
                      <FindSongItem :songInfo="item2" :imgShadow="true"></FindSongItem>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>

        <div class="find-data-item" v-if="item.type === '音乐日历'">
          <div class="item-title">
            <div class="title">{{item.title}}</div>
            <div class="text" v-if="item.text">
              <span>{{item.text}}</span>
              <span class="iconfont icon-jiantouyou"></span>
            </div>
          </div>
          <div class="item-content calendar">
            <div class="get-luck">
              <div class="left">领取你的今日好运</div>
              <div class="right">查看运势解读<i class="iconfont icon-jiantou"></i></div>
            </div>
            <div class="calendar-item"
              v-for="(item1, index1) in item.list"
              :key="index1"
              @click="$toast('音乐日历 未开发!')"
            >
              <div class="info">
                <div class="date">
                  <span class="time">{{item1.time}}</span>
                  <span :class="[item1.labelText === '云村热点' ? 'hot-label' : 'normal-label']">{{item1.labelText}}</span>
                </div>
                <div class="event text-eli">{{item1.event}}</div>
              </div>
              <div class="img-box">
                <img v-lazy="item1.img+'?param=200y200'" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="find-data-item" v-if="item.type === '云村ktv'">
          <div class="item-title">
            <div class="title">{{item.title}}</div>
            <div class="text" v-if="item.text">
              <span>{{item.text}}</span>
              <span class="iconfont icon-jiantouyou"></span>
            </div>
          </div>
          <div class="item-content yunktv">
            <swiper
              class="threeColumn"
              :options="threeColumnOptions"
              v-if="item.list.length"
            >
              <swiper-slide
                class="list-item-box"
                v-for="(item1, index1) in item.list"
                :key="index1"
              >
                <div class="list-item-inner">
                  <FindKTV :ktvData="item1"></FindKTV>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div class="find-data-item" v-if="item.type === '广播电台'">
          <div class="item-title">
            <div class="title">
              <span class="title-item"
                v-for="(item1, index1) in item.title"
                :key="index1"
                :class="{'item-active': index1 === broadCastActive}"
                @click="broadCastActive = index1"
              >
                {{item1}}
              </span>
            </div>
          </div>
          <div class="item-content">
            <div class="content-item" v-show="broadCastActive === 0">
              <swiper
                class="threeColumn"
                :options="threeColumnOptions"
                v-if="item.broadcast.length"
              >
                <swiper-slide
                  class="list-item-box"
                  v-for="(item1, index1) in item.broadcast"
                  :key="index1"
                >
                  <div 
                    class="list-item-inner broad-cast"
                    @click="$toast(`广播电台 未开发!`)"
                  >
                    <BroadCastItem :broadCastInfo="item1"></BroadCastItem>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <div class="content-item" v-show="broadCastActive === 1">
              <swiper
                class="threeColumn"
                :options="threeColumnOptions"
                v-if="item.podcast24.length"
              >
                <swiper-slide
                  class="list-item-box"
                  v-for="(item1, index1) in item.podcast24"
                  :key="index1"
                >
                  <div 
                    class="list-item-inner broad-cast"
                    @click="$toast(`广播电台 未开发!`)"
                  >
                    <BroadCastItem :broadCastInfo="item1"></BroadCastItem>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>

        <div class="find-data-item" v-if="item.type === '视频合辑'">
          <div class="item-title">
            <div class="title">{{item.title}}</div>
            <div class="text" v-if="item.text">
              <span>{{item.text}}</span>
              <span class="iconfont icon-jiantouyou"></span>
            </div>
          </div>
          <div class="item-content">
            <swiper
              class="threeColumn"
              :options="threeColumnOptions"
              v-if="item.list.length"
            >
              <swiper-slide
                class="list-item-box"
                v-for="(item1, index1) in item.list"
                :key="index1"
              >
                <div class="list-item-inner">
                  <PlayListBlock
                    @clickPlayList="goPlaylist(item1.id)"
                    :playListData="item1"
                  ></PlayListBlock>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>

      </div>
      
      <!-- 加载提示 -->
      <div class="loading-box" v-if="loading">
        <Loading></Loading>
      </div>

      <!-- 底部分隔线 -->
      <van-divider class="divider" v-if="dividerShow && homeFindData.length">到底了!</van-divider>
    </div>
  </div>
</template>

<script src="./Find.js"></script>
<style lang="scss" scoped src="./Find.scss"></style>
<style lang="scss">
$bulletColor: rgba(255, 255, 255, 0.5);
$bulletActiveColor: #fff;
.bullet {
  width: 0.08rem;
  height: 0.03rem;
  margin-right: 0.04rem;
  border-radius: 0.05rem;
  display: inline-block;
  background-color: $bulletColor;
  &-active {
    background-color: $bulletActiveColor;
  }
}
.swiper-lazy-preloader {
  width: 0.2rem;
  height: 0.2rem;
  margin-left: -0.1rem;
  margin-top: -0.1rem;
  border-width: 0.03rem;
}
.van-swipe-item {
  background-color: burlywood;
  border: 1px solid #fff;
  height: 100px;
}
.oneMoreColumn-item-inner .rcmd-song-item:nth-child(3n+3) {
  .right-box {
    border-bottom: none!important;;
  }
}
</style>