import request from '@/utils/request'
/* 获取新闻列表 */
export const getArticleList = (params) => {
  return request({
    methos: 'get',
    url: '/v1_0/articles',
    params
  })
}
/* 根据id获取新闻内容 */
export const getArticleById = articleId => {
  return request({
    method: 'get',
    url: `/v1_0/articles/${articleId}`
  })
}

/* 收藏文章 */
export const addCollectArticle = target => {
  return request({
    method: 'post',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

/* 取消收藏文章 */
export const deleteCollectArticle = target => {
  return request({
    method: 'delete',
    url: `/v1_0/article/collections/${target}`
  })
}

/* 点赞文章 */
export const addlikeArticle = target => {
  return request({
    method: 'post',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

/* 取消点赞文章 */
export const deletelikeArticle = target => {
  return request({
    method: 'delete',
    url: `/v1_0/article/likings/${target}`
  })
}
