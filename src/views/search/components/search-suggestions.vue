<template>
  <div class="search-suggestions">
    <van-cell
      v-for="(text, index) in searchSuggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <span slot="title" v-html="highlightStr(text)"></span>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'loadsh'
import { getSearchSuggestion } from '@/api/search'
export default {
  name: 'SearchSuggestions',
  data () {
    return {
      searchSuggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      const { data } = await getSearchSuggestion(q)
      const arr = data.data.options
      if (arr.length === 1 && arr[0] === null) {
        this.searchSuggestions = []
      } else {
        this.searchSuggestions = data.data.options
      }
    },
    highlightStr (text) {
      const str = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, str) // 不会替代原值，返回的是新值
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestions {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
