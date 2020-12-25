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
    <a-form-model ref="myRuleForm" :model="myForm" :rules="myRules" class="formClass">
      <a-form-model-item prop="name" ref="name">
        <a-input placeholder="请输入用户名" v-model="myForm.name">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="password" ref="password">
        <a-input-password placeholder="请输入正确的密码" v-model="myForm.password" autocomplete="new-password" />
      </a-form-model-item>
      <a-form-model-item prop="password2" ref="password2">
        <a-input-password placeholder="请输入正确的密码" v-model="myForm.password2" autocomplete="new-password" />
      </a-form-model-item>
      <a-form-model-item prop="companyName" ref="companyName">
        <a-input placeholder="请输入注册用户单位名称" v-model="myForm.companyName"></a-input>
      </a-form-model-item>
      <a-form-model-item prop="DWDZ" ref="DWDZ">
        <a-input placeholder="请输入单位地址" v-model="myForm.DWDZ"></a-input>
      </a-form-model-item>
      <a-form-model-item prop="LXR" ref="LXR">
        <a-input placeholder="请输入联系人姓名" v-model="myForm.LXR"></a-input>
      </a-form-model-item>
      <a-form-model-item prop="idType" ref="idType">
        <a-select v-model="myForm.idType" placeholder="请选择证件类型">
          <a-select-option v-for="(item, index) in idTypes" :key="index" :value="item['TITLE']">{{
            item['TITLE']
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item prop="idNumber" ref="idNumber">
        <a-input placeholder="请输入正确的证件号码" v-model="myForm.idNumber" />
      </a-form-model-item>

      <a-form-model-item prop="email" ref="email">
        <a-input placeholder="请输入正确的邮箱" v-model="myForm.email" />
      </a-form-model-item>
      <a-form-model-item prop="mobile" ref="mobile">
        <a-input placeholder="请输入正确的手机" v-model="myForm.mobile" />
      </a-form-model-item>
      <a-form-model-item prop="captcha" ref="captcha">
        <a-row>
          <a-col :span="16">
            <a-input type="text" placeholder="验证码" v-model="myForm.captcha">
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
  </a-modal>
</template>
<script>
import { isEmail, isMobile, isYHM, isMM } from '@/utils/verify'
import md5 from 'crypto-js/md5'

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
      idTypes: [
        {
          TITLE: '身份证',
          EXTRAVALUE: ''
        },
        {
          TITLE: '统一社会信用代码',
          EXTRAVALUE: ''
        }
      ],
      myForm: {
        name: '',
        companyName: '',
        idType: '统一社会信用代码',
        idNumber: '',
        password: '',
        password2: '',
        email: '',
        mobile: '',
        captcha: '',
        DWDZ: '',
        LXR: ''
      },
      myRules: {
        name: [
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
            trigger: ['blur', 'change'],
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
        idNumber: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入正确的证件号码'))
              } else {
                const myKey = this.myForm.idType
                let pattern = ''
                this.idTypes.map((item, index) => {
                  if (item['TITLE'] === myKey) {
                    pattern = item['EXTRAVALUE']
                  }
                })
                if (!this._.isEmpty(pattern)) {
                  const patternArr = pattern
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
                  callback(new Error('请输入上栏同一密码 '))
                }
              }
            }
          }
        ],
        email: [
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
        mobile: [
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
      submitting: false
    }
  },
  mounted () {
    this.getOriginize()
  },
  methods: {
    handleModalHide () {
      this.$emit('handleModalHide', false)
      this.myForm = {
        name: '',
        companyName: '',
        idType: '统一社会信用代码',
        idNumber: '',
        password: '',
        password2: '',
        email: '',
        mobile: '',
        captcha: '',
        DWDZ: '',
        LXR: ''
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
      this.$refs.myRuleForm.validate((bool, obj) => {
        if (bool) {
          this.$WebApi.user['SendVerification']({
            sPhoneNum: this.myForm.mobile
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
    },
    handleSubmit () {
      this.submitting = true
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
</style>
