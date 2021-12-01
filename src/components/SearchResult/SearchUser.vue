<template>
  <!-- 搜索结果用于显示艺人 -->
  <div class="search-user-comp" @click="clickArtist(userData.id)">
    <div class="left">
      <img :src="userData.avatarUrl" alt="">
    </div>
    <div class="middle">
      <div class="name text-eli">
        <span class="user-name" v-html="userData.name"></span>
        <i class="iconfont icon-nv" v-if="userData.gender === 2"></i>
        <i class="iconfont icon-nan" v-else></i>
      </div>
      <div class="des text-eli">{{userData.description}}</div>
    </div>
    <div class="right" lang="">
      <span>+ 关注</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userData: {
      type: Object,
      default: function() {
        return {}
      },
      require: true
    }
  },
  methods: {
    clickArtist(id) {
      this.$toast({
        message: `user id: ${id}, 未开发!`,
        className: "toastT",
        duration: 2000,
        position: "bottom",
      });
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.search-user-comp {
  @include df();
  align-items: center;
  padding: .06rem 0;
  padding-right: .15rem;
  .left {
    flex-shrink: 0;
    margin-left: .15rem;
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;  
      height: 100%;
      object-fit: cover;
    }
  }
  .middle {
    flex: 1;
    overflow: hidden;
    padding-left: .15rem;
    line-height: 1.4;
    .user-name {
      margin-right: .05rem;
    }
    .iconfont {
      font-size: .14rem;
      &.icon-nan {
        color: #2856c3;
      }
      &.icon-nv {
        color: #f189b3;
      }
    }
    .des {
      color: #868686;
      font-size: .12rem;
    }
  }
  .right {
    @include df();
    margin-left: .1rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: .58rem;
    padding: .04rem 0;
    border-radius: .3rem;
    color: red;
    border: .01rem solid red;
    font-size: 0;
    span {
      font-size: .12rem;
    }
  }
}
</style>