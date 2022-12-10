<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="快来发表你的评论吧~"
    @load="onLoad"
    :immediate-check="false"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
  >
    <ArticleComment
      v-for="(item, index) in list"
      ref="commentItem"
      :key="index"
      :comment="item"
      :index="index"
      @onCommentLike="onCommentLikeBtn"
      @onReply="$emit('onReply', $event)"
    />
    <!-- 点击onReply按钮触发的回复窗口弹出事件，event为激发的commentItem对象信息，继续激发上一级的index窗口 -->
  </van-list>
</template>

<script>
import ArticleComment from '@/components/article-comment'
import { getCommentList } from '@/api/comment'
export default {
  name: 'CommentList',
  components: {
    ArticleComment
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      // 自定义props数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      offset: null, // 表示评论数据的偏移量
      limit: 10 // 表示每次获取评论的个数
    }
  },
  created () {
    // 当手动开启loading的时候初始loading不会为true
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getCommentList({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        this.$emit('getComment', data.data)
        this.loading = false
        const { results } = data.data

        this.list.push(...results)
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
    onCommentLikeBtn (count, index) {
      this.list[index].like_count += count
      this.list[index].is_liking = !this.list[index].is_liking
    },
    // 外层对文章做评论
    addNewComment (item) {
      this.list.unshift(item)
    },
    addItemsCount () {
      // 适用于外部的评论列表，让其子项的评论数+1
    }
  }
}
</script>

<style>
</style>
