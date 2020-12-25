<template>
  <div class="securityPage">
    <p class="title">登录设置</p>
    <a-divider class="titleDivider" />
    <a-row class="content" :gutter="10">
      <a-col :span="4" class="label">登录密码</a-col>
      <a-col :span="9">密码至少超过6位数</a-col>
      <a-col :span="8" class="value"></a-col>
      <a-col :span="3" class="actionCol"><a @click="changePassword()">修改密码</a></a-col>
    </a-row>
    <a-divider class="rowDivider" />

    <p class="title title2">绑定信息</p>
    <a-divider class="titleDivider" />
    <a-row class="content" :gutter="10">
      <a-col :span="4" class="label">手机绑定</a-col>
      <a-col :span="9">可用于登录账号，找回密码，接受短信通知</a-col>
      <a-col
        :span="8"
        class="value"
      ><a-icon type="check-circle" theme="filled" style="color: #5CA431" />{{ setNumber }}</a-col
      >
      <a-col :span="3" class="actionCol"><a @click="changeMobilePhone()">更换手机号码</a></a-col>
    </a-row>
    <a-divider class="rowDivider" />
    <a-row class="content" :gutter="10">
      <a-col :span="4" class="label">邮箱绑定</a-col>
      <a-col :span="9">已绑定邮箱</a-col>
      <a-col
        :span="8"
        class="value"
      ><a-icon type="check-circle" theme="filled" style="color: #5CA431" />{{ setMailBox }}</a-col
      >
      <a-col :span="3" class="actionCol"><a @click="changeMailBox()">修改邮箱</a></a-col>
    </a-row>
    <a-divider class="rowDivider" />

    <a-modal
      title="修改密码"
      :visible="ChangePasswordVisible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :footer="null"
    >
      <a-form @submit="onChangePasswordSubmit" ref="passwordForm" :form="passwordForm">
        <a-form-item>
          <a-input
            v-decorator="[
              'oldPassword',
              {
                rules: [{ required: true, message: '请输入密码', whitespace: true }]
              }
            ]"
            size="large"
            placeholder="请输入原始密码"
            type="password"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <a-popover
          placement="rightTop"
          :trigger="['focus']"
          :getPopupContainer="trigger => trigger.parentElement"
          v-model="state.passwordLevelChecked"
        >
          <template slot="content">
            <div :style="{ width: '240px' }">
              <div :class="['user-register', passwordLevelClass]">
                强度：
                <span>{{ passwordLevelName }}</span>
              </div>
              <a-progress :percent="state.percent" :showInfo="false" :strokeColor="passwordLevelColor" />
              <!-- <div style="margin-top: 10px;">
                <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
              </div> -->
            </div>
          </template>
          <a-form-item>
            <a-input
              size="large"
              type="password"
              @click="handlePasswordInputClick"
              autocomplete="false"
              placeholder="请输入新密码"
              v-decorator="[
                'newPassword',
                {
                  rules: [{ validator: this.handlePasswordLevel }, { validator: this.handlePasswordVerify }],
                  validateTrigger: ['change', 'blur']
                }
              ]"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
        </a-popover>
        <a-form-item>
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            placeholder="确认密码"
            v-decorator="[
              'password2',
              {
                rules: [{ required: true, message: '请输入确认密码' }, { validator: this.handlePasswordCheck }],
                validateTrigger: ['change', 'blur']
              }
            ]"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-row :gutter="8" style="margin: 0 -4px">
            <a-col :span="16">
              <a-input
                size="large"
                placeholder="请输入手机验证码"
                v-decorator="[
                  'captcha',
                  {
                    rules: [{ required: true, message: '请输入手机验证码' }],
                    validateTrigger: 'blur'
                  }
                ]"
              >
                <a-icon slot="prefix" type="mail" />
              </a-input>
            </a-col>
            <a-col :span="8" style="padding-left: 4px">
              <a-button
                style="width: 100%"
                :disabled="state.CPSmsSendBtn"
                @click.stop.prevent="getCaptcha"
                class="captcha-button"
                size="large"
                v-text="(!state.CPSmsSendBtn && '获取验证码') || state.CPTime + ' s'"
              >获取验证码</a-button
              >
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <a-button
            style="width: 100%;margin-top: 24px"
            size="large"
            htmlType="submit"
            type="primary"
            :loading="confirmLoading"
          >确定</a-button
          >
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 修改手机号码 -->
    <change-mobile-form :visible="ChangeMobleVisible" @modalHide="ChangeMobleVisible = false" />

    <!-- 修改邮箱 -->
    <a-modal
      title="修改邮箱"
      :visible="ChangeEmailVisible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="EmailHandleCancel"
    >
      <a-form @submit="onEmailSubmit" ref="changeEmailForm" :form="changeEmailForm">
        <a-form-item>
          <a-input
            size="large"
            placeholder="新邮箱"
            type="text"
            v-decorator="[
              'newEmail',
              {
                rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }]
              }
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-row :gutter="8" style="margin: 0 -4px">
            <a-col :span="16">
              <a-input
                size="large"
                placeholder="请输入手机验证码"
                v-decorator="[
                  'captcha',
                  {
                    rules: [{ required: true, message: '请输入手机验证码' }],
                    validateTrigger: 'blur'
                  }
                ]"
              >
                <a-icon slot="prefix" type="mail" />
              </a-input>
            </a-col>
            <a-col :span="8" style="padding-left: 4px">
              <a-button
                style="width: 100%"
                :disabled="state.CPSmsSendBtn"
                @click.stop.prevent="getCaptcha"
                class="captcha-button"
                size="large"
                v-text="(!state.CPSmsSendBtn && '获取验证码') || state.CPTime + ' s'"
              >获取验证码</a-button
              >
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <a-button style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">确定</a-button>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 修改单位名称 -->
    <a-modal
      title="修改单位信息"
      :visible="ChangeCompanyNameVisible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="CompanyNameHandleCancel"
    >
      <a-form @submit="onCompanyNameSubmit" ref="changeCompanyNameForm" :form="changeCompanyNameForm">
        <a-form-item>
          <a-input
            size="large"
            placeholder="输入新的单位名称"
            type="text"
            v-decorator="[
              'companyName',
              {
                rules: [{ required: true, message: '请输入单位名称' }],
                initialValue: this.setCompanyName
              }
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            placeholder="输入新的单位地址"
            type="text"
            v-decorator="[
              'DWDZ',
              {
                rules: [{ required: true, message: '输入单位地址' }],
                initialValue: this.setDWDZ
              }
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            placeholder="输入新的联系人"
            type="text"
            v-decorator="[
              'LXR',
              {
                rules: [{ required: true, message: '输入联系人' }],
                initialValue: this.setLXR
              }
            ]"
          ></a-input>
        </a-form-item>
        <!-- <span>*温馨提示：允许只输入一个输入框的值进行修改</span> -->
        <a-form-item>
          <a-button style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">确定</a-button>
        </a-form-item>
      </a-form>
    </a-modal>

  </div>
