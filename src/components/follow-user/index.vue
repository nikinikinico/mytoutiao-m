<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="followLoading"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="followLoading"
    >关注</van-button
  >
</template>

<script>
import { addFollower, deleteFollower } from '@/api/user'
export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    aut_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  methods: {
    async onFollow () {
      this.followLoading = true
      try {
        if (this.value) {
          await deleteFollower(this.aut_id)
        } else {
          await addFollower(this.aut_id)
        }
        this.$emit('input', !this.value)
      } catch (err) {
        let msg = ''
        if (err.response && err.response.status === 400) {
          msg = '自己不能关注自己！'
        } else {
          msg = '操作失败，请重试'
        }
        this.$toast(msg)
      }
      this.followLoading = false
    }
  }
}
</script>

<style>
</style>
