<template>
  <van-cell
    class="article-item"
    :to="{ name: 'article', params: { articleId: article.art_id } }"
  >
    <!-- 标题 -->
    <div class="title van-multi-ellipsis--l2" slot="title">
      {{ article.title }}
    </div>
    <!-- 下方文本信息 -->
    <div slot="label" class="label-content">
      <!-- 三张图片 -->
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image fit="cover" :src="img" />
        </div>
      </div>
      <!-- 作者时间等 -->
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 右边单张图片 -->
    <van-image
      class="right-cover"
      slot="default"
      fit="cover"
      v-if="article.cover.type === 1"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
    .right-cover {
      width: 232px;
      height: 146px;
    }
  }
  .label-info-wrap span {
    font-size: 23px;
    color: #b4b4b4;
    &:not(:last-child) {
      margin-right: 25px;
    }
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      &:not(last-child) {
        margin-right: 3px;
        .van-image {
          width: 232px;
          height: 146px;
        }
      }
    }
  }
}
</style>
