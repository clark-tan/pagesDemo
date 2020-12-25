<!--
 * @Description: 委托书表单（永洲版本）
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-10 10:04:32
 * @LastEditors: clark tan
 * @LastEditTime: 2020-11-11 14:20:22
-->

<template>
  <div style="width: 99%">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 17 }"
      class="form"
    >
      <a-form-model-item label="项目类型" prop="REC_XMLX" ref="REC_XMLX">
        <a-cascader
          v-model="form.REC_XMLX"
          :options="XMLX_List"
          :show-search="{ XMLXfilter }"
          placeholder="请选择项目类型"
          @change="XMLXChange"
          :allowClear="false"
        />
      </a-form-model-item>

      <a-form-model-item label="项目名称" prop="REC_XMMC" ref="REC_XMMC">
        <a-input placeholder="请填写项目名称" v-model="form.REC_XMMC" />
      </a-form-model-item>
      <a-row :gutter="4">
        <a-col span="8">
          <a-form-model-item
            label="项目地点"
            prop="REC_XZQ"
            ref="REC_XZQ"
            :labelCol="{ span: 12 }"
            :wrapperCol="{ span: 12 }"
          >
            <a-select v-model="form.REC_XZQ" placeholder="请选择项目地点" @change="handleXZQChange">
              <a-select-option v-for="(item, index) in GCDDSelectList" :key="index" :value="item">{{
                item
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="13">
          <a-form-model-item label="" prop="REC_GCXXDD" ref="REC_GCXXDD" :wrapperCol="{ span: 24 }">
            <a-input placeholder="请填写项目详细地址" v-model="form.REC_GCXXDD" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="项目内容及要求" prop="REC_XMNRJYQ" ref="REC_XMNRJYQ">
        <a-textarea placeholder="请填写项目内容及要求" v-model="form.REC_XMNRJYQ" :rows="4" />
      </a-form-model-item>
      <a-row>
        <a-col span="12">
          <a-form-model-item
            label="委托人（单位）"
            prop="REC_WTDW"
            ref="REC_WTDW"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-input v-model="form.REC_WTDW" />
          </a-form-model-item>
        </a-col>
        <a-col span="9">
          <a-form-model-item
            label="联系号码"
            prop="REC_LXHM"
            ref="REC_LXHM"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
          >
            <a-input placeholder="例如：020-23380999 或者 15812341234" v-model="form.REC_LXHM" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-model-item
            label="证件类型"
            prop="REC_ZJLX"
            ref="REC_ZJLX"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-select v-model="form.REC_ZJLX" placeholder="请选择证件类型" @change="handleZJLXChange">
              <a-select-option v-for="(item, index) in ZJLXSelectList" :key="index" :value="item.value">{{
                item.value
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="9">
          <a-form-model-item
            label="证件号码"
            prop="REC_ZJHM"
            ref="REC_ZJHM"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
          >
            <a-input placeholder="请填写证件号码" v-model="form.REC_ZJHM" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="材料附件" prop="FILE" ref="FILE">
        <!-- <p>
          {{ WTS.WTSSM }}
          <a :href="WTS.WTSMB" download="委托书模板">下载委托书模板</a>
        </p> -->
        <upload-table ref="dfTable" :tableData="tableData" :disabled="false"></upload-table>
      </a-form-model-item>

      <a-form-model-item label="成果领取方式" prop="REC_QJFS" ref="REC_QJFS">
        <a-radio-group v-model="form.REC_QJFS">
          <template v-for="item in CGLQFSList">
            <a-radio :key="item.key" :value="item.value">{{ item.value }}</a-radio>
          </template>
        </a-radio-group>
      </a-form-model-item>
      <template v-if="form.REC_QJFS == '邮件快递'">
        <a-row>
          <a-col span="12">
            <a-form-model-item
              label="邮寄联系人"
              prop="REC_SJR"
              ref="REC_SJR"
              :labelCol="{ span: 8 }"
              :wrapperCol="{ span: 14 }"
            >
              <a-input v-model="form.REC_SJR" />
            </a-form-model-item>
          </a-col>
          <a-col span="12">
            <a-form-model-item
              label="邮寄联系方式"
              prop="REC_SJDH"
              ref="REC_SJDH"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 12 }"
            >
              <a-input v-model="form.REC_SJDH" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="邮寄收件地址" prop="REC_SJDZ" ref="REC_SJDZ">
          <a-input v-model="form.REC_SJDZ" />
        </a-form-model-item>
      </template>
    </a-form-model>
    <div style="text-align: center;margin: 20px">
      <a-checkbox @change="checkBoxChange">
        <span style="color: red">
          本人郑重声明：填写信息、资料上传全部真实可靠，无弄虚作假行为。如有不符，本人愿意承担所有由此引起的法律后果。
        </span>
      </a-checkbox>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isMobile, isTel } from '@/utils/verify'
import { lightApi } from '@/api/common/baseUrl'
import UploadTable from '@/views/common/UploadTable'
export default {
  name: 'DelegateForm',
  components: { 'upload-table': UploadTable },
  props: {},
  data () {
    return {
      lightApi,
      form: {
        REC_XMMC: '',
        REC_XMLX: [],
        REC_XZQ: '',
        REC_GCXXDD: '',
        REC_XMNRJYQ: '',
        REC_WTDW: '',
        REC_LXHM: '',
        REC_ZJLX: '',
        REC_ZJHM: '',
        REC_QJFS: '窗口自取',
        REC_SJDZ: '',
        REC_SJR: '',
        REC_SJDH: '',
        FILE: []
      },
      rules: {
        REC_XMMC: [
          {
            required: true,
            message: '请填写项目名称',
            trigger: ['change', 'blur']
          }
        ],
        REC_XZQ: [
          {
            required: true,
            message: '请选择项目地点',
            trigger: 'change'
          }
        ],
        REC_XMLX: [
          {
            required: true,
            message: '请选择项目类型',
            trigger: 'change'
          }
        ],
        REC_GCXXDD: [
          {
            required: true,
            message: '请正确填写项目详细地址',
            trigger: ['change', 'blur']
          }
        ],
        REC_XMNRJYQ: [
          {
            required: true,
            message: '请正确填写项目内容及要求',
            trigger: ['change', 'blur']
          }
        ],
        FILE: [
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
            message: '请正确填写委托人（单位）',
            trigger: ['change', 'blur']
          }
        ],
        REC_LXHM: [
          {
            required: true,
            message: '请正确填写联系电话',
            trigger: ['change', 'blur'],
            validator: (rule, value, callback) => {
              if (isTel(value) || isMobile(value)) {
                callback()
              } else {
                callback(new Error('请正确填写联系电话'))
              }
            }
          }
        ],
        REC_ZJLX: [
          {
            required: true,
            message: '请选择合适的证件类型',
            trigger: ['change', 'blur']
          }
        ],
        REC_ZJHM: [
          {
            required: true,
            message: '请填写正确的证件号码',
            trigger: ['change', 'blur']
            // validator: (rule, value, callback) => {
            //   if (value === '') {
            //     callback(new Error('请输入正确的证件号码'))
            //   } else {
            //     const myKey = this.form.REC_ZJLX
            //     let pattern = ''
            //     this.ZJLXSelectList.map((item, index) => {
            //       if (item['value'] === myKey) {
            //         pattern = item['pattern']
            //       }
            //     })
            //     if (!this._.isEmpty(pattern)) {
            //       const patternArr = pattern.split(',')
            //       let pattern1
            //       if (!this._.isEmpty(patternArr[1])) {
            //         pattern1 = new RegExp(patternArr[0], patternArr[1])
            //       } else {
            //         pattern1 = new RegExp(patternArr[0])
            //       }
            //       if (pattern1.test(value)) {
            //         callback()
            //       } else {
            //         callback(new Error('请输入正确的证件号码'))
            //       }
            //     } else {
            //       callback()
            //     }
            //   }
            // }
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
            trigger: 'blur'
          }
        ],
        REC_SJR: [
          {
            required: true,
            message: '请填写邮寄联系人',
            trigger: 'blur'
          }
        ],
        REC_SJDH: [
          {
            required: true,
            message: '请填写邮寄联系方式',
            trigger: 'blur'
          }
        ]
      },
      ZJLXSelectList: [], // 证件类型
      CGLQFSList: [], // 成果领取方式
      XMLX_List: [], // 项目类型
      GCDDSelectList: [], // 工程地点
      QJDZ: '', // 取件地址
      WTS: {}, // 委托书相关字段
      tableData: {
        columns: [],
        hideColumns: [],
        rowsList: []
      }, // 上传表格所需数据
      isAgreeProtocol: false // 是否同意协议
    }
  },
  computed: {
    ...mapGetters({ user: 'userInfo' })
  },
  watch: {},
  created () {},
  mounted () {
    this.getDataFromUserInfo() // 从登陆用户信息表获取委托表单所需要的部分字段
    this.getYWWT() // 获取表单部分默认数据
    // this.getCLWTS() // 获取测量委托书模板
    this.GetSurveyType() // 获取项目类型列表
  },
  methods: {
    // 从登陆用户信息表获取委托表单所需要的部分字段
    getDataFromUserInfo () {
      const obj = this.user
      console.log(obj)
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key === 'DWMC') {
            this.form['REC_WTDW'] = obj[key]
          }
          if (key === 'MOBILEPHONE') {
            this.form['REC_LXHM'] = obj[key]
          }
          if (key === 'ZJLX') {
            this.form['REC_ZJLX'] = obj[key]
          }
          if (key === 'ZJHM') {
            this.form['REC_ZJHM'] = obj[key]
          }
          if (key === 'DWMC') {
            this.form['REC_WTDW'] = obj[key]
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
          // 证件类型
          if (res.hasOwnProperty('ZJLX')) {
            this.ZJLXSelectList = res['ZJLX']
          }
          // 成果领取方式
          if (res.hasOwnProperty('CGLQFS')) {
            this.CGLQFSList = res['CGLQFS']
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取项目类型列表
    GetSurveyType () {
      this.$WebApi.preBusiness['GetSurveyType']()
        .then(res => {
          this.XMLX_List = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 根据行政区变化回调
    handleXZQChange (value) {},
    // 证件类型 change事件调用
    handleZJLXChange () {},
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
    clsxChange (val) {
      // this.GetProvideFileList()
    },
    // 获取需要提供附件材料列表
    GetProvideFileList (code) {
      this.$WebApi.preBusiness['GetProvideFileList']({
        sWTSX: code
      })
        .then(res => {
          if (res['rowsList'] && res['rowsList'].length > 0) {
            this.tableData = res
          }
        })
        .catch(err => {
          console.log(err)
        })
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
            FJLIST: [
              {
                FJNAME: '1',
                FJURL: 'https://pic2.zhimg.com/v2-9a3ca8a336873f523cc2c4fcdba8c57c_is.jpg'
              },
              {
                FJNAME: '2',
                FJURL: 'https://pic3.zhimg.com/50/v2-18c956fe89878bfbf89e4605d69363bb_400x224.jpg'
              }
            ]
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
    // 判断所有表单选项是否满足提交要求 (外部调用)
    isFulfillSubmit () {
      let isFulfillSubmit
      this.$refs.ruleForm.validate((boolean, obj) => {
        if (boolean) {
          isFulfillSubmit = true
          console.log(1)
        } else {
          isFulfillSubmit = false
          console.log(2)
          return false
        }
      })
      return isFulfillSubmit
    },
    // 外部获取此表单的数据 （外部调用）
    getFormData () {
      this.form.FILE = this.$refs.dfTable.getSubmitData()
      return this.form
    },
    checkBoxChange (e) {
      this.isAgreeProtocol = e.target.checked
    },
    // 项目类型级联选择
    XMLXfilter (inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    },
    // 项目级联改变回调
    XMLXChange (value, selectedOptions) {
      console.log(value, selectedOptions)
      const code = selectedOptions[selectedOptions.length - 1].value
      this.GetProvideFileList(code)
    }
  }
}
</script>

<style scoped lang="less"></style>
