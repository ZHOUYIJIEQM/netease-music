<template>
  <!-- 搜索 -->
  <div class="search-page">
    <Navbar 
      class="navbar" 
      @clickLeft="goBack"
      ref="navbar"
    >
      <template #left>
        <div class="icon">
          <i class="iconfont icon-fanhui"></i>
        </div>
      </template>
      <template #middle>
        <div class="middle-content">
          <input 
            ref="searchInput"
            type="text" 
            :placeholder="inputPlaceHolder"
            v-model="searchText"
            @input="searchInput"
            @focus="searchFocus"
            @keydown.enter="goSearchResult(searchText)"
          >
          <i 
            class="iconfont icon-chacha" 
            v-show="searchText.length"
            @click="clearSearchText"
          ></i>
        </div>
      </template>
    </Navbar>
    <!-- 搜索内容 -->
    <div class="search-box">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { defaultSearch } from '@/api/api'
import Navbar from "@/components/Navbar"
import { global } from "@/mixin/global";

export default {
  name: 'Search',
  mixins: [global],
  components: {
    Navbar,
  },
  data() {
    return {
      inputPlaceHolder: '',
      searchText: '',
    }
  },
  computed: {
    searchHistoryArr() {
      return this.$store.getters.searchHistoryArr
    },
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        let defaultS = await defaultSearch();
        this.inputPlaceHolder = defaultS.data.realkeyword;
      } catch (error) {
        console.log(error);
      }
    },
    // 搜索input输入
    searchInput() {

    },
    // 搜索input聚焦
    searchFocus() {
      
    },
    // 转到搜索结果
    goSearchResult() {
      if (this.searchText === '') {
        this.searchText = this.inputPlaceHolder
      }

      // 把保存到 localStorage 的部分放到 result 页面 里, 应该可以解决
      this.$refs.searchInput.blur()
      let history = this.searchHistoryArr
      // todo: 去重处理
      // 找到下标
      let index = history.findIndex(item => item === this.searchText)
      // 存在就删除掉该项
      index !== -1 && history.splice(index, 1)
      // 再加到最前面
      history.unshift(this.searchText)
      this.$store.commit('saveSearchHistoryArr', history)
      
      // bug: 在点击历史搜索记录 2次以上偶然触发???, 不停触发热搜榜轮播切换事件 ?????
      // 与 normalizeSlideIndex false  slidesPerView: 'auto' 有关, 改掉后就不会了
      this.$router.replace({name: 'SearchResult', query: {'keyWord': this.searchText}})
    },
    // 清除搜索input内容
    clearSearchText() {
      this.searchText = ''
      this.$router.replace({name: 'SearchDefault'})
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';

.search-page {
  height: 100%;
  padding-top: $navHeight;
  .navbar {
    .right {
      padding: 0;
    }
    .middle-content {
      @include df();
      align-items: center;
      margin-right: .15rem;
      border-bottom: 1px solid #9b9b9b;
      @include placeholderColor($color: #b4b4b4, $fontsize: .14rem, $caretc: #b4b4b4);
      input {
        width: 100%;
        border: none;
        padding: .08rem 0;
        line-height: 1;
      }
      .icon-chacha {
        font-size: .22rem;
        padding-left: .1rem;
      }
    }
  }
  .search-box {
    height: 100%;
    // background-color: red;
  }
}
</style>
<style lang="scss">
.search-page {
  .navbar {
    padding: 0;
    .right {
      padding: 0;
    }
  }
}
</style>