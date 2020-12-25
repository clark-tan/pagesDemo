<!--
 * @Description: 通用委托书表单 以此版本改造
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-10 10:04:32
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-21 09:41:34
-->

<template>
  <div class="common-form">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        class="form"
      >
        <template v-if="permission.REC_GGZH ? permission.REC_GGZH.isShow : defaultShow">
          <a-row :gutter="0">
            <a-col span="16">
              <a-form-model-item
                :label="permission.REC_GGZH.label"
                prop="REC_GGZH"
                ref="REC_GGZH"
                :labelCol="{ span: 6 }"
                :wrapperCol="{ span: 18 }"
              >
                <a-input placeholder="请填写建设工程规划许可证上的工规证号" v-model="form.REC_GGZH" />
              </a-form-model-item>
            </a-col>
            <a-col span="8">
              <a-form-model-item :wrapperCol="{ span: 24 }">
                <a-button block disabled>根据工规证号调取工程信息(暂未开通)</a-button>
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template v-if="permission.REC_GCMC ? permission.REC_GCMC.isShow : defaultShow">
          <a-form-model-item :label="permission.REC_GCMC.label" prop="REC_GCMC" ref="REC_GCMC">
            <a-input placeholder="请填写建设工程规划许可证上的工程名称" v-model="form.REC_GCMC" />
          </a-form-model-item>
        </template>

        <a-row :gutter="0">
          <a-col span="8">
            <template v-if="permission.REC_XZQ ? permission.REC_XZQ.isShow : defaultShow">
              <a-form-model-item :label="permission.REC_XZQ.label" prop="REC_XZQ" :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }">
                <a-select v-model="form.REC_XZQ" placeholder="请填写规划许可证上的工程地点" @change="handleXZQChange">
                  <a-select-option v-for="(item, index) in GCDDSelectList" :key="index" :value="item">{{
                    item
                  }}</a-select-option>
                </a-select>
              </a-form-model-item>
            </template>
          </a-col>
          <a-col span="16">
            <template v-if="permission.REC_GCXXDD ? permission.REC_GCXXDD.isShow : defaultShow">
              <a-form-model-item label="" :wrapperCol="{ span: 24 }" prop="REC_GCXXDD">
                <a-input placeholder="请填写工程详细地址" v-model="form.REC_GCXXDD" />
              </a-form-model-item>
            </template>
          </a-col>
        </a-row>
        <a-row>
          <a-col span="12">
            <template v-if="permission.REC_JSXZ ? permission.REC_JSXZ.isShow : defaultShow">
              <a-form-model-item
                :label="permission.REC_JSXZ.label"
                prop="REC_JSXZ"
                ref="REC_JSXZ"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 14 }"
              >
                <a-radio-group v-model="form.REC_JSXZ" placeholder="请选择建设性质">
                  <a-radio v-for="(item, index) in JSXZ" :key="index" :value="item['value']">{{
                    item['value']
                  }}</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </template>
          </a-col>
          <a-col span="9">
            <template v-if="permission.REC_TDLY ? permission.REC_TDLY.isShow : defaultShow">
              <a-form-model-item
                :label="permission.REC_TDLY.label"
                prop="REC_TDLY"
                ref="REC_TDLY"
                :labelCol="{ span: 6 }"
                :wrapperCol="{ span: 18 }"
              >
                <a-radio-group v-model="form.REC_TDLY" placeholder="请选择土地来源">
                  <a-radio v-for="(item, index) in TDLY" :key="index" :value="item['value']">{{
                    item['value']
                  }}</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </template>
          </a-col>
        </a-row>
        <template v-if="permission.REC_WTDW ? permission.REC_WTDW.isShow : defaultShow">
          <a-form-model-item :label="permission.REC_WTDW.label" prop="REC_WTDW" ref="REC_WTDW">
            <a-input placeholder="请填写建设工程规划许可证上的建设单位" v-model="form.REC_WTDW" />
          </a-form-model-item>
        </template>

        <a-row>
          <a-col span="12">
            <template v-if="permission.REC_LXR ? permission.REC_LXR.isShow : defaultShow">
              <a-form-model-item
                :label="permission.REC_LXR.label"
                prop="REC_LXR"
                ref="REC_LXR"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 14 }"
              >
                <a-input v-model="form.REC_LXR" />
              </a-form-model-item>
            </template>
          </a-col>
          <a-col span="12">
            <template v-if="permission.REC_LXFS ? permission.REC_LXFS.isShow : defaultShow">
              <a-form-model-item
                :label="permission.REC_LXFS.label"
                prop="REC_LXFS"
                ref="REC_LXFS"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 16 }"
              >
                <a-input placeholder="例如：020-23380999 或者 15812341234" v-model="form.REC_LXFS" />
              </a-form-model-item>
            </template>
          </a-col>
        </a-row>
        <template v-if="permission.REC_DZYX ? permission.REC_DZYX.isShow : defaultShow">
          <a-form-model-item :label="permission.REC_DZYX.label" prop="REC_DZYX" ref="REC_DZYX">
            <a-input v-model="form.REC_DZYX" />
          </a-form-model-item>
        </template>
        <template v-if="permission.REC_CLWTS ? permission.REC_CLWTS.isShow : defaultShow">
          <a-form-model-item :label="permission.REC_CLWTS.label" prop="REC_CLWTS">
            <p>
              {{ WTS.WTSSM }}
              <a :href="WTS.WTSMB" download="委托书模板">下载委托书模板</a>
            </p>
            <upload-table ref="dfTable" :tableData="tableData" :disabled="false"></upload-table>
          </a-form-model-item>
        </template>

        <template v-if="permission.REC_QJFS ? permission.REC_QJFS.isShow : defaultShow">
          <a-form-model-item :label="permission.REC_QJFS.label" prop="REC_QJFS">
            <a-radio-group v-model="form.REC_QJFS">
              <a-radio value="现场取件">现场取件</a-radio>
              <a-radio value="邮寄送达" disabled>
                邮寄送达
                <a-tag color="#f50">（暂未开通）</a-tag>
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </template>

        <template v-if="form.REC_QJFS == '邮寄送达'">
          <template v-if="permission.REC_SJDZ ? permission.REC_SJDZ.isShow : defaultShow">
            <a-form-model-item :label="permission.REC_SJDZ.label" prop="REC_SJDZ" ref="REC_SJDZ">
              <a-input v-model="form.REC_SJDZ" />
            </a-form-model-item>
          </template>

          <template v-if="permission.REC_SJR ? permission.REC_SJR.isShow : defaultShow">
            <a-form-model-item :label="permission.REC_SJR.label" prop="REC_SJR" ref="REC_SJR">
              <a-input v-model="form.REC_SJR" />
            </a-form-model-item>
          </template>

          <template v-if="permission.REC_SJDH ? permission.REC_SJDH.isShow : defaultShow">
            <a-form-model-item :label="permission.REC_SJDH.label" prop="REC_SJDH" ref="REC_SJDH">
              <a-input v-model="form.REC_SJDH" />
            </a-form-model-item>
          </template>
        </template>
        <template v-if="permission.REC_QJFS && permission.REC_QJFS.isShow && form.REC_QJFS == '现场取件'">
          <a-form-model-item v-if="form.REC_QJFS == '现场取件'" :label="permission.REC_QJFS.label">
            <a-input :value="QJDZ" disabled placeholder="请先填写工程地点，系统会根据地点为您自动推荐最佳的取件地址" />
          </a-form-model-item>
        </template>
      </a-form-model>
    </div>

    <div class="footer">
      <div class="my-button">
        <template v-if="_.isEmpty(permission.isTemporarySave) && permission.isTemporarySave === true">
          <a-button type="primary" @click="saveCurrentData">暂存</a-button>
        </template>

        <!-- <a-button type="primary" @click="isEnableSubmit">检验</a-button> -->
        <a-button @click="handleSubmitCommonData(-1)">上一步</a-button>
        <a-button type="primary" @click="handleSubmitCommonData(1)">{{ isLast ? '提交申请' : '下一步' }}</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isEmail, isMobile, isTel } from '@/utils/verify'
