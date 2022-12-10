<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- 消息内容 -->
    <van-cell-group class="chat-list" ref="chat-list">
      <van-cell
        v-for="(item, index) in messages"
        :key="index"
        :title="item.msg"
      />
    </van-cell-group>
    <!-- /消息内容 -->

    <!-- 底部编辑栏 -->
    <div class="chat-edit">
      <van-field :border="none" v-model="message" placeholder="请输入消息" />
      <van-button class="sendbtn" type="primary" size="small" @click="onSend"
        >发送</van-button
      >
    </div>
    <!-- /底部编辑栏 -->
  </div>
</template>

<script>
import store from '@/store'
import io from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'UserChat',
  components: {},
  props: {},
  data () {
    return {
      message: '',
      none: '',
      socket: null,
      messages: getItem('chat-messages') || [] // 消息列表
    }
  },
  methods: {
    onSend () {
      // socket.on('消息类型'，function(date){data消息})
      const data = { msg: this.message, timestamp: Date.now() }
      this.socket.emit('message', data)
      this.message = ''
      this.messages.push(data)
    },
    scrollToBottom () {
      const list = this.$refs['chat-list']
      list.scrollTop = list.scrollHeight
    }
  },
  watch: {
    messages: {
      handler () {
        setItem('chat-messages', this.messages)
        // 如果想要在操作数据之后立即操作数据影响的视图dom,需要用$nextTick
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      },
      immediate: true
    }
  },
  created () {
    const socket = io('http://toutiao.itheima.net', {
      query: {
        token: store.state.user.token
      },
      transports: ['websocket']
    })
    this.socket = socket
    // 监听返回来的消息
    socket.on('message', (data) => {
      this.messages.push(data)
    })
  }
}
</script>
<style scoped lang="less">
.user-chat {
  .chat-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 98px;
    overflow-y: auto;
  }
  .chat-edit {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sendbtn {
      margin-left: 10px;
      width: 150px;
      height: 70px;
      font-size: 24px;
    }
  }
}
</style>
