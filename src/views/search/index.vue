<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/" class="search">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultsShow = false"
        background="#3296fa"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResults v-if="isResultsShow" :searchText="searchText" />
    <!-- 搜索建议 -->
    <SearchSuggestions
      :searchText="searchText"
      v-else-if="searchText"
      @search="onSearch"
    />
    <!-- 搜索历史 -->
    <SearchHistory
      :historyList="historyList"
      @delSingele="delSingele"
      @onSearch="onSearch"
      @delALLHistory="historyList = []"
      v-else
    />
  </div>
</template>
<script>
import SearchHistory from './components/search-history.vue'
import SearchResults from './components/search-results.vue'
import SearchSuggestions from './components/search-suggestions.vue'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchContainer',
  components: {
    SearchHistory,
    SearchResults,
    SearchSuggestions
  },
  data () {
    return {
      searchText: '',
      isResultsShow: false,
      historyList: getItem('search-history') || []
    }
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      /* 搜索历史相关 */
      const index = this.historyList.indexOf(val)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(val)
      this.isResultsShow = true
    },
    onCancel () {
      this.$router.back()
    },
    delSingele (index) {
      this.historyList.splice(index, 1)
    }
  },
  watch: {
    historyList: {
      handler (val) {
        setItem('search-history', val)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
