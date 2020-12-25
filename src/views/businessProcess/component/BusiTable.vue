<!--
 * @Description: Table 包含进度查询一些特殊逻辑 (委托事项)
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-27 14:46:05
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 16:09:28
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
      <!-- 测量状态 -->
      <template slot="CLZT" slot-scope="text, record">
        <span v-if="text != '暂停中'">{{ text }}</span>
        <template v-else>
          {{ text }}
          <a-button type="link" @click="handleWhy(record)">【查看原因】</a-button>
        </template>
      </template>
      <!-- 测绘单位 -->
      <template slot="CHDW" slot-scope="text, record">
        <a-button type="link" @click="handleGroupMore(record)">{{ text }}</a-button>
      </template>
      <!-- 测量报告 -->
      <template slot="CLBG" slot-scope="text, record">
        <span v-if="text === '未上传'">{{ text }}</span>
        <template v-else-if="text === '查看'">
          <template v-if="record.CLBGFJ && record.CLBGFJ.length == 1">
            <a-button type="link" target="_blank" :href="record.CLBGFJ[0].FJURL">查看</a-button>
          </template>
          <a-button v-else type="link" @click="handleQueryCL(record.CLBGFJ)">查看</a-button>
          <template v-if="record.CLQR && record.CLQR == '未确认'">
            <a-button type="link" @click="handleQueryReport(record, 0)">确认</a-button>
          </template>
          <template v-else>已确认</template>
        </template>
      </template>
      <!-- 测量合同 -->
      <template slot="CLHT" slot-scope="text, record">
        <span v-if="text === '未上传'">{{ text }}</span>
        <template v-else-if="text === '查看'">
          <template v-if="record.CLHTFJ && record.CLHTFJ.length == 1">
            <a-button type="link" target="_blank" :href="record.CLHTFJ[0].FJURL">查看</a-button>
          </template>
          <a-button v-else type="link" @click="handleQueryCL(record.CLHTFJ)">查看</a-button>
          <template v-if="record.HTQR && record.HTQR == '未确认'">
            <a-button type="link" @click="handleQueryReport(record, 1)">确认</a-button>
          </template>
          <template v-else>已确认</template>
        </template>
      </template>
    </a-table>

    <!-- 测量状态 -->
    <a-modal
      v-model="clztVisible"
      :title="modalData.title"
      :maskClosable="false"
      @ok="handleClztOk"
      @cancel="handleClztCancle"
      width="40%"
      size="small"
      :footer="null"
    >
      <a-spin :spinning="modalSpinning" tip="加载中...">
        <a-descriptions title size="small" bordered>
          <template v-for="(item, index) in modalData['descArray']">
            <a-descriptions-item
              v-if="item['key'] != 'XGFJ' && item['key'] != 'CLBG'"
              :key="index"
              :span="item['span']"
              :label="item['label']"
            >{{ item['value'] }}</a-descriptions-item
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
      </a-spin>
    </a-modal>

    <!-- 测量报告 -->
    <a-modal
      v-model="clbgVisible"
      :title="clbgData.title"
      :maskClosable="false"
      @ok="handleClbgOk"
      @cancel="handleClbgCancle"
      width="40%"
      size="small"
      :centered="true"
    >
      <a-descriptions title size="small" bordered>
        <a-descriptions-item key="1" span="3" label="工程名称">{{ clbgObjArr.GCMC }}</a-descriptions-item>
        <a-descriptions-item key="2" span="3" label="工规证号">{{ clbgObjArr.GCBH }}</a-descriptions-item>
        <a-descriptions-item key="3" span="3" label="测量事项">{{ clbgObjArr.CLSX }}</a-descriptions-item>
        <a-descriptions-item key="4" span="3" label="测绘中介服务机构">{{ clbgObjArr.CHDW }}</a-descriptions-item>
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
                >{{ !state.smsSendBtn ? '获取短信验证码' : state.time + ' s' }}</a-button
                >
              </a-input></a-col
            >
          </a-row>
        </a-descriptions-item>
        <a-descriptions-item key="8" :span="3" label="">
          <template v-for="(item, index) in clbgObjArr.CLBGFJ">
            <div :key="index">
              <a type="link" target="_blank" :href="item.FJURL">{{ item.FJNAME }}</a>
            </div>
          </template>
        </a-descriptions-item>
      </a-descriptions>
      <div style="text-align: center;margin-top: 4px"><span>填入验证码后，点击确认按钮，完成确认</span></div>
    </a-modal>

    <!-- 测量报告附件 -->
    <a-modal
      v-model="clbgfjVisible"
      :title="clbgfjData.title"
      :maskClosable="false"
      @ok="handleClbgfjOk"
      @cancel="handleClbgfjCancle"
      width="40%"
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
      },
      clnum: 0 // 0 表示测量报告   1 表示测量合同
    }
  },
  computed: {},
  watch: {
    tableData (val, oldVal) {
      if (!this._.isEmpty(val)) {
        console.log(val)
        this.tableLoading = true
        this.columns = this.getTableColumn(this.tableData)
        this.data = this.getTableData(this.tableData)
        this.tableLoading = false
      }
    }
  },
  created () {},
  mounted () {
    console.log(this.tableData)
    this.columns = this.getTableColumn(this.tableData)
    this.data = this.getTableData(this.tableData)
  },
  inject: ['busiProReload'],
  methods: {
    getTableColumn (obj) {
      if (!this._.isEmpty(obj)) {
        const columns = obj.columns
        const hideColumns = obj.hideColumns
        const outColumns = columns.filter(items => !hideColumns.some(item => item === items.key))
        const output = outColumns.map((item, index) => {
          return {
            dataIndex: item['key'],
            key: item['key'],
            title: item['label'],
            scopedSlots: { customRender: item['key'] }
          }
        })
        return output
      } else {
        return {}
      }
    },
    getTableData (obj) {
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
          console.log(res)
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
              label: '测绘中介服务机构',
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
              label: '测绘中介服务机构',
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
    handleQueryReport (record, num) {
      // num 0 测量报告    1 合同
      this.clnum = num
      if (num === 0) {
        this.clbgData.title = '确认测量报告'
      } else if (num === 1) {
        this.clbgData.title = '确认测量合同'
      }
      console.log(record)
      this.tableId = record['TABLE008ID']
      this.GetSurveyReport()
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
      const CLSX = this.clbgObjArr.CLSX
      const LXDH = this.clbgObjArr.LXDH
      const TABLE001ID = this.clbgObjArr.TABLE001ID
      const TABLE008ID = this.clbgObjArr.TABLE008ID
      const captcha = this.captcha
      let api = ''
      if (this.clnum === 0) {
        api = 'QueryProgress'
      } else if (this.clnum === 1) {
        api = 'ClhtConfirm'
      }
      if (!this._.isEmpty(captcha)) {
        this.$WebApi.busiProcess[api]({
          clsx: CLSX,
          lxdh: LXDH,
          table001id: TABLE001ID,
          table008id: TABLE008ID,
          captcha: captcha
        })
          .then(res => {
            if (res.code && res.code === 998) {
              this.$message.warning(res.desc)
            } else {
              this.$message.success('您已成功确认！')
              this.busiProReload()
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
/deep/ .ant-table-thead {
  background-color: #b3bdc7;
}
/deep/ .ant-modal-header {
  padding: 10px 24px;
  color: rgba(0, 0, 0, 0.65);
  background: rgba(24, 144, 255, 1);
  border-bottom: 1px solid #e8e8e8;
  border-radius: 4px 4px 0 0;
}
/deep/ .ant-descriptions-item-label {
  width: 20%;
  text-align: center;
}

/deep/ .ant-descriptions-item-content {
  width: 80%;
}
.clbgfj {
  /deep/ .ant-descriptions-item-label {
    width: 80%;
    text-align: center;
    word-break: break-all;
  }
  /deep/ .ant-descriptions-item-content {
    width: 20%;
    word-break: break-all;
  }
}
</style>
