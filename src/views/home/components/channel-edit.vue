<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="channel-name">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        size="mini"
        round
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fixedChannel.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span slot="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="channel-name">频道推荐</div>
    </van-cell>
    <van-grid class="channel-grid" :gutter="10">
      <van-grid-item
        class="channel-item recommend-item"
        v-for="(reChannels, index) in recommendChannels"
        icon="plus"
        :key="index"
        :text="reChannels.name"
        @click="onAddChannel(reChannels)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fixedChannel: [0]
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    onAddChannel (reChannels) {
      this.$emit('onAddChannel', reChannels)
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        this.$emit('delMyChannel', channel, index, this.fixedChannel)
      } else {
        this.$emit('updateMyChannel', index)
      }
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 86px 0;
  .edit-btn {
    width: 104px;
    height: 47px;
    padding: 0 20px;
    font-size: 26px;
    color: #f85a5a;
  }
  .channel-name {
    font-size: 32px;
    line-height: 60px;
  }
  /deep/ .channel-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .van-icon-clear {
        position: absolute;
        right: -12px;
        top: -14px;
        z-index: 2;
        color: #cacaca;
        font-size: 34px;
      }
      .van-grid-item__text,
      span {
        margin-top: 0;
        font-size: 28px;
        color: #222;
      }
      .active {
        color: #f85a5a;
      }
    }
  }
  /deep/ .recommend-item {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        color: #333;
        margin-right: 6px;
        font-weight: bold;
      }
    }
  }
}
</style>
