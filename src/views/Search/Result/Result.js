import Tabbar from "@/components/Tabbar";
// 用于显示单曲
import ResultSong from "@/components/PlayListDetailItem";
// 用于显示歌单
import ResultPlaylist from "@/components/PlayListInfoMore";
import SearchVdo from "@/components/SearchResult/SearchVdo";
import SearchArtist from "@/components/SearchResult/SearchArtist";
import SearchAlbum from "@/components/SearchResult/SearchAlbum";
import SearchCloudCircle from "@/components/SearchResult/SearchCloudCircle";
import SearchUser from "@/components/SearchResult/SearchUser";

import { keyWordSearch } from "@/api/api";
import moment from "moment";

export default {
  name: "SearchResultInclude",
  data() {
    return {
      keyWord: "",
      navTabData: [],
      resultData: [
        {
          // 搜索类型
          type: "综合",
          // 对应搜索参数
          typeNum: 1018,
          // 是否已经得到数据
          hasData: false,
          // 是否得到了数据
          complete: false,
          // 对应的数据
          data: {},
        },
        { type: "单曲", typeNum: 1, hasData: false, data: [] },
        { type: "歌单", typeNum: 1000, hasData: false, data: [] },
        { type: "视频", typeNum: 1014, hasData: false, data: [] },
        { type: "歌手", typeNum: 100, hasData: false, data: [] },
        { type: "播客", typeNum: 0, hasData: false, data: [] },
        { type: "歌词", typeNum: 1006, hasData: false, data: [] },
        { type: "专辑", typeNum: 10, hasData: false, data: [] },
        { type: "声音", typeNum: 0, hasData: false, data: [] },
        { type: "云圈", typeNum: 0, hasData: false, data: [] },
        { type: "用户", typeNum: 1002, hasData: false, data: [] },
      ],
      swiperOptions: {
        resistanceRatio: 0,
      },
      swiperData: [],
      loading: false,
    };
  },
  components: {
    Tabbar,
    ResultPlaylist,
    ResultSong,
    SearchVdo,
    SearchArtist,
    SearchAlbum,
    SearchCloudCircle,
    SearchUser,
  },
  computed: {
    swiper() {
      return this.$refs.resultSwiper.$swiper;
    },
  },
  created() {
    this.navTabData = this.resultData.map((item) => item.type);
  },
  mounted() {
    this.$parent.$refs.navbar.$el.style.background = "#f5f5f5";
  },
  activated() {
    if (this.$parent.searchText !== this.keyWord) {
      this.keyWord = this.$parent.searchText
      console.log('加载数据:', this.keyWord);
      this.resultData.forEach((item, index) => {
        item.hasData = false
        if (index === 0) {
          this.$set(item, 'data', {})
          item.complete = false
        } else {
          this.$set(item, 'data', [])
        }
      });
      this.getData()
    }
  },
  methods: {
    tabChange(index) {
      this.$nextTick(() => {
        this.swiper.slideTo(index, 150);
      });
    },
    swiperChange() {
      let index = this.swiper.realIndex;
      this.$refs.tabbar.changeTab(index);
      if (index !== 0) {
        this.$parent.$refs.navbar.$el.style.background = "#fff";
        this.$refs.resultContent.style.background = "#fff";
      } else {
        this.$parent.$refs.navbar.$el.style.background = "#f5f5f5";
        this.$refs.resultContent.style.background = "#f5f5f5";
      }
      this.getData();
    },
    async getData() {
      try {
        let index = this.swiper.realIndex;
        let typeNum = this.resultData[index].typeNum;
        if (!this.resultData[index].hasData && typeNum !== 0) {
          this.$store.commit("changeLoading", true);
          let data = await keyWordSearch({
            keywords: this.keyWord,
            type: typeNum,
          });
          console.log("搜索结果", data);
          if (data.code === 200) {
            this.resultData[index].hasData = true;
            if (this.resultData[index].type === "综合") {
              this.extractData(this.resultData[index].type, data.result);
            }
          }
        }
      } catch (error) {
        console.log("catch", error);
        // 搜索用过10几次就断续出现405, 调试太不得劲
        if (error.status === 405) {
          this.$toast({
            message: "搜索操作频繁，请稍候再试!",
            className: "toastT",
            duration: 3000,
            position: "bottom",
          });
        }
      } finally {
        this.$store.commit("changeLoading", false);
      }
    },
    // 提取单曲
    extractSong(data) {
      return data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          artistHtml: item.ar.map((item1) => item1.name).join("/").replace(
            new RegExp(this.keyWord, "ig"),
            `<span class="keyBlue">${this.keyWord}</span>`
          ),
          officialTags: item.officialTags,
          al: item.al.name,
          mvId: item.mv,
          sq: item.privilege.maxbr >= 999000,
        };
      });
    },
    // 提取歌单 tag 是否获取标签
    extractPlayList(data, tag = false) {
      return data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          coverImgUrl: item.coverImgUrl,
          trackCount: item.trackCount,
          creator: item.creator.nickname,
          playCount: item.playCount,
          officialTags:
            tag && Boolean(item.officialTags.length) && item.officialTags,
          info: tag && `包含《<span class="keyBlue">${this.keyWord}</span>》`,
        };
      });
    },
    // 提取视频
    extractVideo(data) {
      return data.map((item) => {
        return {
          name: item.title.replace(
            new RegExp(this.keyWord, "ig"),
            `<span class="keyBlue">${this.keyWord}</span>`
          ),
          id: item.vid,
          coverUrl: item.coverUrl,
          duration: moment(item.durationms).format("mm:ss"),
          creator: item.creator[0].userName,
          playTime: item.playTime,
        };
      });
    },
    // 提取艺人
    extractArtists(data) {
      return data.map((item) => {
        return {
          id: item.id,
          name: item.name.replace(
            new RegExp(this.keyWord, "ig"),
            `<span class="keyBlue">${this.keyWord}</span>`
          ),
          picUrl: item.picUrl,
          trans: item.trans,
          // 综合这里少了个粉丝
        };
      });
    },
    // 提取专辑
    extractAlbum(data) {
      return data.map((item) => {
        return {
          name: item.name.replace(
            new RegExp(this.keyWord, "ig"),
            `<span class="keyBlue">${this.keyWord}</span>`
          ),
          sec: item.alias.length && item.alias[0],
          artist: item.artist.name.replace(
            new RegExp(this.keyWord, "ig"),
            `<span class="keyBlue">${this.keyWord}</span>`
          ),
          id: item.id,
          picUrl: item.picUrl,
          publishTime: moment(item.publishTime).format("YYYY.M.D"),
        };
      });
    },
    // 提取用户
    extractUser(data) {
      console.log(data);
      return data.map((item) => {
        return {
          name: item.nickname.replace(
            new RegExp(this.keyWord, "ig"),
            `<span class="keyBlue">${this.keyWord}</span>`
          ),
          id: item.userId,
          avatarUrl: item.avatarUrl,
          description: item.description,
          gender: item.gender
        };
      });
    },
    // 提取云圈
    extractCircle(data) {
      return data.map((item) => {
        return {
          name: item.baseInfo.circle.name.replace(
            new RegExp(this.keyWord, "ig"),
            `<span class="keyBlue">${this.keyWord}</span>`
          ),
          id: item.baseInfo.circle.id,
          image: item.baseInfo.circle.image,
          count: `${item.baseInfo.circle.count.member}人已加入, ${item.baseInfo.circle.count.read}阅读`,
        };
      });
    },
    // 提取需要的数据
    async extractData(type, data) {
      let index = this.resultData.findIndex((item) => item.type === type);
      if (type === "综合") {
        // this.resultData[index].data.order = data.order
        this.$set(this.resultData[index].data, "order", data.order);

        // 视频
        if (data.order.includes("new_mlog")) {
          // 综合搜索可能没有视频资源, 干脆直接搜索视频
          let vdoData = await keyWordSearch({
            keywords: this.keyWord,
            type: 1014,
          });
          // console.log(vdoData);
          if (vdoData.code === 200) {
            let vdoIndex = this.resultData.findIndex(
              (item) => item.type === "视频"
            );
            this.resultData[vdoIndex].data = this.extractVideo(
              vdoData.result.videos
            );
            let vdo = this.resultData[vdoIndex].data.slice(0, 5);
            // this.resultData[index].data.videoList = this.resultData[this.resultData.findIndex(item => item.type === '视频')].data.slice(0, 5)
            // this.resultData[index].data.videoText = data.new_mlog.moreText
            this.$set(this.resultData[index].data, "videoList", vdo);
            this.$set(
              this.resultData[index].data,
              "videoText",
              data.new_mlog.moreText
            );
          }
        }
        // 单曲
        if (data.order.includes("song")) {
          // 单曲
          let songs = this.extractSong(data.song.songs);
          // console.log(songs, data.song.moreText);
          // this.resultData[index].data.songList = songs
          // this.resultData[index].data.songText = data.song.moreText
          this.$set(this.resultData[index].data, "songList", songs);
          this.$set(
            this.resultData[index].data,
            "songText",
            data.song.moreText
          );
        }
        // 歌单
        if (data.order.includes("playList")) {
          // 歌单
          let playlist = this.extractPlayList(data.playList.playLists, true);
          // console.log(playlist, data.playList.moreText);
          // this.resultData[index].data.playList = playlist
          // this.resultData[index].data.playListText = data.playList.moreText
          this.$set(this.resultData[index].data, "playList", playlist);
          this.$set(
            this.resultData[index].data,
            "playListText",
            data.playList.moreText
          );
        }
        // 艺人
        if (data.order.includes("artist")) {
          let artists = this.extractArtists(data.artist.artists);
          // this.resultData[index].data.artistList = data.artist.artists
          // this.resultData[index].data.artistText = data.artist.moreText
          this.$set(this.resultData[index].data, "artistList", artists);
          this.$set(
            this.resultData[index].data,
            "artistText",
            data.artist.moreText
          );
        }
        // 专辑
        if (data.order.includes("album")) {
          let album = this.extractAlbum(data.album.albums);
          // this.resultData[index].data.albumList = album
          // this.resultData[index].data.albumText = data.album.moreText
          this.$set(this.resultData[index].data, "albumList", album);
          this.$set(
            this.resultData[index].data,
            "albumText",
            data.album.moreText
          );
        }
        // 用户
        if (data.order.includes("user")) {
          let users = this.extractUser(data.user.users);
          // this.resultData[index].data.userList = users
          // this.resultData[index].data.userText = data.user.moreText
          this.$set(this.resultData[index].data, "userList", users);
          this.$set(
            this.resultData[index].data,
            "userText",
            data.user.moreText
          );
        }
        // 云圈
        if (data.order.includes("circle")) {
          let circle = this.extractCircle(data.circle.resources);
          this.$set(this.resultData[index].data, "circle", circle);
        }

        // this.resultData[index].data.complete = true
        this.$set(this.resultData[index], "complete", true);

        console.log("综合:", this.resultData[index].data);
      }

      if (type === "单曲") {
        console.log(index, data);
      }

      if (type === "歌单") {
        console.log(index, data);
      }

      if (type === "歌手") {
        console.log(index, data);
      }

      if (type === "播客") {
        console.log(index, data);
      }

      if (type === "歌词") {
        console.log(index, data);
      }

      if (type === "专辑") {
        console.log(index, data);
      }

      if (type === "声音") {
        console.log(index, data);
      }

      if (type === "云圈") {
        console.log(index, data);
      }

      if (type === "用户") {
        console.log(index, data);
      }
    },
    goPlaylist() {
      this.$router.push({
        name: "PlayListDetail",
        params: { id: "2038254681" },
      });
    },
  },
  // beforeRouteLeave(to, from, next) {
  //   // 处理直接按返回键
  //   if (to.name !== "SearchDefault" && to.name !== "SearchSuggest") {
  //     this.$parent.searchText = "";
  //     next({
  //       name: "SearchDefault",
  //     });
  //   } else {
  //     next();
  //   }
  // },
  watch: {
    // // '$route.query.keyWord': {
    // "$parent.searchText": {
    //   handler: function(newV, oldV) {
    //     this.$nextTick(() => {
    //       console.log(
    //         "query",
    //         `新:${newV}`,
    //         `旧:${oldV}`,
    //         `搜索词:'${this.keyWord}'`
    //       );
    //       if (newV && this.keyWord !== newV) {
    //         this.keyWord = newV;
    //         console.log("加载数据");
    //       }
    //     });
    //     // if (newV !== oldV) {
    //     //   if (newV && newV.length) {
    //     //     this.keyWord = newV;
    //     //     this.$nextTick(() => {
    //     //       this.$parent.$refs.navbar.$el.style.background = "#f5f5f5";
    //     //       this.resultData.forEach((item, index) => {
    //     //         item.hasData = false
    //     //         if (index === 0) {
    //     //           this.$set(item, 'data', {})
    //     //           item.complete = false
    //     //         } else {
    //     //           this.$set(item, 'data', [])
    //     //         }
    //     //       });
    //     //       this.getData();
    //     //     });
    //     //   }
    //     // }
    //   },
    //   immediate: true,
    // },
  },
};
