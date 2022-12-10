/* 用户相关请求模块 */
import request from '@/utils/request'
export const login = (data) => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
/* 注意一分钟只能发送一次 */
export const sendSms = (mobile) => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/* 获取用户信息 */
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
  })
}

/* 获取用户列表 */
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}

/* 关注用户 */
export const addFollower = (target) => {
  return request({
    method: 'post',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

/* 取消关注 */
export const deleteFollower = (target) => {
  return request({
    method: 'delete',
    url: `/v1_0/user/followings/${target}`
  })
}

/* 获取用户资料 */
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/profile'
  })
}

/* 修改用户资料 */
export const updateUserProfile = data => {
  return request({
    method: 'patch',
    url: '/v1_0/user/profile',
    data
  })
}

/* 修改用户照片 */
export const updateUserPhoto = data => {
  return request({
    method: 'patch',
    url: '/v1_0/user/photo',
    data
  })
}
