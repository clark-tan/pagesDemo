<!--
 * @Description: 满意度调查table逻辑抽取
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-15 09:22:00
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-08-17 14:05:50
-->
<template>
  <div>
    <a-table
      size="small"
      :columns="columns"
      :data-source="data ? data : []"
      :loading="tableLoading"
      :pagination="false"
      :rowKey="
        record => {
          return record['CLSX']
        }
      "
    >
      <template slot="CLZT" slot-scope="text">
        <a-tag v-if="text == '未开始'" class="unStart">未开始</a-tag>
        <a-tag v-else-if="text == '测量中'" class="other">测量中</a-tag>
        <a-tag v-else-if="text == '已完成'" class="survey-done">已完成</a-tag>
        <a-tag v-else class="other">{{ text }}</a-tag>
      </template>
      <template slot="MYDPJ" slot-scope="text, record">
        <template v-if="text == '点击评价'">
          <a-button type="link" @click="showModal(text, record)">{{ text }}</a-button>
          <a-button szie="small" type="link" @click="oneClickOne(text, record)">一键好评</a-button>
        </template>

        <span v-if="text == '待完成后评价'">{{ text }}</span>
        <template v-if="text != '点击评价' && text != '待完成后评价'">
          <template v-for="(item, index) in text.split('、')">
            <template v-if="index % 2 === 0">
              <div :key="index">
                <a>{{ item }} </a>
                <template v-if="text.split('、')[index + 1]">
                  <a>/ {{ text.split('、')[index + 1] }}</a></template
                >
              </div>
            </template>
          </template>
        </template>
      </template>
    </a-table>

    <a-modal
      :title="programTitle"
      :visible="satisfactionBox"
      :confirm-loading="confirmLoading"
      okText="提交"
      @ok="handleOk"
      @cancel="handleCancel"
      width="700px"
    >
      <a-descriptions size="small">
        <template v-for="(item, index) in materialsData">
          <a-descriptions-item v-if="item['key'] != 'YWBH'" :key="index" :label="item.label" :span="item.span">{{
            item.value
          }}</a-descriptions-item>
        </template>
      </a-descriptions>
      <div class="rate">
        <template v-for="(item, index) in descData">
          <a-row :key="index" style="width: 100%">
            <a-col :span="5" style="text-align: end;line-height: 33px;">{{ item['LABLE'] }}：</a-col>
            <a-col :span="10">
              <a-rate
                :count="item['VALUE'].length"
                v-model="item['modalValue']"
                :tooltips="item['VALUE']"
                :allow-clear="false"
              ></a-rate
              ></a-col>
            <a-col :span="6" style="line-height: 33px;">{{ item['VALUE'][item['modalValue'] - 1] }}</a-col>
          </a-row>
        </template>
      </div>
      <a-row>
        <a-col :span="5" style="text-align: end">
          <span>服务评语：</span>
        </a-col>
        <a-col :span="17">
          <a-textarea placeholder="请输入服务评语" v-model="FWPY" :rows="4" />
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SeTable',
  components: {},
  props: {
    tableData: {
      default: () => {},
      type: Object,
      required: true
    },
    descData: {
      default: () => [],
      type: Array,
      required: true
    },
    allItem: {
      default: () => [],
      type: Array,
      required: true
    }
  },
  data () {
    return {
      ywbh: '',
      programTitle: '满意度评价',
      confirmLoading: false,
      tableLoading: false,
      materialsData: [],
      submitData: {},
      FWPY: '',
      columns: [],
      data: [],
      satisfactionBox: false,
      modalData: {
        title: '',
        descArray: []
      },
      modalSpinning: false,
      tableId: '',
      tableCLSX: '',
      tableChdw: ''
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  inject: ['reload'],
  mounted () {
    this.handlerDataChange()
    this.ywbh = this.getYWBH()
  },
  watch: {
    tableData: {
      handler (val, oldVal) {
        if (!this._.isEmpty(val)) {
          this.handlerDataChange()
        }
      },
      deep: true
    },
    allItem: {
      handler (val, oldVal) {
        if (!this._.isEmpty(val)) {
          this.ywbh = this.getYWBH()
        }
      },
      deep: true
    }
  },
  created () {},

  methods: {
    SubmitSatisfactionAppraise () {
      this.confirmLoading = true
      this.$WebApi.satisfactionEvaluation['SubmitSatisfactionAppraise']({
        data: JSON.stringify(this.submitData)
      })
        .then(res => {
          this.reload()
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.confirmLoading = false
          this.satisfactionBox = false
        })
    },
    getTableColumn (obj) {
      if (!this._.isEmpty(obj)) {
        const columns = obj.columns
        const hideColumns = obj.hideColumns
        const outColumns = columns.filter(items => !hideColumns.some(item => item === items.key))
        return outColumns.map((item, index) => {
          if (item.key === 'MYDPJ') {
            return {
              dataIndex: item['key'],
              key: item['key'],
              title: item['label'],
              width: '350px',
              scopedSlots: { customRender: item['key'] }
            }
          } else {
            return {
              dataIndex: item['key'],
              key: item['key'],
              title: item['label'],
              scopedSlots: { customRender: item['key'] }
            }
          }
        })
      } else {
        return []
      }
    },
    getTableData (obj) {
      if (!this._.isEmpty(obj)) {
        return obj.rowsList
      } else {
        return []
      }
    },
    handlerDataChange () {
      this.tableLoading = true
      const tableData = JSON.parse(JSON.stringify(this.tableData))
      this.columns = this.getTableColumn(tableData)
      this.data = this.getTableData(tableData)
      this.tableLoading = false
    },
    oneClickOne (text, record) {
      const orginObj = {}
      orginObj.YWBH = this.ywbh
      orginObj.CHDW = record.CHDW
      orginObj.CLSX = record.CLSX
      orginObj.FWPY = ''
      orginObj['USERID'] = this.user.userID
      this.descData.map((item, index) => {
        const arr = JSON.parse(JSON.stringify(item['VALUE']))
        orginObj[item['KEY']] = arr[arr.length - 1]
      })
      this.submitData = orginObj
      this.SubmitSatisfactionAppraise()
    },
    showModal (text, record) {
      const ywbhValue = this.ywbh
      if (!this._.isEmpty(record)) {
        const temp = []
        const object = record
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            if (key === 'CLSX') {
              temp.push({
                label: '测量事项',
                value: object[key],
                key: key,
                span: 3
              })
            }
            if (key === 'CHDW') {
              temp.push({
                label: '测绘单位',
                value: object[key],
                key: key,
                span: 3
              })
            }
          }
        }
        temp.push({
          label: '业务编号',
          value: ywbhValue,
          key: 'YWBH',
          span: 3
        })
        this.materialsData = temp
        this.satisfactionBox = true
      }
    },
    getYWBH () {
      let temp = ''
      if (!Window._.isEmpty(this.allItem)) {
        this.allItem.map((item, index) => {
          if (item.key === 'YWBH') {
            temp = item.value
          }
        })
      } else {
        temp = ''
      }
      return temp
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
      this.SubmitSatisfactionAppraise()
    },
    handleCancel (e) {
      this.satisfactionBox = false
    }
  }
}
</script>

