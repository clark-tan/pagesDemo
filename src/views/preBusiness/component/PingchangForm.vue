<!--
 * @Description: 通用委托书表单 以此版本改造
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-06-10 10:04:32
 * @LastEditors: Ethan Jiang
 * @LastEditTime: 2020-08-12 09:46:42
-->

<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 17 }"
      class="form"
    >
      <div style="height: 40px;background: grey"><span>基本收件信息</span></div>
      <a-form-model-item label="申请事项" prop="REC_SBYW" ref="REC_SBYW">
        <a-select placeholder="请选择申请事项" v-model="form.REC_SBYW" @change="SBYW_Change">
          <template v-for="(item, index) in inData.SBYW_LIST">
            <a-select-option :key="index" :value="item.value">
              {{ item.value }}
            </a-select-option>
          </template>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="建设单位" prop="REC_WTDW" ref="REC_WTDW">
        <a-input placeholder="请输入建设单位" v-model="form.REC_WTDW" />
      </a-form-model-item>
      <a-form-model-item label="单位性质" prop="REC_DWXZ" ref="REC_DWXZ">
        <a-select placeholder="请选择单位性质" v-model="form.REC_DWXZ" @change="DWXZ_Change">
          <template v-for="(item, index) in inData.DWXZ_LIST">
            <a-select-option :key="index" :value="item.value">
              {{ item.value }}
            </a-select-option>
          </template>
        </a-select>
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
        <a-col span="9">
          <a-form-model-item
            label="联系电话"
            prop="REC_LXDH"
            ref="REC_LXDH"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
          >
            <a-input
              placeholder="例如：020-23380999 或者 15812341234"
              v-model="form.REC_LXDH"
              @blur="
                () => {
                  $refs.REC_LXDH.onFieldBlur()
                }
              "
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="电子邮箱" prop="REC_DZYX" ref="REC_DZYX">
        <a-input
          v-model="form.REC_DZYX"
          @blur="
            () => {
              $refs.REC_DZYX.onFieldBlur()
            }
          "
        />
      </a-form-model-item>
      <div style="height: 40px;background: grey"><span>建设项目信息</span></div>
      <!-- ================================================= -->
      <!-- 建设项目选址（用地预审）审批 -->
      <template v-if="form.REC_SBYW === '建设项目选址（用地预审）审批'">
        <a-form-model-item label="建设项目名称" prop="REC_JSXMMC" ref="REC_JSXMMC">
          <a-input placeholder="请输入建设项目名称" v-model="form.REC_JSXMMC" />
        </a-form-model-item>
        <a-form-model-item label="建设项目编号" prop="REC_JSXMBH" ref="REC_JSXMBH">
          <a-input placeholder="请输入建设项目编号" v-model="form.REC_JSXMBH" />
        </a-form-model-item>
      </template>
      <!-- 建设项目选址（用地预审）审批 -->
      <a-row :gutter="4">
        <a-col span="16">
          <a-form-model-item
            label="工规证号"
            prop="REC_GCBH"
            ref="REC_GCBH"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
          >
            <a-input
              placeholder="请填写建设工程规划许可证上的工程编号"
              v-model="form.REC_GCBH"
              @blur="
                () => {
                  $refs.REC_GCBH.onFieldBlur()
                }
              "
            />
          </a-form-model-item>
        </a-col>
        <a-col span="5">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-button block disabled>根据工规证号调取工程信息(暂未开通)</a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="工程名称" prop="REC_GCMC" ref="REC_GCMC">
        <a-input
          placeholder="请填写建设工程规划许可证上的工程名称"
          v-model="form.REC_GCMC"
          @blur="
            () => {
              $refs.REC_GCMC.onFieldBlur()
            }
          "
        />
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
        <a-col span="13">
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

      <!-- <a-form-model-item label="测量事项" prop="REC_CLSX" v-show="true">
        <a-checkbox-group v-model="form.REC_CLSX" @change="clsxChange">
          <a-checkbox v-for="(item, index) in CLSXCheckboxList" :key="index" :value="item" name="REC_CLSX">{{
            item
          }}</a-checkbox>
        </a-checkbox-group>
      </a-form-model-item> -->

      <!-- 此处需要新增一个测量委托书 -->
      <!-- <a-form-model-item label="测量委托书" prop="REC_CLWTS">
        <p>
          {{ WTS.WTSSM }}
          <a :href="WTS.WTSMB" download="委托书模板">下载委托书模板</a>
        </p>
        <upload-table ref="dfTable" :tableData="tableData" :disabled="false"></upload-table>
      </a-form-model-item> -->

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
          <a-input
            v-model="form.REC_SJDZ"
            @blur="
              () => {
                $refs.REC_SJDZ.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="邮寄联系人" prop="REC_SJR" ref="REC_SJR">
          <a-input
            v-model="form.REC_SJR"
            @blur="
              () => {
                $refs.REC_SJR.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="邮寄联系方式" prop="REC_SJDH" ref="REC_SJDH">
          <a-input
            v-model="form.REC_SJDH"
            @blur="
              () => {
                $refs.REC_SJDH.onFieldBlur()
              }
            "
          />
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
    <button @click="isFulfillSubmit">检验</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isEmail, isMobile, isTel } from '@/utils/verify'
import { lightApi } from '@/api/common/baseUrl'
import UploadTable from '@/views/common/UploadTable'
export default {
  name: 'PingchangForm',
  components: { 'upload-table': UploadTable },
  props: {},
  data () {
    return {
      lightApi,
      inData: {
        SBYW_LIST: [{ value: '建设项目选址（用地预审）审批' }, { value: '建设工程规划许可证审批' }],
        DWXZ_LIST: [{ value: '事业法人' }, { value: '社会组织法人' }]
      }, // 为列表选择项
      form: {
        REC_SBYW: [],
        REC_WTDW: '',
        REC_DWXZ: '',
        REC_LXR: '',
        REC_LXDH: '',
        REC_DZYX: '',
        REC_JSXMMC: '',
        REC_JSXMBH: '',

        REC_GCMC: '',
        REC_GCBH: '',
        REC_XMFM: '',
        REC_JSXZ: '新建',
        REC_TDLY: '划拨',
        REC_XZQ: '',
        REC_GCXXDD: '',
        REC_CLSX: [],

        REC_JSDWDZ: '',

        REC_CLWTS: [],
        REC_QJFS: '现场取件',
        REC_SJDZ: '',
        REC_SJR: '',
        REC_SJDH: ''
      },
      rules: {
        REC_SBYW: [
          {
            required: true,
            message: '请选择申请事项',
            trigger: ['change']
          }
        ],
        REC_DWXZ: [
          {
            required: true,
            message: '请选择单位性质',
            trigger: ['change']
          }
        ],
        REC_JSXMMC: [
          {
            required: true,
            message: '请输入建设项目名称',
            trigger: ['change', 'blur']
          }
        ],
        REC_JSXMBH: [
          {
            required: true,
            message: '请输入建设项目编号',
            trigger: ['change', 'blur']
          }
        ],
        REC_GCMC: [
          {
            required: true,
            message: '请填写建设工程规划许可证上的工程名称',
            trigger: 'blur'
          }
        ],
        REC_GCBH: [
          {
            required: true,
            message: '请填写建设工程规划许可证上的工程编号',
            trigger: 'blur'
          }
        ],
        REC_XMFM: [
          {
            required: true,
            message: '“渝快办”上面的项目赋码，一般在项目立项时由发改委分配',
            trigger: 'blur'
          }
        ],
        REC_XZQ: [
          {
            required: true,
            message: '请填写规划许可证上的工程地点',
            trigger: 'change'
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
            trigger: 'blur'
          }
        ],
        REC_CLSX: [
          {
            required: true,
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
            trigger: 'blur'
          }
        ],
        REC_JSDWDZ: [
          {
            required: true,
            message: '请正确填写单位地址',
            trigger: 'blur'
          }
        ],
        REC_LXR: [
          {
            required: true,
            message: '请正确填写联系人',
            trigger: 'blur'
          }
        ],
        REC_DZYX: [
          {
            required: true,
            message: '请正确填写邮箱',
            trigger: 'blur',
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
            trigger: 'blur',
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
  watch: {},
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
          // 申请事项
          if (res.hasOwnProperty('SQSX')) {
            this.$set(this.inData, 'SBYW_LIST', res['SQSX'])
          }
          // 单位性质
          if (res.hasOwnProperty('DWXZ')) {
            this.$set(this.inData, 'DWXZ_LIST', res['DWXZ'])
          }
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
    // 判断所有表单选项是否满足提交要求
    isFulfillSubmit () {
      this.$refs.ruleForm.validate((boolean, obj) => {
        if (boolean) {
          console.log(1)
        } else {
          console.log(2)
          return false
        }
      })
    },
    SBYW_Change (value) {
      console.log(value)
    },
    DWXZ_Change (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped lang="less"></style>
