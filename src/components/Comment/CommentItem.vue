<template>
  <div class="">
    <!-- 层评论 -->
    <FloorItem 
      :floorData="commentData"
      @clickReply="showPopUp"
    ></FloorItem>
    <!-- 弹出层显示更多 -->
    <van-popup 
      class="floor-comment"
      v-model="showReply" 
      round 
      position="bottom" 
      @close="clickOverlay"
      :overlay-style="{'background-color': 'hsl(0deg 0% 0% / 30%)'}"
      :style="{ height: '92%' }" 
    >
      <div class="title">
        <i class="iconfont icon-fanhui" @click="clickOverlay"></i>
        <span class="reply">回复</span>
        <span v-if="totalCount">({{totalCount}})</span>
      </div>
      <div class="content" ref="RepCommentEl" @scroll="loadRepComment">
        <div class="floor-top">
          <FloorItem
            :floorData="commentData"
            :showCount="false"
          />
        </div>
        <div class="floor-comment-main">
          <FloorItem 
            v-for="(item, index) in ReplyData"
            :key="index"
            :floorData="item"
            :parentCommentId="parentCommentId"
          />
        </div>
      </div>
      <div class="bottom-input">
        <input type="text" placeholder="写评论...">
        <p>发送</p>
      </div>
    </van-popup>
    
  </div>
</template>
<script>
import { commentFloor } from "@/api/api";
import FloorItem from './FloorItem.vue'
export default {
  components: {
    FloorItem
  },
  props: {
    // 评论内容
    commentData: {
      type: Object,
      require: true,
      default: function () {
        return {}
      }
    },
    // 歌曲, 歌单 的id
    resourceId: {
      type: [String, Number],
      require: true
    },
    // 什么类型的评论 (歌曲, 歌单...)
    commentType: {
      type: [String, Number],
      require: true
    }
  },
  data() {
    return {
      showReply: false,
      parentCommentId: this.commentData.commentId,
      time: 0,
      totalCount: 0,
      RepCommentEl: null,
      RepHeight: 0,
      ReplyData: [],
      loading: false,
    }
  },
  methods: {
    showPopUp() {
      this.showReply = true
      this.$store.commit('changeShowReply', true)
      if (this.showReply) {
        this.loading = true
        this.getComment()
        // 加载内层评论内容
      }
    },
    clickOverlay() {
      this.showReply = false
      this.$store.commit('changeShowReply', false)
      this.ReplyData = []
    },
    async getComment() {
      let params = {
        parentCommentId: this.parentCommentId,
        id: this.resourceId,
        type: this.commentType,
        limit: 20,
      }
      if (this.ReplyData.length) {
        // console.log(this.ReplyData.at(-1).time);
        params.time = this.ReplyData.at(-1).time
      }
      // console.log('参数:', params);
      let comment = await commentFloor(params)
      // console.log(comment);
      this.loading = false
      this.ReplyData.push(...comment.data.comments)
      !this.totalCount && (this.totalCount = comment.data.totalCount)
    },
    loadRepComment() {
      if (!this.RepCommentEl) {
        this.RepCommentEl = this.$refs.RepCommentEl
        this.RepHeight = this.RepCommentEl.getBoundingClientRect().height
      }
      if (this.RepHeight + this.RepCommentEl.scrollTop > this.RepCommentEl.scrollHeight - 100 && !this.loading) { 
        this.loading = true
        this.getComment()
      }
    }
  },
  watch: {
    loading(newV) {
      this.$store.commit("changeLoading", newV);
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';
$bottomInputH: .5rem;

.floor-comment {
  @include df(column);
  .title {
    flex-shrink: 0;
    padding: 0 .05rem;
    @include df();
    align-items: center;
    .reply {
      font-size: .17rem;
    }
    .iconfont {
      padding: .1rem;
      font-size: .22rem;
      margin-right: .05rem;
    }
  }
  .content {
    flex: 1;
    overflow: auto;

    .floor-top {
      border-bottom: .06rem solid #f3f3f3;
      ::v-deep .comment-box .comment-content {
        border-bottom: none;
      }
    }
  }
  ::v-deep .floor-comment-main {
    .comment-box:last-child {
      .comment-content {
        border: none;
      }
    }
  }
  .bottom-input {
    flex-shrink: 0;
    background-color: hsla(0, 0%, 100%, .96);
    height: $bottomInputH;
    @include df();
    justify-content: space-between;
    align-items: center;
    padding: 0 .15rem;
    border-top: 1px solid #f7f7f7;
    @include placeholderColor($color: #b4b4b4, $fontsize: .14rem, $caretc: #c5c5c5);
    input {
      background-color: transparent;
      font-size: .13rem;
      flex: 1;
      border: none;
      color: $black;
    }
    p {
      font-size: .15rem;
      color: #9e9e9e;
    }
  }
}
</style>
