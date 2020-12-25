/*
 * @Autor: junhui li
 * @Date: 2020-11-25 16:30:09
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-24 17:08:19
 * @Description:
 */
// eslint-disable-next-line
import { UserLayout, RouteView, BlankLayout, pageLayout } from '@/layouts'

export const asyncRouterMap = []

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/login/index')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/login/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/login/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/surveyingUnit',
    component: BlankLayout,
    redirect: '/surveyingUnit/UnitCheckIn',
    hidden: true,
    children: [
      {
        path: 'UnitCheckIn',
        name: 'UnitCheckIn',
        component: () => import(/* webpackChunkName: "UnitCheckIn" */ '@/views/unitCheckIn/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
