<template>
  <a-modal
    title="注册"
    :visible="visible"
    @cancel="handleModalHide"
    destroyOnClose
    :footer="null"
    width="400px"
    :maskClosable="false"
  >
    <a-tabs v-model="activeKey" @change="tabChange">
      <a-tab-pane key="1" tab="个人">
        <a-form-model ref="userRuleForm" :model="userForm" :rules="myRules" class="formClass">
          <a-form-model-item prop="loginName" ref="loginName">
            <a-input placeholder="请输入用户名" v-model="userForm.loginName">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password" ref="password">
            <a-input-password placeholder="请输入正确的密码" v-model="userForm.password" autocomplete="new-password" />
          </a-form-model-item>
          <a-form-model-item prop="password2" ref="password2">
            <a-input-password placeholder="请输入正确的密码" v-model="userForm.password2" autocomplete="new-password" />
          </a-form-model-item>
          <a-form-model-item prop="idType" ref="idType">
            <a-select v-model="userForm.idType" placeholder="请选择证件类型">
              <a-select-option v-for="(item, index) in idTypes" :key="index" :value="item['TITLE']">{{
                item['TITLE']
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item prop="idNumber" ref="idNumber">
            <a-input placeholder="请输入正确的证件号码" v-model="userForm.idNumber" />
          </a-form-model-item>
          <a-form-model-item prop="ZJFJ" ref="ZJFJ">
            <div class="clearfix">
              <a-upload
                :action="MaterialUpload"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileList.length < 8">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    证件附件
                  </div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
          </a-form-model-item>
          <a-form-model-item prop="mailbox" ref="mailbox">
            <a-input placeholder="请输入正确的邮箱" v-model="userForm.mailbox" />
          </a-form-model-item>
          <a-form-model-item prop="mobilePhone" ref="mobilePhone">
            <a-input placeholder="请输入正确的手机" v-model="userForm.mobilePhone" />
          </a-form-model-item>
          <a-form-model-item prop="DWDZ" ref="DWDZ">
            <a-input placeholder="请输入单位地址" v-model="userForm.DWDZ"></a-input>
          </a-form-model-item>
          <a-form-model-item prop="validate" ref="validate">
            <a-row>
              <a-col :span="16">
                <a-input type="text" placeholder="验证码" v-model="userForm.validate">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-col>
              <a-col :span="8" style="text-align: right;">
                <a-button
                  class="getCaptcha"
                  :disabled="state.smsSendBtn"
                  @click.stop.prevent="getCaptcha"
                  v-text="(!state.smsSendBtn && '获取验证码') || state.time + ' s'"
                ></a-button>
              </a-col>
            </a-row>
          </a-form-model-item>
          <!-- <a-form-model-item prop="companyName" ref="companyName">
            <a-input placeholder="请输入注册用户单位名称" v-model="userForm.companyName"></a-input>
          </a-form-model-item> -->

          <!-- <a-form-model-item prop="LXR" ref="LXR">
            <a-input placeholder="请输入联系人姓名" v-model="userForm.LXR"></a-input>
          </a-form-model-item> -->

          <a-form-model-item>
            <a-button
              size="large"
              style="width: 100%;margin-top: 24px"
              type="primary"
              htmlType="submit"
              class="register-button"
              :loading="submitting"
              @click.stop.prevent="handleSubmit"
            >注册</a-button
            >
          </a-form-model-item>
        </a-form-model>
      </a-tab-pane>
      <a-tab-pane key="2" tab="企业">
        <a-form-model ref="ORGRuleForm" :model="OrgForm" :rules="myRules" class="formClass">
          <a-form-model-item prop="loginName" ref="loginName">
            <a-input placeholder="请输入用户名" v-model="OrgForm.loginName">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password" ref="password">
            <a-input-password placeholder="请输入正确的密码" v-model="OrgForm.password" autocomplete="new-password" />
          </a-form-model-item>
          <a-form-model-item prop="password2" ref="password2">
            <a-input-password placeholder="请输入正确的密码" v-model="OrgForm.password2" autocomplete="new-password" />
          </a-form-model-item>

          <a-form-model-item prop="SHTYXYDM" ref="SHTYXYDM">
            <a-input placeholder="请输入正确的社会统一信用代码" v-model="OrgForm.SHTYXYDM" />
          </a-form-model-item>

          <a-form-model-item prop="LXR" ref="LXR">
            <a-input placeholder="请输入业务办理的联系人" v-model="OrgForm.LXR"></a-input>
          </a-form-model-item>

          <a-form-model-item prop="mobilePhone" ref="mobilePhone">
            <a-input placeholder="请输入正确的手机号码" v-model="OrgForm.mobilePhone" />
          </a-form-model-item>

          <a-form-model-item prop="validate" ref="validate">
            <a-row>
              <a-col :span="16">
                <a-input type="text" placeholder="验证码" v-model="OrgForm.validate">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-col>
              <a-col :span="8" style="text-align: right;">
                <a-button
                  class="getCaptcha"
                  :disabled="state.smsSendBtn"
                  @click.stop.prevent="getCaptcha"
                  v-text="(!state.smsSendBtn && '获取验证码') || state.time + ' s'"
                ></a-button>
              </a-col>
            </a-row>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              size="large"
              style="width: 100%;margin-top: 24px;border-radius: 20px"
              type="primary"
              htmlType="submit"
              class="register-button"
              :loading="submitting"
              @click.stop.prevent="handleSubmit"
            >注册</a-button
            >
          </a-form-model-item>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script>
import { isEmail, isMobile, isYHM, isMM } from '@/utils/verify'
import md5 from 'crypto-js/md5'
import { MaterialUpload } from '@/api/common/urlString'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  name: 'RegisterForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      MaterialUpload,
      activeKey: '1',
      idTypes: [
        {
          TITLE: '身份证',
          EXTRAVALUE: '/(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/'
        },
        {
          TITLE: '统一社会信用代码',
          EXTRAVALUE: '/^[^_IOZSVa-z\\W]{2}\\d{6}[^_IOZSVa-z\\W]{10}$/g'
        }
      ],
      userForm: {
        loginName: '',
        idType: '身份证',
        idNumber: '',
        password: '',
        password2: '',
        mailbox: '',
        mobilePhone: '',
        validate: '',
        DWDZ: '',
        ZJFJ: [],
        YHLX: '个人'
      },
      OrgForm: {
        loginName: '',
        password: '',
        password2: '',
        mobilePhone: '',
        validate: '',
        SHTYXYDM: '',
        LXR: '',
        YHLX: '企业'
      },
      myRules: {
        loginName: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入用户名'))
              } else {
                if (isYHM(value)) {
                  this.CheckRegisterInfo('loginname', value, res => {
                    if (res === '成功！') {
                      callback()
                    } else if (!this._.isEmpty(res) && res.hasOwnProperty('desc')) {
                      callback(new Error(res['desc']))
                    }
                  })
                } else {
                  callback(new Error('只能输入5-20个以字母开头、可带数字、“_”、“.”的字串'))
                }
              }
            }
          }
        ],
        companyName: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入正确的注册用户单位名称'))
              } else {
                this.CheckRegisterInfo('YHMC', value, res => {
                  if (res === '成功！') {
                    callback()
                  } else if (!this._.isEmpty(res) && res.hasOwnProperty('desc')) {
                    callback(new Error(res['desc']))
                  }
                })
              }
            }
          }
        ],
        idType: [
          {
            required: true,
            message: '请选择证件类型',
            trigger: 'change'
          }
        ],
        SHTYXYDM: [
          {
            required: true,
            message: '请输入正确的社会统一信用代码',
            trigger: ['change', 'blur']
          }
        ],
        LXR: [
          {
            required: true,
            message: '请输入业务办理的联系人',
            trigger: ['change', 'blur']
          }
        ],
        ZJFJ: [
          {
            required: true,
            message: '请上传证件附件'
          }
        ],
        idNumber: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入正确的证件号码'))
              } else {
                const myKey = this.userForm.idType
                let pattern = ''
                this.idTypes.map((item, index) => {
                  if (item['TITLE'] === myKey) {
                    pattern = item['EXTRAVALUE']
                  }
                })
                if (!this._.isEmpty(pattern)) {
                  const patternArr = pattern.split(',')
                  let pattern1
                  if (!this._.isEmpty(patternArr[1])) {
                    pattern1 = new RegExp(patternArr[0], patternArr[1])
                  } else {
                    pattern1 = new RegExp(patternArr[0])
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
        password: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入正确的密码'))
              } else {
                if (isMM(value)) {
                  callback()
                } else {
                  callback(new Error('只能输入6-20个字母、数字、下划线 '))
                }
              }
            }
          }
        ],
        password2: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入正确的密码'))
              } else {
                if (value === this.myForm.password) {
                  callback()
                } else {
                  if (value === this.OrgForm.password) {
                    callback()
                  } else {
                    callback(new Error('请输入上栏同一密码 '))
                  }
                }
              }
            }
          }
        ],
        mailbox: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入正确的邮箱'))
              } else {
                if (isEmail(value)) {
                  this.CheckRegisterInfo('mailbox', value, res => {
                    if (res === '成功！') {
                      callback()
                    } else if (!this._.isEmpty(res) && res.hasOwnProperty('desc')) {
                      callback(new Error(res['desc']))
                    }
                  })
                } else {
                  callback(new Error('请输入正确的邮箱'))
                }
              }
            }
          }
        ],
        mobilePhone: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入正确的11位手机号'))
              } else {
                if (isMobile(value)) {
                  this.CheckRegisterInfo('mobilePhone', value, res => {
                    if (res === '成功！') {
                      callback()
                    } else if (!this._.isEmpty(res) && res.hasOwnProperty('desc')) {
                      callback(new Error(res['desc']))
                      // callback();
                    }
                  })
                } else {
                  callback(new Error('请输入正确的11位手机号'))
                }
              }
            }
          }
        ]
      },
      state: {
        time: 60,
        smsSendBtn: false,
        LoginMobileTime: 60,
        LoginMobileSmsSendBtn: false,
        LoginMobileValid: false,
        RPSmsSendBtn: false,
        RPSmsValid: false,
        RPSTime: 60,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      submitting: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      ZJFJ: []
    }
  },
  mounted () {
    this.getOriginize()
  },
  methods: {
    handleModalHide () {
      this.$emit('modalHide')
      this.userForm = {
        loginName: '',
        idType: '身份证',
        idNumber: '',
        password: '',
        password2: '',
        mailbox: '',
        mobilePhone: '',
        validate: '',
        DWDZ: '',
        ZJFJ: [],
        YHLX: '个人'
      }
      this.OrgForm = {
        loginName: '',
        password: '',
        password2: '',
        mobilePhone: '',
        validate: '',
        SHTYXYDM: '',
        LXR: '',
        YHLX: '企业'
      }
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
    getOriginize () {
      this.$WebApi.util['LookupDict']({
        listcode: '001'
      })
        .then(res => {
          this.idTypes = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCaptcha (e) {
      e.preventDefault()
      if (this.activeKey === '1') {
        // 当key为 1 时，为个人注册
        this.$refs.userRuleForm.validate((bool, obj) => {
          if (bool) {
            this.$WebApi.user['SendVerification']({
              sPhoneNum: this.userForm.mobilePhone
            })
              // eslint-disable-next-line handle-callback-err
              .catch(err => {
                // FIXME:目前拦截器catch里，reject不会响应到这里来
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
                // FIXME:目前拦截器catch里，reject不会响应到这里来
                console.log(err)
              })
          }
        })
      }
    },
    handleSubmit () {
      this.submitting = true
      if (this.activeKey === '1') {
        this.$refs.myRuleForm.validate((bool, obj) => {
          if (bool) {
            const registerDataValue = {
              loginName: this.myForm.name,
              password: md5(this.myForm.password),
              mailbox: this.myForm.email,
              mobilePhone: this.myForm.mobile,
              validate: this.myForm.captcha,
              companyName: this.myForm.companyName,
              idNumber: this.myForm.idNumber,
              idType: this.myForm.idType,
              DWDZ: this.myForm.DWDZ,
              LXR: this.myForm.LXR
            }
            this.$WebApi.user['Register']({
              data: registerDataValue
            })
              .then(res => {
                if (res.code === 998) {
                  this.submitting = false
                } else {
                  this.submitting = false
                  this.handleModalHide()
                  this.$message.success('注册成功', 2)
                }
              })
              .catch(() => {
                this.$message.error('注册失败', 2)
              })
          } else {
            this.submitting = false
          }
        })
      } else {
        this.$refs.ORGRuleForm.validate((bool, obj) => {
          if (bool) {
            const registerDataValue = {
              loginName: this.OrgForm.loginName,
              password: md5(this.OrgForm.password),
              mobilePhone: this.OrgForm.mobilePhone,
              validate: this.OrgForm.validate,
              SHTYXYDM: this.OrgForm.SHTYXYDM,
              LXR: this.OrgForm.LXR,
              YHLX: this.OrgForm.YHLX
            }
            console.log(registerDataValue)
            this.$WebApi.user['Register']({
              data: registerDataValue
            })
              .then(res => {
                if (res.code === 998) {
                  this.submitting = false
                } else {
                  this.submitting = false
                  this.handleModalHide()
                  this.$message.success('注册成功', 2)
                }
              })
              .catch(() => {
                this.$message.error('注册失败', 2)
              })
          } else {
            this.submitting = false
          }
        })
      }
    },
    tabChange (key) {
      console.log(key)
    },
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange ({ fileList, file }) {
      this.fileList = fileList
      if (
        file &&
        file.status === 'done' &&
        file.response &&
        file.response.code === 0 &&
        file.response.data[0].fileUrl
      ) {
        this.ZJFJ.push(file.response.data[0].fileUrl)
      }
      this.$set(this.userForm, 'ZJFJ', JSON.parse(JSON.stringify(this.ZJFJ)))
      this.$refs.userRuleForm.validateField(['ZJFJ'], msg => {})
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-form-item {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: 'tnum';
  font-feature-settings: 'tnum';
  margin-bottom: 4px;
  vertical-align: top;
}
/deep/ .ant-tabs-nav-scroll {
  text-align: center;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
