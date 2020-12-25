<!--
 * @Autor: junhui li
 * @Date: 2020-12-09 15:13:02
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-09 15:44:13
 * @Description:
-->
<template>
  <a-modal
    ref="servicedModal"
    :title="servicedModalData.title"
    :visible="servicedModalData.visible"
    :confirm-loading="servicedModalData.confirmLoading"
    @ok="handleServicedModalOk"
    @cancel="handleServicedModalCancel"
    :destroyOnClose="true"
    :maskClosable="false"
    :footer="null"
    width="800px"
  >
    <a-descriptions title="" bordered size="small">
      <template v-for="(item, index) in servicedModalData.content">
        <a-descriptions-item
          v-if="item.key != 'JFZT' && item.key != 'YSJE'"
          :key="index"
          :label="item.label"
          :span="1.5"
        >
          {{ item.value || '-' }}
        </a-descriptions-item>
      </template>
    </a-descriptions>
    <div style="margin-top: 20px;">
      <template v-for="(item, index) in servicedModalData.content">
        <span :key="index" v-if="item.key === 'JFZT'">
          <span>缴费状态：</span>
          <a-tag class="survey-done">{{ item.value }}</a-tag>
        </span>
        <span :key="index" v-if="item.key === 'YSJE'">
          <span style="margin-left: 20px">缴费金额：</span>
          <a-tag class="survey-done">{{ item.value }}</a-tag>
        </span>
      </template>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'PaymentQuery',
  data () {
    return {
      servicedModalData: {
        title: '已缴费详情',
        visible: false,
        confirmLoading: false,
        content: []
      }
    }
  },
  methods: {
    andleServicedModalOk () {
      this.servicedModalData.visible = false
    },
    handleServicedModalCancel () {
      this.servicedModalData.visible = false
    }
  }
}
</script>

<style>

</style>
