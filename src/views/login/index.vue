<!--
 * @Autor: junhui li
 * @Date: 2020-11-25 16:38:04
 * @LastEditors: junhui li
 * @LastEditTime: 2020-11-25 17:16:33
 * @Description:
-->
<template>
  <div class="main">
    <!-- 登录卡片 -->
    <a-card :bodyStyle="{ padding: 0 }" class="userLoginCard">
      <a-row type="flex" class="cardRow">
        <!-- 左边图片 -->
        <a-col class="imgCol"> </a-col>
        <!-- 右边表单 -->
        <a-col class="formCol">
          <!-- 表单标题 -->
          <h1 class="formTitle">用户登录</h1>
          <login-form @handleShowRetrievePasswordForm="handleShowRetrievePasswordForm" @handleShowRegisterForm="handleShowRegisterForm"/>
          <!-- 版权 -->
          <div class="copyRight">广东南方数码科技股份有限公司</div>
        </a-col>
      </a-row>
      <RegisterFormTwo :visible="showRegisterForm" @handleModalHide="handleModalHide" />

      <RetrievePasswordForm :visible="showRetrievePasswordForm" @modalHide="showRetrievePasswordForm = false" />
    </a-card>
  </div>
</template>

<script>
import RegisterFormTwo from '@/components/UserForm/RegisterFormTwo'
import RetrievePasswordForm from '@/components/UserForm/RetrievePasswordForm'
import LoginForm from './component/loginForm'

export default {
  name: 'Login',
  components: {
    RetrievePasswordForm,
    RegisterFormTwo,
    LoginForm
  },
  data () {
    return {
      showRegisterForm: false,
      showRetrievePasswordForm: false
    }
  },
  methods: {
    handleModalHide (boolearn) {
      this.showRegisterForm = boolearn
    },
    handleShowRetrievePasswordForm () {
      this.showRetrievePasswordForm = true
    },
    handleShowRegisterForm () {
      this.showRegisterForm = true
    }
  }
}
</script>

<style lang="less" scoped>
// 登录卡片
.userLoginCard {
  width: 860px;
  // box-shadow: 0px 2px 15px 0px rgba(13, 47, 125, 0.5);
  border: none;
  border-radius: 10px;
  overflow: hidden;
  background: #fbfcfd; // TODO:抽变量
  .cardRow {
    flex-wrap: nowrap;
    // 左边图片
    .imgCol {
      width: 500px;
      background: url('/login_img.png') center center no-repeat;
      background-size: cover;
    }
    .formCol {
      flex: 1;
      padding: 55px 30px 20px;
      color: #555f75;
      .formTitle {
        text-align: center;
        font-size: 30px;
        line-height: 1;
        margin: 0 0 30px;
      }
      // 版权
      .copyRight {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        text-align: center;
      }
    }
  }
}
</style>
