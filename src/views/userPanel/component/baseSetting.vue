<template>
  <div class="baseSettingPage">
    <!-- 账号信息 -->
    <p class="title">
      账号信息
      <a-button type="link" @click="handleShowAccountModal">编辑</a-button>
    </p>
    <a-divider class="titleDivider" />
    <a-descriptions :column="2" :colon="false" class="infoDesc">
      <a-descriptions-item label="登录名">{{ accountForm.loginName || '-' }}</a-descriptions-item>
      <a-descriptions-item label="用户名">{{ accountForm.userName || '-' }}</a-descriptions-item>
      <a-descriptions-item label="昵称">{{ accountForm.nickName || '-' }}</a-descriptions-item>
      <a-descriptions-item label="账户类型">{{ accountForm.AccountType || '-' }}</a-descriptions-item>
      <a-descriptions-item label="证件类型">{{ accountForm.ZJLX || '-' }}</a-descriptions-item>
      <a-descriptions-item label="证件号码">{{ accountForm.ZJHM || '-' }}</a-descriptions-item>
      <a-descriptions-item label="单位地址">{{ accountForm.DWDZ || '-' }}</a-descriptions-item>
      <a-descriptions-item label="联系人">{{ accountForm.LXR || '-' }}</a-descriptions-item>
      <a-descriptions-item label="单位名称">{{ accountForm.DWMC || '-' }}</a-descriptions-item>
    </a-descriptions>
    <!-- 账号信息的编辑弹窗 -->
    <a-modal
      v-if="editAccountForm"
      :visible="true"
      :width="1000"
      title="修改账号信息"
      :confirm-loading="pageLoading"
      @ok="handleUpdate"
      @cancel="() => (editAccountForm = false)"
    >
      <a-spin :spinning="pageLoading">
        <a-form-model
          ref="editAccountForm"
          :rules="rules"
          :model="tempAccountForm"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-row :gutter="16">
            <a-col :span="12" v-if="tempAccountForm.AccountType === '个人'">
              <a-form-model-item label="用户名" prop="userName" ref="userName">
                <a-input v-model="tempAccountForm.userName" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="昵称" prop="nickName" ref="nickName">
                <a-input v-model="tempAccountForm.nickName" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="账号类型" prop="AccountType" ref="AccountType">
                <a-select placeholder="请选择账号类型" v-model="tempAccountForm.AccountType" @change="ZHLX_Change">
                  <template v-for="(item, index) in inData.ZHLX_LIST">
                    <a-select-option :key="index" :value="item.TITLE">
                      {{ item.TITLE }}
                    </a-select-option>
                  </template>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="证件类型" prop="ZJLX" ref="ZJLX">
                <a-select placeholder="请选择证件类型" v-model="tempAccountForm.ZJLX" @change="ZJLX_Change">
                  <template v-for="(item, index) in inData.ZJLX_LIST">
                    <a-select-option :key="index" :value="item.TITLE">
                      {{ item.TITLE }}
                    </a-select-option>
                  </template>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="证件号码" prop="ZJHM" ref="ZJHM">
                <a-input v-model="tempAccountForm.ZJHM" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="单位地址" prop="DWDZ" ref="DWDZ">
                <a-input v-model="tempAccountForm.DWDZ" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12" v-if="tempAccountForm.AccountType === '企业'">
              <a-form-model-item label="联系人" prop="LXR" ref="LXR">
                <a-input v-model="tempAccountForm.LXR" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="单位名称" prop="DWMC" ref="DWMC">
                <a-input v-model="tempAccountForm.DWMC" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="手机号码" prop="mobilePhone" ref="mobilePhone">
                <a-input v-model="tempAccountForm.mobilePhone" disabled />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="验证码">
                <a-col :span="16">
                  <a-input type="text" placeholder="请输入验证码" v-model="captchaForm.value">
                    <a-icon :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </a-input>
                </a-col>
                <a-col :span="8" style="text-align: right;">
                  <a-button
                    class="getCaptcha"
                    :disabled="captchaForm.sendBtn"
                    @click.stop.prevent="getCaptcha"
                    v-text="(!captchaForm.sendBtn && '获取验证码') || captchaForm.time + ' s'"
                  ></a-button>
                </a-col>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-spin>
    </a-modal>
    <!-- 地址信息的新增或编辑弹窗 -->
    <a-modal
      v-if="editAddressForm"
      :visible="true"
      :width="800"
      :title="`${tempAddressForm.id ? '编辑' : '新增'}地址信息`"
      :confirm-loading="pageLoading"
      @ok="summitAddressForm"
      @cancel="() => (editAddressForm = false)"
    >
      <a-spin :spinning="pageLoading">
        <a-form-model :model="tempAddressForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="收货人">
                <a-input v-model="tempAddressForm.name" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="电话号码">
                <a-input v-model="tempAddressForm.mobile" />
              </a-form-model-item>
            </a-col>descriptions
            <a-col :span="24">
              <a-form-model-item label="收件地址" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
                <cascader v-model="tempAddressForm.address1" style="width: calc(43% - 8px); margin-right: 16px;" />
                <a-input v-model="tempAddressForm.address2" style="width: calc(57% - 8px);" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item :wrapper-col="{ offset: 3, span: 18 }">
                <a-checkbox v-model="tempAddressForm.isDefault">设置为默认地址</a-checkbox>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import Cascader from '@/components/Cascader/Cascader'
