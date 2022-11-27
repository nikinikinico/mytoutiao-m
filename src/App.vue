<template>
  <div id="app">
    <!-- 路由的出口 -->
    <router-view />
    黑马头条
    <div>
      <i class="toutiao toutiao-shanchu"></i>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'APP',
  data() {
    return {}
  }
}
</script>

<style lang="less">
</style>
