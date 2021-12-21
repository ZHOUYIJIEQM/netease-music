<template>
  <!-- todo: 搜索还未完成 -->
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
    <div class="search-box" ref="searchBox">
      <!-- <keep-alive :include="/.*Include$/">
        <router-view></router-view>
      </keep-alive> -->
      <keep-alive>
        <component :is="searchComponent[searchType]"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { defaultSearch } from '@/api/api'
import Navbar from "@/components/Navbar"
import { global } from "@/mixin/global";
import SearchDefault from './Default/Default.vue'
import SearchSuggest from './Suggest/Suggest.vue'
import SearchResult from './Result/Result.vue'

export default {
  name: 'SearchInclude',
  mixins: [global],
  components: {
    Navbar,
  },
  data() {
    return {
      // 搜索input 默认搜索内容
      inputPlaceHolder: '',
      // 搜索词
      searchText: '',
      // 动态组件
      searchComponent: {
        'default': SearchDefault,
        'suggest': SearchSuggest,
        'result': SearchResult
      },
      // 默认显示页
      searchType: 'default',

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
  mounted() {
    // 不想移动端一不小心下拉刷新
    document.querySelector('body').style.overflow = 'hidden'
  },
  beforeRouteLeave (to, from, next) {
    document.querySelector('body').style.overflow = ''
    console.log('去往的组件页', to.name);
    // 可以离开的组件名
    let nextList = ['PlayListDetail']
    // 处理直接按返回
    if (this.searchType !== 'default') {
      // 如果去的页面在可以离开的数组里才离开
      if (nextList.includes(to.name)) {
        next()
      } else {
        // 不离开
        next(false)
        // 动态组件切换到默认
        this.searchType = 'default'
      }
    } else {
      next()
    }
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
      // 输入搜索词, 动态组件跳转到 搜索建议组件
      if (this.searchText.length) {
        // this.$router.push({name: 'SearchSuggest', query: {'keyWord': this.searchText}})
        //   .catch(err => {})
        this.searchType = 'suggest'
        // this.$router.replace({name: 'Search', query: {
        //   keyWord: this.searchText,
        //   type: this.searchType
        // }})
      }
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
      // 跳到搜索结果
      this.searchType = 'result'      
    },
    // 清除搜索input内容
    clearSearchText() {
      this.searchText = ''
      this.searchType = 'default'
      this.$refs.navbar.$el.style.background = '#fff'
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.query.keyWord) {
        vm.searchText = to.query.keyWord
      }
    })
  },
  watch: {
    searchType(newV) {
      if (newV === 'result') {
        this.$refs.navbar.$el.style.background = '#f5f5f5'
      } else {
        this.$refs.navbar.$el.style.background = '#fff'
        this.$children.forEach(item => {
          if (item.$el.className === 'result-content') {
            item.$refs.tabbar.changeTab(0) 
          }
        })
      }
    }
  }
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
        background: inherit;
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