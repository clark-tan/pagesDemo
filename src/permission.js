/*
 * @Description:
 * @Version: 0.0
 * @Autor: Ethan Jiang
 * @Date: 2020-05-28 16:45:43
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-11 15:42:09
 */
import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [
  'home',
  'Login',
  'Register',
  'RegisterResult',
  'Contact',
  'Notice',
  'InfoPublic',
  'ShowOrganizations',
  'YelloPages',
  'ShowCredit',
  'UnitCheckIn',
  'ApplyForSettle',
  'SatisfactionEvaluation',
  'Evaluation',
  'UserPanel',
  'Guidelines',
  'PoliciesAndRegulations',
  'CreditPublicity'
] // no redirect whitelist
const defaultRoutePath = '/portal/home'

router.beforeEach(async (to, from, next) => {
  NProgress.start() // start progress bar

  if (window._.isEmpty(store.getters.pageInfo)) {
      await store.dispatch('GetWebConfig')
  }

  // 接口返回的浏览器标题
  const title = store.getters.pageInfo.title || ''
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${ title || domTitle}`)
  if (!store.state.permission.hasMenuRouters) {
    // 没加载过异步菜单路由
    store
      .dispatch('GenerateRoutes')
      .then(() => {
        router.addRoutes(store.getters.addRouters)
        initRouter(to, from, next)
      })
      .catch(() => {
        notification.error({
          message: '错误',
          description: '请求页面信息失败，请重试'
        })
      })
  } else {
    // 已加载异步菜单路由
    initRouter(to, from, next)
  }
})

function initRouter (to, from, next) {
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login' || to.path === '/') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetInfo')
          .then(res => {
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            store.dispatch('Logout').then(() => {
              next({ path: defaultRoutePath })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      if (!to.name) {
        next({ ...to, replace: true })
        return false
      }

      if (to.path === '/') {
        next({ path: defaultRoutePath })
      } else {
        next({ path: '/user/login', query: { redirect: to.fullPath } })
      }
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
