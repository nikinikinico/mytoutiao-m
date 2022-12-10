<template>
  <van-icon
    :class="{ collected: value === 1 }"
    :loading="loading"
    color="#777"
    :name="value == -1 ? 'good-job-o' : 'good-job'"
    @click="OnCollect"
  />
</template>

<script>
import { addlikeArticle, deletelikeArticle } from '@/api/article'
export default {
  name: 'LikeArticle',
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async OnCollect () {
      this.loading = true
      try {
        let status = -1
        if (this.value === -1) {
          await addlikeArticle(this.articleId)
          status = 1
        } else {
          await deletelikeArticle(this.articleId)
        }
        this.$emit('input', status)
        this.$toast.success({
          message: this.value === -1 ? '点赞成功' : '取消点赞',
          duration: 800
        })
      } catch (err) {
        console.log(err)
        this.$toast('操作失败，请重试！')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.collected.van-icon-good-job {
  color: #ec5b5c !important;
}
</style>
