<template>
  <a-button @click="handleBack" style="margin: 5px 0"><a-icon type="left" />返回</a-button>
</template>

<script>
export default {
  name: 'BackBtn',
  data () {
    return {}
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
