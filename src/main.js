import Vue from 'vue'
import App from './App.vue'
import router from './router' // 路由组件
import store from './store' // vuex容器引入

// 动态设置rem基准值，动态设置到html根标签为屏幕宽度的1/10
import 'amfe-flexible' // flexible.js的包

import Vant from 'vant'
import 'vant/lib/index.css' // 先引进vant的样式再引进自己的
import '@/styles/index.less'

// 传入时间过滤器
import '@/utils/dayjs'

Vue.use(Vant)
Vue.filter('transURL', value => {
  return value.replace('http://localhost:8000', 'http://toutiao.itheima.net')
})

Vue.config.productionTip = false

new Vue({
  router, // 记住要把路由给挂载上
  store,
  render: h => h(App)
}).$mount('#app')
