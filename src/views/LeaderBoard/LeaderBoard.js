import { toplistDetail } from "@/api/api.js";
import Navbar from "@/components/Navbar"
import { global } from "@/mixin/global.js";

export default {
  name: 'LeaderBoardInclude',
  components: {
    // BoardList: () => import('@/components/BoardList.vue'),
    PlayListBlock: () => import('@/components/PlayListBlock.vue'),
    Navbar
  },
  mixins: [global],
  data() {
    return {
      tabActive: 0,
      show: false,
      // 榜单推荐
      recommend: [],
      // 官方榜
      official: [],
      // 精选榜
      selected: [],
      // 曲风榜
      genre: [],
      // 全球榜
      global: [],
      // MV
      MV: [],
      // 特色
      feature: [],
      // 记录滚动高度
      scrollT: 0,
    };
  },
  created() {
    this.getData();
  },
  activated() {
    setTimeout(() => {
      window.scroll(0, this.scrollT)
      window.addEventListener('scroll', this.handlerScroll)
    }, 10)
  },
  deactivated() {
    window.removeEventListener('scroll', this.handlerScroll)
  },
  methods: {
    async getData() {
      try {
        this.$store.commit("changeLoading", true);
        let data = await toplistDetail();
        let list = data.list.map(item => {
          return {
            id: item.id,
            name: item.name,
            img: item.coverImgUrl,
            tracks: item.tracks,
            frequency: item.updateFrequency,
          }
        })
        
        // 没有直接可使用的 api, 从排行榜里随机提取来使用
        list.forEach((item) => {
          // 添加一个是否用过的标记
          item.isUsed = false

          // 官方
          if (item.tracks.length) {
            this.official.push(item)
            item.isUsed = true
          }

          // 全球
          if (/美国|UK|日本|法国|欧美|日语|韩语|俄语|越南/i.test(item.name)) {
            this.global.push(item)
            item.isUsed = true
          }

          // 曲风
          if (item.name.includes('云音乐') && !item.isUsed) {
            this.genre.push(item)
            item.isUsed = true
          }
        })

        list = list.filter(item => !item.isUsed)

        // 推荐榜
        while(this.recommend.length < 3) {
          // 从剩下的榜单随机选3个
          let num = this.getRandom(0, list.length-1)
          let item = list[num]
          // 避免得到重复内容
          if (!item.isUsed) {
            this.recommend.push(item)
            item.isUsed = true
          }
        }

        // 精选
        while(this.selected.length < 6) {
          let item = list[this.getRandom(0, list.length-1)]
          if (!item.isUsed) {
            this.selected.push(item)
            item.isUsed = true
          }
        }

        // 特色
        this.feature = list.filter(item => !item.isUsed)

      } catch (error) {
        console.log(error);
      } finally {
        this.show = true;
        setTimeout(() => {
          this.$store.commit("changeLoading", false);
        }, 300);
      }
    },
    // 获取随机数 [start, end]
    getRandom(start, end) {
      return Math.round(Math.random() * (end - start) + start);
    },
    handlerScroll(e) {
      this.scrollT = Math.ceil(this.getScrollTop())
    }
  },
};
