<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="性别"
      :columns="columns"
      :default-index="localGender"
      @cancel="$emit('close')"
      @confirm="onComfirm"
      @change="onPickerChange"
    ></van-picker>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    } // 性别
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    async onComfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0 // 持续展示
      })
      try {
        await updateUserProfile({
          gender: this.localGender
        })
        this.$toast.success('更新性别成功！')
        this.$emit('input', this.localGender)
        this.$emit('close')
      } catch (err) {
        this.$toast('更新性别失败')
      }
    },
    onPickerChange (picker, value, index) {
      this.localGender = index
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
</style>
