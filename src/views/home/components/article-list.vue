<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      v-model="reflashloading"
      @refresh="onRefresh"
      :success-text="flashtext"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :err.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import ArticleItem from '@/components/article-item'
import { debounce } from 'loadsh'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      reflashloading: false,
      flashtext: '刷新成功', // 刷新提示
      scrollTop: 0
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.reflashloading = false
        this.flashtext = `刷新成功${results.length}条数据`
      } catch (err) {
        this.reflashloading = false
        this.flashtext = '刷新失败'
      }
    }
  },
  mounted () {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    })
  },
  activated () {
    this.$refs['article-list'].scrollTop = this.scrollTop
  }
}
</script>

<style scoped lang="less">
.article-list {
  margin-bottom: 100px;
  height: 79vh;
  overflow-y: auto;
}
</style>
