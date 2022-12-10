<template>
  <div class="my-container">
    <!-- 已登录界面 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avater" fit="cover" round :src="userInfo.photo" />
          <span class="info">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button class="edit-btn" round size="mini" to="/user/profile"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="item">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="item">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="item">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="item">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录界面 -->
    <div class="header not-login" v-else>
      <div
        class="login-btn"
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/my'
            }
          })
        "
      >
        <img src="~@/assets/mobile.png" class="mobile-img" />
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- 收藏+历史 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link to="/user/userchat" />
    <van-cell
      class="logout-cell"
      title="退出登录"
      border
      clickable
      v-if="user"
      @click="logout"
    />
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'MyPage',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.$store.state.user) {
      this.LoadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout () {
      this.$dialog
        .confirm({
          message: '确认退出登录吗'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async LoadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后再试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    color: #fff;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        .avater {
          width: 132px;
          height: 132px;
          margin-right: 22px;
          border: 4px solid #fff;
        }
      }
    }
    .data-stats {
      height: 130px;
      display: flex;
      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          font-size: 36px;
        }
        .item {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 9px;
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .mb-9 {
    margin-bottom: 9px;
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
    font-size: 29px;
  }
}
</style>
