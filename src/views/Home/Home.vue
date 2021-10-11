<template>
  <div class="home-page">
    <div class="home-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- <div class="menu" @click="toggleMenu">菜单</div>
    <div class="menu" style="z-index: -1" v-show="showMenu">sssssssss</div> -->
    
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
export default {
  name: "homeInclude",
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
      // 是否显示左侧菜单
      showMenu: false,
    };
  },
  computed: {
  },
  methods: {
    // 初始化路由
    initTab(to, from) {
      let routeName = to.name;
      this.$router.push({ name: routeName })
        .catch((err) => {});
      this.tabIndex = this.tabArr.findIndex((item) => item === routeName);
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
    // 菜单显示/隐藏
    toggleMenu() {
      this.showMenu = !this.showMenu
    }
  },
  watch: {
    $route: {
      handler: "initTab",
      immediate: true,
    },
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

  .menu {
    position: fixed;
    top: 0;
    left: 0;
    padding: .3rem;
    background-color: royalblue;
  }

  .home-footer {
    height: $footerHeight;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid rgb(230, 230, 230);
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