import request from '@/utils/request'
// 获取所有的频道数据
export const getChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}
// 给用户添加频道信息
export const addUserChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除频道数据
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