</template>

<script>
import md5 from 'crypto-js/md5'
import ChangeMobileForm from '@/components/UserForm/ChangeMobileForm'
import { isMM } from '@/utils/verify'
import { mapGetters, mapActions } from 'vuex'
const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
  components: { ChangeMobileForm },
  props: {},
  data () {
    return {
      ChangePasswordVisible: false,
      confirmLoading: false,
      ChangeMobleVisible: false,
      ChangeEmailVisible: false,
      ChangeCompanyNameVisible: false,
      data: [],
      phoneNum: String,
      state: {
        time: 60,
        smsSendBtn: false,
        CPTime: 60,
        CPSmsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      changeMobleForm: this.$form.createForm(this),
      changeEmailForm: this.$form.createForm(this, {
        name: 'dynamic_rule'
      }),
      passwordForm: this.$form.createForm(this, { name: 'changePassword' }),
      changeCompanyNameForm: this.$form.createForm(this)
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {},
  // 生命周期 - 创建完成（访问当前this实例）
  computed: {
    ...mapGetters({ user: 'userInfo' }),
    setNumber () {
      var str = this.$store.state.user.user.MOBILEPHONE || ''
      return str.substr(0, 3) + '****' + str.substr(parseInt(str.split('').length / 2 + 2), str.split('').length)
    },
    setMailBox () {
      var str = this.$store.state.user.user.MAILBOX || ''
      return str.substr(0, 3) + '****' + str.substr(parseInt(str.split('').length / 2 + 2), str.split('').length)
    },
    setCompanyName () {
      var str = this.$store.state.user.user.DWMC || ''
      return str
    },
    setDWDZ () {
      var str = this.$store.state.user.user.DWDZ || ''
      return str
    },
    setLXR () {
      var str = this.$store.state.user.user.LXR || ''
      return str
    },
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {},
  methods: {
    ...mapActions(['Logout']),
    changePassword () {
      this.ChangePasswordVisible = true
      // alert("修改密码");
    },
    changeMobilePhone () {
      this.ChangeMobleVisible = true
    },

    // 修改邮箱相关事件
    changeMailBox () {
      this.ChangeEmailVisible = true
    },
    EmailHandleOk () {},
    onEmailSubmit (e) {
      console.log('更换邮箱')
      e.preventDefault()
      this.changeEmailForm.validateFields((err, values) => {
        console.log(values)
        const user = this.$store.state.user.user
        if (!err) {
          const changeEmailData = {
            userid: user.userID,
            mailbox: values.newEmail,
            mobilePhone: user.MOBILEPHONE,
            validate: values.captcha
          }
          console.log(changeEmailData)
          this.$WebApi.user['changeMailBox']({
            data: changeEmailData
          })
            .then(res => {
              if (res.code === 998) {
                this.logging = false
                this.$message.error('邮箱修改失败，请检查手机验证码是否正确！')
              } else {
                this.ChangeEmailVisible = false
                this.$message.success('邮箱修改成功', 2)
                this.$store.state.user.user.MAILBOX = values.newEmail
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    EmailHandleCancel () {
      this.ChangeEmailVisible = false
    },

    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      e.preventDefault()
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    // 获取修改密码手机验证码
    getCaptcha () {
      const state = this.state
      this.phoneNum = this.$store.state.user.user.MOBILEPHONE
      state.CPSmsSendBtn = true
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
            if (state.CPTime-- <= 0) {
              state.CPTime = 60
              state.CPSmsSendBtn = false
              window.clearInterval(interval2)
            }
          }, 1000)
          console.log(res)
        })
        .catch(err => {
          // eslint-disable-next-line no-undef
          clearInterval(interval2)
          state.CPTime = 60
          this.$message.error('短信发送失败，请查看网络接口问题')
          state.CPSmsSendBtn = false
          this.requestFailed(err)
        })
    },
    getCaptcha2 () {
      const state = this.state
      this.newMobleNum = this.changeMobleForm.getFieldValue('newMobile')
      state.smsSendBtn = true
      console.log(this.newMobleNum)
      this.$WebApi.user['SendVerification']({
        sPhoneNum: this.newMobleNum
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
              state.smsSendBtn = false
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
          state.smsSendBtn = false
          this.requestFailed(err)
        })
    },
    // 修改密码接口
    onChangePasswordSubmit (e) {
      console.log('修改密码')
      e.preventDefault()
      // alert(this.passwordForm);
      this.passwordForm.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          this.confirmLoading = true
          const changePasswordData = {
            oldPassword: md5(values.oldPassword),
            newPassword: md5(values.newPassword),
            mobilePhone: this.$store.state.user.user.MOBILEPHONE,
            validate: values.captcha
          }
          this.$WebApi.user['changePasswordEx']({
            data: changePasswordData
          })
            .then(res => {
              if (res.code === 998) {
                this.confirmLoading = false
                this.$message.error(res.desc)
              } else {
                this.confirmLoading = false
                this.ChangePasswordVisible = false
                this.$store.dispatch('Logout', this.user.TICKET)
                window.sessionStorage.setItem('islogin', false)
                this.$router.push('/portal/home')
                this.$message.success('密码修改成功', 2)
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.ChangePasswordVisible = false
    },

    // 修改单位名称
    changeProUser () {
      this.ChangeCompanyNameVisible = true
    },
    CompanyNameHandleCancel () {
      this.ChangeCompanyNameVisible = false
    },
    // 触发修改单位名称接口请求
    onCompanyNameSubmit (e) {
      e.preventDefault()
      this.changeCompanyNameForm.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          const changeCompanyNameData = {
            LOGINNAME: this.$store.state.user.user.LOGINNAME,
            DWMC: values.companyName,
            DWDZ: values.DWDZ,
            LXR: values.LXR
          }
          this.$WebApi.user['updateProUser']({
            data: changeCompanyNameData
          })
            .then(res => {
              if (res.code === 998) {
                this.logging = false
              } else {
                this.ChangeCompanyNameVisible = false
                this.$message.success('单位名称修改成功', 2)
                this.$store.state.user.user.DWMC = values.companyName
                this.$store.state.user.user.DWDZ = values.DWDZ
                this.$store.state.user.user.LXR = values.LXR
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },

    // 校验密码
    handlePasswordLevel (rule, value, callback) {
      let level = 0

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        // 不校验密码强度，仅提示
        // callback(new Error('密码强度不够'))
      }
      callback()
    },

    handlePasswordCheck (rule, value, callback) {
      const password = this.passwordForm.getFieldValue('newPassword')
      console.log('value', value)
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    handlePasswordVerify (rule, value, callback) {
      if (value && isMM(value)) {
        callback()
      } else {
        callback(new Error('只能输入6-20个字母、数字、下划线'))
      }
    },

    handlePhoneCheck (rule, value, callback) {
      // console.log("handlePhoneCheck, rule:", rule);
      // console.log("handlePhoneCheck, value", value);
      // console.log("handlePhoneCheck, callback", callback);

      callback()
    },

    handlePasswordInputClick () {
      // if (!this.isMobile()) {
      //   this.state.passwordLevelChecked = true;
      //   return;
      // }
      this.state.passwordLevelChecked = true
    }
  }
}
</script>
<style lang="less" scoped>
.securityPage {
  padding: 8px 20px 0;
  // 标题
  .title {
    font-weight: bolder;
    font-size: 18px;
    line-height: 1;
    margin: 0;
    padding-bottom: 20px;
    padding-left: 10px;
    button {
      float: right;
    }
  }
  .title2 {
    padding-top: 60px;
  }
  // 分隔线
  .titleDivider {
    height: 2px;
    background: #d3d3d3;
    margin: 0;
  }
  .rowDivider {
    margin: 0;
    background: #efefef;
  }
  .content {
    padding: 15px 35px 15px 10px;
    .label {
      color: #999999;
    }
    .value {
      .anticon {
        padding-right: 5px;
      }
    }
    .actionCol {
      text-align: right;
    }
  }
}
</style>
