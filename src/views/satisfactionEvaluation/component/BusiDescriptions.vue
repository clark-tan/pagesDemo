<!--
 * @Description: description 业务组件，内部包含table等
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-12 14:48:43
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-09 11:17:09
-->

<template>
  <div class="busiDesc">
    <div v-for="(items, indexs) in listData" :key="indexs">
      <a-card title :bordered="false" size="small">
        <a-descriptions size="small" bordered>
          <a-row slot="title">
            <slot name="descTitle" :currentList="items"></slot>
          </a-row>
          <template v-for="(item, index) in items">
            <a-descriptions-item
              v-if="
                item.key != 'CREATETIME' &&
                  item.key != 'DQZT' &&
                  item.key != 'GCMC' &&
                  item.key != 'RID' &&
                  item.key != 'MYDPJ'
              "
              :key="index"
              :label="item.label"
              :span="item.span"
            >{{ item.value || '-' }}
            </a-descriptions-item>
          </template>
        </a-descriptions>
        <template v-for="(item, index) in items">
          <div :key="index" v-if="item.key == 'MYDPJ' && item.value && item.value['rowsList']">
            <div class="wtsxClass">
              {{ item.label
              }}<a-button
                style="margin-left:10px"
                szie="small"
                type="primary"
                @click="oneClickAll(item.value, items)"
                :disabled="
                  !(
                    orginData['rowsList'][indexs]['DQZT'] === '已完成' ||
                    orginData['rowsList'][indexs]['DQZT'] === '测量完成'
                  )
                "
              >一键好评</a-button
              >
            </div>
            <slot name="table" :tableData="{ tableData: item.value, items: items, descData: descData }"></slot>
          </div>
        </template>
      </a-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BusiTable from '@/views/businessProcess/component/BusiTable'
export default {
  name: 'BusiDescriptions',
  components: { 'busi-table': BusiTable },
  props: {
    listData: {
      default: () => [],
      type: Array,
      required: true
    },
    orginData: {
      default: () => {},
      type: Object,
      required: true
    }
  },
  inject: ['reload'],
  data () {
    return {
      descData: [],
      modal: {
        title: '满意度评价',
        visible: false,
        confirmLoading: false
      },
      materialsData: [],
      FWPY: '',
      submitData: {}
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  watch: {},
  created () {},
  mounted () {
    this.GetSatisfactionItem()
  },
  methods: {
    GetSatisfactionItem () {
      this.$WebApi.satisfactionEvaluation['GetSatisfactionItem']()
        .then(res => {
          if (res && res.length > 0) {
            this.descData = res.map((item, index) => {
              return {
                KEY: item['KEY'],
                LABLE: item['LABLE'],
                VALUE: JSON.parse(JSON.stringify(item['VALUE'])).reverse(),
                modalValue: item['VALUE'].length
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击评价按钮回调
    handlePJClick (data) {
      console.log(data)
      const temp = []
      if (data && data.length > 0) {
        data.map((item, index) => {
          if (item.key === 'XMBH') {
            temp.push({
              ...item,
              span: 3
            })
          }
          if (item.key === 'XMMC') {
            temp.push({
              ...item,
              span: 3
            })
          }
          if (item.key === 'WTDW') {
            temp.push({
              ...item,
              span: 3
            })
          }
          if (item.key === 'XMDD') {
            temp.push({
              ...item,
              span: 3
            })
          }
          if (item.key === 'RID') {
            temp.push({
              ...item,
              span: 3
            })
          }
        })
      }
      this.materialsData = temp
      this.modal.visible = true
    },
    handleOk (e) {
      const orginObj = {}
      this.materialsData.map((item, index) => {
        orginObj[item['key']] = item['value']
      })
      orginObj['FWPY'] = this.FWPY
      orginObj['USERID'] = this.user.userID
      this.descData.map((item, index) => {
        const arr = JSON.parse(JSON.stringify(item['VALUE']))
        orginObj[item['KEY']] = arr[item['modalValue'] - 1]
      })
      this.submitData = orginObj
      this.SubmitSatisfactionAppraise(orginObj)
    },
    SubmitSatisfactionAppraise (orginObj) {
      this.modal.confirmLoading = true
      this.$WebApi.satisfactionEvaluation['SubmitSatisfactionAppraise']({
        data: JSON.stringify(orginObj)
      })
        .then(res => {
          this.reload()
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.modal.confirmLoading = false
          this.modal.visible = false
        })
    },
    handleCancel (e) {
      this.modal.visible = false
    },
    oneClickAll (tableData, lists) {
      let currentType = ''
      const submitArray = []
      const commonData = {}
      // eslint-disable-next-line camelcase
      let MYDPJ_list = []
      lists.map((item, index) => {
        if (item.key === 'DQZT') {
          currentType = item.value
        }
        if (item.key === 'YWBH') {
          commonData[item.key] = item.value
        }
        if (item.key === 'MYDPJ') {
          // eslint-disable-next-line camelcase
          MYDPJ_list = item.value.rowsList
        }
      })

      if (currentType === '已完成' || currentType === '测量完成') {
        commonData['USERID'] = this.user.userID
        this.descData.map((item, index) => {
          const arr = JSON.parse(JSON.stringify(item['VALUE']))
          commonData[item['KEY']] = arr[arr.length - 1]
        })
        MYDPJ_list.map((item, index) => {
          submitArray.push({
            CHDW: item.CHDW,
            CLSX: item.CLSX,
            FWPY: '',
            ...commonData
          })
        })
        submitArray.map((item, index) => {
          this.SubmitSatisfactionAppraise(item)
        })
      } else {
        this.$message.warning('当前工程未全部完成,不能一键好评！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.busiDesc {
  background: @diy-global-bg-color;
}
.rate {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}
.service {
  margin-top: 10px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}
/deep/ .ant-rate {
  margin-left: 11px;
}
/deep/ .ant-card-small > .ant-card-body {
  padding: 20px;
}
/deep/ .ant-descriptions-title {
  margin: 0;
  padding: 10px;
  vertical-align: middle;
  background: @diy-description-header-bg-color;
  font-size: 14px;
  font-weight: bold;
}
/deep/ .ant-descriptions-item-label {
  width: 15%;
  text-align: center;
  word-break: break-all;
}
/deep/ .ant-descriptions-item-content {
  width: 35%;
  word-break: break-all;
}
/deep/ .ant-descriptions-bordered .ant-descriptions-item-label {
  background-color: @diy-description-border-bg-color;
}
.wtsxClass {
  text-align: center;
  font-weight: bold;
  padding: 8px;
  border: 1px solid @diy-description-border-bg-color;
  border-top: 0;
  border-bottom: 0;
}
</style>
