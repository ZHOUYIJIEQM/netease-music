import { global } from "@/mixin/global.js";
import Navbar from "@/components/Navbar";
import Tabbar from "@/components/Tabbar";
import PlayListBlock from "@/components/PlayListBlock";
import { highqualityPlayList } from "@/api/api";

export default {
  name: "playlistSquareInclude",
  mixins: [global],
  components: {
    Navbar,
    Tabbar,
    PlayListBlock,
  },
  data() {
    return {
      tabData: ["官方", "精品", "华语", "轻音乐", "古风", "电子", "ACG"],
      tabParams: [],
      playList: [],
      listSwiperOptions: {
        resistanceRatio: 0,
      },
      loading: false,
    };
  },
  computed: {
    listSwiper() {
      return this.$refs.listSwiper.$swiper;
    },
  },
  created() {
    // 如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
    // this.tabParams = new Array(this.tabData.length).fill({offset: 1});
    // this.playList = new Array(this.tabData.length).fill([]);
    // this.tabParams[0].offset = 2 // 所有对象的offset都变成2了

    this.tabParams = this.tabData.map(item => { return {offset: 1, more: true} })
    this.playList = this.tabData.map(item => [])
  },
  mounted() {
    this.isMounted = true;
    this.$refs.listItem.forEach(item => {
      item.$el.addEventListener('scroll', this.swiperItemScroll)
    })
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      try {
        this.loading = true
        let index = this.listSwiper.realIndex;
        // 6行
        let limit = 3 * 6
        let params = {};
        // 没有精品这个 cat, 用流行替代
        params = {
          cat: this.tabData[index].replace("精品", "流行"),
          limit: limit,
          offset: (this.tabParams[index].offset - 1) * limit,
        };
        // console.log(params);
        if (this.tabParams[index].more) {
          let data = await highqualityPlayList(params);
          console.log(data);
          this.playList[index].push(
            ...data.playlists.map((item) => {
              return {
                id: item.id,
                name: item.name,
                img: item.coverImgUrl,
                playCount: item.playCount,
              };
            })
          );
          this.tabParams[index].offset += 1
          this.tabParams[index].more = data.more
        } else {
          console.log('没有了!');
        }
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error);
      }
    },
    // 轮播改变时
    swiperChange() {
      this.$refs.tabbar.changeTab(this.listSwiper.realIndex);
      if (!this.playList[this.listSwiper.realIndex].length) {
        this.getData();
      }
    },
    // tab 发生改变时
    tabChange(index) {
      this.isMounted && this.listSwiper.slideTo(index, 150);
    },
    // 滚动处理
    swiperItemScroll() {
      // console.log(this.listSwiper.realIndex, '滚动');
      let index = this.listSwiper.realIndex
      let swiperH = this.$refs.listSwiper.$el.offsetHeight
      let scrollT = Math.ceil(this.$refs.listItem[index].$el.scrollTop)
      let scrollH = this.$refs.listItem[index].$el.scrollHeight
      // console.log(swiperH, scrollT, scrollH);
      if (swiperH + scrollT + 50 >= scrollH && !this.loading) {
        // console.log('到底了');
        this.getData()
      }
    }
  },
};
