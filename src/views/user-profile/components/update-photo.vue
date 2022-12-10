<template>
  <div class="update-photo">
    <img :src="img" alt="" ref="img" />
    <div class="tool-bar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="submit" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: ''
    }
  },
  methods: {
    onConfirm () {
      // 基于服务端的裁切用getData方法获取裁切参数，基于客户端的使用如下方法
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0 // 持续展示
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        // 创建一个formData对象

        const { data } = await updateUserPhoto(formData)
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
        this.$toast.success('更新头像成功！')
      } catch (err) {
        this.$toast.fail('更新头像失败！')
      }
    }
  },
  computed: {},
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  }
}
</script>
<style scoped lang="less">
.update-photo {
  height: 100%;
  background-color: black;
  img {
    display: block;
    max-width: 100%;
  }
  .tool-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cancel,
    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 80px;
      font-size: 30px;
      color: #fff;
    }
  }
}
</style>
