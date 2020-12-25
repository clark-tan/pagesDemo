<template>
  <a-layout :class="['layout', device]" :style="{ minHeight: '100vh', paddingTop: !fixedHeader ? '0' : layoutMode === 'topmenu' ? '110px' : '64px' }">
    <!-- layout header -->
    <global-header
      :mode="layoutMode"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :device="device"
      @toggle="toggle"
    />
    <!-- <img src="/titleBackgroud.png" style="width:100vw;position:absolute;top:-112px"> -->
    <img src="/titleBackgroud.png" style="width:100%;position:absolute;top:-112px;left: 0; right: 0;">
    <!-- <s-breadcrumb /> -->
    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="Object.assign({ paddingLeft: contentPaddingLeft, minHeight: 'calc(100%-48px-64px-50px)' }, contentWidth === 'Fixed' ? {
        margin: '20px auto'
      } : {
        margin: '20px',
        width: 'calc(100% - 40px)'
      })"
    >

      <!-- SideMenu -->
      <side-menu
        v-if="isSideMenu()"
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :collapsible="true"
      ></side-menu>

      <!-- layout content -->
      <a-layout-content :style="{ display: 'flex', height: '100%', marginLeft: isSideMenu() ? '10px' : '0', background: $route.path !== '/portal/home' ? '#fff' : 'transparent', zIndex: '1' }">
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content>
    </a-layout>

    <!-- layout footer -->
    <a-layout-footer>
      <global-footer />
    </a-layout-footer>

    <!-- Setting Drawer (show in development mode) -->
    <setting-drawer v-if="!production"></setting-drawer>
  </a-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'
import { convertRoutes } from '@/utils/routeConvert'
import { triggerWindowResizeEvent } from '@/utils/util'
// import { CONTENT_WIDTH_TYPE } from '@/store/mutation-types'

import RouteView from './RouteView'
import PageHeader from '@/components/PageHeader'
import Breadcrumb from '@/components/tools/Breadcrumb'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import SettingDrawer from '@/components/SettingDrawer'

export default {
  name: 'PageLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    SideMenu,
    PageHeader,
    GlobalHeader,
    GlobalFooter,
    's-breadcrumb': Breadcrumb,
    SettingDrawer
  },
  data () {
    return {
      production: config.production,
      collapsed: false,
      menus: [],
      settings: {
        // 布局类型
        layout: config.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: config.contentWidth,
        // 主题 'dark' | 'light'
        theme: config.navTheme,
        // 主色调
        primaryColor: config.primaryColor,
        fixedHeader: config.fixedHeader,
        fixSiderbar: config.fixSiderbar,
        colorWeak: config.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false
      }
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    contentPaddingLeft () {
      if (this.isMobile() || !this.isSideMenu()) {
        return '0'
      }
      if (this.sidebarOpened) {
        // return '256px'
        return '0'
      }
      return '80px'
    }
  },
  mounted () {
    const routes = convertRoutes(this.mainMenu.find(item => item.path === '/'))
    this.menus = (routes && routes.children) || []
    this.collapsed = !this.sidebarOpened
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    }
  }
}
</script>
<style>
/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
