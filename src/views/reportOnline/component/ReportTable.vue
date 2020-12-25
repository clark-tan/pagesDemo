<!--
 * @Description: 在线看报告表格
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-12 16:07:02
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-06-18 13:42:16
-->

<!--  -->
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
      <template slot="CLZT" slot-scope="text, record">
        <a-tag v-if="text == '未开始'" class="unStart">未开始</a-tag>
        <a-tag v-else-if="text == '测量中'" class="other">测量中</a-tag>
        <a-tag v-else-if="text == '已完成'" class="survey-done">已完成</a-tag>
        <template v-else-if="text == '暂停中'">
          <a-tag class="stop">{{ text }}</a-tag>
          <a-button type="link" @click="handleWhy(record)">查看原因</a-button>
        </template>
        <a-tag v-else class="other">{{ text }}</a-tag>
      </template>
      <template slot="CHDW" slot-scope="text, record">
        <a-button type="link" @click="handleGroupMore(record)">{{ text }}</a-button>
      </template>
      <template slot="CLBG" slot-scope="text, record">
        <span v-if="text != '查看'">{{ text }}</span>
        <a-button v-else type="link" @click="handleQueryReport(record)">查看</a-button>
      </template>
    </a-table>

    <a-modal
      v-model="clztVisible"
      :title="modalData.title"
      @ok="handleClztOk"
      @cancel="handleClztCancle"
      width="600px"
      size="small"
      :footer="null"
    >
      <a-spin :spinning="modalSpinning" tip="加载中...">
        <a-descriptions title size="small" bordered v-if="modalData['descArray'] && modalData['descArray'].length > 0">
          <template v-for="(item, index) in modalData['descArray']">
            <a-descriptions-item
              v-if="item['key'] != 'XGFJ' && item['key'] != 'CLBG'"
              :key="index"
              :span="item['span']"
              :label="item['label']"
            >{{ item['value'] }}</a-descriptions-item
            >
            <a-descriptions-item v-if="item['key'] == 'XGFJ'" :key="index" :span="item['span']" :label="item['label']">
              <div v-for="(it, ind) in item.value" :key="ind">
                <a type="link" :href="it.FJLJ" target="_blank">{{ ind + 1 }}、{{ it.FJMC }}</a>
              </div>
            </a-descriptions-item>
            <a-descriptions-item v-if="item['key'] == 'CLBG'" :key="index" :span="item['span']" :label="item['label']">
              <div v-for="(it, ind) in item.value" :key="ind">
                <span
                >{{ ind + 1 }}、<a :href="it.FJLJ" target="_blank"> {{ it.FJMC }}</a>
                </span>
                <a-button
                  style="float: right"
                  size="small"
                  type="link"
                  icon="download"
                  :href="it.FJLJ"
                  target="_blank"
                >下载</a-button
                >
              </div>
            </a-descriptions-item>
          </template>
        </a-descriptions>
        <a-empty v-else></a-empty>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'ReportTable',
  components: {},
  props: {
    tableData: {
      default: () => {},
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tableLoading: false,
      columns: [],
      data: [],
      clztVisible: false,
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
  computed: {},
  watch: {
    tableData: {
      handler (val, oldVal) {
        if (!this._.isEmpty(val)) {
          console.log(val)
          this.handlerDataChange()
        }
      },
      deep: true
    }
  },
  created () {},
  mounted () {
    this.handlerDataChange()
  },
  methods: {
    getTableColumn (obj) {
      if (!this._.isEmpty(obj)) {
        const columns = obj.columns
        const hideColumns = obj.hideColumns
        const outColumns = columns.filter(items => !hideColumns.some(item => item === items.key))
        return outColumns.map((item, index) => {
          return {
            dataIndex: item['key'],
            key: item['key'],
            title: item['label'],
            scopedSlots: { customRender: item['key'] }
          }
        })
      } else {
        return []
      }
    },
    getTableData (obj) {
      // console.log(obj)
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
    handleClztOk () {
      this.clztVisible = false
    },
    handleClztCancle () {
      this.clztVisible = false
    },
    handleWhy (record) {
      this.tableId = record['TABLE001ID']
      this.tableCLSX = record['CLSX']
      this.GetPauseReason()
      this.clztVisible = true
    },
    handleGroupMore (record) {
      this.tableChdw = record['CHDW']
      this.GetSurveyCompanyInfo()
      this.clztVisible = true
    },
    handleQueryReport (record) {
      this.tableId = record['TABLE008ID']
      this.GetSurveyReport()
      this.clztVisible = true
    },
    GetPauseReason () {
      this.modalSpinning = true
      this.$WebApi.reportOnline['GetPauseReason']({
        table001id: this.tableId,
        clsx: this.tableCLSX
      })
        .then(res => {
          const object = res
          if (!this._.isEmpty(object)) {
            this.modalData = this.handlePauseReason(object)
          }
          this.modalSpinning = false
        })
        .catch(err => {
          this.modalSpinning = false
          console.log(err)
        })
    },
    GetSurveyCompanyInfo () {
      this.modalSpinning = true
      this.$WebApi.reportOnline['GetSurveyCompanyInfo']({
        chdw: this.tableChdw
      })
        .then(res => {
          const object = res
          if (!this._.isEmpty(object)) {
            this.modalData = this.handleSurveyCompanyInfo(object)
          }
          this.modalSpinning = false
        })
        .catch(err => {
          this.modalSpinning = false
          console.log(err)
        })
    },
    GetSurveyReport () {
      this.modalSpinning = true
      this.$WebApi.reportOnline['GetSurveyReport']({
        table008id: this.tableId
      })
        .then(res => {
          const object = res
          if (!this._.isEmpty(object)) {
            this.modalData = this.handleSurveyReport(object)
          }
          this.modalSpinning = false
        })
        .catch(err => {
          this.modalSpinning = false
          console.log(err)
        })
    },
    handleSurveyReport (object) {
      const tempColumn = []
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (key === 'CHDW') {
            tempColumn.push({
              label: '测绘单位',
              value: object[key],
              key: key,
              span: 3
            })
          }
          if (key === 'CLBG') {
            tempColumn.push({
              label: '测量报告',
              value: object[key],
              key: key,
              span: 3
            })
          }
          if (key === 'CLSX') {
            tempColumn.push({
              label: '测量事项',
              value: object[key],
              key: key,
              span: 3
            })
          }
          if (key === 'SCSJ') {
            tempColumn.push({
              label: '上传时间',
              value: object[key],
              key: key,
              span: 3
            })
          }
        }
      }
      return {
        title: '查看测量报告',
        descArray: tempColumn
      }
    },
    handleSurveyCompanyInfo (object) {
      const tempColumn = []
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (key === 'DWDZ') {
            tempColumn.push({
              label: '单位地址',
              value: object[key],
              key: key,
              span: 3
            })
          }
          if (key === 'DWMC') {
            tempColumn.push({
              label: '单位名称',
              value: object[key],
              key: key,
              span: 3
            })
          }
          if (key === 'LXDH') {
            tempColumn.push({
              label: '联系电话',
              value: object[key],
              key: key,
              span: 3
            })
          }
          if (key === 'LXR') {
            tempColumn.push({
              label: '联系人',
              value: object[key],
              key: key,
              span: 3
            })
          }
        }
      }
      return {
        title: '测绘服务机构信息',
        descArray: tempColumn
      }
    },
    handlePauseReason (object) {
      const tempColumn = []
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (key === 'CLDW') {
            tempColumn.push({
              label: '测绘单位',
              value: object[key],
              key: key,
              span: 3
            })
          }
          if (key === 'CLSX') {
            tempColumn.push({
              label: '测量事项',
              value: object[key],
              key: key,
              span: 3
            })
          }
          if (key === 'LJYZT') {
            tempColumn.push({
              label: '累计已暂停',
              value: object[key],
              key: key,
              span: 3
            })
          }
          if (key === 'XGFJ') {
            tempColumn.push({
              label: '相关附件',
              value: object[key],
              key: key,
              span: 3
            })
          }
          if (key === 'ZTSJ') {
            tempColumn.push({
              label: '暂停时间',
              value: object[key],
              key: key,
              span: 3
            })
          }
          if (key === 'ZTYY') {
            tempColumn.push({
              label: '暂停原因',
              value: object[key],
              key: key,
              span: 3
            })
          }
        }
      }
      return {
        title: '查看暂停原因',
        descArray: tempColumn
      }
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
.stop {
  background-color: @diy-stop-color;
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
  width: 20%;
  text-align: center;
}

/deep/ .ant-descriptions-item-content {
  width: 80%;
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
