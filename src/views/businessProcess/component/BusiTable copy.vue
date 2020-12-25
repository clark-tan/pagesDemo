<!--
 * @Description: Table 包含进度查询一些特殊逻辑
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-27 14:46:05
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 16:09:19
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
          return record['index']
        }
      "
    >
      <template slot="FJLIST" slot-scope="text, record">
        <template v-if="record.FJLIST.length > 0">
          <template v-for="(item, index) in record.FJLIST">
            <div :key="index">
              <a :href="item.FJURL" target="_blank">{{ item.FJNAME || '-' }}</a>
            </div>
          </template>
        </template>
        <div v-else>-</div>
      </template>
    </a-table>
    <a-modal
      v-model="clztVisible"
      :title="modalData.title"
      :maskClosable="false"
      @ok="handleClztOk"
      @cancel="handleClztCancle"
      width="582px"
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
            >{{ item['value'] || '-' }}</a-descriptions-item
            >
            <a-descriptions-item v-if="item['key'] == 'XGFJ'" :key="index" :span="item['span']" :label="item['label']">
              <p v-for="(it, ind) in item.value" :key="ind">
                <a type="link" :href="it.FJLJ" target="_blank">{{ ind + 1 }}、{{ it.FJMC }}</a>
              </p>
            </a-descriptions-item>
            <a-descriptions-item v-if="item['key'] == 'CLBG'" :key="index" :span="item['span']" :label="item['label']">
              <p v-for="(it, ind) in item.value" :key="ind">
                <span>{{ ind + 1 }}、{{ it.FJMC }}</span>
                <a-button size="small" type="link" icon="download" :href="it.FJLJ" target="_blank">下载</a-button>
              </p>
            </a-descriptions-item>
          </template>
        </a-descriptions>
        <a-empty v-else></a-empty>
      </a-spin>
    </a-modal>

    <a-modal
      v-model="clbgVisible"
      :title="clbgData.title"
      :maskClosable="false"
      @ok="handleClbgOk"
      @cancel="handleClbgCancle"
      width="582px"
      size="small"
    >
      <a-descriptions title size="small" bordered>
        <a-descriptions-item key="1" span="3" label="工程名称">{{ clbgObjArr.GCMC }}</a-descriptions-item>
        <a-descriptions-item key="2" span="3" label="工规证号">{{ clbgObjArr.GCBH }}</a-descriptions-item>
        <a-descriptions-item key="3" span="3" label="测量事项">{{ clbgObjArr.CLSX }}</a-descriptions-item>
        <a-descriptions-item key="4" span="3" label="测绘单位">{{ clbgObjArr.CHDW }}</a-descriptions-item>
        <a-descriptions-item key="5" span="3" label="建设单位">{{ clbgObjArr.WTDW }}</a-descriptions-item>
        <a-descriptions-item key="6" span="3" label="联系人">{{ clbgObjArr.LXR }}</a-descriptions-item>
        <a-descriptions-item key="7" span="3" label="联系电话">
          <a-row>
            <a-col
              span="8"
            ><span>{{ clbgObjArr.LXDH }}</span></a-col
            >
            <a-col span="14">
              <a-input v-model="captcha">
                <a-button
                  size="small"
                  slot="addonAfter"
                  type="link"
                  :disabled="state.smsSendBtn"
                  @click.stop.prevent="getCaptcha"
                >{{ !state.smsSendBtn ? '获取验证码' : state.time + ' s' }}</a-button
                >
              </a-input></a-col
            >
          </a-row>
        </a-descriptions-item>
        <a-descriptions-item key="8" span="3" label="">
          <template v-for="(item, index) in clbgObjArr.CLBGFJ">
            <span :key="index" style="margin-right: 10px">{{ item.FJNAME }}</span>
            <a :key="index + Math.random()" type="link" target="_blank" :href="item.FJURL">下载</a>
            <br :key="index + Math.random()" />
          </template>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>

    <a-modal
      v-model="clbgfjVisible"
      :title="clbgfjData.title"
      :maskClosable="false"
      @ok="handleClbgfjOk"
      @cancel="handleClbgfjCancle"
      width="582px"
      size="small"
      :footer="null"
    >
      <div id="clbgfj" class="clbgfj">
        <a-descriptions title size="small" bordered>
          <template v-if="clbgfjData['descArray'] && clbgfjData['descArray'].length > 0">
            <template v-for="(item, index) in clbgfjData['descArray']">
              <a-descriptions-item
                :key="index"
                span="3"
                :label="item.label"
              ><a :href="item.value" target="_blank">下载</a></a-descriptions-item
              >
            </template>
          </template>
        </a-descriptions>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'BusiTable',
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
      data: [],
      columns: [],
      tableLoading: false,
      clztVisible: false,
      clbgVisible: false,
      clbgfjVisible: false,

      modalData: {
        title: '',
        descArray: []
      },
      clbgData: {
        title: '确认测量报告',
        descArray: []
      },
      clbgfjData: {
        title: '查看测量报告',
        descArray: []
      },
      clbgObjArr: {},
      modalSpinning: false,
      tableId: '',
      tableCLSX: '',
      tableChdw: '',
      captcha: null,
      state: {
        smsSendBtn: false,
        time: 60
      }
    }
  },
  computed: {},
  watch: {
    tableData (val, oldVal) {
      if (!this._.isEmpty(val)) {
        this.tableLoading = true
        console.log(val)
        this.columns = this.getTableColumn(this.tableData)
        this.data = this.getTableData(this.tableData)
        this.tableLoading = false
      }
    }
  },
  created () {},
  mounted () {
    this.columns = this.getTableColumn(this.tableData)
    this.data = this.getTableData(this.tableData)
  },
  inject: ['reload'],
  methods: {
    getTableColumn (obj) {
      if (!this._.isEmpty(obj)) {
        const columns = obj.columns
        const hideColumns = obj.hideColumns
        const outColumns = columns.filter(items => !hideColumns.some(item => item === items.key))
        console.log(outColumns)
        const output = outColumns.map((item, index) => {
          if (item.key === 'FJLIST') {
            return {
              dataIndex: item['key'],
              key: item['key'],
              title: item['label'],
              scopedSlots: { customRender: item['key'] },
              width: 350
            }
          } else if (item.key === 'XH') {
            return {
              dataIndex: item['key'],
              key: item['key'],
              title: item['label'],
              scopedSlots: { customRender: item['key'] },
              width: 50
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
        return output
      } else {
        return {}
      }
    },
    getTableData (obj) {
      console.log(obj)
      let temp = []
      if (!this._.isEmpty(obj)) {
        const data = obj.rowsList
        temp = data.map((item, index) => {
          let names = []
          let urls = []
          const showdata = []
          for (const key in item) {
            if (key === 'names') {
              names = item[key]
            }
            if (key === 'urls') {
              urls = item[key]
            }
          }
          names.map((nameItem, nameIndex) => {
            showdata.push({
              name: nameItem,
              url: urls[nameIndex]
            })
          })
          return {
            ...item,
            index: index
          }
        })
      } else {
        temp = []
      }
      return temp
    },
    GetPauseReason () {
      this.modalSpinning = true
      this.$WebApi.busiProcess['GetPauseReason']({
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
      this.$WebApi.busiProcess['GetSurveyCompanyInfo']({
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
      this.$WebApi.busiProcess['GetSurveyReport']({
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
      console.log(record)
      this.clbgObjArr = record
      this.clbgVisible = true
    },
    handleClztOk () {
      this.clztVisible = false
    },
    handleClztCancle () {
      this.clztVisible = false
    },
    handleClbgOk () {
      console.log(this.clbgObjArr)
      const CLSX = this.clbgObjArr.CLSX
      const LXDH = this.clbgObjArr.LXDH
      const TABLE001ID = this.clbgObjArr.TABLE001ID
      const captcha = this.captcha
      if (!this._.isEmpty(captcha)) {
        this.$WebApi.busiProcess['QueryProgress']({
          clsx: CLSX,
          lxdh: LXDH,
          table001id: TABLE001ID,
          captcha: captcha
        })
          .then(res => {
            if (res.code && res.code === 998) {
              this.$message.warning(res.desc)
            } else {
              this.$message.success('您已成功确认！')
              this.reload()
            }
          })
          .catch(err => {
            this.$message.error('您确认操作失败！')
            console.log(err)
          })
        this.clbgVisible = false
      } else {
        this.$message.warning('请输入验证码！')
      }
    },
    handleClbgCancle () {
      this.clbgVisible = false
    },
    getCaptcha (e) {
      e.preventDefault()

      this.$WebApi.user['SendVerification']({
        sPhoneNum: this.clbgObjArr.LXDH
      })
        .then(res => {
          console.log(res)
          this.state.smsSendBtn = true
          if (res === '短信发送失败！') {
            this.$message.error('短信发送失败!60秒后再验证')
          } else {
            this.$message.success('短信发送成功!')
          }
          const interval = window.setInterval(() => {
            if (this.state.time-- <= 0) {
              this.state.time = 60
              this.state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)
        })
        .catch(err => {
          console.log(err)
          // FIXME:目前拦截器catch里，reject不会响应到这里来
        })
    },
    handleClbgfjOk () {
      this.clbgfjVisible = false
    },
    handleClbgfjCancle () {
      this.clbgfjVisible = false
    },
    handleQueryCL (objArray) {
      const temp = objArray.map((item, index) => {
        return {
          label: item.FJNAME,
          value: item.FJURL
        }
      })
      this.$set(this.clbgfjData, 'descArray', temp)

      this.clbgfjVisible = true
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
  border-bottom: 1px solid #e8e8e8;
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
.clbgfj {
  /deep/ .ant-descriptions-item-label {
    width: 80%;
    text-align: center;
  }
  /deep/ .ant-descriptions-item-content {
    width: 20%;
  }
}
</style>
