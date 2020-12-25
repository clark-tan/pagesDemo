<template>
  <a-modal
    title="更换手机号码"
    :visible="visible"
    @cancel="handleModalHide"
    :footer="null"
    :maskClosable="false"
    destroyOnClose
  >
    <a-form-model ref="changeMobile" :model="changeMobileFormModel" :rules="changeMobileFormRules">
      <a-steps :current="current" size="small">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div v-show="current === 0">
        <a-form-model-item prop="initMobile" ref="initMobile">
          <a-input
            size="large"
            placeholder="旧手机号"
            v-model="changeMobileFormModel.initMobile"
            disabled
            @change="handleCaptchaMobileCheck('initMobile')"
          >
            <a-select slot="addonBefore" size="large" defaultValue="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
          </a-input>
        </a-form-model-item>
        <a-row :gutter="10" type="flex">
          <a-col style="flex: 1">
            <a-form-model-item prop="captcha" ref="captcha">
              <a-input size="large" type="text" placeholder="验证码" v-model="changeMobileFormModel.captcha">
                <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col>
            <a-button
              class="getCaptcha"
              size="large"
              :disabled="!captchaState.initMobile.mobileValid || captchaState.initMobile.sendBtn"
              @click.stop.prevent="getCaptcha('initMobile')"
              v-text="(!captchaState.initMobile.sendBtn && '获取验证码') || captchaState.initMobile.time + ' s'"
            ></a-button>
          </a-col>
        </a-row>
      </div>
      <div v-show="current === 1">
        <a-form-model-item prop="newMobile" ref="newMobile">
          <a-input
            size="large"
            placeholder="新手机号"
            v-model="changeMobileFormModel.newMobile"
            @change="handleCaptchaMobileCheck('newMobile')"
          >
            <a-select slot="addonBefore" size="large" defaultValue="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
          </a-input>
        </a-form-model-item>
        <a-row :gutter="10" type="flex">
          <a-col style="flex: 1">
            <a-form-model-item prop="captcha2" ref="captcha2">
              <a-input size="large" type="text" placeholder="验证码" v-model="changeMobileFormModel.captcha2">
                <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col>
            <a-button
              class="getCaptcha"
              size="large"
              :disabled="!captchaState.newMobile.mobileValid || captchaState.newMobile.sendBtn"
              @click.stop.prevent="getCaptcha('newMobile')"
              v-text="(!captchaState.newMobile.sendBtn && '获取验证码') || captchaState.newMobile.time + ' s'"
            ></a-button>
          </a-col>
        </a-row>
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
import { isMobile } from '@/utils/verify'
import { routeUtils } from '@/utils/index'

export default {
  name: 'ChangeMobileForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      changeMobileFormModel: {
        initMobile: this.$store.state.user.user.MOBILEPHONE,
        captcha: '',
        newMobile: '',
        captcha2: ''
      },
      changeMobileFormRules: {
        initMobile: [
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
        captcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['change', 'blur']
          }
        ],
        newMobile: [
          {
            required: true,
            message: '请输入正确的11位手机号'
          },
          {
            validator: (rule, value, callback) => {
              if (value && value.trim() === this.changeMobileFormModel['initMobile'].trim()) {
                callback(new Error('请输入与旧手机号不一样的新手机号'))
              } else if (isMobile(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的11位手机号'))
              }
            },
            trigger: ['change', 'blur']
          }
        ],
        captcha2: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['change', 'blur']
          }
        ]
      },
      current: 0,
      steps: [
        {
          title: '请输入旧手机号',
          content: 'First-content'
        },
        {
          title: '请输入新手机号',
          content: 'Second-content'
        }
      ],
      submitting: false,
      captchaState: {
        initMobile: {
          time: 60,
          sendBtn: false,
          mobileValid: true
        },
        newMobile: {
          time: 60,
          sendBtn: false,
          mobileValid: false
        }
      }
    }
  },
  mounted () {
    // this.GetByValidate()
  },
  methods: {
    handleModalHide () {
      this.$emit('modalHide')
      this.changeMobileFormModel = {
        initMobile: this.$store.state.user.user.MOBILEPHONE,
        captcha: '',
        newMobile: '',
        captcha2: ''
      }
      this.captchaState.initMobile.mobileValid = true
      this.captchaState.newMobile.mobileValid = false
      this.current = 0
    },
    handleCaptchaMobileCheck (modelName) {
      this.$nextTick(() => {
        this.$refs.changeMobile.validateField(modelName, err => {
          this.captchaState[modelName].mobileValid = !err
        })
      })
    },
    getCaptcha (modelName) {
      const state = this.captchaState[modelName]
      this.$refs.changeMobile.validateField(modelName, err => {
        if (!err) {
          state.sendBtn = true
          this.$WebApi.user['SendVerification']({
            sPhoneNum: this.changeMobileFormModel[modelName]
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
            })
            .catch(err => {
              console.log(err)
              // FIXME:目前拦截器catch里，reject不会响应到这里来
            })
        }
      })
    },
    next () {
      if (this.current === 0) {
        this.GetByValidate(this.changeMobileFormModel.initMobile, this.changeMobileFormModel.captcha)
      } else {
        let formValid = true
        this.$refs.changeMobile.validateField(['initMobile', 'captcha'], err => {
          if (err) formValid = false
        })
        if (formValid) this.current++
      }
    },
    handleAllSubmit () {
      this.$WebApi.user['GetByValidate']({
        data: JSON.stringify({
          sValidate: this.changeMobileFormModel.captcha2,
          sMobile: this.changeMobileFormModel.newMobile
        })
      })
        .then(res => {
          console.log(res)
          if (res.code && res.code === 998) {
            this.$message.error(res.desc)
          } else {
            this.$refs.changeMobile.validate(valid => {
              if (valid) {
                this.submitting = true
                const changeMobileData = {
                  oldMobileNo: this.changeMobileFormModel.initMobile,
                  validate1: this.changeMobileFormModel.captcha,
                  newMobileNo: this.changeMobileFormModel.newMobile,
                  validate2: this.changeMobileFormModel.captcha2,
                  userid: this.$store.state.user.user.userID
                }
                this.$WebApi.user['transferAccountInfo']({
                  data: changeMobileData
                })
                  .then(res => {
                    if (res.code && res.code === 998) {
                      this.$message.error(res.desc)
                    } else {
                      this.$message.success('手机号码修改成功', 2)
                      this.$store.state.user.user.MOBILEPHONE = this.changeMobileFormModel.newMobile
                      this.handleModalHide()
                      this.hadleRefresh()
                      this.submitting = false
                    }
                  })
                  .catch(err => {
                    this.submitting = false
                    console.log(err)
                  })
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {})
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
            this.$refs.changeMobile.validateField(['initMobile', 'captcha'], msg => {
              console.log(msg)
            })
            this.current++
          }
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {})
    },
    hadleRefresh () {
      const _this = this
      routeUtils.reloadComponent(_this)
    }
  }
}
</script>
<style lang="less" scoped>
.ant-steps {
  padding: 10px 20px 30px;
}
</style>
