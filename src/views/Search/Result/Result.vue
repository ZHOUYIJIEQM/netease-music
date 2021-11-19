<template>
  <!-- 
    搜索结果页
    头部导航, 切换时 emit 一个事件, 用来切换轮播
    结果轮播, 轮播切换, 如果轮播项还没数据才发起请求加载, 同时通过 ref 改变 tabbar 的 激活项
   -->
  <div class="result-content" ref="resultContent">
    <div class="tab">
      <Tabbar :tabObj="navTabData" ref="tabbar" @changeTab="tabChange"></Tabbar>
    </div>
    <div class="result-box">
      <swiper
        :options="swiperOptions"
        ref="resultSwiper"
        class="result-swiper"
        v-if="resultData.length"
        @slideChange="swiperChange"
      >
        <swiper-slide
          class="result-item"
          ref="resultItem"
          v-for="(item, index) in resultData"
          :key="index"
        >
          <!-- 综合 -->
          <div class="composite-box" v-if="item.type === '综合' && item.complete">
            <div 
              class="composite-item" 
              v-for="(item1, index1) in item.data.order"
              :key="index1"
            >
              <!-- 单曲 -->
              <div class="composite-item-inner songs" v-if="item1 === 'song'">
                <div class="title">
                  单曲
                </div>
                <div 
                  class="song-item list-item"
                  v-for="(item2, index2) in item.data.songList"
                  :key="index2"
                >
                  <ResultSong class="result-song" :listInfo="item2"></ResultSong>
                </div>
                <div class="more-text">{{item.data.songText}}</div>
              </div>

              <!-- 歌单 -->
              <div class="composite-item-inner" v-if="item1 === 'playList'">
                <div class="title">
                  歌单
                </div>
                <div 
                  class="playlist-item list-item"
                  v-for="(item2, index2) in item.data.playList"
                  :key="index2"
                >
                  <ResultPlaylist class="result-playlist" :playlistInfo="item2"></ResultPlaylist>
                </div>
                <div class="more-text">{{item.data.playListText}}</div>
              </div>

              <!-- 视频 -->
              <div class="composite-item-inner" v-if="item1 === 'new_mlog'">
                <div class="title">
                  视频
                </div>
                <div 
                  class="vdo-item list-item"
                  v-for="(item2, index2) in item.data.videoList"
                  :key="index2"
                >
                  <SearchVdo :searchVdoData="item2"></SearchVdo>
                </div>
                <div class="more-text">{{item.data.videoText}}</div>
              </div>

              <!-- 艺人 -->
              <div class="composite-item-inner" v-if="item1 === 'artist'">
                <div class="title">
                  艺人
                </div>
                <div 
                  class="artist-item list-item"
                  v-for="(item2, index2) in item.data.artistList"
                  :key="index2"
                >
                  <SearchArtist :artistData="item2"></SearchArtist>
                </div>
                <div class="more-text">{{item.data.artistText}}</div>
              </div>

              <!-- 专辑 -->
              <div class="composite-item-inner" v-if="item1 === 'album'">
                <div class="title">
                  专辑
                </div>
                <div 
                  class="album-item list-item"
                  v-for="(item2, index2) in item.data.albumList"
                  :key="index2"
                >
                  <SearchAlbum :albumData="item2"></SearchAlbum>
                </div>
                <div class="more-text">{{item.data.albumText}}</div>
              </div>

              <!-- 用户 -->
              <div class="composite-item-inner" v-if="item1 === 'user'">
                <div class="title">
                  用户
                </div>
                <div 
                  class="user-item list-item"
                  v-for="(item2, index2) in item.data.userList"
                  :key="index2"
                >
                  <SearchUser :userData="item2"></SearchUser>
                </div>
                <div class="more-text">{{item.data.userText}}</div>
              </div>

              <!-- 云圈 -->
              <div class="composite-item-inner" v-if="item1 === 'circle'">
                <div class="title">
                  云圈
                </div>
                <div 
                  class="circle-item list-item"
                  v-for="(item2, index2) in item.data.circle"
                  :key="index2"
                >
                  <SearchCloudCircle :cloudCircleData="item2"></SearchCloudCircle>
                </div>
              </div>

            </div>
          </div>

          <!-- 单曲 -->
          <div class="single-box" v-if="item.type === '单曲'">
            单曲
            <div v-for="(item, index) in 100" :key="index">{{item}}</div>
          </div>

          <!-- 歌单 -->
          <div class="playlist-box" v-if="item === '歌单'">
            歌单
            <div v-for="(item, index) in 100" :key="index">{{item}}</div>
          </div>

          <!-- 视频 -->
          <div class="video-box" v-if="item === '视频'">
            视频
            <div v-for="(item, index) in 100" :key="index">{{item}}</div>
          </div>

          <!-- 歌手 -->
          <div class="singer-box" v-if="item === '歌手'">
            歌手
            <div v-for="(item, index) in 100" :key="index">{{item}}</div>
          </div>

          <!-- 播客 -->
          <div class="podcast-box" v-if="item === '播客'">
            播客
            <div v-for="(item, index) in 100" :key="index">{{item}}</div>
          </div>

          <!-- 歌词 -->
          <div class="lyrics-box" v-if="item === '歌词'">
            歌词
            <div v-for="(item, index) in 100" :key="index">{{item}}</div>
          </div>

          <!-- 专辑 -->
          <div class="album-box" v-if="item === '专辑'">
            专辑
            <div v-for="(item, index) in 100" :key="index">{{item}}</div>
          </div>

          <!-- 声音 -->
          <div class="voice-box" v-if="item === '声音'">
            声音
            <div v-for="(item, index) in 100" :key="index">{{item}}</div>
          </div>

          <!-- 云圈 -->
          <div class="cloud-circle-box" v-if="item === '云圈'">
            云圈
            <div v-for="(item, index) in 100" :key="index">{{item}}</div>
          </div>

          <!-- 用户 -->
          <div class="user-box" v-if="item === '用户'">
            用户
            <div v-for="(item, index) in 100" :key="index">{{item}}</div>
          </div>

        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script src="./Result.js"></script>
<style lang="scss" scoped src="./Result.scss"></style>
<style lang="scss">
.result-content {
  $activeC: #dfdfdf;
  .tabbar-comp {
    .tabbar-item {
      font-size: .14rem;
      color: #636363;
      &.active {
        color: #313131;
      }
    }
  }

  .result-box {
    .result-song {
      padding: .07rem 0;
      &:active {
        background-color: $activeC;
      }
      padding-left: .15rem;
      .icon-gengduoxiao {
        padding: 0;
        font-size: .17rem;
        color: #999;
      }
    }
    .result-playlist {
      padding: .02rem .15rem .02rem;
      .img-box {
        margin-top: .02rem;
        align-self: flex-start;
      }
      .name {
        padding-top: .08rem;
      }
      .icon-gengduoxiao {
        color: #999;
      }
    }
  }
}
</style>