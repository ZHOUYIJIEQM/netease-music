<template>
  <div class="nav">
    <i class="iconfont icon-caidan"></i>
    <ul class="nav-list">
      <li class="item" v-for="(item, index) in navList" :class="{'active': navIndex === index}" @click="navClick(index)" :key="item.name">{{item.name}}</li>
    </ul>
    <router-link to="/search" class="search" tag="div">
      <i class="iconfont icon-sousuo"></i>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavBar',
  data() {
    return {
      navList: [
        { name: '我的' },
        { name: '发现' },
        { name: '云村' },
        { name: '视频' }
      ]
    }
  },
  computed: {
    ...mapGetters(['navIndex'])
  },
  methods: {
    navClick(index) {
      // this.$store.state.navIndex = index;
      console.log('this.navIndex', this.navIndex);
    }
  }
}

</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';

.nav {
  position: relative;
  height: $navbar-height;
  line-height: $navbar-height;
  display: flex;
  justify-content: space-between;

  i {
    display: inline-block;
    padding: 0 15px;
    color: #636363;
  }

  i.iconfont.icon-caidan {
    font-size: 22px;
  }

  i.iconfont.icon-sousuo {
    font-size: 26px;
  }

  .nav-list {
    width: 60%;
    font-size: 0;
    // margin: 0 auto;

    .item {
      width: 25%;
      text-align: center;
      font-size: $fsize-14;
      color: grey;
      display: inline-block;
      vertical-align: middle;
      transition: all .25s;
    }

    li.active {
      font-weight: bold;
      font-size: $fsize-19;
      color: #000;
    }
  }
}

</style>
