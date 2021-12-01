<template>
  <!-- 每层评论 -->
  <div class="comment-item-comp">
    <div class="comment-box">
      <div class="img-box">
        <img class="avatar" :src="commentData.user.avatarUrl+'?param=200y200'" alt="">
        <img class="pendant" v-if="commentData.pendantData" :src="commentData.pendantData.imageUrl+'?param=200y200'" alt="">
        <img class="avatarDetail" v-if="commentData.user.avatarDetail" :src="commentData.user.avatarDetail.identityIconUrl" alt="">
      </div>
      <div class="comment-content">
        <div class="top">
          <div class="user">
            <div class="name">
              <span class="user-name">{{commentData.user.nickname}}</span>
              <span class="vip-box" v-if="commentData.user.vipRights">
                <img src="../assets/cvip.png" alt="">
                <span class="split">▪</span>
                <span class="level">{{commentData.user.vipRights.redVipLevel}}</span>
              </span>
            </div>
            <div class="date">{{commentData.time|formatTime}}</div>
          </div>
          <div class="zan">
            <span class="zan-num" :style="{color: commentData.liked ? '#fe3a3b' : ''}" v-if="commentData.likedCount">{{commentData.likedCount}}</span>
            <i class="iconfont icon-zan" v-if="!commentData.liked"></i>
            <i class="iconfont icon-z-likeFill" v-else></i>
          </div>
        </div>
        <div class="content"><pre class="format">{{commentData.content}}</pre></div>
        <div class="reply" @click.stop="clickReply" v-if="commentData.showFloorComment.replyCount">{{commentData.showFloorComment.replyCount}}条回复 <i class="iconfont icon-jiantou"></i></div>
      </div>
    </div>
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
      <div class="content">
        <div v-for="(item, index) in 100" :key="index">{{item}}</div>
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
export default {
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
    }
  },
  methods: {
    async getComment() {
      let params = {
        parentCommentId: this.parentCommentId,
        id: this.resourceId,
        type: this.commentType,
        limit: 20,
      }
      if (this.time) {
        params.time = this.time
      }
      console.log('参数:', params);
      let comment = await commentFloor(params)
      console.log(comment);
      this.totalCount = comment.data.totalCount
    },
    // 换行
    formatComment(value) {
      return value.replace(/\n/g, '<br>')
    },
    clickReply() {
      this.showReply = true
      this.$store.commit('changeShowReply', true)
      if (this.showReply) {
        this.getComment()
      }
    },
    clickOverlay() {
      this.showReply = false
      this.$store.commit('changeShowReply', false)
    }
  },
  watch: {
    '$store.getters.showReply': {
      handler: function (newV) {
        if (!newV) {
          this.showReply = false
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';
$bottomInputH: .5rem;

.comment-item-comp {
  .comment-box{
    padding-top: .08rem;
    @include df();
    padding-left: .08rem;
    transition: all .2s;
    &:active {
      background-color: #f5f5f5;
    }
    .img-box {
      width: .52rem;
      height: .52rem;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
      .avatar {
        width: 68%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }
      .avatarDetail {
        right: .06rem;
        bottom: .06rem;
        left: auto;
        top: auto;
        width: .12rem;
      }
    } 
    .comment-content {
      flex: 1;
      margin-left: .05rem;
      padding-bottom: .15rem;
      border-bottom: 1px solid #e8e8e8;
      .top {
        @include df();
        justify-content: space-between;
        align-items: center;
        .user {
          font-size: .13rem;
          .name {
            color: #666;
            line-height: 2;
            .vip-box {
              margin-left: .03rem;
              display: inline-block;
              padding: .01rem .02rem;
              border-radius: .03rem;
              font-size: 0;
              background-color: #141412;
              img {
                width: .19rem;
              }
              // span {
              //   display: inline-block;
              //   font-size: .12rem;
              //   height: .12rem;
              // }
            }
          }
          .date {
            font-size: .1rem;
            color: #999;
          }
        }
        .zan {
          color: #999;
          margin-right: .12rem;
          @include df();
          align-items: center;
          .iconfont {
            font-size: .14rem;
          }
          .icon-zan {

          }
          .icon-z-likeFill {
            color: #fe3a3b;
          }
          .zan-num {
            margin-right: .05rem;
            font-size: .12rem;
          }
        }
      }
      .content {
        padding-right: .15rem;
        margin-top: .12rem;
        color: $black;
        font-size: .14rem;
        line-height: 1.5;
        // overflow: hidden;
        .format {
          white-space: pre-wrap;
        }
      }
      .reply {
        margin-top: .1rem;
        font-size: .11rem;
        color: #597ba1;
        .iconfont {
          font-size: .1rem;
        }
      }
    }
  }
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
}
</style>