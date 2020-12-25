<!--
 * @Autor: junhui li
 * @Date: 2020-11-25 16:34:57
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-01 15:56:45
 * @Description:
-->
<template>
  <div>
    <!-- 错误提示 -->
    <div class="errorTip">
      <div v-if="isLoginError" class="tipBox">
        <a-icon type="minus-circle" theme="filled" class="icon" />
        <span>账号或密码错误，请重新输入</span>
      </div>
    </div>
    <!-- 表单 -->
    <a-form-model
      ref="loginForm"
      class="form"
      :model="formData"
      :rules="formRule"
      @submit="handleSubmit"
      autocomplete="off"
    >
      <div class="labelItem">
        <a-icon slot="prefix" type="user" class="inputIcon" />
        账号
      </div>
      <a-form-model-item class="inputItem" prop="username">
        <a-input
          v-model="formData.username"
          size="large"
          type="text"
          placeholder="账号"
          allowClear
          class="input"
          autocomplete="cc-number"
        >
        </a-input>
      </a-form-model-item>
      <div class="labelItem">
        <a-icon slot="prefix" type="lock" class="inputIcon" />
        密码
      </div>
      <a-form-model-item class="inputItem">
        <a-input-password
          v-model="formData.password"
          size="large"
          type="password"
          placeholder="密码"
          allowClear
          class="input"
          autocomplete="cc-number"
        >
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item class="checkItem">
        <a-checkbox
          v-model="formData.rememberUser"
          @change="e => handleRemember(e.target.checked, REMEMBER_USER, 'username')"
        >记住用户名</a-checkbox
        >
        <a-checkbox
          v-model="formData.rememberPwd"
          @change="e => handleRemember(e.target.checked, REMEMBER_PWD, 'password', true)"
        >记住密码</a-checkbox
        >
        <span class="forget"><a-button type="link" @click="forgetPassword">忘记密码</a-button></span>
        <!-- <a-checkbox v-model="formData.rememberMe">自动登录</a-checkbox> -->
      </a-form-model-item>
      <a-form-model-item class="btnItem">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          shape="round"
          :block="true"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >登录</a-button
        >
      </a-form-model-item>
      <a-form-model-item class="registerItem">
        <span
          class="register"
        >没有账户？<a-button type="link" @click="handleShowRegisterForm">用户注册</a-button></span
        >
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import md5 from 'crypto-js/md5'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { REMEMBER_USER, REMEMBER_PWD, ENCRYPT_SECRET } from '@/store/mutation-types'
import Vue from 'vue'
import { AES, enc } from 'crypto-js'
export default {
  name: 'LoginForm',
  data () {
    return {
      REMEMBER_USER,
      REMEMBER_PWD,
      loginBtn: false,
      loginType: 0,
      isLoginError: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
        smsSendBtn: false
      },
      formData: {
        username: '',
        password: '',
        rememberUser: false,
        rememberPwd: false,
        rememberMe: false
      },
      formRule: {
        username: [
          {
            required: true,
            message: '请输入帐户名',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created () {
    if (Vue.ls.get(REMEMBER_USER) && typeof Vue.ls.get(REMEMBER_USER) === 'string') {
      this.formData.username = Vue.ls.get(REMEMBER_USER)
      this.formData.rememberUser = true
    }
    if (Vue.ls.get(REMEMBER_PWD) && typeof Vue.ls.get(REMEMBER_PWD) === 'string' && Vue.ls.get(ENCRYPT_SECRET)) {
      this.formData.password = AES.decrypt(Vue.ls.get(REMEMBER_PWD), Vue.ls.get(ENCRYPT_SECRET) + '').toString(enc.Utf8)
      this.formData.rememberPwd = true
    }
  },
  methods: {
    ...mapActions(['Login']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.loginForm.validate((valid, obj) => {
        if (valid) {
          this.state.loginBtn = true
          const dataParams = {
            loginName: this.formData.username,
            password: md5(this.formData.password).toString(),
            type: 'web'
          }
          this.Login(dataParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              this.state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            this.state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      console.log(res)
      this.handleRemember(this.formData.rememberUser, REMEMBER_USER, 'username')
      this.handleRemember(this.formData.rememberPwd, REMEMBER_PWD, 'password', true)
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    // eslint-disable-next-line handle-callback-err
    requestFailed (err) {
      this.isLoginError = true
      // this.$notification['error']({
      //   message: '错误',
      //   description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
      //   duration: 4
      // })
    },
    forgetPassword () {
      // this.$warning({
      //   title: '提示',
      //   content: '请联系管理员'
      // })
      this.$emit('handleShowRetrievePasswordForm')
    },
    register () {
      // this.$warning({
      //   title: '提示',
      //   content: '请联系管理员开通账户'
      // })
      this.$router.push({ name: 'register' })
    },
    handleRemember (checked, setKey, valueKey, encrypt) {
      let value = this.formData[valueKey].trim()
      if (encrypt) {
        const secret = new Date().getTime() + ''
        Vue.ls.set(ENCRYPT_SECRET, secret)
        value = AES.encrypt(value, secret).toString()
      }
      Vue.ls.set(setKey, checked && value ? value : '')
    },
    handleShowRegisterForm () {
      this.$emit('handleShowRegisterForm')
    }
  }
}
</script>

<style lang="less" scoped>
// 错误提示行
.errorTip {
  position: relative;
  .tipBox {
    position: absolute;
    top: -25px;
    height: 40px;
    left: 0;
    right: 0;
    background: rgba(255, 231, 231, 1);
    line-height: 40px;
    padding-left: 30px;
    color: @error-color;
    font-size: 14px;
    .icon {
      padding-right: 14px;
    }
  }
}
.form {
  .labelItem {
    padding-top: 20px;
    font-size: 16px;
    font-weight: bold;
  }
  .inputItem {
    margin-bottom: 10px;
    .input {
      /deep/.ant-input {
        padding-left: 21px;
        padding-right: 10px;
        box-shadow: none;
        color: #4689ed;
        border-top: 1px solid transparent !important;
        border-left: none;
        border-right: none;
        border-top: 1px solid transparent;
        background: transparent;
        font-size: 14px;
      }
    }
  }
  .checkItem {
    margin-bottom: 20px;
    /deep/.ant-checkbox-inner {
      width: 18px;
      height: 18px;
    }
    .forget {
      float: right;
      button {
        padding: 0;
        color: @primary-3;
      }
    }
    /deep/.ant-checkbox-wrapper {
      margin-left: 0;
      font-size: 12px;
    }
    /deep/.ant-checkbox-wrapper + .ant-checkbox-wrapper {
      margin-left: 5px;
    }
  }
  // 登录按钮
  .btnItem {
    margin-bottom: 10px;
  }
  // 注册
  .registerItem {
    margin-bottom: 20px;
    /deep/.ant-form-item-control {
      line-height: 22px;
    }
    .register {
      float: right;
      button {
        padding: 0;
        color: @primary-3;
      }
    }
  }
  // 提示信息
  /deep/ .ant-form-explain {
    position: absolute;
  }
}
</style>
