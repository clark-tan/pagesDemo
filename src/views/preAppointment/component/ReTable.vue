<!--
 * @Description: 进场时间预约table封装
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-15 15:35:22
 * @LastEditors: lhy
 * @LastEditTime: 2020-12-17 17:51:55
-->

<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :rowKey="record => record.CLSX"
      bordered
      size="small"
    >
      <template slot="CLZT" slot-scope="text">
        <a-tag v-if="text == '未开始'" class="unStart">未开始</a-tag>
        <a-tag v-else-if="text == '测量中'" class="other">测量中</a-tag>
        <a-tag v-else-if="text == '已完成'" class="survey-done">已完成</a-tag>
        <a-tag v-else-if="text == '暂停中'" class="stop">{{ text }}</a-tag>
        <a-tag v-else class="other">{{ text }}</a-tag>
      </template>
      <template slot="ZT" slot-scope="text, record">
        <span v-if="text == 0">
          <a-button size="small" type="primary" @click="handleReservation(allItem, record, 0)">预约</a-button>
        </span>
        <span v-if="text == 1">
          <a-button size="small" type="link" @click="handleQueryReservation(allItem, record, 1)">查看</a-button>
          <a-button size="small" type="link" @click="handleRevoke(allItem, record)">
            <span class="revokeSpan">撤回</span>
          </a-button>
        </span>
        <span v-if="text == 2">
          <a-button size="small" type="link" @click="handleQueryReservation(allItem, record, 2)">查看</a-button>
        </span>
      </template>
    </a-table>

    <a-modal
      v-model="ReservationVisible"
      title="预约进场时间"
      @ok="handleReservationOk"
      @cancel="handleReservationCancle"
      width="1000px"
      size="small"
      :footer="null"
      :maskClosable="false"
    >
      <!-- {{form}} -->
      <a-form-model
        size="small"
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-row :gutter="4">
          <a-col span="12">
            <a-form-model-item
              ref="CLSX"
              label="测量事项"
              prop="CLSX"
              :labelCol="{ span: 8 }"
              :wrapperCol="{ span: 14 }"
            >
              <a-input v-model="form.CLSX" disabled />
            </a-form-model-item>
          </a-col>
          <a-col span="12">
            <a-form-model-item label="测绘单位" ref="CLDW" prop="CLDW" :wrapperCol="{ span: 20 }">
              <a-input v-model="form.CLDW" disabled />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row :gutter="4">
          <a-col span="12">
            <a-form-model-item
              label="进场联系人"
              ref="JCLXR"
              prop="JCLXR"
              :labelCol="{ span: 8 }"
              :wrapperCol="{ span: 14 }"
            >
              <a-input v-model="form.JCLXR" :disabled="currentType != 0" />
            </a-form-model-item>
          </a-col>
          <a-col span="12">
            <a-form-model-item label="联系电话" ref="LXDH" prop="LXDH" :wrapperCol="{ span: 20 }">
              <a-input v-model="form.LXDH" :disabled="currentType != 0" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="预约进场时间" ref="YYJCSJ" prop="YYJCSJ">
          <a-date-picker
            v-model="form.YYJCSJ"
            type="date"
            placeholder="请选择预约进场时间"
            :disabled-date="disabledEndDate"
            style="width: 100%;"
            :disabled="currentType != 0"
          />
        </a-form-model-item>

        <a-form-model-item label="预约所需材料" v-if="innerData && innerData.length > 0" ref="CXTABLE1" prop="CXTABLE1">
          <a-table
            :columns="innerColumns"
            :data-source="innerData"
            bordered
            size="small"
            :pagination="false"
            :rowKey="
              record => {
                return record.index
              }
            "
            :expandedRowKeys="expandedRowKeys"
            @expandedRowsChange="expandedRowsChange"
          >
            <template slot="expandedRowRender" slot-scope="record">
              <template v-if="record.showdata && record.showdata.length > 0">
                <template v-for="(item, index) in record.showdata">
                  <a-row :key="index" :style="{ marginBottom: '4px', textAlign: 'left' }">
                    <a-col span="12">
                      <a :href="item.url" target="_blank" :style="{ marginRight: '10px' }">{{ item.name }}</a>
                    </a-col>
                    <a-col span="12">
                      <a-button
                        v-if="currentType === 0"
                        type="danger"
                        size="small"
                        icon="delete"
                        @click="deleteFile(record, index)"
                      ></a-button
                      ></a-col>
                  </a-row>
                </template>
              </template>
              <a-empty v-else />
            </template>
            <template slot="action" slot-scope="text, record">
              <template>
                <a-upload
                  name="file"
                  :multiple="true"
                  :action="MaterialUpload"
                  :file-list="record.action"
                  :showUploadList="false"
                  :disabled="currentType != 0"
                  @change="info => handleChange(info, record)"
                >
                  <a-button size="small" type="primary" icon="upload" :disabled="currentType != 0">点这里上传</a-button>
                </a-upload>
              </template>
            </template>
          </a-table>
        </a-form-model-item>
        <template v-if="currentType == 2">
          <a-form-model-item label="确定进场时间" ref="QRJCSJ" prop="QRJCSJ">
            <a-input v-model="form.QRJCSJ" disabled />
          </a-form-model-item>
          <a-form-model-item label="项目负责人" ref="XMFZR" prop="XMFZR">
            <a-input v-model="form.XMFZR" disabled />
          </a-form-model-item>
          <a-form-model-item label="项目负责人电话" ref="XMFZRLXDH" prop="XMFZRLXDH">
            <a-input v-model="form.XMFZRLXDH" disabled />
          </a-form-model-item>
        </template>

        <a-form-model-item label="备注" ref="BZ" prop="BZ">
          <a-input v-model="form.BZ" type="textarea" :disabled="currentType != 0" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 12 }" v-if="!(currentType != 0)">
          <a-button type="primary" @click="onSubmit" :disabled="isDisabled">
            <template v-if="isDisabled == false">预约</template>
            <template v-else>正在上传文件中...</template>
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { MaterialUpload } from '@/api/common/urlString'
export default {
  name: 'ReTable',
  components: {},
  props: {
    tableData: {
      default: () => {},
      type: Object,
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
      MaterialUpload,
      columns: [],
      data: [],
      innerColumns: [
        {
          title: '名称',
          dataIndex: 'CLMC',
          key: 'CLMC',
          scopedSlots: { customRender: 'CLMC' }
        },
        {
          title: '说明',
          scopedSlots: { customRender: 'SM' },
          dataIndex: 'SM',
          key: 'SM'
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      innerData: [],
      tableLoading: false,
      ReservationVisible: false,
      form: {
        CLSX: '',
        LXDH: '',
        JCLXR: '',
        CLDW: '',
        YYJCSJ: undefined,
        CXTABLE1: [],
        BZ: '',
        QRJCSJ: '',
        XMFZR: '',
        XMFZRLXDH: ''
      },
      rules: {
        CLSX: [
          {
            message: '请填写测量事项',
            trigger: 'blur'
          }
        ],
        LXDH: [
          {
            required: true,
            message: '请填写测量事项',
            trigger: 'blur'
          }
        ],
        JCLXR: [{ required: true, message: '请填写进场联系人', trigger: 'blur' }],
        CLDW: [{ message: '请填写测绘单位', trigger: 'blur' }],
        YYJCSJ: [{ required: true, message: '请请选择预约进场时间', trigger: 'change' }],
        CXTABLE1: [
          {
            required: true,
            message: '请上传预约材料'
          }
        ],
        BZ: [
          {
            message: '请填写备注内容',
            trigger: 'blur'
          }
        ]
      },
      submitData: {},
      expandedRowKeys: [],
      currentItem: [],
      currentType: 0, // 状态：0=预约，1=查看，撤回，2=查看
      isDisabled: false // 控制上传文件中 预约按钮disabled
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
  inject: ['reload'],
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
      if (!this._.isEmpty(obj)) {
        return obj.rowsList
      } else {
        return []
      }
    },
    handlerDataChange () {
      this.tableLoading = true
      const tableData = JSON.parse(JSON.stringify(this.tableData))
      this.columns = tableData.columns
      this.data = this.getTableData(tableData)
      this.tableLoading = false
    },
    disabledEndDate (endValue) {
      const after3Days = moment().add(3, 'days')
      const isAfter3Days = endValue.isBefore(after3Days)
      return isAfter3Days
    },
    handleQueryReservation (items, record, num) {
      const _this = this
      this.expandedRowKeys = []
      this.currentType = num
      this.currentItem = items
      this.form.CLSX = record.CLSX
      this.form.CLDW = record.CLDW
      const object = record.YYJCCLPZD.rowsList[0]
      this.innerData = object.CXTABLE1
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (key === 'YYJCSJ') {
            _this.form[key] = moment(object[key], 'YYYY-MM-DD')
          } else {
            _this.form[key] = object[key]
          }
        }
      }
      console.log(this.innerData)
      this.innerData = this.innerData.map((item, index) => {
        let NAME = []
        let ZCURL = []
        const showdata = []
        for (const key in item) {
          console.log(key)
          if (key === 'NAME') {
            NAME = item[key]
          }
          if (key === 'ZCURL') {
            ZCURL = item[key]
          }
        }
        if (NAME && NAME.length > 0) {
          NAME.map((nameItem, nameIndex) => {
            showdata.push({
              name: nameItem,
              url: ZCURL[nameIndex]
            })
          })
        }

        return {
          ...item,
          index: index,
          showdata: showdata,
          action: []
        }
      })
      console.log(this.innerData)
      this.innerData.map((item, index) => {
        if (item.NAME && item.NAME.length > 0) {
          _this.expandedRowKeys.push(item.index)
        }
      })
      this.ReservationVisible = true
    },
    handleReservation (items, record, num) {
      const _this = this
      this.expandedRowKeys = []
      this.currentType = num
      this.currentItem = items
      this.form.CLSX = record.CLSX
      this.form.CLDW = record.CLDW
      const object = record.YYJCCLPZD.rowsList[0]
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (key === 'YYJCSJ') {
            if (!_this._.isEmpty(object[key])) {
              _this.form[key] = moment(object[key], 'YYYY-MM-DD')
            } else {
              _this.form[key] = undefined
            }
          } else {
            _this.form[key] = object[key]
          }
        }
      }
      this.innerData = record.YYJCCLPZD.rowsList[0].CXTABLE1
      console.log(this.innerData)
      console.log(record.YYJCCLPZD)

      this.innerData = this.innerData.map((item, index) => {
        let NAME = []
        let ZCURL = []
        const showdata = []
        for (const key in item) {
          console.log(key)
          if (key === 'NAME') {
            NAME = item[key]
            console.log(item.key)
          }
          if (key === 'ZCURL') {
            ZCURL = item[key]
            console.log(item.key)
          }
        }
        if (NAME && NAME.length > 0) {
          NAME.map((nameItem, nameIndex) => {
            showdata.push({
              name: nameItem,
              url: ZCURL[nameIndex]
            })
          })
        }

        return {
          ...item,
          index: index,
          showdata: showdata,
          action: []
        }
      })
      console.log(this.innerData)
      this.innerData.map((item, index) => {
        if (item.NAME && item.NAME.length > 0) {
          _this.expandedRowKeys.push(item.index)
        }
      })
      this.ReservationVisible = true
    },
    handleRevoke (items, record) {
      const _this = this
      const clsx = record.CLSX
      let code
      items.map((item, index) => {
        if (item['key'] === 'RID') {
          code = item['value']
        }
      })
      this.$confirm({
        title: '撤回操作！',
        content: '确认撤回当前预约操作？',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          _this.RevokeAppointmentApproach(code, clsx)
        },
        onCancel () {}
      })
    },
    RevokeAppointmentApproach (code, clsx) {
      this.$WebApi.reservationEnter['RevokeAppointmentApproach']({
        code: code,
        clsx: clsx
      })
        .then(res => {
          // this.QueryAppointmentApproach()
          this.reload()
        })
        .catch(err => {
          console.log(err)
        })
    },
    clearReservationModalData () {
      this.$refs.ruleForm.resetFields()
      this.currentItem = []
    },
    handleReservationOk () {
      this.clearReservationModalData()
      this.ReservationVisible = false
    },
    handleReservationCancle () {
      this.clearReservationModalData()
      this.ReservationVisible = false
    },
    onSubmit () {
      const _this = this
      this.$confirm({
        title: '预约操作！',
        content: '确认执行当前预约操作？',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          _this.$refs.ruleForm.validate((valid, obj) => {
            if (valid) {
              _this.submitData = {}
              _this.currentItem.map((item, index) => {
                if (
                  item.key === 'GCMC' ||
                  item.key === 'GCBH' ||
                  item.key === 'GCDD' ||
                  item.key === 'JSDW' ||
                  item.key === 'RID'
                ) {
                  _this.submitData[item.key] = item.value
                }
              })
              const object = _this.form
              let yyjcsjValue
              for (const key in object) {
                if (object.hasOwnProperty(key)) {
                  if (key === 'YYJCSJ') {
                    yyjcsjValue = object[key].format('YYYY-MM-DD')
                  }
                  if (key === 'CXTABLE1') {
                    console.log(object[key])
                  }
                }
              }

              const object2 = JSON.parse(JSON.stringify(object))
              object2['YYJCSJ'] = yyjcsjValue
              _this.submitData = Object.assign(_this.submitData, object2)
              console.log(_this.submitData)
              _this.SaveAppointmentApproach()
            } else {
              console.log('error submit!!')
              return false
            }
          })
        },
        onCancel () {}
      })
    },
    SaveAppointmentApproach () {
      this.$WebApi.reservationEnter['SaveAppointmentApproach']({
        data: JSON.stringify(this.submitData)
      })
        .then(res => {
          this.handleReservationOk()
          // this.QueryAppointmentApproach()
          this.reload()
        })
        .catch(err => {
          this.handleReservationCancle()
          console.log(err)
        })
    },
    expandedRowsChange (expandedRows) {
      this.expandedRowKeys = expandedRows
    },
    handleChange (info, record) {
      let fileList = [...info.fileList]
      const file = info.file
      this.isDisabled = true
      if (file.response && file.status === 'done') {
        if (file.response.code === 0) {
          this.isDisabled = false
          record.showdata.push({
            name: file.response.data[0].fileName,
            url: file.response.data[0].fileUrl
          })
          record.NAME.push(file.response.data[0].fileName)
          record.ZCURL.push(file.response.data[0].fileUrl)
          this.expandedRowKeys.push(record.index)
        } else {
          this.$message.error('文件上传失败！')
        }
      }
      if (file.status === 'error') {
        this.$message.error('文件: ' + file.name + '上传失败！')
        this.isDisabled = false
      }
      fileList = fileList.map(file => {
        if (file.response && file.status === 'done') {
          if (file.response.code === 0) {
          } else {
          }
        }
        return file
      })
      record.action = fileList
    },
    deleteFile (record, index) {
      console.log(record)
      record.showdata.splice(index, 1)
      record.NAME.splice(index, 1)
      record.ZCURL.splice(index, 1)
      if (record.NAME && record.NAME.length === 0) {
        this.expandedRowKeys.splice(record.index, 1, null)
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
</style>
