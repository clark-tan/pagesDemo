<!--
 * @Autor: junhui li
 * @Date: 2020-12-09 15:13:31
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-09 15:37:08
 * @Description:
-->
<template>
  <a-modal
    ref="myModal"
    :title="modalData.title"
    :visible="modalData.visible"
    :confirm-loading="modalData.confirmLoading"
    @ok="handleModalOk"
    @cancel="handleModalCancel"
    :destroyOnClose="true"
    :maskClosable="false"
    :footer="null"
    width="800px"
  >
    <div style="min-height: 400px">
      <a-row type="flex" justify="center">
        <a-col :span="12">
          <a-steps :current="stepsCurrent" size="small">
            <a-step v-for="(item, index) in steps" :key="index" :title="item.title" />
          </a-steps>
        </a-col>
      </a-row>

      <div style="margin: 20px">
        <template v-if="stepsCurrent === 0">
          <a-descriptions title="" bordered size="small">
            <template v-for="(item, index) in modalData.content">
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
          <div style="margin-top: 10px">
            <template v-for="(item, index) in modalData.content">
              <span :key="index" v-if="item.key === 'JFZT'">
                <span>缴费状态：</span>
                <a-tag class="unStart">{{ item.value }}</a-tag>
                <a-button size="small" type="primary" @click="handleCharge(item.value)">在线缴费</a-button>
              </span>
              <span :key="index" v-if="item.key === 'YSJE'">
                <span style="margin-left: 20px">缴费金额：</span>
                <a-tag class="survey-done">{{ item.value }}</a-tag>
              </span>
            </template>
          </div>
        </template>
        <template v-if="stepsCurrent === 1">
          <a-row type="flex" justify="center">
            <a-col :span="10">
              <div style="text-align: center">
                <span style="color: rgba(0, 0, 0, 0.85);font-weight: bold;font-size: 16px;line-height: 1.5;">
                  <template>请用微信关注此公众号进行缴费</template>
                </span>
                <div style="margin: 20px">
                  <img :src="QRCOdeUrl" alt="二维码" width="200" height="200" />
                </div>
                <a-row type="flex" justify="center">
                  <a-col :span="12"><a-button type="default" @click="stepsCurrent--">返回缴费详情</a-button></a-col>
                  <a-col :span="12"><a-button type="primary" @click="handleBack">返回列表</a-button></a-col>
                </a-row>
              </div>
            </a-col>
          </a-row>
        </template>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { tableUtils } from '@/utils/index'
export default {
  name: 'UserPayment',
  data () {
    return {
      modalData: {
        title: '在线缴费',
        visible: false,
        confirmLoading: false,
        content: []
      },
      stepsCurrent: 0,
      steps: [{ title: '缴费详情' }, { title: '缴费方式' }],
      QRCOdeUrl: ''
    }
  },
  mounted () {
    this.QueryEntrust(6)
    this.QRCOdeUrl = this.pageInfo.qrcode || ''
  },
  methods: {
    // type 1代表预受理，2代表正式受理,3材料补充,4代表查看上传报告的数据（苏州）,5满意度评价
    QueryEntrust (type) {
      this.fakeData = []
      this.onSpinning = true
      this.$WebApi.busiProcess['QueryEntrust']({
        type: type,
        userid: this.user.userID
      })
        .then(res => {
          console.log(res)
          this.fakeData = res
          const data = this.fakeData
          const rowsList = data.rowsList
          this.pagination.total = rowsList.length
          this.columns = tableUtils.handleColumns(data)
          this.data = rowsList
          this.showData = JSON.parse(JSON.stringify(this.data)).slice(0, this.pagination.pageSize)
          this.onSpinning = false
        })
        .catch(err => {
          console.log(err)
          this.onSpinning = false
        })
    },
    handleModalOk () {
      this.modalData.visible = false
    },
    handleModalCancel () {
      this.modalData.visible = false
      this.stepsCurrent = 0
    },
    handleCharge (chargeData) {
      console.log(chargeData)
      // this.JFData = chargeData
      // const data = chargeData.JFQD
      // this.JFColumns = tableUtils.handleColumns(data)
      // this.JFTableData = data.rowsList
      this.stepsCurrent++
    },
    handleBack () {
      // const _this = this
      // routeUtils.reloadComponent(_this)
      // TODO: 等有接口后，重新获取table数据
      this.QueryEntrust(6)
      this.handleModalOk()
      this.stepsCurrent = 0
    }
  }
}
</script>

<style>

</style>
