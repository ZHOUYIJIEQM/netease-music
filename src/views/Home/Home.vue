<template>
  <div class="home-page">
    <div class="home-content">
      <div v-for="(item, index) in 60" :key="index">{{item}}</div>
      <button @click="$router.push({name: 'PlayList'})">去歌单</button>
    </div>
    <div class="home-footer"></div>
  </div>
</template>

<script>
import Find from '@/views/Home/Find/Find'
import Mine from '@/views/Home/Mine/Mine'
import YunVillage from '@/views/Home/YunVillage/YunVillage'

export default {
  name: "HomeInclude",
  data() {
    return {
      // 用于轮播的动态组件
      homeContentList: [
        { component: Find },
        { component: Mine },
        { component: YunVillage },
      ],
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
    }
  },
  methods: {
    goPage(name) {
      this.$router.push({name: `${name}`})
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/variable.scss';
@import '@/styles/Mixin.scss';

.home-page {
  height: 100%;
  @include df(column);

  .home-content {
    flex: 1;
    overflow: auto;
  }

  .home-footer {
    flex-basis: $footerHeight;
    flex-shrink: 0;
    background-color: rosybrown;
  }
}
</style>
