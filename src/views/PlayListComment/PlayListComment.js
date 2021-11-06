import Navbar from "@/components/Navbar"
import { global } from "@/mixin/global.js";
import { playListDetail, commentNew } from "@/api/api.js";

export default {
  name: 'PlayListComment',
  mixins: [global],
  components: {
    Navbar
  },
  data() {
    return {
      // 歌单 id
      commentId: this.$route.params.id,
      // 评论列表
      comments: [],
      // 歌单信息
      playList: {},
      // 评论标记
      active: "最新",
      // 第几页评论
      pageNum: 1,
      // 是否有更多评论
      hasMore: true,
      // 是否正在加载
      loading: false,
    }
  },
  filters: {
    
  },
  computed: {
    // 共有多少评论
    commentCount() {
      return this.playList.commentCount;
    },
  },
  mounted() {
    this.getPlayList()
    window.addEventListener('scroll', this.handlerScroll)
  },
  methods: {
    // 换行
    formatComment(value) {
      return value.replace(/\n/g, '<br>')
    },
    // 获取歌单信息
    async getPlayList() {
      this.$store.commit('changeLoading', true)
      try {
        let pl = await playListDetail(this.commentId);
        this.playList = pl.playlist;
        this.loadingData = false
        this.getComment()
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        this.$store.commit('changeLoading', false)
      }, 100)
    },
    // 获取歌单评论
    async getComment() {
      try {
        if (this.hasMore) {
          this.$store.commit('changeLoading', true)
          let params = {
            type: 2,
            id: this.commentId,
            pageSize: 20,
            pageNo: this.pageNum,
          }
          // let sortType = 99
          if (this.active === '推荐') {
            params.sortType = 99
          } else if (this.active === '最新') {
            params.sortType = 3
            this.cursor && (params.cursor = this.cursor)
          } else {
            params.sortType = 2
            // 按照要求, 热度一直参数错误
            this.cursor && (params.cursor = this.cursor)
          }
          let comment = await commentNew(params)
          this.hasMore = comment.data.hasMore
          comment.data.cursor && (this.cursor = comment.data.cursor)
          this.pageNum++
          this.comments.push(...comment.data.comments)
          this.loading = false
          this.$store.commit('changeLoading', false)
        }
      } catch (error) {
        this.loading = false
        this.$store.commit('changeLoading', false)
        this.$toast('新版评论接口获取数据错误')
        console.log("加载评论错误:\n", error);
      }
    },
    // 设置评论标记
    setActive(type) {
      if (this.active !== type) {
        this.active = type;
        this.cursor = null
        this.hasMore = true
        this.comments = []
        this.pageNum = 1
        this.getComment()
        if (type === '推荐' || type === '最热') {
          this.$toast({
            message: '接口存在bug, 推荐, 最热可能无法正常读取数据!',
            className: "toastT",
            duration: 2000,
            position: "bottom",
          })
        }
      }
    },
    // 滚动加载更多
    handlerScroll() {
      let scrollT = this.getScrollTop()
      let scrollH = this.getScrollHeight()
      let clienH = this.getClientHeight()

      if (scrollT + clienH + 100 >= scrollH && !this.loading) {
        console.log('到底了');
        this.loading = true
        this.getComment()
      }
    }
  },
}