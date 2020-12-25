<template>
  <a-modal
    title="忘记密码"
    :visible="visible"
    @cancel="handleModalHide"
    :footer="null"
    :maskClosable="false"
    destroyOnClose
  >
    <a-form-model ref="retrievePassword" :model="retrievePasswordFormModel" :rules="retrievePasswordFormRules">
      <a-steps :current="current" size="small">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div v-show="current === 0">
        <a-form-model-item prop="retrievePasswordMobile" ref="retrievePasswordMobile">
          <a-input
            size="large"
            placeholder="请输入手机号码"
            v-model="retrievePasswordFormModel.retrievePasswordMobile"
            @change="handleRetrievePhoneCheck"
          >
            <a-select slot="addonBefore" size="large" defaultValue="+86">
              <a-select-option value="+86">+86</a-select-option>
              <!-- <a-select-option value="+87">+87</a-select-option> -->
            </a-select>
          </a-input>
        </a-form-model-item>
        <a-row :gutter="10" type="flex">
          <a-col style="flex: 1">
            <a-form-model-item prop="retrievePasswordCaptcha" ref="retrievePasswordCaptcha">
              <a-input
                size="large"
                type="text"
                placeholder="验证码"
                v-model="retrievePasswordFormModel.retrievePasswordCaptcha"
              >
                <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col>
            <a-button
              class="getCaptcha"
              size="large"
              :disabled="!state.RPSmsValid || state.RPSmsSendBtn"
              @click.stop.prevent="getRetrievePasswordCaptcha"
              v-text="(!state.RPSmsSendBtn && '获取验证码') || state.RPSTime + ' s'"
            ></a-button>
          </a-col>
        </a-row>
      </div>
      <div v-show="current === 1">
        <a-form-model-item prop="newPassword" ref="newPassword">
          <a-input-password
            placeholder="请输入新密码"
            size="large"
            v-model="retrievePasswordFormModel.newPassword"
            autocomplete="new-password"
          />
        </a-form-model-item>
        <a-form-model-item prop="Repassword" ref="Repassword">
          <a-input-password
            size="large"
            placeholder="确认密码"
            v-model="retrievePasswordFormModel.Repassword"
            autocomplete="new-password"
          />
        </a-form-model-item>
      </div>
      <div>
        <a-button
          v-if="current < steps.length - 1"
          type="primary"
          @click="next"
          size="large"
          style="width: 100%;margin-top: 24px"
        >下一步</a-button
        >
        <a-button
          v-if="current == steps.length - 1"
          :loading="submitting"
          type="primary"
          @click="handleAllSubmit"
          size="large"
          style="width: 100%;margin-top: 24px"
        >完成</a-button
        >
      </div>
    </a-form-model>
  </a-modal>
</template>
<script>
import { isMobile, isMM } from '@/utils/verify'
import md5 from 'crypto-js/md5'

export default {
  name: 'RetrievePasswordForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      retrievePasswordFormModel: {
        retrievePasswordMobile: '',
        retrievePasswordCaptcha: '',
        newPassword: '',
        Repassword: ''
      },
      retrievePasswordFormRules: {
        retrievePasswordMobile: [
          {
            required: true,
            message: '请输入正确的11位手机号'
          },
          {
            validator: (rule, value, callback) => {
              if (isMobile(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的11位手机号'))
              }
            },
            trigger: ['change', 'blur']
          }
        ],
        retrievePasswordCaptcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新密码'
          },
          {
            validator: (rule, value, callback) => {
              if (isMM(value)) {
                callback()
              } else {
                callback(new Error('请输入6-20个字母、数字、下划线'))
              }
            },
            trigger: ['change', 'blur']
          }
        ],
        Repassword: [
          {
            required: true,
            message: '请输入确认密码'
          },
          {
            validator: (rule, value, callback) => {
              const password = this.retrievePasswordFormModel['newPassword'] || ''
              if (value && value.trim() !== password.trim()) {
                callback(new Error('两次密码不一致'))
              }
              callback()
            },
            trigger: ['change', 'blur']
          }
        ]
      },
      current: 0,
      steps: [
        {
          title: '输入手机校验',
          content: 'First-content'
        },
        {
          title: '重置密码',
          content: 'Second-content'
        }
      ],
      submitting: false,
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
      }
    }
  },
  methods: {
    handleModalHide () {
      this.$emit('modalHide')
      this.retrievePasswordFormModel = {
        retrievePasswordMobile: '',
        retrievePasswordCaptcha: '',
        newPassword: '',
        Repassword: ''
      }
      this.current = 0
    },
    handleRetrievePhoneCheck () {
      this.$refs.retrievePassword.validateField('retrievePasswordMobile', err => {
        this.state.RPSmsValid = !err
      })
    },
    getRetrievePasswordCaptcha () {
      const state = this.state
      this.$refs.retrievePassword.validateField('retrievePasswordMobile', err => {
        if (Window._.isEmpty(err)) {
          state.RPSmsSendBtn = true
          this.$WebApi.user['SendVerification']({
            sPhoneNum: this.retrievePasswordFormModel.retrievePasswordMobile
          })
            .then(res => {
              if (res === '短信发送失败！') {
                this.$message.error('短信发送失败!60秒后再验证')
              } else {
                this.$message.success('短信发送成功!')
              }
              const interval2 = window.setInterval(() => {
                if (state.RPSTime-- <= 0) {
                  state.RPSTime = 60
                  state.RPSmsSendBtn = false
                  window.clearInterval(interval2)
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
    next () {
      if (this.current === 0) {
        this.GetByValidate(
          this.retrievePasswordFormModel.retrievePasswordMobile,
          this.retrievePasswordFormModel.retrievePasswordCaptcha
        )
      } else {
        let formValid = true
        this.$refs.retrievePassword.validateField(['retrievePasswordMobile', 'retrievePasswordCaptcha'], err => {
          if (err) formValid = false
        })
        if (formValid) this.current++
      }
    },
    handleAllSubmit () {
      this.$refs.retrievePassword.validate((valid, obj) => {
        if (valid) {
          this.submitting = true
          const retrievePasswordData = {
            newPassword: md5(this.retrievePasswordFormModel.newPassword),
            mobilePhone: this.retrievePasswordFormModel.retrievePasswordMobile,
            validate: this.retrievePasswordFormModel.retrievePasswordCaptcha
          }
          this.$WebApi.user['RetrievePassword']({
            data: JSON.stringify(retrievePasswordData)
          })
            .then(res => {
              this.submitting = false
              if (res.code && res.code === 998) {
                console.log(res)
                this.$message.error(res.desc)
              } else {
                this.handleModalHide()
                this.$message.success('重置密码成功', 2)
              }
            })
            .catch(err => {
              this.submitting = false
              console.log(err)
            })
        }
      })
    },
    GetByValidate (sMobile, sValidate) {
      this.$WebApi.user['GetByValidate']({
        data: JSON.stringify({ sValidate: sValidate, sMobile: sMobile })
      })
        .then(res => {
          console.log(res)
          if (res.code && res.code === 998) {
            this.$message.error(res.desc)
          } else {
            this.$refs.retrievePassword.validateField(['retrievePasswordMobile', 'retrievePasswordCaptcha'], msg => {
              console.log(msg)
            })
            this.current++
          }
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
.ant-steps {
  padding: 10px 20px 30px;
}
</style>
