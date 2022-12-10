<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('replyClose')"
      ></van-icon>
    </van-nav-bar>
    <div class="reply-list">
      <!-- 评论项 -->
      <ArticleComment :comment="comment" />
      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <CommentList ref="replyList" :source="comment.com_id" type="c" />
    </div>
    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button
        @click="isPopShow = true"
        class="commentBtn"
        size="small"
        round
        >写评论</van-button
      >
    </div>

    <van-popup v-model="isPopShow" position="bottom">
      <CommentPost
        v-if="isPopShow"
        :target="comment.com_id"
        @onPostMsg="onPostMsg"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentPost from './comment-post.vue'
import CommentList from './comment-list.vue'
import ArticleComment from '@/components/article-comment'
export default {
  name: 'CommentReply',
  components: {
    ArticleComment,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPopShow: false
    }
  },
  methods: {
    onPostMsg (data) {
      this.$refs.replyList.addNewComment(data.new_obj)
      this.$emit('replyCountFlash') // 激活主页面的commentChosen的reply_count++
      this.isPopShow = false
    }
  }
}
</script>

<style scoped lang="less">
.reply-list {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  margin-bottom: 90px;
  overflow-y: auto;
}
.post-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #ccc;
  height: 90px;
  .commentBtn {
    width: 80%;
  }
}
</style>
