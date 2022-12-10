<template>
  <div class="search-history">
    <van-cell-group>
      <van-cell title="搜索历史" v-show="historyList.length !== 0">
        <van-icon name="delete-o"></van-icon>
        <span @click="$emit('delALLHistory')">全部删除</span>
      </van-cell>
      <!-- 条目 -->
      <van-cell
        v-for="(item, index) in historyList"
        :key="index"
        @click="$emit('onSearch', item)"
        clickable
        :title="item"
      >
        <van-icon
          name="close"
          @click.stop="$emit('delSingele', index)"
        ></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    historyList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>
