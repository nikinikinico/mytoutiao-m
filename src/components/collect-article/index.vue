<template>
  <van-icon
    :class="{ collected: value }"
    :loading="loading"
    color="#777"
    :name="value ? 'star' : 'star-o'"
    @click="OnCollect"
  />
</template>

<script>
import { addCollectArticle, deleteCollectArticle } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async OnCollect () {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollectArticle(this.articleId)
        } else {
          await addCollectArticle(this.articleId)
        }
        // 自定义修改数据不是立即的
        this.$emit('input', !this.value)
        this.$toast.success({
          message: this.value ? '取消收藏' : '添加收藏',
          duration: 800
        })
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.collected.van-icon-star {
  color: #ffc67b !important;
}
</style>
