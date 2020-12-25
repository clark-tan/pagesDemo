<!--
 * @Description: 通用委托书表单 以此版本改造
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-10 10:04:32
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-08-24 14:33:19
-->

<template>
  <div style="padding: 0 20px 0 0">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      class="form"
    >
      <a-row :gutter="4">
        <a-col span="16">
          <a-form-model-item
            label="工规证号"
            prop="REC_GCBH"
            ref="REC_GCBH"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
          >
            <a-input placeholder="请填写建设工程规划许可证上的工程编号" v-model="form.REC_GCBH" />
          </a-form-model-item>
        </a-col>
        <a-col span="8">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-button block disabled>根据工规证号调取工程信息(暂未开通)</a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="工程名称" prop="REC_GCMC" ref="REC_GCMC">
        <a-input placeholder="请填写建设工程规划许可证上的工程名称" v-model="form.REC_GCMC" />
      </a-form-model-item>
      <a-row :gutter="4">
        <a-col span="8">
          <a-form-model-item label="工程地点" prop="REC_XZQ" :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }">
            <a-select v-model="form.REC_XZQ" placeholder="请填写规划许可证上的工程地点" @change="handleXZQChange">
              <a-select-option v-for="(item, index) in GCDDSelectList" :key="index" :value="item">{{
                item
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="16">
          <a-form-model-item label="" :wrapperCol="{ span: 24 }" prop="REC_GCXXDD">
            <a-input placeholder="请填写工程详细地址" v-model="form.REC_GCXXDD" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-model-item
            label="建设性质"
            prop="REC_JSXZ"
            ref="REC_JSXZ"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-radio-group v-model="form.REC_JSXZ" placeholder="请选择建设性质">
              <a-radio v-for="(item, index) in JSXZ" :key="index" :value="item['value']">{{ item['value'] }}</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col span="9">
          <a-form-model-item
            label="土地来源"
            prop="REC_TDLY"
            ref="REC_TDLY"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
          >
            <a-radio-group v-model="form.REC_TDLY" placeholder="请选择土地来源">
              <a-radio v-for="(item, index) in TDLY" :key="index" :value="item['value']">{{ item['value'] }}</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-form-model-item label="建设单位" prop="REC_WTDW" ref="REC_WTDW">
        <a-input placeholder="请填写建设工程规划许可证上的建设单位" v-model="form.REC_WTDW" />
      </a-form-model-item>
      <a-row>
        <a-col span="12">
          <a-form-model-item
            label="联系人"
            prop="REC_LXR"
            ref="REC_LXR"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model="form.REC_LXR" />
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item
            label="联系电话"
            prop="REC_LXDH"
            ref="REC_LXDH"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }"
          >
            <a-input placeholder="例如：020-23380999 或者 15812341234" v-model="form.REC_LXDH" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="电子邮箱" prop="REC_DZYX" ref="REC_DZYX">
        <a-input v-model="form.REC_DZYX" />
      </a-form-model-item>

      <!-- <a-form-model-item label="测量事项" prop="REC_CLSX" v-show="true">
        <a-checkbox-group v-model="form.REC_CLSX" @change="clsxChange">
          <a-checkbox v-for="(item, index) in CLSXCheckboxList" :key="index" :value="item" name="REC_CLSX">{{
            item
          }}</a-checkbox>
        </a-checkbox-group>
      </a-form-model-item> -->

      <!-- 此处需要新增一个测量委托书 -->
      <a-form-model-item label="测量委托书" prop="REC_CLWTS">
        <p>
          {{ WTS.WTSSM }}
          <a :href="WTS.WTSMB" download="委托书模板">下载委托书模板</a>
        </p>
        <upload-table ref="dfTable" :tableData="tableData" :disabled="false"></upload-table>
      </a-form-model-item>

      <a-form-model-item label="取件方式" prop="REC_QJFS">
        <a-radio-group v-model="form.REC_QJFS">
          <a-radio value="现场取件">现场取件</a-radio>
          <a-radio value="邮寄送达" disabled>
            邮寄送达
            <a-tag color="#f50">（暂未开通）</a-tag>
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <template v-if="form.REC_QJFS == '邮寄送达'">
        <a-form-model-item label="邮寄收件地址" prop="REC_SJDZ" ref="REC_SJDZ">
          <a-input v-model="form.REC_SJDZ" />
        </a-form-model-item>
        <a-form-model-item label="邮寄联系人" prop="REC_SJR" ref="REC_SJR">
          <a-input v-model="form.REC_SJR" />
        </a-form-model-item>
        <a-form-model-item label="邮寄联系方式" prop="REC_SJDH" ref="REC_SJDH">
          <a-input v-model="form.REC_SJDH" />
        </a-form-model-item>
      </template>
      <template v-if="form.REC_QJFS == '现场取件'">
        <a-form-model-item v-if="form.REC_QJFS == '现场取件'" label="现场取件地址">
          <a-input :value="QJDZ" disabled placeholder="请先填写工程地点，系统会根据地点为您自动推荐最佳的取件地址" />
        </a-form-model-item>
      </template>

      <!-- <a-form-model-item label="项目赋码" prop="REC_XMFM" ref="REC_XMFM">
              <a-input
                placeholder="“渝快办”上面的项目赋码，一般在项目立项时由发改委分配"
                v-model="form.REC_XMFM"
                @blur="
                  () => {
                    $refs.REC_XMFM.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
            <a-form-model-item label="单位地址" prop="REC_JSDWDZ" ref="REC_JSDWDZ">
              <a-input
                v-model="form.REC_JSDWDZ"
                @blur="
                  () => {
                    $refs.REC_JSDWDZ.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>-->
    </a-form-model>
    <!-- <button @click="isFulfillSubmit">检验</button> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isEmail, isMobile, isTel } from '@/utils/verify'
import { lightApi } from '@/api/common/baseUrl'
import UploadTable from '@/views/common/UploadTable'
export default {
  name: 'CommonForm',
  components: { 'upload-table': UploadTable },
  props: {},
  data () {
    return {
      lightApi,
      form: {
        REC_GCMC: '',
        REC_GCBH: '',
        REC_XMFM: '',
        REC_JSXZ: '新建',
        REC_TDLY: '划拨',
        REC_XZQ: '',
        REC_GCXXDD: '',
        REC_CLSX: [],
        REC_WTDW: '',
        REC_JSDWDZ: '',
        REC_LXR: '',
        REC_LXDH: '',
        REC_DZYX: '',
        REC_CLWTS: [],
        REC_QJFS: '现场取件',
        REC_SJDZ: '',
        REC_SJR: '',
        REC_SJDH: ''
      },
      rules: {
        REC_GCMC: [
          {
            required: true,
            message: '请填写建设工程规划许可证上的工程名称',
            trigger: ['blur', 'change']
          }
        ],
        REC_GCBH: [
          {
            required: true,
            message: '请填写建设工程规划许可证上的工程编号',
            trigger: ['blur', 'change']
          }
        ],
        REC_XMFM: [
          {
            required: true,
            message: '“渝快办”上面的项目赋码，一般在项目立项时由发改委分配',
            trigger: ['blur', 'change']
          }
        ],
        REC_XZQ: [
          {
            required: true,
            message: '请填写规划许可证上的工程地点',
            trigger: ['blur', 'change']
          }
        ],
        REC_JSXZ: [
          {
            required: true,
            message: '请选择项目性质',
            trigger: 'change'
          }
        ],
        REC_TDLY: [
          {
            required: true,
            message: '请选择土地来源',
            trigger: 'change'
          }
        ],
        REC_GCXXDD: [
          {
            required: true,
            message: '请正确填写工程详细地址',
            trigger: ['blur', 'change']
          }
        ],
        REC_CLSX: [
          {
            required: false,
            message: '请勾选测量事项',
            trigger: 'change'
          }
        ],
        REC_CLWTS: [
          {
            required: true,
            message: ' ',
            validator: (rule, value, callback) => {
              if (this.$refs.dfTable.isAllSubmit()) {
                callback()
              } else {
                callback(new Error('请上传所有材料'))
              }
            }
          }
        ],
        REC_WTDW: [
          {
            required: true,
            message: '请正确填写建设单位',
            trigger: ['blur', 'change']
          }
        ],
        REC_JSDWDZ: [
          {
            required: true,
            message: '请正确填写单位地址',
            trigger: ['blur', 'change']
          }
        ],
        REC_LXR: [
          {
            required: true,
            message: '请正确填写联系人',
            trigger: ['blur', 'change']
          }
        ],
        REC_DZYX: [
          {
            required: true,
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
        REC_LXDH: [
          {
            required: true,
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
            required: true,
            message: '请选择取件方式',
            trigger: 'change'
          }
        ],
        REC_SJDZ: [
          {
            required: true,
            message: '请填写邮寄收件地址',
            trigger: ['blur', 'change']
          }
        ],
        REC_SJR: [
          {
            required: true,
            message: '请填写邮寄联系人',
            trigger: ['blur', 'change']
          }
        ],
        REC_SJDH: [
          {
            required: true,
            message: '请填写邮寄联系方式',
            trigger: ['blur', 'change']
          }
        ]
      },
      GCDDSelectList: [], // 工程地点
      CLSXCheckboxList: [], // 测量事项
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
    // 从登陆用户信息表获取委托表单所需要的部分字段
    getDataFromUserInfo () {
      const obj = this.user
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key === 'DWDZ') {
            this.form['REC_JSDWDZ'] = obj[key]
          }
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
            this.form['REC_LXDH'] = obj[key]
          }
        }
      }
    },
    // 获取表单部分默认数据
    getYWWT () {
      this.$WebApi.preBusiness['GetSurveyAndLocal']()
        .then(res => {
          // 工程地点
          if (res.hasOwnProperty('XZQ')) {
            const gcddArray = res['XZQ'].map((item, index) => {
              return item['value']
            })
            this.GCDDSelectList = gcddArray
          }
          // 测量事项
          if (res.hasOwnProperty('WTSX')) {
            const clsxArray = res['WTSX'].map((item, index) => {
              return item['value']
            })
            this.CLSXCheckboxList = clsxArray
            // TODO: 默认填满测量选项
            if (this.form['REC_CLSX'] && this.form['REC_CLSX'].length > 0) {
            } else {
              this.form.REC_CLSX = clsxArray
            }
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
    // 根据行政区变化动态获得“现场取件地址”
    handleXZQChange (value) {
      this.$WebApi.preBusiness['GetWindowsInfo']({ xzq: value })
        .then(res => {
          this.QJDZ = res.rowsList[0].CKDZ
          console.log(res.rowsList[0].CKDZ)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取测量委托书模板
    getCLWTS () {
      this.$WebApi.preBusiness['GetEntrustTempWeb']()
        .then(res => {
          this.WTS = res.rowsList[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 测量事项改变后作出提示
    clsxChange (val) {},
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
    // 判断所有表单选项是否满足提交要求
    isFulfillSubmit () {
      let isFulfillSubmit
      this.$refs.ruleForm.validate((boolean, obj) => {
        if (boolean) {
          console.log(1)
          isFulfillSubmit = true
        } else {
          console.log(2)
          isFulfillSubmit = false
          return false
        }
      })
      return isFulfillSubmit
    },
    // 获取表单数据（外部调用）
    getFormData () {
      this.form.FILE = this.$refs.dfTable.getSubmitData()
      return this.form
    }
  }
}
</script>

<style scoped lang="less"></style>
