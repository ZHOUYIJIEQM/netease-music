<template>
  <div class="search-album-comp" @click="clickAlbum(albumData.id)">
    <div class="left">
      <div class="img-box">
        <img :src="albumData.picUrl" alt="">
      </div>
    </div>
    <div class="right">
      <div class="name text-eli">
        <span class="album-name">{{albumData.name}}</span>
        <span class="album-alias" v-if="albumData.sec">({{albumData.sec}})</span>
      </div>
      <div class="info text-eli">
        <span class="artist" v-html="albumData.artist"></span>
        <span class="date">{{albumData.publishTime}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    albumData: {
      type: Object,
      require: true,
      default: function () {
        return {}
      },
    }
  },
  methods: {
    clickAlbum(id) {
      this.$toast({
        message: `album id: ${id}, 未开发!`,
        className: "toastT",
        duration: 2000,
        position: "bottom",
      });
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';
.search-album-comp {
  padding: .06rem .15rem;
  @include df();
  align-items: center;
  .left {
    $shadowH: .05rem;
    width: .5rem;
    height: calc(.5rem + $shadowH);
    flex-shrink: 0;
    position: relative;

    &:before {
      position: absolute;
      content: "";
      display: block;
      width: 90%;
      aspect-ratio: 1;
      margin-left: 5%;
      border-radius: 50%;
      background-color: #1b1b1b;
      z-index: 1;
    }
   
    .img-box {
      position: absolute;
      top: $shadowH;
      width: .5rem;
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: .1rem;
      z-index: 2;
      img {
        width: 100%;
      }
    }
    
  }

  .right {
    padding-left: .12rem;
    line-height: 1.5;
    color: $greyFontC;
    .name {
      .album-name {
        color: $black;
        margin-right: .06rem;
      }
    }
    .info {
      font-size: .13rem;
      .artist {
        margin-right: .08rem;
      }
    }
  }
}  
</style>