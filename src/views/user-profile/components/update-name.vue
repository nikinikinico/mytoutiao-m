<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="name-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="12"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0 // 持续展示
      })
      try {
        if (!this.localName.length) {
          this.$toast('昵称不能为空！')
          return
        }
        await updateUserProfile({
          name: this.localName
        })
        this.$toast.success('更新昵称成功！')
        this.$emit('input', this.localName)
        this.$emit('close')
      } catch (err) {
        this.$toast('更新昵称失败')
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.update-name {
  .name-wrap {
    padding: 20px;
  }
}
</style>
