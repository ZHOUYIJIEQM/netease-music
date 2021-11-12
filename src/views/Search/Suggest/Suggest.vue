<template>
  <div class="suggest-content">
    <!-- <template v-if="suggestMatch.length">
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
    </template> -->

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
  computed: {
    // keyWord() {
    //   return this.$parent.searchText
    // }
  },
  methods: {
    goSearchRes(keyWord) {
      this.$parent.searchText = keyWord
      this.$parent.goSearchResult()
    },
    // 获取建议
    getSuggest(keyWord) {
      this.$store.commit("changeLoading", true);
      this.suggestMatch = []
      this.suggestTimer && clearTimeout(this.suggestTimer)
      this.suggestTimer = setTimeout(async () => {
        try {
          if (keyWord) {
            let suggest = await searchSuggest(keyWord)
            // console.log('搜索词', keyWord, suggest);
            if (suggest.code) {
              suggest.result && (this.suggestMatch = suggest.result.allMatch)
            }
            console.log(this.suggestMatch);
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.$store.commit("changeLoading", false);
        }
      }, 500)
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log(to, from);
    if (to.query.keyWord) {
      console.log('query', to.query.keyWord, to.name);
      next(vm => {
        // vm.$router.replace({
        //   name: 'SearchSuggest',
        //   query: to.query.keyWord
        // })
        // .catch(err => {})
      })
    }
    // next(vm => {
    //   console.log('刚进入', vm.$route.query, window.location.href);
    // })
  },
  // beforeRouteUpdate(to, from, next) {
  //   // console.log('------');
  //   if (to.query.keyWord) {
  //     next()
  //   } else {
  //     next(false)
  //   }
  // },
  watch: {
    '$route.query.keyWord': {
      handler: function(newV) {
        this.$nextTick(() => {
          console.log('搜索词', newV);
          // this.getSuggest(newV)
        })
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
        color: #181818;
        flex: 1;
        font-size: .14rem;
        padding: .14rem .15rem .14rem 0;
        margin-left: .1rem;
        border-bottom: 1px solid #d6d6d6;
      }
    }
  }
}
</style>