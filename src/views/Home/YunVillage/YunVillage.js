import { scrollPosition } from "@/mixin/scrollPosition.js";
import { global } from "@/mixin/global";
import { getAllMv, vdoRcmd } from "@/api/api";


export default {
  mixins: [scrollPosition, global],
  components: {
    Navbar: () => import("@/components/Navbar"),
    Loading: () => import("@/components/Loading"),
    YunRcmdMv: () => import("@/components/YunRcmdMv"),
  },
  data() {
    return {
      // 推荐mv
      recommendVideo: [],
      flagList: ["关注", "推荐"],
      // 记录滚动高度
      flagScrollT: { 0: 0, 1: 0 },
      flagActive: 1,
      pageNum: 0,
      loading: true,
    };
  },
  created() {
    this.area = ['内地','港台','欧美','日本','韩国'].sort(()=>Math.random()>0.5?1:-1)[0]
    this.getData();
  },
  activated() {
    window.addEventListener("scroll", this.handlerScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handlerScroll);
  },
  methods: {
    // todo: 登录后, 改变推荐接口, 视频推荐需要登录, 未登录前只能获取 mv 
    async getData() {
      try {
        this.$store.commit("changeLoading", this.loading);
        // console.log(this.pageNum);
        if (!this.loginStatus) {
          let limit = 20;
          let allmv = await getAllMv({
            area: this.area,
            offset: this.pageNum * limit,
            limit: limit,
          });
          this.recommendVideo.push(
            ...allmv.data.map((item) => {
              return {
                id: item.id,
                duration: item.duration,
                name: item.name,
                playCount: item.playCount,
                img: item.cover,
                tag: item.artistName,
              };
            })
          );
          this.pageNum++;
        } else {
          let allmv = await vdoRcmd(this.pageNum)
          // console.log(allmv);
          this.recommendVideo.push(
            ...allmv.datas.map(item => {
              return {
                id: item.data.vid,
                duration: item.data.durationms,
                name: item.data.title,
                img: item.data.coverUrl,
                url: item.data.urlInfo.url,
                tag: item.data.videoGroup && item.data.videoGroup[0].name,
                playCount: item.data.playTime,
                praisedCount: item.data.praisedCount
              }
            })
          )
          this.pageNum++
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.$store.commit("changeLoading", false);
      }
    },
    // 记录滚动高度, 切换后滚回原来位置
    clickFlag(index) {
      this.flagScrollT[this.flagActive] = this.getScrollTop();
      this.flagActive = index;
      this.$nextTick(() => {
        window.scrollTo(0, this.flagScrollT[this.flagActive]);
      });
    },
    handlerScroll() {
      let bodyH = document.body.scrollHeight || document.documentElement.scrollHeight;
      let sT = this.getScrollTop();
      let cH = this.getClientHeight();
      if (sT + cH > bodyH - 300 && !this.loading && this.flagActive === 1) {
        this.loading = true;
        // console.log("到底触发");
        this.getData();
      }
    },
  },
  watch: {
    loginStatus(newV) {
      this.recommendVideo = []
      this.getData()
    }
  }
};