import { lightApi } from '@/api/common/baseUrl'
import UploadTable from '@/views/common/UploadTable'
export default {
  name: 'CommonFormFinal',
  components: { 'upload-table': UploadTable },
  props: {
    permission: {
      default: () => {},
      type: Object,
      required: true
    },
    isLast: {
      default: false,
      type: Boolean,
      required: true
    },
    remoteData: {
      default: () => {},
      type: Object,
      required: false
    }
  },
  data () {
    return {
      lightApi,
      defaultRequired: true, // permission无数据时是否 必填
      defaultShow: false, // permission无数据时是否 显示
      form: {
        REC_GCMC: '',
        REC_GGZH: '',
        REC_JSXZ: '新建',
        REC_TDLY: '划拨',
        REC_XZQ: '',
        REC_GCXXDD: '',
        REC_WTDW: '',
        REC_LXR: '',
        REC_LXFS: '',
        REC_DZYX: '',
        REC_CLWTS: [],
        REC_QJFS: '现场取件',
        REC_SJDZ: '',
        REC_SJR: '',
        REC_SJDH: ''
      },
      rules: {
        REC_CLWTS: [
          {
            required: this.permission.REC_CLWTS ? this.permission.REC_CLWTS.isCheck : this.defaultRequired,
            message: '请上传所有材料',
            validator: (rule, value, callback) => {
              if (this.$refs.dfTable.isAllSubmit()) {
                callback()
              } else {
                callback(new Error('请上传所有材料'))
              }
            }
          }
        ],
        REC_GCMC: [
          {
            required: this.permission.REC_GCMC ? this.permission.REC_GCMC.isCheck : this.defaultRequired,
            message: '请填写建设工程规划许可证上的工程名称',
            trigger: ['blur', 'change']
          }
        ],
        REC_GGZH: [
          {
            required: this.permission.REC_GGZH ? this.permission.REC_GGZH.isCheck : this.defaultRequired,
            message: '请填写建设工程规划许可证上的工规证号',
            trigger: ['blur', 'change']
          }
        ],
        REC_XZQ: [
          {
            required: this.permission.REC_XZQ ? this.permission.REC_XZQ.isCheck : this.defaultRequired,
            message: '请填写规划许可证上的工程地点',
            trigger: ['blur', 'change']
          }
        ],
        REC_JSXZ: [
          {
            required: this.permission.REC_JSXZ ? this.permission.REC_JSXZ.isCheck : this.defaultRequired,
            message: '请选择项目性质',
            trigger: 'change'
          }
        ],
        REC_TDLY: [
          {
            required: this.permission.REC_TDLY ? this.permission.REC_TDLY.isCheck : this.defaultRequired,
            message: '请选择土地来源',
            trigger: 'change'
          }
        ],
        REC_GCXXDD: [
          {
            required: this.permission.REC_GCXXDD ? this.permission.REC_GCXXDD.isCheck : this.defaultRequired,
            message: '请正确填写工程详细地址',
            trigger: ['blur', 'change']
          }
        ],
        REC_WTDW: [
          {
            required: this.permission.REC_WTDW ? this.permission.REC_WTDW.isCheck : this.defaultRequired,
            message: '请正确填写建设单位',
            trigger: ['blur', 'change']
          }
        ],
        REC_LXR: [
          {
            required: this.permission.REC_LXR ? this.permission.REC_LXR.isCheck : this.defaultRequired,
            message: '请正确填写联系人',
            trigger: ['blur', 'change']
          }
        ],
        REC_DZYX: [
          {
            required: this.permission.REC_DZYX ? this.permission.REC_DZYX.isCheck : this.defaultRequired,
            message: '请正确填写邮箱',
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (isEmail(value)) {
                callback()
              } else {
                callback(new Error('请正确填写邮箱'))
              }
            }
          }
        ],
        REC_LXFS: [
          {
            required: this.permission.REC_LXFS ? this.permission.REC_LXFS.isCheck : this.defaultRequired,
            message: '请正确填写联系电话',
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (isTel(value) || isMobile(value)) {
                callback()
              } else {
                callback(new Error('请正确填写联系电话'))
              }
            }
          }
        ],
        REC_QJFS: [
          {
            required: this.permission.REC_QJFS ? this.permission.REC_QJFS.isCheck : this.defaultRequired,
            message: '请选择取件方式',
            trigger: 'change'
          }
        ],
        REC_SJDZ: [
          {
            required: this.permission.REC_SJDZ ? this.permission.REC_SJDZ.isCheck : this.defaultRequired,
            message: '请填写邮寄收件地址',
            trigger: ['blur', 'change']
          }
        ],
        REC_SJR: [
          {
            required: this.permission.REC_SJR ? this.permission.REC_SJR.isCheck : this.defaultRequired,
            message: '请填写邮寄联系人',
            trigger: ['blur', 'change']
          }
        ],
        REC_SJDH: [
          {
            required: this.permission.REC_SJDH ? this.permission.REC_SJDH.isCheck : this.defaultRequired,
            message: '请填写邮寄联系方式',
            trigger: ['blur', 'change']
          }
        ]
      },
      GCDDSelectList: [], // 工程地点
      QJDZ: '', // 取件地址
      JSXZ: [], // 建设性质
      TDLY: [], // 土地来源
      WTS: {}, // 委托书相关字段
      tableData: {
        columns: [],
        hideColumns: [],
        rowsList: []
      } // 上传表格所需数据
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  watch: {
    'form.REC_XZQ': {
      handler (n, o) {
        if (n) {
          this.handleXZQChange(n)
        }
      },
      // immediate: true,  //刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 person 对象的属性值的变化
    },
    permission: {
      handler (n, o) {
        if (n) {
          this.CopyPermissionCheckData2Rules(n)
        }
      },
      // immediate: true,  //刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 person 对象的属性值的变化
    },
    remoteData: {
      handler (newValue, oldValue) {
        if (newValue) {
          this.fillData2form(newValue)
        }
      },
      immediate: true, // 刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 person 对象的属性值的变化
    }
  },
  created () {},
  mounted () {
    this.getDataFromUserInfo() // 从登陆用户信息表获取委托表单所需要的部分字段
    this.getYWWT() // 获取表单部分默认数据
    this.getCLWTS() // 获取测量委托书模板
    this.tableData = this.getTableData() // 获取测量委托书上传表格数据
  },
  methods: {
    // hack rules里的数据在外部组件v-if=false =》v-if=true 后，不能及时更新深层数据，此处通过deep watch监听到变化后，手动更新
    CopyPermissionCheckData2Rules (newPermissionData) {
      if (!Window._.isEmpty(newPermissionData)) {
        for (const key in newPermissionData) {
          if (this.rules[key] && this.rules[key].length > 0) {
            this.rules[key][0]['required'] = newPermissionData[key]['isCheck']
          }
        }
      }
    },
    // 获取测量委托书表格数据，目前无api返回数据，手造
    getTableData () {
      return {
        columns: [
          {
            label: '序号',
            key: 'index',
            type: 'text'
          },
          {
            label: '材料名称',
            key: 'CLMC',
            type: 'text'
          },
          {
            label: '备注说明',
            key: 'BZSM',
            type: 'text'
          },
          {
            label: '附件',
            key: 'FJLIST',
            type: 'text'
          }
        ],
        hideColumns: ['BZSM', 'FJLIST'],
        rowsList: [
          {
            index: '1',
            CLMC: '规划核实测量委托书',
            BZSM: '',
            FJLIST: []
          },
          {
            index: '2',
            CLMC: '土地测绘委托书',
            BZSM: '',
            FJLIST: []
          },
          {
            index: '3',
            CLMC: '房产实测委托书',
            BZSM: '',
            FJLIST: []
          }
        ]
      }
    },
    // 从登陆用户信息表获取委托表单所需要的部分字段
    getDataFromUserInfo () {
      const obj = this.user
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key === 'LXR') {
            this.form['REC_LXR'] = obj[key]
          }
          if (key === 'DWMC') {
            this.form['REC_WTDW'] = obj[key]
          }
          if (key === 'MAILBOX') {
            this.form['REC_DZYX'] = obj[key]
          }
          if (key === 'MOBILEPHONE') {
            this.form['REC_LXFS'] = obj[key]
          }
        }
      }
    },
    // 获取表单部分默认数据
    getYWWT () {
      this.$WebApi.preBusiness['GetSurveyAndLocal']()
        .then(res => {
          // 工程地点
          res = res.rowsList[0]
          if (res.hasOwnProperty('XZQ')) {
            const gcddArray = res['XZQ'].map((item, index) => {
              return item['value']
            })
            this.GCDDSelectList = gcddArray
          }
          // 建设性质
          if (res.hasOwnProperty('JSXZ')) {
            this.JSXZ = res['JSXZ']
          }
          // 土地来源
          if (res.hasOwnProperty('TDLY')) {
            this.TDLY = res['TDLY']
          }
          // 现场取件地址
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取测量委托书模板
    getCLWTS () {
      this.$WebApi.preBusiness['GetEntrustTempWeb']()
        .then(res => {
          this.WTS = res.rowsList[0].WTSMB
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 根据行政区变化动态获得“现场取件地址”
    handleXZQChange (value) {
      const form = new FormData()
      form.append('sXZQ', value)
      // sXZQ: value
      // 获取窗口信息
      this.$WebApi.preBusiness['GetWindowsInfo'](form)
        .then(res => {
          this.QJDZ = res.rowsList[0].CKDZ
          console.log(res.rowsList[0].CKDZ)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 测量事项改变后作出提示
    clsxChange (val) {},
    // 判断所有表单选项是否满足提交要求
    isEnableSubmit () {
      let isEnableSubmit
      this.$refs.ruleForm.validate((boolean, obj) => {
        if (boolean) {
          isEnableSubmit = true
          // this.$message.success('基础表单项填写成功')
        } else {
          isEnableSubmit = false
          this.$message.error('基础表单项填写失败')
          return false
        }
      })
      return isEnableSubmit
    },
    // 获取表单数据（外部调用）
    getSubmitData () {
      if (
        this.permission.REC_CLWTS &&
        this.permission.REC_CLWTS.isShow === true &&
        this.permission.REC_CLWTS.isCheck === true
      ) {
        this.form.REC_CLWTS = this.$refs.dfTable.getSubmitData()
      }

      return JSON.parse(JSON.stringify(this.form))
    },
    saveCurrentData () {
      this.$emit('saveAllData')
    },
    fillData2form (object) {
      for (const key in object) {
        if (object.hasOwnProperty(key) && this.form.hasOwnProperty(key)) {
          this.form[key] = object[key]
        }
        if (key === 'REC_CLWTS') {
          this.tableData = this.getTableData() // 获取测量委托书上传表格数据
          this.$set(this.tableData, 'rowsList', object[key])
        }
      }
    },
    handleSubmitCommonData (num) {
      if (num === 1) {
        if (this.isEnableSubmit()) {
          this.$emit('currentStepOK', {
            componentName: 'CommonFormFinal',
            num: num
          })
        }
      } else {
        this.$emit('currentStepOK', {
          componentName: 'CommonFormFinal',
          num: num
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.common-form {
  padding: 0 20px 0 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
  }
  .footer {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .my-button {
      min-width: 300px;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
