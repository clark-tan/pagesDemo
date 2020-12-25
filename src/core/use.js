import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

// ext library
import PageLoading from '@/components/PageLoading'
import PermissionHelper from '@/utils/helper/permission'
// import '@/components/use'
import './directives/action'

Vue.use(Antd)
Vue.use(PageLoading)
Vue.use(VueStorage, config.storageOptions)
Vue.use(PermissionHelper)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] WARNING: Antd now use fulled imported.')
