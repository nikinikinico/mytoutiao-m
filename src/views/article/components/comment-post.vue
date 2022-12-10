<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button @click="onPost" class="post-btn" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { postComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  inject: {
    articleId: {
      type: [Number, String, Object]
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await postComment({
          target: this.target.toString(), // 评论或文章的id
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : null
        })
        this.$emit('onPostMsg', data.data)
        this.$toast.success('发布成功')
        this.message = ''
      } catch (err) {
        this.$toast.fail('发布失败，请重试！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
