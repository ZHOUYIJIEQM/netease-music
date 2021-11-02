import { playListDetail, songDetail, collectPlayList } from "@/api/api";
import { global } from "@/mixin/global.js";
import PlayListDetailItem from "@/components/PlayListDetailItem"
import Navbar from "@/components/Navbar"

export default {
  name: 'PlayListDetail',
  mixins: [global],
  components: {
    PlayListDetailItem,
    Navbar,
    // Navbar: () => import("@/components/Navbar"),
  },
  data() {
    return {
      // 歌单名
      playListName: '歌单',
      // 歌单里的歌曲的 id 组成的数组
      songsIds: [],
      // 歌单里的歌曲
      songList: [],
      // 歌单信息
      playList: {},
      // 每次加载 100 首歌
      len: 100,
      // 加载错误
      loadingError: false,
      // 是否正在加载数据, 正在加载(true), 则不触发 @load 事件加载数据, false则加载数据
      loadingData: true,
      // 是否已加载完全部数据
      finished: false,
      // 滚动定时器
      scrollTimer: null,
      // 粘性置顶高度
      navbarHeight: 0,
      // 是否显示返回顶部
      topFlag: false,
      // 订阅是否显示为灰色
      greyColor: false,
      // 弹出内容
      popUpShow: false,
      // 分享
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
          { name: '分享海报', icon: 'poster' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '二维码', icon: 'qrcode' },
        ],
      ],
    }
  },
  computed: {
    // 歌单是否收藏过
    subscribed() {
      if (this.loginStatus) {
        return this.playList.subscribed
      }
      // 没登录过直接返回false
      return false
    },
    // 是否是自己创建的歌单
    myPlayList() {
      if (this.loginStatus) {
        // 如果登录过, 判断创建者id是否与用户id相同
        return this.playList.creator && this.playList.creator.userId === this.$store.getters.userInfo.userId
      }
      return false
    },
    description() {
      return this.playList.description && this.playList.description.replace(/\n/g, '<br>')
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    // console.log(this.$refs.navbar); 
    // undefined, 因为使用异步组件的写法, mounted时未完成加载, 直接获取得不到, 用 setInterval, 100ms获取一次, 得到后清除定时器, 或是在子组件里 mounted emit 表示已经加载好了, 或是别写异步组件的写法
    // this.getNavbarHeight()
    // this.navbarMounted()

    this.getEleAttr()
    
    window.addEventListener('scroll', this.handlerScroll, false)
    window.addEventListener('touchend', this.touchE, false)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handlerScroll, false)
    window.removeEventListener('touchend', this.touchE, false)
  },
  methods: {
    // 初始化数据
    async initData() {
      try {
        let pl = await playListDetail(this.$route.params.id)
        this.playList = pl.playlist;
        // 把里面歌曲 id 提取出来
        this.songsIds = this.playList.trackIds.map(item => item.id)
        // 等拿到所有歌曲 id 才可触发 @load 事件
        this.loadingData = false
      } catch (error) {
        console.log(error);
      }
    },
    // 加载数据, 每次获取 this.len 首歌曲的详细信息
    async getSongs() {
      try {
        let ids = this.songsIds.slice(this.songList.length, this.songList.length + this.len).join(",")
        let songList = await songDetail(ids)
        // console.log(songList);
        this.songList.push(
          ...songList.songs.map((item, index) => {
            return {
              id: item.id,
              name: item.name,
              secName: item.tns ? item.tns[0] : item.alia[0],
              artist: item.ar.map(item1 => item1.name).join('/'),
              al: item.al.name,
              mvId: item.mv,
              sq: songList.privileges[index].maxbr >= 999000,
            }
          })
        )
        this.loadingData = false
        if (this.songList.length >= this.songsIds.length) {
          this.finished = true
        }
        // console.log(this.songList);
      } catch (error) {
        console.log(error);
        this.loadingError = true
      }
    },
    // 获取一些需要的dom及属性值
    getEleAttr() {
      // 导航条
      this.navEle = this.$refs.navbar.$el
      // 导航条背景
      this.navBgEle = this.$refs.navbarBg
      // 歌单描述内容
      this.descriptionEle = this.$refs.description
      // 歌单描述的背景
      this.detailBgEle = this.$refs.detailBg
      // 订阅 评论 分享
      this.playlistBarEle = this.$refs.playlistBar
      // 歌单列表
      this.playlistEle = this.$refs.playlist
      // 导航条高度
      this.navH = this.navEle.offsetHeight
      // 粘性置顶高度
      this.navbarHeight = this.navH + 'px'
      // 订阅 评论 分享 距离顶部高度
      this.playlistBarT = this.playlistBarEle.getBoundingClientRect().top
      // 歌单列表 距离顶部高度
      this.playlistT = this.playlistEle.getBoundingClientRect().top
    },
    // 滚动处理
    handlerScroll() {
      this.scrollT = this.getScrollTop()
      this.scrollT = Math.ceil(this.scrollT)
      // console.log(this.scrollT);
      // 显示/隐藏回到顶部
      if (this.scrollT > this.playlistT * 3) {
        this.topFlag = true
      } else {
        this.topFlag = false
      }

      // 滚动高度小于 navbar 高度
      if (this.scrollT >= 0 && this.scrollT <= this.navH) {
        this.playListName = '歌单'
        this.descriptionEle.style.opacity = 1
      }

      // 描述内容 透明度
      if (this.scrollT >= this.navH && this.scrollT <= this.playlistT - this.navH) {
        this.playListName = this.playList.name
        let opacity = +((this.scrollT - this.navH) / this.descriptionEle.offsetHeight).toFixed(2)
        opacity = opacity >= 1 ? 1 : opacity
        this.descriptionEle.style.opacity = 1 - opacity
      }
      
      // 导航条背景图 透明度, 描述背景图弧形边框
      if (this.scrollT <= this.playlistT - this.navH) {
        let opacity = +(this.scrollT / (this.playlistT - this.navH)).toFixed(2)
        opacity = opacity >= 1 ? 1 : opacity
        this.navBgEle.style.opacity = opacity
        let r = 50 - 18 * opacity
        // console.log(r);
        this.detailBgEle.style.borderRadius = `0 0 ${r}% ${r}%`
      } else {
        this.navBgEle.style.opacity = 1
      }
      
      // 订阅 评论 分享 透明度
      if (this.scrollT >= this.playlistBarT - this.navH * 1.5 && this.scrollT <= this.playlistT - this.navH ) {
        let opacity = +(this.scrollT - (this.playlistBarT - this.navH * 1.5)) / (this.playlistT - (this.playlistBarT - this.navH * 0.5)).toFixed(2)
        // console.log(opacity);
        opacity = opacity >= 1 ? 1 : opacity
        this.playlistBarEle.style.opacity = 1 - opacity
      } else if (this.scrollT > this.playlistT - this.navH) {
        this.playlistBarEle.style.opacity = 0
      } else if (this.scrollT < this.playlistBarT - this.navH * 1.5) {
        this.playlistBarEle.style.opacity = 1
      }

    },
    // 触摸松开, 滚动到指定位置
    touchE() {
      // this.$nextTick(() => {
        this.scrollTimer && clearTimeout(this.scrollTimer)
        // 松开后一小段时间后才触发, 松开后可能还有一段滚动距离, 如果在触发范围内, 可能反复弹动
        this.scrollTimer = setTimeout(() => {
          // 出现了滚动高度为小数, 会导致 第二个 if 判断出错
          this.scrollT = Math.ceil(this.scrollT)
          // 滑动距离小于 navbar 高度时, 松开重新回到顶部
          if (this.scrollT > 0 && this.scrollT < this.navH) {
            window.scroll({ top: 0, behavior: "smooth" })
          }
          // 大于 nav 高度, 且小于 播放列表高度
          if (this.scrollT > this.navH && this.scrollT < (this.playlistT - this.navH)) {
            window.scroll({ top: (this.playlistT - this.navH), behavior: "smooth" })
            // 如果 this.scrollT 不向上取整, 
            // 可能得到 滚动高度: 204.8000030517578 而 this.playlistT - this.navH : 205
            // 点击返回时, 还能符合此处if判断条件, 从而 home 页面滚动到 this.playlistT - this.navH 高度
            // console.log(this.scrollT, this.playlistT - this.navH);
          }
        }, 250)
      // })
    },
    // 处理订阅
    async handlerSubscribe() {
      // 未登录, 提示去登录
      if (!this.loginStatus) {
        this.$dialog
          .confirm({
            title: "收藏歌单",
            message: "需要登录才能收藏哦!",
            confirmButtonText: "确定",
          })
          .then((res) => {
            this.$store.commit("saveRedirect", this.$route.path);
            this.$router.replace({ name: "Login" });
          })
          .catch((err) => {
            console.log("取消", err);
          });
      }
      // 已登录且不是自己创建的歌单
      if (this.loginStatus && !this.myPlayList) {
        this.$store.commit('changeLoading', true)
        let type = 1
        // 1 收藏  2 取消
        this.playList.subscribed ? type = 2 : type = 1
        try {
          let collect = await collectPlayList({ id: this.playList.id, t: type })
          console.log(collect);
          if (collect.code === 200) {
            this.playList.subscribed = !this.playList.subscribed
            type === 1 ? this.playList.subscribedCount++ : this.playList.subscribedCount--
          } else {
            this.$toast('收藏错误, 请重试!')
          }
          this.$store.commit('changeLoading', false)
        } catch (error) {
          this.$toast('收藏错误, 请重试!')
          this.$store.commit('changeLoading', false)
          console.log(error);
        }
      }
    },
    // todo: 前往歌单评论页 
    goComment() {

    },
    // 点击分享选项
    onSelect(option) {
      this.showShare = false;
      if (option.name === '复制链接') {
        this.copyText(window.location.href)
      }
    },
    // 弹出内容
    popUpDetail() {
      this.popUpShow = true
    },
    clickPopUp() {
      this.popUpShow = !this.popUpShow
    },
    // 保存封面
    async downloadImg(imageSrc) {
      // 使用浏览器自带的 fetch
      const suffix = this.playList.coverImgUrl.split('.').slice(-1)[0]
      const fileName = `${this.playList.name}.${suffix}`
      // fetch 能提供 Blob 类型的响应
      const image = await fetch(imageSrc)
      // console.log(image);
      // 得到 Blob 实例
      const imageBlog = await image.blob()
      // console.log(imageBlog);
      // 根据传入的 Blob 实例, 生成指向内存地址的字符串
      const imageURL = URL.createObjectURL(imageBlog)
      // console.log(imageURL);
      const link = document.createElement('a')
      link.href = imageURL
      link.download = fileName
      link.click()

      // base64
      // let suffix = this.playList.coverImgUrl.split('.').slice(-1)[0]
      // let filename = `${this.playList.name}.${suffix}`
      // let imgUrl = this.playList.coverImgUrl
      // let image = new Image();
      // image.src = imgUrl;
      // // 解决跨域 Canvas 污染问题
      // image.setAttribute("crossOrigin", "anonymous");
      // image.onload = function() {
      //   let canvas = document.createElement("canvas");
      //   canvas.width = image.width;
      //   canvas.height = image.height;
      //   let context = canvas.getContext("2d");
      //   context.drawImage(image, 0, 0, image.width, image.height);
      //   let url = canvas.toDataURL(); //得到图片的base64编码数据
      //   let a = document.createElement("a"); // 生成一个a元素
      //   let event = new MouseEvent("click"); // 创建一个单击事件
      //   a.download = filename || "photo"; // 设置图片名称
      //   a.href = url; // 将生成的URL设置为a.href属性
      //   a.dispatchEvent(event); // 触发a的单击事件
      // };
      
    },
    // 在mounted用refs获取子组件时, 如果无法直接获取到
    navbarMounted() {
      this.navbarHeight = this.$refs.navbar.$el.offsetHeight+'px'
    },
    getNavbarHeight() {
      this.navbarTimer = setInterval(() => {
        let navbar = this.$refs.navbar
        if (navbar) {
          this.navbarHeight = navbar.$el.offsetHeight + 'px'
          clearTimeout(this.navbarTimer)
        }
      }, 100)
    }
  },
  watch: {
    popUpShow(newV) {
      if (newV) {
        // document.querySelector('body').style.overflow = 'hidden'
        document.querySelector('.playlist-detail-page').style.overflow = 'hidden'
        document.querySelector('.playlist-detail-page').style.height = window.innerHeight + 'px'
      } else {
        // document.querySelector('body').style.overflow = ''
        document.querySelector('.playlist-detail-page').style.overflow = ''
        document.querySelector('.playlist-detail-page').style.height = ''
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    // 直接按返回键
    if (this.popUpShow) {
      console.log(this.popUpShow);
      this.popUpShow = false
      next(false)
    } else {
      next()
    }
  }
  
}