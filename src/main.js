/*
 * @Description:
 * @Version: 0.0
 * @Autor: clark tan
 * @Date: 2020-03-26 14:47:58
 * @LastEditors: clark tan
 * @LastEditTime: 2020-12-25 11:28:56
 */
// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import apis from './api/index'

import _ from 'lodash'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './style/index.less'

import { DEFAULT_ICON } from '@/utils/staticFile.js' // global less

Window._ = Vue.prototype._ = _

// eslint-disable-next-line no-eval
eval('import(' + JSON.stringify(DEFAULT_ICON) + ')')

Vue.config.productionTip = false

Vue.prototype.$WebApi = apis

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
