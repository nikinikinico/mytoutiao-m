import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  transformResponse: [function (data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return data
    }
    // axios会默认讲响应的json对象进行parse
  }]
})

// 创建一个新的请求
const refreshTokenReq = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  const status = error.response.status
  if (status === 400) {
    // 参数错误
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) {
    // token无效
    const { user } = store.state
    if (!user.token) {
      return redirectLogin()
    }
    try {
      const { data } = await refreshTokenReq({
        method: 'put',
        url: '/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      store.commit('setUser', user)
      console.log(error.config)
      // 把失败的请求重新发出去,配置对象为request的最新配置对象
      return request(error.config)
    } catch (err) {
      redirectLogin()
    }
  } else if (status === 403) {
    // 无权限
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    // 服务端异常
    Toast.fail('服务端异常，请稍后重试')
  }
  return Promise.reject(error)
})

function redirectLogin () {
  router.replace({
    name: 'login',
    // 传递查询参数
    query: {
      // 不是组件中不能用this.$router
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
