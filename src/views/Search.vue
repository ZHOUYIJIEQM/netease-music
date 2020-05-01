<template>
  <!-- 搜索 -->
  <transition name="fadeInRight" mode="out-in">
    <div class="search-page">
      <div class="search-box-wrapper">
        <div class="rback">
          <i class="iconfont icon-fanhui" @click="goBack()"></i>
        </div>
        <div class="search-box">
          <input class="input-box" :placeholder="placeholder" v-model="query" type="text"/>
        </div>
        <div class="clear">
          <i class="iconfont icon-chacha" v-show="query" @click="cleanQuery"></i>
        </div>
      </div>
      <div class="search-hots" v-show="!query">
        <div class="search-hots-title">
          热搜榜
        </div>
        <div class="search-hots-list">
          <div class="hots-item" v-for="(item, index) in hotsList" :key="index">
            <div class="hots-item-numb" :class="{three: index < 3}">{{index+1}}</div>
            <div class="hots-item-detail">
              <div class="item-searchWord">
                <div class="item-name" :class="{bold: index < 3}">{{item.searchWord}}</div>
                <div class="hots-item-pic" :class="{up: item.iconType == 5}" v-if="item.iconUrl">
                  <img :src="item.iconUrl" />
                </div>
                <div class="hots-item-score">{{item.score}}</div>
              </div>
              <div class="item-content">{{item.content}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import api from '@/api/index.js'
  export default {
    data() {
      return {
        query: '',
        placeholder: '搜索歌曲、歌手',
        hotsList: []
      }
    },
    created() {
      this.$loading.show();
      api.HotSearch()
        .then(res => {
          this.hotsList = res.data;
          this.$loading.hide();
        })
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      cleanQuery() {
        this.query = '';
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';
  .search-page {
    .search-box-wrapper {
      display: flex;
      padding-bottom: .05rem;
      position: fixed;
      top: 0;
      left: 0;
      background: white;
      width: 100%;

      .rback,
      .clear {
        width: .45rem;
        height: .45rem;
        line-height: .45rem;
        flex: 0 0 .45rem;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
          font-size: .25rem;
        }
      }

      .search-box {
        flex: 1 0 auto;
        border-bottom: 1px solid #808080;
        padding: 0 .1rem;
        display: flex;
        align-items: flex-end;

        input {
          width: 100%;
          outline: none;
          margin-bottom: .08rem;
          font-size: .18rem;
        }

      }

    }

    .search-hots {
      padding-top: .5rem;

      // padding: 0 .15rem;
      .search-hots-title {
        // line-height: .45rem;
        // height: .45rem;
        font-size: .18rem;
        font-weight: bold;
        padding: .2rem 0 0 .15rem;
      }

      .search-hots-list {
        .hots-item {
          display: flex;
          padding: .1rem .15rem;

          &:hover {
            background-color: #dadada;
          }

          .three {
            color: red;
            font-size: .18rem;
          }

          .bold {
            font-weight: bold;
          }

          .hots-item-numb {
            flex: 0 0 .2rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .hots-item-detail {
            display: flex;
            flex-direction: column;
            flex: 1 0 auto;
            padding-left: .15rem;

            .item-searchWord {
              height: .3rem;
              line-height: .3rem;
              display: flex;

              .item-name {
                font-size: .18rem;
              }

              .hots-item-pic {
                flex: 0 0 .32rem;
                overflow: hidden;
                margin-left: .1rem;

                img {
                  width: 100%;
                  vertical-align: text-bottom;
                }
              }

              .hots-item-pic.up {
                img {
                  width: 43%;
                }
              }

              .hots-item-score {
                margin-left: auto;
                color: #909090;
                font-size: .12rem;
              }
            }

            .item-content {
              color: #6b6b6b;
              font-size: .12rem;
            }

          }

        }
      }
    }
  }
</style>
