import Vue from 'vue'
import loginApi from '@/api/login'
import homeApi from '@/api/home'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    // 首页菜单信息个数
    menuInfoCount: {
      asas: 'zxzx'
    },
    user: {
      // TODO:临时，首页、业务预约初始化使用 - S
      DWDZ: '人人人让人',
      LOGINNAME: 'jhm',
      LXR: '李四',
      MAILBOX: 'jianghoumin@sina.com',
      MOBILEPHONE: '13922113294',
      TICKET: '8506B1D3DF4A42E6BE010BCC37925736',
      USERID: '80A718EB619C429FB3DE4A90D45CBDF1',
      DWMC: '南方数码',
      ZJHM: '340822199407050955',
      ZJLX: '身份证'
      // 临时，首页、业务预约初始化使用 - E
    },
    docunid: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
      // TODO:更新用户信息，最终应该只用一个键
      state.user = info
    },
    SetDocunid (state, payLoad) {
      state.docunid = payLoad
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi
          .login(userInfo)
          .then(res => {
            if (res.hasOwnProperty('code') && res.code !== 0) {
              reject(res)
            } else {
              const result = res
              Vue.ls.set(ACCESS_TOKEN, result.ticket)
              commit('SET_TOKEN', result.ticket)
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        loginApi
          .getInfo()
          .then(response => {
            const result = response
            // const result = {
            //   DWDZ: '科韵路最好的那个楼',
            //   DWMC: '江厚民随便开的一家公司',
            //   LOGINNAME: 'jhm',
            //   LXR: '江厚民',
            //   MAILBOX: 'houmin.jiang@sina.com',
            //   MOBILEPHONE: '13922113294',
            //   USERID: '4AFCC0129EDA497FB952BCE8FEDA1E25',
            //   USERNAME: '江厚民',
            //   ZJHM: '340822199407050936',
            //   ZJLX: '身份证'
            // }
            // const result = userInfo

            // if (result.role && result.role.permissions.length > 0) {
            //   const role = result.role
            //   role.permissions = result.role.permissions
            //   role.permissions.map(per => {
            //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
            //       const action = per.actionEntitySet.map(action => { return action.action })
            //       per.actionList = action
            //     }
            //   })
            //   role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            //   commit('SET_ROLES', result.role)
            //   commit('SET_INFO', result)
            // } else {
            //   reject(new Error('getInfo: roles must be a non-null array !'))
            // }
            if (response.hasOwnProperty('code') && response.code !== 0) {
              reject(response)
              // commit('SET_INFO', result)
              // commit('SET_NAME', { name: result.DWMC, welcome: welcome() })
              // commit('SET_ROLES', [0])
              // resolve(result)
            } else {
              commit('SET_INFO', result)
              commit('SET_NAME', { name: result.nickName || result.DWMC || result.userName, welcome: welcome() })
              // commit('SET_AVATAR', result.avatar)
              // TODO:兼容路由钩子的判断，原本场景是延迟一个生命周期，确保和角色权限的路由表渲染完毕，
              // 现在因为在登录前就拉好路由表了，所以理论不需要延迟（这里的 SET_ROLES 是模拟延迟完成的思路）
              // 待讨论：设置一个拿完用户信息的状态(因为他是路由逻辑的最后一步异步)，基于这个条件去放next()，当然登录的一整套逻辑也得维护上这个属性
              commit('SET_ROLES', [0])

              resolve(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    Logout ({ commit }) {
      return new Promise(resolve => {
        loginApi
          .logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            Vue.ls.remove(ACCESS_TOKEN)
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    },

    // 菜单信息数量
    async SetMenuInfoCount ({ state }, params) {
      try {
        const res = await homeApi.MenuInfoCount(params)
        state.menuInfoCount = res['rowsList'].reduce(
          (resObj, menu) => ({
            ...resObj,
            [menu.MENUID]: menu.COUNT
          }),
          {}
        )
      } catch (error) {
        console.log(error)
      }
    },
    setDocunid (context, value) {
      context.commit('SetDocunid', value)
    }
  }
}

export default user
