<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- <router-link :to="{ name: 'login' }" class="linkBtn">联系我们</router-link> -->
      <!-- 已登录 -->
      <template v-if="token">
        <!-- <notice-icon class="action"/> -->
        <a-dropdown
          class="userDropdown"
          size="small"
          placement="bottomRight"
          :trigger="['hover']"
          overlayClassName="userMenuDropDown"
          :getPopupContainer="() => $el"
          v-model="menuVisible"
        >
          <span class="action ant-dropdown-link user-dropdown-menu">
            <!-- <a-avatar class="avatar" size="small" :src="avatar"/> -->
            <CustomIcon name="onlineOfficeHall-user1" class="userBtn" />
            <span>{{ nickname }}</span>
            <a-icon type="up" class="toggleBtn" />
          </span>
          <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
            <a-menu-item key="0">
              <router-link :to="{ name: 'userPanel' }">
                <CustomIcon name="onlineOfficeHall-yonghu" />
                <span>个人中心</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <a href="javascript:;" @click="handleLogout">
                <CustomIcon name="onlineOfficeHall-exittuichu" />
                <span>退出登录</span>
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
      <!-- 未登录 -->
      <template v-else>
        <router-link :to="{ name: 'Login' }" class="linkBtn">登录</router-link>
        <a-divider type="vertical" />
        <a-button size="small" type="link" @click="registerData.visible = true">注册</a-button>
      </template>
    </div>
    <RegisterFormTwo
      ref="register"
      :visible="registerData.visible"
      @handleModalHide="registerData.visible = false"
    ></RegisterFormTwo>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import RegisterFormTwo from '@/components/UserForm/RegisterFormTwo'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon,
    RegisterFormTwo
  },
  data () {
    return {
      menuVisible: false,
      registerData: {
        visible: false
      }
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar']),
    ...mapGetters({ token: 'token' })
  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout()
            .then(() => {
              this.$router.push('/')
              setTimeout(() => {
                window.location.reload()
              }, 16)
            })
            .catch((err) => {
              this.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.userMenuDropDown {
  min-width: auto !important;
  /deep/.ant-dropdown-menu {
    border-radius: 4px;
    overflow: hidden;
    padding: 0;
    /deep/.ant-dropdown-menu-item {
      width: auto !important;
      padding: 10px 15px 10px 12px;
      font-size: 14px;
    }
  }
}
.linkBtn {
  height: 24px;
  padding: 0 7px;
  font-size: 14px;
  border-radius: 2px;
}
.userBtn {
  margin: 0 3px 0 15px;
  font-size: 14px;
}
.toggleBtn {
  color: #fff;
  margin-left: 2px;
  font-size: 12px;
  transform: rotate(0deg);
  transition: transform 0.5s;
}
.userDropdown:hover {
  .toggleBtn {
    transform: rotate(180deg);
  }
}
// /deep/ .ant-btn-link:not([disabled]) {
//   color: #fafafa;
// }
</style>