<style scoped lang="less">
.unStart {
  background-color: @diy-unStart-color;
  color: white;
}
.survey-done {
  background-color: @diy-survey-done-color;
  color: white;
}
.other {
  background-color: @diy-other-color;
  color: white;
}
/deep/ .ant-table-small > .ant-table-content > .ant-table-body > table {
  > .ant-table-thead > tr > th {
    text-align: center;
  }
  > .ant-table-tbody > tr > td {
    text-align: center;
  }
}
/deep/ .ant-table-small > .ant-table-content > .ant-table-body {
  margin: 0;
}
/deep/ .ant-descriptions-item-label {
  margin-left: 98px;
}
.rate {
  font-size: 14px;

  color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .rate-all {
    .rate-label {
      display: inline-flex;
      min-width: 100px;
      align-self: flex-end;
    }
  }
}
/deep/ .ant-row {
  margin: 10px 0 0 28px;
  color: rgba(0, 0, 0, 0.85);
}
/deep/ .ant-col-4 {
  width: 75px;
}
/deep/ .ant-modal-header {
  padding: 10px 24px;
  color: rgba(0, 0, 0, 0.65);
  background: @diy-modal-header-bg-color;
  border-bottom: 1px solid @diy-modal-border-color;
  border-radius: 4px 4px 0 0;
  .ant-modal-title {
    margin: 0;
    color: rgba(255, 255, 255, 1);
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    word-wrap: break-word;
  }
}
/deep/ .ant-modal-close-x {
  display: block;
  width: 36px;
  height: 45px;
  font-size: 16px;
  font-style: normal;
  line-height: 45px;
  text-align: center;
  text-transform: none;
  text-rendering: auto;
  color: white;
}
</style>
