<template>
  <div id="app">
    <!-- 路由的出口 -->
    <!-- 这里设置的keep-alive是一级路由出口，仅对该路由出口渲染的组件有效 -->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'APP', // 最好都要设置组件名称
  data () {
    return {}
  },
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>

<style lang="less">
.box {
  width: 200px;
  height: 50px;
  background: pink;
}
</style>
