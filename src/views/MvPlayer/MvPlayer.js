import {getMvDetail, getVdoDetail, getMvUrl, getVdoUrl, getMLogtoVideoId} from '@/api/api'
import { global } from "@/mixin/global.js";

export default {
  mixins: [global],
  name: 'MvPlayer',
  data() {
    return {
      defaultImg: require('@/assets/mine/未登录.png'),
      vdoInfo: {},
      // showDes: false,
      showDes: false,
      playState: 'paused',
      progressTime: 0,
      activeColor: 'rgba(255, 255, 255, .35)',
      inActiveColor: 'rgba(255, 255, 255, .15)',
      barHeight: '.03rem',
      buttonSize: '.09rem',
    }
  },
  mounted() {
    this.$store.commit("changeLoading", true);
    this.initSet()
  },
  methods: {
    initSet() {
      this.vdoEl = this.$refs.vdoEl
    },
    togglePlay() {
      if (this.vdoEl.paused) {
        this.vdoEl.play()
      } else {
        this.vdoEl.pause()
      }

    },
    vdoPlay() {
      this.playState = 'playing'
      this.setButton('small')
    },
    vdoPause() {
      this.playState = 'paused'
      this.setButton('big')
    },
    vdoError() {
      console.log('error');
    },
    setButton(type) {
      this.progTimer && clearTimeout(this.progTimer)
      if(type == 'big') {
        this.progTimer = setTimeout(() => {
          this.barHeight = '.03rem'
          this.buttonSize = '.09rem'
        }, 200)
      } else {
        this.progTimer = setTimeout(() => {
          this.barHeight = '.015rem'
          this.buttonSize = '.04rem'
        }, 1000)
      }
    },
    bigButton() {
      this.barHeight = '.03rem'
      this.buttonSize = '.09rem'
      this.progTimer && clearTimeout(this.progTimer)
      this.progTimer = setTimeout(() => {
        this.barHeight = '.015rem'
        this.buttonSize = '.04rem'
      }, 1000)
    },
    vdoTimeUpdate() {
      if (!this.isDrag) {
        this.progressTime = this.vdoEl.currentTime / this.vdoEl.duration * 100
      }
    },
    vdoLoadedData() {
      // console.log(this.vdoEl.videoWidth, this.vdoEl.videoHeight);
      let ratio = this.vdoEl.videoWidth / this.vdoEl.videoHeight
      // 根据比例判断横屏, 竖屏
      if (ratio >= 1) {
        this.vdoEl.style.objectFit = 'contain'
        this.vdoEl.parentElement.style.alignItems = 'center'
      } else {
        this.vdoEl.style.objectFit = 'cover'
        this.vdoEl.parentElement.style.alignItems = 'flex-start'
      }
    },
    progressChange() {
      this.isDrag = true
      this.bigButton()
    },
    progressChangeEnd() {
      this.vdoEl.currentTime = this.progressTime / 100 * this.vdoEl.duration
      if (this.vdoEl.paused) {
        this.vdoEl.play()
      }
      this.isDrag = false
    },
    // 展开/隐藏描述
    toggleShowDes() {
      this.showDes = !this.showDes
    },
    // 获取 type 为 video 的数据
    async videoGetData(newV) {
      // 详细介绍
      let vdoDetailData = await getVdoDetail(newV)
      // console.log(`vdo详情`, vdoDetailData);

      if (vdoDetailData.code === 200) {
        // this.toast('已获取视频详情')
        this.vdoInfo = {
          id: newV,
          creator: {
            id: vdoDetailData.data.creator.userId,
            nickname: vdoDetailData.data.creator.nickname,
            avatarUrl: vdoDetailData.data.creator.avatarUrl,
            identityIconUrl: vdoDetailData.data.creator.avatarDetail && vdoDetailData.data.creator.avatarDetail.identityIconUrl
          },
          title: vdoDetailData.data.title,
          description: vdoDetailData.data.description && vdoDetailData.data.description.replace(/\n/g, '<br>'),
          duration: vdoDetailData.data.durationms / 1000,
          commentCount: vdoDetailData.data.commentCount,
          praisedCount: vdoDetailData.data.praisedCount,
          shareCount: vdoDetailData.data.shareCount,
          subscribeCount: vdoDetailData.data.subscribeCount,
        }
      } else {
        this.toast('获取视频详情错误')
      }

      // 播放地址
      let vdoData = await getVdoUrl(newV)
      // console.log(`vdo地址`, vdoData);
      if (vdoData.code === 200) {
        this.vdoInfo.url = vdoData.urls[0].url
      } else {
        this.toast(`获取播放地址错误`)
      }
      // console.log(JSON.stringify(this.vdoInfo, null, '  '));
      this.$nextTick(() => {
        this.$refs.vdoEl.setAttribute('src', this.vdoInfo.url)
        this.$refs.vdoEl.play()
      })

      this.$store.commit("changeLoading", false);
    },
    async mvGetData(newV) {
      // 详细介绍
      let mvDetailData = await getMvDetail(newV)
      console.log(`mv详情`, mvDetailData);
      if (mvDetailData.code === 200) {
        // this.toast('已获取视频详情')
        this.vdoInfo = {
          id: newV,
          creator: {
            id: mvDetailData.data.artists[0].id,
            nickname: mvDetailData.data.artists[0].name,
            avatarUrl: mvDetailData.data.artists[0].img1v1Url || mvDetailData.data.cover,
          },
          title: mvDetailData.data.name,
          description: mvDetailData.data.desc && mvDetailData.data.desc.replace(/\n/g, '<br>'),
          duration: mvDetailData.data.duration / 1000,
          commentCount: mvDetailData.data.commentCount,
          praisedCount: mvDetailData.data.subCount,
          shareCount: mvDetailData.data.shareCount,
          subscribeCount: mvDetailData.data.subCount
        }
      } else {
        this.toast('获取视频详情错误')
      }

      // 播放地址
      let mvData = await getMvUrl(newV, 1080)
      // console.log(`mv地址`, mvData);
      if (mvData.code === 200) {
        this.vdoInfo.url = mvData.data.url
      } else {
        this.toast(`获取播放地址错误`)
      }
      // console.log(JSON.stringify(this.vdoInfo, null, '  '));
      this.$nextTick(() => {
        this.$refs.vdoEl.setAttribute('src', this.vdoInfo.url)
        this.$refs.vdoEl.play()
      })

      this.$store.commit("changeLoading", false);
    },
    async mlogGetData(newV) {
      let data = await getMLogtoVideoId(newV)
      console.log(data);
      if (data.code === 200) {
        this.videoGetData(data.data)
      } else {
        this.toast('获取mlog错误! 该链接无法播放!', 3000)
        this.$store.commit("changeLoading", false);
        throw '获取mlog错误! 该链接可能无法播放!'
      }
    }
  },
  watch: {
    '$route.params.id': {
      handler: function (newV) {
        try {
          this.$store.commit("changeLoading", true);
          // 不同类型发起不同请求 type mv video, 再提取需要的数据
          let type = this.$route.query.type
          // this.vdoInfo = {}
          // console.log(`id 触发 ${newV} 类型 ${type}  正在发起请求`);
          if (type === 'mv') {
            this.mvGetData(newV)
          } else if (type === 'video') {
            this.videoGetData(newV)
          } else if (type === 'mlog') {
            this.mlogGetData(newV)
          }
        } catch (error) {
          console.log('获取必要信息错误!');
          this.toast('获取必要信息错误', 2000)
        } finally {
          this.$store.commit("changeLoading", false);
        }
      },
      immediate: true
    }
  }
}