import { routeUtils } from '@/utils/index'

export default {
  components: { Cascader },
  data () {
    return {
      pageLoading: false,
      // 账号信息 S
      accountForm: {
        DWDZ: '',
        DWMC: '',
        loginName: '',
        nickName: '',
        AccountType: '',
        LXR: '',
        mailBox: '',
        mobilePhone: '',
        userID: '',
        userName: '',
        ZJHM: '',
        ZJLX: ''
      },
      rules: {
        DWDZ: [
          {
            required: true,
            message: '请填写单位地址',
            trigger: ['blur', 'change']
          }
        ],
        nickName: [
          {
            required: true,
            message: '请填写昵称',
            trigger: ['blur', 'change']
          }
        ],
        AccountType: [
          {
            required: true,
            message: '请填写账号类型',
            trigger: ['blur', 'change']
          }
        ],
        DWMC: [
          {
            required: true,
            message: '请填写单位名称',
            trigger: ['blur', 'change']
          }
        ],
        loginName: [
          {
            required: true,
            message: '请填写登录名',
            trigger: ['blur', 'change']
          }
        ],
        LXR: [
          {
            required: true,
            message: '请填写联系人',
            trigger: ['blur', 'change']
          }
        ],
        mailBox: [
          {
            required: false,
            message: '请填写邮箱',
            trigger: ['blur', 'change']
          }
        ],
        mobilePhone: [
          {
            required: true,
            message: '请填写手机号码',
            trigger: ['blur', 'change']
          }
        ],
        userID: [
          {
            required: true,
            message: '请填写userID',
            trigger: ['blur', 'change']
          }
        ],
        userName: [
          {
            required: true,
            message: '请填写用户名',
            trigger: ['blur', 'change']
          }
        ],
        ZJHM: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入正确的证件号码'))
              } else {
                const myKey = this.tempAccountForm.ZJLX
                let pattern = ''
                console.log(this.inData['ZJLX_LIST'])
                this.inData['ZJLX_LIST'].map((item, index) => {
                  if (item['TITLE'] === myKey) {
                    pattern = item['EXTRAVALUE']
                  }
                })
                if (!this._.isEmpty(pattern)) {
                  // const patternArr = pattern
                  const patternArr = JSON.parse(pattern)
                  let pattern1
                  if (!this._.isEmpty(patternArr.option)) {
                    pattern1 = new RegExp(patternArr.patten, patternArr.option)
                  } else {
                    pattern1 = new RegExp(patternArr.patten)
                  }
                  if (pattern1.test(value)) {
                    this.CheckRegisterInfo('idNumber', value, res => {
                      if (res === '成功！') {
                        callback()
                      } else if (!this._.isEmpty(res) && res.hasOwnProperty('desc')) {
                        callback(new Error(res['desc']))
                      }
                    })
                  } else {
                    callback(new Error('请输入正确的证件号码'))
                  }
                } else {
                  callback()
                }
              }
            }
          }
        ],
        ZJLX: [
          {
            required: true,
            message: '请填写证件类型',
            trigger: ['blur', 'change']
          }
        ]
      },
      zjhmShow: false,
      editAccountForm: false,
      inData: {
        ZJLX_LIST: [
          {
            value: '身份证'
          },
          {
            value: '身份证2'
          },
          {
            value: '身份证3'
          }
        ],
        ZHLX_LIST: [
          {
            TITLE: '个人'
          },
          {
            TITLE: '企业'
          }
        ]
      },
      tempAccountForm: {
        DWDZ: '',
        DWMC: '',
        loginName: '',
        nickName: '',
        AccountType: '',
        LXR: '',
        mailBox: '',
        mobilePhone: '',
        userID: '',
        userName: '',
        ZJHM: '',
        ZJLX: ''
      },
      // 账号信息 E

      // 地址信息 S
      addressTableColumns: [
        {
          key: 'name',
          dataIndex: 'name',
          title: '收货人',
          width: 100
        },
        {
          key: 'address',
          title: '地址',
          scopedSlots: { customRender: 'address' }
        },
        {
          key: 'mobile',
          title: '手机号码',
          scopedSlots: { customRender: 'mobile' }
        },
        {
          key: 'action',
          title: '操作',
          align: 'right',
          width: 300,
          scopedSlots: { customRender: 'action' }
        }
      ],
      addressTableRows: [
        {
          id: '1212',
          name: '蓝浩瑜',
          address1: [
            {
              id: '440000',
              value: '广东省'
            },
            {
              id: '440100',
              value: '广州市'
            },
            {
              id: '440106',
              value: '天河区'
            }
          ],
          address2: '金碧世纪花园测试超2长长长长长长长长长长长长长长长长长长长',
          mobile: 18826102321,
          isDefault: true
        },
        {
          id: '232323',
          name: '蓝浩瑜',
          address1: [
            {
              id: '440000',
              value: '广东省'
            },
            {
              id: '440100',
              value: '广州市'
            },
            {
              id: '440106',
              value: '天河区'
            }
          ],
          address2: '金碧世纪花园测试超2长长长长长长',
          mobile: 18826102321,
          isDefault: false
        }
      ],
      editAddressForm: false,
      tempAddressForm: {},
      // 地址信息 E
      captchaForm: {
        time: 60,
        sendBtn: false,
        value: ''
      }
    }
  },
  computed () {},
  async mounted () {
    console.log(this.$store.state.user.user)
    this.accountForm = { ...this.$store.state.user.user }
    this.getOriginize()
  },
  methods: {
    getOriginize () {
      this.$WebApi.util['LookupDict']({
        listcode: '001'
      })
        .then(res => {
          console.log(res)
          this.inData.ZJLX_LIST = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleShowAccountModal () {
      this.tempAccountForm = { ...this.accountForm }
      this.editAccountForm = true
    },
    zjhmFormat (value) {
      value = value + ''
      return value ? value.slice(0, 4) + '****' + value.slice(-4) : ''
    },
    dhhmFormat (value) {
      value = value + ''
      return value ? value.slice(0, 3) + '****' + value.slice(-4) : ''
    },
    handleShowAddressModal (formData = {}) {
      this.tempAddressForm = {
        name: '',
        address1: [],
        address2: '',
        mobile: null,
        isDefault: false,
        ...formData
      }
      this.editAddressForm = true
    },
    async summitAddressForm () {
      this.pageLoading = true
      console.log(this.tempAddressForm)
      await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 500)
      })
      this.pageLoading = false
      this.editAddressForm = false
      if (this.tempAddressForm.id) {
        // TODO:换遮罩和接口
        const editRow = this.addressTableRows.find(row => row.id === this.tempAddressForm.id)
        editRow.name = this.tempAddressForm.name
        editRow.address1 = this.tempAddressForm.address1
        editRow.address2 = this.tempAddressForm.address2
        editRow.mobile = this.tempAddressForm.mobile
        editRow.isDefault = this.tempAddressForm.isDefault
        this.$message.success('修改成功')
      }
    },
    handleUpdate () {
      this.$refs.editAccountForm.validate((boolean, obj) => {
        if (boolean) {
          if (!Window._.isEmpty(this.captchaForm.value)) {
            this.pageLoading = true
            const params = {
              loginName: this.tempAccountForm.loginName,
              userID: this.tempAccountForm.userID,
              nickName: this.tempAccountForm.nickName,
              AccountType: this.tempAccountForm.AccountType,
              ZJLX: this.tempAccountForm.ZJLX,
              ZJHM: this.tempAccountForm.ZJHM,
              DWDZ: this.tempAccountForm.DWDZ,
              LXR: this.tempAccountForm.LXR,
              DWMC: this.tempAccountForm.DWMC,
              mobilePhone: this.tempAccountForm.mobilePhone,
              VALIDATE: this.captchaForm.value
            }
            this.$WebApi.user['updateProUser']({
              data: params
            })
              .then(res => {
                if (res.code === 998) {
                  this.pageLoading = false
                  this.$message.error(res.desc)
                } else {
                  this.pageLoading = false
                  this.editAccountForm = false
                  this.$message.success('修改成功', 2)
                  console.log(this.$store.state.user)
                  this.$store.state.user.user.ZJLX = params.ZJLX
                  this.$store.state.user.user.ZJHM = params.ZJHM
                  this.$store.state.user.user.DWDZ = params.DWDZ
                  this.$store.state.user.user.AccountType = params.AccountType
                  this.$store.state.user.user.LXR = params.LXR
                  this.$store.state.user.user.DWMC = params.DWMC
                  this.$store.state.user.user.nickName = params.nickName
                  this.accountForm = { ...this.$store.state.user.user }
                  this.captchaForm.value = ''
                  // this.hadleRefresh()
                  this.$forceUpdate()
                }
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            this.$message.warning('请填写手机验证码')
          }
        } else {
          this.$message.warning('请填写必填项')
        }
      })
    },
    getCaptcha () {
      this.$refs.editAccountForm.validate((boolean, obj) => {
        if (boolean) {
          const state = this.captchaForm
          this.phoneNum = this.$store.state.user.user.mobilePhone
          state.sendBtn = true
          this.$WebApi.user['SendVerification']({
            sPhoneNum: this.phoneNum
          })
            .then(res => {
              if (res === '短信发送失败！') {
                this.$message.error('短信发送失败!60秒后再验证')
              } else {
                this.$message.success('短信发送成功!')
              }
              const interval2 = window.setInterval(() => {
                if (state.time-- <= 0) {
                  state.time = 60
                  state.sendBtn = false
                  window.clearInterval(interval2)
                }
              }, 1000)
              console.log(res)
            })
            .catch(err => {
              // eslint-disable-next-line no-undef
              clearInterval(interval2)
              state.time = 60
              this.$message.error('短信发送失败，请查看网络接口问题')
              state.sendBtn = false
              this.requestFailed(err)
            })
        } else {
          this.$message.warning('请填写必填项')
        }
      })
    },
    CheckRegisterInfo (myKey, myValue, callback) {
      this.$WebApi.user['CheckRegisterInfo']({
        key: myKey,
        value: myValue
      })
        .then(res => {
          if (callback) {
            callback(res)
          }
          return res
        })
        .catch(err => {
          console.log(err)
        })
    },
    ZJLX_Change () {},
    ZHLX_Change () {},
    hadleRefresh () {
      const _this = this
      routeUtils.reloadComponent(_this)
    }
  }
}
</script>

<style lang="less" scoped>
.baseSettingPage {
  width: 90%;
  margin: 0 auto;
  // 标题
  .title {
    font-weight: bolder;
    font-size: 18px;
    margin: 0;
    line-height: 32px;
    button {
      float: right;
    }
  }
  // 分隔线
  .titleDivider {
    height: 2px;
    background-color: #000;
    margin: 5px 0 10px;
  }
  .infoDesc {
    /deep/.ant-descriptions-item-label {
      font-size: 16px;
      width: 7em;
      color: #777;
    }
    /deep/.ant-descriptions-item-content {
      font-size: 16px;
      color: #112534;
      min-height: 32px;
      line-height: 32px;
    }
  }
  .actionCol {
    margin: 0 -8px 0 -16px;
    > button,
    > span {
      padding: 0 8px;
    }
  }
}
</style>
