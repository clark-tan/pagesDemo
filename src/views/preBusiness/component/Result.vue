<!--
 * @Description:  项目委托结果页面
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-09-03 16:16:28
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-09-22 17:52:20
-->

<template>
  <div>
    <template v-if="isReload === false">
      <a-result v-if="submitStatus === 'sync'" title="预约提交中...">
        <template #icon>
          <a-icon type="sync" spin />
        </template>
      </a-result>
      <a-result v-if="submitStatus === 'success'" status="success" title="您提交成功" sub-title=""></a-result>
      <a-result v-if="submitStatus === 'error'" status="error" title="您提交失败" sub-title=""></a-result>
      <div v-if="submitStatus != 'sync'" style="text-align: center;">
        <a-row :gutter="4" type="flex" justify="center" align="middle">
          <a-col :span="4"><a-button type="primary" @click="hadleRefresh">继续申请</a-button></a-col>
          <a-col :span="4"><a-button type="primary" @click="handleQueryMore">查看申请详情</a-button></a-col>
        </a-row>
      </div>
    </template>
  </div>
</template>

<script>
import { routeUtils } from '@/utils/index'
export default {
  name: 'Result',
  components: {},
  props: {
    submitStatus: {
      default: 'sync',
      type: String,
      required: true
    }
  },
  data () {
    return {
      isReload: false
    }
  },
  computed: {},
  watch: {
    submitStatus (newVal, oldVal) {
      this.isReload = true
      this.$nextTick(() => {
        this.isReload = false
      })
    }
  },
  created () {
    this.handleSubmit()
  },
  methods: {
    handleQueryMore () {
      this.$router.push({
        name: 'businessProcess',
        params: {
          hasRefresh: true
        }
      })
    },
    hadleRefresh () {
      const _this = this
      routeUtils.reloadComponent(_this)
    },
    handleSubmit () {
      this.$emit('submitAllData')
    }
  }
}
</script>

<style scoped lang="less"></style>
