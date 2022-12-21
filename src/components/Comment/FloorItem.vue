<template>
  <div class="comment-box" v-if="floorData.commentId">
    <div class="img-box">
      <img
        class="avatar"
        :src="floorData.user.avatarUrl + '?param=200y200'"
        alt=""
      />
      <img
        class="pendant"
        v-if="floorData.pendantData"
        :src="floorData.pendantData.imageUrl + '?param=200y200'"
        alt=""
      />
      <img
        class="avatarDetail"
        v-if="floorData.user.avatarDetail"
        :src="floorData.user.avatarDetail.identityIconUrl"
        alt=""
      />
    </div>
    <div class="comment-content">
      <div class="top">
        <div class="user">
          <div class="name">
            <span class="user-name">{{ floorData.user.nickname }}</span>
            <span
              class="vip-box"
              v-if="floorData.user.vipRights"
            >
              <img
                src="@/assets/cvip.png"
                alt=""
              />
              <span class="split">▪</span>
              <span class="level">{{ floorData.user.vipRights.redVipLevel }}</span>
            </span>
          </div>
          <div class="date">{{ floorData.time | formatTime }}</div>
        </div>
        <div class="zan">
          <span
            class="zan-num"
            :style="{ color: floorData.liked ? '#fe3a3b' : '' }"
            v-if="floorData.likedCount"
            >{{ floorData.likedCount }}</span
          >
          <i
            class="iconfont icon-zan"
            v-if="!floorData.liked"
          ></i>
          <i
            class="iconfont icon-z-likeFill"
            v-else
          ></i>
        </div>
      </div>
      <div class="content">
        <pre class="format">{{ floorData.content }}</pre>
      </div>
      <!-- 显示回复数量 -->
      <div
        class="reply"
        @click.stop="clickReply"
        v-if="showCount && floorData.showFloorComment?.replyCount"
      >
        {{ floorData.showFloorComment?.replyCount }}条回复 <i class="iconfont icon-jiantou"></i>
      </div>
      <!-- 显示回复哪个内容 -->
      <div class="reply-con" v-if="isShowldReply">
        <span class="nickname">@{{floorData.beReplied[0].user.nickname}}:</span>
        <span>{{floorData.beReplied[0].content}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    floorData: {
      type: Object,
      default: () => ({})
    },
    showCount: {
      type: Boolean,
      default: true
    },
    parentCommentId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      isShowldReply: false
    }
  },
  mounted() {
    if (this.parentCommentId) {
      // console.log('parentCommentId', this.parentCommentId);
      // console.log(this.floorData);
      if (this.floorData.beReplied.length) {
        this.isShowldReply = this.floorData.beReplied[0].beRepliedCommentId !== this.parentCommentId && this.floorData.beReplied[0].content
      }
    }
  },
  methods: {
    clickReply() {
      this.$emit('clickReply')
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';

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
  .reply-con {
    border-left: .03rem solid #ededed;
    margin-top: .1rem;
    padding: .05rem;
    color: #7d7d7d;
    font-size: 12px;
    line-height: 1.5;
    .nickname {
      color: #5492cb;
      margin-right: .1rem;
    }
  }
}
</style>
