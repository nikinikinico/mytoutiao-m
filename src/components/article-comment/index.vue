<template>
  <van-cell class="article-comment">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        @click="onLikeBtn"
        class="like-btn"
        :class="{ liked: comment.is_liking }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :loading="commentLoading"
        >{{ comment.like_count || '赞' }}</van-button
      >
    </div>
    <div slot="label" class="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button @click="$emit('onReply', comment)" class="reply-btn" round>
          回复{{ comment.reply_count }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    comment: {
      type: Object,
      required: true
    }, // 每一条评论的信息
    index: {
      type: Number,
      reqired: false
    } // 该项在list中被选中的序列号
  },
  data () {
    return {
      commentLoading: false
    }
  },
  methods: {
    async onLikeBtn () {
      this.commentLoading = true
      try {
        if (this.comment.is_liking) {
          await deleteCommentLike(this.comment.com_id)
          this.$emit('onCommentLike', -1, this.index)
        } else {
          await addCommentLike(this.comment.com_id)
          this.$emit('onCommentLike', 1, this.index)
        }
      } catch (err) {
        this.$toast('操作失败，请重试')
      }
      this.commentLoading = false
    },
    addReplyCount () {
      this.replyCount++
    }
  }
}
</script>

<style scoped lang="less">
.article-comment {
  .avatar {
    width: 70px;
    height: 70px;
  }
  .title-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .user-name {
      margin-left: 30px;
      font-size: 25px;
      color: gray;
    }
    .like-btn {
      padding: 20px 20px;
      height: 20px;
      font-size: 25px;
    }
    .liked {
      color: #e5645f;
    }
  }
  .label {
    .comment-content {
      margin: 15px 0 15px 30px;
      color: #333;
      font-size: 30px;
      line-height: 30px;
    }
    .bottom-info {
      display: flex;
      align-items: center;
      margin-left: 30px;
    }
    .reply-btn {
      margin-left: 10px;
      padding: 20px 15px;
      height: 30px;
      font-size: 24px;
      line-height: 24px;
    }
  }
}
</style>
