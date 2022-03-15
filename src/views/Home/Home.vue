<template>
  <div class="home-page">
    <div class="home-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    
    <!-- 菜单 手势隐藏菜单 -->
    <div v-gesture="{'funcName': hideMenu, 'distanceX': 60, 'distanceY': 60}" >
      <van-popup 
        class="home-menu"
        v-model="showMenu"
        position="left" 
        @click-overlay="toggleMenu"
        :style="{ width: '80%' }"
        :overlay-style="{'background-color': 'rgb(0 0 0 / 60%)'}"
      >
        <HomeMenu></HomeMenu>
      </van-popup>
    </div>
    
    <!-- 底部切换 -->
    <div class="home-footer">
      <div
        class="footer-icon"
        v-for="(item, index) in footerList"
        :key="index"
        @click="changeTab(index)"
        :class="{ active: tabIndex === index }"
      >
        <img v-if="tabIndex === index" :src="item.imgActive" />
        <img v-else :src="item.img" />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { global } from "@/mixin/global";
import { defaultSearch } from '@/api/api'

export default {
  name: "homeInclude",
  mixins: [global],
  components: {
    HomeMenu: () => import("@/components/Menu")
  },
  data() {
    return {
      // footer 数据
      footerList: [
        {
          img: require("@/assets/footer/find.png"),
          imgActive: require("@/assets/footer/find_active.png"),
          title: "发现",
        },
        {
          img: require("@/assets/footer/mine.png"),
          imgActive: require("@/assets/footer/mine_active.png"),
          title: "我的",
        },
        {
          img: require("@/assets/footer/yunVillage.png"),
          imgActive: require("@/assets/footer/yunVillage_active.png"),
          title: "云村",
        },
      ],
      // footer 标记
      tabIndex: 0,
      // footer 下标对应路由名
      tabArr: ["Find", "Mine", "YunVillage"],
    };
  },
  computed: {
    showMenu: {
      get: function() {
        return this.$store.getters.showMenu
      },
      set: function() {
        // this.$store.commit('toggleMenu')
      }
    }
  },
  created() {
    this.initTab(this.$route)
  },
  methods: {
    // 首次进入, 根据路由名设置对应的 tabbar
    initTab(to) {
      // keep-alive watch $route 时需要限制在哪些路由页触发
      let routeName = to.name;
      // console.log(routeName);
      if (routeName === 'Find' || routeName === 'Mine' || routeName === 'YunVillage') {
        this.$router.push({ name: routeName })
          .catch((err) => {});
        this.tabIndex = this.tabArr.findIndex((item) => item === routeName);
      }
    },
    // 点击底部标签
    changeTab(index) {
      // 重复点击 返回顶部
      if (this.tabIndex === index) {
        window.scroll({ top: 0, behavior: "smooth" })
        return false;
      }

      this.tabIndex = index;
      this.$router.push({ name: this.tabArr[index] })
        .catch((err) => {});
      // 会报错 NavigationDuplicated: Avoided redundant navigation to current location
    },
    hideMenu(value) {
      if (value === 'left') {
        this.$store.commit('toggleMenu')
      }
    }
  },
  watch: {
    // 因为 keep-alive 所以只要路由变化就会触发, 即进入其他路由也会执行 initTab, 所以需要限制在哪些路由页才能触发
    // $route: {
    //   handler: "initTab",
    //   immediate: true,
    // },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variable.scss";

.home-page {
  min-height: 100%;
  background-color: $homeBgc;
  .home-content {
    padding-top: $navHeight;
    padding-bottom: $footerHeight;
  }

  .home-menu {
    height: 100%;
    background-color: #f5f5f5;
  }

  .home-footer {
    height: $footerHeight;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #f5f5f5;
    @include df();
    // align-items: center;
    padding: .06rem .23rem;
    z-index: 10;
    .footer-icon {
      flex: 1;
      text-align: center;
      img {
        width: .28rem;
        aspect-ratio: 1;
      }
      p {
        font-size: .09rem;
        color: #6b6b6b;
      }
      &.active p {
        color: #fd393a;
      }
    }
  }
}
</style>

