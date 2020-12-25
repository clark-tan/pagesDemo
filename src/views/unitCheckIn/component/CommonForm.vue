<!--
 * @Description: 通用委托书表单 以此版本改造
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-10 10:04:32
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-09 10:12:00
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
      <a-form-model-item label="用户名" prop="username" ref="username">
        <a-input placeholder="请输入用户名" v-model="form.username" />
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password" ref="password">
        <a-input placeholder="请输入密码" v-model="form.password" type="password" />
      </a-form-model-item>
      <a-form-model-item label="确认密码" prop="password2" ref="password2">
        <a-input placeholder="请再次输入密码" v-model="form.password2" type="password" />
      </a-form-model-item>
      <a-form-model-item label="单位名称" prop="dwmc" ref="dwmc">
        <a-input placeholder="请输入注册用户单位名称" v-model="form.dwmc" />
      </a-form-model-item>
      <a-form-model-item label="单位注册详细地址" prop="zcxxdz" ref="zcxxdz">
        <a-input placeholder="请输入单位注册详细地址" v-model="form.zcxxdz" />
      </a-form-model-item>
      <a-form-model-item label="姓名" prop="lxr" ref="lxr">
        <a-input placeholder="请输入联系人姓名" v-model="form.lxr" />
      </a-form-model-item>
      <a-form-model-item label="统一社会信用代码" prop="tyshxydm" ref="tyshxydm">
        <a-input placeholder="请输入统一社会信用代码" v-model="form.tyshxydm" />
      </a-form-model-item>
      <a-form-model-item label="单位性质" prop="DWXZ" ref="DWXZ">
        <a-select v-model="form.DWXZ" placeholder="请选择机构性质" @change="handleDWXZChange">
          <a-select-option v-for="(item, index) in innerData.DWXZ_LIST" :key="index" :value="item">{{
            item
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <!-- <a-row>
        <a-col span="12">
          <a-form-model-item label="单位性质" prop="DWXZ" ref="DWXZ" :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }">
            <a-select v-model="form.DWXZ" placeholder="请选择机构性质" @change="handleDWXZChange">
              <a-select-option v-for="(item, index) in innerData.DWXZ_LIST" :key="index" :value="item">{{
                item
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item
            label="是否多证合一"
            prop="REC_DZHY"
            ref="REC_DZHY"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }"
          >
            <a-select v-model="form.REC_DZHY" placeholder="请选择多证合一选项" @change="handleDZHYChange">
              <a-select-option v-for="(item, index) in innerData.DZHY_LIST" :key="index" :value="item">{{
                item
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row> -->

      <!-- <a-form-model-item label="社会统一信用代码" prop="REC_SHTYXYDM" ref="REC_SHTYXYDM">
        <a-input placeholder="请输入社会统一信用代码" v-model="form.REC_SHTYXYDM" />
      </a-form-model-item> -->
      <a-form-model-item label="法定代表人" prop="FRDB" ref="FRDB">
        <a-input placeholder="请输入法定代表人" v-model="form.FRDB" />
      </a-form-model-item>

      <a-row :gutter="4">
        <a-col span="8">
          <a-form-model-item
            label="法定代表人证件类型"
            ref="FRZJLX"
            prop="FRZJLX"
            :labelCol="{ span: 12 }"
            :wrapperCol="{ span: 12 }"
          >
            <a-select v-model="form.FRZJLX" placeholder="请选择法定代表人证件类型" @change="handleFRZJLXChange">
              <a-select-option v-for="(item, index) in innerData.FRZJLX_LIST" :key="index" :value="item">{{
                item
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="16">
          <a-form-model-item label="" :wrapperCol="{ span: 24 }" prop="FRDBZJH" ref="FRDBZJH">
            <a-input placeholder="请输入法定代表人证件号" v-model="form.FRDBZJH" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-form-model-item label="注册资本币种" prop="ZCZBMZ" ref="ZCZBMZ">
        <a-select v-model="form.ZCZBMZ" placeholder="请选择注册资本币种" @change="handleZCZBMZChange">
          <a-select-option v-for="(item, index) in innerData.ZCZBMZ_LIST" :key="index" :value="item">{{
            item
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="注册资本（万元）" prop="ZCZB" ref="ZCZB">
        <a-input placeholder="请输入注册资本" v-model="form.ZCZB" />
      </a-form-model-item>
      <a-form-model-item label="营业有效期" prop="YYYXQZ" ref="YYYXQZ">
        <a-range-picker
          :placeholder="['营业有效期起', '营业有效期止']"
          @change="handleYYYXQChange"
          v-model="form.YYYXQZ"
        />
      </a-form-model-item>
      <a-form-model-item label="经营范围" prop="JYFW" ref="JYFW">
        <a-textarea placeholder="请输入经营范围" v-model="form.JYFW" />
      </a-form-model-item>
      <a-row :gutter="4">
        <a-col span="8">
          <a-form-model-item
            label="办公地省份"
            ref="BGDZSF"
            prop="BGDZSF"
            :labelCol="{ span: 12 }"
            :wrapperCol="{ span: 12 }"
          >
            <a-select v-model="form.BGDZSF" placeholder="办公地省份" @change="handleBGDZSFChange">
              <a-select-option v-for="(item, index) in innerData.BGDZSF_LIST" :key="index" :value="item">{{
                item
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="16">
          <a-form-model-item label="" :wrapperCol="{ span: 24 }" prop="BGXXDZ" ref="BGXXDZ">
            <a-input placeholder="请输入办公地址详细信息" v-model="form.BGXXDZ" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!-- <a-form-model-item label="注册地邮编" prop="REC_ZCDYB" ref="REC_ZCDYB">
        <a-input placeholder="请输入注册地邮编" v-model="form.REC_ZCDYB" />
      </a-form-model-item> -->

      <a-row :gutter="4">
        <a-col span="8">
          <a-form-model-item
            label="注册地省份"
            ref="ZCDZSF"
            prop="ZCDZSF"
            :labelCol="{ span: 12 }"
            :wrapperCol="{ span: 12 }"
          >
            <a-select v-model="form.ZCDZSF" placeholder="请选择注册地省份" @change="handleZCDZSFChange">
              <a-select-option v-for="(item, index) in innerData.ZCDZSF_LIST" :key="index" :value="item">{{
                item
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="16">
          <a-form-model-item label="" :wrapperCol="{ span: 24 }" prop="ZCXXDZ" ref="ZCXXDZ">
            <a-input placeholder="请输入注册地址详细信息" v-model="form.ZCXXDZ" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="办公地邮编" prop="REC_BGDYB" ref="REC_BGDYB">
        <a-input placeholder="请输入办公地邮编" v-model="form.REC_BGDYB" />
      </a-form-model-item>
      <a-form-model-item label="材料上传" prop="FILE" ref="FILE">
        <upload-table ref="dfTable" :tableData="tableData" :disabled="false"></upload-table>
      </a-form-model-item>

      <a-form-model-item label="业务授权代理人" prop="REC_YWSQDLR" ref="REC_YWSQDLR">
        <a-input placeholder="请输入业务授权代理人" v-model="form.REC_YWSQDLR" />
      </a-form-model-item>

      <a-row :gutter="4">
        <a-col span="8">
          <a-form-model-item
            label="业务授权代理人证件号"
            ref="REC_YWSQDLRZJLX"
            prop="REC_YWSQDLRZJLX"
            :labelCol="{ span: 12 }"
            :wrapperCol="{ span: 12 }"
          >
            <a-select
              v-model="form.REC_YWSQDLRZJLX"
              placeholder="请选择业务授权代理人证件类型"
              @change="handleYWSQDLRZJLXChange"
            >
              <a-select-option v-for="(item, index) in innerData.YWSQDLRZJLX_LIST" :key="index" :value="item">{{
                item
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="16">
          <a-form-model-item label="" :wrapperCol="{ span: 24 }" prop="REC_YWSQDLRZJH" ref="REC_YWSQDLRZJH">
            <a-input placeholder="请输入业务授权代理人证件号" v-model="form.REC_YWSQDLRZJH" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-form-model-item label="联系电话" prop="REC_LXDH" ref="REC_LXDH">
        <a-input placeholder="例如：020-23380999 或者 15812341234" v-model="form.REC_LXDH" />
      </a-form-model-item>
      <a-form-model-item label="电子邮箱" prop="REC_DZYX" ref="REC_DZYX">
        <a-input v-model="form.REC_DZYX" />
      </a-form-model-item>
    </a-form-model>

    <!-- <button @click="isFulfillSubmit">检验</button> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isEmail, isMobile, isTel } from '@/utils/verify'
import { lightApi } from '@/api/common/baseUrl'
import UploadTable from '@/views/common/UploadTable'
// import moment from 'moment'
export default {
  name: 'CommonForm',
  components: { 'upload-table': UploadTable },
  props: {},
  data () {
    return {
      lightApi,
      innerData: {
        DWXZ_LIST: ['企业', '事业单位', '社会组织'],
        DZHY_LIST: ['是', '否'],
        ZCZBMZ_LIST: ['人民币', '美元'],
        BGDZSF_LIST: ['中山市', '广州市', '东莞市'],
        ZCDZSF_LIST: ['中国', '美国'],
        FRZJLX_LIST: ['身份证', '护照'],
        YWSQDLRZJLX_LIST: ['身份证', '护照']
      },
      form: {
        username: '',
        password: '',
        password2: '',
        dwmc: '',
        zcxxdz: '',
        lxr: '',
        tyshxydm: '',
        DWXZ: '',
        REC_DZHY: '',
        REC_SHTYXYDM: '',
        FRDB: '',
        FRZJLX: '',
        FRDBZJH: '',
        ZCZBMZ: '',
        ZCZB: '',
        YYYXQZ: [],
        JYFW: '',
        REC_ZCDYB: '',
        ZCDZSF: '',
        ZCXXDZ: '',
        REC_BGDYB: '',
        REC_YWSQDLR: '',
        REC_YWSQDLRZJLX: '',
        REC_YWSQDLRZJH: '',
        BGDZSF: '',
        BGXXDZ: '',
        REC_LXDH: '',
        REC_DZYX: '',
        FILE: []
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          }
        ],
        password2: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: ['blur', 'change']
          }
        ],
        dwmc: [
          {
            required: true,
            message: '请输入注册用户单位名称',
            trigger: ['blur', 'change']
          }
        ],
        zcxxdz: [
          {
            required: true,
            message: '请输入单位注册详细地址',
            trigger: ['blur', 'change']
          }
        ],
        lxr: [
          {
            required: true,
            message: '请输入联系人姓名',
            trigger: ['blur', 'change']
          }
        ],
        tyshxydm: [
          {
            required: true,
            message: '请输入统一社会信用代码',
            trigger: ['blur', 'change']
          }
        ],
        DWXZ: [
          {
            required: true,
            message: '请选择机构性质',
            trigger: ['blur', 'change']
          }
        ],
        REC_DZHY: [
          {
            required: true,
            message: '请选择多证合一选项',
            trigger: ['blur', 'change']
          }
        ],
        REC_SHTYXYDM: [
          {
            required: true,
            message: '请输入社会统一信用代码',
            trigger: ['blur', 'change']
          }
        ],
        FRDB: [
          {
            required: true,
            message: '请输入法定代表人',
            trigger: ['blur', 'change']
          }
        ],
        FRZJLX: [
          {
            required: true,
            message: '请选择法定代表人证件类型',
            trigger: ['blur', 'change']
          }
        ],
        FRDBZJH: [
          {
            required: true,
            message: '请输入法定代表人证件号',
            trigger: ['blur', 'change']
          }
        ],
        ZCZBMZ: [
          {
            required: true,
            message: '请选择注册资本币种',
            trigger: ['blur', 'change']
          }
        ],
        ZCZB: [
          {
            required: true,
            message: '请输入注册资本',
            trigger: ['blur', 'change']
          }
        ],
        YYYXQZ: [
          {
            required: true,
            message: '请选择营业有效期',
            trigger: ['blur', 'change']
          }
        ],
        JYFW: [
          {
            required: true,
            message: '请输入经营范围',
            trigger: ['blur', 'change']
          }
        ],
        REC_ZCDYB: [
          {
            required: true,
            message: '请输入注册地邮编',
            trigger: ['blur', 'change']
          }
        ],
        ZCDZSF: [
          {
            required: true,
            message: '请选择注册地省份',
            trigger: ['blur', 'change']
          }
        ],
        ZCXXDZ: [
          {
            required: true,
            message: '请输入注册地址详细信息',
            trigger: ['blur', 'change']
          }
        ],
        REC_BGDYB: [
          {
            required: true,
            message: '请输入办公地邮编',
            trigger: ['blur', 'change']
          }
        ],
        REC_YWSQDLR: [
          {
            required: true,
            message: '请输入业务授权代理人',
            trigger: ['blur', 'change']
          }
        ],
        REC_YWSQDLRZJLX: [
          {
            required: true,
            message: '请选择业务授权代理人证件类型',
            trigger: ['blur', 'change']
          }
        ],
        REC_YWSQDLRZJH: [
          {
            required: true,
            message: '请输入业务授权代理人证件号',
            trigger: ['blur', 'change']
          }
        ],
        BGDZSF: [
          {
            required: true,
            message: '请选择办公地省份',
            trigger: ['blur', 'change']
          }
        ],
        BGXXDZ: [
          {
            required: true,
            message: '请输入办公地址详细信息',
            trigger: ['blur', 'change']
          }
        ],
        FILE: [
          {
            required: true,
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
        REC_DZYX: [
          {
            required: true,
            message: '请正确输入邮箱',
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (isEmail(value)) {
                callback()
              } else {
                callback(new Error('请正确输入邮箱'))
              }
            }
          }
        ],
        REC_LXDH: [
          {
            required: true,
            message: '请正确输入联系电话',
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (isTel(value) || isMobile(value)) {
                callback()
              } else {
                callback(new Error('请正确输入联系电话'))
              }
            }
          }
        ]
      },
      GCDDSelectList: [], // 工程地点
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
    'form.BGDZSF': {
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
    this.tableData = this.getTableData() // 获取测量委托书上传表格数据
  },
  methods: {
    // 从登陆用户信息表获取委托表单所需要的部分字段
    getDataFromUserInfo () {
      const obj = this.user
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
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
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 根据行政区变化动态获得“现场取件地址”
    handleXZQChange (value) {
      // this.$WebApi.preBusiness['GetWindowsInfo']({ xzq: value })
      //   .then(res => {
      //     this.QJDZ = res.rowsList[0].CKDZ
      //     console.log(res.rowsList[0].CKDZ)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
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
      const temp = JSON.parse(JSON.stringify(this.form))
      let strTime = []
      if (temp.YYYXQZ && temp.YYYXQZ.length > 0) {
        strTime = temp.YYYXQZ.map((item, index) => {
          return item.format('YYYY-MM-DD')
        })
      }
      temp.YYYXQZ = strTime
      temp.FILE = this.$refs.dfTable.getSubmitData()
      return temp
    },
    handleDWXZChange () {},
    handleDZHYChange () {},
    handleZCZBMZChange () {},
    handleYYYXQChange (date, dateString) {
      console.log(date, dateString)
      console.log(this.form.YYYXQZ)
    },
    handleBGDZSFChange () {},
    handleZCDZSFChange () {},
    handleFRZJLXChange () {},
    handleYWSQDLRZJLXChange () {}
  }
}
</script>

<style scoped lang="less"></style>
