<template>
  <div class="suggest-content">
    <template v-if="suggestMatch.length">
      <div 
        class="suggest-box"
        v-for="(item, index) in suggestMatch"
        :key="index"
        @click="goSearchRes(item.keyword)"
      >
        <div class="suggest-item">
          <i class="iconfont icon-sousuo"></i>
          <span class="suggest-text">{{item.keyword}}</span>
        </div>
      </div>
    </template>
    <template v-else-if="!loading && !suggestMatch.length">
      <div class="no-suggest" @click="goSearchRes($parent.searchText)">
        <span>搜索</span> <pre class="text-eli">“{{$parent.searchText}}”</pre>
      </div>
    </template>
  </div>
</template>
<script>
import { searchSuggest } from "@/api/api"

export default {
  name: 'SearchSuggest',
  data() {
    return {
      // 建议列表
      suggestMatch: [],
      // 定时器, 避免太快发送请求
      suggestTimer: null,
      // 是否正在加载
      loading: false,
    }
  },
  methods: {
    goSearchRes(keyWord) {
      this.$parent.searchText = keyWord
      this.$parent.goSearchResult()
    },
    // 获取建议
    getSuggest(keyWord) {
      this.loading = true
      this.$store.commit("changeLoading", true);
      this.suggestMatch = []
      this.suggestTimer && clearTimeout(this.suggestTimer)
      this.suggestTimer = setTimeout(async () => {
        try {
          if (keyWord) {
            let suggest = await searchSuggest(keyWord)
            if (suggest.code === 200 && suggest.result.allMatch) {
              this.suggestMatch = suggest.result.allMatch
            }
            // console.log('搜索词', keyWord, this.suggestMatch, suggest);
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.$store.commit("changeLoading", false);
          this.loading = false
        }
      }, 300)
    }
  },
  watch: {
    '$parent.searchText': {
      handler: function(newV) {
        console.log('new searchText');
        this.getSuggest(newV)
      },
      immediate: true
    },
  }
}
</script>
<style lang="scss" scoped>
.suggest-content {
  height: 100%;
  overflow: scroll;
  .suggest-box {
    .suggest-item {
      &:active {
        background-color: #d6d6d6;
      }
      display: flex;
      align-items: center;
      .icon-sousuo {
        font-size: .18rem;
        color: grey;
        margin-left: .15rem;
      }
      .suggest-text {
        line-height: 1.3;
        color: #333;
        flex: 1;
        font-size: .14rem;
        padding: .12rem .15rem .12rem 0;
        margin-left: .1rem;
        border-bottom: 1px solid #d6d6d6;
      }
    }
  }
  .no-suggest {
    &:active {
      background-color: #d6d6d6;
    }
    color: #6399fd;
    padding: .15rem;
    border-bottom: 1px solid #d6d6d6;
    font-size: .14rem;
    display: flex;
    align-items: center;
    span {
      flex-shrink: 0;
    }
    pre {
      flex: 1;
      overflow: hidden;
      display: inline-block;
    }
  }
}
</style>