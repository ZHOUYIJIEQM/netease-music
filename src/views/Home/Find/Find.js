import { scrollPosition } from "@/mixin/scrollPosition.js";
import { arrTurnTwo } from '@/utils/globalMethods.js'
import { homePageFind, defaultSearch, getOfficialList } from '@/api/api'
import moment from "moment";
import { global } from "@/mixin/global.js";

export default {
  name: 'FindInclude',
  mixins: [scrollPosition, global],
  components: {
    Navbar: () => import('@/components/Navbar'),
    Loading: () => import('@/components/Loading'),
    PlayListBlock: () => import('@/components/PlayListBlock'),
    FindSongItem: () => import('@/components/FindSongItem'),
    BroadCastItem: () => import('@/components/BroadCastItem'),
    MvLog: () => import('@/components/MvLog'),
    FindKTV: () => import('@/components/FindKTV'),
  },
  data() {
    return {
      // 轮播下方的图标
      iconList: [
        { icon: require("@/assets/find/每日推荐.png"), title: "每日推荐" },
        { icon: require("@/assets/find/歌单.png"), title: "歌单" },
        { icon: require("@/assets/find/排行榜.png"), title: "排行榜" },
        { icon: require("@/assets/find/私人FM.png"), title: "私人FM" },
        { icon: require("@/assets/find/助眠解压.png"), title: "助眠解压" },
        { icon: require("@/assets/find/数字专辑.png"), title: "数字专辑" },
        { icon: require("@/assets/find/歌房.png"), title: "歌房" },
        { icon: require("@/assets/find/专注冥想.png"), title: "专注冥想" },
        { icon: require("@/assets/find/游戏专区.png"), title: "游戏专区" },
      ],
      // 热搜关键词
      searchText: '搜索',
      // 轮播数据
      banner: [],
      // 轮播右下角背景色
      color: {
        red: "#f53f3c",
        blue: "#3b90d0",
      },
      // 轮播配置
      swiperOptions: {
        // 滑轮切换
        mousewheel: true,
        pagination: {
          // 分页器
          el: ".swiper-pagination",
          // 点击可以切换
          clickable: true,
          // 分页器元素类名
          bulletClass: "bullet",
          // 分页器活动块类名
          bulletActiveClass: "bullet-active",
        },
        // 初始索引
        initialSlide: 0,
        // 循环
        loop: true,
        // 自动轮播
        autoplay: {
          // 间隔时间
          delay: 10000,
          // 滑动操作离开后重新自动播放
          disableOnInteraction: false,
        },
        // 图片懒加载
        lazy: {
          loadPrevNext: true,
        },
        // observer: true, // 启动动态检查器(OB/观众/观看者)
        // observeParents: true // 修改swiper的父元素时，自动初始化swiper
      },
      // 发现页数据
      homeFindData: [],
      // 歌单配置(3列多一点)
      threeColumnOptions: {
        // mousewheel: true,
        // 这样就可以在css自定义每一项的宽度大小
        slidesPerView: 'auto',
        resistanceRatio: 0.3,
        // spaceBetween: '2.6%',
        // spaceBetween: 10,
      },
      // 推荐歌单的第一项 轮播配置
      scrollPlayList: {
        // nested: true,
        // mousewheel: true,
        speed: 600,
        // // 循环
        loop: true,
        direction : 'vertical',
        // 这个必须开启, 而 progress 默认开启
        watchSlidesProgress : true,
        // 只有类名 swipe-handler 的元素才可以拖动
        swipeHandler : '.swipe-handler',
        // noSwiping: true,
        // 无效 可改为加 class swiper-no-swiping
        // spaceBetween: 5,
        // 初始索引
        initialSlide: 0,
        // 自动轮播
        autoplay: {
          // 间隔时间
          delay: 2000,
          // 滑动操作离开后重新自动播放
          disableOnInteraction: false,
        },
      },
      // 对应下标
      scrollPlayListIndex: 0,
      // 歌曲配置(1列多一点)
      songOptions: {
        // mousewheel: true,
        slidesPerView: 'auto',
        resistanceRatio: 0.3,
      },
      // 是否显示加载提示
      loading: true,
      // 新歌新碟数字专辑 活动项
      newListActive: 0,
      // 广播电台活动标记
      broadCastActive: 0,
      // 登录后的请求参数
      cursor: null,
    }
  },
  computed: {
    scrollList() {
      return this.$refs.scrollList[0].$swiper
    }
  },
  activated() {
    if (this.loginStatus) {
      window.addEventListener('scroll', this.getLoginData)
    }
  },
  deactivated() {
    if (this.loginStatus) {
      window.removeEventListener('scroll', this.getLoginData)
    }
  },
  methods: {
    // 初始化需要的数据
    async initData() {
      try {
        this.loading = true
        let defaultText = await defaultSearch()
        this.searchText = defaultText.data.showKeyword
        this.getData()
      } catch (error) {
        console.log(error);
      }
    },
    // 不登录, 获取发现页数据, 并提取需要的数据
    async getData() {
      try {
        let find = await homePageFind()
        // if (this.loginStatus) {
          this.cursor = find.data.cursor
        //   console.log(this.cursor);
        // }
        // 里面的数据看起来有些乱, 手动提取需要的数据
        let dataBlocks = find.data.blocks
        // console.log(dataBlocks);
        this.extractData(dataBlocks)
        // console.log('发现页需要的数据', JSON.stringify(this.homeFindData, null, '  '));
        this.loading = false
      } catch(error) {
        console.log(error);
      }
    },
    // 登录后, 获取发现页数据
    async getLoginData() {
      // console.log('触发滚动');
      let bodyH = document.body.scrollHeight || document.documentElement.scrollHeight;
      let scrollT = this.getScrollTop()
      let clientH = this.getClientHeight()
      if (bodyH - 200 < scrollT + clientH && !this.loading) {
        // console.log('触底加载');
        if (!this.cursor) {
          window.removeEventListener('scroll', this.getLoginData)
          return
        }
        this.loading = true
        let find = await homePageFind({cursor: this.cursor})
        // 里面的数据看起来有些乱, 手动提取需要的数据
        // console.log(find);
        this.cursor = find.data.cursor
        let dataBlocks = find.data.blocks
        this.extractData(dataBlocks)
        this.loading = false
      }
    },
    // 语音搜索
    yuyin() {
      console.log('right');
    },
    // 点击轮播下的图标
    clickIcon(type) {
      if(type === "每日推荐") {
        this.$toast(`${type} 未开发!`)
      }
      if(type === "歌单") {
        this.$toast(`${type} 未开发!`)
      }
      if(type === "排行榜") {
        this.$toast(`${type} 未开发!`)
      }
      if(type === "私人FM") {
        this.$toast(`${type} 未开发!`)
      }
      if(type === "助眠解压") {
        this.$toast(`${type} 未开发!`)
      }
      if(type === "数字专辑") {
        this.$toast(`${type} 未开发!`)
      }
      if(type === "歌房") {
        this.$toast(`${type} 未开发!`)
      }
      if(type === "专注冥想") {
        this.$toast(`${type} 未开发!`)
      }
      if(type === "游戏专区") {
        this.$toast(`${type} 未开发!`)
      }
    },
    // 推荐歌单第一项
    scrollListChange() {
      this.scrollPlayListIndex = this.scrollList.realIndex
    },
    // 当Swiper的progress被改变时执行
    progressHandler(progress) {
      // console.log(progress);
      let slides = this.scrollList.slides
      for (let i = 0; i < slides.length; i++) {
        // 需要先设置 watchSlidesProgress: true
        let slideProgress = slides[i].progress;
        let scale = 1 - Math.abs(slideProgress) / 3;
        scale = scale < 1 ? 0.75 : 1
        slides.eq(i).transform('scale(' + scale + ')');
      }
    },
    // 开始过渡动画时触发
    setTrans(transition) {
      let slides = this.scrollList.slides
      for (let i = 0; i < slides.length; i++) {
				let slide = slides.eq(i)
        // 设置切换时的动画时间
				slide.transition(transition);
				// slide.transition(1000);
			}
    },
    // 提取需要的数据
    extractData(dataBlocks) {
      dataBlocks.forEach(dataItem => {
        // 轮播
        if (dataItem.blockCode === 'HOMEPAGE_BANNER') {
          this.banner = dataItem.extInfo.banners
        }

        // 推荐歌单
        if (dataItem.blockCode === 'HOMEPAGE_BLOCK_PLAYLIST_RCMD') {
          let rcmdPlayList = {}
          rcmdPlayList.type = '推荐歌单'
          rcmdPlayList.title = dataItem.uiElement.subTitle.title
          rcmdPlayList.text = dataItem.uiElement.button.text
          rcmdPlayList.scrollPlaylist = []
          rcmdPlayList.list = []
          dataItem.creatives.forEach(async item => {
            if (item.creativeType === "scroll_playlist") {
              item.resources.forEach(item2 => {
                // 提取歌单需要的数据
                rcmdPlayList.scrollPlaylist.push({
                  id: item2.resourceId,
                  name: item2.uiElement.mainTitle.title,
                  img: item2.uiElement.image.imageUrl,
                  playCount: item2.resourceExtInfo.playCount
                })
              })
            } else {
              try {
                let scrolllist = await getOfficialList(6)
                scrolllist.result.forEach(item2 => {
                  rcmdPlayList.scrollPlaylist.push({
                    id: item2.id,
                    name: item2.name,
                    img: item2.picUrl,
                    playCount: item2.playCount,
                  })
                })
              } catch (error) {
                console.log(error);
              }
            }
            if (item.creativeType === "list") {
              item.resources.forEach(item2 => {
                rcmdPlayList.list.push({
                  id: item2.resourceId,
                  name: item2.uiElement.mainTitle.title,
                  img: item2.uiElement.image.imageUrl,
                  playCount: item2.resourceExtInfo.playCount
                })
              })
            }
          });
          this.homeFindData.push(rcmdPlayList)
        }
        
        // 个性化推荐歌曲
        if (dataItem.blockCode === 'HOMEPAGE_BLOCK_STYLE_RCMD') {
          let rcmdSong = {}
          rcmdSong.type = '推荐歌曲'
          rcmdSong.title = dataItem.uiElement.subTitle.title
          rcmdSong.text = dataItem.uiElement.button.text
          rcmdSong.list = []
          dataItem.creatives.forEach(item => {
            let list = []
            item.resources.forEach(item2 => {
              list.push({
                id: item2.resourceId,
                name: item2.uiElement.mainTitle && item2.uiElement.mainTitle.title,
                info: item2.uiElement.subTitle && item2.uiElement.subTitle.title,
                img: item2.uiElement.image.imageUrl,
                artists: item2.resourceExtInfo.artists.map(artistsName => artistsName.name),
                mvid: item2.resourceExtInfo.songData.mvid,
                sq: Number(item2.resourceExtInfo.songPrivilege.maxbr) > 480000
              })
            })
            rcmdSong.list.push(list)
          })
          this.homeFindData.push(rcmdSong)
        }

        // 精选音乐视频
        if (dataItem.blockCode === 'HOMEPAGE_MUSIC_MLOG') {
          let mLog = {}
          mLog.type = '精选音乐视频'
          mLog.title = dataItem.uiElement.subTitle.title
          mLog.text = dataItem.uiElement.button.text
          mLog.list = []
          dataItem.extInfo.forEach(item => {
            mLog.list.push({
              id: item.resource.mlogBaseData.id,
              img: item.resource.mlogBaseData.coverUrl,
              name: item.resource.mlogBaseData.text,
              playCount: item.resource.mlogExtVO.playCount,
            })
          })
          this.homeFindData.push(mLog)
        }

        // 你的雷达歌单
        if (dataItem.blockCode === 'HOMEPAGE_BLOCK_MGC_PLAYLIST') {
          let radarPlayList = {}
          radarPlayList.type = '雷达歌单'
          radarPlayList.title = '你的雷达歌单'
          radarPlayList.text = dataItem.uiElement.button.text
          radarPlayList.list = []
          dataItem.creatives.forEach(item => {
            radarPlayList.list.push({
              id: item.resources[0].resourceId,
              img: item.resources[0].uiElement.image.imageUrl,
              name: item.resources[0].uiElement.mainTitle.title,
              playCount: item.resources[0].resourceExtInfo.playCount
            })
          })
          this.homeFindData.push(radarPlayList)
        }

        // 热门播客
        if (dataItem.blockCode === 'HOMEPAGE_VOICELIST_RCMD') {
          let hotPodcast = {}
          // console.log(dataItem);
          hotPodcast.type = '热门播客'
          hotPodcast.title = dataItem.uiElement.subTitle.title
          hotPodcast.text = dataItem.uiElement.button.text
          hotPodcast.list = []
          dataItem.creatives.forEach(item => {
            hotPodcast.list.push({
              id: item.creativeId,
              name: item.uiElement.mainTitle.title,
              img: item.uiElement.image.imageUrl,
              labelText: item.uiElement.labelTexts && item.uiElement.labelTexts[0],
            })
          })
          hotPodcast.list = arrTurnTwo(hotPodcast.list, 3)
          this.homeFindData.push(hotPodcast)
        }

        // 专属场景歌单
        if (dataItem.blockCode === 'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST') {
          let scenePlayList = {}
          scenePlayList.type = '专属场景歌单'
          scenePlayList.title = dataItem.uiElement.subTitle.title
          scenePlayList.text = dataItem.uiElement.button.text
          scenePlayList.list = []
          dataItem.creatives.forEach(item => {
            scenePlayList.list.push({
              id: item.resources[0].resourceId,
              img: item.resources[0].uiElement.image.imageUrl,
              name: item.resources[0].uiElement.mainTitle.title,
              playCount: item.resources[0].resourceExtInfo.playCount
            })
          })
          this.homeFindData.push(scenePlayList)
        }

        // 新歌 新碟 数字专辑
        if (dataItem.blockCode === 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG') {
          let newList = {}
          newList.type = '新歌新碟数字专辑'
          newList.title = ['新歌', '新碟', '数字专辑']
          newList.text = '更多'
          newList.newSong = []
          newList.newAlbum = []
          newList.digitalAlbum = []
          dataItem.creatives.forEach(item => {
            // 新歌
            if (item.creativeType === 'NEW_SONG_HOMEPAGE') {
              let list = []
              item.resources.forEach(item2 => {
                list.push({
                  id: item2.resourceId,
                  name: item2.resourceExtInfo.songData.name,
                  img: item2.uiElement.image.imageUrl,
                  artists: item2.resourceExtInfo.artists.map(artistsName => artistsName.name),
                  info: item2.uiElement.subTitle.title,
                  sq: Number(item2.resourceExtInfo.songPrivilege.maxbr) > 480000
                })
              })
              newList.newSong.push(list)
            }
            // 新碟
            if (item.creativeType === 'NEW_ALBUM_HOMEPAGE') {
              let list = []
              item.resources.forEach(item2 => {
                list.push({
                  id: item2.resourceId,
                  name: item2.uiElement.mainTitle.title,
                  img: item2.uiElement.image.imageUrl,
                  artists: item2.resourceExtInfo.artists.map(artistsName => artistsName.name),
                  info: item2.uiElement.subTitle.title,
                })
              })
              newList.newAlbum.push(list)
            }
            // 数字专辑
            if (item.creativeType === 'DIGITAL_ALBUM_HOMEPAGE') {
              let list = []
              item.resources.forEach(item2 => {
                list.push({
                  id: item2.resourceId,
                  name: item2.uiElement.mainTitle.title,
                  img: item2.uiElement.image.imageUrl,
                  artists: item2.resourceExtInfo.artists.map(artistsName => artistsName.name),
                  info: item2.uiElement.subTitle.title,
                })
              })
              newList.digitalAlbum.push(list)
            }
          })
          this.homeFindData.push(newList)
        }
        
        // 排行榜
        if (dataItem.blockCode === 'HOMEPAGE_BLOCK_TOPLIST') {
          let toplist = {}
          toplist.type = '排行榜'
          toplist.title = dataItem.uiElement.subTitle.title
          toplist.text = dataItem.uiElement.button.text
          toplist.list = []
          dataItem.creatives.forEach(item => {
            let list = []
            item.resources.forEach(item2 => {
              list.push({
                id: item2.resourceId,
                name: item2.uiElement.mainTitle && item2.uiElement.mainTitle.title,
                info: item2.uiElement.subTitle && item2.uiElement.subTitle.title,
                img: item2.uiElement.image.imageUrl,
                artists: item2.resourceExtInfo.artists.map(artistsName => artistsName.name),
                sq: Number(item2.resourceExtInfo.songPrivilege.maxbr) > 480000
              })
            })
          })
          this.homeFindData.push(toplist)
        }

        // 音乐日历
        if (dataItem.blockCode === 'HOMEPAGE_MUSIC_CALENDAR') {
          let musicCalendar = {}
          musicCalendar.type = '音乐日历'
          musicCalendar.title = dataItem.uiElement.subTitle.title
          musicCalendar.text = dataItem.uiElement.button.text
          musicCalendar.list = []
          dataItem.creatives.forEach(item => {
            musicCalendar.list.push({
              event: item.resources[0].uiElement.mainTitle.title,
              img: item.resources[0].uiElement.image.imageUrl,
              labelText: item.resources[0].uiElement.labelTexts ? item.resources[0].uiElement.labelTexts[0] : '预告',
              time: moment(Number(item.resources[0].resourceExtInfo.startTime)).format('MM-DD')
            })
          })
          this.homeFindData.push(musicCalendar)
        }

        // 云村 KTV
        if (dataItem.blockCode === 'HOMEPAGE_BLOCK_FUN_CLUB') {
          let funClub = {}
          funClub.type = '云村ktv'
          funClub.title = dataItem.uiElement.subTitle.title
          funClub.text = dataItem.uiElement.button.text
          funClub.list = []
          dataItem.extInfo.roomInfoList.forEach(item => {
            funClub.list.push({
              id: item.liveId,
              name: item.title,
              songName: item.songName,
              onlineNum: item.onlineNumber,
              img: item.bgUrl
            })
          })
          this.homeFindData.push(funClub)
        }

        // 广播电台
        if (dataItem.blockCode === 'HOMEPAGE_PODCAST24') {
          let broadCast = {}
          broadCast.type = '广播电台'
          broadCast.title = ['广播电台', '24小时播客']
          broadCast.broadcast = []
          broadCast.podcast24 = []
          dataItem.creatives.forEach((item1, index) => {
            if (index === 0) {
              item1.resources.forEach(item2 => {
                broadCast.broadcast.push({
                  name: item2.uiElement.mainTitle.title,
                  img: item2.uiElement.image.imageUrl
                })
              })
            }
            if (index === 1) {
              item1.resources.forEach(item2 => {
                broadCast.podcast24.push({
                  name: item2.uiElement.mainTitle.title,
                  img: item2.uiElement.image.imageUrl
                })
              })
            }
          })
          this.homeFindData.push(broadCast)
        }

        // 视频合辑
        if (dataItem.blockCode === 'HOMEPAGE_BLOCK_VIDEO_PLAYLIST') {
          let videoPlayList = {}
          videoPlayList.type = '视频合辑'
          videoPlayList.title = '视频歌单'
          // videoPlayList.title = dataItem.uiElement.subTitle.title
          videoPlayList.text = dataItem.uiElement.button.text
          videoPlayList.list = []
          dataItem.creatives.forEach(item => {
            videoPlayList.list.push({
              id: item.creativeId,
              name: item.uiElement.mainTitle.title,
              img: item.uiElement.image.imageUrl,
              playCount: item.resources[0].resourceExtInfo.playCount
            })
          })
          this.homeFindData.push(videoPlayList)
        }

      });
    },
  },
  watch: {
    loginStatus: {
      handler: function (newV) {
        this.homeFindData = []
        this.initData()
      },
      immediate: true
    },
    $route(newV, oldV) {
      if(newV.name === 'Find') {
        // console.log('进入开始播放');
        this.$refs.banner.$swiper.autoplay.start()
        this.scrollList.autoplay.start()
      } else {
        // console.log('离开暂停播放');
        this.$refs.banner.$swiper.autoplay.stop()
        this.scrollList.autoplay.stop()
      }
    }
  }
}