<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <!-- 选择文件 -->
    <input
      type="file"
      hidden
      accept="image/*"
      ref="file"
      @change="onFileChange"
    />
    <van-cell
      @click="isUpdateNameShow = true"
      title="昵称"
      :value="user.name"
      is-link
    />
    <van-cell
      title="性别"
      @click="isUpdateGenderShow = true"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />
    <!-- /个人信息 -->

    <!-- 编辑昵称的弹出层 -->
    <van-popup
      class="outerwrap"
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdateName
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close="isUpdateNameShow = false"
      />
    </van-popup>
    <!--/ 编辑昵称的弹出层 -->

    <!-- 编辑性别弹出层 -->
    <van-popup class="outerwrap" v-model="isUpdateGenderShow" position="bottom">
      <UpdateGender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
    </van-popup>
    <!-- /编辑性别弹出层 -->

    <!-- 编辑生日弹出层 -->
    <van-popup
      class="outerwrap"
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>
    <!-- /编辑生日弹出层 -->

    <!-- 编辑头像弹出层 -->
    <van-popup
      class="outerwrap"
      v-model="isUpdatePhotoShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- /编辑头像弹出层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null // 传递的头像blob数据
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('获取用户数据失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  line-height: 28px;
  .avatar {
    width: 60px;
    height: 60px;
    vertical-align: middle;
  }
  .outerwrap {
    background: #f5f7f9;
  }
}
</style>
