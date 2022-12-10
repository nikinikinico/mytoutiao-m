<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail markdown-body" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!--
            v-model适用于同时绑定value同时又监听input事件
             @userFollow="article.is_followed = $event"
             :isFollowed="this.article.is_followed"
           -->
          <FollowUser
            v-model="article.is_followed"
            :aut_id="this.article.aut_id"
          ></FollowUser>
          <!-- 模板中的$event就是事件参数 -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          v-html="article.content"
          ref="article-detail"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区域 -->
        <CommentList
          ref="comment"
          :source="articleId"
          type="a"
          @getComment="commentCount = $event.total_count"
          @onReply="onReply"
        />
        <!-- /评论区域 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPopShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="commentCount" color="#777" />
          <!-- 收藏按钮组件 -->
          <CollectArticle
            v-model="article.is_collected"
            :articleId="article.art_id"
          />
          <!-- 点赞按钮组件 -->
          <LikeArticle v-model="article.attitude" :articleId="article.art_id" />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 弹出层 -->
        <van-popup v-model="isPopShow" position="bottom">
          <CommentPost :target="article.art_id" @onPostMsg="onPostMsg" />
        </van-popup>
        <!-- /弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleInfo"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 评论回复区域 -->
    <!--弹出层是懒加载的，第一次渲染出内部的组件/数据后，就不会在执行了 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <!-- 通过v-if可以跟随弹层变化重新渲染组件 -->
      <CommentReply
        v-if="isReplyShow"
        @replyCountFlash="commentChosen.reply_count++"
        @replyClose="isReplyShow = false"
        :comment="commentChosen"
      />
    </van-popup>
    <!-- /评论回复区域 -->
  </div>
</template>

<script>
import CommentReply from './components/comment-reply.vue'
import CommentPost from './components/comment-post.vue'
import CommentList from './components/comment-list.vue'
import LikeArticle from '@/components/like-article'
import CollectArticle from '@/components/collect-article'
import FollowUser from '@/components/follow-user'
import { ImagePreview } from 'vant'
import { getArticleById } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      commentCount: 0,
      isPopShow: false,
      isReplyShow: false,
      commentChosen: {} // 当前触发的评论对象
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleInfo()
  },
  mounted () {},
  methods: {
    async loadArticleInfo () {
      try {
        this.loading = true
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        // 渲染不是立即执行的，要在这里设定一个异步函数
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    previewImage () {
      const articleContent = this.$refs['article-detail']
      const images = articleContent.querySelectorAll('img')
      const imageSrc = []
      images.forEach((img, index) => {
        imageSrc.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images: imageSrc, // 预览的图片地址数组
            startPosition: index
          })
        }
      })
    },
    onPostMsg (data) {
      this.$refs.comment.addNewComment(data.new_obj)
      this.commentCount++
      this.isPopShow = false
    },
    onReply (comment) {
      this.isReplyShow = true
      this.commentChosen = comment
    }
  }
}
</script>

<style scoped lang="less">
@import './markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
      border: none;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    /deep/.van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
