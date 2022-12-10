import dayjs from 'dayjs'
import Vue from 'vue'
// 默认语言是英文
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
// 注册一个全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
