<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="mini"
        round
        icon="search"
        @click="$router.push('/search')"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 切换栏 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id">
        <ArticleList :channel="obj" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <!-- 汉堡按钮 -->
      <div
        class="hambuger-btn"
        slot="nav-right"
        @click="isChannelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /切换栏 -->
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      close-icon-position="top-left"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        :myChannels="channels"
        :active="active"
        @onAddChannel="onAddChannel"
        @updateMyChannel="updateMyChannel"
        @delMyChannel="delMyChannel"
        @closeEdit="isChannelEditShow = false"
      ></ChannelEdit>
    </van-popup>
    <!-- /弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import { addUserChannels, deleteUserChannel } from '@/api/channel'
import { setItem, getItem } from '@/utils/storage'
import { mapState } from 'vuex'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false // 控制弹出层展示
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        let temchannels = []
        if (this.user) {
          const { data } = await getUserChannels()
          temchannels = data.data.channels
        } else {
          if (getItem('TOUTIAO_CHANNELS')) {
            temchannels = getItem('TOUTIAO_CHANNELS')
          } else {
            const { data } = await getUserChannels()
            temchannels = data.data.channels
          }
        }
        this.channels = temchannels
      } catch (err) {
        this.$toast('获取用户频道失败')
      }
    },
    async onAddChannel (reChannels) {
      this.channels.push(reChannels)
      if (this.user) {
        try {
          await addUserChannels({
            id: reChannels.id,
            seq: this.channels.length
          })
        } catch (err) {
          this.$toast('保存频道失败，请稍后重试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    },
    updateMyChannel (index) {
      this.active = index
      this.isChannelEditShow = false
    },
    delMyChannel (channel, index, fixedChannel) {
      if (fixedChannel.includes(channel.id)) {
        return
      }
      this.channels.splice(index, 1)
      if (index < this.active) {
        this.active--
      }
      this.delChanel(channel.id)
    },
    // 本地或在线删除频道数据
    async delChanel (channelId) {
      if (this.user) {
        try {
          await deleteUserChannel(channelId)
        } catch (err) {
          this.$toast('删除频道失败，请稍后重试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  .page-nav-bar {
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      font-size: 28px;
      border: none;
      .van-icon {
        font-size: 32px;
      }
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 83px;
      .van-tabs__line {
        background-color: #3296fa;
        width: 31px;
        height: 6px;
        margin-bottom: 9px;
      }
    }
    .van-tab {
      min-width: 192px;
      border-right: 1px solid #edeff3;
      color: #777;
    }
    .van-tab--active {
      color: #333333;
    }
    .placeholder {
      // 默认是1，改为0可以不参与空间计算
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hambuger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
