<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      const localBirthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      try {
        await updateUserProfile({
          birthday: localBirthday
        })
        this.$toast.success('更新生日成功！')
        this.$emit('input', localBirthday)
        this.$emit('close')
      } catch (err) {
        this.$toast('更新生日失败!')
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
</style>
