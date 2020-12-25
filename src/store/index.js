/*
 * @Autor: junhui li
 * @Date: 2020-12-14 10:35:27
 * @LastEditors: junhui li
 * @LastEditTime: 2020-12-16 17:46:13
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
// import permission from './modules/permission'

// dynamic router permission control (Experimental)
import permission from './modules/async-router'
import getters from './getters'
import systemInfo from './modules/system-info'
// 联系我们
import contact from './modules/contact'
// 投诉与建议
import suggestAndComplaintModel from './modules/suggestAndComplaintModel'
// home
import home from './modules/home'
// 业务预约
import preBusniess from './modules/preBusiness'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    systemInfo,
    contact,
    suggestAndComplaintModel,
    home,
    preBusniess
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
