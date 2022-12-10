import request from '@/utils/request'
/* 获取评论/回复列表 */
export const getCommentList = params => {
  return request({
    method: 'get',
    url: '/v1_0/comments',
    params
  })
}

/* 对评论或回复点赞 */
export const addCommentLike = target => {
  return request({
    method: 'post',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

/* 对评论或回复取消点赞 */
export const deleteCommentLike = target => {
  return request({
    method: 'delete',
    url: `/v1_0/comment/likings/${target}`
  })
}

/* 发布评论 */
export const postComment = data => {
  return request({
    method: 'post',
    url: '/v1_0/comments',
    data
  })
}
